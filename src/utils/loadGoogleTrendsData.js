import { googleTrendsApiPath } from '../inputs/dataPaths';

const loadGoogleTrendsData = async (keyword) => {
  const response = await fetch(`${googleTrendsApiPath}${encodeURIComponent(keyword)}`);
  return(response.json());
};

export default loadGoogleTrendsData;
