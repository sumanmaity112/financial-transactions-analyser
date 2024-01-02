<template>
  <ApplicationHeader />
  <v-container fluid>
    <router-view @analyse-transactions="analyseTransactions" />
  </v-container>
</template>

<script>
import ApplicationHeader from "@/components/ApplicationHeader.vue";

export default {
  name: "Home",
  components: { ApplicationHeader },
  methods: {
    analyseTransactions(transactions) {
      this.$router.push({
        name: "dashboard",
        state: { transactions },
      });
    },
  },
};
</script>

<style scoped></style>
