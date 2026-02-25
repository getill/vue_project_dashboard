class AuthService {
  async login(username, password) {
    // Mock login logic per FakeStore constraints
    if (username && password) {
      const user = { username, role: 'admin' };
      const token = 'dummy-token-123';
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      return { user, token };
    }
    throw new Error('Invalid username or password');
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user')) || null;
  }
}

export default new AuthService();
