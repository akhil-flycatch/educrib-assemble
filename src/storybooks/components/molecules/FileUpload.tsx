import React, { useEffect, useState } from "react";

import { MAX_FILE_SIZE } from "@/constants/file";
import { Tabs } from "@/storybooks/components/molecules";
import { Error } from "@/storybooks/forms/fields";
import fileSelect from "@/utils/fileSelect";
import useFileUpload from "@/utils/hooks/useFileUpload";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import UploadTab from "./UploadTab";
import UrlTab from "./UrlTab";

interface FileUploadProps {
  name: string;
  acceptMultiple?: boolean;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  defaultValue?: string;
  validationError?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  acceptMultiple = false,
  acceptedFileTypes = [],
  maxFileSize = MAX_FILE_SIZE,
  defaultValue,
  validationError,
}) => {
  const supabase = createClientComponentClient();
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [defaultTab, setDefaultTab] = useState<"Upload" | "URL">("Upload");
  const [defaultFiles, setDefaultFiles] = useState<string[]>([]);
  const { globalLoading, filesData, uploadFilesToStorage, removeFile } =
    useFileUpload();
  console.log("the vale", filesData);
  useEffect(() => {
    if (defaultValue) {
      if (defaultValue.startsWith("http")) {
        setUrl(defaultValue);
        setDefaultTab("URL");
      } else
        setDefaultFiles(defaultValue.split(",").filter((file) => file !== ""));
    }
  }, [defaultValue]);

  useEffect(() => {
    if (validationError) setError(validationError);
  }, [validationError]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files, error } = fileSelect(event.target.files, maxFileSize);
    setFiles(files);
    setError(error);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleUpload = async () => {
    if (files.length > 0)
      await uploadFilesToStorage(files, "educrib-test", supabase);
    setFiles([]);
  };

  const tabs = [
    {
      name: "Upload",
      content: (
        <UploadTab
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          files={files}
          name={name}
          isLoading={globalLoading}
          data={filesData}
          acceptMultiple={acceptMultiple}
          acceptedFileTypes={acceptedFileTypes}
          removeFile={removeFile}
          url={url}
          handleDeleteAll={() => setFiles([])}
          defaultFiles={defaultFiles}
          setDefaultFiles={setDefaultFiles}
        />
      ),
    },
    {
      name: "URL",
      content: (
        <UrlTab
          handleUrlChange={handleUrlChange}
          files={files}
          urls={[
            ...(filesData?.map((file) => file.publicUrl!) || []),
            ...defaultFiles,
          ]}
          url={url}
          name={name}
          acceptMultiple={acceptMultiple}
        />
      ),
    },
  ];

  return (
    <>
      <Tabs tabList={tabs} defaultTab={defaultTab} key={defaultTab} />
      {error && <Error>{error}</Error>}
    </>
  );
};

export default FileUpload;
