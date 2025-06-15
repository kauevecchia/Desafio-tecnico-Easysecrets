import { Link } from "react-router-dom";
import { ThemeToggler } from "./ThemeToggler";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="bg-background flex items-center justify-between p-6">
      <Link to={"/"}>
        <h3 className="text-foreground font-bold md:text-2xl">Sales Tracker</h3>
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggler />
        <div className="block lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}