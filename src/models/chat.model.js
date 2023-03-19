import { Schema, model } from "mongoose";

const ChatSchema = new Schema({
  username: { type: String, required: true, unique: false },
  type: { type: String, required: true },
  timestamp: { type: String, required: true },
  bodymessage: { type: String, required: true },
});

export const ChatModel = model("mensajes", ChatSchema);
