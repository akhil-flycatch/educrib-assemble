export interface TeaxtAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const TextArea: React.FC<TeaxtAreaProps> = ({ ...props }) => (
  <textarea className="p-4 rounded-md" {...props} />
);

export default TextArea;
