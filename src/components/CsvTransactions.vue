<template>
  <v-alert type="info" class="my-5" border="start" variant="tonal">
    <p class="text-h6">
      Sample CSV data can be found
      <a
        class="text-decoration-none text-primary font-weight-medium d-inline-flex align-center"
        href="https://github.com/sumanmaity112/financial-transactions-analyser?tab=readme-ov-file#csv-format"
        target="_blank"
        >here</a
      >
    </p>
  </v-alert>
  <v-alert
    v-if="!!errorMessage"
    type="error"
    title="Unable to process given CSV"
    :text="errorMessage"
    class="mt-2 w-33 mx-auto"
    rounded
    closable
    @click:close="resetErrorMessage"
  />
  <v-container class="mt-lg-16">
    <v-textarea
      v-model="csvTransactions"
      clearable
      label="Transactions as CSV"
      variant="outlined"
    />
    <v-btn
      text="Analyze"
      block
      elevation="3"
      size="large"
      :disabled="!csvTransactions"
      :loading="analyzing"
      @click="analyzeCsv"
    />
  </v-container>
</template>

<script>
import { convertCsvStatementsToJson } from "@/utils/transactionsProcessor.js";

export default {
  name: "CsvTransactions",
  emits: ["analyseTransactions"],
  data() {
    return {
      csvTransactions: "",
      errorMessage: "",
      analyzing: false,
    };
  },
  methods: {
    resetErrorMessage() {
      this.errorMessage = "";
    },
    analyzeCsv() {
      this.analyzing = true;
      try {
        const transactions = convertCsvStatementsToJson(this.csvTransactions);
        this.resetErrorMessage();
        this.$emit("analyseTransactions", transactions);
      } catch (e) {
        console.error(e);
        this.errorMessage = `${e.message}`;
      } finally {
        this.analyzing = false;
      }
    },
  },
};
</script>

<style scoped></style>
