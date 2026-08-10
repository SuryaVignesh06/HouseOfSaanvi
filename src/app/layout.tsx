import type { Metadata } from "next";
import { Bebas_Neue, Poppins, Yellowtail, Playfair_Display } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif", // Keeping the variable name the same so it maps to existing classes like font-serif
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "800", "900"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "House of Saanvi — Contemporary Women's Fashion",
  description: "Discover sarees, lehengas, kurtas, dresses and curated fashion collections from House of Saanvi.",
};

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${poppins.variable} ${yellowtail.variable} ${playfair.variable} h-full antialiased`}>
      <body className="flex flex-col min-h-screen bg-background text-foreground font-sans">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
