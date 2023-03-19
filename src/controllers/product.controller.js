import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
  findLastProductId,
} from "../services/product.service.js";
import { validationResult } from "express-validator";
import { formatTimeStamp } from "../utils/format.js";
import { actualUser } from "../services/auth.js";

let isAdmin;

export const getAllProductsController = async (req, res) => {
  try {
    let products = await getAllProducts();
    res.status(200).json({
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id válido!",
      });
    }
    const id = parseInt(req.params.id);
    let product = await getProductById(id);
    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      return res.status(200).json({
        data: product,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const createProductController = async (req, res) => {
  isAdmin = actualUser.admin;
  if (isAdmin) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, code, photo, value, stock } = req.body;

      let lastId = await findLastProductId();
      let newId = lastId + 1;
      let id = newId;
      let timestamp = formatTimeStamp();

      let newProduct = await createProduct(
        id,
        timestamp,
        title,
        description,
        code,
        photo,
        value,
        stock
      );
      return res.status(201).json({
        data: newProduct,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        stack: error.stack,
      });
    }
  } else {
    return res.status(403).json({
      msg: "No tiene permisos de acceso!",
    });
  }
};

export const updateProductByIdController = async (req, res) => {
  isAdmin = actualUser.admin;
  if (isAdmin) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

      if (isNaN(req.params.id)) {
        return res.status(400).json({
          error: "Tiene que enviar un id válido!",
        });
      }

      const id = parseInt(req.params.id);
      const { title, description, code, photo, value, stock } = req.body;

      let product = await getProductById(id);

      if (!product) {
        return res.status(404).json({
          mensaje: "Producto no encontrado!",
        });
      } else {
        const productUpdated = await updateProductById(
          id,
          title,
          description,
          code,
          photo,
          value,
          stock
        );
        return res.status(200).json({
          mensaje: "producto actualizado con exito",
          data: productUpdated,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        stack: error.stack,
      });
    }
  } else {
    return res.status(403).json({
      msg: "No tiene permisos de acceso!",
    });
  }
};

export const deleteProductByIdController = async (req, res, next) => {
  isAdmin = actualUser.admin;
  if (isAdmin) {
    try {
      if (isNaN(req.params.id)) {
        return res.status(400).json({
          error: "Tiene que enviar un id válido!",
        });
      }
      const id = parseInt(req.params.id);

      let product = await getProductById(id);

      if (!product) {
        return res.status(404).json({
          mensaje: "Producto no encontrado!",
        });
      } else {
        await deleteProductById(id);
        return res.status(200).json({
          mensaje: "producto eliminado con exito",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        stack: error.stack,
      });
    }
  } else {
    return res.status(403).json({
      msg: "No tiene permisos de acceso!",
    });
  }
};

export const productsByCodeController = async (req, res, next) => {
  try {
    if (req.params.categoria.isEmpty()) {
      return res.status(400).json({
        error: "Tiene que enviar una categoria válida!",
      });
    }
    let products = await getProductsByCode(req.params.categoria);

    if (!products) {
      return res.status(404).json({
        mensaje: "No hay productos para dicha categoria!",
      });
    } else {
      return res.status(200).json({
        mensaje: "Prodcutos en dicha categoria",
        data: products,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
