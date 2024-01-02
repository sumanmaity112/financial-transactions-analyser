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

const groupBy = (elements, keyGenerator) =>
  elements.reduce((store, element) => {
    const key = keyGenerator(element);
    return { ...store, [key]: [...(store[key] || []), element] };
  }, {});

const transactionKeyByType = ({ isCredited }) =>
  isCredited ? "Credit" : "Debit";

export const calculateTotalAmountByTransactionType = (transactions) => {
  const groupedTransactions = groupBy(transactions, transactionKeyByType);
  return Object.keys(groupedTransactions).reduce(
    (store, key) => ({
      ...store,
      [key]: groupedTransactions[key].reduce(
        (totalAmount, { amount }) => totalAmount + amount,
        0,
      ),
    }),
    {},
  );
};

export const readObjectProperty = (object, path) => {
  return path
    .split(".")
    .filter((key) => key !== "")
    .reduce((store, key) => store[key] || {}, object);
};
