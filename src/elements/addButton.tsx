import Image from "next/image";

const AddButtonComon = ({ setVisible }: any) => {
  return (
    <>
      <div onClick={() => setVisible(true)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "83px",
            height: "36px",
            borderRadius: "8px",
            gap: "8px",
            paddingTop: "8px",
            paddingRight: "14px",
            paddingBottom: "8px",
            paddingLeft: "14px",
            background: "#C2C7D0",
            color: "#6129FE",
          }}
        >
          <Image // onClick={onDelete}
            src="/add.svg"
            alt="addlogo"
            width={40}
            height={48}
            priority
          />
          Add
        </div>
      </div>
    </>
  );
};

export default AddButtonComon;
