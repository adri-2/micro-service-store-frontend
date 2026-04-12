import { Route, Routes, Navigate } from "react-router-dom";
import OrderList from "../pages/OrderList";
import CategoriesPage from "../pages/CategoriesPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../components/PrivateRoute";
import ProductsPage from "../pages/ProductsPage";
import OrderCreater from "../pages/OrderCreater";

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
        path="/orders/new"
        element={
          <PrivateRoute>
            <OrderCreater />
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
