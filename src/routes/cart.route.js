import { Router } from "express";
const router = Router();
import {
  getProductsInCartController,
  createCartController,
  addProductsToCartController,
  deleteCartByIdController,
  deleteProductInCartByIdController,
  finishOrderController,
} from "../controllers/cart.controller.js";
import { body } from "express-validator";
import { isLoggedIn } from "../middlewares/user.middleware.js";

router.get("/:id/productos", isLoggedIn, getProductsInCartController);
router.post("/", isLoggedIn, createCartController);
router.post(
  "/:id/productos",
  isLoggedIn,
  body("id").not().isEmpty().isInt({ min: 1 }),
  addProductsToCartController
);
router.delete("/:id", isLoggedIn, deleteCartByIdController);
router.delete(
  "/:id/productos/:id_prod",
  isLoggedIn,
  deleteProductInCartByIdController
);
router.get("/buy/:id", isLoggedIn, finishOrderController);

export default router;
