"use client";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/store/authStore";
import Link from "next/link";

export function UserMenu() {
  const { logout } = useAuthStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Account and Settings</DropdownMenuLabel>
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem><Link href={"/settings"}>Settings</Link></DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
