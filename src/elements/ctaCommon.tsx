import { FC, ReactNode } from "react";
import { Icon } from "react-feather";

interface CtaProps {
  text: ReactNode;
  action: ReactNode;
  icon?: Icon;
}

const CtaCommon: FC<CtaProps> = ({ text, action, icon }) => {
  return (
    <div className="flex items-center justify-between px-8 py-4 rounded-md ">
      <div className="flex items-center space-x-4 ">
        {/* {icon && createElement(icon)} */}
        <span className="text-xl flex">{text}</span>
      </div>
      {action}
    </div>
  );
};

export default CtaCommon;
