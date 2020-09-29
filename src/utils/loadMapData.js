import { json } from 'd3';
import { countries } from '../stores/map';
import { feature } from 'topojson';

const dataPath = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

const loadMapData = async () => {
  const world = await json(dataPath);

  countries.set(feature(world, world.objects.countries)
    .features
    .filter((d) => d.properties.name !== 'Antarctica'));  
};

export default loadMapData;
