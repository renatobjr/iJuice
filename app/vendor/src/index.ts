import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import vendorSeed from "@/vendor/db/vendorSeed";
import vendorIsOnline from "@/vendor/pre-start";
import Start from "./brokers/start";
import VendorQueue from "@/vendor/brokers/vendorQueue";

const vendor = express();

vendor
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors())
  .use(bodyParser.json());

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL as string, {})
  .then(() => {
    console.log("[✔] Connected to MongoDB");
    vendor.listen(4000, () => {
      vendorSeed.seed();

      console.log("[✔] Vendor Service is running on 4000");
    });
  })
  .then(async () => {
    await Start.connect()
      .then(async () => {
        console.log("[✔] Connected to RabbitMQ");
        await vendorIsOnline();
        VendorQueue.create();
      })
      .catch(() => {
        console.log("[✖] Error to connect to RabbitMQ");
      });
  })
  .finally(() => {
    Start.close();
  });
