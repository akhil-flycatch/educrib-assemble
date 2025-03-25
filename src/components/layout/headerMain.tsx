"use client";

import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { LogOut } from "lucide-react";

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

const Header: React.FC = () => (
  <div className="flex items-center justify-end w-full px-6 h-14 bg-white border-l border-[#12203B17]">
    <div className="flex items-center cursor-pointer rounded-full">
      <Popover>
        <PopoverTrigger>
          <Image
            src="/images/mocks/avatar.png"
            alt="avatar"
            width={36}
            height={36}
          />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col justify-center items-center gap-2 p-4 w-[336px] bg-white shadow-[0px_4px_12px_0px_#0000001A] rounded-[10px]">
          <Avatar className="w-[60px] h-[60px]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-[#15294B] text-[16px] font-[500] leading-[18px]">John Doe</span>
          <span className="text-secondary text-[12px] font-[400] leading-[18px]">
            jhondoe@gmail.com
          </span>
          <div className="w-full border-t-[1px] border-solid border-[#DFE2E6]">
            <div onClick={logOut} className="flex gap-[10px] items-center w-full mt-5 hover:bg-[#E9755D26] p-[12px] rounded-[8px] cursor-pointer">
              <LogOut className="text-[#E9755D] text-[16px]" />
              <span className="text-[#E9755D] text-[16px] font-[500] leading-[18px]">Logout</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </div>
);

export default Header;
