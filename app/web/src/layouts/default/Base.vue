<script setup>
import Default from "./Default.vue";
import { useAuthStore } from "@/store/auth";
import { dashboardRoutes } from "@/router/dashboard";
import { authRoutes } from "@/router/auth";
import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute();

const isActive = (routerName) => {
  return route.name === routerName;
};

const logout = () => {
  useAuthStore().logout();
  router.push({ name: authRoutes.login });
};
</script>

<template>
  <default>
    <v-navigation-drawer>
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-fridge"
          title="Machines available"
          :active="isActive(dashboardRoutes.dashboard)"
          @click="router.push({ name: dashboardRoutes.dashboard })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-glass-cocktail"
          title="Orders"
          :active="isActive(dashboardRoutes.orders)"
          @click="router.push({ name: dashboardRoutes.orders })"
        ></v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn class="bg-orange-darken-4" block @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <slot />
  </default>
</template>

<style scoped>
.v-navigation-drawer {
  background: rgb(34, 193, 195);
  background: linear-gradient(
    216deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
}
</style>
