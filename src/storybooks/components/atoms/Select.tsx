export interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {}

const Select: React.FC<SelectProps> = ({ ...props }) => (
  <select className="p-4 rounded-md" {...props} />
);

export default Select;
