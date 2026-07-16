import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kids Desk Job - Learn & Play!",
  description: "An interactive office desk job game that teaches kids math, reading, and typing skills!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
