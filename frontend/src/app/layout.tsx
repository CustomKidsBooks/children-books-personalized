"use client";
import { Auth0Provider } from "@auth0/auth0-react";
import Footer from "@components/Footer";
import Nav from "@components/Nav";
import "@styles/globals.css";
import React from "react";
import { EditedBookProvider } from "../components/context/EditedBookContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_DOMAIN_AUTH!}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
        authorizationParams={{
          redirect_uri: process.env.NEXT_PUBLIC_AUTH0_BASE_URL,
          audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
          scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
        }}
      >
        <EditedBookProvider>
          <body>
            <div className="flex flex-col min-h-screen h-auto">
              <main className="">
                <Nav />
                {children}
              </main>
              <Footer />
            </div>
          </body>
        </EditedBookProvider>
      </Auth0Provider>
    </html>
  );
}
