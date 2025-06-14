import { Link, useLocation, type LinkProps } from "react-router-dom";

type SidebarItemProps = LinkProps

export function SidebarItem({ ...props }: SidebarItemProps) {
  const { pathname } = useLocation();

  return (
    <Link
      data-current={pathname === props.to}
      className="text-muted-foreground hover:text-foreground data-[current=true]:text-foreground flex cursor-pointer items-center gap-2 font-medium transition duration-300 hover:scale-105"
      {...props}
    />
  );
}