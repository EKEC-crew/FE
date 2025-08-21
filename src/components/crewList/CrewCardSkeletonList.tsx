import CrewCardSkeleton from "./CrewCardSkeleton";

export default function CrewCardSkeletonList({
  count = 10,
}: {
  count?: number;
}) {
  return (
    <div className="flex flex-col gap-6" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <CrewCardSkeleton key={i} />
      ))}
    </div>
  );
}
