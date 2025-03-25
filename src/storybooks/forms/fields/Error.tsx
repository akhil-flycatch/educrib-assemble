const Error = ({ children }: { children: string }) => {
  return <span className="text-[red] text-sm">{children}</span>;
};

export default Error;
