import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OrHeader } from "@/components/organisms/OrHeader";
import { OrFooter } from "@/components/organisms/OrFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apply Digital Test",
  description: "Frontend development test for Apply Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <OrHeader />
        <main className='flex flex-col px-6 md:px-32'>
          {children}
        </main>
        <OrFooter />
      </body>
    </html>
  );
}
