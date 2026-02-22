import { defineStore } from 'pinia';
import { ref } from 'vue';
import AuthService from '@/services/AuthService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(AuthService.getUser());
  const token = ref(localStorage.getItem('token') || null);
  const error = ref(null);

  const login = async (username, password) => {
    error.value = null;
    try {
      const result = await AuthService.login(username, password);
      user.value = result.user;
      token.value = result.token;
      return true;
    } catch (err) {
      error.value = err.message || 'Login failed';
      return false;
    }
  };

  const logout = () => {
    AuthService.logout();
    user.value = null;
    token.value = null;
  };

  const isAuthenticated = () => AuthService.isAuthenticated();

  return {
    user,
    token,
    error,
    login,
    logout,
    isAuthenticated,
  };
});
