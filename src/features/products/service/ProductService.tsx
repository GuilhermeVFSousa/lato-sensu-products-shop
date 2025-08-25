import { Product } from "../models/product";
import axios from 'axios';

export const API_URL = 'http://localhost:3000/products';


export const ProductService = {
  async getProducts(): Promise<Product[]> {
    return await axios.get<Product[]>(API_URL).then(response => response.data);
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

     return await axios.post<Product>(API_URL, product).then(response => response.data);
  },

    async updateProduct(product: Product): Promise<Product> {
    if(!product.id) throw new Error('ID é obrigatório') ;
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

     return await axios.put<Product>(`${API_URL}/${product.id}`, product).then(response => response.data);
  },

  async deleteProduct(id: number): Promise<void> {
    if(!id) throw new Error('ID é obrigatório') ;
    
    await axios.delete<Product>(`${API_URL}/${id}`);
  },

  async uploadFromCSV(file: File): Promise<{ success: number; errors: string[] }> {
    if (!file?.name.toLowerCase().endsWith('.csv')) {
      throw new Error('Arquivo deve ser CSV');
    }

    const Papa = await import('papaparse');
    
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          const errors: string[] = [];
          let success = 0;

          for (let i = 0; i < results.data.length; i++) {
            try {
              const row = results.data[i] as any;
              const product = {
                name: row.name?.trim(),
                description: row.description?.trim(),
                price: parseFloat(row.price?.toString().replace(',', '.')),
                category: row.category?.trim(),
                pictureUrl: row.pictureUrl?.trim()
              };

              if (!product.name || !product.description || !product.category || 
                  !product.pictureUrl || !product.price) {
                throw new Error('Campos obrigatórios em branco');
              }

              await this.addProduct(product);
              success++;
            } catch (error: Error | any) {
              errors.push(`Linha ${i + 2}: ${error?.message}`);
            }
          }

          resolve({ success, errors });
        },
        error: (error) => reject(new Error(`Erro no CSV: ${error.message}`))
      });
    });
  }
};