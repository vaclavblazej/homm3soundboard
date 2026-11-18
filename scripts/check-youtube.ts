// Verifies every YouTube video referenced in the config still exists and is
// embeddable, via YouTube's oEmbed endpoint (no API key needed).
// Run: npm run check:youtube   (exit code 1 if any video is broken)

import { sections } from '../src/config/sections.ts';

interface Usage {
  id: string;
  titles: string[];
}

function collectIds(): Map<string, Usage> {
  const found = new Map<string, Usage>();
  const visit = (node: unknown, title?: string): void => {
    if (Array.isArray(node)) {
      node.forEach((n) => visit(n, title));
      return;
    }
    if (!node || typeof node !== 'object') return;
    const obj = node as Record<string, unknown>;
    const ownTitle = typeof obj.title === 'string' ? obj.title : title;
    if (obj.type === 'youtube' && typeof obj.id === 'string') {
      const usage = found.get(obj.id) ?? { id: obj.id, titles: [] };
      if (ownTitle) usage.titles.push(ownTitle);
      found.set(obj.id, usage);
      return;
    }
    Object.values(obj).forEach((v) => visit(v, ownTitle));
  };
  visit(sections);
  return found;
}

type Result =
  | { ok: true; title: string; author: string }
  | { ok: false; reason: string };

async function check(id: string): Promise<Result> {
  const url = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`;
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
      if (res.ok) {
        const data = (await res.json()) as { title?: string; author_name?: string };
        return { ok: true, title: data.title ?? '?', author: data.author_name ?? '?' };
      }
      // 401: embedding disabled; 403: private; 400/404: removed or invalid id.
      const reasons: Record<number, string> = {
        400: 'invalid id or removed',
        401: 'embedding disabled',
        403: 'private',
        404: 'not found / removed',
      };
      if (res.status >= 500 && attempt < 3) continue;
      return { ok: false, reason: `HTTP ${res.status} (${reasons[res.status] ?? 'unexpected'})` };
    } catch (err) {
      if (attempt < 3) continue;
      return { ok: false, reason: `network error: ${(err as Error).message}` };
    }
  }
}

const ids = [...collectIds().values()];
if (ids.length === 0) {
  console.log('No YouTube sources in config.');
  process.exit(0);
}

const results = await Promise.all(ids.map(async (u) => ({ u, r: await check(u.id) })));
let broken = 0;
for (const { u, r } of results) {
  const usedBy = u.titles.length ? ` [${u.titles.length}× ${u.titles.slice(0, 3).join(', ')}${u.titles.length > 3 ? ', …' : ''}]` : '';
  if (r.ok) {
    console.log(`✓ ${u.id}  "${r.title}" by ${r.author}${usedBy}`);
  } else {
    broken++;
    console.log(`✗ ${u.id}  ${r.reason}${usedBy}`);
  }
}
console.log(`\n${ids.length - broken}/${ids.length} videos OK.`);
if (broken) process.exit(1);
