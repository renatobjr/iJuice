<script setup>
import { onBeforeMount, ref } from "vue";
import { useOrderStore } from "@/store/order";

const orders = ref([]);

const loadOrders = async () => {
  const orderStore = useOrderStore();
  await orderStore.getOrders();

  orders.value = orderStore.orders;
};

onBeforeMount(loadOrders);
</script>

<template>
  <v-row>
    <v-col
      v-if="!orders"
      cols="12"
      class="d-flex flex-column align-center justify-center"
    >
      <p class="text-center">
        <v-icon size="100px">mdi-emoticon-cry-outline</v-icon>
      </p>
      <h1 class="text-center">Have you not placed any orders yet?</h1>
    </v-col>
    <v-col v-else cols="12">
      <v-row>
        <v-col v-for="(order, index) in orders" :key="index" cols="4">
          <v-sheet
            rounded="lg"
            class="pa-6 text-white text-center ma-4"
            color="guava"
            width="400"
            elevation="3"
          >
            <h4>
              The order can be picked up at: {{ order.withdraw_day }} at
              {{ order.withdraw_time }}
            </h4>
            <h5 class="font-weight-light text-capitalize">
              Status: <span class="text-lowercase">{{ order.status }}</span>
            </h5>
            <h5 class="font-weight-light text-capitalize">Use the code:</h5>
            <h2>
              {{ order.withdraw_code }}
            </h2>
            <v-divider
              color="light-green-accent-3"
              class="mt-3 mb-3"
              thickness="0.5px"
              opacity="0.5"
            ></v-divider>
            <p class="mb-4">Your Juices:</p>
            <v-chip
              v-for="product in order.products"
              :key="product.name"
              color="red"
              class="mr-2 ml-2"
              variant="flat"
              >{{ product.name }}
            </v-chip>
          </v-sheet>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped>
.v-col-else {
  height: 100vh;
  align-content: center;
}
</style>
