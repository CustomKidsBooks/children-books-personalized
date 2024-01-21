"use client";

import { faChildReaching } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Tag from "@components/Tag";
import { BookValues } from "@utils/interfaces";

const BookCard = (book: BookValues) => {
  const router = useRouter();
  return (
    <div
      className="cursor-pointer card snap-center transition duration-300 ease-in-out hover:scale-105"
      key={book.id}
      onClick={() => router.push(`/view-book/${book.id}`)}
    >
      <div className="object-contain h-[164px] w-[280px] relative">
        <Image
          src={book.image ? `${book.image}` : "/assets/images/family.jpg"}
          alt="book_cover"
          fill={true}
        />
      </div>
      <div className="p-2 flex justify-between items-center">
        <p
          className={`${
            book.title.length > 13 ? "text text-xl" : "text-2xl"
          } text-ellipsis overflow-hidden whitespace-nowrap`}
        >
          {book.title}
        </p>
        <div className="flex gap-2">
          <FontAwesomeIcon
            icon={faChildReaching}
            className="fa-icon place-self-center"
          />
          <span
            className={`text-pine-green ${
              book.title.length > 13 ? "w-[45px]" : ""
            }`}
          >
            {book.ageGroup}
          </span>
        </div>
      </div>
      <div>{book.tag && <Tag tag={book.tag} />}</div>
    </div>
  );
};
export default BookCard;
