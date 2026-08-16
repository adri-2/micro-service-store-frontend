import { Route, Routes, Navigate } from "react-router-dom";
import OrderList from "../pages/Order/OrderList";
import CategoriesPage from "../pages/Categorie/CategoriesList";
import CategoriesCreater from "../pages/Categorie/CategoriesCreater";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../components/PrivateRoute";
import ProductsList from "../pages/Product/ProductsList";
import ProductsCreater from "../pages/Product/ProductsCreater";
import OrderCreater from "../pages/Order/OrderCreater";
import MainLayout from "../components/layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import CustomerList from "../pages/Customer/CustomerList";
import CustomerCreater from "../pages/Customer/CustomerCreater";
import SuppliersList from "../pages/Supplier/SuppliersList";
import SuppliersCreater from "../pages/Supplier/SuppliersCreater";
// import Cust from "../pages/CustomerList";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="/orders" element={<OrderList />} />
        <Route path="/order/new" element={<OrderCreater />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/new" element={<CategoriesCreater />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/product/new" element={<ProductsCreater />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/new" element={<CustomerCreater />} />
        <Route path="/suppliers" element={<SuppliersList />} />
        <Route path="/suppliers/new" element={<SuppliersCreater />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
