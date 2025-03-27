import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import Profile from '@/app/(assemble)/dashboard/introduction/preview';
import { getProfileById } from '@/api';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const PreviewModal = (props: Props) => {

    const [profile, setProfile] = useState(null);
      useEffect(() => {
        const fetchData = async () => {
          const profileData = await getProfileById("clrpz6nnn000mlf08dy5aqjdm");
      
          setProfile(profileData);
        };
    
        fetchData();
      }, []);
    return (
            <Dialog open={props.visible} onClose={props.onClose} className="relative z-50">
  <div className="fixed inset-0 bg-dark/50" aria-hidden="true" />
  <div className="fixed inset-0 flex items-center justify-center p-4">
     <DialogPanel className="bg-white rounded-md w-[400px]">
        <Profile profile={profile}/>
     </DialogPanel>

    </div>
                </Dialog>
        
    )
}

export default PreviewModal
