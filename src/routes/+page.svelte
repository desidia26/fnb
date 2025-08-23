<main class="container">
	<header class="hero">
		<div class="logo-container">
      <!-- invert colors for dark mode -->
			<img src="/fnb-logo.png" alt="Food Not Bombs Logo" class="logo dark-logo" />
			<div class="logo-fallback">🍽️✊</div>
		</div>
		<h1>Food Not Bombs</h1>
		<h2 class="location">Morgantown, West Virginia</h2>
		<p class="tagline">Food is a Human Right • Not a Privilege</p>
	</header>
	
	<section class="meetings-section">
		<h2>📅 Upcoming Events</h2>
		<div class="event-grid">
			<div class="event">
				<h3>Weekly Meal Sharing</h3>
				<p><strong>When:</strong> Sundays at 2:00 PM</p>
				<p><strong>Where:</strong> Downtown Morgantown (location varies)</p>
				<p>Join us as we serve free vegan meals to our community</p>
			</div>
			<div class="event">
				<h3>Volunteer Prep</h3>
				<p><strong>When:</strong> Saturdays at 12:00 PM</p>
				<p><strong>Where:</strong> Community Kitchen</p>
				<p>Help us prepare meals and organize supplies</p>
			</div>
			<div class="event">
				<h3>Monthly Meeting</h3>
				<p><strong>When:</strong> First Friday of each month, 7:00 PM</p>
				<p><strong>Where:</strong> WVU Student Union</p>
				<p>Planning, coordination, and new volunteer orientation</p>
			</div>
		</div>
	</section>
	
	<section class="mission-section">
		<h2>About Our Chapter</h2>
		<p>Food Not Bombs Morgantown is part of the global Food Not Bombs movement - an all-volunteer effort that recovers food and shares free vegan meals with the hungry to protest war, poverty, and environmental destruction.</p>
		
		<div class="local-info">
			<h3>What We Do in Morgantown</h3>
			<ul>
				<li><strong>Weekly Meal Sharing:</strong> Every Sunday we serve free, hot vegan meals to anyone who needs food</li>
				<li><strong>Food Recovery:</strong> We rescue surplus food from local businesses and farmers</li>
				<li><strong>Community Outreach:</strong> We connect with homeless services, student organizations, and community groups</li>
				<li><strong>Activism:</strong> We participate in local social justice initiatives and awareness campaigns</li>
			</ul>
		</div>
	</section>
	
	<section class="volunteer-section">
		<h2>How to Volunteer</h2>
		<div class="volunteer-options">
			<div class="option">
				<h3>🥄 Meal Prep & Serving</h3>
				<p>Help cook, serve meals, and clean up. No experience necessary!</p>
			</div>
			<div class="option">
				<h3>🚗 Food Recovery</h3>
				<p>Pick up donated food from local businesses and farmers</p>
			</div>
			<div class="option">
				<h3>📋 Organization</h3>
				<p>Help with planning, outreach, and coordinating volunteers</p>
			</div>
			<div class="option">
				<h3>📢 Outreach</h3>
				<p>Share information about our work and recruit new volunteers</p>
			</div>
		</div>
	</section>
	
	<section class="contact-section">
		<h2>Join Us</h2>
		<p>New volunteers are always welcome! Whether you can spare an hour a week or want to get more involved, <a href="/contact">reach out to us</a> to learn about upcoming volunteer opportunities and meetings.</p>
	</section>
</main>

<style>
	/* ==========================================================================
	   FOOD NOT BOMBS MORGANTOWN - HOME PAGE STYLES
	   ========================================================================== */
	
	@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Open+Sans:wght@400;600;700&display=swap');
	
	/* ==========================================================================
	   BASE LAYOUT
	   ========================================================================== */
	
	.container {
		max-width: 900px;
		margin: 0 auto;
		padding: 1rem;
		font-family: var(--font-body);
		line-height: 1.6;
	}
	
	/* ==========================================================================
	   HERO SECTION
	   ========================================================================== */
	
	.hero {
		text-align: center;
		margin-bottom: 3rem;
		padding: 3rem 1rem;
		color: var(--color-text-inverse);
		border-radius: 12px;
		margin: -1rem -1rem 3rem -1rem;
		border: 2px solid var(--color-accent);
		box-shadow: 0 10px 40px var(--shadow-heavy);
		position: relative;
		overflow: hidden;
	}
	
	/* Theme-specific hero backgrounds */
	:global([data-theme="light"]) .hero {
		background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
	}
	
	:global([data-theme="dark"]) .hero {
		background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
	}
	
	.hero::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-light) 100%);
	}
	
	/* ==========================================================================
	   LOGO & BRANDING
	   ========================================================================== */
	
	.logo-container {
		position: relative;
		margin-bottom: 1rem;
		height: 150px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.logo {
		max-width: 150px;
		max-height: 150px;
		width: auto;
		height: auto;
		transition: transform 0.3s ease;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.dark-logo {
		display: block;
		filter: invert(1);
	}
	
	.logo:hover {
		transform: translate(-50%, -50%) scale(1.05);
	}
	
	.logo-fallback {
		font-size: 4rem;
		line-height: 1;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
	}
	
	/* ==========================================================================
	   HERO TYPOGRAPHY
	   ========================================================================== */
	
	h1 {
		font-family: var(--font-heading);
		font-size: 3rem;
		font-weight: 700;
		margin: 1rem 0 0.2rem 0;
		color: #ffffff !important;
		letter-spacing: -1px;
		text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
		position: relative;
		z-index: 1;
	}
	
	.location {
		font-family: var(--font-body);
		font-size: 1.3rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.9);
		margin: 0 0 1rem 0;
		letter-spacing: 0.5px;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
	}
	
	.tagline {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--color-accent-light);
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 1px;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
		filter: brightness(1.2);
	}
	
	h2 {
		font-family: var(--font-heading);
		color: var(--color-text-primary);
		font-size: 2.2rem;
		font-weight: 600;
		margin: 2.5rem 0 1rem 0;
		border-bottom: 3px solid var(--color-accent);
		padding-bottom: 0.5rem;
		position: relative;
	}
	
	h2::after {
		content: '';
		position: absolute;
		bottom: -3px;
		left: 0;
		width: 60px;
		height: 3px;
		background: var(--color-accent);
	}
	
	h3 {
		font-family: var(--font-heading);
		color: var(--color-text-primary);
		font-size: 1.4rem;
		font-weight: 600;
		margin: 1.5rem 0 0.8rem 0;
	}
	
	.meetings-section, .mission-section, .volunteer-section, .contact-section {
		margin: 3rem 0;
		padding: 2rem;
		border-left: 4px solid var(--color-accent);
		background: var(--color-surface);
		border-radius: 0 12px 12px 0;
		box-shadow: 0 4px 20px var(--shadow-light);
		transition: all 0.3s ease;
		border: 1px solid var(--color-border);
	}
	
	.meetings-section:hover, .mission-section:hover, .volunteer-section:hover, .contact-section:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px var(--shadow-medium);
	}
	
	.event-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}
	
	.event {
		background: var(--color-surface-elevated);
		padding: 1.5rem;
		border-radius: 12px;
		border: 2px solid var(--color-border);
		transition: all 0.3s ease;
		position: relative;
	}
	
	.event::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--color-accent);
		border-radius: 12px 12px 0 0;
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	
	.event:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 30px var(--shadow-medium);
		border-color: var(--color-accent);
	}
	
	.event:hover::before {
		opacity: 1;
	}
	
	.event h3 {
		margin-top: 0;
		color: var(--color-accent);
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}
	
	.event p {
		margin: 0.5rem 0;
		color: var(--color-text-secondary);
	}
	
	.local-info ul {
		padding-left: 1.5rem;
		margin-top: 1rem;
	}
	
	.local-info li {
		margin: 1rem 0;
		color: var(--color-text-secondary);
	}
	
	.volunteer-options {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}
	
	.option {
		background: var(--color-surface-elevated);
		padding: 1.5rem;
		border-radius: 12px;
		border: 2px solid var(--color-border);
		transition: all 0.3s ease;
		position: relative;
	}
	
	.option::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--color-accent);
		border-radius: 12px 12px 0 0;
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	
	.option:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 30px var(--shadow-medium);
		border-color: var(--color-accent);
	}
	
	.option:hover::before {
		opacity: 1;
	}
	
	.option h3 {
		margin-top: 0;
		color: var(--color-accent);
		font-size: 1.2rem;
	}
	
	.option p {
		margin: 0.5rem 0 0 0;
		color: var(--color-text-secondary);
	}
	
	a {
		color: var(--color-accent);
		text-decoration: none;
		font-weight: 600;
		border-bottom: 2px solid transparent;
		transition: all 0.2s ease;
	}
	
	a:hover {
		border-bottom-color: var(--color-accent);
		color: var(--color-accent-hover);
	}
	
	p {
		color: var(--color-text-secondary);
		margin: 1rem 0;
	}
	
	strong {
		color: var(--color-text-primary);
		font-weight: 700;
	}
	
	@media (max-width: 768px) {
		.container {
			padding: 0.5rem;
		}
		
		h1 {
			font-size: 2.2rem;
		}
		
		.tagline {
			font-size: 1rem;
		}
		
		.event-grid, .volunteer-options {
			grid-template-columns: 1fr;
		}
		
		.meetings-section, .mission-section, .volunteer-section, .contact-section {
			padding: 1.5rem;
			margin: 2rem 0;
		}
		
		.hero {
			padding: 2rem 1rem;
		}
	}
	
	/* Accessibility improvements */
	@media (prefers-reduced-motion: reduce) {
		.event, .option, .meetings-section, .mission-section, .volunteer-section, .contact-section {
			transition: none;
		}
		
		.event:hover, .option:hover {
			transform: none;
		}
	}
</style>
