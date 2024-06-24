import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Package2,
  Pencil,
  Files,
  Brain,
  MessageSquareMore,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function MobileSidebar() {
  const pathname = usePathname();
  function getLinkClass(currentPath: string) {
    return `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
      currentPath === pathname
        ? "bg-muted text-foreground"
        : "text-muted-foreground"
    }`;
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Patrika</span>
          </Link>
          <div>
            <Link href="/" className={getLinkClass("/")}>
              <Pencil className="h-5 w-5" />
              Create
            </Link>
            <Link href="/documents" className={getLinkClass("/documents")}>
              <Files className="h-5 w-5" />
              Documents
            </Link>
            <Link href="/context" className={getLinkClass("/context")}>
              <Brain className="h-5 w-5" />
              Context
            </Link>
            <Link href="/chat" className={getLinkClass("/chat")}>
              <MessageSquareMore className="h-5 w-5" />
              Chat
            </Link>
          </div>
        </nav>
        <div className="mt-auto"></div>
      </SheetContent>
    </Sheet>
  );
}
