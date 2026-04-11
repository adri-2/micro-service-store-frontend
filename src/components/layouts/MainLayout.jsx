import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex">
      <aside>Menu</aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
