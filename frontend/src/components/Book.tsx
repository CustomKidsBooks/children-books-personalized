"use client";

import Image from "next/image";
import useGetBookPages from "./hooks/useGetBookPages";

const Book = () => {
  let {
    isError,
    isLoading,
    bookContent,
    pageNumber,
    setPageNumber,
    image,
    setImage,
    paragraph,
    setParagraph,
    page,
    setPage,
  } = useGetBookPages();

  let totalPages = bookContent.length;
  const displayNextPage = () => {
    if (page < totalPages - 1) {
      setPage(++page);
      setPageNumber(pageNumber + 2);
      setImage(bookContent[page].image);
      setParagraph(bookContent[page].paragraph);
    }
  };
  const displayPreviousPage = () => {
    if (page > 0) {
      setPage(--page);
      setPageNumber(pageNumber - 2);
      setImage(bookContent[page].image);
      setParagraph(bookContent[page].paragraph);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <section className="my-10 py-10">
      <div className="flex justify-around items-center">
        <div className="w-1/6 flex justify-center fill-amber-100">
          <Image
            src="/assets/backward-arrow.svg"
            alt="backward-arrow"
            width={25}
            height={10}
            className="hover:cursor-pointer fill-amber-100"
            onClick={displayPreviousPage}
          />
        </div>
        <div className="h-96 w-4/6 flex rounded-lg overflow-hidden drop-shadow-xl display_book">
          <div className="w-3/4">
            <div className="relative h-full w-full">
              <img
                src={`http://localhost:5001/${image}`}
                alt=""
                className="h-full w-full"
              />
              <p className="absolute bottom-3 left-5 font-bold">{pageNumber}</p>
            </div>
          </div>
          <div className="w-1/4 bg-yellow-200 relative flex items-center font-quicksand font-semibold">
            <p className="m-4 leading-10 text-xl tracking-widest">
              {paragraph}
            </p>
            <div className="absolute bottom-3 right-5">{pageNumber + 1}</div>
          </div>
        </div>
        <div className="w-1/6 flex justify-center text-green-500">
          <Image
            src="/assets/forward-arrow.svg"
            alt="forward-arrow"
            width={25}
            height={10}
            className="hover:cursor-pointer"
            onClick={displayNextPage}
          />
        </div>
      </div>
    </section>
  );
};

export default Book;
