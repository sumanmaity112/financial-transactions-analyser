<template>
  <v-card prepend-icon="mdi-invoice-text-outline" title="Transactions">
    <ag-grid-vue
      :column-defs="colDefs"
      :default-col-def="defaultColDef"
      :row-data="rowData"
      style="width: 100%; height: 500px"
      class="ag-theme-material transaction-table"
      pagination="true"
    />
  </v-card>
</template>

<script>
import "ag-grid-community/styles/ag-grid.min.css";
import "ag-grid-community/styles/ag-theme-material.min.css";
import { AgGridVue } from "ag-grid-vue3";

const amountFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});
const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default {
  name: "TransactionsTable",
  components: { AgGridVue },
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      defaultColDef: {
        filter: true,
      },
      colDefs: [
        {
          headerName: "#",
          field: "index",
          filter: false,
          width: 100,
          cellClass: "text-center",
        },
        {
          field: "transactionDate",
          filter: "agDateColumnFilter",
          valueFormatter: this.formatDate,
          filterParams: {
            comparator: this.dateComparator,
          },
          width: 200,
          type: "dateColumn",
          cellClass: "text-center",
        },
        {
          field: "description",
          flex: 1,
          cellClass: "text-left",
        },
        {
          field: "ref",
          headerName: "Reference",
          flex: 1,
          cellClass: "text-left",
        },
        {
          field: "amount",
          valueFormatter: this.formatAmount,
          cellClass: "text-right",
        },
        {
          field: "isCredited",
          headerName: "Credited",
          width: 130,
          cellClass: "justify-center d-inline-flex",
        },
      ],
    };
  },
  computed: {
    rowData() {
      return this.transactions.map((value, index) => ({
        ...value,
        index: index + 1,
      }));
    },
  },
  methods: {
    dateComparator(filterLocalDateAtMidnight, cellValue) {
      const cellDate = new Date(cellValue);
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      return cellDate > filterLocalDateAtMidnight ? 1 : 0;
    },
    formatAmount({ value }) {
      return amountFormatter.format(value);
    },
    formatDate({ value }) {
      return dateFormatter.format(new Date(value));
    },
  },
};
</script>

<style>
.transaction-table .ag-header-cell-label {
  justify-content: center;
  font-weight: bold;
}
</style>
