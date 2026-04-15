import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <aside>
        <NavBar />
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
