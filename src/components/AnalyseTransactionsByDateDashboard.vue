<template>
  <v-card flat>
    <v-card-title class="font-weight-bold d-flex align-center">
      Analyse transactions by transaction date
      <v-spacer />
      <div class="d-flex w-33 align-center ga-12">
        <v-text-field
          v-model="selectedFrom"
          type="date"
          label="From"
          flat
          hide-details
          variant="outlined"
          :min="fromMinPossibleDate"
          :max="to"
        />
        <v-text-field
          v-model="selectedTo"
          type="date"
          label="To"
          flat
          hide-details
          variant="outlined"
          :min="from"
          :max="toMaxPossibleDate"
        />
        <v-btn
          append-icon="mdi-arrow-right-bold"
          elevation="5"
          rounded
          size="large"
          :disabled="!analyseButtonEnabled"
          @click="analyse"
        >
          Analyse
        </v-btn>
      </div>
    </v-card-title>
    <v-divider />
    <v-container fluid>
      <v-row>
        <v-col cols="5">
          <RadarChart :transactions="transactionValues" />
        </v-col>
        <v-col cols="7">
          <TransactionsTable :transactions="transactionValues" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import TransactionsTable from "@/components/TransactionsTable.vue";
import RadarChart from "@/components/RadarChart.vue";
import { format, isAfter, isBefore, isEqual, parse } from "date-fns";

const DEFAULT_INITIAL_DATE = format(new Date("1970-01-01"), "yyyy-MM-dd");
const TODAY = format(new Date(), "yyyy-MM-dd");

export default {
  name: "AnalyseTransactionsByDateDashboard",
  components: { RadarChart, TransactionsTable },
  props: {
    transactions: {
      type: Object,
      required: true,
    },
    from: {
      type: String,
      default: DEFAULT_INITIAL_DATE,
    },
    to: {
      type: String,
      default: TODAY,
    },
  },
  data() {
    return {
      selectedFrom: this.from,
      selectedTo: this.to,
    };
  },
  computed: {
    analyseButtonEnabled() {
      return this.from !== this.selectedFrom || this.to !== this.selectedTo;
    },
    transactionValues() {
      return Object.values(this.transactions)
        .flatMap((x) => x)
        .filter(({ transactionDate }) => {
          const parsedTransactionDate = parse(
            transactionDate,
            "MM/dd/yyyy",
            new Date(),
          );
          return (
            (isAfter(parsedTransactionDate, this.from) ||
              isEqual(parsedTransactionDate, this.from)) &&
            (isBefore(parsedTransactionDate, this.to) ||
              isEqual(parsedTransactionDate, this.to))
          );
        });
    },
    toMaxPossibleDate() {
      return isBefore(this.to, TODAY) ? TODAY : this.to;
    },
    fromMinPossibleDate() {
      return isBefore(this.from, DEFAULT_INITIAL_DATE)
        ? this.from
        : DEFAULT_INITIAL_DATE;
    },
  },
  watch: {
    from: {
      handler(newFrom) {
        this.selectedFrom = !newFrom ? DEFAULT_INITIAL_DATE : newFrom;
      },
      immediate: true,
    },
    to: {
      handler(newTo) {
        this.selectedTo = !newTo ? TODAY : newTo;
      },
      immediate: true,
    },
  },
  methods: {
    analyse() {
      this.$router.push({
        name: "analyse-by-transaction-date",
        query: {
          from: this.selectedFrom ? this.selectedFrom : DEFAULT_INITIAL_DATE,
          to: this.selectedTo ? this.selectedTo : TODAY,
        },
        state: {
          transactions: this.transactions,
        },
      });
    },
  },
};
</script>

<style scoped></style>
