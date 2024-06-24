"use client";
import Link from "next/link";
import {
  BookMarked,
  Files,
  MessageSquareMore,
  Brain,
  NotebookPen,
  Settings,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  function getLinkClass(currentPath: string) {
    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
      currentPath === pathname ? "bg-muted text-primary" : ""
    }`;
  }
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[80px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BookMarked className="h-6 w-6" />
            <span className="">Patrika</span>
          </Link>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <div>
              <Link href="/" className={getLinkClass("/")}>
                <NotebookPen className="h-4 w-4" />
                Create
              </Link>
              <Link href="/documents" className={getLinkClass("/documents")}>
                <Files className="h-4 w-4" />
                Documents
              </Link>
              <Link href="/context" className={getLinkClass("/context")}>
                <Brain className="h-4 w-4" />
                Context
              </Link>
              <Link href="/chat" className={getLinkClass("/chat")}>
                <MessageSquareMore className="h-4 w-4" />
                Chat
              </Link>
            </div>
          </nav>
        </div>
        <div className="mt-auto px-2 py-4 text-sm font-medium lg:px-4 lg:py-8">
          <Link href="/settings" className={getLinkClass("/settings")}>
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
