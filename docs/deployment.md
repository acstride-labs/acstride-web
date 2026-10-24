# Website development and deployment

## Branches and environments

- `main`: production, served at https://acstride.com. Only release PRs from this repository's `staging` branch may merge here.
- `staging`: persistent Vercel Preview environment. Feature and fix PRs target this branch.
- Short-lived branches: create from `staging`; use names such as `codex/update-download-page`.

One Vercel project hosts both environments. Production Branch is `main`; a push to `staging` creates a Preview deployment with its persistent branch URL. Use the exact branch URL shown in Vercel. No paid custom environment or second project is required. Production and Preview environment variables are configured separately; currently the website requires no application secrets.

## Everyday development

1. Sync `staging` and create a short-lived branch.
2. Implement the change and run `npm ci` and `npm run check` with Node.js 24.
3. Open a PR targeting `staging`. Both `Website validation` and `Release policy` must pass. Inspect the PR's Vercel preview and merge.
4. Wait for the `staging` deployment to be Ready. Verify the persistent branch preview. A newer staging commit invalidates the previous verification.

## Release to production

1. Freeze the staging changes for this release; record the deployment URL and tested HEAD SHA.
2. Open a PR with base `main`, head `staging`. Fill in the release checklist. Feature branches and forks named `staging` are rejected by the required release policy check.
3. Wait for all required checks, the Vercel preview, and staging verification to succeed.
4. Use **Create a merge commit** for `staging` → `main`. Do not squash or rebase this long-lived branch. Keep `staging` after merging.
5. Vercel builds production automatically. Its build command is `npm run check`, so tests, build and type checks must all succeed before the deployment can become Ready. A GitHub CI run alone does not sequence Vercel deployments.
6. Verify https://acstride.com, the browser-language redirect, all four homepages, download/docs links, and the www redirect. Record the production deployment URL and SHA in the release PR.
7. Synchronize `main` back to `staging` with a PR and a merge commit before the next cycle, particularly after hotfixes. Feature PRs may use squash merge.

Preview deployments use `X-Robots-Tag: noindex, nofollow, noarchive`, robots metadata and a disallow-all robots.txt. These discourage indexing; they are not authentication. Keep the existing Vercel Preview access protection. Production remains indexable.

## Repository protections

Protect both `main` and `staging`: require a PR, require `Website validation` and `Release policy`, block force pushes and deletion, and require conversations to be resolved. A solo maintainer does not need another person's approval. Require branches to be up to date before merging. Do not enable a linear-history requirement: release and synchronization PRs need merge commits.

The default PR target is `staging`. Repository administrators retain control of the configuration but normal work follows these rules. Keep automatic deletion of merged branches disabled so the long-lived staging branch survives releases.

## Tracking and rollback

Ordinary website changes do not require package version bumps, tags or GitHub Releases. Track releases by their PR, commit SHA and Vercel deployment URL. Optional milestone tags can mark major redesigns.

For a production incident, use Vercel Instant Rollback to the last known-good production deployment, verify the domain, then fix the source through a PR. A deployment rollback does not revert Git history. If the offending change remains on `main`, revert it through `staging` and a release PR before the next production deployment; otherwise it will return.

If a critical hotfix must branch from `main`, merge its PR into `staging`, verify and release `staging` → `main`; this keeps the normal admission policy intact. For a truly urgent incident, roll back the deployment first instead of bypassing branch protection.

## Bootstrap

The initial staging branch and protection rules are set up once. Thereafter every code change follows the PR flow above. Enabling branch protection is separate from committing workflow files: check the repository Settings after applying this runbook.
