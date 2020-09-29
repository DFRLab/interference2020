import { writable, derived } from 'svelte/store';

export const hovered = writable(null);
export const tooltip = derived(hovered, ($hovered) => {
  return $hovered;
});
