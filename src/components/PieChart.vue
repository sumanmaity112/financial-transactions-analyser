<template>
  <Pie :data="chartData" :options="options" />
</template>

<script>
import { Pie } from "vue-chartjs";
import { generateColors } from "@/utils/helper.js";

export default {
  name: "PieChart",
  components: { Pie },
  props: {
    dataset: {
      type: Object,
      required: true,
    },
  },
  emits: ["pieClick"],
  data() {
    return {
      options: {
        responsive: true,
        onClick: (event, activeElements) => {
          this.onPieClick(activeElements[0].index);
        },
      },
    };
  },
  computed: {
    chartData() {
      const keys = Object.keys(this.dataset);
      return {
        labels: keys,
        datasets: [
          {
            backgroundColor: generateColors(keys.length),
            data: keys.map((key) => this.dataset[key]),
          },
        ],
      };
    },
  },
  methods: {
    onPieClick(activeElementIndex) {
      this.$emit("pieClick", Object.keys(this.dataset)[activeElementIndex]);
    },
  },
};
</script>

<style scoped></style>
