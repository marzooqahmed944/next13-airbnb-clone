import { Nunito } from "next/font/google";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/Modal/RegisterModal";
import Navbar from "./components/Navbar";
import ToasterProvider from "./providers/ToasterProvider";

import "./globals.css";

export const metadata = {
  title: "AirBnB",
  description: "AirBnB clone built with React, TypeScript, and MongoDB.",
};

const font = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
