import App from './App.svelte';

import { googleAnalytics } from './analytics.js';
import CookiesEuBanner from '../node_modules/cookies-eu-banner/dist/cookies-eu-banner.min.js';

const app = new App({
  target: document.querySelector('#svelte-target'),
});

new CookiesEuBanner(function () {
  googleAnalytics('UA-42996383-16');
}, true);

export default app;
