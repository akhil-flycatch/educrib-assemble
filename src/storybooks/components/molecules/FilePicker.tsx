import { FolderClosedIcon } from "lucide-react";
import React from "react";

import { Button, Input } from "@/storybooks/components/atoms";

interface FilePickerProps {
  acceptMultiple: boolean;
  acceptedFileTypes: string[];
  handleFileChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  disabled?: boolean;
}

const FilePicker: React.FC<FilePickerProps> = ({
  acceptMultiple,
  acceptedFileTypes,
  handleFileChange,
  name,
  disabled = false,
}) => {
  return (
    <>
      <Input
        type="file"
        onChange={handleFileChange}
        multiple={acceptMultiple}
        accept={acceptedFileTypes.join(",")}
        id={name + "filepicker"}
        style={{ display: "none" }}
      />
      <Button
        onClick={(event) => {
          event.preventDefault();
          document.getElementById(name + "filepicker")?.click();
        }}
        className="flex items-center gap-2"
        disabled={disabled}
      >
        <FolderClosedIcon size={20} />
        <span>Choose File(s)</span>
      </Button>
    </>
  );
};

export default FilePicker;
