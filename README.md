# Interference2020
> Interference2020 Website

This repository contains the visualization tool running at [interference2020.org](https://interference2020.org)

For the Interference2020 database, please go to [this repository]([/](https://github.com/DFRLab/interference2020-Data)).

## Research team
[Emerson T. Brooking](https://twitter.com/etbrooking) (lead), [Alyssa Kann](https://twitter.com/AlyssaKann), [Max Rizzuto](https://twitter.com/maxbrizzuto), [Jacqueline Malaret](https://twitter.com/jacqumalaret), and Helen Simpson.


## Design and Implementation
[Matthias Stahl](https://higsch.com) (higsch | data & design)


![Screenshot of the tool showing red balloons.](/public/images/screenshots/fiat_image.jpg)


## Architecture
The data visualization has been built with HTML, CSS and JavaScript – heavily using the [Svelte](https://svelte.dev) frontend compiler. Interference data is dynamically pulled from a separate [data repository](/). The world map is pulled from [JSDELIVR](https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json) and uses the [World Atlas](https://www.npmjs.com/package/world-atlas) TopoJSON package. COVID-19 case and death numbers in the U.S. are collected from a repository managed by [The New York Times](https://github.com/nytimes/covid-19-data).


## Run it locally

First install the dependencies. You will need to have [Node.js](https://nodejs.org) installed.

```bash
git clone https://github.com/DFRLab/interference2020.git
cd interference2020
npm install
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000) in your browser.
You should see the visualization running. 



*Built in August & September 2020.*
