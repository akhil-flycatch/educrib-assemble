import EditAddDeleteButton, {
  ButtonType,
} from "@/elements/EditAddDeleteButton";

interface Props {
  children: React.ReactNode;
  wrapperClass?: string;
  title: React.ReactNode;
  primaryButton?: {
    text?: string;
    type: ButtonType;
    onClick: () => void;
  };
}
const DashboardIntroSectionWrapper: React.FC<Props> = ({
  children,
  wrapperClass,
  title,
  primaryButton,
}) => {
  return (
    <div
      className={`flex flex-col bg-white border border-accent-2 rounded-lg py-6 ${wrapperClass}`}
    >
      <div className="flex border-b border-division items-center justify-between pb-4 px-6">
        <span className="font-medium text-xl text-heading capitalize">
          {title}
        </span>
        {primaryButton && (
          <EditAddDeleteButton
            type={primaryButton.type}
            text={primaryButton.text}
            onClick={primaryButton.onClick}
          />
        )}
      </div>
      <div className={`flex-1 pt-4 px-6 overflow-y-auto`}>{children}</div>
    </div>
  );
};

export default DashboardIntroSectionWrapper;
