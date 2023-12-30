import {createRouter, createWebHashHistory} from "vue-router";
import CsvTransactions from "@/components/CsvTransactions.vue";
import TransactionsDashboard from "@/components/TransactionsDashboard.vue";

const routes = [
    {
        path: "/",
        name: "csv-transactions",
        component: CsvTransactions
    },
    {
        path: "/analyse",
        name: "analyse",
        component: TransactionsDashboard,
        props: () => {
            const {transactions, marshalledTransactions} = history.state;
            return {
                transactions, marshalledTransactions
            };
        }
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
