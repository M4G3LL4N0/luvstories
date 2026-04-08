import type { Metadata } from "next";
import "./globals.css";
import { createServer } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "LuvStories",
  description:
    "Build, understand, and shape your love story with private relationship intelligence.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body data-authenticated={user ? "true" : "false"}>{children}</body>
    </html>
  );
}
