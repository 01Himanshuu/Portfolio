/**
 * /api/visitors/route.js
 *
 * Persistent page-view counter for the portfolio.
 *
 * Visit definition:
 *   Every POST request increments the counter by 1.
 *   Deduplication (preventing double-count from React Strict Mode's double-mount)
 *   is handled on the client side using a module-level flag — NOT by server cookies.
 *   This means every real page navigation = +1, every refresh = +1.
 *
 * Storage strategy (auto-detected at runtime):
 *   1. Upstash Redis — if UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN are set
 *      (required for Vercel serverless / any read-only filesystem environment)
 *   2. File-based JSON (data/visitors.json) — default for local dev and self-hosted
 *
 * Limitations:
 *   - File-based storage: concurrent writes on a very busy server may race.
 *     Acceptable for a personal portfolio with negligible concurrent load.
 *   - Bots / automated fetch requests will be counted. Acceptable at portfolio scale.
 */

import { NextResponse } from 'next/server';
import path from 'path';

// ─── Force dynamic — never cache this route ────────────────────────────────────
export const dynamic = 'force-dynamic';

const REDIS_KEY = 'portfolio:visitors';

// ─── Storage adapters ─────────────────────────────────────────────────────────

/**
 * File-based adapter (Node.js fs) — used when Redis env vars are absent.
 * Safe for local dev and self-hosted deployments.
 */
async function fileRead() {
  const { readFile } = await import('fs/promises');
  const filePath = path.join(process.cwd(), 'data', 'visitors.json');
  try {
    const raw = await readFile(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    return typeof parsed.count === 'number' ? parsed.count : 0;
  } catch {
    return 0;
  }
}

async function fileIncrement() {
  const { readFile, writeFile, mkdir } = await import('fs/promises');
  const filePath = path.join(process.cwd(), 'data', 'visitors.json');
  const dir = path.dirname(filePath);

  await mkdir(dir, { recursive: true });

  let count = 0;
  try {
    const raw = await readFile(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    count = typeof parsed.count === 'number' ? parsed.count : 0;
  } catch {
    // File missing or malformed — start from 0
  }
  count += 1;
  await writeFile(filePath, JSON.stringify({ count }, null, 2), 'utf-8');
  return count;
}

/**
 * Upstash Redis adapter — used when env vars are present.
 * Uses the Upstash Redis REST API directly (no SDK needed, fetch only).
 */
async function redisRequest(command, args = []) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  const res = await fetch(`${url}/${[command, ...args].join('/')}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Upstash error: ${res.status}`);
  const data = await res.json();
  return data.result;
}

async function redisRead() {
  const val = await redisRequest('GET', [REDIS_KEY]);
  return val ? parseInt(val, 10) : 0;
}

async function redisIncrement() {
  const val = await redisRequest('INCR', [REDIS_KEY]);
  return typeof val === 'number' ? val : 0;
}

// ─── Unified storage interface ─────────────────────────────────────────────────

function getRedisClient() {
  return !!(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

async function getCount() {
  return getRedisClient() ? redisRead() : fileRead();
}

async function incrementCount() {
  return getRedisClient() ? redisIncrement() : fileIncrement();
}

// ─── Route Handlers ───────────────────────────────────────────────────────────

/**
 * GET /api/visitors
 * Returns the current count without incrementing.
 */
export async function GET() {
  try {
    const count = await getCount();
    console.log(`[visitors] GET — current count: ${count}`);
    return NextResponse.json({ count }, {
      status: 200,
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
    });
  } catch (err) {
    console.error('[visitors] GET error:', err);
    return NextResponse.json({ count: null, error: 'unavailable' }, { status: 503 });
  }
}

/**
 * POST /api/visitors
 * Increments the page-view counter unconditionally.
 * No cookie gate — deduplication is the client's responsibility.
 * Returns the updated count.
 */
export async function POST() {
  try {
    const before = await getCount();
    console.log(`[visitors] POST received — count before: ${before}`);

    const count = await incrementCount();
    console.log(`[visitors] POST — incremented — count now: ${count}`);

    return NextResponse.json(
      { count },
      {
        status: 200,
        headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
      }
    );
  } catch (err) {
    console.error('[visitors] POST error:', err);
    return NextResponse.json({ count: null, error: 'unavailable' }, { status: 503 });
  }
}
