"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Modal from "@elements/modal";
import DashboardIntroSectionWrapper from "@/components/dashboard/Introduction/sectionWrapper";
import { uploadFileToSupabase } from "../../../../utils/supabaseUpload";
// import { deleteAlbumById, getLatestProfileAlbums, upsertProfileAlbum, upsertProfileAlbumTitle } from "@/api/profileAlbum";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { deleteAlbumById, getLatestProfileAlbums, createProfileAlbum, upsertProfileAlbumTitle } from "@/api/profileAlbum";

// Zod schema for form validation
const albumSchema = z.object({
  albumName: z.string().min(1, "Album name is required").max(50, "Album name must be less than 50 characters"),
  images: z.array(z.any()).optional(),
});

type AlbumFormData = z.infer<typeof albumSchema>;

const ImageTabsOne = ({ setShowAll, imageLinks, isAlbumEmpty,setSelectedId }: any) => {
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [isAlbumEditOpen, setIsAlbumEditOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchAlbums = async () => {
    const fetchedAlbums = await getLatestProfileAlbums();
    setAlbums(fetchedAlbums);
  };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AlbumFormData>({
    resolver: zodResolver(albumSchema),
    defaultValues: {
      albumName: "",
      images: [],
    },
  });

  const images = watch("images");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        status: "uploading",
        progress: 0,
        file: file,
      }));

      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
      setValue("images", [...images, ...filesArray]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (url: string) => {
    setSelectedImages((prevImages) => prevImages.filter((img) => img.url !== url));
    setValue(
      "images",
      images.filter((img: any) => img.url !== url)
    );
  };

  const onSubmit = async (data: AlbumFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.albumName);

      const uploadedImages: string[] = [];
      for (const image of data.images || []) {
        const bucketName = "educrib-test";
        const uploadedPath = await uploadFileToSupabase(bucketName, image?.file);
        if (uploadedPath) {
          uploadedImages.push(uploadedPath);
        } else {
          console.error("Failed to upload image:", image.name);
        }
      }

      formData.append("images", uploadedImages);
      await createProfileAlbum(formData);
      console.log("Album Created:", { albumName: data.albumName });
    } catch (error) {
      console.error("Error creating album:", error);
    } finally {
      setIsAlbumModalOpen(false);
fetchAlbums();
    }
  };

  const onEditSubmited = async (data: AlbumFormData) => {
    try {
      if (!editId) {
        console.error("No album ID provided for editing");
        return;
      }

      const formData = new FormData();
      formData.append("id", editId);
      formData.append("title", data.albumName);

      await upsertProfileAlbumTitle(formData);
      console.log("Album Updated:", { albumName: data.albumName });
    } catch (error) {
      console.error("Error updating album:", error);
    } finally {
      setEditId(null);
      setIsAlbumEditOpen(false);
fetchAlbums();
    }
  };

  useEffect(() => {
   
    fetchAlbums();
  }, []);

  const handleDelete = async (albumId: string) => {
    try {
      await deleteAlbumById(albumId);
fetchAlbums();    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  return (
    <div>
      <DashboardIntroSectionWrapper
        wrapperClass="w-full  "
        primaryButton={{
          type: "Add",
          onClick: () => {
            setIsAlbumModalOpen(true);
          },
          text: "Create Album",
        }}
        title={`Images `}
        count={albums?.length || 0}
      >
        <div className="flex flex-wrap gap-5">
        {albums?.map((album: any, index: number) => (
          <div key={index} className="flex pt-[16px] pr-[24px] pb-[16px] pl-[24px] gap-5">
            <div>
              <div
                className="flex flex-wrap w-[192px] gap-2 border rounded-[8px] pt-[28px] pb-[14px] pl-[14px] cursor-pointer"
                onClick={() => {setShowAll(true)
                  setSelectedId(album.id)
                }}
              >
                {album?.image?.slice(0, 3).map((img: any, index: any) => (
                  <div key={index} className="w-[80px] h-[80px]">
                    <Image
                      src={img?.url}
                      alt={`Image ${index + 1}`}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                  </div>
                ))}
                <div className="w-[80px] h-[80px] flex items-center justify-center rounded-md">
                 {album?.image?.length>=3&& <span className="text-[#6129FE] bg-[#EFEAFF] text-[20px] font-medium pl-[11px] pr-[11px] pt-[3px] pb-[3px] rounded-[45px]">
                 {`+${album?.image?.length-3}`}   
                  </span>}
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div>
                  <p className="font-medium text-[#15294B]">{album.title}</p>
                  <p className="text-[14px] text-[#5D6B82]">
                    {album.image?.length || 0} images
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
                        <div
                          className="w-full rounded-lg flex items-center h-9 gap-3 text-[#354764] p-3 cursor-pointer hover:bg-light"
                          onClick={() => {
                            setIsAlbumEditOpen(true);
                            setEditId(album.id);
                          }}
                        >
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
                          onClick={() => handleDelete(album.id)}
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
        ))}
        </div>
       

        {/* Modal for creating an album */}
        <Modal
          visible={isAlbumModalOpen}
          onClose={() => setIsAlbumModalOpen(false)}
          title="Create Album"
          onSave={handleSubmit(onSubmit)}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-1">
              <Controller
                name="albumName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="album-name"
                    placeholder="Album name"
                    className="text-[14px] block h-[50px] w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none transition duration-150 ease-in-out"
                  />
                )}
              />
              {errors.albumName && (
                <p className="text-red-500 text-sm mt-1">{errors.albumName.message}</p>
              )}
            </div>
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
          </form>
        </Modal>

        {/* Modal for editing an album */}
        <Modal
          visible={isAlbumEditOpen}
          onClose={() => setIsAlbumEditOpen(false)}
          title="Edit Album"
          onSave={handleSubmit(onEditSubmited)}
        >
          <form onSubmit={handleSubmit(onEditSubmited)}>
            <div className="mt-1">
              <Controller
                name="albumName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="album-name"
                    placeholder="Album name"
                    className="text-[14px] block h-[50px] w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none transition duration-150 ease-in-out"
                  />
                )}
              />
              {errors.albumName && (
                <p className="text-red-500 text-sm mt-1">{errors.albumName.message}</p>
              )}
            </div>
          </form>
        </Modal>
      </DashboardIntroSectionWrapper>
    </div>
  );
};

export default ImageTabsOne;
