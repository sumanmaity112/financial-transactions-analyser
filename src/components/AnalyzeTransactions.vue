<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <PieChart :dataset="pieChartDataset" @pie-click="onPieClick" />
      </v-col>
      <v-col cols="8">
        <LineChart :dataset="transactions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PieChart from "@/components/PieChart.vue";
import LineChart from "@/components/LineChart.vue";

export default {
  name: "AnalyzeTransactions",
  components: { LineChart, PieChart },
  props: {
    transactions: {
      type: Object,
      required: true,
    },
  },
  emits: ["drillDownTransactions"],
  computed: {
    pieChartDataset() {
      return Object.keys(this.transactions).reduce(
        (set, key) => ({
          ...set,
          [key]: this.transactions[key].reduce(
            (totalAmount, { amount }) => totalAmount + amount,
            0,
          ),
        }),
        {},
      );
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
