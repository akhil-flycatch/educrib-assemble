import { CircleDashed, FileCheck, X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/storybooks/components/atoms";
import { Error } from "@/storybooks/forms/fields";

type FileUploadCardProps = {
  file: File;
  isLoading: boolean;
  publicUrl: string | null;
  error: any;
  removeFile: () => void;
};

const FileUploadCard: React.FC<FileUploadCardProps> = ({
  file,
  isLoading,
  publicUrl,
  error,
  removeFile,
}) => {
  return (
    <div className="bg-primary/25 relative h-28 w-20 rounded-md p-1 flex flex-col">
      {isLoading ? (
        <CircleDashed className="animate-spin m-auto" />
      ) : publicUrl ? (
        <>
          <Button
            className="absolute -top-2 -right-2 z-10 bg-danger/80 rounded-full p-[2px]"
            onClick={(e) => {
              e.preventDefault();
              removeFile();
            }}
          >
            <X size={16} className="text-white" />
          </Button>
          <div className="relative h-20 w-full">
            {file.type.startsWith("image/") ? (
              <Image
                fill
                // src={process.env.NEXT_PUBLIC_SUPABASE_BUCKET_ROOT + publicUrl}
                src={publicUrl}
                // src={"https://vrhpopcshfgabaunvpht.supabase.co/storage/v1/s3/" + publicUrl}
                className="object-cover"
                alt={file.name}
              />
            ) : (
              <FileCheck color="#4cc84e" size={40} className="m-auto h-full" />
            )}
          </div>
        </>
      ) : (
        <>{error && <Error>{error}</Error>}</>
      )}
      <p className="text-xs overflow-hidden pt-2 whitespace-nowrap overflow-ellipsis">
        {file.name}
      </p>
    </div>
  );
};

export default FileUploadCard;
