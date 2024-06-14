import { BookMarked } from "lucide-react";
import { SettingsMenu } from "../settings-menu";
import { ThemeToggle } from "../theme-toggle";
import { Separator } from "../ui/separator";

export function Header() {
  return (
    <div>
      <div className="flex justify-between mb-4 items-center">
        <div className="flex gap-2 items-center">
          <BookMarked size={30} />
          <h1 className="text-4xl font-semibold">Patrika</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
