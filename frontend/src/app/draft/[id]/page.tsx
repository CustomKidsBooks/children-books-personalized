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
  const { editBookContent, setEditBookContent } = useGetBookPages(id);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [size, setSize] = useState<number>(12);
  const [backgroundColor, setBackgroundColor] = useState<string | null>(null);
  const [textColor, setTextColor] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isMenuVisible, setMenuVisibility] = useState<Boolean>(false);

  useEffect(() => {
    if (user?.sub && user?.sub === bookData?.userID) {
      setIsAuthenticated(true);
    }
  });
  useEffect(() => {
    if (!backgroundColor) return;
    const allPages = [...editBookContent];
    allPages[currentPage] = {
      ...allPages[currentPage],
      backgroundColor
    }
    setEditBookContent(allPages);
    console.log("all", allPages);
  }, [backgroundColor])

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <div>Error...</div>;
  }
  if (size > 18) {
    setSize(18);
  }
  if (size < 8) {
    setSize(8);
  }
  const toggleMenuVisibility = () => {
    setMenuVisibility(!isMenuVisible)
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
              <span className="font-semibold">Background Color :
                <PageColor
                  backgroundColor={backgroundColor}
                  setTextColor={setTextColor}
                  setBackgroundColor={setBackgroundColor}
                />
              </span>
            </p>
            <p className="text-xl mr-2">
              <span className="font-semibold">Text Color :
                <PageColor
                  backgroundColor={backgroundColor}
                  setTextColor={setTextColor}
                  setBackgroundColor={setBackgroundColor}

                />
              </span>
            </p>
            <h2 className="text-xl mr-1">
              <div className="relative inline-block text-left">
                <div>
                  <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="false" onClick={toggleMenuVisibility} aria-haspopup="true">
                    Text Size
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                {isMenuVisible && (
                  <div className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    <div className="py-1" role="none">
                      <a href="#" onClick={() => setSize(size + 2)} className="text-gray-900 block px-4 py-2 text-md" role="menuitem" id="menu-item-0">Increase</a>
                      <a href="#" onClick={() => setSize(size - 2)} className="text-gray-900 block px-4 py-2 text-md" role="menuitem" id="menu-item-1">Decrease</a>
                    </div>
                  </div>)}
              </div>
            </h2>
            <h2 className="text-xl mr-1">
              <span className="font-semibold">Image Size :</span>
            </h2>
          </div>
        </div>
        <div>
          <Book id={id} isAuthenticated={isAuthenticated} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </section>
  );
};

export default Draft;
