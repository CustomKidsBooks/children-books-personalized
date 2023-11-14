/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import useGetBookPages from "./hooks/useGetBookPages";

interface BookValues {
  id: number;
}

const ViewBook = ({ id }: BookValues) => {
  const router = useRouter();
  let {
    isLoading,
    isError,
    pageNumber,
    pageImage,
    pageParagraph,
    displayNextPage,
    displayPreviousPage,
    message,
    previewImage,
  } = useGetBookPages(id);

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
          <Button
            onClick={displayPreviousPage}
            className="shadow-none disabled:opacity-50"
          >
            <Image
              src="/assets/backward-arrow.svg"
              alt="backward-arrow"
              width={25}
              height={10}
              className="hover:cursor-pointer fill-amber-100"
            />
          </Button>
        </div>
        <div className="h-[480px] w-4/6 flex flex-col md:flex-row rounded-lg overflow-hidden drop-shadow-xl">
          <span
            className="md:absolute md:block md:z-[1] md:border md:border-slate-300 md:border-solid md:inset-x-2/4 md:inset-y-0"
            area-hidden="true"
          ></span>
          <div className="md:w-3/4">
            <div className="relative h-full w-full">
              {previewImage ? (
                <div>
                  <Image
                    className="preview h-full w-full"
                    src={`${previewImage}`}
                    alt=""
                    height={200}
                    width={200}
                  />
                </div>
              ) : (
                <Image
                  src={`${pageImage}`}
                  alt="book_cover"
                  height={200}
                  width={200}
                  className="h-full w-full"
                />
              )}
              <p className="absolute bottom-3 left-5 font-bold">{pageNumber}</p>
            </div>
          </div>
          <div className="md:w-1/4  overflow-auto scrollbar bg-yellow relative flex items-start font-quicksand font-semibold">
            <p className="m-4 leading-10 text-base md:text-2xl tracking-widest font-semibold">
              {pageParagraph}
            </p>

            <div className="fixed bottom-3 right-5">{pageNumber + 1}</div>
          </div>
        </div>
        <div className="w-1/6 flex justify-center text-green-500">
          <Button
            onClick={displayNextPage}
            className="shadow-none disabled:opacity-50"
          >
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
        <div className="flex flex-col md:flex-row md:space-x-10 md:justify-center font-bold text-2xl">
          <Button
            className="sm:w-3/4 text-center px-2 py-4"
            intent="teal"
            size="medium"
            onClick={() => router.push(`/draft/${id}`)}
          >
            Edit Book
          </Button>
          <Button
            className="sm:w-3/4 text-center mt-3 md:mt-0 px-2 py-4"
            intent="teal"
            size="medium"
            onClick={() => router.push(`/download/${id}`)}
          >
            Download Book
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ViewBook;
