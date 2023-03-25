import { getDao } from "../daos/factory.js";

export default class CartsRepository {
  constructor() {
    this.dao = getDao();
  }

  async getProductsInCart(id) {
    const productsInCart = await this.dao.getProductsInCart(id);
    return productsInCart;
  }

  async createCart(id, timestamp, username, name, products, closed) {
    await this.dao.createCart(id, timestamp, username, name, products, closed);
  }

  async addProductsToCart(_id, products) {
    const newProductInCart = await this.dao.addProductsToCart(_id, products);
    return newProductInCart;
  }

  async deleteCartById(id) {
    await this.dao.deleteCartById(id);
  }

  async findProductInCart(cart, productId) {
    let productExists = await this.dao.findProductInCart(cart, productId);
    return productExists;
  }

  async finishOrder(cart) {
    let finishCart = await this.dao.finishOrder(cart);
    return finishCart;
  }

  async findLastCartId() {
    let lastId = await this.dao.findLastCartId();
    return lastId;
  }
}
