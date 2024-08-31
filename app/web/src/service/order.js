import { useOrderStore } from "@/store/order";
import axios from "axios";

const BASE_URL = `${process.env.URL_API}/order`;
let headers = {
  Authorization: `Baerer ${localStorage.getItem(process.env.SESSION_TOKEN)}`
}

const orderService = {
  getOrders: async () => {
    try {
      let response = await axios.get(BASE_URL, { headers });
      if (response.status === 200) {
        useOrderStore().setOrderList(response.data.success.orders);
      }
    } catch (error) {
      return []
    }
  },
  create: async (data) => {
    try {
      let response = await axios.post(BASE_URL, data, { headers });
      if (response.status === 201) {
        return response;
      }
    } catch (error) {
      return false
    }
  }
}

export default orderService;
