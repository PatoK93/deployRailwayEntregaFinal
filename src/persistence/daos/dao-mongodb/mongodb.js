import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", false);

export default class DaoMongoDB {
  static instance;

  constructor(productCollection, cartCollection, productSchema, cartSchema) {
    this.productCollection = mongoose.model(productCollection, productSchema);
    this.cartCollection = mongoose.model(cartCollection, cartSchema);
    if (!DaoMongoDB.instance) {
      this.initDB = mongoose.connect(process.env.MONGO_ATLAS_SRV, () =>
        console.log("Connected to MongoDB")
      );
      DaoMongoDB.instance = this;
      console.log("Se instancia la clase de mongo!");
    } else {
      console.log("La clase de mongo ya fue instanciada!");
      return DaoMongoDB.instance;
    }
  }

  async initMongoDB() {
    return this.initDB;
  }

  async getAllProducts() {
    try {
      const docs = await this.productCollection.find({});
      return docs;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const doc = await this.productCollection.findOne({ id: id });
      return doc;
    } catch (error) {
      console.log(error);
    }
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
    try {
      const document = await this.productCollection.create({
        id,
        timestamp,
        title,
        description,
        code,
        photo,
        value,
        stock,
      });
      return document;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductById(id, title, description, code, photo, value, stock) {
    try {
      const document = await this.productCollection.findOne({ id: id });
      const productUpdated = await this.productCollection.findByIdAndUpdate(
        document._id,
        { title, description, code, photo, value, stock },
        { new: true }
      );
      return productUpdated;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProdcutById(id) {
    try {
      const document = await this.productCollection.findOne({ id: id });
      await this.productCollection.findByIdAndDelete(document._id);
    } catch (error) {
      console.log(error);
    }
  }

  async findLastProductId() {
    let lastDocument = await this.productCollection
      .findOne()
      .sort({ id: -1 })
      .limit(1);
    let lastId = lastDocument.id;
    return lastId;
  }

  async getProductsInCart(id) {
    let document = await this.cartCollection.findOne({ id: id });
    return document;
  }

  async createCart(id, timestamp, username, name, products, closed) {
    await this.cartCollection.create({
      id,
      timestamp,
      username,
      name,
      products,
      closed,
    });
    return document;
  }

  async addProductsToCart(id, products) {
    let document = await this.cartCollection.findByIdAndUpdate(
      id,
      { products },
      { new: true }
    );
    return document;
  }

  async modifiedStockProductById(
    id,
    title,
    description,
    code,
    photo,
    value,
    stock
  ) {
    let document = await this.cartCollection.findByIdAndUpdate(id, {
      tile: title,
      description: description,
      code: code,
      photo: photo,
      value: value,
      stock: stock,
    });
    return document;
  }

  async deleteCartById(id) {
    await this.cartCollection.findByIdAndDelete({ id: id });
  }

  async findProductInCart(cart, productId) {
    let productExists = cart.products.find((item) => item.id == productId);
    return productExists;
  }

  async finishOrder(cart) {
    let finishedCart = await this.cartCollection.findByIdAndUpdate(cart.id, {
      id: cart.id,
      timestamp: cart.timestamp,
      username: cart.username,
      name: cart.name,
      products: cart.products,
      closed: true,
    });
    return finishedCart;
  }

  async findLastCartId() {
    let lastDocument = await this.cartCollection
      .findOne()
      .sort({ id: -1 })
      .limit(1);
    return lastDocument;
  }

  async getProductsByCategorie(categorie) {
    let products = await this.productCollection.find({ code: categorie });
    return products;
  }
}
