<template>
  <v-app>
    <v-main>
      <v-container
        id="financial-transaction-analyzer-container"
        class="ma-0 pa-0"
        fluid
      >
        <Home />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Home from "@/components/Home.vue";

export default {
  name: "App",
  components: { Home },
};
</script>

<style scoped></style>
