"use client";
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Keycloak from 'keycloak-js';

// Service principal para comunicação com a API
// Usa axios com interceptors para JWT e tratamento de erros
const API_BASE_URL = 'http://localhost:5000/api';


class ApiService {
  private api: AxiosInstance;
  private keycloak: Keycloak | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  setKeycloak(keycloak: Keycloak) {
    this.keycloak = keycloak;
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
      async (config) => {
        if (this.keycloak && this.keycloak.token) {
          try {
            await this.keycloak.updateToken(70);
            config.headers.Authorization = `Bearer ${this.keycloak.token}`;
          } catch (error) {
            console.error('Failed to refresh token:', error);
            this.keycloak.logout();
          }
        } else {
          const token = localStorage.getItem('token');
          if (token && token !== 'mock-jwt-token') {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        if (error.response?.status === 401) {
          if (this.keycloak) {
            this.keycloak.logout();
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async getProducts(pagina = 1, paginaTam = 10, busca?: string, categoriaId?: string) {
    const params = new URLSearchParams({
      pagina: pagina.toString(),
      paginaTam: paginaTam.toString(),
    });
    
    if (busca) params.append('busca', busca);
    if (categoriaId) params.append('categoriaId', categoriaId);
  
    const response = await this.api.get(`/product?${params.toString()}`);
    
    // retorna só o array de produtos
    return response.data.data.data; // ✅ aqui é o que ProductsTable espera
  }
  
  async getProductById(id: string) {
    const response = await this.api.get(`/product/${id}`);
    return response.data.data;
  }

  async getLowStockProducts(limite: number = 10) {
    const allProducts = await this.getProducts(1, 1000); // busca todos
    return allProducts.filter((p: any) => p.estoque < limite);
  }
  

  async createProduct(product: any) {
    const response = await this.api.post('/product', product);
    return response.data.data;
  }

  async updateProduct(id: string, product: any) {
    const response = await this.api.put(`/product/${id}`, product);
    return response.data.data;
  }

  async deleteProduct(id: string) {
    const response = await this.api.delete(`/product/${id}`);
    return response.data;
  }

  async getCategories() {
    const response = await this.api.get('/category');
    return response.data.data || response.data;
  }

  async getCategoryById(id: string) {
    const response = await this.api.get(`/category/${id}`);
    return response.data.data;
  }

  async createCategory(category: any) {
    const response = await this.api.post('/category', category);
    return response.data.data;
  }

  async updateCategory(id: string, category: any) {
    const response = await this.api.put(`/category/${id}`, category);
    return response.data.data;
  }

  async deleteCategory(id: string) {
    const response = await this.api.delete(`/category/${id}`);
    return response.data;
  }

  async getDashboardStats() {
    const response = await this.api.get('/Dashboard/stats');
    return response.data.data;
  }

  async updateStock(id: string, quantity: number) {
    const response = await this.api.patch(`/product/${id}/estoque`, { quantity });
    return response.data.data;
  }

  
}

export const apiService = new ApiService();
export default apiService;