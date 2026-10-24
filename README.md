# AC-Sride Web

The product website for AC-Sride, a Codeforces-focused VS Code extension currently named CFIDE internally.

## Stack

Next.js App Router, React, TypeScript, next-intl, Tailwind CSS, Lucide icons, and source-owned button styles following shadcn/ui composition conventions. Uses npm with a committed lockfile for reproducible Vercel / CI builds. No account system, checkout, analytics SDK, or payment processing is implemented.

## Development

Node.js 24 is required.

```sh
npm ci
npm run dev
npm run check
```

The root entry selects a supported browser language, with English fallback. Localized pages are pre-rendered for `en`, `zh-CN`, `ru`, and `ja`:

- `/<locale>` — homepage and clearly labelled interactive layout illustration
- `/<locale>/download` — early-preview installation information
- `/<locale>/docs` — quick start
- `/<locale>/changelog` — extension changes
- `/<locale>/privacy` — privacy and licensing information

The root `/` detects the browser’s `Accept-Language`, honors preference weights, matches Chinese/English/Russian/Japanese (including regional tags), and falls back to English when none match. Explicit locale URLs keep their selected language. Only the root redirect is dynamic; localized pages remain static.

Translations live in `messages/*.json`; tests enforce key and array parity. Future date/number formatting should use next-intl. The editor preview uses fixed sample results and does not execute code or contact Codeforces.

## Deployment

Live site: [acstride.com](https://acstride.com) · [简体中文](https://acstride.com/zh-CN). Hosted on Vercel Hobby as project `acstride-web`, connected to this public repository's `main` branch for automatic deployments. The fallback address is [acstride-web.vercel.app](https://acstride-web.vercel.app).

Alibaba Cloud DNS connects the apex via an A record and `www` via the project-specific CNAME. HTTPS is enabled, and `www.acstride.com` permanently redirects to `acstride.com`. Domain access and the redirect were verified on 2026-10-24.

Import `acstride-labs/acstride-web` into Vercel with the Next.js preset, Node.js 24, repository root, and `npm run check`. No secrets or environment variables are required. Keep analytics disabled unless privacy disclosures are updated.

`https://acstride.com` is the intended canonical origin, declared in `src/lib/site.ts`. Bind apex and `www` in Vercel, redirect `www` to apex, and apply **the exact DNS records shown by that project** in Alibaba Cloud DNS. Preserve existing MX/TXT and unrelated subdomains. Never copy guessed IPs or another project's CNAME. Verify DNS, TLS, redirects, and HTTPS afterwards.

The owner has confirmed that the current project is personal and non-commercial. Vercel Hobby may be used only within its personal non-commercial terms and cannot connect a private organization repository; this deployment uses the public website repository. Reassess the plan before introducing commercial activity. Do not create a paid subscription without the owner's approval. Next.js supports independent Node/Docker hosting too.

## Release limitations

[Extension repository](https://github.com/acstride-labs/acstride-vscode-extension). No Marketplace listing or public release asset was available when this site was authored; links lead to build instructions instead of invented downloads. Update that information when verified packages are published. Codeforces login and one-click submission are described as experimental, with site-verification limits and a manual fallback. Optional AI translation and request caching reflect the current source preview; no paid AC-Sride plan is advertised.

No passwords, cookies, payment return URLs, domain purchase details, or tokens belong in this repository. Website original code/content are currently all rights reserved; no open-source license was selected. Third-party licenses are unchanged.

## Development and release flow

Feature/fix branch → PR into `main` → independent Vercel Preview verification → checks pass → merge into `main` → automatic production deployment. No permanent staging branch is needed.

Read [the deployment runbook](docs/deployment.md) for branch protections, release checks, environment settings and rollback. Normal website deployments are tracked by commit SHA and deployment URL; they do not require a version bump, tag or GitHub Release.
