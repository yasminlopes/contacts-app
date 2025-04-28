import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

export default function LayoutBase() {
  return (
    <div className="flex h-screen bg-base-300 text-base-content">
      <Sidebar />
      <div className="flex-1 flex flex-col items-stretch p-4 md:p-6 lg:p-8">
        <div className="bg-base-100 rounded-2xl shadow-lg w-full h-full flex flex-col overflow-hidden">
          <main className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
