import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "World Association",
  description: "The democratic United Nations alternative.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="p-4 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
          <ThirdwebProvider>{children}</ThirdwebProvider>
        </main>
      </body>
    </html>
  );
}
