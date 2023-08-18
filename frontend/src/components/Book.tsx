"use client";

import Image from "next/image";
import useBook from "./hooks/useBook";

const Book = () => {
  const { isLoading, isError, bookContent } = useBook();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <section className="my-10 py-10">
      <div className="flex justify-around items-center">
        <div className="">
          <Image
            src="/assets/backward-arrow.svg"
            alt="backward-arrow"
            width={25}
            height={10}
          />
        </div>
        <div className="h-[200px]"></div>
        <div className="">
          <Image
            src="/assets/forward-arrow.svg"
            alt="forward-arrow"
            width={25}
            height={10}
          />
        </div>
      </div>
    </section>
  );
};

export default Book;
