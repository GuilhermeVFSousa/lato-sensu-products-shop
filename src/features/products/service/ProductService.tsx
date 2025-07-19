import { Product } from "../models/product";
import axios from 'axios';

export const ProductService = {
  async getProducts(): Promise<Product[]> {
    const response = await axios.get<Product[]>('/data/products.json');
    return response.data;
  }
};