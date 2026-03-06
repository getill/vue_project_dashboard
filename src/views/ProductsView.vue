<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Products Management</h2>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage your catalog, prices, and inventory.</p>
      </div>
      <button @click="openCreateModal" class="mt-4 sm:mt-0 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95 font-semibold text-sm">
        <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        Add Product
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <div class="flex-1 relative">
        <input v-model="productsStore.searchQuery" type="text" placeholder="Search products..." class="w-full pl-11 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white placeholder-slate-400 transition-shadow">
        <div class="absolute left-4 top-3 text-slate-400">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>
      <div class="w-full sm:w-64 relative">
        <select v-model="productsStore.selectedCategory" class="appearance-none w-full pl-4 pr-10 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white transition-shadow font-medium">
          <option value="">All Categories</option>
          <option v-for="cat in productsStore.categories" :key="cat" :value="cat" class="capitalize">{{ cat }}</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="productsStore.isLoading && productsStore.products.length === 0" class="flex justify-center items-center py-24">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
    </div>

    <!-- Products Table -->
    <div v-else class="bg-white dark:bg-slate-900/80 backdrop-blur-md shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden rounded-2xl">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead class="bg-slate-50/50 dark:bg-slate-800/50">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Product</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Price</th>
              <th scope="col" class="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
            <tr v-for="product in productsStore.paginatedProducts" :key="product.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="shrink-0 h-12 w-12 rounded-xl bg-white border border-slate-200 dark:border-slate-700 p-2 shadow-sm group-hover:shadow transition-shadow">
                    <img class="h-full w-full object-contain" :src="product.image" alt="" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-semibold text-slate-900 dark:text-white truncate w-64" :title="product.title">{{ product.title }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 inline-flex text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300 uppercase tracking-wider">
                  {{ product.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-300">
                ${{ product.price.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="openEditModal(product)" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-4 transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Edit</button>
                <button @click="confirmDelete(product)" class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">Delete</button>
              </td>
            </tr>
            <tr v-if="productsStore.paginatedProducts.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-slate-500 dark:text-slate-400">No products found matching your criteria.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-slate-700 dark:text-slate-300">
              Showing page <span class="font-bold text-slate-900 dark:text-white">{{ productsStore.currentPage }}</span> of <span class="font-bold text-slate-900 dark:text-white">{{ productsStore.totalPages || 1 }}</span>
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                @click="productsStore.currentPage--" 
                :disabled="productsStore.currentPage === 1"
                class="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button 
                @click="productsStore.currentPage++" 
                :disabled="productsStore.currentPage >= productsStore.totalPages"
                class="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Modal (Create/Edit) -->
    <div v-if="isModalOpen" class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" aria-hidden="true" @click="closeModal"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="relative z-10 inline-block align-bottom bg-white dark:bg-slate-900 rounded-2xl text-left shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full border border-slate-200 dark:border-slate-800 overflow-hidden">
          <form @submit.prevent="saveProduct">
            <div class="px-6 pt-6 pb-6">
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-6" id="modal-title">
                {{ isEditing ? 'Edit Product' : 'Add New Product' }}
              </h3>
              
              <div class="space-y-5">
                <div>
                  <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Title</label>
                  <input v-model="productForm.title" type="text" required class="block w-full border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-shadow text-sm">
                </div>
                
                <div class="grid grid-cols-2 gap-5">
                  <div>
                    <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Price ($)</label>
                    <input v-model.number="productForm.price" type="number" step="0.01" required class="block w-full border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-shadow text-sm">
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                    <select v-model="productForm.category" required class="block w-full border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-shadow text-sm">
                      <option disabled value="">Select category</option>
                      <option v-for="cat in productsStore.categories" :key="cat" :value="cat" class="capitalize">{{ cat }}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Image URL</label>
                  <input v-model="productForm.image" type="url" required class="block w-full border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-shadow text-sm">
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                  <textarea v-model="productForm.description" rows="4" class="block w-full border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-shadow text-sm resize-none"></textarea>
                </div>
              </div>
            </div>
            <div class="bg-slate-50/50 dark:bg-slate-800/50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 border-t border-slate-200 dark:border-slate-800">
              <button type="button" @click="closeModal" class="mt-3 w-full sm:mt-0 sm:w-auto inline-flex justify-center items-center px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm">
                Cancel
              </button>
              <button type="submit" :disabled="productsStore.isLoading" class="w-full sm:w-auto inline-flex justify-center items-center px-5 py-2.5 rounded-xl border border-transparent bg-indigo-600 text-sm font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transition-all shadow-md shadow-indigo-600/20 active:scale-95">
                <svg v-if="productsStore.isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {{ productsStore.isLoading ? 'Saving...' : 'Save Product' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useProductsStore } from '@/stores/products';

const productsStore = useProductsStore();

const isModalOpen = ref(false);
const isEditing = ref(false);
const productForm = ref({
  id: null,
  title: '',
  price: 0,
  category: '',
  image: '',
  description: ''
});

onMounted(async () => {
  productsStore.fetchCategories();
  if (productsStore.products.length === 0) {
    productsStore.fetchProducts();
  }
});

watch([() => productsStore.searchQuery, () => productsStore.selectedCategory], () => {
  productsStore.currentPage = 1;
});

const openCreateModal = () => {
  isEditing.value = false;
  productForm.value = { id: null, title: '', price: 0, category: '', image: '', description: '' };
  isModalOpen.value = true;
};

const openEditModal = (product) => {
  isEditing.value = true;
  productForm.value = { ...product };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const saveProduct = async () => {
  let success = false;
  if (isEditing.value) {
    success = await productsStore.updateProduct(productForm.value.id, productForm.value);
  } else {
    success = await productsStore.addProduct(productForm.value);
  }
  
  if (success) {
    closeModal();
  } else {
    alert(productsStore.error);
  }
};

const confirmDelete = async (product) => {
  if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
    const success = await productsStore.deleteProduct(product.id);
    if (!success) {
      alert(productsStore.error);
    }
  }
};
</script>
