import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Rubik_Glitch } from "next/font/google";
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

const rubikGlitch = Rubik_Glitch({
  variable: "--font-rubik-glitch",
  subsets: ["latin"],
  weight: "400",
})

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${rubikGlitch.variable}`}>
      <body>
        <div className="header">
          <h1 className="siteTitle">PFF Meets</h1>
          {username && (
            <h3 className="loggedInAs">Hey {username}!</h3>
          )}

          <ul className="navLinks">
            <li>
              <a className="link" href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a className="link" href="/viewmeets">View Meets</a>
            </li>
            <li>
              <a className="link" href="/addmeets">Add Meet</a>
            </li>
            <li className="link">
              <a className="comingSoonFont" href="/anchat">Anchat (Coming Soon)</a>
            </li>
          </ul>
        </div>
        {children}
      </body>
    </html>
  );
}
