// Run against a local production server: node tests/routes.mjs
import assert from "node:assert/strict";
const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:3100";
assert.ok(
  new URL(origin).hostname === "127.0.0.1" ||
    new URL(origin).hostname === "localhost",
  "Only test a local server",
);
for (const locale of ["en", "zh-CN", "ru", "ja"]) {
  for (const page of ["", "/download", "/docs", "/changelog", "/privacy"]) {
    const path = `/${locale}${page}`;
    const response = await fetch(origin + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes(`<html lang="${locale}"`), `HTML language ${path}`);
    assert.ok(
      html.includes(`https://acstride.com${path}`),
      `Canonical ${path}`,
    );
    assert.match(html, /hreflang="x-default"/i, `Language alternate ${path}`);
    assert.ok(!html.includes("pay-success"), path);
    console.log(`OK ${path}`);
  }
}
assert.equal(
  (await fetch(origin, { redirect: "manual" })).headers.get("location"),
  "/en",
);
for (const path of ["/de", "/en/no-such-page"])
  assert.equal((await fetch(origin + path)).status, 404, path);
for (const path of ["/sitemap.xml", "/robots.txt", "/icon.svg", "/og.png"])
  assert.equal((await fetch(origin + path)).status, 200, path);
console.log("20 localized routes, redirects, 404s and public assets passed.");
