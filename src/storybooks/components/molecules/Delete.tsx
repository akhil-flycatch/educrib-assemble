"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import Id from "@/storybooks/forms/fields/Id";
// import { DeleteProps } from "@/types";

import { Button, Form } from "../atoms";

const Delete = ({ id, action }: any) => {
  const [open, setOpen] = useState(false);
  const deleteAction = async (formData: FormData) => {
    const data = await action(formData);
    setOpen(false);
    if (data?.message) toast.error(data.message);
    else toast.success("Item deleted successfully");
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <Trash className="cursor-pointer hover:text-danger" />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-xl font-bold">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-black/75 py-4">
            This action cannot be undone. This will permanently remove your
            data.
          </AlertDialog.Description>
          <Form action={deleteAction} className="space-y-0">
            <Id defaultValue={id} />
            <div className="flex items-center space-x-1">
              <Button intent="danger">Delete</Button>
              <Button intent="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </Form>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default Delete;
