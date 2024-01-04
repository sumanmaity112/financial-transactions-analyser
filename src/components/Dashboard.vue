<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <PieChart :dataset="chartData" />
      </v-col>
      <v-col cols="1" />
      <v-col cols="5" class="align-self-center">
        <v-btn
          append-icon="mdi-arrow-right-bold"
          size="x-large"
          block
          elevation="5"
          height="100"
          rounded
          @click="onAnalyseByDescriptionClick"
        >
          Analyse by transaction description
        </v-btn>
        <v-btn
          append-icon="mdi-arrow-right-bold"
          size="x-large"
          class="mt-6"
          block
          elevation="5"
          height="100"
          rounded
          @click="onAnalyseByTransactionDateClick"
        >
          Analyse by transaction date
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PieChart from "@/components/PieChart.vue";
import { calculateTotalAmountByTransactionType } from "@/utils/helper.js";
import { analyzeStatementsByDescriptions } from "@/utils/transactionsProcessor.js";

export default {
  name: "Dashboard",
  components: { PieChart },
  props: {
    transactions: {
      type: Object,
      required: true,
    },
  },
  computed: {
    chartData() {
      return calculateTotalAmountByTransactionType(
        Object.values(this.transactions),
      );
    },
  },
  methods: {
    onAnalyseByDescriptionClick() {
      this.$router.push({
        name: "analyse-by-descriptions",
        state: {
          transactions: this.transactions,
          marshalledTransactions: analyzeStatementsByDescriptions(
            this.transactions,
          ),
        },
      });
    },
    onAnalyseByTransactionDateClick() {
      this.$router.push({
        name: "analyse-by-transaction-date",
        state: {
          transactions: this.transactions,
          marshalledTransactions: analyzeStatementsByDescriptions(
            this.transactions,
          ),
        },
      });
    },
  },
};
</script>

<style scoped></style>
