<template>
  <header class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-xs border-b border-gray-200 dark:border-slate-800 transition-colors duration-300 z-20 sticky top-0">
    <div class="flex items-center justify-between px-6 py-4">
      <div class="flex items-center">
        <button
          @click="$emit('toggle-sidebar')"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none lg:hidden transition-colors"
        >
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <div class="flex items-center space-x-4">
        <!-- Theme Toggle -->
        <button @click="themeStore.toggleTheme" class="p-2 text-gray-400 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <svg v-if="!themeStore.isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
        </button>

        <div class="h-6 w-px bg-gray-200 dark:bg-slate-700 hidden sm:block"></div>

        <button class="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none transition-colors">
          <img
            class="h-8 w-8 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
            src="https://ui-avatars.com/api/?name=Admin+User&background=4f46e5&color=fff"
            alt="Your avatar"
          />
          <span class="ml-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hidden sm:block">Admin User</span>
        </button>
        <button @click="logout" class="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useThemeStore } from '@/stores/theme';

const router = useRouter();
const authStore = useAuthStore();
const themeStore = useThemeStore();

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>
