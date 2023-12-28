import { createApp } from 'vue';
import App from './App.vue';

import vuetify from '@/plugins/vuetify';
import charts from "@/plugins/charts.js";

createApp(App)
    .use(vuetify())
    .use(charts())
    .mount('#app');
