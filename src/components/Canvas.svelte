<script>
  // the canvas component holding the world map
  import { width, height, panelHeight, mapHeight } from '../stores/dimensions';
  import { bg, usaRed, usaLightRed, usaLightLightRed } from '../utils/colors';
  import { countries, projection, geoPath } from '../stores/map';
  import { scaleFactor } from '../stores/scales';

  let canvas;

  $: if (canvas && $countries.length > 0) {
    canvas.width = $scaleFactor * $width;
    canvas.height = $scaleFactor * $height;
    canvas.style.width = `${$width}px`;
    canvas.style.height = `${$height}px`;

    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.scale($scaleFactor, $scaleFactor);
    ctx.translate(0, $panelHeight);

    ctx.strokeStyle = usaLightLightRed;
    ctx.fillStyle = bg;
    ctx.fillRect(0, -$panelHeight, $width, $height);
    
    $geoPath.context(ctx);

    // highlight the US
    ctx.save();
    ctx.fillStyle = usaLightLightRed;
    ctx.beginPath();
    $geoPath($countries.find((c) => c.properties.name === 'United States of America'));
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    $countries.forEach($geoPath);
    ctx.stroke();
  }
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    position: absolute;
    z-index: 0;
  }
</style>
