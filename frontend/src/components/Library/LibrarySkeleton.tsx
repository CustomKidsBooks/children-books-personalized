import React from "react";

const LibrarySkeleton = () => {
  return (
    <section className="py-10 place-items-center grid lg:grid-cols-4 gap-4 w-full md:grid-cols-2 sm:grid-cols-1">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((n, i) => (
        <div key={i} className="card"></div>
      ))}
    </section>
  );
};

export default LibrarySkeleton;
