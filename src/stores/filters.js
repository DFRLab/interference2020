import { writable } from 'svelte/store';
import { uniq } from 'lodash';

function createRangeFilter() {
  const { subscribe, set, update } = writable([0, 0]);

  return {
    subscribe,
    set,
    setMin: (value) => update((f) => f[0] = value),
    setMax: (value) => update((f) => f[1] = value)
  };
}

function createInclusiveFilter() {
  const { subscribe, set, update } = writable([]);

  const select = (id) => update((f) => f.map((d) => ({...d, selected: [id].flat().includes(d.id) ? true : d.selected})));
  const unselectAll = () => update((f) => f.map((d) => ({...d, selected: false})));

  return {
    subscribe,
    set: (value) => set(value),
    init: (values, id) => set(uniq(values.map((d) => d[id]).flat()).map((id) => ({id, name: id, selected: true}))),
    select,
    selectOne: (id) => {
      unselectAll();
      select(id)
    },
    selectAll: () => update((f) => f.map((d) => ({...d, selected: true}))),
    unselect: (id) => update((f) => f.map((d) => ({...d, selected: [id].flat().includes(d.id) ? false : d.selected}))),
    unselectAll
  };
}

function createTextSearchFilter() {
  const { subscribe, set } = writable('');

  return {
    subscribe,
    set,
    reset: () => set('')
  };
}

export const disinformantNationFilter = createInclusiveFilter();

export const platformFilter = createInclusiveFilter();

export const methodFilter = createInclusiveFilter();

export const sourceFilter = createInclusiveFilter();

export const sourceCategoryFilter = createInclusiveFilter();

export const attributionScoreFilter = createRangeFilter();
export const attributionScoreDef = [0, 18];

export const unselectAllFilters = (disinformantNation = true) => {
  if (disinformantNation) disinformantNationFilter.unselectAll();
  platformFilter.unselectAll();
  methodFilter.unselectAll();
  sourceFilter.unselectAll();
  sourceCategoryFilter.unselectAll();
  attributionScoreFilter.set(attributionScoreDef);
};

export const selectAllFilters = (disinformantNation = true) => {
  if (disinformantNation) disinformantNationFilter.selectAll();
  platformFilter.selectAll();
  methodFilter.selectAll();
  sourceFilter.selectAll();
  sourceCategoryFilter.selectAll();
  attributionScoreFilter.set(attributionScoreDef);
  textSearchFilter.reset();
};

export const textSearchFilter = createTextSearchFilter();

export const contextData = createInclusiveFilter();

export const brushed = writable(false);
export const originalTimeDomain = writable(null);
