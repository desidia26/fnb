import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Allow all requests and set proper origin for CSRF protection
	const allowedHosts = ['localhost', '0.0.0.0', 'morgantownfnb.org', 'www.morgantownfnb.org'];
	
	if (allowedHosts.includes(event.url.hostname)) {
		event.request.headers.set('origin', event.url.origin);
	}
	
	// Debug logging
	console.log(`Request to: ${event.url.hostname}${event.url.pathname}`);
	console.log(`Origin header: ${event.request.headers.get('origin')}`);
	
	return resolve(event);
};