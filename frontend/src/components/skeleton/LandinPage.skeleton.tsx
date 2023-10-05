import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LandinPageSkeleton = () => {
  return (
    <section className="mt-10">
      <div className="p-7">
        <Skeleton height={180} />
      </div>
      <div className="p-7">
        <Skeleton height={300} />
      </div>
    </section>
  );
};

export default LandinPageSkeleton;
