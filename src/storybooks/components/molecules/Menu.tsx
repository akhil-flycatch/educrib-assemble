"use client";

// import SignOut from "@/app/(assemble)/SignOut";
// import { BRAND_NAME } from "@/config/brand";
// import { masterMenu } from "@/config/menu";

export default function Menu({ email }: { email: string }) {
  return (
    <nav className="shrink-0 h-screen overflow-y-scroll bg-gradient-to-b from-primary to-secondary px-8 text-white py-6">
      {/* <Logo theme="light" intent="title" brand={BRAND_NAME} className="py-2" />
      <div className="flex items-center justify-between py-6">
        <Avatar text={email?.slice(0, 2)} />
        <SignOut />
      </div>
      <ul className="flex flex-col space-y-4">
        {masterMenu.map((item) => (
          <MenuItem
            key={item.name}
            name={item.name}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </ul> */}
    </nav>
  );
}
