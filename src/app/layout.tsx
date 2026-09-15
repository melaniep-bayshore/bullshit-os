import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Bullshit OS",
  description: "A page that refuses to help.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
