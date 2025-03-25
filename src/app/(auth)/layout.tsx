import React from "react";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Typography from "@/storybooks/components/atoms/Typography";
import Banner from "./Banner";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <main
        className={`w-screen h-screen flex items-center justify-between bg-white   `}
      >
        <section className="flex-1 h-screen w-[70%]  md:w-[400px] mx-auto flex justify-center items-center p-16">
          <div className="flex flex-col space-y-[22px] rounded-md p-12 w-full max-w-xl justify-center items-center">
            <img
              src="https://assemble.educrib.com/assemble-logo.svg"
              alt="logo"
              width={194}
              height={44}
            />
            {/* <p className=" font-semibold text-[36px] leading-[57.6px] tracking-[0.01em] text-center text-[#354764]">Let’s get started</p>
            <p className=" font-normal text-[20px] leading-[32px] tracking-[0.01em] text-center text-[#505F79]">
Enter your email ID to receive 6 digit OTP</p> */}
            {children}
          </div>
          <div className="absolute bottom-0 w-full text-center p-4  gap-[12px] h-auto">
            <div className="flex  justify-center items-center p-5 gap-[10px]">
              <p className="text-[#656A7E] text-[14px] leading-[14px] font-normal">Privacy Policy</p>
              <div className="w-1 h-1 rounded-full bg-[#656A7E]"></div> 
              <p className="text-[#656A7E] text-[14px] leading-[14px] font-normal">Terms & Conditions</p>
            </div>
            <p className="text-[#5D6B82] text-[14px] leading-[14px] font-normal">
            © educrib 2025 all rights reserved
            </p>
          </div>
        </section>
        <Banner  />

      </main>
      <Toaster />
    </React.Fragment>
  );
}
