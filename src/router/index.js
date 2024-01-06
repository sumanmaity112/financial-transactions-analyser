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
    meta: { transactionHistoryRequired: true },
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
    meta: { transactionHistoryRequired: true },
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
    meta: { transactionHistoryRequired: true },
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

const hasInvalidHistory = (to, from) => {
  const { transactions } = history.state;
  return (
    from.meta.transactionHistoryRequired &&
    to.meta.transactionHistoryRequired &&
    !transactions
  );
};

router.beforeEach((to, from) => {
  if (hasInvalidHistory(to, from)) return false;

  if (to.matched.length === 0) {
    if (from.meta.transactionHistoryRequired) return false;
    return { path: "/" };
  }
});

export default router;
