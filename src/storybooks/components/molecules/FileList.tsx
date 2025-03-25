import { Trash2Icon, UploadIcon } from "lucide-react";
import React from "react";

import { Button } from "../atoms";

interface FileListProps {
  files: File[];
  handleUpload: () => void;
  handleDeleteAll: () => void;
}

const FileList: React.FC<FileListProps> = ({ files, handleUpload, handleDeleteAll }) => {
  return (
    <div>
      {files.slice(0, 2).map((file, index) => (
        <div key={index}>
          <span className="text-xs">{file.name}</span>
        </div>
      ))}
      {files.length > 2 && (
        <div>
          <span className="text-xs">+{files.length - 2} more</span>
        </div>
      )}
      <div className="flex gap-2">
        <Button className="text-danger flex gap-2 items-center" onClick={handleDeleteAll}>
          <span className="text-xs">Delete All</span>
          <Trash2Icon size={20} />
        </Button>
        <Button className="text-white flex gap-2 items-center" onClick={handleUpload}>
          <span className="text-xs">Upload</span>
          <UploadIcon size={20} />
        </Button>
      </div>
    </div>
  );
};

export default FileList;
