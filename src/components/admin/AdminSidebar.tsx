"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Feather,
  BookOpen,
  FolderGit2,
  Library,
  MessageSquare,
  Mail,
  Users2,
  Flag,
  FileClock,
  BarChart3,
  FileText,
  Copy,
  Sparkles,
  Settings,
  UserCheck,
  Menu,
  X,
  Shield,
  AlertTriangle,
} from "lucide-react";

interface AdminSidebarProps {
  user: {
    id: string;
    name: string;
    username: string;
    role: string;
    mustChangePassword?: boolean;
  };
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/writers", label: "Writers", icon: Feather },
    { href: "/admin/readers", label: "Readers", icon: BookOpen },
    { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
    { href: "/admin/books", label: "Books", icon: Library },
    { href: "/admin/comments", label: "Comments", icon: MessageSquare },
    { href: "/admin/messages", label: "Messages", icon: Mail },
    { href: "/admin/collaborations", label: "Collaborations", icon: Users2 },
    { href: "/admin/reports", label: "Reports", icon: Flag },
    { href: "/admin/activity-logs", label: "Activity Logs", icon: FileClock },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/content", label: "Content", icon: FileText },
    { href: "/admin/templates", label: "Templates", icon: Copy },
    { href: "/admin/ai-config", label: "AI Configuration", icon: Sparkles },
    { href: "/admin/settings", label: "System Settings", icon: Settings },
    { href: "/admin/profile", label: "Admin Profile", icon: UserCheck },
  ];

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <div className="lg:hidden flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2 font-serif text-lg font-bold text-primary">
          <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <span>Admin Studio</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border px-6 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 text-white shadow-md">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold leading-none">INKORA</h2>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Admin Studio
              </span>
            </div>
          </div>

          {/* Password Change Warning Banner if required */}
          {user.mustChangePassword && (
            <div className="mx-3 mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Password Update Required</p>
                <Link
                  href="/admin/profile"
                  className="underline hover:text-amber-800 dark:hover:text-amber-200 mt-1 inline-block"
                >
                  Change default password
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm shadow-primary/30"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Footer */}
          <div className="border-t border-border p-4 bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/10 font-serif font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                {user.name.charAt(0)}
              </div>
              <div className="truncate text-xs">
                <p className="font-bold truncate">{user.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">@{user.username}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
