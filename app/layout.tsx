import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meets",
  description: "PFF Meets",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="container">
        <div className="header">
          <h1 className="siteTitle">PFF Meets</h1>
          {username && (
            <h3 className="loggedInAs">Hey {username}!</h3>
          )}
        </div>
        {children}
      </body>
    </html>
  );
}
