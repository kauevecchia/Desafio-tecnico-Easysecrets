import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Sun, Moon, Laptop } from "lucide-react";

export function ThemeToggler() {
  const { setTheme, theme } = useTheme();

  return (
    <Select onValueChange={setTheme} defaultValue={theme}>
      <SelectTrigger className="w-[70px] md:w-[150px]">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">
          <p className="hidden text-xs md:block md:text-base">Light</p>
          <Sun />
        </SelectItem>
        <SelectItem value="dark">
          <p className="hidden text-xs md:block md:text-base">Dark</p>
          <Moon />
        </SelectItem>
        <SelectItem value="system">
          <p className="hidden text-xs md:block md:text-base">System</p>
          <Laptop />
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
