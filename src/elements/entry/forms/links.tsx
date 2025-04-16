"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Input from "../../../components/hookForm/input";
import { Loader2 } from "lucide-react";

const LinksForm: React.FC<any> = ({
  errors,
  register,
  mediaLookup,
  media,
  loading,
}) => {
  return (
    <div className="w-full flex justify-between">
      <div className="flex-1 max-w-[794px] gap-6">
        {/* Render the fields only if mediaLookup contains data */}
        {mediaLookup?.length > 0 ? (
          <>
            {mediaLookup.map((lookup: any) => {
              // Check if the link is not a social link
              if (!lookup.isSocialLink) {
                // Find the matching profileMedia from the media array
                const profileMedia = media.find(
                  (profile: any) => profile.media.id === lookup.id
                );

                // If profileMedia is found, use its link as default value
                const defaultValue = profileMedia ? profileMedia.link : "";

                return (
                  <div
                    className="w-full gap-6"
                    style={{ marginBottom: "20px" }}
                    key={lookup.id} // Use a unique key for each element
                  >
                    <Input
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #42526D",
                        background: "#FFF",
                        minWidth: "750px",
                      }}
                      id={lookup.id}
                      label={lookup.title}
                      placeholder="http://"
                      defaultValue={defaultValue} // Set the default value directly
                      {...register(lookup.id)} // Register the input field with react-hook-form
                    />
                  </div>
                );
              }
              return null; // Skip if it's a social link
            })}
          </>
        ) : loading ? (
          <Loader2 />
        ) : (
          <div className="text-center">
            No media lookups added. Contact admin to add them and continue.
          </div>
        )}
      </div>
    </div>
  );
};

export default LinksForm;
