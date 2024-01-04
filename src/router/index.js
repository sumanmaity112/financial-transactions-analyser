import { createRouter, createWebHashHistory } from "vue-router";
import CsvTransactions from "@/components/CsvTransactions.vue";
import AnalyseTransactionsByDescriptionDashboard from "@/components/AnalyseTransactionsByDescriptionDashboard.vue";
import Dashboard from "@/components/Dashboard.vue";
import AnalyseTransactionsByDateDashboard from "@/components/AnalyseTransactionsByDateDashboard.vue";

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
    name: "analyse-by-descriptions",
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
  {
    path: "/analyse/transaction-date",
    name: "analyse-by-transaction-date",
    component: AnalyseTransactionsByDateDashboard,
    props: ({ query: { to, from } }) => {
      const { transactions } = history.state;
      return {
        transactions,
        to,
        from,
      };
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
