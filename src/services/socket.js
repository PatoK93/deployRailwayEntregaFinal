import { Server } from "socket.io";
import { ChatModel } from "../models/chat.model.js";

const productData = {
  title: undefined,
  value: undefined,
  thumbnail: undefined,
};

let io;

const initWsServer = (server) => {
  io = new Server(server);

  io.on("connection", (socket) => {
    console.log("New Connection!");

    //Listen for chat messages
    socket.on("sendMesssage", async (email, type, bodyMessage, timestamp) => {
      try {
        const message = await ChatModel.create({
          email,
          type,
          bodyMessage,
          timestamp,
        });
      } catch (error) {
        console.log(error);
      }
    });
  });

  return io;
};

const getWsServer = () => {
  return io;
};

export { initWsServer, getWsServer };
