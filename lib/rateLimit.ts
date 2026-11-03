// Lightweight per-instance guard. For multi-instance production deployments,
// add a shared rate limiter such as Upstash Redis.
const hits = new Map<string, { count: number; resetAt: number }>();

export function allowAttempt(key: string, limit = 8, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const current = hits.get(key);
  if (!current || current.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}
