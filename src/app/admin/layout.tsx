import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  // Server-side admin authorization enforcement
  if (!currentUser || currentUser.role !== "ADMIN" || currentUser.status === "SUSPENDED") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background">
      <AdminSidebar user={currentUser} />
      <div className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">{children}</div>
    </div>
  );
}
