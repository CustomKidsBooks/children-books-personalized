import Footer from "@components/Footer";
import Nav from "@components/Nav";
import "@styles/globals.css";
import React from "react";
import { ModalProvider } from "../components/ModalProvider";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata = {
  title: "Children's Book",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ModalProvider>
    <html lang="en">
      <UserProvider>
        <body>
          <div className="flex flex-col min-h-screen h-auto">
            <main className="">
              <Nav />
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </UserProvider>
    </html>
    // </ModalProvider>
  );
}
