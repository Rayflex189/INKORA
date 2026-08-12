import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "INKORA — AI Writing Studio & Book Creation Workspace",
  description: "A professional writing studio, manuscript editor, project blueprint generator, AI assistant, and writer community ecosystem.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header user={user} />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
