export const MlProductCardSkeleton = () => {
  return (
    <article className="w-full h-fit md:w-[380px] flex flex-col rounded-2xl overflow-hidden p-6 gap-5 border-stroke-secondary border-[0.5px] bg-gray-200">
      <div
        className="w-full h-[240px] rounded-t-2xl bg-gray-300"
        data-testid="image-skeleton"
      />
      <div className="flex flex-col gap-3">
        <div className="w-full h-[16px] bg-gray-300" />
        <div className="flex flex-row justify-between items-start gap-2">
          <div className="w-[100px] h-[20px] bg-gray-300" />
          <div className="w-[69px] h-[24px] bg-gray-300" />
        </div>
      </div>
      <div
        className="w-full h-[56px] bg-gray-300"
        data-testid="button-skeleton"
      />
    </article>
  );
};
