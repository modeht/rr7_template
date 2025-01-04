import { create } from 'zustand';
import { createThemeSlice, type ThemeSlice } from './themeSlice';
import { persist } from 'zustand/middleware';

export type PersistedStoreState = ThemeSlice & {};

export const usePersistedStore = create<PersistedStoreState>()(
	persist((...a) => ({ ...createThemeSlice(...a) }), { name: 'store' })
);
