import express from "express";
import mongoose from "mongoose";
import vendorSeed from "@/vendor/db/vendorSeed";
import vendorIsOnline from "@/vendor/pre-start";
import VendorQueue from "@/vendor/brokers/vendorQueue";

const vendor = express();

mongoose
  .connect("mongodb://root:root@localhost:27017/vendor?authSource=admin", {})
  .then(() => {
    console.log("[✔] Connected to MongoDB");
    vendor.listen(4000, () => {
      vendorSeed.seed();

      console.log("[✔] Vendor Service is running on 4000");
    });
  })
  .then(async () => {
    await VendorQueue.start()
      .then(async (channel) => {
        console.log("[✔] Connected to RabbitMQ");

        if (channel) {
          await vendorIsOnline(channel);
        }
      })
      .catch(() => {
        console.log("[✖] Error to connect to RabbitMQ");
      });
  });
