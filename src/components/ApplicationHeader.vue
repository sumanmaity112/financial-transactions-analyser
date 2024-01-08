<script>
export default {
  name: "DashboardHeader",
};
</script>

<template>
  <v-app-bar elevation="5">
    <v-app-bar-nav-icon icon="mdi-home" href="#" />
    <v-spacer />
    <v-app-bar-title class="font-weight-bold text-center" text="Finanza" />
    <v-spacer />
    <v-btn
      target="_blank"
      icon="mdi-github"
      href="https://github.com/sumanmaity112/finanza"
    />
  </v-app-bar>
</template>

<style scoped></style>
