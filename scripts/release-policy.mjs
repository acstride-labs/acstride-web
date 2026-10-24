export function validateReleaseSource({ event, base, head, headRepository, repository }) {
  if (event !== "pull_request" || base !== "main") return;
  if (head !== "staging" || headRepository !== repository) {
    throw new Error("Production releases must come from this repository's staging branch. Open feature PRs against staging first.");
  }
}
if (import.meta.url === `file://${process.argv[1]}`) {
  validateReleaseSource({
    event: process.env.GITHUB_EVENT_NAME,
    base: process.env.PR_BASE,
    head: process.env.PR_HEAD,
    headRepository: process.env.PR_HEAD_REPOSITORY,
    repository: process.env.GITHUB_REPOSITORY,
  });
  console.log("Release source policy passed.");
}
