import { validationResult } from "express-validator";
import { formatTimeStamp } from "../utils/format.js";
import { actualUser } from "../services/auth.js";
import { Socket } from "socket.io";
import { ChatModel } from "../models/chat.model.js";

let isAdmin;

export const SendMessageUserController = async (req, res) => {
  let isAdmin = actualUser.admin;
  if (!isAdmin) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { bodyMessage } = req.body;
      let timestamp = formatTimeStamp();
      let type = "user";
      Socket.emit(
        "sendMesssage",
        actualUser.username,
        type,
        bodyMessage,
        timestamp
      );

      return res.status(201).json({
        mensaje: "Mensaje recibido!",
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        stack: error.stack,
      });
    }
  } else {
    return res.status(400).json({
      mensaje: "Ruta solo accesible a los usuarios!",
    });
  }
};

export const SendMessageAdminController = async (req, res) => {
  let isAdmin = actualUser.admin;
  if (isAdmin) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (!req.params.email) {
        return res.status(400).json({
          error: "El email no puede estar vacío!",
        });
      }
      const { bodyMessage } = req.body;
      const email = req.params.email;
      let timestamp = formatTimeStamp();
      let type = "admin";
      Socket.emit(
        "sendMesssage",
        actualUser.username,
        type,
        bodyMessage,
        timestamp
      );

      return res.status(201).json({
        mensaje: "Mensaje enviado!",
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        stack: error.stack,
      });
    }
  } else {
    return res.status(400).json({
      mensaje: "Ruta solo accesible a los admins!",
    });
  }
};

export const MessagesSendedController = async (req, res) => {
  try {
    if (!req.params.email) {
      return res.status(400).json({
        error: "El email no puede estar vacío!",
      });
    }
    const email = req.params.email;

    let messages = await ChatModel.find({ username: email });

    return res.status(200).json({
      mensaje: "Mensajes enviados",
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
