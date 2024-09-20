import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import router from "./routes/index.mjs";
import connectMongoDB from "./db/connectMongo.mjs";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("spinWheel", async () => {
    try {
      // Thực hiện yêu cầu quay vòng quay từ API "/spin"
      const response = await fetch("http://localhost:3000/spin", {
        method: "POST",
      });
      const result = await response.json();

      // Gửi kết quả quay vòng quay đến người dùng
      io.emit("wheelResult", { prize: result.prize });
    } catch (error) {
      console.error("Error spinning the wheel:", error);
      socket.emit("error", { message: "Lỗi khi quay vòng quay" });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

server.listen(process.env.PORT, async () => {
  console.log(`Listen on Port: ${process.env.PORT}`);
  try {
    // await mongoose.connect(process.env.MONGO_URI);
    connectMongoDB();

    console.log("Connected database");
  } catch (error) {
    console.log(error);
  }
});
