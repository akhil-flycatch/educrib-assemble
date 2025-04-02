import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type FileData = {
  file: File;
  isLoading: boolean;
  error: any;
  publicUrl: string | null;
};

const useFileUpload = () => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [filesData, setFilesData] = useState<FileData[]>([]);

  const uploadFilesToStorage = useCallback(
    async (
      files: FileList | File[] | any,
      bucket: string,
      supabase: any,
      onError?: (_: Record<number, string>) => void,
      onSuccess?: (_: FileData[]) => void
    ) => {
      setGlobalLoading(true);

      const newFilesData = Array.from(files).map((file, _) => ({
        file,
        isLoading: true,
        error: null,
        publicUrl: null,
      }));

      setFilesData(newFilesData);

      const uploadPromises = newFilesData.map(async (fileData, index) => {
        const { file } = fileData;
        const uuid = uuidv4().replace(/-/g, "");
        const fileName = `${uuid}_${file.name}`;

        try {
          const { data, error } = await supabase.storage
            .from(bucket)
            .upload(fileName, file);
          console.log("the er", error);

          if (error) {
            setFilesData((prevFilesData) => {
              const updatedFilesData = [...prevFilesData];
              updatedFilesData[index] = {
                ...updatedFilesData[index],
                isLoading: false,
                error: error.message,
              };
              return updatedFilesData;
            });
          } else {
            const resUrlData = await supabase.storage
              .from(bucket)
              .getPublicUrl(data.path);
            console.log("the value in url", resUrlData);
            const publicUrl = resUrlData.data.publicUrl;

            setFilesData((prevFilesData) => {
              const updatedFilesData = [...prevFilesData];
              const lastPart = publicUrl
              // const lastPart = publicUrl.split("/").pop();
              updatedFilesData[index] = {
                ...updatedFilesData[index],
                isLoading: false,
                publicUrl: lastPart,
              };
              return updatedFilesData;
            });
          }
        } catch (error) {
          setFilesData((prevFilesData) => {
            const updatedFilesData = [...prevFilesData];
            updatedFilesData[index] = {
              ...updatedFilesData[index],
              isLoading: false,
              error: error,
            };
            return updatedFilesData;
          });
        }
      });

      Promise.all(uploadPromises).then(() => {
        setGlobalLoading(false);
        if (onSuccess) {
          onSuccess(filesData);
        }
      });
    },
    [filesData]
  );

  const removeFile = useCallback(
    (url: string) => {
      setFilesData((prevFilesData) =>
        prevFilesData.filter((fileData) => fileData.publicUrl !== url)
      );
    },
    [setFilesData]
  );

  return { globalLoading, filesData, uploadFilesToStorage, removeFile };
};

export default useFileUpload;
