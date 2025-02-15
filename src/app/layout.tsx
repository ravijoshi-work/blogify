import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "./AuthProvider";
import { ModalProvider } from "@/context/modal.context";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogify.io",
  description: "NextJs blog website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ModalProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
