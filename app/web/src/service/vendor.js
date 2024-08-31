import { useVendorStore } from "@/store/vendor";
import api from "@/utils/api";

const vendorService = {
  getVendors: async () => {
    try {
      await api.get("vendor", {}).then((response) => {
        if (response.status === 200) {
          useVendorStore().setVendors(response.data.success.vendorsOnline.data)
        }
      })
    } catch (error) {
      return false;
    }
  }
}


export default vendorService;
