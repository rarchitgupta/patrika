import { UserMenu } from "./user-menu";
import { SearchBar } from "./search-bar";
import { MobileSidebar } from "./mobile-sidebar";

export function Navbar() {
  return (
    <header className="flex h-14 items-center justify-between md:justify-end gap-4 md:border-b px-2 my-2 lg:h-[80px] lg:px-6 lg:bg-muted/40 lg:my-0">
      <MobileSidebar />
      <UserMenu />
    </header>
  );
}
