import { googleTrendsApiPath } from '../inputs/dataPaths';

const loadGoogleTrendsData = async (keyword) => {
  const response = await fetch(`${googleTrendsApiPath}${encodeURIComponent(keyword)}`);
  const data = (await response.json()).map((d) => ({
    ...d,
    date: new Date(d.time * 1000)
  }));
  return(data.filter((d) => !d.isPartial));
};

export default loadGoogleTrendsData;
