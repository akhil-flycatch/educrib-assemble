const OverviewItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex gap-16">
    <span className="text-label min-w-[115px]">{label}</span>
    <span className="text-lg text-heading font-medium">{value}</span>
  </div>
);

export default OverviewItem;
