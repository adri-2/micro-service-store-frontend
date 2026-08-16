import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LogOut } from "lucide-react";

function NavBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-slate-900 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const createRouteBySection = {
    orders: "/order/new",
    products: "/product/new",
    customers: "/customers/new",
    suppliers: "/suppliers/new",
    categories: "/categories/new",
  };

  const currentSection = Object.keys(createRouteBySection).find((section) =>
    pathname.startsWith(`/${section}`),
  );
  const createLink = currentSection
    ? createRouteBySection[currentSection]
    : null;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="page-section flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Gestion
          </span>
          <nav className="flex flex-wrap gap-2">
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/orders" className={linkClass}>
              Commandes
            </NavLink>
            <NavLink to="/products" className={linkClass}>
              Produits
            </NavLink>
            <NavLink to="/customers" className={linkClass}>
              Clients
            </NavLink>
            <NavLink to="/suppliers" className={linkClass}>
              Fournisseurs
            </NavLink>
            <NavLink to="/categories" className={linkClass}>
              Catégories
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {createLink ? (
            <NavLink className="btn-secondary" to={createLink}>
              Nouveau
            </NavLink>
          ) : (
            <button
              className="btn-secondary"
              disabled
            >
              Nouveau
            </button>
          )}
          <button
            className="btn-secondary px-3"
            onClick={handleLogout}
            aria-label="Se déconnecter"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
