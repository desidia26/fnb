<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	
	onMount(() => {
		theme.init();
	});
	
	function toggleTheme() {
		theme.toggle();
	}
</script>

<button 
	on:click={toggleTheme}
	class="theme-toggle"
	aria-label="Toggle between light and dark mode"
	title="Toggle theme"
>
	{#if $theme === 'dark'}
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="12" cy="12" r="5"/>
			<line x1="12" y1="1" x2="12" y2="3"/>
			<line x1="12" y1="21" x2="12" y2="23"/>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
			<line x1="1" y1="12" x2="3" y2="12"/>
			<line x1="21" y1="12" x2="23" y2="12"/>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
		</svg>
		<span class="sr-only">Switch to light mode</span>
	{:else}
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
		</svg>
		<span class="sr-only">Switch to dark mode</span>
	{/if}
</button>

<style>
	.theme-toggle {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 1000;
		background: var(--color-surface-elevated);
		border: 2px solid var(--color-border);
		border-radius: 50%;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		color: var(--color-text-primary);
		box-shadow: 0 4px 20px var(--shadow-medium);
	}
	
	.theme-toggle:hover {
		background: var(--color-accent);
		color: var(--color-text-inverse);
		transform: scale(1.1);
		box-shadow: 0 6px 25px var(--shadow-heavy);
	}
	
	.theme-toggle:focus {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}
	
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>