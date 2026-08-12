"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  BookOpen,
  PlusCircle,
  Compass,
  Users,
  Shield,
  FileText,
  Target,
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  User,
  Sparkles,
} from "lucide-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    id: string;
    name: string;
    username: string;
    avatar?: string | null;
    role?: string;
  } | null;
}

export function MobileDrawer({ isOpen, onClose, user }: MobileDrawerProps) {
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mainLinks = [
    { href: "/dashboard", label: "Studio Workspace", icon: BookOpen },
    { href: "/projects/new", label: "Create Project", icon: PlusCircle },
    { href: "/books", label: "Public Library", icon: Compass },
    { href: "/community", label: "Writer Community", icon: Users },
  ];

  const secondaryLinks = [
    { href: "/profile", label: "Author Profile & Stats", icon: User },
    { href: "/messages", label: "Direct Messages", icon: MessageSquare },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/settings", label: "Account Settings", icon: Settings },
  ];

  if (user?.role === "ADMIN") {
    mainLinks.push({ href: "/admin", label: "Admin Control Center", icon: Shield });
  }

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative flex w-4/5 max-w-xs flex-col bg-card border-r border-border p-5 shadow-2xl transition-transform animate-in slide-in-from-left duration-300">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 text-white font-bold">
              I
            </div>
            <span className="font-serif font-bold text-lg text-foreground">INKORA</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* User Info Header */}
        {user ? (
          <div className="py-4 border-b border-border space-y-1">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
                alt={user.name}
                className="h-10 w-10 rounded-full bg-primary/10 object-cover"
              />
              <div className="overflow-hidden">
                <p className="font-bold text-sm truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 border-b border-border space-y-2">
            <Link
              href="/login"
              className="block w-full text-center rounded-xl bg-primary py-2 text-xs font-bold text-white shadow-sm"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="block w-full text-center rounded-xl border border-border py-2 text-xs font-bold text-foreground"
            >
              Create Account
            </Link>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          <div className="space-y-1">
            <p className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Main Menu
            </p>
            {mainLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition-colors ${
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
          </div>

          {user && (
            <div className="space-y-1">
              <p className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                Personal
              </p>
              {secondaryLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition-colors ${
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
            </div>
          )}
        </div>

        {/* Footer */}
        {user && (
          <div className="pt-3 border-t border-border">
            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                window.location.href = "/login";
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
