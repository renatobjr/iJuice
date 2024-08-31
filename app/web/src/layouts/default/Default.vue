<script setup>
import { useSnackbarStore } from "@/store/snackbar";
import { storeToRefs } from "pinia";

const snackBarStore = useSnackbarStore();
const { snackbar } = storeToRefs(snackBarStore);
</script>

<template>
  <v-app class="bg-grey-lighten-4">
    <v-main>
      <v-snackbar
        v-model="snackbar.show"
        variant="flat"
        location="top"
        :color="snackbar.color"
        close-delay="5000"
      >
        <span>{{ snackbar.message }}</span>

        <template v-slot:actions>
          <v-btn color="black" flat @click="snackbar.show = false"
            >Fechar</v-btn
          >
        </template>
      </v-snackbar>
      <slot />
    </v-main>
  </v-app>
</template>
