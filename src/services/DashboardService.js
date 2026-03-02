import api from './api';

class DashboardService {
  async getDashboardData() {
    const [usersRes, productsRes, cartsRes] = await Promise.all([
      api.get('/users'),
      api.get('/products'),
      api.get('/carts?limit=5')
    ]);

    const stats = {
      totalSales: '$24,500', // Mocked
      totalUsers: usersRes.data.length,
      totalProducts: productsRes.data.length,
      totalOrders: 156 // Mocked
    };

    const recentOrders = cartsRes.data.map(cart => ({
      id: cart.id,
      date: new Date(cart.date).toLocaleDateString(),
      userId: cart.userId,
      items: cart.products.length,
      status: ['Pending', 'Processing', 'Delivered'][Math.floor(Math.random() * 3)]
    }));

    const salesData = [1200, 1900, 3000, 5000, 4200, 6800, 8100];

    return { stats, recentOrders, salesData };
  }
}

export default new DashboardService();
