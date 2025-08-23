<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="color-scheme" content="dark light" />
</svelte:head>

<ThemeToggle />
{@render children?.()}

<style>
	/* CSS Custom Properties for Anarcho Theme System */
	:global(:root) {
		/* Light Theme - Eye-Friendly Anarcho Aesthetic */
		--color-bg-primary: #f8f9fa;
		--color-bg-secondary: #e9ecef;
		--color-surface: #fdfdfd; /* Soft off-white instead of pure white */
		--color-surface-elevated: #ffffff;
		
		--color-text-primary: #1a1a1a;
		--color-text-secondary: #2d3748;
		--color-text-muted: #4a5568;
		--color-text-inverse: #fdfdfd; /* Soft white instead of pure white */
		
		--color-accent: #d63031; /* Anarchist red */
		--color-accent-hover: #b71c1c;
		--color-accent-light: #ff6b6b;
		
		--color-border: #dee2e6;
		--color-border-focus: #d63031;
		
		--shadow-light: rgba(0, 0, 0, 0.05);
		--shadow-medium: rgba(0, 0, 0, 0.1);
		--shadow-heavy: rgba(0, 0, 0, 0.2);
		
		--gradient-hero: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
		
		/* Typography */
		--font-heading: 'Crimson Text', serif;
		--font-body: 'Open Sans', sans-serif;
	}
	
	:global([data-theme="dark"]) {
		/* Dark Theme - Modern Anarcho Aesthetic */
		--color-bg-primary: #0d1117; /* Deep black */
		--color-bg-secondary: #161b22;
		--color-surface: #21262d;
		--color-surface-elevated: #30363d;
		
		--color-text-primary: #f0f6fc; /* High contrast white */
		--color-text-secondary: #e6edf3;
		--color-text-muted: #8b949e; /* Slightly better contrast */
		--color-text-inverse: #0d1117;
		
		--color-accent: #ff4757; /* Bright anarchist red */
		--color-accent-hover: #ff3742;
		--color-accent-light: #ff6b7a;
		
		--color-border: #30363d;
		--color-border-focus: #ff4757;
		
		--shadow-light: rgba(0, 0, 0, 0.3);
		--shadow-medium: rgba(0, 0, 0, 0.5);
		--shadow-heavy: rgba(0, 0, 0, 0.8);
		
		--gradient-hero: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
	}
	
	/* Global Base Styles */
	:global(*) {
		box-sizing: border-box;
	}
	
	:global(html) {
		scroll-behavior: smooth;
	}
	
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: var(--font-body);
		background-color: var(--color-bg-primary);
		color: var(--color-text-primary);
		transition: background-color 0.3s ease, color 0.3s ease;
		line-height: 1.6;
		min-height: 100vh;
	}
	
	/* High contrast focus indicators for accessibility */
	:global(*:focus-visible) {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}
	
	/* Ensure text maintains good contrast in all themes */
	:global(h1, h2, h3, h4, h5, h6) {
		color: var(--color-text-primary);
		font-family: var(--font-heading);
	}
	
	:global(p, li, span, div) {
		color: var(--color-text-secondary);
	}
	
	/* Selection colors for anarcho aesthetic */
	:global(::selection) {
		background-color: var(--color-accent);
		color: var(--color-text-inverse);
	}
	
	:global(::-moz-selection) {
		background-color: var(--color-accent);
		color: var(--color-text-inverse);
	}
	
	/* Scrollbar styling for dark theme */
	:global(::-webkit-scrollbar) {
		width: 8px;
	}
	
	:global(::-webkit-scrollbar-track) {
		background: var(--color-bg-secondary);
	}
	
	:global(::-webkit-scrollbar-thumb) {
		background: var(--color-border);
		border-radius: 4px;
	}
	
	:global(::-webkit-scrollbar-thumb:hover) {
		background: var(--color-accent);
	}
</style>
