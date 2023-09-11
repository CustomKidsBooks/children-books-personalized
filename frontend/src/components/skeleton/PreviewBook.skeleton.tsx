import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PreviewBookSkeleton = () => {
  return (
    <section className="mt-10">
      <div className="p-2 mb-3 grid grid-cols-2 w-[506.622px]">
        <Skeleton height={30} width={150} />
        <div className="flex gap-2 ">
          <Skeleton height={30} width={10} circle />
          <Skeleton height={30} width={40} />
        </div>
      </div>
      <Skeleton width={100} height={30} />
      <div className="pt-10 grid grid-cols-2 gap-10 ">
        <Skeleton width={500} height={400} />
      </div>
    </section>
  );
};

export default PreviewBookSkeleton;
