import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import { Poppins } from "next/font/google";
import {Navbar} from "../components/navbar/navbar";
import { GettingStarted } from "../components/ui/getting-started";
import { Header } from "../components/header";
import Transition from "../components/ui/transition";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gonka AI",
  description: "Gonka AI",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${poppins.className} antialiased`}>
      <Providers>
        <Transition>
          <div className="flex relative w-full h-screen">
            <Navbar/>
            <div className="flex flex-col w-full">
              <Header/>
              {children}
            </div>
          </div>
        </Transition>
      </Providers>
      </body>
      </html>
  );
}
