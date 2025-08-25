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
		<h2>📅 Weekly Schedule</h2>
		<div class="event-grid">
			<div class="event">
				<h3>🚗 Pickup</h3>
				<p><strong>When:</strong> Saturdays 11:45 AM - 12:00 PM</p>
				<p><strong>Where:</strong> Storage areas to Sabra United Methodist</p>
				<p>Food pickup and drop off from designated storage areas</p>
			</div>
			<div class="event">
				<h3>🥄 Cooking</h3>
				<p><strong>When:</strong> Saturdays 1:00 PM - 3:45 PM</p>
				<p><strong>Where:</strong> Sabra United Methodist</p>
				<p>Prepare vegan meals - alternating hot/cold during winter. Bring fun recipes!</p>
			</div>
			<div class="event">
				<h3>🍽️ Serving</h3>
				<p><strong>When:</strong> Saturdays 4:30 PM - 6:00 PM</p>
				<p><strong>Where:</strong> Monkey Wrench Books, 214 High Street</p>
				<p>Share free vegan meals with our community outside the bookstore</p>
			</div>
			<div class="event">
				<h3>🧹 Cleanup</h3>
				<p><strong>When:</strong> Saturdays 6:30 PM - 7:15 PM</p>
				<p><strong>Where:</strong> Sabra United Methodist</p>
				<p>Clean up cooking area and organize supplies for next week</p>
			</div>
		</div>
	</section>
	
	<section class="mission-section">
		<h2>About Our Chapter</h2>
		<p>Food Not Bombs Morgantown is part of the global Food Not Bombs movement - an all-volunteer effort that recovers food waste and gives it back to the community to protest war, poverty, and capitalism.</p>
		
		<div class="local-info">
			<h3>What We Do in Morgantown</h3>
			<ul>
				<li><strong>Weekly Meal Sharing:</strong> Every Saturday we serve free vegan meals (hot and cold alternating in winter) outside Monkey Wrench Books</li>
				<li><strong>Food Recovery:</strong> We rescue food waste from local businesses and give it back to the community</li>
				<li><strong>Community Building:</strong> We connect with community members and create solidarity through shared meals</li>
				<li><strong>Activism:</strong> We protest war, poverty, and capitalism through direct action and mutual aid</li>
			</ul>
		</div>
	</section>
	
	<section class="volunteer-section">
		<h2>How to Volunteer</h2>
		<p class="volunteer-intro">Join us every Saturday! No experience necessary - we'll show you the ropes. Contact us to get added to our Signal group chat for coordination.</p>
		
		<div class="contact-methods">
			<div class="contact-method">
				<h4>📧 Email</h4>
				<p><a href="mailto:morgantownFNB@proton.me">morgantownFNB@proton.me</a></p>
			</div>
			<div class="contact-method">
				<h4>📱 Instagram</h4>
				<p><a href="https://instagram.com/morgantownfnb" target="_blank">@morgantownfnb</a></p>
			</div>
			<div class="contact-method">
				<h4>📝 Quick Signup</h4>
				<p><a href="https://signup.com/go/icxhiVO" target="_blank">Choose your volunteer role</a></p>
			</div>
		</div>
		
		<div class="volunteer-options">
			<div class="option">
				<h3>🚗 Pickup (11:45 AM - 12:00 PM)</h3>
				<p>Transport food from storage areas to cooking location. Details shared in Signal group.</p>
			</div>
			<div class="option">
				<h3>🥄 Cooking (1:00 PM - 3:45 PM)</h3>
				<p>Prepare vegan meals at Sabra United Methodist. Bring fun recipes to try!</p>
			</div>
			<div class="option">
				<h3>🍽️ Serving (4:30 PM - 6:00 PM)</h3>
				<p>Share meals with community outside Monkey Wrench Books downtown.</p>
			</div>
			<div class="option">
				<h3>🧹 Cleanup (6:30 PM - 7:15 PM)</h3>
				<p>Clean up cooking area and organize for next week. Essential community care!</p>
			</div>
		</div>
	</section>
	
	<section class="contact-section">
		<h2>Join Us Every Saturday!</h2>
		<p>Come share a meal with us on Saturdays at 4:30 PM at <strong>Monkey Wrench Books</strong> (214 High Street) in downtown Morgantown! Whether you want to volunteer or just need a meal, all are welcome.</p>
		<p>Ready to get involved? <a href="https://signup.com/go/icxhiVO" target="_blank">Sign up for a volunteer role</a>, email us at <a href="mailto:morgantownFNB@proton.me">morgantownFNB@proton.me</a>, or <a href="/contact">use our contact form</a>.</p>
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
	
	.volunteer-intro {
		text-align: center;
		font-size: 1.1rem;
		margin-bottom: 2rem;
		color: var(--color-text-secondary);
	}

	.contact-methods {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
		margin: 2rem 0;
		padding: 1.5rem;
		background: var(--color-surface-elevated);
		border-radius: 12px;
		border: 2px solid var(--color-border);
	}

	.contact-method {
		text-align: center;
		padding: 1rem;
	}

	.contact-method h4 {
		font-family: var(--font-heading);
		color: var(--color-accent);
		font-size: 1.1rem;
		margin: 0 0 0.5rem 0;
	}

	.contact-method p {
		margin: 0;
	}

	.contact-method a {
		color: var(--color-accent);
		text-decoration: none;
		font-weight: 600;
		border-bottom: 2px solid transparent;
		transition: all 0.2s ease;
	}

	.contact-method a:hover {
		border-bottom-color: var(--color-accent);
		color: var(--color-accent-hover);
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
		
		.contact-methods {
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
