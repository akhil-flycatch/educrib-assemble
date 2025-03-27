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
  message: string;
  title: string;
  onConfirm: () => void;
  type?: "Confirm" | "Delete";
}

const ConfirmationModal: FC<ModalProps> = ({
  visible = false,
  onClose,
  title,
  message,
  onConfirm,
  type = "Confirm",
}) => {
  return (
    <Dialog open={visible} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-dark/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-md w-[400px]">
          <DialogTitle className="p-4 bg-white rounded-t-xl flex flex-col gap-5">
            {type === "Confirm" ? (
              <Image
                src="/images/confirm.svg"
                alt="confirm"
                width={48}
                height={48}
              />
            ) : (
              <Image
                src="/images/deleteConfirm.svg"
                alt="delete"
                width={48}
                height={48}
              />
            )}
            <div className="text-lg font-medium text-heading capitalize text-wrap">
              {title}
            </div>
          </DialogTitle>
          <Description
            className="overflow-y-auto px-4 py-2 text-sm text-label"
            as="div"
          >
            {message}
          </Description>
          <div className="flex items-center justify-end p-4 bg-white rounded-b-xl mt-4">
            <Button onClick={onClose} theme="secondary">
              Cancel
            </Button>
            <Button onClick={onConfirm}>{type}</Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ConfirmationModal;
