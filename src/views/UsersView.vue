<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Users Management</h2>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">View and manage customer accounts.</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <div class="flex-1 relative">
        <input v-model="usersStore.searchQuery" type="text" placeholder="Search by name, email or username..." class="w-full pl-11 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white placeholder-slate-400 transition-shadow">
        <div class="absolute left-4 top-3 text-slate-400">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="usersStore.isLoading && usersStore.users.length === 0" class="flex justify-center items-center py-24">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
    </div>

    <!-- Users Table -->
    <div v-else class="bg-white dark:bg-slate-900/80 backdrop-blur-md shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden rounded-2xl">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead class="bg-slate-50/50 dark:bg-slate-800/50">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Username</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contact</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Address</th>
              <th scope="col" class="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
            <tr v-for="user in usersStore.filteredUsers" :key="user.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="shrink-0 h-11 w-11 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-500/30 group-hover:scale-105 transition-transform">
                    {{ user.name.firstname.charAt(0).toUpperCase() }}{{ user.name.lastname.charAt(0).toUpperCase() }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-semibold text-slate-900 dark:text-white capitalize">{{ user.name.firstname }} {{ user.name.lastname }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 font-medium">
                @{{ user.username }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-slate-900 dark:text-slate-300 font-medium">{{ user.email }}</div>
                <div class="text-sm text-slate-500 dark:text-slate-500 mt-1 flex items-center">
                  <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  {{ user.phone }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                <div class="truncate w-40 flex items-center" :title="`${user.address.street}, ${user.address.city}`">
                  <svg class="w-3.5 h-3.5 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span class="truncate">{{ user.address.street }}, {{ user.address.city }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="openDetails(user)" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-4 transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">View</button>
                <button @click="confirmDelete(user)" class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">Delete</button>
              </td>
            </tr>
            <tr v-if="usersStore.filteredUsers.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-slate-500 dark:text-slate-400">No users found matching your search.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- User Details Modal -->
    <div v-if="selectedUser" class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" aria-hidden="true" @click="selectedUser = null"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="relative z-10 inline-block align-bottom bg-white dark:bg-slate-900 rounded-2xl text-left shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div class="px-6 pt-6 pb-6">
            <div class="flex items-center space-x-4 border-b border-slate-200 dark:border-slate-800 pb-5 mb-5">
              <div class="shrink-0 h-16 w-16 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-700 dark:text-indigo-400 text-2xl font-bold border-2 border-indigo-200 dark:border-indigo-500/30">
                {{ selectedUser.name.firstname.charAt(0).toUpperCase() }}{{ selectedUser.name.lastname.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white capitalize" id="modal-title">
                  {{ selectedUser.name.firstname }} {{ selectedUser.name.lastname }}
                </h3>
                <p class="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center mt-1">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> Active User
                </p>
              </div>
            </div>
            
            <dl class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <div class="sm:col-span-1 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
                <dt class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Username</dt>
                <dd class="text-sm font-semibold text-slate-900 dark:text-white">@{{ selectedUser.username }}</dd>
              </div>
              <div class="sm:col-span-1 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
                <dt class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Email address</dt>
                <dd class="text-sm font-semibold text-slate-900 dark:text-white truncate" :title="selectedUser.email">{{ selectedUser.email }}</dd>
              </div>
              <div class="sm:col-span-1 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
                <dt class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Phone</dt>
                <dd class="text-sm font-semibold text-slate-900 dark:text-white">{{ selectedUser.phone }}</dd>
              </div>
              <div class="sm:col-span-1 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
                <dt class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Role</dt>
                <dd class="text-sm font-semibold text-slate-900 dark:text-white capitalize">Customer</dd>
              </div>
              <div class="sm:col-span-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
                <dt class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Full Address</dt>
                <dd class="text-sm font-semibold text-slate-900 dark:text-white flex items-start mt-1">
                  <svg class="w-5 h-5 mr-2 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>{{ selectedUser.address.number }} {{ selectedUser.address.street }},<br>{{ selectedUser.address.city }}, ZIP {{ selectedUser.address.zipcode }}</span>
                </dd>
              </div>
            </dl>
          </div>
          <div class="bg-slate-50/50 dark:bg-slate-800/50 px-6 py-4 flex sm:flex-row-reverse border-t border-slate-200 dark:border-slate-800">
            <button type="button" @click="selectedUser = null" class="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all shadow-sm active:scale-95">
              Close Viewer
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUsersStore } from '@/stores/users';

const usersStore = useUsersStore();
const selectedUser = ref(null);

onMounted(() => {
  if (usersStore.users.length === 0) {
    usersStore.fetchUsers();
  }
});

const openDetails = (user) => {
  selectedUser.value = user;
};

const confirmDelete = async (user) => {
  if (window.confirm(`Are you sure you want to delete ${user.name.firstname}?`)) {
    await usersStore.deleteUser(user.id);
  }
};
</script>
