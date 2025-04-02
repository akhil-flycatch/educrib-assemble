"use client";
import "@/styles/globals.css";
import Image from "next/image";
import { useState } from "react";
import YouTubeMeta from "./youtubeTitle";

const getFileNameFromUrl = (url: string) => {
  const path = new URL(url).pathname; // Get the path part of the URL
  const fileName = path.substring(path.lastIndexOf('/') + 1); // Extract the file name
  return fileName;
};

const isFileLink = (url: string) => {
  const fileExtensions = ['.pdf', '.docx', '.xlsx', '.jpg', '.jpeg', '.png', '.gif', '.mp4', '.avi', '.zip', '.txt'];
  return fileExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

const triggerDownloadInBackground = (url: string) => {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = getFileNameFromUrl(url); // This will download the file with its name
  anchor.style.display = "none"; // Make sure it's not visible
  document.body.appendChild(anchor);
  anchor.click(); // Trigger the download
  document.body.removeChild(anchor); // Clean up the DOM after the download
};

export default function Links({ media, profile, lookup }: any) {
  const [visible, setVisible] = useState(false);

  const handleLinkClick = (event: React.MouseEvent, link: string) => {
    // Prevent the default link opening behavior
    event.preventDefault();
    window.open(link, "_blank"); // Open the link in a new tab (no download)
    
  };

  return (
    <>
      <div>
        {media?.length > 0 ? (
          <>
            {media?.map((type: any) => {
              return (
                <>
                  {!type.isSocialLink && (
                    <div className="grid grid-cols-[10vw_1fr] gap-2">
                      <div className="socialType">{type.media.title}</div>
                      <div
                        className="socialLinkWrapper"
                        onClick={(event) => handleLinkClick(event, type.link)} // Use custom click handler
                      >
                        <Image
                          src={type.media.icon}
                          alt="avatar"
                          width={35}
                          height={35}
                          style={{ marginRight: "10px" }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              overflow: "hidden",
                            }}
                          >
                            {type.ismediaVideoType ? (
                              <>
                                {type.link ? (
                                  <YouTubeMeta videoUrl={type.link} />
                                ) : (
                                  <div>NA</div>
                                )}
                              </>
                            ) : (
                              <>
                                {type.link ? (
                                  isFileLink(type.link) ? (
                                    getFileNameFromUrl(type.link)
                                  ) : (
                                    <div>{profile?.title}</div>
                                  )
                                ) : (
                                  <div>NA</div>
                                )}
                              </>
                            )}
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "grey",
                              overflow: "hidden",
                            }}
                          >
                            {!type.media.ismediaVideoType ? (
                              <div
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  marginBottom: "20px",
                                  width: "inherit",
                                  maxWidth: "84%",
                                }}
                              >
                                {type.link}
                              </div>
                            ) : (
                              <div>youtu.be</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </>
        ) : (
          <div
            style={{
              color: "#5D6B82",
              width: "100%",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src="/images/noMedia.svg" alt={""} width={50} height={50} />
            <p>No media available. Upload videos or</p>
            <p>documents to showcase content.</p>
          </div>
        )}
      </div>
    </>
  );
}
