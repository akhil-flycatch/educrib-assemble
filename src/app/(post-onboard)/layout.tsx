"use client";

import "@/styles/globals.css";
import React from "react";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export const dynamic = "force-dynamic";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const cookieStore = cookies();
  //   const supabase = createServerComponentClient({ cookies: () => cookieStore });
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   // if user is not logged in, redirect to login
  //   if (!user) redirect("/login");
  //   // if institution is already selected, redirect to home
  //   if (user?.user_metadata.profileId) redirect("/");
  const logOut = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      window.location.href = "/login";
    } else {
      console.error("Failed to log out");
    }
  };
  return (
    <React.Fragment>
      <main className={`w-full h-screen flex flex-col`}>
        <header>
          <div className="flex items-center justify-between w-full px-6 h-14 bg-white">
            <Image
              src="/images/assemble-logo.svg"
              alt="logo"
              width={123.53}
              height={28}
            />
            <div
              className="flex items-center gap-2 text-[#2D344F] font-medium cursor-pointer"
              onClick={logOut}
            >
              <Image
                src="/images/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              Logout
            </div>
          </div>
        </header>
        <section className="flex-1 w-full">{children}</section>
      </main>
      <Toaster />
    </React.Fragment>
  );
}
