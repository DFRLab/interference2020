import {
  timeScale,
  smiTotalYScale,
  smiTotalRScale,
  smiShareRScale,
  attributionScoreScale,
  centroidScale,
  polarizationScale } from '../stores/scales';
import {
  usaRed,
  polBlue,
  polLightBlue,
  polPurple,
  polLightRed,
  polRed } from '../utils/colors';
import {
  scaleTime,
  scaleLinear,
  scaleSqrt,
  scaleLog,
  max,
  group } from 'd3';
import { getTimeRange } from '../utils/misc';

// sets all the basic scales
export const setScales = (data, width, minDim, maxDim, panelHeight, margin) => {
  if (!data) return;
  
  // time scale
  timeScale.set(scaleTime()
    .domain(getTimeRange(data))
    .range([margin.left, width - margin.right]));

  // smi total scale for the y axis
  smiTotalYScale.set(scaleLog()
    .domain([10, max(data, (d) => d.smiTotal)])
    .range([panelHeight - margin.bottom, margin.top]));

  // smi total scale for the radii
  smiTotalRScale.set(scaleSqrt()
    .domain([0, max(data, (d) => d.smiTotal)])
    .range([width * 0.009, width * 0.04]));

  // smi share scale for the radii
  smiShareRScale.set(scaleLinear()
    .domain([0, 1])
    .range([0, minDim * 0.15]));

  // attribution score scale
  attributionScoreScale.set(scaleLinear()
    .domain([-1, 1.1 * max(data, (d) => d.attributionScore)])
    .range(['#FFFFFF', usaRed]));

  // centroid scale
  const casesPerCountry = [...group(data.map((d) => d.disinformantNation).flat(), (d) => d)].map((d) => d[1].length);

  centroidScale.set(scaleSqrt()
    .domain([0, max(casesPerCountry)])
    .range([maxDim * 0.0005, maxDim * 0.01]));

  // polarization scale
  polarizationScale.set(scaleLinear()
    .domain([-2, 0, 2])
    .range([polBlue, polPurple, polRed]));
};
