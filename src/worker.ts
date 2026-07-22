// EmDash >= 0.19 wraps Astro's Cloudflare handler with a `scheduled()` handler so
// the Cron Trigger (see wrangler.jsonc `triggers.crons`) can drive scheduled
// publishing and plugin cron. Re-export both the default handler and PluginBridge
// from this single entry.
export { default, PluginBridge } from "@emdash-cms/cloudflare/worker";
