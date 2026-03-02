import { defineStore } from 'pinia';
import { ref } from 'vue';
import DashboardService from '@/services/DashboardService';

export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref({
    totalSales: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0
  });
  const recentOrders = ref([]);
  const salesData = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchDashboardData = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await DashboardService.getDashboardData();
      stats.value = data.stats;
      recentOrders.value = data.recentOrders;
      salesData.value = data.salesData;

    } catch (err) {
      error.value = 'Failed to load dashboard data';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    stats,
    recentOrders,
    salesData,
    isLoading,
    error,
    fetchDashboardData
  };
});
