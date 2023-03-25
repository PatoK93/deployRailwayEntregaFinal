import { Router } from "express";
const router = Router();
import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductByIdController,
  deleteProductByIdController,
  productsByCodeController,
} from "../controllers/product.controller.js";
import { body } from "express-validator";
import { isLoggedIn } from "../middlewares/user.middleware.js";

router.get("/", isLoggedIn, getAllProductsController);

router.get("/:id", isLoggedIn, getProductByIdController);

router.post(
  "/",
  isLoggedIn,
  body("title").not().isEmpty().isString().trim().escape(),
  body("description").not().isEmpty().isString().trim().escape(),
  body("code").not().isEmpty().isString().trim().escape(),
  body("photo").not().isEmpty().isString().trim(),
  body("value").not().isEmpty().isDecimal({ min: 1.0 }),
  body("stock").not().isEmpty().isInt({ min: 1 }),
  createProductController
);

router.put(
  "/:id",
  isLoggedIn,
  body("title").not().isEmpty().isString().trim().escape(),
  body("description").not().isEmpty().isString().trim().escape(),
  body("code").not().isEmpty().isString().trim().escape(),
  body("photo").not().isEmpty().isString().trim(),
  body("value").not().isEmpty().isDecimal({ min: 1.0 }),
  body("stock").not().isEmpty().isInt({ min: 1 }),
  updateProductByIdController
);

router.delete("/:id", isLoggedIn, deleteProductByIdController);

router.get("/categoria/:categoria", isLoggedIn, productsByCodeController);

export default router;
