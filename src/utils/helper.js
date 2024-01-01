import { scaleDiverging } from "d3-scale";
import { interpolateWarm } from "d3-scale-chromatic";

export const generateColors = (count) => {
  const colors = [];

  for (let i = 0; i < count; i++) {
    colors.push(scaleDiverging(interpolateWarm)(i / count));
  }

  return colors;
};

export const isEmpty = (value) => {
  if (Array.isArray(value) || typeof value === "string") {
    return !value.length;
  }

  for (const key in value) {
    if (value[key] !== undefined && value[key] !== null) {
      return false;
    }
  }
  return true;
};
