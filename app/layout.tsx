import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Decenda 26 — CTF Competition",
  description:
    "Register for Decenda 26, the Capture The Flag competition hosted by Tinkerhub MBCCET, MuLearn MBCCET & Room Number 404 at Mar Baselious Christian College of Engineering and Technology, Peermade.",
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
