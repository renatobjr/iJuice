<script setup>
import Default from "./Default.vue";
</script>

<template>
  <default class="bg-grey-lighten-5">
    <v-row align-content="center" justify="center">
      <slot />
    </v-row>
  </default>
</template>

<style scoped>
.v-row {
  height: 100vh;
  margin: 0 !important;
}
</style>
