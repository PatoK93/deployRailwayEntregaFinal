import CartsRepository from "../persistence/repository/carts.repository.js";

const cartsRepository = new CartsRepository();

export async function getProductsInCart(id) {
  const productsInCart = await cartsRepository.getProductsInCart(id);
  return productsInCart;
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

export async function addProductsToCart(_id, products) {
  const productAddedToCart = await cartsRepository.addProductsToCart(
    _id,
    products
  );
  return productAddedToCart;
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
  let lastId = await cartsRepository.findLastCartId();
  return lastId;
}
