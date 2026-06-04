import { defineMiddleware } from "astro:middleware";
import { env } from "cloudflare:workers";

const PROTECTED_PATHS = [/^\/_\/resume(\/|$)/];

// The `resumes` collection uses urlPattern "/_/{slug}", but Astro excludes
// underscore-prefixed dirs from routing, so "/_/..." can't be a file route.
// We render it from the real /resume/[slug] route and rewrite the public
// "/_/" path onto it (URL stays "/_/..."). Direct hits to the internal
// /resume/ path 404 so "/_/" is the only entry point.
const PUBLIC_RESUME_PREFIX = "/_/";
const INTERNAL_RESUME_PREFIX = "/resume/";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Block direct access to the internal render route. This does NOT fire for
  // the rewrite below: next(path) rewrites without re-running this middleware.
  if (pathname.startsWith(INTERNAL_RESUME_PREFIX)) {
    return new Response("Not Found", { status: 404 });
  }

  // Auth is checked against the *public* path (e.g. "/_/resume") and MUST run
  // before the rewrite below, which would otherwise `return next(...)` first
  // and skip auth entirely.
  const authResponse = checkBasicAuth(context, pathname);
  if (authResponse) return authResponse;

  // Public "/_/{slug}" -> internal "/resume/{slug}", keeping the URL as "/_/...".
  if (
    pathname.startsWith(PUBLIC_RESUME_PREFIX) &&
    pathname.length > PUBLIC_RESUME_PREFIX.length
  ) {
    const slug = pathname.slice(PUBLIC_RESUME_PREFIX.length);
    return next(INTERNAL_RESUME_PREFIX + slug);
  }

  return next();
});

// Returns a 401/500 Response when the request must be rejected, or null to let
// the request proceed (not protected, dev mode, or credentials valid).
function checkBasicAuth(
  context: Parameters<Parameters<typeof defineMiddleware>[0]>[0],
  pathname: string,
): Response | null {
  if (import.meta.env.DEV) return null;

  const needsAuth = PROTECTED_PATHS.some((re) => re.test(pathname));
  if (!needsAuth) return null;

  const expectedUser = env.BASIC_AUTH_USER;
  const expectedPass = env.BASIC_AUTH_PASS;

  if (!expectedUser || !expectedPass) {
    return new Response("Basic auth is not configured", { status: 500 });
  }

  const header = context.request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const decoded = atob(header.slice(6));
    const idx = decoded.indexOf(":");
    const user = idx === -1 ? decoded : decoded.slice(0, idx);
    const pass = idx === -1 ? "" : decoded.slice(idx + 1);
    if (user === expectedUser && pass === expectedPass) return null;
  }

  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Protected"' },
  });
}
