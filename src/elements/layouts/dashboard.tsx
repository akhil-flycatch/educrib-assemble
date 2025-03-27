import { FC } from "react";

import MENU_ITEMS from "@/config/menu";
import { LayoutProps } from "@/types/layout";
import Header from "../header";
import Menu from "../menu";
import Meta from "../meta";

const DashboardLayout: FC<LayoutProps> = ({ title, children }) => {
  return (
    <div className="flex">
      <Meta title={title} />
      <Menu items={MENU_ITEMS} collapsed={false} />
      <div
        className="flex-1 h-screen overflow-y-scroll"
        style={{ background: "#E9F3FA" }}
      >
        <Header />
        <div className="flex flex-col px-32 py-6 space-y-6">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;

