import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Tushar Talmale ",
  description: "Building scalable web and mobile apps using Java, Spring Boot, React, and Flutter.",
  keywords: ["Tushar Talmale", "Portfolio", "Full Stack Developer", "Flutter", "Java", "Spring Boot", "React", "Next.js"],
  authors: [{ name: "Tushar Talmale", url: "https://github.com/TusharTalmale" }],
  icons: {
    icon: "/Logo.png", 
    shortcut: "/Logo.png",
    apple: "/Logo.png", 
  },
  openGraph: {
    title: "Tushar Talmale – Portfolio",
    description: "A passionate Full Stack & Flutter Developer from India.",
    url: "/Logo.png",
    siteName: "Tushar Portfolio",
    images: [
      {
        url: "/Logo.png",
        width: 2000,
        height: 1630,
        alt: "Tushar Talmale Portfolio",
      },
    ],
    type: "website",
  },
};

