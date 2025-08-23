import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'dark' | 'light';

function createThemeStore() {
	// Default to dark mode, check localStorage if in browser
	const defaultTheme: Theme = 'dark';
	let initialTheme = defaultTheme;
	
	if (browser) {
		const stored = localStorage.getItem('fnb-theme') as Theme | null;
		initialTheme = stored || defaultTheme;
	}
	
	const { subscribe, set, update } = writable<Theme>(initialTheme);
	
	return {
		subscribe,
		set: (theme: Theme) => {
			if (browser) {
				localStorage.setItem('fnb-theme', theme);
				document.documentElement.setAttribute('data-theme', theme);
			}
			set(theme);
		},
		toggle: () => {
			update(currentTheme => {
				const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
				if (browser) {
					localStorage.setItem('fnb-theme', newTheme);
					document.documentElement.setAttribute('data-theme', newTheme);
				}
				return newTheme;
			});
		},
		init: () => {
			if (browser) {
				document.documentElement.setAttribute('data-theme', initialTheme);
			}
		}
	};
}

export const theme = createThemeStore();