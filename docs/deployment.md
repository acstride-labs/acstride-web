# Website development and deployment

## Branches and environments

- `main`: default and production branch, served at https://acstride.com. Changes arrive through pull requests.
- Short-lived feature/fix branches: create from `main`; use names such as `codex/update-download-page`.
- No permanent staging branch is needed. Every pushed development branch/PR gets its own Vercel Preview URL; previews do not replace production or each other.

One Vercel project hosts Preview and Production. Production Branch is explicitly `main`. Vercel supplies a stable URL per branch and an immutable URL per deployment. Use the exact URLs shown on the PR or Vercel deployment page. A branch URL follows new commits, so record the tested SHA and deployment URL. No paid custom environment or second project is required.

Production and Preview environment variables are configured separately. Currently the website requires no application secrets. Preserve existing Preview access protection; no authentication bypass token is needed.

## Everyday development and release

1. Update `main` and create a short-lived branch.
2. Implement the change and run `npm ci` and `npm run check` with Node.js 24.
3. Open a PR targeting `main`. GitHub runs `Website validation`; Vercel builds an independent Preview. Both must succeed before merge.
4. Verify the latest Preview, including affected locales, responsive layout, navigation and download links. Record the deployment URL and tested commit SHA in the PR checklist. New commits invalidate the old verification.
5. Merge the PR into `main`. Squash merge is recommended for a single feature; merge commits are also available. A solo maintainer does not need another person's approval, but still completes the checklist.
6. Vercel automatically builds Production. Its build command is `npm run check`, so tests, production build and type checks must pass before the deployment becomes Ready. A GitHub CI run alone does not sequence Vercel deployments.
7. Verify https://acstride.com, browser-language redirect, all four homepages, affected pages and the www redirect. Record the production deployment URL and SHA on the PR. Delete the completed feature branch when no longer needed.

## Repository protections

Protect `main`: require a PR, require `Website validation` and `Vercel`, block force pushes and deletion, require conversations to be resolved, and require the PR branch to be up to date. No bypass actors and no mandatory external approvals are needed for a solo maintainer. Require another Preview verification if updating the branch changes its contents.

Keep `main` as the default branch so ordinary PRs target it. Merge methods do not need to preserve a long-lived staging branch because there is no such branch.

## Search indexing

Preview deployments use `X-Robots-Tag: noindex, nofollow, noarchive`, robots metadata and a disallow-all robots.txt. These discourage indexing; they are not authentication. Production remains indexable. Do not put production-only credentials or future production databases into Preview environment settings.

## Tracking and rollback

Ordinary website changes do not require package version bumps, tags or GitHub Releases. Track them by PR, commit SHA and Vercel deployment URL. Optional milestone tags may mark a major redesign.

For a production incident, use Vercel Instant Rollback to the last known-good production deployment, verify the domain, then fix the source through a normal feature-branch PR. A deployment rollback does not revert Git history: revert or fix the offending source change before the next production deployment, otherwise it will return.

A hotfix follows the same short flow: branch from current `main`, open a PR, wait for checks and Preview, verify, merge. Roll back the deployment first if the incident is urgent rather than bypassing branch protection.
