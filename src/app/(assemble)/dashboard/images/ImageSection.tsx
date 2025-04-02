"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ImageTabsTwo from "./ImageTabsTwo";
import ImageTabsOne from "./ImageTabsOne";

let imageLinks = [
  "https://vrhpopcshfgabaunvpht.supabase.co/storage/v1/object/public/educrib-test//3e3a17cd2fcc463f8949a71c8bc97562_back.jpg",
  "https://vrhpopcshfgabaunvpht.supabase.co/storage/v1/object/public/educrib-test//192750e5799e4cb997069f9312263e2b_necklace.png",
  "https://vrhpopcshfgabaunvpht.supabase.co/storage/v1/object/public/educrib-test//2ba5a7a929184e72b5e50268f9f37791_news.jpg",
  "https://vrhpopcshfgabaunvpht.supabase.co/storage/v1/object/public/educrib-test//075bedd6be1f44b4ba5c6e63cec65e1a_images.png",
  "https://vrhpopcshfgabaunvpht.supabase.co/storage/v1/object/public/educrib-test//2ba5a7a929184e72b5e50268f9f37791_news.jpg",
  "https://vrhpopcshfgabaunvpht.supabase.co/storage/v1/object/public/educrib-test//3e3a17cd2fcc463f8949a71c8bc97562_back.jpg",
  "https://vrhpopcshfgabaunvpht.supabase.co/storage/v1/object/public/educrib-test//075bedd6be1f44b4ba5c6e63cec65e1a_images.png",
  "https://vrhpopcshfgabaunvpht.supabase.co/storage/v1/object/public/educrib-test//192750e5799e4cb997069f9312263e2b_necklace.png",
  "https://vrhpopcshfgabaunvpht.supabase.co/storage/v1/object/public/educrib-test//2ba5a7a929184e72b5e50268f9f37791_news.jpg",
  "https://vrhpopcshfgabaunvpht.supabase.co/storage/v1/object/public/educrib-test//192750e5799e4cb997069f9312263e2b_necklace.png",
  "https://vrhpopcshfgabaunvpht.supabase.co/storage/v1/object/public/educrib-test//2ba5a7a929184e72b5e50268f9f37791_news.jpg",
  "https://vrhpopcshfgabaunvpht.supabase.co/storage/v1/object/public/educrib-test//3e3a17cd2fcc463f8949a71c8bc97562_back.jpg",
];

const ImageSection: React.FC<any> = ({isAlbumEmpty}:any) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const [allImages, setAllImages] = useState([...imageLinks]);

  const uploadimages = (images: any) => {
    console.log("Uploaded images:", images);

    // Extract all URLs and push them into imageLinks
    const newImageUrls = images.map((img: any) => img.url);
    imageLinks.push(...newImageUrls);

    // Update state with new images
    setAllImages((prev) => [...prev, ...newImageUrls]);
  };

  return (
    <div>
      <div className="relative">
        
        {!showAll ? (
          <div>
            <div>
              <ImageTabsOne setShowAll={setShowAll} imageLinks={imageLinks} isAlbumEmpty={isAlbumEmpty} />
            </div>
          </div>
        ) : (
          <div>
            <div>
              <ImageTabsTwo
                uploadimages={uploadimages}
                setShowAll={setShowAll}
                allImages={allImages}
                setSelectedImageIndex={setSelectedImageIndex}
                
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
                <button onClick={() => setSelectedImageIndex(null)}>
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
                <div className="relative pb-[400px] overflow-hidden rounded-lg">
                  {allImages.map((img, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                        index === selectedImageIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                      data-carousel-item
                    >
                      <Image
                        src={img}
                        alt={`Slide ${index}`}
                        width={500}
                        height={500}
                        className="rounded-md"
                      />
                    </div>
                  ))}
                </div>

                {/* Carousel Controls */}
                <button
                  type="button"
                  className="absolute top-1/2 left-4 z-30 p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) =>
                      prev !== null
                        ? prev === 0
                          ? imageLinks.length - 1
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
                        ? prev === imageLinks.length - 1
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
