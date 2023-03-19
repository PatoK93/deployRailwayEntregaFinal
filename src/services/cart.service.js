import CartsRepository from "../persistence/repository/carts.repository.js";

const CartsRepository = new CartsRepository();

export async function getProductsInCart(id) {
  const productsInCart = await CartsRepository.getProductsInCart(id);
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
  await CartsRepository.createCart(
    id,
    timestamp,
    username,
    name,
    products,
    closed
  );
}

export async function addProductsToCart(id, products) {
  const productAddedToCart = await CartsRepository.addProductsToCart(
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
  const productUpdatedInCart = await CartsRepository.updateProductById(
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
  await CartsRepository.deleteCartById(id);
}

export async function findProductInCart(cart, productId) {
  const productExists = await CartsRepository.findProductInCart(
    cart,
    productId
  );
  return productExists;
}

export async function finishOrder(cart) {
  const finishCart = await CartsRepository.finishOrder(cart);
  return finishCart;
}

export async function findLastCartId() {
  let lastId = await CartsRepository.findLastProductId();
  return lastId;
}
