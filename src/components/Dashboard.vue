<template>
  <Header/>
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
  <v-container class="mt-lg-16" v-if="displayTextArea">
    <v-textarea clearable label="Transactions as CSV"
                variant="outlined"
                v-model="csvTransactions"
    />
    <v-btn text="Analyze" block elevation="3" size="large" @click="analyzeCsv" :disabled="!csvTransactions" :loading="analyzing"/>
  </v-container>
  <TransactionDashboard v-else :transactions="transactions"
                        :marshalled-transactions="marshalledTransactions"/>
</template>

<script>

import TransactionsDashboard from "@/components/TransactionsDashboard.vue";
import Header from "@/components/Header.vue";
import {processCsvTransaction} from "@/utils/transactionsProcessor.js";

export default {
  name: "Home",
  components: {Header, TransactionDashboard: TransactionsDashboard},
  data() {
    return {
      transactions: {},
      marshalledTransactions: {},
      csvTransactions: "",
      displayTextArea: true,
      errorMessage: "",
      analyzing: false
    }
  },
  methods: {
    resetErrorMessage() {
      this.errorMessage = ""
    },
    analyzeCsv() {
      this.analyzing = true;
      try {
        const {transactions, marshalledTransactions} = processCsvTransaction(this.csvTransactions);
        this.resetErrorMessage();
        this.displayTextArea = false
        this.transactions = transactions;
        this.marshalledTransactions = marshalledTransactions
      } catch (e) {
        console.error(e)
        this.errorMessage = `${e.message}`
      } finally {
        this.analyzing = false
      }
    }
  }
}
</script>

<style scoped>

</style>
