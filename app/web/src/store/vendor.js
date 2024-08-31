import { defineStore, acceptHMRUpdate } from 'pinia'
import vendorService from '@/service/vendor';
import { ref } from "vue";

export const useVendorStore = defineStore('vendor', () => {
  let vendors = ref([]);

  const setVendors = (onlineVendors) => {
    vendors.value = onlineVendors;
  }

  async function getVendors() {
    await vendorService.getVendors();
  }

  return {
    vendors,
    setVendors,
    getVendors
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVendorStore, import.meta.hot))
}
