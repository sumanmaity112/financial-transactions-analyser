import { createRouter, createWebHashHistory } from "vue-router";
import CsvTransactions from "@/components/CsvTransactions.vue";
import TransactionsDashboard from "@/components/TransactionsDashboard.vue";

const routes = [
  {
    path: "/",
    name: "csv-transactions",
    component: CsvTransactions,
  },
  {
    path: "/analyse",
    name: "analyse",
    component: TransactionsDashboard,
    props: () => {
      const { transactions, marshalledTransactions } = history.state;
      return {
        transactions,
        marshalledTransactions,
      };
    },
  },
  {
    path: "/analyse/prefix/:prefix",
    name: "analyse-prefix",
    component: TransactionsDashboard,
    props: ({ params: { prefix } }) => {
      const { transactions, marshalledTransactions, drillDownPossible } =
        history.state;
      return {
        transactions,
        marshalledTransactions,
        prefix,
        drillDownPossible,
      };
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
