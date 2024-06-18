import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
export function SearchBar() {
  return (
    <div className="w-full flex-1">
      <form>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Documents"
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          />
        </div>
      </form>
    </div>
  );
}
