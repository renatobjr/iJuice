import { Vendor } from "@/vendor/schemas/vendor";

const vendorIsOnline = async () => {
  try {
    const vendor = await Vendor.find();
    if (vendor.length > 0) {
      return {
        status: true,
        message: "Vendor service is online",
        data: vendor,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Vendor service is offline",
    };
  }
};

export default {
  vendorIsOnline,
};
