<template>
  <v-container fluid>
    <Charts
      :transactions="transactions"
      @drill-down-transactions="onPieClick"
    />
    <v-divider class="my-2" />
    <Transactions :transactions="transactionValues" />
  </v-container>
</template>

<script>
import Charts from "@/components/Charts.vue";
import Transactions from "@/components/Transactions.vue";

export default {
  name: "AnalyzeTransactions",
  components: { Transactions, Charts },
  props: {
    transactions: {
      type: Object,
      required: true,
    },
  },
  emits: ["drillDownTransactions"],
  computed: {
    transactionValues() {
      return Object.values(this.transactions).flatMap((x) => x);
    },
  },
  methods: {
    onPieClick(activeKey) {
      this.$emit("drillDownTransactions", activeKey);
    },
  },
};
</script>

<style scoped></style>
