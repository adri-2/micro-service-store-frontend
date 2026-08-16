import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
function MainLayout() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="page-section">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
