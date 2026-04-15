import { Route, Routes, Navigate } from "react-router-dom";
import OrderList from "../pages/OrderList";
import CategoriesPage from "../pages/CategoriesList";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../components/PrivateRoute";
import ProductsList from "../pages/ProductsList";
import ProductsCreater from "../pages/ProductsCreater";
import OrderCreater from "../pages/OrderCreater";
import MainLayout from "../components/layouts/MainLayout";

import CustomerList from "../pages/CustomerList";
import SuppliersList from "../pages/SuppliersList";
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
        <Route path="/products" element={<ProductsList />} />
        <Route path="/product/new" element={<ProductsCreater />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/suppliers" element={<SuppliersList />} />
        <Route path="/" element={<Navigate to="/orders" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
