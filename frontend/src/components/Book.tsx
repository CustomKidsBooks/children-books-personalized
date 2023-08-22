"use client";

import Image from "next/image";
import useBook from "./hooks/useBook";

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
  } = useBook();

  let totalPages = bookContent.length;
  const displayNextPage = () => {
    if (pageNumber < totalPages - 1) {
      setPageNumber(++pageNumber);
      setImage(bookContent[pageNumber].image);
      setParagraph(bookContent[pageNumber].paragraph);
      console.log("current Page", pageNumber);
    }
  };
  const displayPreviousPage = () => {
    if (pageNumber > 0) {
      setPageNumber(--pageNumber);
      setImage(bookContent[pageNumber].image);
      setParagraph(bookContent[pageNumber].paragraph);
      console.log("current Page", pageNumber);
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
        <div className="w-1/6 flex justify-center">
          <Image
            src="/assets/backward-arrow.svg"
            alt="backward-arrow"
            width={25}
            height={10}
            className="hover:cursor-pointer"
            onClick={displayPreviousPage}
          />
        </div>
        <div className="h-96 w-4/6 flex border rounded-lg overflow-hidden drop-shadow-xl">
          <div
            className="bg-cover bg-center bg-no-repeat w-3/4"
            style={{
              backgroundImage: `url(http://localhost:5001/${image})`,
            }}
          >
            <div className="w-4/6 border-r-2 h-full drop-shadow-lg"></div>
          </div>

          {/* <img
            src={`http://localhost:5001/${image}`}
            alt=""
            className="w-3/4"
          /> */}
          <div className="w-1/4 bg-yellow-200 flex items-center font-quicksand font-semibold">
            <p className="m-2 leading-10 text-2xl tracking-widest">
              {paragraph}
            </p>
          </div>
        </div>
        <div className="w-1/6 flex justify-center">
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
