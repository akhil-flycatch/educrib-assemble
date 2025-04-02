import Image from "next/image";
interface CommonSearchInTabsProps {
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFilter?:any;
}

const CommonSearchInTabs: React.FC<CommonSearchInTabsProps> = ({ handleFileChange, isFilter }:any) => {
 

  return (
    <>
      <div
        style={{
          borderRadius: "10px",
          justifyContent: "space-between",
          padding: "12px",
          background: "#F5F6F7",
          display: "flex",
          flexWrap: "wrap",
          margin:"10px"
        }}
      >
        <div className="relative flex items-center" style={{ flex: "1 1 0" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            style={{ width: "50%" }}
            className="bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Search Facilities"
            onChange={(e) => handleFileChange && handleFileChange(e)} // Make sure handleFileChange exists
          />
        </div>
       {isFilter && ( <div
          style={{
            background: "white",
            width: "96px",
            display: "flex",
            borderRadius: "8px",
            alignItems: "center",
            justifyContent: "space-around",
            color: "#42526D",
          }}
        >
          <Image
            src="/Vector.svg"
            alt="Next.js logo"
            width={20}
            height={28}
            priority
          />
          <span>Filter</span>
        </div>)}
      </div>
    </>
  );
};

export default CommonSearchInTabs;



