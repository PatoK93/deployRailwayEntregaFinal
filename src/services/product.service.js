import ProductsRepository from "../persistence/repository/products.repository.js";

const productsRepository = new ProductsRepository();

export async function getAllProducts() {
  const products = await productsRepository.getAllProducts();
  return products;
}

export async function getProductById(id) {
  const product = await productsRepository.getProductById(id);
  return product;
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
  const newProduct = await productsRepository.createProduct(
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

export async function updateProductById(
  id,
  title,
  description,
  code,
  photo,
  value,
  stock
) {
  const productUpdated = await productsRepository.updateProductById(
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

export async function deleteProductById(id) {
  await productsRepository.deleteProdcutById(id);
}

export async function findLastProductId() {
  let lastId = await productsRepository.findLastProductId();
  return lastId;
}

export async function getProductsByCode(categorie) {
  let products = await productsRepository.getProductsByCategorie(categorie);
  return products;
}
