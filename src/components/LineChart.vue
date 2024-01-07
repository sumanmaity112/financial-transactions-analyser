<template>
  <Line :data="chartData" :options="options" />
</template>

<script>
import {
  calculateTotalAmountByTransactionDate,
  generateColors,
} from "@/utils/helper.js";
import { Line } from "vue-chartjs";

export default {
  name: "LineChart",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Line },
  props: {
    dataset: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            filter: ({ raw }) => !!raw,
          },
        },
      },
    };
  },
  computed: {
    chartData() {
      const keys = this.getSortedUniqueTransactionDates();

      const groupedDataset =
        this.calculateTotalAmountByTransactionDateForDataset();

      const colors = generateColors(Object.keys(this.dataset).length);

      return {
        labels: keys.map((key) => new Date(key).toLocaleDateString()),
        datasets: Object.keys(this.dataset).map((label, index) => ({
          label,
          data: keys.map((key) => groupedDataset[label][key] || 0),
          pointRadius: ({ raw }) => (raw ? 3 : 0),
          fill: false,
          borderColor: colors[index],
          pointBackgroundColor: colors[index],
          pointHoverBorderColor: colors[index],
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
        })),
      };
    },
  },
  methods: {
    getSortedUniqueTransactionDates() {
      const transactionDates = Object.keys(this.dataset).flatMap((key) =>
        this.dataset[key].map(({ transactionDate }) => transactionDate),
      );
      return [...new Set(transactionDates)].sort(
        (a, b) => new Date(a) - new Date(b),
      );
    },
    calculateTotalAmountByTransactionDateForDataset() {
      return Object.keys(this.dataset).reduce(
        (store, key) => ({
          ...store,
          [key]: calculateTotalAmountByTransactionDate(this.dataset[key]),
        }),
        {},
      );
    },
  },
};
</script>

<style scoped></style>
