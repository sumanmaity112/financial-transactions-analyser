<template>
  <Radar :options="options" :data="chartData"></Radar>
</template>

<script>
import { Radar } from "vue-chartjs";
import {
  calculateTotalAmountByTransactionDate,
  generateColors,
  getTransactionTypeName,
  groupBy,
} from "@/utils/helper.js";

export default {
  name: "RadarChart",
  components: { Radar },
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      options: {
        responsive: true,
      },
    };
  },
  computed: {
    chartData() {
      const transactionDates = this.getTransactionDates();
      const transactionsGroupedByType = groupBy(
        this.transactions,
        getTransactionTypeName,
      );

      const colors = generateColors(
        Object.keys(transactionsGroupedByType).length,
      );

      const map = Object.keys(transactionsGroupedByType).map(
        (transactionType, index) => {
          const amountByTransactionDate = calculateTotalAmountByTransactionDate(
            transactionsGroupedByType[transactionType],
          );
          return {
            label: transactionType,
            data: transactionDates.map(
              (transactionDate) =>
                amountByTransactionDate[transactionDate] || 0,
            ),
            backgroundColor: colors[index]
              .replace(")", ", 0.2)")
              .replace("rgb", "rgba"),
            borderColor: colors[index],
            pointBackgroundColor: colors[index],
            pointHoverBorderColor: colors[index],
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
          };
        },
      );

      return {
        labels: transactionDates,
        datasets: map,
      };
    },
  },
  methods: {
    getTransactionDates() {
      return Object.keys(
        this.transactions
          .map(({ transactionDate }) => transactionDate)
          .reduce((store, key) => ({ ...store, [key]: 1 }), {}),
      ).sort((a, b) => new Date(a) - new Date(b));
    },
  },
};
</script>

<style scoped></style>
