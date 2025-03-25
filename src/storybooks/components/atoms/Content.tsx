import { DetailedHTMLProps, ReactNode } from "react";

export interface ContentProps
  extends DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  children: ReactNode;
}

export default function PageContent({ ...props }: ContentProps) {
  return (
    <main className="py-8 px-16 flex-1" {...props}>
      {props.children}
    </main>
  );
}
