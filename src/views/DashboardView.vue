<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h2>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Your store's performance at a glance.</p>
      </div>
      <button @click="dashboardStore.fetchDashboardData" class="mt-4 sm:mt-0 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center shadow-sm font-medium">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        Refresh Data
      </button>
    </div>

    <!-- Error State -->
    <div v-if="dashboardStore.error" class="bg-red-50/50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl p-4 backdrop-blur-sm">
      <div class="flex items-center">
        <svg class="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <p class="text-sm font-medium text-red-800 dark:text-red-400">{{ dashboardStore.error }}</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="dashboardStore.isLoading && !dashboardStore.stats.totalUsers" class="flex justify-center items-center py-24">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
    </div>

    <template v-else>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Sales -->
        <div class="bg-white dark:bg-slate-900/80 backdrop-blur-md overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl transition-transform hover:-translate-y-1 duration-300">
          <div class="p-6">
            <div class="flex items-center">
              <div class="shrink-0 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl p-3 border border-indigo-500/20">
                <svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-semibold text-slate-500 dark:text-slate-400 truncate">Total Sales</dt>
                  <dd class="flex items-baseline"><div class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{{ dashboardStore.stats.totalSales }}</div></dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <!-- Users -->
        <div class="bg-white dark:bg-slate-900/80 backdrop-blur-md overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl transition-transform hover:-translate-y-1 duration-300">
          <div class="p-6">
            <div class="flex items-center">
              <div class="shrink-0 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl p-3 border border-emerald-500/20">
                <svg class="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-semibold text-slate-500 dark:text-slate-400 truncate">Total Users</dt>
                  <dd class="flex items-baseline"><div class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{{ dashboardStore.stats.totalUsers }}</div></dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <!-- Products -->
        <div class="bg-white dark:bg-slate-900/80 backdrop-blur-md overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl transition-transform hover:-translate-y-1 duration-300">
          <div class="p-6">
            <div class="flex items-center">
              <div class="shrink-0 bg-amber-500/10 dark:bg-amber-500/20 rounded-xl p-3 border border-amber-500/20">
                <svg class="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-semibold text-slate-500 dark:text-slate-400 truncate">Total Products</dt>
                  <dd class="flex items-baseline"><div class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{{ dashboardStore.stats.totalProducts }}</div></dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <!-- Orders -->
        <div class="bg-white dark:bg-slate-900/80 backdrop-blur-md overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl transition-transform hover:-translate-y-1 duration-300">
          <div class="p-6">
            <div class="flex items-center">
              <div class="shrink-0 bg-rose-500/10 dark:bg-rose-500/20 rounded-xl p-3 border border-rose-500/20">
                <svg class="h-6 w-6 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-semibold text-slate-500 dark:text-slate-400 truncate">Total Orders</dt>
                  <dd class="flex items-baseline"><div class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{{ dashboardStore.stats.totalOrders }}</div></dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts & Recent Orders -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
        <!-- Chart -->
        <div class="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6">Sales Trend</h3>
          <div class="relative h-72">
            <LineChart :data="chartData" :options="chartOptions" />
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
          <div class="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Recent Orders</h3>
          </div>
          <div class="overflow-x-auto flex-1">
            <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
              <thead class="bg-slate-50/50 dark:bg-slate-800/50">
                <tr>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Order ID</th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Items</th>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="order in dashboardStore.recentOrders" :key="order.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">#{{ order.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{{ order.date }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{{ order.items }} product(s)</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-3 py-1 inline-flex text-xs font-bold rounded-md',
                      order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300' : 
                      order.status === 'Processing' ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300' : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                    ]">
                      {{ order.status }}
                    </span>
                  </td>
                </tr>
                <tr v-if="dashboardStore.recentOrders.length === 0 && !dashboardStore.isLoading">
                  <td colspan="4" class="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">No recent orders found.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
import { useThemeStore } from '@/stores/theme';
import { Line as LineChart } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const dashboardStore = useDashboardStore();
const themeStore = useThemeStore();

onMounted(() => {
  if (!dashboardStore.stats.totalUsers) {
    dashboardStore.fetchDashboardData();
  }
});

const chartData = computed(() => ({
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Sales Revenue',
      backgroundColor: '#6366f1', // indigo-500
      borderColor: '#6366f1', // indigo-500
      borderWidth: 3,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#6366f1',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      data: dashboardStore.salesData,
      tension: 0.4
    }
  ]
}));

const chartOptions = computed(() => {
  const isDark = themeStore.isDark;
  const textColor = isDark ? '#94a3b8' : '#64748b'; // slate-400 : slate-500
  const gridColor = isDark ? '#1e293b' : '#f1f5f9'; // slate-800 : slate-100

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#0f172a' : '#ffffff',
        titleColor: isDark ? '#f8fafc' : '#0f172a',
        bodyColor: isDark ? '#cbd5e1' : '#475569',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6
      }
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor, drawBorder: false }
      },
      y: {
        beginAtZero: true,
        ticks: { color: textColor, padding: 10 },
        grid: { color: gridColor, drawBorder: false }
      }
    }
  };
});
</script>
