import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="p-6 bg-gray-100 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
