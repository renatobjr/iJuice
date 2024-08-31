import axios from "axios";
import orderRepository from "@/order/repositories/orderRepository";

const callToVendor = {
  sendOrder: async (vendor_id: string, host: string, id: number) => {
    let response = await axios.get(`${host}/process-order/${vendor_id}`);
    if (response.status === 200) {
      console.log("Vendor received order");
      orderRepository.updateStatus(id);
    } else {
      console.error(`Failed to process order: ${response.status}`);
    }
    // const req = http.get(`${host}/process-order/${vendor_id}`, (res) => {
    //   if (res.statusCode === 200) {
    //     console.log("Vendor received order");
    //     orderRepository.updateStatus(id);
    //   } else {
    //     console.error(`Failed to process order: ${res.statusCode}`);
    //   }
    // });

    // req.on("error", (err) => {
    //   console.error(`Error sending order: ${err.message}`);
    // });

    // req.end();
  },
};

export default callToVendor;
