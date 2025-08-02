import { Product } from "../models/product";
import axios from 'axios';

export const ProductService = {
  async getProducts(): Promise<Product[]> {
    let currentProducts = JSON.parse(localStorage.getItem('products') ?? '[]') as Product [];
    if(!currentProducts || currentProducts.length === 0) {
      currentProducts = (await axios.get<Product[]>('/data/products.json')).data;
      localStorage.setItem('products', JSON.stringify(currentProducts));
    }

    return currentProducts;
  },

  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    if(!product.name) throw new Error('Nome é obrigatório') ;
    if(!product.category) throw new Error('Categoria é obrigatório');
    if(!product.description) throw new Error('Descrição é obrigatório');
    if(!product.pictureUrl) throw new Error('Url da imagem é obrigatório');
    if(!product.price) throw new Error('Preço é obrigatório');

    try {
      product.price = Number.parseFloat(product.price.toString())
    } catch (error) {
      throw new Error('Preço inválido');
    }

    const currentProducts = await this.getProducts();
    const nextId = Math.max(...currentProducts.map(p => p.id)) + 1;
    const newProduct = { ...product, id: nextId } as Product;

    const updatedProducts = [...currentProducts, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return newProduct;
  }
};