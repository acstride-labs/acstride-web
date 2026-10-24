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
for (const [language, locale] of [["zh-CN,zh;q=0.9,en;q=0.8","zh-CN"],["ru-RU","ru"],["ja-JP","ja"],["fr-FR,de;q=0.8","en"],["en;q=0.2,ja;q=0.9","ja"]]) {
 const response=await fetch(origin,{redirect:"manual",headers:{"Accept-Language":language}});
 assert.equal(response.status,307);
 assert.equal(response.headers.get("location"),`/${locale}`);
 assert.match(response.headers.get("cache-control") || "",/no-store|private/);
}
assert.ok((await (await fetch(origin+"/en",{headers:{"Accept-Language":"ja-JP"}})).text()).includes('<html lang="en"'));
for (const path of ["/de", "/en/no-such-page"])
  assert.equal((await fetch(origin + path)).status, 404, path);
for (const path of ["/sitemap.xml", "/robots.txt", "/icon.svg", "/og.png"])
  assert.equal((await fetch(origin + path)).status, 200, path);
console.log("20 localized routes, redirects, 404s and public assets passed.");
