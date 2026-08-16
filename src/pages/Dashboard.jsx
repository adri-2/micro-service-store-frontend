import React, { useEffect, useState } from 'react';
import { orderService } from '../api/orderService';
import { productService } from '../api/categorieService';
import { categorieService } from '../api/categorieService';
import { supplierService } from '../api/supplierService';
import StatCard from '../components/StatCard';
import RecentOrders from '../components/RecentOrders';
import LowStockProducts from '../components/LowStockProducts';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    ordersCount: 0,
    productsCount: 0,
    categoriesCount: 0,
    suppliersCount: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération en parallèle
        const [
          ordersRes,
          productsRes,
          categoriesRes,
          suppliersRes,
          lowStockRes,
        ] = await Promise.all([
          orderService.getAll(),
          productService.getAll(),
          categorieService.getAll(),
          supplierService.getAll(),
          productService.getLowStock(),
        ]);

        const orders = ordersRes.data;
        const products = productsRes.data;
        const categories = categoriesRes.data;
        const suppliers = suppliersRes.data;

        setStats({
          ordersCount: orders.length,
          productsCount: products.length,
          categoriesCount: categories.length,
          suppliersCount: suppliers.length,
        });

        // 5 dernières commandes (triées par date)
        const sorted = orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRecentOrders(sorted.slice(0, 5));

        setLowStock(lowStockRes.data);

        // Données pour le graphique (ex: commandes par mois)
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];
        const counts = months.map((_, i) =>
          orders.filter((o) => new Date(o.created_at).getMonth() === i).length,
        );
        setChartData({
          labels: months,
          datasets: [
            {
              label: 'Nombre de commandes',
              data: counts,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement du dashboard', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="app-shell flex items-center justify-center">
        <p className="text-sm text-slate-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Vue d’ensemble</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Tableau de bord</h1>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Commandes" value={stats.ordersCount} icon="🛒" color="bg-blue-500" />
        <StatCard title="Produits" value={stats.productsCount} icon="📦" color="bg-green-500" />
        <StatCard title="Catégories" value={stats.categoriesCount} icon="🏷️" color="bg-yellow-500" />
        <StatCard title="Fournisseurs" value={stats.suppliersCount} icon="🏢" color="bg-purple-500" />
      </div>

      {/* Graphique */}
      <div className="surface p-5">
        <div className="mb-4">
          <h2 className="surface-title">Commandes par mois</h2>
          <p className="surface-subtitle">Lecture rapide de l’activité récente.</p>
        </div>
        {chartData && <Bar data={chartData} options={{ responsive: true }} />}
      </div>

      {/* Commandes récentes et produits en stock faible */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentOrders orders={recentOrders} />
        <LowStockProducts products={lowStock} />
      </div>
    </div>
  );
};

export default Dashboard;