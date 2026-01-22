import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import dynamic from "next/dynamic";
import { Navbar } from "../components/navbar/navbar";
import { Header } from "../components/header";
import Transition from "../components/ui/transition";

const Providers = dynamic(
  () => import("./providers").then((m) => m.Providers),
  { ssr: false }
);

const Toaster = dynamic(
  () => import("sonner").then((m) => m.Toaster),
  { ssr: false }
);

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          <div className="flex relative w-full h-screen overflow-hidden">
            <Navbar />
            <div className="flex flex-col w-full h-screen overflow-hidden">
              <Header />
              <Transition>{children}</Transition>
            </div>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
