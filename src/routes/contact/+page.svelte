<script lang="ts">
	import { enhance } from '$app/forms';
	
	let loading = false;
	let message = '';
	let messageType: 'success' | 'error' | '' = '';
</script>

<main class="container">
	<h1>Join Food Not Bombs Morgantown</h1>
	<p>Ready to get involved with our Morgantown chapter? Whether you want to volunteer at our weekly meal sharing, help with food prep, or learn more about upcoming events, we'd love to hear from you!</p>
	
	{#if message}
		<div class="message {messageType}">
			{message}
		</div>
	{/if}
	
	<form 
		method="POST" 
		action="?/contact"
		use:enhance={() => {
			loading = true;
			message = '';
			return async ({ result }) => {
				loading = false;
				if (result.type === 'success') {
					messageType = 'success';
					message = 'Thank you! Your message has been sent successfully.';
					// Reset form
					const form = document.querySelector('form') as HTMLFormElement;
					form.reset();
				} else if (result.type === 'failure') {
					messageType = 'error';
					message = result.data?.message || 'Something went wrong. Please try again.';
				}
			};
		}}
	>
		<div class="form-group">
			<label for="name">Name *</label>
			<input 
				type="text" 
				id="name" 
				name="name" 
				required 
				disabled={loading}
			/>
		</div>
		
		<div class="form-group">
			<label for="email">Email *</label>
			<input 
				type="email" 
				id="email" 
				name="email" 
				required 
				disabled={loading}
			/>
		</div>
		
		<div class="form-group">
			<label for="company">Company</label>
			<input 
				type="text" 
				id="company" 
				name="company" 
				disabled={loading}
			/>
		</div>
		
		<div class="form-group">
			<label for="interest">How would you like to get involved? *</label>
			<select 
				id="interest" 
				name="interest" 
				required 
				disabled={loading}
			>
				<option value="">Select your interest...</option>
				<option value="meal-serving">Help with weekly meal serving (Sundays)</option>
				<option value="food-prep">Help with food prep (Saturdays)</option>
				<option value="food-recovery">Food recovery/pickup from businesses</option>
				<option value="monthly-meeting">Attend monthly planning meeting</option>
				<option value="event-info">Get updates about events and volunteer opportunities</option>
				<option value="new-volunteer">I'm new and want to learn more</option>
				<option value="other">Other</option>
			</select>
		</div>
		
		<div class="form-group">
			<label for="message-text">Your Message *</label>
			<textarea 
				id="message-text" 
				name="message" 
				rows="5" 
				required 
				disabled={loading}
				placeholder="Tell us about yourself, your interests, or any questions you have about Food Not Bombs..."
			></textarea>
		</div>
		
		<button type="submit" disabled={loading}>
			{#if loading}
				Sending...
			{:else}
				Send Message
			{/if}
		</button>
	</form>
	
	<div class="back-link">
		<a href="/">← Back to Home</a>
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Open+Sans:wght@400;600;700&display=swap');
	
	.container {
		max-width: 700px;
		margin: 0 auto;
		padding: 2rem;
		font-family: var(--font-body);
		line-height: 1.6;
	}
	
	h1 {
		font-family: var(--font-heading);
		color: var(--color-text-primary);
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		text-align: center;
		border-bottom: 3px solid var(--color-accent);
		padding-bottom: 1rem;
		position: relative;
	}
	
	h1::after {
		content: '';
		position: absolute;
		bottom: -3px;
		left: 50%;
		transform: translateX(-50%);
		width: 80px;
		height: 3px;
		background: var(--color-accent-light);
	}
	
	p {
		color: var(--color-text-secondary);
		font-size: 1.1rem;
		text-align: center;
		margin-bottom: 2rem;
	}
	
	.message {
		padding: 1.2rem 1.5rem;
		margin: 2rem 0;
		border-radius: 12px;
		font-weight: 500;
		border-left: 4px solid;
		box-shadow: 0 4px 15px var(--shadow-light);
		border: 1px solid;
	}
	
	.message.success {
		background-color: var(--color-surface-elevated);
		color: #059669;
		border-left-color: #10b981;
		border-color: #10b981;
	}
	
	.message.error {
		background-color: var(--color-surface-elevated);
		color: var(--color-accent);
		border-left-color: var(--color-accent);
		border-color: var(--color-accent);
	}
	
	form {
		background: var(--color-surface);
		padding: 2rem;
		border-radius: 16px;
		border: 2px solid var(--color-border);
		margin: 2rem 0;
		box-shadow: 0 8px 30px var(--shadow-medium);
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}
	
	form::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-light) 100%);
	}
	
	form:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 40px var(--shadow-medium);
	}
	
	.form-group {
		margin-bottom: 1.5rem;
	}
	
	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: var(--color-text-primary);
		font-family: var(--font-heading);
		font-size: 1.1rem;
	}
	
	input, textarea, select {
		width: 100%;
		padding: 0.875rem;
		border: 2px solid var(--color-border);
		border-radius: 12px;
		font-size: 1rem;
		font-family: var(--font-body);
		transition: all 0.3s ease;
		background: var(--color-surface-elevated);
		color: var(--color-text-primary);
	}
	
	/* Ensure form inputs work well in both themes */
	:global([data-theme="light"]) input,
	:global([data-theme="light"]) textarea,
	:global([data-theme="light"]) select {
		background: var(--color-surface);
		color: var(--color-text-primary);
	}
	
	:global([data-theme="dark"]) input,
	:global([data-theme="dark"]) textarea,
	:global([data-theme="dark"]) select {
		background: var(--color-surface-elevated);
		color: var(--color-text-primary);
	}
	
	input:focus, textarea:focus, select:focus {
		outline: none;
		border-color: var(--color-accent);
		box-shadow: 0 0 0 3px rgba(255, 71, 87, 0.1);
		transform: translateY(-1px);
	}
	
	input:disabled, textarea:disabled, select:disabled {
		background-color: var(--color-bg-secondary);
		cursor: not-allowed;
		opacity: 0.6;
	}
	
	input::placeholder, textarea::placeholder {
		color: var(--color-text-muted);
	}
	
	textarea {
		resize: vertical;
		min-height: 120px;
	}
	
	select {
		cursor: pointer;
	}
	
	button {
		background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%);
		color: var(--color-text-inverse);
		padding: 1rem 2.5rem;
		border: none;
		border-radius: 12px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		box-shadow: 0 6px 20px rgba(255, 71, 87, 0.3);
		width: 100%;
		font-family: var(--font-body);
		position: relative;
		overflow: hidden;
	}
	
	button::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s;
	}
	
	button:hover:not(:disabled) {
		transform: translateY(-3px);
		box-shadow: 0 8px 25px rgba(255, 71, 87, 0.4);
	}
	
	button:hover:not(:disabled)::before {
		left: 100%;
	}
	
	button:disabled {
		background: var(--color-text-muted);
		cursor: not-allowed;
		transform: none;
		box-shadow: none;
	}
	
	.back-link {
		margin-top: 3rem;
		text-align: center;
	}
	
	.back-link a {
		color: var(--color-accent);
		text-decoration: none;
		font-weight: 600;
		font-family: var(--font-heading);
		font-size: 1.1rem;
		border-bottom: 2px solid transparent;
		transition: all 0.2s ease;
		padding: 0.5rem 1rem;
		border-radius: 8px;
	}
	
	.back-link a:hover {
		border-bottom-color: var(--color-accent);
		background: var(--color-surface);
		transform: translateY(-1px);
	}
	
	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}
		
		h1 {
			font-size: 2rem;
		}
		
		form {
			padding: 1.5rem;
		}
		
		form:hover {
			transform: none;
		}
	}
	
	/* Accessibility improvements */
	@media (prefers-reduced-motion: reduce) {
		form, button, input, textarea, select {
			transition: none;
		}
		
		form:hover, button:hover, input:focus, textarea:focus, select:focus {
			transform: none;
		}
		
		button::before {
			display: none;
		}
	}
	
	/* High contrast mode support */
	@media (prefers-contrast: high) {
		input, textarea, select {
			border-width: 3px;
		}
		
		button {
			border: 2px solid var(--color-text-inverse);
		}
	}
</style>