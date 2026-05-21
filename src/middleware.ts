import { defineMiddleware } from "astro:middleware";
import { env } from "cloudflare:workers";

const PROTECTED_PATHS = [/^\/resume(\/|$)/];

export const onRequest = defineMiddleware(async (context, next) => {
	const needsAuth = PROTECTED_PATHS.some((re) => re.test(context.url.pathname));
	if (!needsAuth) return next();

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
		if (user === expectedUser && pass === expectedPass) return next();
	}

	return new Response("Authentication required", {
		status: 401,
		headers: { "WWW-Authenticate": 'Basic realm="Protected"' },
	});
});
