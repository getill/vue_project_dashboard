import api from './api';

class ProductService {
  async getAll() {
    const response = await api.get('/products');
    return response.data;
  }

  async getCategories() {
    const response = await api.get('/products/categories');
    return response.data;
  }

  async add(productData) {
    const response = await api.post('/products', productData);
    return response.data;
  }

  async update(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  }

  async delete(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
}

export default new ProductService();
