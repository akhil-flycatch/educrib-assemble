"use client";

import { getProfileById, getProfileMediasByProfileId, getAllMedia, upsertProfileMedia } from "@/api";
import DashboardIntroSectionWrapper from "@/components/dashboard/Introduction/sectionWrapper";
import { useEffect, useState } from "react";
import Links from "./links";
import Social from "./social";
import LinksForm from "@/elements/entry/forms/links";
import Modal from "@/elements/modal";
import { useForm } from "react-hook-form";
import SocialForm from "@/elements/entry/forms/social";
export default function Media({
  video,
  virtualTour,
  website,
  eBrochure,
  facebook,
  instagram,
  twitter,
  linkedin,
  google,
}: any) {
  const [media, setMedia] = useState<any>();
  const [profile, setProfile] = useState<any>();
  const [mediaLookup, setMediaLookup] = useState<any>()
  const [visible, setVisible] = useState<any>(false);
  const [visibleSocialModal, setvisibleSocialModal] = useState<any>(false)
 
  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getProfileMediasByProfileId(
        
      );
      const profileDetails = await getProfileById();
      const lookup = await getAllMedia()
      setProfile(profileDetails);
      setMedia(profileData);
      setMediaLookup(lookup)
     
    };
    fetchData();
  }, []);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<any>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      
    },
  });

  const {
    register:registerSocial,
    handleSubmit:handleSubmitSocial,
    getValues:getValuesSocial,
    reset:resetSocial,
    formState: { errors:errorsSocial },
  } = useForm<any>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      
    },
  });



  const submitLinks = async (values: any) => {
    // Extract all keys from the form values
    const linksKeys = Object.keys(values);
    let formData = new FormData();

    let isSocialLink = false;
    let ismediaVideoType = false;
    for (var key in values) {
      mediaLookup.find((lookup: any) => {
        if (lookup.id === key) {
          ismediaVideoType = lookup.ismediaVideoType;
          isSocialLink = lookup.isSocialLink;
        }
      });

      if (values[key]) {
        formData.append("profileId", profile.id);
        formData.append("mediaId", key);
        formData.append("link", values[key]);
        formData.append("isSocialLink", String(isSocialLink));
        formData.append("ismediaVideoType", String(ismediaVideoType));
        const response = await upsertProfileMedia(formData);
        formData = new FormData()
        const profileData = await getProfileMediasByProfileId();
        setMedia(profileData);
        setVisible(false)
      }
    }
  };

  const submitSocialLinks = async (values: any) => {
    // Extract all keys from the form values
    const linksKeys = Object.keys(values);
    let formData = new FormData();

    let isSocialLink = false;
    let ismediaVideoType = false;
    for (var key in values) {
      mediaLookup.find((lookup: any) => {
        if (lookup.id === key) {
          ismediaVideoType = lookup.ismediaVideoType;
          isSocialLink = lookup.isSocialLink;
        }
      });

      if (values[key]) {
        formData.append("profileId", profile.id);
        formData.append("mediaId", key);
        formData.append("link", values[key]);
        formData.append("isSocialLink", String(isSocialLink));
        formData.append("ismediaVideoType", String(ismediaVideoType));
        const response = await upsertProfileMedia(formData);
        formData = new FormData()
        const profileData = await getProfileMediasByProfileId();
        setMedia(profileData);
        setvisibleSocialModal(false)
      }
    }
  };



 
  const isEmptyMultimediaResources = media?.find((type: any) => type.media.isSocialLink == false)
  const isEmptySocialLink = media?.find((type: any) => type.media.isSocialLink = false)
  return (
    <><div className="grid  gap-2" style={{ gridTemplateColumns: "53vw 1fr" }}>
      <DashboardIntroSectionWrapper
        title="Multimedia Resources"
        wrapperClass="h-max"
        primaryButton={{
          type: "Edit",
          onClick: () => {
            setVisible(true);
          },
        }}
      >
        <div>
          <Links media={media} profile={profile} mediaLookup={mediaLookup} />
        </div>
      </DashboardIntroSectionWrapper>
      <DashboardIntroSectionWrapper
        title="Social Links"
        wrapperClass="h-mx"
        primaryButton={{
          type: "Edit",
          onClick: () => {
            setvisibleSocialModal(true);
          },
        }}
      >
        <div>
          <Social media={media} profile={profile} lookup={mediaLookup} />
        </div>
      </DashboardIntroSectionWrapper>
    </div><Modal visible={visible} onSave={() => submitLinks(getValues())} onClose={() => setVisible(false)} title={isEmptyMultimediaResources ? "Add Multimedia Resources " : "Edit Multimedia Resources"}>
        <LinksForm mediaLookup={mediaLookup} register={register}  media={media}/>
      </Modal>
      <Modal visible={visibleSocialModal} onSave={() => submitSocialLinks(getValuesSocial())} onClose={() => setvisibleSocialModal(false)} title={isEmptySocialLink ? "Add Social Link " : "Edit Social Link"}>
        <SocialForm mediaLookup={mediaLookup} register={registerSocial}  media={media}/>
      </Modal>
      </>
    // <div className='flex flex-col space-y-4'>
    // 	<Cta text='Media' action={<Button icon={Plus}>Add Media</Button>} icon={Video} />
    // 	<div className='flex flex-col space-y-4'>
    // 		<Links
    // 			video={video}
    // 			virtualTour={virtualTour}
    // 			eBrochure={eBrochure}
    // 			website={website}
    // 		/>
    // 		<SocialForm
    // 			facebook={facebook}
    // 			instagram={instagram}
    // 			twitter={twitter}
    // 			linkedin={linkedin}
    // 			google={google}
    // 		/>
    // 	</div>
    // </div>
  );
}
