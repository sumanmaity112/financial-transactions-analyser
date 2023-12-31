import { csv2json } from "json-2-csv";
import { isEmpty } from "./helper.js";

export const convertCsvStatementsToJson = (csvTransactions) => {
  return csv2json(csvTransactions, {
    trimFieldValues: true,
    trimHeaderFields: true,
    keys: [
      "Transaction Date",
      "Description",
      "Chq / Ref No",
      "Debit",
      "Credit",
    ],
    parseValue: (value) => (value === "" ? undefined : value),
  })
    .filter((row) => !isEmpty(row))
    .map((row, index) => ({
      transactionDate: row["Transaction Date"].replace(
        /(\d{2})-(\d{2})-(\d{4})/,
        "$2/$1/$3",
      ), // convert to MM/dd/yyyy
      description: row.Description.replaceAll(".", " "),
      amount: parseFloat(`${row.Debit || row.Credit}`.replaceAll(",", "")),
      isCredited: !row.Debit,
      ref: row["Chq / Ref No"],
      key: index,
    }))
    .reduce(
      (store, statement) => ({ ...store, [statement.key]: statement }),
      {},
    );
};

const splitDescription = (description) =>
  description
    .split(" ")
    .flatMap((descriptionPart) => descriptionPart.split(":"))
    .flatMap((descriptionPart) => descriptionPart.split("/"))
    .map((part) => part.trim())
    .filter((part) => !!part)
    .map((part, index, parts) => parts.slice(0, index + 1).join(" "));

const analyzeStatement = (statement) =>
  splitDescription(statement.description).reduce(
    (acc, part) => ({ ...acc, [part]: statement.key }),
    {},
  );

const mergeObject = (analyzedStatement, store) =>
  Object.keys(analyzedStatement).reduce(
    (updatedStore, key) => ({
      ...updatedStore,
      [key]: [...(updatedStore[key] || []), analyzedStatement[key]],
    }),
    store,
  );

const deduplicate = (analyzedStatements) => {
  const groupedAnalyzedStatements = Object.keys(analyzedStatements).reduce(
    (store, key) => {
      const processedKey = analyzedStatements[key].sort();
      return {
        ...store,
        [processedKey]: [...(store[processedKey] || []), key],
      };
    },
    {},
  );

  return Object.keys(groupedAnalyzedStatements).reduce(
    (store, key) => ({
      ...store,
      [groupedAnalyzedStatements[key].sort().slice(-1)]: key.split(","),
    }),
    {},
  );
};

const createSubStructure = (
  analyzedStatements,
  keysNeedsToProcessed = Object.keys(analyzedStatements),
) => {
  if (keysNeedsToProcessed.length === 0) return [];
  const keys = keysNeedsToProcessed.sort((a, b) => a.length - b.length);
  const copiedKeys = keys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});

  return keys.reduce((store, key) => {
    if (copiedKeys[key] === 1) return store;

    const filteredKeys = Object.keys(copiedKeys).filter(
      (k) => copiedKeys[k] === 0 && k.startsWith(key) && k !== key,
    );

    filteredKeys.forEach((k) => (copiedKeys[k] = 1));
    copiedKeys[key] = 1;

    const subStructure = createSubStructure(analyzedStatements, filteredKeys);
    return {
      ...store,
      [key]: {
        self: analyzedStatements[key],
        children: subStructure.length === 0 ? undefined : subStructure,
      },
    };
  }, {});
};

const createAnalyzedGist = (statements) =>
  Object.values(statements).reduce((store, statement) => {
    const analyzedStatement = analyzeStatement(statement);

    const storeKey = statement.isCredited ? "Credit" : "Debit";

    return {
      ...store,
      [storeKey]: {
        ...(store[storeKey] || {}),
        ...mergeObject(analyzedStatement, store[storeKey] || {}),
      },
    };
  }, {});

export const analyzeStatementsByDescriptions = (statements) => {
  const analyzedGist = createAnalyzedGist(statements);

  return {
    self: Object.keys(statements),
    children: {
      Debit: {
        self: Object.values(statements)
          .filter(({ isCredited }) => !isCredited)
          .map(({ key }) => key),
        children: createSubStructure(deduplicate(analyzedGist.Debit || {})),
      },
      Credit: {
        self: Object.values(statements)
          .filter(({ isCredited }) => isCredited)
          .map(({ key }) => key),
        children: createSubStructure(deduplicate(analyzedGist.Credit || {})),
      },
    },
  };
};
