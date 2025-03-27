import { getProfileById, getProfileFacilitiesByProfileId } from "@/api";
import Contacts from "@/components/dashboard/Introduction/contacts";
import Location from "@/components/dashboard/Introduction/location";
import Overview from "@/components/dashboard/Introduction/overview";
import Image from "next/image";
import DashboardLayout from "./page";


const Introduction: React.FC = ({children}:any) => {
  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* <DashboardLayout/> */}
      
      <div className="flex gap-4">
        <Overview />
        <Contacts />
      </div>
      <Location />
    </div>
  );
};

export default Introduction;