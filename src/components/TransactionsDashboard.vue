<template>
  <v-alert
    v-if="!drillDownPossible"
    type="warning"
    title="Drill down is not possible anymore"
    class="mt-2 w-33 mx-auto"
    rounded
    closable
  />
  <AnalyzeTransactions
    :transactions="filteredTransactions"
    @drill-down-transactions="onDrillDownTransactions"
  />
</template>

<script>

import AnalyzeTransactions from "@/components/AnalyzeTransactions.vue";

export default {
  name: "TransactionsDashboard",
  components: { AnalyzeTransactions },
  props: {
    transactions: {
      type: Object,
      required: true
    },
    marshalledTransactions: {
      type: Object,
      required: true
    },
    prefix: {
      type: String,
      default: ".children"
    },
    drillDownPossible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    filteredTransactions() {
      const children = this.getMarshalledTransactionsChildren(this.prefix);

      return Object.keys(children)
        .reduce((store, key) => ({
          ...store,
          [key]: children[key].self.map(transactionKey => this.transactions[transactionKey])
        }), {});
    }
  },
  methods: {
    getRouteParams(prefix, drillDownPossible){
      return {
        name: "analyse-prefix",
        params: {prefix},
        state: {transactions: this.transactions, marshalledTransactions: this.marshalledTransactions, drillDownPossible}
      };
    },
    analysePrefix(prefix, drillDownPossible=true){
      const routeParams = this.getRouteParams(prefix, drillDownPossible);
      if (drillDownPossible)
        this.$router.push(routeParams);
      else{
        this.$router.replace(routeParams);
      }
    },
    onDrillDownTransactions(childName) {
      this.analysePrefix(`${this.prefix}.${childName}.children`);
    },
    getMarshalledTransactionsChildren(root) {
      const children = root.split(".")
        .filter(k => k !== "")
        .reduce((marshalledTransactions, key) => marshalledTransactions[key] || {}, this.marshalledTransactions);

      if (Object.keys(children).length === 0) {
        const activeRoot = this.prefix.split(".").slice(0, -2).join(".");
        this.analysePrefix(activeRoot, false);
      }

      return children;
    }
  }
};

</script>

<style scoped>

</style>
