<template>
  <v-row>
    <v-col cols="4">
      <PieChart :dataset="pieChartDataset" @pie-click="onPieClick" />
    </v-col>
    <v-col cols="8">
      <LineChart :dataset="transactions" />
    </v-col>
  </v-row>
</template>

<script>
import LineChart from "@/components/LineChart.vue";
import PieChart from "@/components/PieChart.vue";

export default {
  name: "Charts",
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
