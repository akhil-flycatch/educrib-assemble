import EditAddDeleteButton, {
  ButtonType,
} from "@/elements/EditAddDeleteButton";

interface Props {
  children: React.ReactNode;
  wrapperClass?: string;
  title: React.ReactNode;
  secondaryComponent?: React.ReactNode;
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
}) => {
  return (
    <div
      className={`flex flex-col bg-white border border-accent-2 rounded-lg py-6 ${wrapperClass}`}
    >
      <div className="flex flex-col border-b border-division pb-4 px-6 gap-3">
        <div className="flex items-center justify-between">
          <div className="font-medium text-xl text-heading capitalize">
            {title}
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
