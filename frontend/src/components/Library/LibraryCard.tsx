import { faChildReaching } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Tag from "../Tag";
import useLibraryCard from "./hooks/useLibraryCard";

const LibraryCard = () => {
  const { isLoading, isError, bookData } = useLibraryCard();
  let tag: string[] = ["family", "divorce", "love"];

  console.log("book data", bookData);

  if (isLoading) {
    //TODO: ADD loading skeleton
    <div>Loading....</div>;
  }

  return (
    <section className="py-10 place-items-center grid lg:grid-cols-4 gap-4 w-full md:grid-cols-2 sm:grid-cols-1">
      {bookData.map((book) => (
        <div className="card" key={book.id}>
          <Image
            src={
              book.image
                ? `/assets/images/angel.jpg`
                : "/assets/images/family.jpg"
            }
            width={247.324}
            height={164}
            alt="book_info"
          />
          <div className="p-2 flex justify-between items-center">
            <p className="text">{book.title}</p>
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
    </section>
  );
};

export default LibraryCard;
