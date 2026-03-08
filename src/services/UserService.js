import api from './api';

class UserService {
  async getAll() {
    const response = await api.get('/users');
    return response.data;
  }

  async delete(id) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
}

export default new UserService();
