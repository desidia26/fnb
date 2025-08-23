// Simple in-memory rate limiter for form submissions
// Tracks IP addresses and their last submission time

interface RateLimitEntry {
	lastSubmission: number;
	attempts: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes in milliseconds
const MAX_ATTEMPTS = 1; // Only 1 submission per window

// Clean up old entries periodically to prevent memory bloat
function cleanup() {
	const now = Date.now();
	for (const [ip, entry] of rateLimitStore.entries()) {
		if (now - entry.lastSubmission > RATE_LIMIT_WINDOW) {
			rateLimitStore.delete(ip);
		}
	}
}

// Run cleanup every 10 minutes
setInterval(cleanup, 10 * 60 * 1000);

export function checkRateLimit(ip: string): { allowed: boolean; timeRemaining?: number } {
	const now = Date.now();
	const entry = rateLimitStore.get(ip);

	if (!entry) {
		// First submission from this IP
		rateLimitStore.set(ip, {
			lastSubmission: now,
			attempts: 1
		});
		return { allowed: true };
	}

	const timeSinceLastSubmission = now - entry.lastSubmission;

	if (timeSinceLastSubmission < RATE_LIMIT_WINDOW) {
		// Still within rate limit window
		const timeRemaining = RATE_LIMIT_WINDOW - timeSinceLastSubmission;
		const minutesRemaining = Math.ceil(timeRemaining / (60 * 1000));
		
		return { 
			allowed: false, 
			timeRemaining: minutesRemaining 
		};
	} else {
		// Window has passed, allow new submission
		rateLimitStore.set(ip, {
			lastSubmission: now,
			attempts: 1
		});
		return { allowed: true };
	}
}

export function getRateLimitStatus(ip: string): { isLimited: boolean; timeRemaining?: number } {
	const entry = rateLimitStore.get(ip);
	if (!entry) return { isLimited: false };

	const now = Date.now();
	const timeSinceLastSubmission = now - entry.lastSubmission;

	if (timeSinceLastSubmission < RATE_LIMIT_WINDOW) {
		const timeRemaining = RATE_LIMIT_WINDOW - timeSinceLastSubmission;
		const minutesRemaining = Math.ceil(timeRemaining / (60 * 1000));
		return { isLimited: true, timeRemaining: minutesRemaining };
	}

	return { isLimited: false };
}