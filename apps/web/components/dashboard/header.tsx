"use client";

import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  // TODO: Fetch establishment name, open/closed status
  return (
    <header className="flex items-center justify-between border-b px-6 h-16">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="font-semibold text-sm">Mon Commerce</h2>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">Ouvert</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {/* TODO: Notification badge */}
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
