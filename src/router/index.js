import { createRouter, createWebHashHistory } from "vue-router";
import CsvTransactions from "@/components/CsvTransactions.vue";
import AnalyseTransactionsByDescriptionDashboard from "@/components/AnalyseTransactionsByDescriptionDashboard.vue";
import Dashboard from "@/components/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "csv-transactions",
    component: CsvTransactions,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    props: () => {
      const { transactions } = history.state;
      return {
        transactions,
      };
    },
  },
  {
    path: "/analyse/descriptions",
    name: "analyse-descriptions",
    component: AnalyseTransactionsByDescriptionDashboard,
    props: ({ query: { prefix } }) => {
      const { transactions, marshalledTransactions } = history.state;
      return {
        transactions,
        marshalledTransactions,
        prefix,
      };
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
