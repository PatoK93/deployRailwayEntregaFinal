import { Router } from "express";
const router = Router();
import {
  SendMessageUserController,
  SendMessageAdminController,
  MessagesSendedController,
} from "../controllers/chat.controller.js";
import { body } from "express-validator";
import { isLoggedIn } from "../middlewares/user.middleware.js";

router.post(
  "/chat",
  isLoggedIn,
  body("bodyMessage").not().isEmpty().isString().trim().escape(),
  SendMessageUserController
);

router.post(
  "/chat/:email",
  isLoggedIn,
  body("bodyMessage").not().isEmpty().isString().trim().escape(),
  SendMessageAdminController
);

router.get("/chat/:email", isLoggedIn, MessagesSendedController);

export default router;
