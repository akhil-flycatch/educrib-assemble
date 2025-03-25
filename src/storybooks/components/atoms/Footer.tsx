export type PageFooterProps = {
  title: string;
};

export default function Footer({ title }: PageFooterProps) {
  return (
    <footer className="flex items-center justify-center p-2 bg-light text-xs">
      {`${title} @ ${new Date().getFullYear()}`}
    </footer>
  );
}
