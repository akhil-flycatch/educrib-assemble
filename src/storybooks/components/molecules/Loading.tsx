export default function Loading() {
  return (
    <div className="flex flex-col space-y-2 w-full animate-pulse">
      <div className="h-12 w-full bg-light rounded-md" />
      <div className="h-12 w-3/4 bg-light rounded-md" />
      <div className="h-12 w-1/2 bg-light rounded-md" />
      <div className="h-12 w-1/4 bg-light rounded-md" />
    </div>
  );
}
