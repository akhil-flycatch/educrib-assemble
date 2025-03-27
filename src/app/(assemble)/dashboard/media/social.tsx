"use client";
import "@/styles/globals.css";
import Image from "next/image";
import { useState } from "react";



export default function Social({
	media, profile, lookup
}: any) {
	const [
		visible, setVisible
	] = useState(false);
	console.log("the media", media)
	return (
		<div>
        {media?.length > 0 ? (
          <>
            {media?.map((type: any) => {
              return (
                <>
                  {type.isSocialLink && (
                    <div className="grid">
                      <a className="socialLinkWrapper"  style={{paddingLeft:"10px"}} href={type.link}>
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
							paddingTop:"14px"
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              overflow: "hidden",
                              // Ensure the element is block-level for overflow to work
                            }}
                          >
                             <div>{type?.media.title}</div>
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "grey",
                              overflow: "hidden",
                            }}
                          >
                            
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
            <Image src="/images/nosocialLink.svg" alt={""} width={50} height={50} />
            <p>No links added. Connect your</p>
            <p>social media for better visibility.</p>
          </div>
        )}
      </div>
		
	
	);
}
