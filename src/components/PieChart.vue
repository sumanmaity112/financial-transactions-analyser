<template>
  <Pie :data="chartData" :options="options"></Pie>
</template>

<script>
import {Pie} from 'vue-chartjs'
import {generateColors} from "@/utils/colorGenerator.js";

export default {
  name: "PieChart",
  components: {Pie},
  data() {
    return {
      options: {
        responsive: true,
        onClick: (event, activeElements) => {
          this.onPieClick(activeElements[0].index)
        }
      }
    }
  },
  computed: {
    chartData(){
      const keys = Object.keys(this.dataset);
      return {
        labels: keys,
        datasets: [
          {
            backgroundColor: generateColors(keys.length),
            data: keys.map(key => this.dataset[key])
          }
        ]
      }
    }
  },
  methods: {
    onPieClick(activeElementIndex) {
      this.$emit("pieClick",Object.keys(this.dataset)[activeElementIndex])
    }
  },
  props: {
    dataset: {
      type: Object,
      required: true
    }
  },
  emits: ["pieClick"]
}
</script>

<style scoped>

</style>
