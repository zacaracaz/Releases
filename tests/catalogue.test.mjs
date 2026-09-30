import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const script = readFileSync(new URL('../catalogue.js', import.meta.url), 'utf8');
async function render(projects) {
  const content = { className: '', innerHTML: '' };
  runInNewContext(script, {
    URL,
    document: { getElementById: () => content },
    fetch: async () => ({ ok: true, json: async () => ({ projects }) }),
  });
  await new Promise(setImmediate);
  return content.innerHTML;
}
const project = (url, extra = {}) => ({ name: 'Example', version: '1.0.0', downloads: [{ url, label: 'APK', platform: 'Android' }], ...extra });

test('keeps the real catalogue download links', async () => {
  const manifest = JSON.parse(readFileSync(new URL('../releases.json', import.meta.url), 'utf8'));
  const html = await render(manifest.projects);
  for (const item of manifest.projects.flatMap(item => item.downloads)) assert.ok(html.includes(item.url));
  assert.ok(html.includes('>Download</a>'));
  assert.ok(!html.includes('Download unavailable'));
});

test('escapes quoted attributes and markup while constraining state classes', async () => {
  const payload = '\" onmouseover=\"alert(1)\"><img src=x onerror=alert(1)>';
  const html = await render([project('https://github.com/zacaracaz/Releases/releases/latest', { name: payload, description: payload, releaseState: payload })]);
  assert.ok(html.includes('&quot; onmouseover=&quot;'));
  assert.ok(html.includes('&lt;img'));
  assert.ok(html.includes('state-Development'));
  assert.ok(!html.includes('<img'));
  assert.ok(!html.includes('class="state-badge state-"'));
});

test('rejects executable, spoofed, foreign and credential-bearing URLs', async () => {
  for (const url of [
    'javascript:alert(1)', 'data:text/html,<script>alert(1)</script>',
    'https://github.com.evil.test/zacaracaz/Releases/releases/latest',
    'https://github.com/stranger/Releases/releases/latest',
    'https://user:password@github.com/zacaracaz/Releases/releases/latest',
    'https://github.com/zacaracaz/Releases/releases/latest?redirect=evil',
    'http://github.com/zacaracaz/Releases/releases/latest', '" onmouseover="alert(1)',
  ]) {
    const html = await render([project(url)]);
    assert.ok(!html.includes('class="dl-btn"'), url);
    assert.ok(html.includes('Download unavailable'), url);
  }
});

test('CSP disallows inline script and the page loads a local script', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /script-src 'self';/);
  assert.match(html, /<script src="catalogue.js" defer><\/script>/);
  assert.doesNotMatch(html, /<script>/);
});
