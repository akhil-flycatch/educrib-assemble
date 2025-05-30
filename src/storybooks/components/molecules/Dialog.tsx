"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cloneElement, ReactNode, useState } from "react";

const DialogForm = ({
  trigger,
  form,
  title
}: {
  trigger: ReactNode;
  form: JSX.Element;
  title: string;
}) => {
  const [open, setOpen] = useState(false);
  const FormWithState = () => {
    return cloneElement(form, { setOpen });
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/20 data-[state=open]:animate-overlayShow fixed inset-0" />

        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[960px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-black m-0 text-[17px] font-medium">{title}</Dialog.Title>

          <div className="max-h-[70vh] overflow-y-auto">
            <FormWithState />
          </div>

          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default DialogForm;
