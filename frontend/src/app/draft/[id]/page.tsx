"use client";

import { useAuth0 } from "@auth0/auth0-react";
import Book from "@components/Book";
import useGetBook from "@components/hooks/useGetBook";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface DraftValues {
  id: number;
}

const Draft = ({ params }: { params: DraftValues }) => {
  const { user } = useAuth0();
  const id = Number(params.id);
  const { isLoading, isError, bookData } = useGetBook(id);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (user?.sub && user?.sub === bookData?.userID) {
      setIsAuthenticated(true);
    }
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <div>Error...</div>;
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
        </div>

        <div>
          <Book id={id} isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </section>
  );
};

export default Draft;
