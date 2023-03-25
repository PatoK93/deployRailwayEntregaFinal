import { validationResult } from "express-validator";
import { formatTimeStamp } from "../utils/format.js";
import { actualUser } from "../services/auth.js";
import { sendUserFinishBuyMail } from "../mail/mail.js";
import {
  getProductsInCart,
  createCart,
  addProductsToCart,
  deleteCartById,
  findProductInCart,
  finishOrder,
  findLastCartId,
} from "../services/cart.service.js";
import {
  getProductById,
  updateProductById,
} from "../services/product.service.js";

let username;
let name;

export const getProductsInCartController = async (req, res) => {
  username = actualUser.username;
  name = actualUser.name;
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id válido!",
      });
    }
    const id = parseInt(req.params.id);
    const cart = await getProductsInCart(id);

    if (!cart) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    } else {
      if (username == cart.username) {
        return res.status(200).json({
          data: cart,
        });
      } else {
        return res.status(403).json({
          msg: "No tiene permisos de acceso!",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const createCartController = async (req, res) => {
  try {
    let lastId = await findLastCartId();
    let id = lastId + 1;
    let timestamp = formatTimeStamp();
    let products = [];
    let username = actualUser.username;
    let name = actualUser.name;
    let closed = false;

    await createCart(id, timestamp, username, name, products, closed);

    return res.status(201).json({
      mensaje: `carrito ${id} creado con exito`,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const addProductsToCartController = async (req, res) => {
  username = actualUser.username;
  name = actualUser.name;
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id de carrito válido!",
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.body.id);

    let cart = await getProductsInCart(cartId);

    if (!cart) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    }

    if (username != cart.username) {
      return res.status(403).json({
        msg: "No tiene permisos de acceso!",
      });
    }

    if (cart.closed == true) {
      return res.status(400).json({
        msg: "ya se realizo la compra, no se pueden agregar productos a este carrito!",
      });
    }

    let product = await getProductById(productId);

    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      if (product.stock <= 0) {
        return res.status(404).json({
          mensaje: "Producto sin stock!",
        });
      }

      let products = cart.products;
      products.push(product);

      const productAddedToCart = await addProductsToCart(cart._id, products);

      const productUpdated = await updateProductById(
        productId,
        product.title,
        product.description,
        product.code,
        product.photo,
        product.value,
        product.stock - 1
      );

      return res.status(201).json({
        mensaje: "producto agregado al carrito con exito",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deleteCartByIdController = async (req, res) => {
  username = actualUser.username;
  name = actualUser.name;
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id válido!",
      });
    }
    const id = parseInt(req.params.id);
    let cart = await getProductsInCart(id);

    if (!cart) {
      return res.status(404).json({
        mensaje: "carrito no encontrado!",
      });
    } else {
      if (username != cart.username) {
        return res.status(403).json({
          msg: "No tiene permisos de acceso!",
        });
      } else {
        if (cart.closed == true) {
          return res.status(400).json({
            msg: "ya se realizo la compra, no se puede eliminar este carrito!",
          });
        }

        await deleteCartById(cart._id);
        return res.status(200).json({
          mensaje: "carrito eliminado con exito",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deleteProductInCartByIdController = async (req, res) => {
  username = actualUser.username;
  name = actualUser.name;
  try {
    if (isNaN(req.params.id) || isNaN(req.params.id_prod)) {
      return res.status(400).json({
        error: "Tiene que enviar parámetros válidos!",
      });
    }
    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.params.id_prod);

    const cart = await getProductsInCart(cartId);

    if (!cart) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    }

    if (username != cart.username) {
      return res.status(403).json({
        msg: "No tiene permisos de acceso!",
      });
    }

    if (cart.closed == true) {
      return res.status(400).json({
        msg: "ya se realizo la compra, no se pueden eliminar productos de este carrito!",
      });
    }

    let productExists = await findProductInCart(cart, productId);
    console.log(productExists);

    if (!productExists) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      let products = cart.products;
      const filteredProducts = products.filter((item) => item.id !== productId);
      let initialQ = products.length;
      let finalQ = filteredProducts.length;
      let diff = initialQ - finalQ;

      const productAddedToCart = await addProductsToCart(
        cart._id,
        filteredProducts
      );

      const productUpdated = await updateProductById(
        productId,
        productExists.title,
        productExists.description,
        productExists.code,
        productExists.photo,
        productExists.value,
        productExists.stock + diff
      );

      return res.status(201).json({
        mensaje: "producto eliminado del carrito con exito",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const finishOrderController = async (req, res) => {
  username = actualUser.username;
  name = actualUser.name;
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id de carrito válido!",
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const cartId = parseInt(req.params.id);

    let cart = await getProductsInCart(cartId);

    if (!cart) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    }

    if (username != cart.username) {
      return res.status(403).json({
        msg: "No tiene permisos de acceso!",
      });
    }

    if (cart.closed == true) {
      return res.status(400).json({
        msg: "ya se realizo la compra!",
      });
    }

    let finishCart = await finishOrder(cart);

    await sendUserFinishBuyMail(username, name, cart.products);

    return res.status(200).json({
      mensaje: "compra realizada con éxito!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
