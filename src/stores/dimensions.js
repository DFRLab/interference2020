import { writable, derived } from 'svelte/store';

export const width = writable();
export const height = writable();

export const panelHeight = derived(height, ($height) => ($height / 2));
export const mapHeight = derived([height, panelHeight], ([$height, $panelHeight]) => ($height - $panelHeight));

export const margin = derived(panelHeight, ($panelHeight) => ({
  top: $panelHeight / 2.5,
  right: 100,
  bottom: 0,
  left: 100
}));

export const minDim = derived([width, panelHeight], ([$width, $panelHeight]) => $width > $panelHeight ? $panelHeight: $width);
export const maxDim = derived([width, panelHeight], ([$width, $panelHeight]) => $width > $panelHeight ? $width : $panelHeight);

export const controlsHeight = writable();
