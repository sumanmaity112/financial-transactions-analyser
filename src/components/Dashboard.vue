<template>
  <DashboardHeader />
  <router-view @analyse-transactions="analyseTransactions"/>
</template>

<script>

import DashboardHeader from "@/components/DashboardHeader.vue";

export default {
  name: "Dashboard",
  components: { DashboardHeader, },
  data() {
    return {
      transactions: {},
      marshalledTransactions: {},
    };
  },
  methods: {
    analyseTransactions({ transactions, marshalledTransactions }){
      this.transactions = transactions;
      this.marshalledTransactions = marshalledTransactions;
      this.$router.push({name: "analyse", state: {transactions, marshalledTransactions}});
    },
  }
};
</script>

<style scoped>

</style>
