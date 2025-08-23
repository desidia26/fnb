import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import dotenv from 'dotenv';
import { checkRateLimit } from '$lib/server/rateLimit';

// Load environment variables
dotenv.config();

const createMailgunClient = () => {
	const mailgun = new Mailgun(FormData);
	return mailgun.client({
		username: 'api',
		key: process.env.MAILGUN_API_KEY || '',
		url: process.env.MAILGUN_DOMAIN?.includes('.eu') ? 'https://api.eu.mailgun.net' : undefined
	});
};

export const actions: Actions = {
	contact: async ({ request, getClientAddress }) => {
		// Get client IP for rate limiting
		const clientIP = getClientAddress();
		
		// Check rate limit
		const rateLimitResult = checkRateLimit(clientIP);
		if (!rateLimitResult.allowed) {
			return fail(429, {
				message: `Please wait ${rateLimitResult.timeRemaining} minute(s) before submitting another form.`
			});
		}

		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const company = formData.get('company') as string;
		const interest = formData.get('interest') as string;
		const message = formData.get('message') as string;

		// Basic validation
		if (!name || !email || !message) {
			return fail(400, {
				message: 'Name, email, and message are required fields.'
			});
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				message: 'Please enter a valid email address.'
			});
		}

		try {
			const mg = createMailgunClient();
			const domain = process.env.MAILGUN_DOMAIN || 'morgantownfnb.org';
			const fromEmail = process.env.FROM_EMAIL || `noreply@${domain}`;
			const toEmail = process.env.TO_EMAIL || `organizers@${domain}`;

			// Admin email HTML content
			const adminEmailHtml = `
				<h2>🍽️ New Food Not Bombs Morgantown Volunteer</h2>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				${company ? `<p><strong>Organization/Affiliation:</strong> ${company}</p>` : ''}
				<p><strong>Interest:</strong> ${interest}</p>
				<p><strong>Message:</strong></p>
				<blockquote style="border-left: 4px solid #e53e3e; padding-left: 1rem; margin: 1rem 0; font-style: italic;">
					${message.replace(/\n/g, '<br>')}
				</blockquote>
				<hr>
				<p><em>This message was sent via the FNB Morgantown contact form.</em></p>
				<p style="color: #e53e3e;"><strong>Food is a Human Right!</strong></p>
			`;

			// Confirmation email HTML content
			const confirmationEmailHtml = `
				<h2>🌱 Thanks for reaching out to Food Not Bombs Morgantown!</h2>
				<p>Hi ${name},</p>
				<p>We're excited to hear from you! Thank you for your interest in volunteering with our Morgantown chapter.</p>
				
				<p><strong>Your interest:</strong> ${interest}</p>
				
				<p><strong>Your message:</strong></p>
				<blockquote style="border-left: 4px solid #e53e3e; padding-left: 1rem; margin: 1rem 0; background: #f9f9f9; padding: 1rem;">
					${message.replace(/\n/g, '<br>')}
				</blockquote>
				
				<p>One of our organizers will get back to you soon! In the meantime, here's what we do:</p>
				<ul>
					<li>🍽️ <strong>Sundays at 2:00 PM</strong> - Weekly meal sharing in downtown Morgantown</li>
					<li>🥄 <strong>Saturdays at 12:00 PM</strong> - Food prep and volunteer coordination</li>
					<li>📅 <strong>First Friday, 7:00 PM</strong> - Monthly planning meeting (WVU Student Union)</li>
					<li>🚗 Food recovery pickups from local businesses</li>
				</ul>
				
				<p><strong>New volunteers are always welcome!</strong> No experience necessary - we'll show you the ropes.</p>
				
				<p>Remember: <strong style="color: #e53e3e;">Food is a Human Right, Not a Privilege!</strong></p>
				
				<p>In solidarity,<br>
				<strong>Food Not Bombs Morgantown</strong></p>
				
				<hr>
				<p style="font-size: 0.9em; color: #666;">
					Food Not Bombs Morgantown is part of the global all-volunteer movement that recovers 
					food and shares free vegan meals with the hungry to protest war, poverty and environmental destruction.
				</p>
			`;

			// Send admin email
			await mg.messages.create(domain, {
				from: fromEmail,
				to: [toEmail],
				subject: `FNB Morgantown: New Volunteer Interest - ${name}`,
				html: adminEmailHtml
			});

			// Send confirmation email
			await mg.messages.create(domain, {
				from: fromEmail,
				to: [email],
				subject: 'Welcome to Food Not Bombs Morgantown!',
				html: confirmationEmailHtml
			});

			return {
				success: true
			};
		} catch (error) {
			console.error('Email sending failed:', error);
			return fail(500, {
				message: 'Failed to send email. Please try again later.'
			});
		}
	}
};