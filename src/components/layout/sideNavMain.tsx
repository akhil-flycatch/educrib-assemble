"use client";
import { SIDENAV_ITEMS, SIDENAV_SETTINGS_ITEMS } from "@/constants/nav/sideNav";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


const SideNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <><div className="w-[264px] bg-white h-screen shadow-[1px_0px_0px_0px_#12203B17] flex flex-col gap-6 items-center p-6">
      <Image
        src="/images/assemble-vertical.svg"
        alt="assemble"
        width={100}
        height={76} />
      <div className="flex flex-col gap-1 w-full">
        {SIDENAV_ITEMS.map((sideNavItem) => {
          const isActive = pathname.split("/")[1] === sideNavItem.url.slice(1);
          return (
            <div
              key={sideNavItem.url}
              onClick={() => {
                if (!isActive) router.push(sideNavItem.url);
              } }
              className={`w-full py-3 px-3.5 flex items-center gap-3 rounded-[10px] text-primary text-base ${isActive
                  ? "bg-light-100 border border-accent text-active font-medium"
                  : "hover:bg-light cursor-pointer transition-colors duration-300 ease-out"}`}
            >
              <Image
                src={isActive ? sideNavItem.activeIcon : sideNavItem.icon}
                alt={sideNavItem.name}
                width={20}
                height={20} />
              <span>{sideNavItem.name}</span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-5 justify-between items-center  w-full p-2">
        <div className="w-full flex flex-col just-between gap-5">
          {/* <div className="flex gap-2 w-[216px] h-[48px] text-[16px] font-[500] text-[#542C12] items-center justify-center rounded-[8px] border border-t border-l border-r border-b-3 border-solid border-transparent bg-gradient-to-b from-white to-[#EBE1FF]">
            hai


          </div> */}
          <button className="bg-gradient-to-l from-[#FAD961] to-[#F76B1C] w-[216px] h-[48px] text-[16px] font-[500] text-[#542C12] flex gap-[10px] items-center justify-center rounded-[8px] border border-t border-l border-r border-b-3 border-solid border-transparent border-image-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(0,0,0,0.15))]"><img src="/premium.svg" />  Go Premium</button>
        </div>
      </div>
      {SIDENAV_SETTINGS_ITEMS.map((sideNavItem) => {
          const isActive = pathname.split("/")[1] === sideNavItem.url.slice(1);
          return (
            <div
              key={sideNavItem.url}
              onClick={() => {
                if (!isActive) router.push(sideNavItem.url);
              } }
              className={`w-full py-3 px-3.5 flex items-center gap-3 rounded-[10px] text-primary text-base ${isActive
                  ? "bg-light-100 border border-accent text-active font-medium"
                  : "hover:bg-light cursor-pointer transition-colors duration-300 ease-out"}`}
            >
              <Image
                src={isActive ? sideNavItem.activeIcon : sideNavItem.icon}
                alt={sideNavItem.name}
                width={20}
                height={20} />
              <span>{sideNavItem.name}</span>
            </div>
          );
        })}
    </div>
  
      
      </>
  );
};

export default SideNav;
