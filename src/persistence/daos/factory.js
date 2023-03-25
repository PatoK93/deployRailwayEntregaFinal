import DaoMongoDB from "./dao-mongodb/mongodb.js";
import { productSchema } from "./dao-mongodb/schema/products.schema.js";
import { cartSchema } from "./dao-mongodb/schema/carts.schema.js";

let dao;

dao = new DaoMongoDB("productos", "carritos", productSchema, cartSchema);
dao.initMongoDB();

export async function getAllProducts() {
  return await dao.getAllProducts();
}

export async function getProductById(id) {
  return await dao.getProductById(id);
}

export async function createProduct(
  id,
  timestamp,
  title,
  description,
  code,
  photo,
  value,
  stock
) {
  return await dao.createProduct(
    id,
    timestamp,
    title,
    description,
    code,
    photo,
    value,
    stock
  );
}

export async function updateProductById(
  id,
  title,
  description,
  code,
  photo,
  value,
  stock
) {
  return await dao.updateProductById(
    id,
    title,
    description,
    code,
    photo,
    value,
    stock
  );
}

export async function deleteProdcutById(id) {
  await dao.deleteProdcutById(id);
}

export async function findLastProductId() {
  return await dao.findLastProductId();
}

export async function getProductsInCart(id) {
  return await dao.getProductsInCart(id);
}

export async function createCart(
  id,
  timestamp,
  username,
  name,
  products,
  closed
) {
  await dao.createCart(id, timestamp, username, name, products, closed);
}

export async function addProductsToCart(_id, products) {
  return await dao.addProductsToCart(_id, products);
}

export async function deleteCartById(id) {
  await dao.deleteCartById(id);
}

export async function findProductInCart(cart, productId) {
  return await dao.findProductInCart(cart, productId);
}

export async function finishOrder(cart) {
  return await dao.finishOrder(cart);
}

export async function findLastCartId() {
  return await dao.findLastCartId();
}

export async function getProductsByCategorie(categorie) {
  return await dao.getProductsByCategorie(categorie);
}

export function getDao() {
  return dao;
}
