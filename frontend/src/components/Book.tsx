"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import useBook from "./hooks/useBook";
import { Button } from "./ui/Button";

const Book = () => {
  let {
    isLoading,
    isError,
    message,
    image,
    paragraph,
    editParagraph,
    setEditParagraph,
    pageNumber,
    displayNextPage,
    displayPreviousPage,
    updateBookPages,
  } = useBook();

  const paragraphRef = useRef<HTMLTextAreaElement>(null);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <div>{message}</div>;
  }

  return (
    <section className="my-10 py-10">
      <div className="flex justify-around items-center">
        <div className="w-1/6 flex justify-center fill-amber-100">
          <Button onClick={displayPreviousPage} className="shadow-none">
            <Image
              src="/assets/backward-arrow.svg"
              alt="backward-arrow"
              width={25}
              height={10}
              className="hover:cursor-pointer fill-amber-100"
            />
          </Button>
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
            {editParagraph ? (
              <textarea
                className="m-4 leading-10 text-xl tracking-widest box-border h-full bg-yellow-200"
                rows={8}
                ref={paragraphRef}
                defaultValue={paragraph}
                name="paragraph"
              />
            ) : (
              <p className="m-4 leading-10 text-xl tracking-widest">
                {paragraph}
              </p>
            )}

            <div className="absolute bottom-3 right-5">{pageNumber + 1}</div>
          </div>
        </div>
        <div className="w-1/6 flex justify-center text-green-500">
          <Button onClick={displayNextPage} className="shadow-none">
            <Image
              src="/assets/forward-arrow.svg"
              alt="forward-arrow"
              width={25}
              height={10}
              className="hover:cursor-pointer"
            />
          </Button>
        </div>
      </div>
      <div className="w-4/6 mx-auto my-10 py-10">
        <div className="flex flex-col md:flex-row md:space-x-10 md:justify-center">
          <Button
            className="sm:w-3/4 text-center"
            intent="teal"
            size="medium"
            onClick={() => setEditParagraph(!editParagraph)}
          >
            Edit Paragraph
          </Button>
          <Button
            className="sm:w-3/4 text-center mt-3 md:mt-0"
            intent="teal"
            size="medium"
            onClick={() => {}}
          >
            Edit Image
          </Button>
        </div>
        <div className="mt-7 md:mt-5 flex flex-col md:flex-row md:space-x-10 md:justify-center">
          <Button
            className="sm:w-3/4 md:w-2/4 text-center capitalize"
            intent="pink"
            size="medium"
            onClick={() => {
              updateBookPages(image, paragraphRef.current?.value);
            }}
          >
            Done
          </Button>
        </div>
        <div className="mt-5 sm:w-3/4 md:w-full text-center font-quicksand">
          <Link href="#" className="underline underline-offset-3 font-semibold">
            Try Again!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Book;
