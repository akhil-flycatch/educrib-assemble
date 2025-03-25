// TODO: Handles no facilities condition
"use client";
import Modal from "@elements/modal";
import FacilitiesForm from "@entry/forms/facilities";
import { useState } from "react";

import AddButtonComon from "@/elements/addButton";
import CommonSearchInTabs from "@/elements/CommonSearchInTabs";
import CtaCommon from "@/elements/ctaCommon";
import { Coffee } from "lucide-react";
import { useForm } from "react-hook-form";
import FacilitiesList from "./list";

export default function Facilities({ facilities }: any) {
  const [visible, setVisible] = useState(false);
  const { register, handleSubmit, getValues } = useForm();
  // useEffect
  return (
    <div className="flex flex-col space-y-4 bg-white">
      <CtaCommon
        text={
          <>
            <div
              style={{
                color: "#15294B",
                fontSize: "20px",
                fontWeight: "500",
                paddingRight: "12%",
              }}
            >
              Facilities
            </div>
            <div
              style={{
                background: "#EAEBEE",
                fontSize: "14px",
                width: "35px",
                height: "27px",
                borderRadius: "20px",
                gap: "10px",
                paddingTop: "0px",
                paddingRight: "10px",
                paddingBottom: "4px",
                paddingLeft: "10px",
              }}
            >
              {facilities?.length > 0 ? facilities?.length : 0}
            </div>
          </>
        }
        action={<AddButtonComon setVisible={setVisible} />}
        icon={Coffee}
      />
      <CommonSearchInTabs />
      <FacilitiesList facilities={facilities} />
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        onSave={() => console.log("te eve", getValues())}
        title="Edit Facilities"
      >
        <FacilitiesForm register={register} />
      </Modal>
    </div>
  );
}
