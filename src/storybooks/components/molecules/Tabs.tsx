"use client";

import * as RadixTabs from "@radix-ui/react-tabs";
import { ReactNode, useState } from "react";

type TabProps = {
  tabList: {
    name: string;
    content: ReactNode;
  }[];
  defaultTab: string;
 
};

export default function Tabs({ tabList, defaultTab }: TabProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabList[0]?.name || "");

 
  return (
    // <RadixTabs.Root defaultValue={defaultTab}>
    //   <RadixTabs.List>
    //     <div>
    //       {tabList.map((item) => (
    //         <RadixTabs.Trigger
    //           key={item.name}
    //           value={item.name}
    //           className="px-4 py-2 my-1 bg-light data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-dark hover:text-white data-[state=active]:hover:bg-dark first:rounded-l-md last:rounded-r-md"
    //         >
    //           {item.name}
    //         </RadixTabs.Trigger>
    //       ))}
    //     </div>
    //     {tabList.map((item) => (
    //       <RadixTabs.Content
    //         key={item.name}
    //         value={item.name}
    //         className="bg-white rounded-md p-5 my-1 space-x-5"
    //       >
    //         {item.content}
    //       </RadixTabs.Content>
    //     ))}
    //   </RadixTabs.List>
    // </RadixTabs.Root>

    <RadixTabs.Root
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      {/* Styled Tab Navigation Bar */}
      <RadixTabs.List
        className="border-t mt-6 border-accent-2 w-full pt-6 flex px-12 gap-4"
      >
        {tabList.map((item) => (
          <RadixTabs.Trigger
            key={item.name}
            value={item.name}
            className={`font-medium h-11 capitalize px-4 py-2 my-1 ${
              activeTab === item.name
                ? "text-asm-purple border-b-[3px] border-asm-purple"
                : "cursor-pointer text-label"
            }`}
          >
            {item.name}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>

      {/* Tab Content */}
      {tabList.map((item) => (
        <RadixTabs.Content key={item.name} value={item.name}>
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}
