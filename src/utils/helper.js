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
