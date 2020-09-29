import { oneLineTrim } from 'common-tags';
import { line, curveBasis } from 'd3';

// just a line with D3 curviness
const lineGenerator = line().curve(curveBasis);

// a simple curved line with two endpoints
export const curvyLine = (x1, y1, x2, y2) => {
  return(oneLineTrim`
          M${x1} ${y1}
          C${x1} ${(y2 - y1) / 2 + y1},
           ${x2} ${(y2 - y1) / 2 + y1},
           ${x2} ${y2}`);
};

// a double curved line with three handle points (used for the source links)
export const curvyDoubleLine = (x1, y1, x2, y2, x3, y3, shift, yOffset) => {
  if (!x1 || !y1) return(curvyLine(x2, y2, x3, y3));
  const yMulti = x1 < x2 ? -1 : 1;
  const lineData = [
    [x1, y1],
    [x1 + shift, y1 - yOffset / 2],
    [x1 + shift * 2, y1 - yOffset - shift * yMulti],
    [x1 + shift * 2, y1 - 2 * yOffset - shift * 2 * yMulti],
    [x2, Math.max(y1 - 2 * yOffset - shift * 2 * yMulti, y2)],
    [x2, Math.max(y1 - 3 * yOffset - shift * 2 * yMulti, y2)],
    [x2, y2]
  ];
  return(lineGenerator(lineData) + oneLineTrim`
          C${x2} ${(y3 - y2) / 2 + y2},
           ${x3} ${(y3 - y2) / 2 + y2},
           ${x3} ${y3}`);
};

// a soft straight line with diminishing end points (used for the timeline)
export const gentleLine = (width, xOffset, yOffset) => {
  return(oneLineTrim`M0 0
          C${xOffset / 2} 0,
           ${xOffset / 2} ${yOffset},
           ${xOffset} ${yOffset}
          L${width - xOffset} ${yOffset}
          C${width - xOffset / 2} ${yOffset},
           ${width - xOffset / 2} 0,
           ${width} 0
          C${width - xOffset / 2} 0,
           ${width - xOffset / 2} ${-yOffset},
           ${width - xOffset} ${-yOffset}
          L${xOffset} ${-yOffset}
          C${xOffset / 2} ${-yOffset},
           ${xOffset / 2} 0,
           0 0
          Z`);
}
