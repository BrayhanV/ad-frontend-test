export const MlProductCardSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="animate-pulse bg-gray-300 rounded-lg h-48 w-full"></div>
      ))}
    </div>
  );
}