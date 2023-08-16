import React from "react";

const LibrarySkeleton = () => {
  return (
    <section className="py-10">
      <div className="place-items-center lg:grid lg:grid-cols-4 gap-4 flex overflow-x-auto">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((n, i) => (
          <div key={i} className="card"></div>
        ))}
      </div>
    </section>
  );
};

export default LibrarySkeleton;
