import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { FC, ReactNode } from "react";

import Image from "next/image";
import Button from "./button";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  footerVisible?: boolean;
  onSave?: any;
}

const Modal: FC<ModalProps> = ({
  visible = false,
  onClose,
  children,
  title,
  footerVisible = true,
  onSave,
}) => {
  return (
    <Dialog open={visible} onClose={onClose} className="relative z-50" style={{overflow:"scroll"}}>
      <div className="fixed inset-0 bg-dark/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-md">
          <DialogTitle
            className="p-4 bg-white rounded-t-md "
            style={{ borderBottom: "1px solid #C2C7D0", background: "#FAFBFB" }}
          >
            <div className="flex justify-between">
              <div
                style={{
                  color: "#15294B",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                {title}
              </div>
              <div onClick={onClose} className="cursor-pointer">
                <Image
                  src="/close.svg"
                  alt={"close"}
                  height={36}
                  width={36}
                  priority
                />
              </div>
            </div>
          </DialogTitle>
          <Description
            className="min-w-[40vw] p-12 max-h-[70vh] overflow-y-scroll"
            as="div"
          >
            {children}
          </Description>
          {footerVisible && (
            <div
              className="flex items-center justify-end p-2 space-x-2 bg-light rounded-b-md"
              style={{ borderTop: "1px solid #C2C7D0" }}
            >
              <Button onClick={onClose} theme="secondary">
                Cancel
              </Button>
              <Button onClick={onSave}>Save</Button>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
