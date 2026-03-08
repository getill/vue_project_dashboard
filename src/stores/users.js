import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import UserService from '@/services/UserService';

export const useUsersStore = defineStore('users', () => {
  const users = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const searchQuery = ref('');

  const fetchUsers = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      users.value = await UserService.getAll();
    } catch (err) {
      error.value = 'Failed to fetch users';
    } finally {
      isLoading.value = false;
    }
  };

  const deleteUser = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      await UserService.delete(id);
      users.value = users.value.filter(u => u.id !== id);
      return true;
    } catch (err) {
      error.value = 'Failed to delete user';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value;
    const query = searchQuery.value.toLowerCase();
    return users.value.filter(u => 
      u.name.firstname.toLowerCase().includes(query) ||
      u.name.lastname.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.username.toLowerCase().includes(query)
    );
  });

  return {
    users,
    isLoading,
    error,
    searchQuery,
    filteredUsers,
    fetchUsers,
    deleteUser
  };
});
