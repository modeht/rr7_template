import type { StateCreator } from 'zustand';

export type ThemeSlice = {
	toggle: () => void;
	mode: 'light' | 'dark' | 'inherit' | undefined;
};

export const createThemeSlice: StateCreator<ThemeSlice, [], [], ThemeSlice> = (set) => {
	return {
		mode: undefined,
		toggle: () =>
			set((state) => {
				if (typeof window !== 'undefined') {
					document.cookie = `theme=${state.mode === 'light' ? 'dark' : 'light'}; Max-age=${
						5 * 365 * 24 * 60 * 60
					}; path=/`;
				}
				return {
					...state,
					mode: state.mode === 'light' ? 'dark' : 'light',
				};
			}),
	};
};
