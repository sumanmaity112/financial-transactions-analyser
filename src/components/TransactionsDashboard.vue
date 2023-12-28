<template>
  <v-alert
      v-if="!drillDownPossible"
      type="warning"
      title="Drill down is not possible anymore"
      class="mt-2 w-33 mx-auto"
      rounded
      closable
  />
  <AnalyzeTransactions :transactions="filteredTransactions" @drill-down-transactions="onDrillDownTransactions"/>
</template>

<script>

import AnalyzeTransactions from "@/components/AnalyzeTransactions.vue";

export default {
  name: "TransactionDashboard",
  components: {AnalyzeTransactions},
  data(){
    return {
      activeRoot: ".children",
      drillDownPossible: true
    };
  },
  computed: {
    filteredTransactions() {

      const children = this.getMarshalledTransactionsChildren(this.activeRoot)

      return Object.keys(children)
          .reduce((store, key) => ({
            ...store,
            [key]: children[key].self.map(transactionKey => this.transactions[transactionKey])
          }), {});
    }
  },
  methods: {
    onDrillDownTransactions(childName) {
      this.drillDownPossible = true;
      this.activeRoot = `${this.activeRoot}.${childName}.children`
    },
    getMarshalledTransactionsChildren(root){
      const children = root.split(".")
          .filter(k => k!=="")
          .reduce((marshalledTransactions, key)=> marshalledTransactions[key] || {}, this.marshalledTransactions);

      if (Object.keys(children).length === 0){
        const activeRoot = this.activeRoot.split(".").slice(0, -2).join(".");
        this.activeRoot = activeRoot;
        this.drillDownPossible = false;
        return this.getMarshalledTransactionsChildren(activeRoot)
      }

      return children;
    }
  },
  props: {
    transactions: {
      type: Object,
      required: true
    },
    marshalledTransactions: {
      type: Object,
      required: true
    }
  }
}

</script>

<style scoped>

</style>
