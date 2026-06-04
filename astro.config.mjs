import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2, sandbox } from "@emdash-cms/cloudflare";
import { formsPlugin } from "@emdash-cms/plugin-forms";
import webhookNotifier from "@emdash-cms/plugin-webhook-notifier";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare({
		// Master switch for Cloudflare remote bindings during local dev.
		// When EMDASH_REMOTE=1, bindings flagged `"remote": true` in
		// wrangler.jsonc (DB / MEDIA) connect to the deployed prod resources
		// instead of the local D1/R2. Otherwise everything stays local.
		remoteBindings: process.env.EMDASH_REMOTE === "1",
	}),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		react(),
		emdash({
			// D1 Sessions API ("auto") round-trips opaque bookmarks via cookie.
			// A bookmark minted against local D1 is invalid on the remote D1
			// (D1_ERROR: invalid commitToken bookmark), so disable sessions when
			// connecting to the remote binding and hit the raw binding directly.
			database: d1({
				binding: "DB",
				session: process.env.EMDASH_REMOTE === "1" ? "disabled" : "auto",
			}),
			storage: r2({ binding: "MEDIA" }),
			plugins: [formsPlugin()],
			sandboxed: [webhookNotifier],
			sandboxRunner: sandbox(),
			marketplace: "https://marketplace.emdashcms.com",
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Inter",
			cssVariable: "--font-sans",
			weights: [400, 500, 600, 700],
			fallbacks: ["sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [400, 500],
			fallbacks: ["monospace"],
		},
	],
	devToolbar: { enabled: false },
});
