"use client";

import { useAuth0 } from "@auth0/auth0-react";
import Book from "@components/Book";
import useGetBook from "@components/hooks/useGetBook";
import useGetBookPages from "@components/hooks/useGetBookPages";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PageColor } from "../../../components/PageColor";

interface DraftValues {
  id: number;
}

const Draft = ({ params }: { params: DraftValues }) => {
  const { user } = useAuth0();
  const id = Number(params.id);
  const { isLoading, isError, bookData } = useGetBook(id);
  const { isLoading: isLoadingPage, editBookContent, setEditBookContent, bookContent } = useGetBookPages(id);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [size, setSize] = useState<number>(20);
  const [backgroundColor, setBackgroundColor] = useState<string | null>(null);
  const [textColor, setTextColor] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    if (user?.sub && user?.sub === bookData?.userID) {
      setIsAuthenticated(true);
    }
  });
  useEffect(() => {
    const allPages = [...editBookContent];
    allPages[currentPage] = {
      ...allPages[currentPage],
      backgroundColor: backgroundColor ?? undefined,
      textColor: textColor ?? undefined,
      size: size ?? undefined,
    }
    setEditBookContent(allPages);
  }, [backgroundColor, textColor, size])

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  if (size > 24) {
    setSize(24);
  }
  if (size < 12) {
    setSize(12);
  }

  return (
    <section className="w-full py-10 mt-5 sm:bg-ellipse bg-no-repeat bg-auto bg-right-bottom">
      <div className="w-4/6 mx-auto">
        <div className="relative">
          <Image
            src="/assets/draft.png"
            alt="book-title"
            width={200}
            height={3}
          />
          <div className="absolute top-1/2 left-20 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-70 p-2 whitespace-nowrap">
            <h1 className="mt-0 font-normal text-3xl md:text-4xl text-green font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose">
              Draft{" "}
            </h1>
          </div>
        </div>
      </div>
      <div className="sm:bg-flower bg-no-repeat bg-right bg-contain">
        <div className="w-4/6 my-10 mx-auto font-quicksand">
          <h2 className="text-xl">
            <span className="font-semibold">Title :</span> {bookData?.title}
          </h2>
          <h2 className="text-xl mt-3">
            <span className="font-semibold">Story :</span> {bookData?.subject}{" "}
          </h2>
          <h2 className="text-xl mt-3 font-semibold">
            Back to{" "}
            <Link href="/create-story" className="text-pink">
              Create your{" "}
              <span className="font-pacifico font-normal">Story!</span>
            </Link>
          </h2>
          <div className="mt-3 grid grid-cols-4 gap-4">
            <p className="text-xl mr-2">
              <span className="font-semibold shadow-sm px-3 py-3">Background Color :
                <PageColor
                  backgroundColor={backgroundColor}
                  onChange={setBackgroundColor}
                />
              </span>
            </p>
            <p className="text-xl mr-2">
              <span className="font-semibold shadow-sm px-3 py-3">Text Color :
                <PageColor
                  backgroundColor={textColor}
                  onChange={setTextColor}
                />
              </span>
            </p>
            <h2 className="text-xl mr-1">
              <div className="flex items-center">
                <span className="font-semibold shadow-sm px-3 py-3">Font Size</span>
                <div className="text-size-container flex items-center">
                  <button
                    type="button"
                    className="text-control-button"
                    id="increase-button"
                    onClick={() => setSize(size + 2)}
                  >
                    <span className="icon">&#43;</span>
                  </button>
                  <button
                    type="button"
                    className="text-control-button"
                    id="decrease-button"
                    onClick={() => setSize(size - 2)}
                  >
                    <span className="icon">&#8722;</span>
                  </button>
                </div>
              </div>
            </h2>
          </div>
        </div>
        <div>
          <Book id={id} isAuthenticated={isAuthenticated} currentPage={currentPage} setCurrentPage={setCurrentPage}
            isLoading={isLoadingPage} isError={isError} bookContent={bookContent} setEditBookContent={setEditBookContent} editBookContent={editBookContent} />
        </div>
      </div>
    </section>
  );
};

export default Draft;
