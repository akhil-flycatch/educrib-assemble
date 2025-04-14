import EditAddDeleteButton, {
  ButtonType,
} from "@/elements/EditAddDeleteButton";

interface Props {
  children: React.ReactNode;
  wrapperClass?: string;
  title: React.ReactNode;
  secondaryComponent?: React.ReactNode;
  count?: number;
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
  secondaryComponent,
  count
}) => {
  return (
    <div
      className={`flex flex-col bg-white border border-accent-2 rounded-lg py-6 ${wrapperClass}`}
    >
      <div className="flex flex-col border-b border-division pb-4 px-6 gap-3">
        <div className="flex items-center justify-between">
          <div className="font-medium text-xl text-heading capitalize">
            {title} {count && <span className="text-[#505F79] bg-[#EAEBEE] text-[20px] font-medium pl-[11px] pr-[11px] pt-[3px] pb-[3px] rounded-[45px]">{count}</span>}
          </div>
          {primaryButton && (
            <EditAddDeleteButton
              type={primaryButton.type}
              text={primaryButton.text}
              onClick={primaryButton.onClick}
            />
          )}
        </div>
        {secondaryComponent && secondaryComponent}
      </div>
      <div className={`flex-1 pt-4 px-6 overflow-y-auto`}>{children}</div>
    </div>
  );
};

export default DashboardIntroSectionWrapper;
