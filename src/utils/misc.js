import { uniq } from 'lodash';
import { mean, min, max } from 'd3';
import { images } from '../inputs/dataPaths';
import { categories } from '../inputs/polarization';

// extract attribution date range from data
export const getTimeRange = (data) => {
  const maxAttributionDate = max(data, (d) => d.attributionDate);
  return([min(data, (d) => d.attributionDate), new Date(
    maxAttributionDate.getFullYear(), maxAttributionDate.getMonth() + 5
  )]);
};

// preload images
export const preloadImages = (data) => {
  data.forEach((d) => (new Image()).src = `${images}${d.caseHash}.jpg`);
}

// split string in array
export const splitString = (s) => {
  if (s === '' || s === ',') return ['unspecified'];
  return(s
          .split(',')
          .map((d) => d.trim())
          .filter((d) => d !== ''));
};

// clean countries array
export const cleanCountries = (countries) =>
  countries
    .map((c) =>
      c
        .trim()
        .replace(/^US$/, 'United States of America')
        .replace(/^United States$/, 'United States of America')
    );

// check, if there's an overlap between array and filter
export const haveOverlap = (filter, arr) =>
  filter.filter((d) => d.selected).map((d) => d.id).some((item) => arr.includes(item));

// check, if a number is within a 2D range (given as array with length 2)
export const withinRange = (arr, num) => num >= arr[0] && num <= arr[1];

// check, if a search string (filter) is included in a string
export const includesTextSearch = (filter, s) => {
  const filterArr = filter.toLowerCase().split(' or ');
  if (filterArr.length === 0) return true;
  return filterArr.some((f) => {
    return s.indexOf(f) > -1;
  });
};

// check if case id filter is set and if id is matching
export const isCaseId = (filter, id) => filter === undefined ? true : (filter === id);

// check, if polarization data can be shown
export const showPolarization = (filter, polarization) => {
  if (!filter) return(true);
  return(polarization.fulfills10Articles || polarization.fulfills25Percent);
};

// check, if cib data can be shown
export const showCib = (filter, cib) => {
  if (!filter) return(true);
  return(cib.hasCib);
};

// extract filter items from data
export const extractFilterCategories = (data, name) =>
  uniq(data.map((d) => d[name]).flat());

// functions to compute density
// https://www.d3-graph-gallery.com/graph/density_basic.html
export const kernelEpanechnikov = (k) => (v) =>
  Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;

export const kernelDensityEstimator = (kernel, X) => (V) =>
  X.map((x) => [
    x,
    mean(V, function (v) {
      return kernel(x - v);
    }),
  ]);

// extract host name from URL
// https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
export const extractHostname = (url) => {
  let hostname = url.indexOf('//') > -1 ? url.split('/')[2] : url.split('/')[0];
  hostname = hostname.split(':')[0];
  hostname = hostname.split('?')[0];
  return hostname;
};

// consistent sort function
export const sortConsistently = (itemA, itemB, property, key) => {
  let valueA = itemA[property];
  let valueB = itemB[property];

  if (typeof valueA === 'string') valueA = valueA.trim().toLowerCase();
  if (typeof valueB === 'string') valueB = valueB.trim().toLowerCase();
  if (typeof valueA === 'number') valueA = +valueA;
  if (typeof valueB === 'number') valueB = +valueB;
  if (typeof valueA === 'number' && isNaN(valueA)) valueA = 0;
  if (typeof valueB === 'number' && isNaN(valueB)) valueB = 0;

  let r = valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
  
  if (r === 0) {
    r = typeof itemA[key] !== 'undefined' && typeof itemB[key] !== 'undefined'
        ? +itemA[key] - +itemB[key]
        : 0;
  }
  return r;
};

// scroll-to function (also set on window to make it available outside svelte)
export const scrollTo = (targetId, collapsibleId) => {
  if (collapsibleId) {
    document.getElementById(collapsibleId).checked = true;
  }

  document.querySelector('.draw-wrapper').classList.add('no-pointer-events');

  setTimeout(() => {
    document.getElementById(targetId).scrollIntoView({behavior: 'smooth'});
    setTimeout(() => {
      document.querySelector('.draw-wrapper').classList.remove('no-pointer-events');
    }, 1000);
  }, 200);
  return(false);
};
window.scrollsmooth = scrollTo;

// calculate average polarization using weights
export const averagePolarization = (polarization) => {
  const weightedEngagement = Object.keys(polarization).map((id) => {
    const weight = categories.find((c) => c.id === id).weight;
    return(weight * polarization[id]);
  })
  .reduce((acc, cur) => acc + cur);

  const totalEngagement = Object.keys(polarization).map((id) => polarization[id]).reduce((acc, cur) => acc + cur);

  return(weightedEngagement / totalEngagement);
};
