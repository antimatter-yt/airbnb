import type { Metadata } from "next";
import "./globals.css";
import {Nunito} from "next/font/google"
import { Navbar } from "@/components/Navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import { Toaster } from "@/components/ui/toaster"
import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "@/actions/getCurrentUser";

const font = Nunito({
  subsets:["latin"]
})
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className} >
        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser={currentUser} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
