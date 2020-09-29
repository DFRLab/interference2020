import { writable, derived } from 'svelte/store';
import { width, mapHeight } from './dimensions';
import {
  geoMercator,
  geoPath as d3geoPath,
  min,
  max } from 'd3';

const offsetFactor = 1.2;

export const countries = writable([]);

export const projection = derived([width, mapHeight, countries], 
                                  ([$width, $mapHeight, $countries]) => {
                                    if ($countries.length === 0) return;

                                    const unitProjection = geoMercator()
                                      .scale(1)
                                      .translate([0, 0]);

                                    const tmpPath = d3geoPath().projection(unitProjection);

                                    const allBounds = $countries.map(tmpPath.bounds);
                                    const bounds = [[min(allBounds, (d) => d[0][0]), min(allBounds, (d) => d[0][1])],
                                                    [max(allBounds, (d) => d[1][0]), max(allBounds, (d) => d[1][1])]];

                                    const scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / $width, (bounds[1][1] - bounds[0][1]) / $mapHeight / offsetFactor);
                                    const offset = [($width - scale * (bounds[1][0] + bounds[0][0])) / 2, ($mapHeight / offsetFactor - scale * (bounds[1][1] + bounds[0][1])) / 2];

                                    return(
                                      unitProjection
                                        .translate(offset)
                                        .scale(scale)
                                    );
                                  });

export const geoPath = derived(projection, ($projection) => d3geoPath().projection($projection));
