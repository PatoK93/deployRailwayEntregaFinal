import { asDto } from "../dto/products.dto.js";
import { getDao } from "../daos/factory.js";

export default class ProductsRepository {
  constructor() {
    this.dao = getDao();
  }

  async getAllProducts() {
    const products = await this.dao.getAllProducts();
    const prodsDTO = asDto(products);
    return prodsDTO;
  }

  async getProductById(id) {
    const product = await this.dao.getProductById(id);
    const prodDTO = asDto(product);
    return prodDTO;
  }

  async createProduct(
    id,
    timestamp,
    title,
    description,
    code,
    photo,
    value,
    stock
  ) {
    const newProduct = await this.dao.createProduct(
      id,
      timestamp,
      title,
      description,
      code,
      photo,
      value,
      stock
    );
    return newProduct;
  }

  async updateProductById(id, title, description, code, photo, value, stock) {
    const productUpdated = await this.dao.updateProductById(
      id,
      title,
      description,
      code,
      photo,
      value,
      stock
    );
    return productUpdated;
  }

  async deleteProdcutById(id) {
    await this.dao.deleteProdcutById(id);
  }

  async findLastProductId() {
    let lastId = await this.dao.findLastProductId();
    return lastId;
  }

  async getProductsByCategorie(categorie) {
    let products = await this.dao.getProductsByCategorie(categorie);
    return products;
  }
}
