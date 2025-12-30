import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar"
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200" ,"400", "500", "700", "800"]
});


export const metadata: Metadata = {
  title: "amunpos",
  description: "a landing page for amunpos",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
        <NavBar />
      </body>
    </html>
  );
}
