import Skeleton from "react-loading-skeleton";

const LibrarySkeleton = () => {
  return (
    <section className="py-10">
      <div className="place-items-center lg:grid lg:grid-cols-4 gap-4 flex overflow-x-auto">
        {new Array(10).fill(null).map((n, i) => (
          <Skeleton key={i} containerClassName="card" />
        ))}
      </div>
    </section>
  );
};

export default LibrarySkeleton;
