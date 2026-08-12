"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, PlusCircle, Users, User, Shield } from "lucide-react";

interface MobileNavProps {
  user?: {
    id: string;
    name: string;
    role?: string;
  } | null;
}

export function MobileNav({ user }: MobileNavProps) {
  const pathname = usePathname();

  // Hide mobile nav on specific full-screen views if needed
  if (pathname.includes("/editor")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 block md:hidden border-t border-border bg-card/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom)] transition-all">
      <div className="flex h-16 items-center justify-around px-2">
        <Link
          href={user ? "/dashboard" : "/"}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] text-[10px] font-medium transition-colors ${
            pathname === "/" || pathname === "/dashboard"
              ? "text-primary font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>

        <Link
          href="/books"
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] text-[10px] font-medium transition-colors ${
            pathname.startsWith("/books")
              ? "text-primary font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span>Library</span>
        </Link>

        {/* Primary Action Button: Create */}
        <Link
          href="/projects/new"
          className="flex flex-col items-center justify-center -mt-5 group"
          title="Create New Project"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-amber-500 text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <PlusCircle className="h-6 w-6" />
          </div>
          <span className="text-[10px] font-bold text-foreground mt-0.5">Create</span>
        </Link>

        <Link
          href="/community"
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] text-[10px] font-medium transition-colors ${
            pathname.startsWith("/community")
              ? "text-primary font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="h-5 w-5" />
          <span>Community</span>
        </Link>

        <Link
          href={user?.role === "ADMIN" ? "/admin" : user ? "/profile" : "/login"}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] text-[10px] font-medium transition-colors ${
            pathname.startsWith("/profile") || pathname.startsWith("/admin")
              ? "text-primary font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {user?.role === "ADMIN" ? (
            <>
              <Shield className="h-5 w-5 text-amber-500" />
              <span>Admin</span>
            </>
          ) : (
            <>
              <User className="h-5 w-5" />
              <span>Profile</span>
            </>
          )}
        </Link>
      </div>
    </nav>
  );
}
