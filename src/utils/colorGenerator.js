import { interpolateWarm } from "d3-scale-chromatic";

import { scaleDiverging } from "d3-scale";

export const generateColors = (count) => {
  const colors = [];

  for (let i = 0; i < count; i++) {
    colors.push(scaleDiverging(interpolateWarm)(i / count));
  }

  return colors;
};
