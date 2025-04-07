import Image from "next/image";

const ContactCard: React.FC<{
  image?: string;
  email: string;
  phone: string;
  name: string;
  department: string;
  id?: string;
  data?: any;
  onEdit: (name: string) => void;
}> = ({ image, email, phone, name, department, onEdit,data }) => (
  <div className="w-full bg-white border border-accent-2 rounded-lg px-4 py-3 flex flex-col gap-2 hover:shadow-md">
    <div className="w-full bg-[#818CF84A] rounded px-2 py-0.5 font-medium text-[#453FAB] text-[10px] leading-[18px]">
      {department}
    </div>
    <div className="flex gap-4">
      <div
        className={`size-[66px] rounded-full flex items-center justify-center overflow-hidden pointer-events-none ${
          image ? "" : "bg-[#B55EE5]"
        }`}
      >
        {image ? (
          <Image src={image} alt="avatar" width={66} height={66} />
        ) : (
          <span className="text-white font-medium leading-[29.7px] text-[26.4px]">
            {name[0]}
          </span>
        )}
      </div>
      <div className="flex-1 flex justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-heading text-base leading-5">{name}</span>
          <span className="text-sm leading-[18px] text-secondary font-normal">
            {phone}
          </span>
          <span className="text-sm leading-[18px] text-secondary font-normal">
            {email}
          </span>
        </div>
      </div>
      <button
        className={`flex items-center justify-center bg-light-100 size-6 border-2 border-accent gap-2  rounded-full hover:border-hover hover:bg-hover hover:text-hover`}
        onClick={() => onEdit(data)}
      >
        <Image src="/images/edit.svg" width={13} height={13} alt="edit" />
      </button>
    </div>
  </div>
);

export default ContactCard;
