import { Route, Routes, Navigate } from "react-router-dom";
import OrderList from "../pages/OrderList";
import CategoriesPage from "../pages/CategoriesPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../components/PrivateRoute";
import ProductsPage from "../pages/ProductsPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <OrderList />
          </PrivateRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <PrivateRoute>
            <CategoriesPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
