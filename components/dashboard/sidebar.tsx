"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  User,
  Calendar,
  FileText,
  Settings,
  Menu,
  LogOut,
  Music,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b border-[#2a2f46] px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-[#ff6b35] flex items-center justify-center">
            <Music className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-white">Level Play</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-[#ff6b35] text-white"
                  : "text-gray-300 hover:bg-[#2a2f46] hover:text-white"
              )}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t border-[#2a2f46] p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-[#2a2f46] hover:text-white"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0",
          className
        )}
      >
        <div className="flex flex-col flex-grow bg-[#1a1f36] border-r border-[#2a2f46]">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-40 bg-[#1a1f36] border border-[#2a2f46] text-white hover:bg-[#2a2f46]"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-64 p-0 bg-[#1a1f36] border-[#2a2f46]"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
