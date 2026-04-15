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
    `flex items-center gap-2 pb-1 transition-colors duration-200 ${
      isActive
        ? "text-white border-b-2 border-white"
        : "text-secondary hover:text-white"
    }`;

  const createRouteBySection = {
    orders: "/order/new",
    products: "/product/new",
    categories: null,
  };

  const currentSection = Object.keys(createRouteBySection).find((section) =>
    pathname.startsWith(`/${section}`),
  );
  const createLink = currentSection
    ? createRouteBySection[currentSection]
    : null;

  return (
    <div className="flex items-center justify-between  px-8 py-2 bg-primary shadow-xl h-24 capitalize">
      <div className="flex flex-col">
        {/* Navigation */}
        <nav className="flex gap-6  text-[17px] ">
          <NavLink to="/" className={linkClass}>
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
            Categories
          </NavLink>
        </nav>
        <div className="mt-4">
          {/* {createLink ? ( */}
          <NavLink className="btn-secondary" to={createLink}>
            Nouveau
          </NavLink>
          {/* // ) : (
            <button
              className="btn-secondary opacity-60 cursor-not-allowed"
              disabled
            >
              Nouveau
            </button>
          )} */}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 size-12">
        <button className="btn-secondary" onClick={handleLogout}>
          <LogOut />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
