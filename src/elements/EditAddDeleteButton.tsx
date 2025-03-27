import Image from "next/image";

export type ButtonType = "Edit" | "Add";
// export type ButtonType = "Edit" | "Add" | "Delete";

interface Props {
  className?: string;
  text?: string;
  type: ButtonType;
  hideIcon?: boolean;
  iconOnly?: boolean;
  onClick?: () => void;
}

const EditAddDeleteButton: React.FC<Props> = ({
  className,
  text,
  type,
  hideIcon = false,
  iconOnly = false,
  onClick,
}) => {
  const icon: Record<ButtonType, string> = {
    Edit: "/images/edit.svg",
    Add: "/images/plus.svg",
    // Delete: "/images/delete.svg",
  };
  return (
    <button
      className={`flex items-center justify-center bg-light-100 ${
        iconOnly ? "border-2" : "border"
      } border-accent gap-2 px-[14px] py-2 rounded-lg hover:border-hover hover:bg-hover hover:text-hover ${className}`}
      onClick={onClick}
    >
      {(iconOnly || !hideIcon) && (
        <Image src={icon[type]} alt={type} width={20} height={20} />
      )}
      {!iconOnly ? (
        <span className="text-asm-purple font-medium text-sm">
          {text || type}
        </span>
      ) : null}
    </button>
  );
};

export default EditAddDeleteButton;
