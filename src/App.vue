<template>
  <v-app>
    <v-main>
      <v-container
        id="financial-transaction-analyzer-container"
        class="ma-0 pa-0"
        fluid
      >
        <Dashboard />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Dashboard from "@/components/Dashboard.vue";

export default {
  name: "App",
  components: { Dashboard },
  computed: {},
};
</script>

<style scoped></style>
