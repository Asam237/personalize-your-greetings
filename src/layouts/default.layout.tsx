// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Greeting Card Creator - Beautiful Personalized Messages",
  description:
    "Create stunning, personalized greeting cards for weddings, birthdays, memorials, and New Year celebrations with our beautiful card generator.",
  keywords:
    "greeting cards, personalized messages, wedding cards, birthday cards, memorial cards, new year cards",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Greeting Card Creator",
    description:
      "Create beautiful, personalized messages for life's special moments",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
