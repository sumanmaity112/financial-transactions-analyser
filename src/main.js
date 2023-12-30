import { createApp } from "vue";
import App from "./App.vue";

import vuetify from "@/plugins/vuetify";
import charts from "@/plugins/charts.js";
import router from "@/router/index.js";

const app = createApp(App).use(vuetify()).use(charts()).use(router);

app.config.warnHandler = (msg, vm, trace) => {
  if (
    !msg.includes(
      "Extraneous non-emits event listeners (analyseTransactions) were passed to component",
    )
  ) {
    console.warn(msg, trace);
  }
};

app.mount("#app");
