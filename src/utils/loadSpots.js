import { csv, timeParse } from 'd3';

// this will be fetched from GitHub in future
const dataPath = 'data/spots.csv';
const parseDate = timeParse('%m/%d/%Y');

const loadSpots = async () => {
  const data = await csv(dataPath, (d, i) => {
    return {
      id: i,
      name: d.event_name,
      date: parseDate(d.date),
      description: d.description
    };
  });

  return(data);
};

export default loadSpots;
