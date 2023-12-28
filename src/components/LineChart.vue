<template>
  <Line :data="chartData" :options="options"/>
</template>

<script>
import {generateColors} from "@/utils/colorGenerator.js";
import {Line} from "vue-chartjs";

export default {
  name: "LineChart",
  data() {
    return {
      options: {
        responsive: true,
        x: {
          type: 'time'
        }
      }
    }
  },
  components: {Line},
  computed: {
    chartData(){
      const keys = Object.keys(Object.keys(this.dataset)
          .flatMap(key => this.dataset[key].map(({transactionDate}) => transactionDate))
          .reduce((store, key) => {
            return {...store, [key]: 1}
          }, {}))
          .sort((a, b) => new Date(a) - new Date(b));


      const groupedDataset = Object.keys(this.dataset)
          .reduce((store, key) => ({
            ...store, [key]: this.dataset[key].reduce((specificStore, {transactionDate, amount}) => ({
              ...specificStore,
              [transactionDate]: (specificStore[transactionDate] || 0) + amount
            }), {})
          }), {});
      const colors = generateColors(Object.keys(this.dataset).length);

      return {
        labels: keys.map(key => new Date(key).toLocaleDateString()),
        datasets: Object.keys(this.dataset).map((label, index) => ({
          label: label,
          data: keys.map(key => groupedDataset[label][key] || 0),
          fill: false,
          borderColor: colors[index],
        })),
      }
    }
  },
  props: {
    dataset: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
