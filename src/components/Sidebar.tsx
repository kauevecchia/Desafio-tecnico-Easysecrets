import { ChartPie, ShoppingBasket } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <div className="bg-background text-foreground hidden flex-grow flex-col gap-96 p-4 lg:flex">
      <nav className="flex flex-grow flex-col space-y-2">
        <ul className="flex flex-col gap-4">
          <SidebarItem to="/">
            <ChartPie />
            Dashboard
          </SidebarItem>
          <SidebarItem to="/products-comparison">
            <ShoppingBasket />
            Comparar Produtos
          </SidebarItem>
        </ul>
      </nav>
    </div>
  );
}