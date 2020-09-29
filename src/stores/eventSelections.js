import { writable, readable, derived } from 'svelte/store';

function createSelected() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    add: (obj) => update((f) => !f.map((d) => d.id).includes(obj.id) ? [...f, obj] : f),
    remove: (obj) => update((f) => f.filter((d) => d.id !== obj.id)),
    reset: () => set([])
  };
}

export const hovered = writable(null);
export const selected = createSelected([]);

export const tooltip = derived([hovered, selected], ([$hovered, $selected]) => {
  // if ($selected && $selected.length > 0) return $selected.slice(-1)[0];
  return $hovered;
});
