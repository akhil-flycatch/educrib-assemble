import { getProfileById, getProfileFacilitiesByProfileId } from "@/api";
import Contacts from "@/components/dashboard/Introduction/contacts";
import Location from "@/components/dashboard/Introduction/location";
import Overview from "@/components/dashboard/Introduction/overview";
import Image from "next/image";
import DashboardLayout from "./page";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";


const Introduction: React.FC = async ({children}:any) => {

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
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