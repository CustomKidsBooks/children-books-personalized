"use client";

import { faChildReaching } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Tag from "../Tag";
import LibrarySkeleton from "./LibraryCard.skeleton";
import useLibraryCard, { BookValues } from "./hooks/useLibraryCard";

interface LibraryValues {
  search?: string;
}

const LibraryCard = ({ search }: LibraryValues) => {
  const router = useRouter();
  const { isLoading, isError, bookData } = useLibraryCard();
  let tag: string[] = ["family", "divorce", "love"];

  const books: BookValues[] = search
    ? bookData.filter((book) =>
        book.title.toLowerCase().includes(search.trim())
      )
    : bookData;

  if (isLoading) {
    return <LibrarySkeleton />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <section className="py-10">
      <div className="place-items-center lg:grid lg:grid-cols-4 gap-4 flex overflow-x-auto">
        {books.map((book) => (
          <div
            className="card snap-center transition duration-300 ease-in-out hover:scale-110"
            key={book.id}
            onClick={() => router.push(`/preview-book/${book.id}`)}
          >
            <div className="object-contain h-[164px] w-[247.324px] relative">
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
            <Tag tag={tag} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LibraryCard;
