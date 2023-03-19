import { Router } from "express";
const router = Router();
import {
  sendMessageUserController,
  sendMessageAdminController,
  messagesSendedController,
} from "../controllers/chat.controller.js";
import { body } from "express-validator";
import { isLoggedIn } from "../middlewares/user.middleware.js";

router.post(
  "/chat",
  isLoggedIn,
  body("bodyMessage").not().isEmpty().isString().trim().escape(),
  sendMessageUserController
);

router.post(
  "/chat/:email",
  isLoggedIn,
  body("bodyMessage").not().isEmpty().isString().trim().escape(),
  sendMessageAdminController
);

router.get("/chat/:email", isLoggedIn, messagesSendedController);

export default router;
