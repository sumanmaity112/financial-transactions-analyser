<template>
  <DashboardHeader />
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
  <v-container
    v-if="displayTextArea"
    class="mt-lg-16"
  >
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
  <TransactionDashboard
    v-else
    :transactions="transactions"
    :marshalled-transactions="marshalledTransactions"
  />
</template>

<script>

import TransactionsDashboard from "@/components/TransactionsDashboard.vue";
import DashboardHeader from "@/components/DashboardHeader.vue";
import { processCsvTransaction } from "@/utils/transactionsProcessor.js";

export default {
  name: "Home",
  components: { DashboardHeader, TransactionDashboard: TransactionsDashboard },
  data() {
    return {
      transactions: {},
      marshalledTransactions: {},
      csvTransactions: "",
      displayTextArea: true,
      errorMessage: "",
      analyzing: false
    };
  },
  beforeMount() {
    window.addEventListener("beforeunload", this.unload);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.unload);
  },
  methods: {
    resetErrorMessage() {
      this.errorMessage = "";
    },
    analyzeCsv() {
      this.analyzing = true;
      try {
        const { transactions, marshalledTransactions } = processCsvTransaction(this.csvTransactions);
        this.resetErrorMessage();
        this.displayTextArea = false;
        this.transactions = transactions;
        this.marshalledTransactions = marshalledTransactions;
      } catch (e) {
        console.error(e);
        this.errorMessage = `${e.message}`;
      } finally {
        this.analyzing = false;
      }
    },
    unload(event) {
      if (this.csvTransactions === "") return true;

      event.preventDefault();
      event.returnValue = true;
    },
  }
};
</script>

<style scoped>

</style>
