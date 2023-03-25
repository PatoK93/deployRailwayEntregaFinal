import CartsRepository from "../persistence/repository/carts.repository.js";

const cartsRepository = new CartsRepository();

export async function getProductsInCart(id) {
  const productsInCart = await cartsRepository.getProductsInCart(id);
  return products;
}

export async function createCart(
  id,
  timestamp,
  username,
  name,
  products,
  closed
) {
  await cartsRepository.createCart(
    id,
    timestamp,
    username,
    name,
    products,
    closed
  );
}

export async function addProductsToCart(id, products) {
  const productAddedToCart = await cartsRepository.addProductsToCart(
    id,
    products
  );
  return productAddedToCart;
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
  const productUpdatedInCart = await cartsRepository.updateProductById(
    id,
    title,
    description,
    code,
    photo,
    value,
    stock
  );
  return productUpdatedInCart;
}

export async function deleteCartById(id) {
  await cartsRepository.deleteCartById(id);
}

export async function findProductInCart(cart, productId) {
  const productExists = await cartsRepository.findProductInCart(
    cart,
    productId
  );
  return productExists;
}

export async function finishOrder(cart) {
  const finishCart = await cartsRepository.finishOrder(cart);
  return finishCart;
}

export async function findLastCartId() {
  let lastId = await cartsRepository.findLastProductId();
  return lastId;
}
