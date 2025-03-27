import { useEffect, useState } from "react";

const YouTubeMeta = ({ videoUrl }: any) => {
  const [meta, setMeta] = useState<any>(null);

  useEffect(() => {
    if (!videoUrl) return;

    const fetchMetadata = async () => {
      try {
        const videoId = new URL(videoUrl).searchParams.get("v"); // Extract video ID
        if (!videoId) return;

        const response = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        const data = await response.json();
        setMeta(data);
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    };

    fetchMetadata();
  }, [videoUrl]);

  if (!meta) return <p>Loading...</p>;

  return (
    <div>
    {meta.title}
    </div>
  );
};

// Usage Example
export default YouTubeMeta;
