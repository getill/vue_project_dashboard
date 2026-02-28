<template>
  <div class="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
    <!-- Left panel: Graphic/Gradient -->
    <div class="hidden lg:flex lg:w-1/2 bg-linear-to-br from-indigo-600 via-purple-600 to-indigo-900 relative overflow-hidden items-center justify-center">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div class="absolute w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse top-1/4 left-1/4"></div>
      <div class="absolute w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse duration-1000 delay-500 bottom-1/4 right-1/4"></div>
      
      <div class="relative z-10 text-center px-12">
        <div class="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl border border-white/20">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h1 class="text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">Welcome to VueDash.</h1>
        <p class="text-xl text-indigo-100 font-medium">A premium, hyper-modern admin dashboard built with Vue 3 and Tailwind CSS v4.</p>
      </div>
    </div>

    <!-- Right panel: Login form -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      <!-- Theme Toggle -->
      <button @click="themeStore.toggleTheme" class="absolute top-6 right-6 p-3 text-slate-400 hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none">
        <svg v-if="!themeStore.isDark" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
      </button>

      <div class="max-w-md w-full">
        <div class="text-center lg:text-left mb-10">
          <h2 class="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Sign in</h2>
          <p class="mt-2 text-base text-slate-500 dark:text-slate-400">
            Use any credentials to access the dashboard.
          </p>
        </div>

        <form class="space-y-6" @submit.prevent="handleLogin">
          <div class="space-y-5">
            <div>
              <label for="username" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                v-model="username"
                class="appearance-none block w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                v-model="password"
                class="appearance-none block w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div v-if="authStore.error" class="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800/50 text-center font-medium">
            {{ authStore.error }}
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98]"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ isLoading ? 'Signing in...' : 'Sign In' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useThemeStore } from '@/stores/theme';

const username = ref('admin');
const password = ref('password');
const isLoading = ref(false);

const router = useRouter();
const authStore = useAuthStore();
const themeStore = useThemeStore();

const handleLogin = async () => {
  isLoading.value = true;
  const success = await authStore.login(username.value, password.value);
  isLoading.value = false;
  
  if (success) {
    router.push('/dashboard');
  }
};
</script>
