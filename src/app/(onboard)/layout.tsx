import React from "react";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Typography from "@/storybooks/components/atoms/Typography";
import Banner from "../(auth)/Banner";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In | Educrib Assemble",
  description: "Data management application of Educrib Ecosystem",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // if user is not logged in, redirect to login
  if (!user) redirect("/login");
  // if institution is already selected, redirect to home
  // if (user?.user_metadata.profileId) redirect("/");
  return (
    <React.Fragment>
      <main
        className={`w-screen h-screen flex items-center justify-between bg-white overflow-hidden`}
      >
        <section className="flex-1 h-screen w-[70%]  md:w-[400px] mx-auto flex justify-center items-center p-16">
          <div className="flex flex-col space-y-[22px] rounded-md p-12 w-full max-w-xl justify-center items-center">
            <img
              src="https://assemble.educrib.com/assemble-logo.svg"
              alt="logo"
              width={194}
              height={44}
            />
            <div className="flex-1 overflow-auto">

            {children}
            </div>
            <div className="w-full text-center gap-[12px] h-auto">
              <div className="flex  justify-center items-center p-5 gap-[10px]">
                <p className="text-[#656A7E] text-[14px] leading-[14px] font-normal">
                  Privacy Policy
                </p>
                <div className="w-1 h-1 rounded-full bg-[#656A7E]"></div>
                <p className="text-[#656A7E] text-[14px] leading-[14px] font-normal">
                  Terms & Conditions
                </p>
              </div>
              <p className="text-[#5D6B82] text-[14px] leading-[14px] font-normal">
                © educrib 2025 all rights reserved
              </p>
            </div>
          </div>
        </section>
        <Banner />
      </main>
      <Toaster />
    </React.Fragment>
  );
}
