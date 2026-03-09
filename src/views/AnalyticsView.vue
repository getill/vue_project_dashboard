<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Analytics & Reports</h2>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Deep dive into your store's metrics and sales data.</p>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      
      <!-- Sales by Month (Bar Chart) -->
      <div class="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6">Sales by Month</h3>
        <div class="relative h-72">
          <BarChart :data="barChartData" :options="dynamicBarOptions" />
        </div>
      </div>

      <!-- Top Categories (Doughnut Chart) -->
      <div class="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6">Sales by Category</h3>
        <div class="relative h-72 flex justify-center">
          <DoughnutChart :data="doughnutChartData" :options="dynamicDoughnutOptions" />
        </div>
      </div>

    </div>

    <!-- Top Selling Products -->
    <div class="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
      <div class="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Top Selling Products</h3>
        <span class="px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300 rounded-full text-xs font-bold">This Month</span>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead class="bg-slate-50/50 dark:bg-slate-800/50">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Product</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
              <th scope="col" class="px-6 py-4 text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Units Sold</th>
              <th scope="col" class="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Revenue</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
            <tr v-for="product in topProducts" :key="product.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-slate-900 dark:text-white truncate w-64" :title="product.title">{{ product.title }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 inline-flex text-xs font-bold rounded-md bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300 uppercase tracking-wider">
                  {{ product.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 text-center font-medium">
                {{ product.unitsSold }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                ${{ product.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Bar as BarChart, Doughnut as DoughnutChart } from 'vue-chartjs';
import { useThemeStore } from '@/stores/theme';
import { 
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement 
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const themeStore = useThemeStore();

const barChartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      backgroundColor: '#6366f1', // indigo-500
      hoverBackgroundColor: '#4f46e5', // indigo-600
      borderRadius: 6,
      data: [12500, 15000, 14000, 18500, 22000, 24500]
    }
  ]
});

// Dynamic options that react to dark mode for grid lines and ticks
const dynamicBarOptions = computed(() => {
  const isDark = themeStore.isDark;
  const textColor = isDark ? '#94a3b8' : '#64748b'; // slate-400 : slate-500
  const gridColor = isDark ? '#1e293b' : '#f1f5f9'; // slate-800 : slate-100

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor, drawBorder: false }
      },
      y: {
        ticks: { color: textColor },
        grid: { color: gridColor, drawBorder: false }
      }
    }
  };
});

const doughnutChartData = ref({
  labels: ['Electronics', 'Jewelry', 'Men\'s Clothing', 'Women\'s Clothing'],
  datasets: [
    {
      backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'], // blue, violet, emerald, amber
      borderWidth: 0,
      hoverOffset: 4,
      data: [45, 15, 20, 20]
    }
  ]
});

const dynamicDoughnutOptions = computed(() => {
  const isDark = themeStore.isDark;
  const textColor = isDark ? '#cbd5e1' : '#475569'; // slate-300 : slate-600

  return {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { 
        position: 'right',
        labels: {
          color: textColor,
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    }
  };
});

// Mock top products
const topProducts = ref([
  { id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack', category: 'men\'s clothing', unitsSold: 342, revenue: 37585.80 },
  { id: 2, title: 'WD 2TB Elements Portable External Hard Drive', category: 'electronics', unitsSold: 215, revenue: 13760.00 },
  { id: 3, title: 'SanDisk SSD PLUS 1TB Internal SSD', category: 'electronics', unitsSold: 198, revenue: 21582.00 },
  { id: 4, title: 'Mens Casual Premium Slim Fit T-Shirts', category: 'men\'s clothing', unitsSold: 184, revenue: 4103.20 },
  { id: 5, title: 'John Hardy Women\'s Legends Naga Gold & Silver', category: 'jewelry', unitsSold: 89, revenue: 61855.00 },
]);
</script>
