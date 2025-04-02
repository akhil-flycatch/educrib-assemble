import React, { useState, useRef } from "react";
import Image from "next/image";

interface ImageFile {
  url: string;
  name: string;
  size: string;
  status: "uploading" | "success";
  progress: number;
}

const ImageTabsTwo = ({
  uploadimages,
  setShowAll,
  allImages,
  setSelectedImageIndex,
}: any) => {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        status: "uploading",
        progress: 0,
      }));

      setSelectedImages((prev) => [...prev, ...filesArray]);

      // Simulating upload progress
      filesArray.forEach((file) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;

          setSelectedImages((prevImages) =>
            prevImages.map((img) =>
              img.url === file.url ? { ...img, progress } : img
            )
          );

          if (progress >= 100) {
            clearInterval(interval);

            setSelectedImages((prevImages) =>
              prevImages.map((img) =>
                img.url === file.url ? { ...img, status: "success" } : img
              )
            );

            // Call uploadimages **only when progress reaches 100%**
            uploadimages([{ url: file.url }]);
          }
        }, 200);
      });
    }
  };

  const removeImage = (url: string) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((img) => img.url !== url)
    );
  };

  return (
    <div
      className={`pt-[16px]  pb-[16px]   border-b border-[#622AE8]  flex flex-col bg-white border border-accent-2 rounded-lg py-6 w-full`}
    >
      {/* Header Section */}
      <div
        style={{
          marginBottom: "15px",
          marginLeft: "24px",
          marginRight: "24px",
        }}
        className="flex justify-between items-center"
      >
        <div className="flex gap-3">
          <Image
            src="/images/arrow-left.png"
            alt="icon"
            width={24}
            height={24}
            onClick={() => setShowAll(false)}
            className="cursor-pointer"
          />
          <h1 className="text-xl" style={{fontWeight:500}}>Album Name</h1>
        </div>
        <div
          className="border rounded-[8px] flex items-center gap-3 px-4 py-2 cursor-pointer bg-[#DFD4FF]"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image src="/images/Icon.png" alt="icon" width={22} height={20} />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef}
            id="image-upload"
          />
          {/* <label
            htmlFor="image-upload"
            className="text-[#6129FE] text-[14px] font-medium"
          >
            + Add Images
          </label> */}
          <span className="text-[#6129FE] text-[14px] font-medium">
            + Add Images
          </span>
        </div>
      </div>

      <div
        style={{
          borderTop: " 1px solid rgb(98 42 232 / var(--tw-border-opacity, 1))",
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[24px] pt-[16px] pr-[24px] pb-[16px] pl-[24px]">
          {allImages.map((img, index) => (
            <div
              key={index}
              // className="border rounded-lg p-2 cursor-pointer transition-transform transform hover:scale-105"
              className="border rounded-lg cursor-pointer"
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={img}
                alt={`Image ${index + 1}`}
                width={190}
                height={172}
                className="rounded-md w-full max-h-[172px]"
              />
              <div className="flex items-center justify-between">
                <div className="p-2">
                  <p className="text-[14px] text-[#15294B] font-medium truncate max-w-[120px]">
                    {img?.split("/").pop()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date().toDateString()}
                  </p>
                </div>
                <div>
                  <Image
                    src="/images/more.png"
                    alt="images"
                    width={28}
                    height={28}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-5 right-5 space-y-2">
        {selectedImages
          .filter((image) => image.status !== "success")
          .map((image, index) => (
            <div
              key={index}
              className="flex flex-col p-2 border rounded-md bg-white shadow-md"
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
                            {image.size}
                          </p>
                          <span className="animate-spin mr-1">
                            <Image
                              src="/images/loader-icon.png"
                              alt="loader"
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
                      alt="remove"
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
    </div>
  );
};

export default ImageTabsTwo;
