import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export function DefaultLayout() {
  return (
    <div className="bg-background flex h-screen flex-col">
      <Header />

      <div className="flex flex-grow px-4 py-4">
        <aside className="hidden lg:block lg:w-1/5">
          <Sidebar />
        </aside>
        <main className="min-w-0 flex-grow p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}