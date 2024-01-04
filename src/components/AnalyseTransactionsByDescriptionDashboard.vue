<template>
  <v-card flat>
    <v-card-title class="font-weight-bold">
      Analyse transactions by description
    </v-card-title>
    <v-card-subtitle>{{ processedPrefix }}</v-card-subtitle>
    <v-divider />
    <v-alert
      v-if="!drillDownPossible"
      type="warning"
      title="Drill down is not possible anymore"
      class="mt-2 w-33 mx-auto"
      rounded
      closable
      @click:close="resetDrillDownPossible"
    />
    <v-container fluid>
      <Charts
        :transactions="filteredTransactions"
        @drill-down-transactions="onDrillDownTransactions"
      />
      <v-divider class="my-2" />
      <TransactionsTable :transactions="transactionValues" />
    </v-container>
  </v-card>
</template>

<script>
import TransactionsTable from "@/components/TransactionsTable.vue";
import Charts from "@/components/Charts.vue";
import { isEmpty, readObjectProperty } from "@/utils/helper.js";

export default {
  name: "AnalyseTransactionsByDescriptionDashboard",
  components: { Charts, TransactionsTable },
  props: {
    transactions: {
      type: Object,
      required: true,
    },
    marshalledTransactions: {
      type: Object,
      required: true,
    },
    prefix: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      drillDownPossible: true,
    };
  },
  computed: {
    transactionValues() {
      return Object.values(this.filteredTransactions).flatMap((x) => x);
    },
    filteredTransactions() {
      const children = this.marshalledTransactions.children;

      return Object.keys(children).reduce(
        (store, key) => ({
          ...store,
          [key]: children[key].self.map(
            (transactionKey) => this.transactions[transactionKey],
          ),
        }),
        {},
      );
    },
    processedPrefix() {
      return this.prefix.replaceAll(".", " ");
    },
  },
  methods: {
    resetDrillDownPossible() {
      this.drillDownPossible = true;
    },
    onDrillDownTransactions(childName) {
      const updatedPrefix = `.children.${childName}`;

      const filteredMarshalledStatements = readObjectProperty(
        this.marshalledTransactions,
        updatedPrefix,
      );

      if (isEmpty(filteredMarshalledStatements.children)) {
        this.drillDownPossible = false;
      } else {
        this.analyseDescription(childName, filteredMarshalledStatements);
      }
    },
    analyseDescription(childName, filteredMarshalledStatements) {
      this.$router.push({
        name: "analyse-by-descriptions",
        query: { prefix: `${this.prefix}.${childName}` },
        state: {
          transactions: this.transactions,
          marshalledTransactions: filteredMarshalledStatements,
        },
      });
    },
  },
};
</script>

<style scoped></style>
