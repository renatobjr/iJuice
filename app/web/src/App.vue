<script setup>
import { useRoute, RouterView } from "vue-router";
import { computed, onBeforeMount } from "vue";
import Base from "./layouts/default/Base.vue";
import Login from "./layouts/default/Login.vue";

let route;

onBeforeMount(() => {
  route = useRoute();
});

const layout = computed(() => {
  let currentLayout = Login;
  if (route.meta.layout === "base") {
    currentLayout = Base;
  }

  return currentLayout;
});
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
