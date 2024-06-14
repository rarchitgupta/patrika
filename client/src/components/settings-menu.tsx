"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCog, FileKey } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import useAuthStore from "@/store/authStore";

export function SettingsMenu() {
  const { setTheme } = useTheme();
  const { openApiKeyDialog } = useAppStore();
  const { logout } = useAuthStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserCog />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-2">
        <DropdownMenuItem onClick={openApiKeyDialog} className="gap-2">
          <FileKey />
          <div>Set OpenAI API Key</div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout} className="gap-2">
          <FileKey />
          <div>Logout</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
