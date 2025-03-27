export interface FormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  children: React.ReactNode;
}

export default function Form({ children, ...props }: FormProps) {
  return (
    <form
      className="flex flex-col gap-y-8 bg-light rounded-md p-4 md:px-16 md:py-12 shadow-sm"
      {...props}
    >
      {children}
    </form>
  );
}
