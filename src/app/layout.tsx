import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OrFooter } from "@/components/organisms/or-footer";
import { OrHeader, OrHeaderIcons } from "@/components/organisms/or-header";

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
  const icons: OrHeaderIcons[] = [{ icon: "/icons/cart.svg", link: "/cart" }];

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <OrHeader icons={icons} />
        <main className="flex flex-1 flex-col px-6 md:px-32">{children}</main>
        <OrFooter />
      </body>
    </html>
  );
}
