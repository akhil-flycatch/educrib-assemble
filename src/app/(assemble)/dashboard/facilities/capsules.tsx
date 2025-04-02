import Image from "next/image";
const CapsuleWithIcons = ({ name, onEdit, onDelete, id }: any) => {
  console.log("the alue")
  return (
    <div
      className="relative group flex items-center   py-2 px-4 rounded-facilities cursor-pointer"
      style={{
        height: "max-content",
        width: "max-content",
        marginBottom: "20px",
        marginLeft: "10px",
        marginRight: "10px",
        background: "#EBEDF0",
      }}
      
    >
      <span className="mr-2" style={{ color: "#42526D" }}>
        {name}
      </span>

      {/* Edit and Delete Icons */}
      <div
        className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity "
        // style={{ backgroundColor: "#EBEDF0 " }}
      >
        <div style={{ display: "flex" }}>
         { onDelete && <Image
            onClick={() => onDelete(name)}
            src="/facility-delete.svg"
            alt="Next.js logo"
            width={40}
            height={48}
            priority
          />}
         {onEdit && <Image
            // onClick={onEdit}
            src="/faciliy-edit.svg"
            alt="Next.js logo"
            width={40}
            height={48}
            priority
          />}
        </div>
      </div>
    </div>
  );
};

export default CapsuleWithIcons;
