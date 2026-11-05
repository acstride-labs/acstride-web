import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const locales = ["en", "zh-CN", "ru", "ja"];
const load = (locale) =>
  JSON.parse(
    readFileSync(
      new URL(`../messages/${locale}.json`, import.meta.url),
      "utf8",
    ),
  );
function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, shape(v)]),
    );
  return typeof value;
}
test("all four catalogs have exactly the same keys and list lengths", () => {
  const reference = shape(load("en"));
  for (const locale of locales)
    assert.deepEqual(shape(load(locale)), reference, locale);
});
test("every translated string is nonempty and contains no private transaction data", () => {
  function check(value) {
    if (typeof value === "string") {
      assert.ok(value.trim().length > 0);
      assert.doesNotMatch(
        value,
        /pay-success|out_trade_no|seller_id|trade_no=|sign_type=/,
      );
    } else Object.values(value).forEach(check);
  }
  for (const locale of locales) check(load(locale));
});
test("no dead links or invented marketplace listings in page source", () => {
  for (const file of [
    "src/components/pages.tsx",
    "src/components/chrome.tsx",
  ]) {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.doesNotMatch(
      source,
      /href=["']#["']|marketplace\.visualstudio\.com\/items/,
    );
  }
});

test("published Alpha downloads cover the four release platforms", async () => {
  const { releaseVersion, releaseDownloads, checksumsUrl, marketplaceUrl } = await import('../src/lib/release.ts');
  assert.equal(releaseVersion, '0.1.0');
  assert.deepEqual(releaseDownloads.map(url => url.split('/').at(-1)), [
    'codeforces-workbench-0.1.0-win32-x64.vsix',
    'codeforces-workbench-0.1.0-linux-x64.vsix',
    'codeforces-workbench-0.1.0-darwin-x64.vsix',
    'codeforces-workbench-0.1.0-darwin-arm64.vsix',
  ]);
  assert.ok(releaseDownloads.every(url => url.includes('/releases/download/v0.1.0/')));
  assert.ok(checksumsUrl.endsWith('/v0.1.0/SHA256SUMS'));
  assert.equal(new URL(marketplaceUrl).searchParams.get('itemName'), 'acstride.codeforces-workbench');
  for (const locale of locales) {
    const catalog = load(locale);
    assert.equal(catalog.download.platformNames.length, releaseDownloads.length);
    assert.match(catalog.download.status, /0\.1\.0.*ALPHA/);
    assert.doesNotMatch(JSON.stringify(catalog), /v?0\.14\.0/);
  }
});
