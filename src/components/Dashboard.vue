<template>
  <DashboardHeader />
  <CsvTransactions v-if="Object.keys(transactions).length === 0" @analyse-transactions="analyseTransactions"/>
  <TransactionsDashboard
      v-else
      class="mt-5"
    :transactions="transactions"
    :marshalled-transactions="marshalledTransactions"
  />
</template>

<script>

import TransactionsDashboard from "@/components/TransactionsDashboard.vue";
import DashboardHeader from "@/components/DashboardHeader.vue";
import CsvTransactions from "@/components/CsvTransactions.vue";

export default {
  name: "Dashboard",
  components: {CsvTransactions, DashboardHeader, TransactionsDashboard },
  data() {
    return {
      transactions: {},
      marshalledTransactions: {},
    };
  },
  beforeMount() {
    window.addEventListener("beforeunload", this.unload);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.unload);
  },
  methods: {
    analyseTransactions({ transactions, marshalledTransactions }){
      this.transactions = transactions;
      this.marshalledTransactions = marshalledTransactions;
    },
    unload(event) {
      if (Object.keys(this.transactions).length === 0) return true;

      event.preventDefault();
      event.returnValue = true;
    },
  }
};
</script>

<style scoped>

</style>
