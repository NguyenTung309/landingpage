type RateLimitEntry = {
  count: number
  resetAt: number
}

// In-memory sliding window rate limiter, keyed by IP.
// Note: on serverless runtimes (Vercel) each function instance keeps its own
// map, so this is per-instance limiting — sufficient to stop casual spam.
const WINDOW_MS = 60_000
const MAX_REQUESTS = 5

const store = new Map<string, RateLimitEntry>()

export function rateLimit(key: string, max = MAX_REQUESTS, windowMs = WINDOW_MS) {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { limited: false, remaining: max - 1 }
  }

  entry.count += 1
  if (entry.count > max) {
    return { limited: true, remaining: 0 }
  }

  return { limited: false, remaining: max - entry.count }
}

// Periodically drop expired entries so the map does not grow unbounded.
function dropExpired() {
  const now = Date.now()
  store.forEach((entry, key) => {
    if (entry.resetAt <= now) store.delete(key)
  })
}

setInterval(dropExpired, WINDOW_MS).unref()

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}