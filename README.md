# ACStride Web

The product website for ACStride, a Codeforces-focused VS Code extension currently named CFIDE internally.

## Stack

Next.js App Router, React, TypeScript, next-intl, Tailwind CSS, Lucide icons, and source-owned button styles following shadcn/ui composition conventions. Uses npm with a committed lockfile for reproducible Vercel / CI builds. No account system, checkout, analytics SDK, or payment processing is implemented.

## Development

Node.js 24 is required.

```sh
npm ci
npm run dev
npm run check
```

The default entry redirects to `/en`. Pages are pre-rendered for `en`, `zh-CN`, `ru`, and `ja`:

- `/<locale>` — homepage and clearly labelled interactive layout illustration
- `/<locale>/download` — early-preview installation information
- `/<locale>/docs` — quick start
- `/<locale>/changelog` — extension changes
- `/<locale>/privacy` — privacy and licensing information

Translations live in `messages/*.json`; tests enforce key and array parity. Future date/number formatting should use next-intl. The editor preview uses fixed sample results and does not execute code or contact Codeforces.

## Deployment

Import `acstride-labs/acstride-web` into Vercel with the Next.js preset, Node.js 24, repository root, and `npm run build`. No secrets or environment variables are required. Keep analytics disabled unless privacy disclosures are updated.

`https://acstride.com` is the intended canonical origin, declared in `src/lib/site.ts`. Bind apex and `www` in Vercel, redirect `www` to apex, and apply **the exact DNS records shown by that project** in Alibaba Cloud DNS. Preserve existing MX/TXT and unrelated subdomains. Never copy guessed IPs or another project's CNAME. Verify DNS, TLS, redirects, and HTTPS afterwards.

Vercel Hobby is limited to personal non-commercial use; this product marketing website needs a commercially permitted plan before production deployment. Do not create a paid subscription without the owner's approval. Next.js supports independent Node/Docker hosting too.

## Release limitations

[Extension repository](https://github.com/acstride-labs/acstride-vscode-extension). No Marketplace listing or public release asset was available when this site was authored; links lead to build instructions instead of invented downloads. Update that information when verified packages are published. Login, automatic submission, and paid plans are **not** advertised as available.

No passwords, cookies, payment return URLs, domain purchase details, or tokens belong in this repository. Website original code/content are currently all rights reserved; no open-source license was selected. Third-party licenses are unchanged.
