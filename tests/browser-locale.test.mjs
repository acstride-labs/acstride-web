import test from 'node:test';
import assert from 'node:assert/strict';
import { browserLocale } from '../src/i18n/browser-locale.mjs';
test('matches supported environment languages including regional tags',()=>{
 for(const [header,expected] of [['zh-CN,zh;q=0.9,en;q=0.8','zh-CN'],['zh-Hans-SG','zh-CN'],['ru-RU,ru;q=0.9','ru'],['ja-JP,en-US;q=0.8','ja'],['en-GB','en']]) assert.equal(browserLocale(header),expected);
});
test('honors quality weights and searches past unsupported languages',()=>{
 assert.equal(browserLocale('en;q=0.4,ja;q=0.9'),'ja');
 assert.equal(browserLocale('fr-FR,de;q=0.9,ru;q=0.7'),'ru');
 assert.equal(browserLocale('ja;q=0,zh;q=0.5'),'zh-CN');
});
test('falls back to English for missing, unsupported and invalid preferences',()=>{
 for(const header of [undefined,null,'','de-DE,fr;q=0.9','*','ru;q=bad','ja;q=1.5','zh;q=0']) assert.equal(browserLocale(header),'en');
});
