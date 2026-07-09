import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Rubik_Glitch } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

import Header from "./components/header/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubikGlitch = Rubik_Glitch({
  variable: "--font-rubik-glitch",
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: "Meets",
  description: "PFF Meets",

  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${rubikGlitch.variable}`}>
      <body className="bigContainer">
        <Header />
        {children}
      </body>
    </html>
  );
}
