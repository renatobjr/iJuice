import { ref, reactive } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import orderService from "@/service/order";

export const useOrderStore = defineStore("order", () => {
  const orders = ref([]);
  const order = reactive({
    id: null,
    customer_id: null,
    vendor_id: null,
    status: null,
    products: [],
    total: null,
    created_at: null,
    updated_at: null,
  });

  const setOrderList = (data) => {
    orders.value = data
  }

  const createOrder = async (data) => {
    return await orderService.create(data);
  }

  const getOrdersByVendor = async (vendors_id, customer_id) => {
    return await orderService.getOrdersByVendor(vendors_id, customer_id);
  }

  const getOrders = async () => {
    await orderService.getOrders();
  }

  return {
    orders,
    order,
    setOrderList,
    createOrder,
    getOrdersByVendor,
    getOrders,
  }

})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot));
}
