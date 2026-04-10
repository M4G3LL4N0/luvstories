import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LuvStories",
  description:
    "Build, understand, and shape your love story with private relationship intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
