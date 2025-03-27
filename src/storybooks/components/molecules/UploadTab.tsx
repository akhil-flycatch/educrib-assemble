import { Input } from "../atoms";
import FileList from "./FileList";
import FilePicker from "./FilePicker";
import FileUploadCard from "./FileUploadCard";

type UploadTabProps = {
  handleFileChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  files: File[];
  name: string;
  isLoading: boolean;
  acceptMultiple: boolean;
  acceptedFileTypes: string[];
  handleDeleteAll: () => void;
  data: Array<{
    file: File;
    isLoading: boolean;
    error: any;
    publicUrl: string | null;
  }>;
  removeFile: (_: string) => void;
  defaultFiles: string[];
  setDefaultFiles: (_: string[]) => void;
  url: string;
};

const getFileTypeFromUrl = (url: string) => {
  const extension = url.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
      return "image/jpeg";
    case "pdf":
      return "application/pdf";
    case "doc":
    case "docx":
      return "application/msword";
    case "xls":
    case "xlsx":
      return "application/vnd.ms-excel";
    default:
      return "";
  }
};

const createFileFromUrl = (url: string) => {
  const fileType = getFileTypeFromUrl(url);
  // const fileName = url.split("/").pop() || "";
  return new File([], url, { type: fileType });
};

const UploadTab: React.FC<UploadTabProps> = ({
  handleFileChange,
  handleUpload,
  files,
  name,
  isLoading,
  data,
  acceptedFileTypes,
  acceptMultiple,
  removeFile,
  handleDeleteAll,
  defaultFiles,
  setDefaultFiles,
  url,
}) => {
  console.log("the data", data);
  return (
    <>
      <FilePicker
        acceptMultiple={acceptMultiple}
        acceptedFileTypes={acceptedFileTypes}
        handleFileChange={handleFileChange}
        name={name}
        disabled={
          (defaultFiles.length > 0 && !acceptMultiple) ||
          url !== "" ||
          isLoading
        }
      />

      <Input
        name={name}
        value={[...defaultFiles, ...data.map((file) => file.publicUrl)].join(
          ","
        )}
        onChange={() => {}}
        hidden
      />

      {files?.length > 0 && (
        <FileList
          files={files}
          handleUpload={handleUpload}
          handleDeleteAll={handleDeleteAll}
        />
      )}

      {data && (
        <div className="flex gap-4 mt-4">
          {data.map((file, index) => {
            return (
              <FileUploadCard
                key={index}
                file={file.file}
                isLoading={file.isLoading}
                publicUrl={file.publicUrl}
                error={file.error}
                removeFile={() => removeFile(file.publicUrl!)}
              />
            );
          })}
        </div>
      )}

      {defaultFiles.length > 0 && (
        <div className="flex gap-4 mt-4">
          {defaultFiles.map((file, index) => {
            const fileObject = createFileFromUrl(file);
            return (
              <FileUploadCard
                key={index}
                file={fileObject}
                isLoading={false}
                publicUrl={file}
                error={null}
                removeFile={() => {
                  setDefaultFiles(defaultFiles.filter((f) => f !== file));
                }}
              />
            );
          })}
        </div>
      )}

      {isLoading && <div>Loading...</div>}
    </>
  );
};

export default UploadTab;
