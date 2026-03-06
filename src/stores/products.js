import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import ProductService from '@/services/ProductService';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const categories = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  
  const selectedCategory = ref('');
  const searchQuery = ref('');
  
  // Pagination
  const currentPage = ref(1);
  const itemsPerPage = 8;

  const fetchProducts = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      products.value = await ProductService.getAll();
    } catch (err) {
      error.value = 'Failed to fetch products';
    } finally {
      isLoading.value = false;
    }
  };

  const fetchCategories = async () => {
    try {
      categories.value = await ProductService.getCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const addProduct = async (productData) => {
    isLoading.value = true;
    error.value = null;
    try {
      const newProduct = await ProductService.add(productData);
      products.value.unshift(newProduct);
      return true;
    } catch (err) {
      error.value = 'Failed to add product';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const updateProduct = async (id, productData) => {
    isLoading.value = true;
    error.value = null;
    try {
      const updatedProduct = await ProductService.update(id, productData);
      const index = products.value.findIndex(p => p.id === id);
      if (index !== -1) {
        products.value[index] = updatedProduct;
      }
      return true;
    } catch (err) {
      error.value = 'Failed to update product';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteProduct = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      await ProductService.delete(id);
      products.value = products.value.filter(p => p.id !== id);
      return true;
    } catch (err) {
      error.value = 'Failed to delete product';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const filteredProducts = computed(() => {
    let result = products.value;
    
    if (selectedCategory.value) {
      result = result.filter(p => p.category === selectedCategory.value);
    }
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(query));
    }
    
    return result;
  });

  const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.value.slice(start, end);
  });

  return {
    products,
    categories,
    isLoading,
    error,
    selectedCategory,
    searchQuery,
    currentPage,
    totalPages,
    paginatedProducts,
    fetchProducts,
    fetchCategories,
    addProduct,
    updateProduct,
    deleteProduct
  };
});
