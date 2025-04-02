"use client";
import React from "react";
import Button from "@elements/button";
import Cta from "@elements/cta";
import Image from "next/image";
import { useState, useRef } from "react";
import Modal from "@elements/modal";
import { Plus } from "lucide-react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useFileUpload from "@/utils/hooks/useFileUpload";
import DashboardIntroSectionWrapper from "@/components/dashboard/Introduction/sectionWrapper";
import { deleteCourse } from "@/api";
import course from "@/elements/entry/forms/course";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { v4 as uuidv4 } from "uuid";

const supabase = createClientComponentClient();

interface ImageFile {
  url: string;
  name: string;
  size: string;
  status: any;
  progress: number;
  uploadedSize?:any;
  error?:any
  publicUrl?:any;
  file?:any
}

const ImageTabsOne = ({ setShowAll, imageLinks, isAlbumEmpty }: any) => {
  const { globalLoading, filesData, uploadFilesToStorage, removeFile } =
    useFileUpload();

  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [albumName, setAlbumName] = useState<any>("")
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAlbumModalClose = () => setIsAlbumModalOpen(false);

  const handleAlbumCreate = () => {
    console.log("Album Created", selectedImages,albumName);
    // Close modal after creation
    setIsAlbumModalOpen(false);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      
      const filesArray = Array.from(event.target.files).map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        status: "uploading",
        progress: 0,
        file: file, // Store the actual file for Supabase upload
      }));

      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      console.log("the array",event.target.files)
      // Simulating upload progress
      filesArray.forEach((fileData, index) => {
        let progress = 0;
        const totalSize = fileData.file.size;
        const interval = setInterval(async () => {
          progress += 10;
          const uploadedSize = (totalSize * progress) / 100; // Calculate uploaded size in bytes
        const uploadedSizeKB = (uploadedSize / 1024).toFixed(2); // Convert uploaded size to KB

        setSelectedImages((prevImages) =>
          prevImages.map((img) =>
            img.url === fileData.url
              ? { ...img, progress, uploadedSize: uploadedSizeKB }
              : img
          )
        )

        let publicUrl:any;
        const uuid = uuidv4().replace(/-/g, "");
        const fileName = `${uuid}_${fileData.file.name}`;
        try {
          const { data, error } = await supabase.storage
            .from('educrib-test')
            .upload(fileName, fileData.file);
          console.log("the er", error);

          if (error) {
            setSelectedImages((prevFilesData) => {
              const updatedFilesData = [...prevFilesData];
              updatedFilesData[index] = {
                ...updatedFilesData[index],
                status: "Failed",
                error: error.message,
              };
              return updatedFilesData;
            });
          } else {
            const resUrlData = await supabase.storage
              .from('educrib-test')
              .getPublicUrl(data.path);
            console.log("the value in url", resUrlData);
            publicUrl = resUrlData.data.publicUrl;
            // const lastPart = publicUrl
            setSelectedImages((prevImages) =>
              prevImages.map((img) =>
                img.url === fileData.url
                  ? { ...img, status: 'success',
                    publicUrl: publicUrl}
                  : img
              )
            );

            // setSelectedImages((prevFilesData) => {
            //   const updatedFilesData = [...prevFilesData];
            //   const lastPart = publicUrl
            //   // const lastPart = publicUrl.split("/").pop();
            //   updatedFilesData[index] = {
            //     ...updatedFilesData[index],
            //     status: 'success',
            //     publicUrl: lastPart,
            //   };
            //   return updatedFilesData;
            // });
            
          }
        } catch (error:any) {
          setSelectedImages((prevImages) =>
                  prevImages.map((img) =>
                    img.url === fileData.url
                      ? { ...img, status: "Failed",
                        error: error.message}
                      : img
                  )
                );
          // setSelectedImages((prevFilesData) => {
          //   const updatedFilesData = [...prevFilesData];
          //   updatedFilesData[index] = {
          //     ...updatedFilesData[index],
          //     status: "Failed",
          //     error: error.message,
          //   };
          //   return updatedFilesData;
          // });
        }
        // clearInterval(interval);
          if (progress >= 100 && publicUrl) {
            clearInterval(interval);

            // // Upload file to Supabase Storage
            // uploadFilesToStorage([fileData.file], "educrib-test", supabase)
            //   .then(() => {
            //     setSelectedImages((prevImages) =>
            //       prevImages.map((img) =>
            //         img.url === fileData.url
            //           ? { ...img, status: "success" }
            //           : img
            //       )
            //     );
            //   })
            //   .catch((error) => {
            //     console.error("Upload error:", error);
            //   });
          }
        }, 200);
      });
    }
  };

  // const removeImage = (url: string) => {
  // 	setSelectedImages((prevImages) => prevImages.filter((img) => img.url !== url));
  // };

  const removeImage = async (url: string, fileName: string) => {
    try {
      await removeFile("educrib-test", fileName, supabase);
      setSelectedImages((prevImages) =>
        prevImages.filter((img) => img.url !== url)
      );
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  return (
    <div>
      <DashboardIntroSectionWrapper
        wrapperClass="w-full"
        primaryButton={{
          type: "Add",
          onClick: () => {
            setIsAlbumModalOpen(true);
          },
          text: "Create Album",
        }}
        title="Images"
      >
        {isAlbumEmpty ? (
          <>
            <div className="h-[260px] flex justify-between">
              <div className="flex flex-col items-center justify-center flex-1">
                <Image
                  src="/images/gallery-import.png"
                  alt="images"
                  width={44}
                  height={44}
                />
                <span className="text-[15px] leading-6 text-center text-label mt-4">
                  This gallery is empty.
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex pt-[16px] pr-[24px] pb-[16px] pl-[24px] gap-5">
              <div >
                <div className="flex flex-wrap w-[192px] gap-2 border rounded-[8px] pt-[28px] pb-[14px] pl-[14px] cursor-pointer" onClick={() => setShowAll(true)}>
                  {imageLinks.slice(0, 3).map((img, index) => (
                    <div key={index} className="w-[80px] h-[80px]">
                      <Image
                        src={img}
                        alt={`Image ${index + 1}`}
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                    </div>
                  ))}
                  <div className="w-[80px] h-[80px] flex items-center justify-center rounded-md">
                    <span className="text-[#6129FE] bg-[#EFEAFF] text-[20px] font-medium pl-[11px] pr-[11px] pt-[3px] pb-[3px] rounded-[45px]">
                      +{imageLinks.length - 3}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mt-3">
                  <div>
                    <p className="font-medium text-[#15294B]">Album Name</p>
                    <p className="text-[14px] text-[#5D6B82]">
                      {imageLinks.length} images
                    </p>
                  </div>
                  <div className="cursor-pointer">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Image
                          src="/images/more.png"
                          alt="images"
                          width={33}
                          height={33}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="w-[160px] p-0" align="end">
                        <div className="px-4 py-3">
                          <div className="w-full rounded-lg flex items-center h-9 gap-3 text-[#354764] p-3 cursor-pointer hover:bg-light"
                          
                          onClick={() => setIsAlbumModalOpen(true)}>
                            <Image
                              src="/images/edit-gray.svg"
                              alt="edit"
                              width={20}
                              height={20}
                            />
                            <span>Edit</span>
                          </div>
                          <div
                            className="w-full rounded-lg flex items-center gap-3 h-9 text-[#E9755D] p-3 cursor-pointer hover:bg-light"
                            // onClick={() => deleteCourse(course.id)}
                          >
                            <Image
                              src="/images/delete.svg"
                              alt="delete"
                              width={20}
                              height={20}
                            />
                            <span>Delete</span>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Modal for creating an album */}
        <Modal
          visible={isAlbumModalOpen}
          onClose={handleAlbumModalClose}
          onSave={handleAlbumCreate}
          title="Create Album"
        >
          <div className="mt-1">
            <input
              type="text"
              id="album-name"
              name="album-name"
              placeholder="Album name"
              onChange={(e) => setAlbumName(e.target.value)}
              className="text-[14px] block h-[50px] w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none transition duration-150 ease-in-out"
            />
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef}
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="block w-[160px] text-center border text-[#313957] py-[8px] px-[14px] mt-[16px] rounded-[8px] cursor-pointer"
          >
            + Add Images
          </label>

          {/* Display selected images */}
          <div className="mt-4 space-y-2">
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className="flex flex-col p-2 border rounded-md bg-white"
              >
                {/* Image Info Row */}
                <div className="flex justify-between space-x-3">
                  <div className="flex items-center">
                    {/* Image Preview */}
                    <div>
                      <Image
                        src={image.url}
                        alt={image.name}
                        width={100}
                        height={100}
                        className="rounded-md"
                        style={{paddingRight:'10px'}}
                      />
                    </div>

                    <div className="text-xs font-medium">
                      {image.status === "uploading" ? (
                        <div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{image.name}</p>
                          </div>
                          <div className="text-blue-500 flex items-center">
                          <p className="text-xs text-gray-500 mr-1">
                  {image.uploadedSize} KB of {image.size} {/* Display uploaded size */}
                </p>
                            <span className="animate-spin mr-1">
                              <Image
                                src="/images/loader-icon.png"
                                alt="images"
                                width={20}
                                height={20}
                              />
                            </span>
                            <p>Uploading...</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <h1 className="text-[16px]">Upload successful</h1>
                          <span className="text-[#505F79]">
                            {image.name} was uploaded
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Remove Image Button */}
                  <div>
                    <button onClick={() => removeImage(image.url)}>
                      <Image
                        src="/images/close-circle.png"
                        alt="images"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                {image.status === "uploading" && (
                  <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${image.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Modal>
      </DashboardIntroSectionWrapper>
    </div>
  );
};

export default ImageTabsOne;
