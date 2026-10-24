import test from "node:test";
import assert from "node:assert/strict";
import { validateReleaseSource } from "../scripts/release-policy.mjs";
const release = { event: "pull_request", base: "main", head: "staging", headRepository: "acstride-labs/acstride-web", repository: "acstride-labs/acstride-web" };
test("production accepts staging from the same repository", () => {
  assert.doesNotThrow(() => validateReleaseSource(release));
});
test("production rejects direct feature PRs and fork branches named staging", () => {
  assert.throws(() => validateReleaseSource({...release, head: "feature/new-copy"}));
  assert.throws(() => validateReleaseSource({...release, headRepository: "another-owner/acstride-web"}));
});
test("feature PRs and main-to-staging synchronization can target staging", () => {
  for (const head of ["feature/new-copy", "main"]) assert.doesNotThrow(() => validateReleaseSource({...release, base: "staging", head}));
});
