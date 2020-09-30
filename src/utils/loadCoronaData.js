import { csv, timeParse } from 'd3';
import { sortConsistently } from './misc';
import { coronaData } from '../inputs/dataPaths';

const parseDate = timeParse('%Y-%m-%d');

const loadCoronaData = async () => {
  const data = (await csv(coronaData, (d, i) => {
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
