import { googleTrendsApiPath } from '../inputs/dataPaths';

const loadGoogleTrendsData = async (keyword) => {
  let data = [];
  try {
    const response = await fetch(`${googleTrendsApiPath}${encodeURIComponent(keyword)}`);
    data = (await response.json()).map((d) => ({
      ...d,
      date: new Date(d.time * 1000)
    }))
    .filter((d) => !d.isPartial);
  } finally {
    return(data);
  }
};

export default loadGoogleTrendsData;
