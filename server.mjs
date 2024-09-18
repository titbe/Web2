import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import router from "./routes/index.mjs";
import connectMongoDB from "./db/connectMongo.mjs";
import mongoose from "mongoose";

const app = express();

dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT, async () => {
  console.log(`Listen on Port: ${process.env.PORT}`);
  try {
    // await mongoose.connect(process.env.MONGO_URI);
    connectMongoDB();

    console.log("Connected database");
  } catch (error) {
    console.log(error);
  }
});
