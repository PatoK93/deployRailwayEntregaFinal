import DaoMongoDB from "./dao-mongodb/mongodb.js";
import { productsSchema } from "./dao-mongodb/schema/products.schema.js";
import { cartsSchema } from "./dao-mongodb/schema/carts.schema.js";
import { usersSchema } from "./dao-mongodb/schema/users.schema.js";

dao = new DaoMongoDB("productos", "carritos", productsSchema, cartsSchema);
dao.initMongoDB();

export async function getAllProducts() {
  return await dao.getAllProducts();
}

export async function getProductById(id) {
  return await dao.getProductById(id);
}

export async function createProduct(obj) {
  return await dao.createProduct(obj);
}

export async function updateProductById(prod) {
  return await dao.updateProductById(prod);
}

export async function deleteProdcutById(id) {
  await dao.deleteProdcutById(id);
}

export async function findLastProductId() {
  await dao.findLastProductId();
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

export async function addProductsToCart(id, products) {
  return await dao.addProductsToCart(id, products);
}

export async function modifiedStockProductById(
  id,
  title,
  description,
  code,
  photo,
  value,
  stock
) {
  return await dao.modifiedStockProductById(
    id,
    title,
    description,
    code,
    photo,
    value,
    stock
  );
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
