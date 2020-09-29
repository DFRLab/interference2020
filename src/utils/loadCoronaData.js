import { csv, timeParse } from 'd3';
import { sortConsistently } from './misc';

const dataPath = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv';
const parseDate = timeParse('%Y-%m-%d');

const loadCoronaData = async () => {
  const data = (await csv(dataPath, (d, i) => {
    return {
      id: i,
      date: parseDate(d.date),
      cases: +d.cases,
      deaths: +d.deaths
    };
  }))
  .sort((a, b) => -sortConsistently(a, b, 'date', 'id'));

  return(data);
};

export default loadCoronaData;
