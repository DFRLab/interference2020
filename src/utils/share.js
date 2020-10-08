export const baseUrl = 'https://interference2020.org';

export const urlFromFilters = (disinformantNations,
                               platforms,
                               methods,
                               sources,
                               sourceCategories,
                               attributionScores,
                               textSearch,
                               contextData,
                               caseId = '') => {
  const params = {
    ts: textSearch,
    as: [attributionScores[0], attributionScores[1]].join(';'),
    f: filtersToHex([disinformantNations, platforms, methods, sources, sourceCategories, contextData]),
    id: caseId
  };

  return `${baseUrl}/#${params.f}-${params.id}-${params.ts}-${params.as}`;
};

export const filtersToHex = (arr) => {
  const hex = arr.map((d) => binaryToHex(d.map((d) => +d.selected).join(''))).join('-');
  return hex;
};

export const binaryToHex = (binary) => parseInt(binary , 2).toString(16).toLowerCase();

export const hexToBinary = (hex) => parseInt(hex, 16).toString(2);

export const binaryToBool = (binary) => binary.split('').map((d) => d === '0' ? false : true);

export const parseUrl = (hash) => {
  const s = hash.substring(1);
  const [ disinformantNations, platforms, methods, sources, sourceCategories, contextData, caseId, textSearch, attributionScores] = s.split('-');

  return {
    disinformantNations: binaryToBool(hexToBinary(disinformantNations)),
    platforms: binaryToBool(hexToBinary(platforms)),
    methods: binaryToBool(hexToBinary(methods)),
    sources: binaryToBool(hexToBinary(sources)),
    sourceCategories: binaryToBool(hexToBinary(sourceCategories)),
    contextData: binaryToBool(hexToBinary(contextData)),
    caseId: caseId === '' ? undefined : +caseId,
    textSearch,
    attributionScores: attributionScores.split(';').map((d) => +d)
  };
}; 
