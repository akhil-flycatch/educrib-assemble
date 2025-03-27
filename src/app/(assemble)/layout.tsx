import React from "react";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import SideNav from "@/components/layout/sideNavMain";
import Header from "@/components/layout/headerMain";
export default function AssembleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <main className={`w-full h-screen flex`}>
        <aside>
          <SideNav />
        </aside>
        <div className="flex-1 flex flex-col">
          <header>
            <Header />
          </header>
          <section className="flex-1 w-full bg-main">{children}</section>
        </div>
      </main>
      <Toaster />
    </React.Fragment>
  );
}
