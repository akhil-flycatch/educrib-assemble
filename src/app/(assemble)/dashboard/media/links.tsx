"use client";
import "@/styles/globals.css";
import Image from "next/image";
import { useState } from "react";
import YouTubeMeta from "./youtubeTitle";

export default function Links({ media, profile , lookup}: any) {
  const [visible, setVisible] = useState(false);
  // console.log("the value", media);

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
                      <a className="socialLinkWrapper" href={type.link}>
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
                              // Ensure the element is block-level for overflow to work
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
                                  <div>{profile?.title}</div>
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
                      </a>
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
