<template>
  <div class="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
    <!-- Mobile sidebar backdrop -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false"
      class="fixed inset-0 z-20 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
    ></div>

    <Sidebar :is-open="isSidebarOpen" />
    <div class="flex-1 flex flex-col overflow-hidden w-full">
      <Navbar @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 p-6 transition-colors duration-300">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';

const isSidebarOpen = ref(false);
const route = useRoute();

// Close sidebar on route change
watch(() => route.path, () => {
  isSidebarOpen.value = false;
});
</script>
