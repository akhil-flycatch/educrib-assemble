// TODO: Handles no facilities condition

import { FacilitiesProps } from "types/college";
import CapsuleWithIcons from "./capsules";

export default function FacilitiesList({ facilities }: FacilitiesProps) {
  return (
    <span className="" style={{ display: "flex", flexWrap: "wrap" }}>
      {facilities &&
        facilities?.length > 0 &&
        facilities.map((facility: any, index: any) => (
          // <FacilityItem key={cuid()} facility={facility} />
          <CapsuleWithIcons
          key={index}
            id={facility.id}
            name={facility.facility.title}
            onDelete={() => alert("deeleted")}
            onEdit={() => alert("edited")}
          />
        ))}
      {/* <CapsuleWithIcons
        name={"sports"}
        onDelete={() => alert("deeleted")}
        onEdit={() => alert("edited")}
      /> */}
    </span>
  );
}
