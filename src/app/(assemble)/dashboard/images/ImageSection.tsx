"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ImageTabsTwo from "./ImageTabsTwo";
import ImageTabsOne from "./ImageTabsOne";
import { addImageByAlbumId, deleteImageById, getImagesByAlbumId } from "@/api/profileImages";

const ImageSection: React.FC<any> = ({ isAlbumEmpty }: any) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [allImages, setAllImages] = useState<any>([]);


  console.log(allImages[0]?.url,"allImages");
  const fetchImages = async () => {
    if (selectedId) {
      const res = await fetch(`/api/images?albumId=${selectedId}`);
      const data = await res.json();
      console.log("images NEEDED", data);

      setAllImages(data?.data);
    }
  };

  useEffect(() => {
   
    fetchImages();
  }, [selectedId,selectedImageIndex]);
  const handleUpload = async (image: any) => {
    if (!selectedId) {
      console.error("No album selected");
      return;
    }

    

    const formData = new FormData();
    formData.append("albumId", selectedId);
    formData.append("imageUrl", image);

    try {
      const response = await fetch("/api/images", {
        method: "POST",
        body: JSON.stringify({
          albumId: selectedId,
          imageUrl: image,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Image uploaded successfully:", data);
        fetchImages(); // Fetch images again to update the list

      } else {
        console.error("Failed to upload image:", data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  console.log(selectedId, "selectedId");



  console.log(allImages[selectedImageIndex],"data to be deleted")
  return (
    <div>
      <div className="relative">
        {!showAll ? (
          <div >
            <div >
              <ImageTabsOne
                setShowAll={setShowAll}
                imageLinks={allImages}
                isAlbumEmpty={isAlbumEmpty}
                setSelectedId={setSelectedId}
              />
            </div>
          </div>
        ) : (
          <div>
            <div>
              <ImageTabsTwo
                uploadimages={handleUpload}
                setShowAll={setShowAll}
                allImages={allImages}
                setSelectedImageIndex={setSelectedImageIndex}
                albumId={selectedId}
                setAllImages={setAllImages}
              />
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedImageIndex !== null && (
          <div
            className="fixed inset-0 flex flex-col items-center justify-center bg-[#2A2A2A] bg-opacity-80"
            onClick={() => setSelectedImageIndex(null)}
          >
            <div className="p-4 bg-[#303030] shadow-lg w-[1440px] h-[68px]">
              <div className="flex justify-end gap-3">
                {/* Close Button */}
                <button onClick={() => deleteImageById(allImages[selectedImageIndex]?.id)}>
                  <Image
                    src="/images/delete-icon.png"
                    alt="images"
                    width={26}
                    height={18}
                  />
                </button>

                <button>
                  <Image
                    src="/images/close.png"
                    alt="images"
                    width={26}
                    height={18}
                  />
                </button>
              </div>
            </div>

            <div className="bg-[#303030] shadow-lg w-[1440px] pb-[68px]">
              {/* Carousel */}
              <div
                id="image-carousel"
                className="relative w-full"
                data-carousel="static"
              >
             { allImages.length>0 &&  <div className="relative pb-[400px] overflow-hidden rounded-lg">
                  { allImages.map((img, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                        index === selectedImageIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                      data-carousel-item
                    >
                      {
                        img?.url&&(
                          <Image
                            src={img.url|| null}
                            alt={`Slide ${index}`}
                            width={500}
                            height={500}
                            className="rounded-md"
                          />
                        )
                      }
                      
                    </div>
                  ))}
                </div>}

                {/* Carousel Controls */}
                <button
                  type="button"
                  className="absolute top-1/2 left-4 z-30 p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) =>
                      prev !== null
                        ? prev === 0
                          ? allImages.length - 1
                          : prev - 1
                        : 0
                    );
                  }}
                >
                  <Image
                    src="/images/left-arrow.png"
                    alt="images"
                    width={48}
                    height={48}
                  />
                </button>
                <button
                  type="button"
                  className="absolute top-1/2 right-4 z-30 p-2 "
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) =>
                      prev !== null
                        ? prev === allImages.length - 1
                          ? 0
                          : prev + 1
                        : 0
                    );
                  }}
                >
                  <Image
                    src="/images/right-arrow.png"
                    alt="images"
                    width={48}
                    height={48}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSection;
