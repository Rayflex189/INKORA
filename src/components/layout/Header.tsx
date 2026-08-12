"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import {
  Feather,
  Sun,
  Moon,
  Laptop,
  Bell,
  User,
  LogOut,
  PlusCircle,
  BookOpen,
  Users,
  Compass,
  Shield,
  ChevronDown,
} from "lucide-react";

interface HeaderProps {
  user?: {
    id: string;
    name: string;
    username: string;
    avatar?: string | null;
    role?: string;
  } | null;
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const navLinks = [
    { href: "/dashboard", label: "Workspace", icon: BookOpen },
    { href: "/projects/new", label: "Create", icon: PlusCircle },
    { href: "/gallery", label: "Book Gallery", icon: Compass },
    { href: "/community", label: "Community", icon: Users },
  ];

  if (user?.role === "ADMIN") {
    navLinks.push({ href: "/admin", label: "Admin", icon: Shield });
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Feather className="h-5 w-5" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">
              INKORA
            </span>
          </Link>

          {/* Navigation Links */}
          {user && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-3">
          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="Switch Theme"
            >
              {theme === "light" && <Sun className="h-4 w-4 text-amber-500" />}
              {theme === "dark" && <Moon className="h-4 w-4 text-indigo-400" />}
              {theme === "system" && <Laptop className="h-4 w-4" />}
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl border border-border bg-card p-1.5 shadow-lg shadow-black/5 z-50 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => { setTheme("light"); setShowThemeMenu(false); }}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium ${theme === "light" ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"}`}
                >
                  <Sun className="h-3.5 w-3.5 text-amber-500" /> Light
                </button>
                <button
                  onClick={() => { setTheme("dark"); setShowThemeMenu(false); }}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium ${theme === "dark" ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"}`}
                >
                  <Moon className="h-3.5 w-3.5 text-indigo-400" /> Dark
                </button>
                <button
                  onClick={() => { setTheme("system"); setShowThemeMenu(false); }}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium ${theme === "system" ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"}`}
                >
                  <Laptop className="h-3.5 w-3.5" /> System
                </button>
              </div>
            )}
          </div>

          {/* User Auth Profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 rounded-full border border-border p-1 hover:bg-muted transition-colors"
              >
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover bg-primary/10"
                />
                <span className="hidden sm:inline-block text-xs font-semibold px-1">
                  {user.name}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground mr-1" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card p-2 shadow-xl shadow-black/10 z-50">
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <p className="text-sm font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-muted"
                  >
                    <User className="h-4 w-4 text-primary" /> My Author Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-muted"
                  >
                    <BookOpen className="h-4 w-4 text-primary" /> Studio Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 mt-1"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors shadow-md shadow-primary/20"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
