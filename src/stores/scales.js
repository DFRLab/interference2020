import { writable, readable } from 'svelte/store';

export const timeScale = writable();
export const smiTotalYScale = writable();
export const smiTotalRScale = writable();
export const smiShareRScale = writable();
export const attributionScoreScale = writable();

export const centroidScale = writable();

export const scaleFactor = readable(window.devicePixelRatio || 1);
