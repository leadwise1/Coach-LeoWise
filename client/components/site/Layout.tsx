import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1" role="main" aria-label="Page content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
