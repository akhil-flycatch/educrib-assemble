import { Input } from "@/storybooks/components/atoms";

const UrlTab: React.FC<{
  handleUrlChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
  files: File[];
  urls: string[];
  url: string;
  name: string;
  acceptMultiple: boolean;
}> = ({ handleUrlChange, url, name, urls, acceptMultiple }) => {
  return (
    <>
      <Input
      required
        type={acceptMultiple ? "text" : "url"}
        name={name}
        className="w-full"
        disabled={urls.length > 0}
        value={url}
        onChange={handleUrlChange}
        placeholder={
          acceptMultiple
            ? "Paste multiple URLs comma seperated"
            : "Paste the URL"
        }
      />
    </>
  );
};

export default UrlTab;
