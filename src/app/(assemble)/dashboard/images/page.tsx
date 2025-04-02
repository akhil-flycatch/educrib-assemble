
'use client';
import { useEffect, useState } from "react";
import ImageSection from "./ImageSection";
import { Loader2 } from "lucide-react";



export default function Gallery() {
// get album by profile id logic goes here
const [isAlbumEmpty, setIsAlbumEmpty] = useState(false);
const [isLoading, setIsLoading] = useState(false)

useEffect(() => {

// get album by profile id logic goes here
// based onthe length of setstate of album empty
// once receieved the response from api set the loading true
},[])
  return (
    <div>
      {isLoading? (
        <>
        <Loader2/>
        </>
      ): (
        <>
         <div className="border mt-5">
        <ImageSection isAlbumEmpty={isAlbumEmpty} />
      </div>
        </>
      )}
     
    </div>
  );
}