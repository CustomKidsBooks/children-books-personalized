"use client";

import { faChildReaching } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Tag from "../Tag";
import LibrarySkeleton from "./LibraryCard.skeleton";
import useLibraryCard from "./hooks/useLibraryCard";
import { BookValues } from "@utils/interfaces";

interface LibraryValues {
  search?: string;
}

const LibraryCard = ({ search }: LibraryValues) => {
  const router = useRouter();
  const { isLoading, isError, bookData } = useLibraryCard();

  const books: BookValues[] = search
    ? bookData.filter((book) => book.tag?.toLowerCase().includes(search.trim()))
    : bookData;

  if (isLoading) {
    return <LibrarySkeleton />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (bookData.length === 0) {
    return <h1 className="text p-4">You don't have any book!</h1>;
  }

  return (
    <section className="py-10">
      <div className="place-items-center lg:grid lg:grid-cols-4 gap-4 flex overflow-x-auto">
        {books.map((book) => (
          <div
            className="card snap-center transition duration-300 ease-in-out hover:scale-110"
            key={book.id}
            onClick={() => router.push(`/draft/${book.id}`)}
          >
            <div className="object-contain h-[164px] w-[280px] relative">
              <Image
                src={
                  book.image
                    ? `/assets/images/family.jpg`
                    : "/assets/images/family.jpg"
                }
                alt="book_cover"
                fill={true}
              />
            </div>
            <div className="p-2 flex justify-between items-center">
              <p
                className={`${
                  book.title.length > 13 ? "text text-xl" : "text"
                }`}
              >
                {book.title}
              </p>
              <div className="flex gap-2 ">
                <FontAwesomeIcon
                  icon={faChildReaching}
                  className="fa-icon place-self-center"
                />
                <p className="text-pine-green">2-3</p>
              </div>
            </div>
            <div>{book.tag && <Tag tag={book.tag} />}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LibraryCard;
