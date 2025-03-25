import Typography from "@/storybooks/components/atoms/Typography";

export default function Description({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <Typography theme="primary" intent="small">
        {label}
      </Typography>
      <Typography>{children}</Typography>
    </div>
  );
}
