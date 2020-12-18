export const baseUrl = 'https://interference2020.org';
// export const baseUrl = 'http://localhost:5000';

export const urlFromFilters = (disinformantNations,
                               platforms,
                               methods,
                               sources,
                               sourceCategories,
                               tags,
                               attributionScores,
                               polarization,
                               textSearch,
                               contextData,
                               caseId = '',
                               highlightPolarization,
                               highlightCib) => {
  const params = {
    ts: encodeURIComponent(textSearch),
    as: [attributionScores[0], attributionScores[1]].join(';'),
    pol: [Math.round(100 * polarization[0]) / 100, Math.round(100 * polarization[1]) / 100].join(';'),
    f: filtersToHex([disinformantNations, platforms, methods, sources, sourceCategories, tags, contextData]),
    id: caseId,
    bool: filtersToBin([highlightPolarization, highlightCib])
  };

  return `${baseUrl}/#${params.f}&${params.id}&${params.ts}&${params.as}&${params.pol}&${params.bool}`;
};

export const filtersToHex = (arr) => {
  const hex = arr.map((d) => binaryToHex(d.map((d) => +d.selected).join(''))).join('&');
  return hex;
};

export const filtersToBin = (arr) => {
  const bin = arr.map((d) => d ? 1 : 0).join('');
  return bin;
};

export const binaryToHex = (binary) => parseInt(binary , 2).toString(16).toLowerCase();

export const hexToBinary = (hex) => parseInt(hex, 16).toString(2);

export const binaryToBool = (binary) => binary.split('').map((d) => d === '0' ? false : true);

export const parseUrl = (hash) => {
  const s = hash.substring(1);
  const [ disinformantNations, platforms, methods, sources, sourceCategories, tags, contextData, caseId, textSearch, attributionScores, polarization, bools] = s.split('&');

  const boolArray = bools.split('').map((d) => +d === 1 ? true : false);

  return {
    disinformantNations: binaryToBool(hexToBinary(disinformantNations)),
    platforms: binaryToBool(hexToBinary(platforms)),
    methods: binaryToBool(hexToBinary(methods)),
    sources: binaryToBool(hexToBinary(sources)),
    sourceCategories: binaryToBool(hexToBinary(sourceCategories)),
    tags: binaryToBool(hexToBinary(tags)),
    contextData: binaryToBool(hexToBinary(contextData)),
    caseId: caseId === '' ? undefined : +caseId,
    textSearch: decodeURIComponent(textSearch),
    attributionScores: attributionScores.split(';').map((d) => +d),
    polarization: polarization.split(';').map((d) => +d),
    highlightPolarization: boolArray[0],
    highlightCib: boolArray[1]
  };
}; 
