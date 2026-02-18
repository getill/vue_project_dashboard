<template>
  <div 
    :class="[
      'fixed inset-y-0 left-0 z-30 w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 transition-transform duration-300 flex flex-col lg:static lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <div class="flex items-center justify-center h-20 border-b border-slate-800/60">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h1 class="text-white text-xl font-bold tracking-tight">VueDash.</h1>
      </div>
    </div>
    <div class="overflow-y-auto overflow-x-hidden grow py-6">
      <ul class="flex flex-col space-y-2 px-4">
        <li class="px-2 mb-2">
          <div class="text-xs font-semibold tracking-wider text-slate-400 uppercase">Dashboard Menu</div>
        </li>
        <li>
          <router-link
            to="/dashboard"
            class="relative flex flex-row items-center h-12 px-4 rounded-xl focus:outline-none hover:bg-slate-800/50 text-slate-300 hover:text-white transition-all duration-200 group"
            active-class="bg-indigo-500/10 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/20 shadow-inner"
          >
            <span class="inline-flex justify-center items-center group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </span>
            <span class="ml-3 text-sm font-medium tracking-wide truncate">Overview</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/products"
            class="relative flex flex-row items-center h-12 px-4 rounded-xl focus:outline-none hover:bg-slate-800/50 text-slate-300 hover:text-white transition-all duration-200 group"
            active-class="bg-indigo-500/10 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/20 shadow-inner"
          >
            <span class="inline-flex justify-center items-center group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            </span>
            <span class="ml-3 text-sm font-medium tracking-wide truncate">Products</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/users"
            class="relative flex flex-row items-center h-12 px-4 rounded-xl focus:outline-none hover:bg-slate-800/50 text-slate-300 hover:text-white transition-all duration-200 group"
            active-class="bg-indigo-500/10 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/20 shadow-inner"
          >
            <span class="inline-flex justify-center items-center group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </span>
            <span class="ml-3 text-sm font-medium tracking-wide truncate">Users</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/analytics"
            class="relative flex flex-row items-center h-12 px-4 rounded-xl focus:outline-none hover:bg-slate-800/50 text-slate-300 hover:text-white transition-all duration-200 group"
            active-class="bg-indigo-500/10 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/20 shadow-inner"
          >
            <span class="inline-flex justify-center items-center group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </span>
            <span class="ml-3 text-sm font-medium tracking-wide truncate">Analytics</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});
</script>
