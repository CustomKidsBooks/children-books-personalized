import Image from "next/image";
import { LinkButton } from "./ui/LinkButton";
import { User } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import useGetBooks from "./hooks/useGetBooks";
import Pagination from "./Pagination";
import BookCard from "./BookCard";
import { BookValues } from "@utils/interfaces";
import { Button } from "./ui/Button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LibrarySkeleton from "./skeleton/LibraryCard.skeleton";
interface UserProfileValues {
  user: User;
}

const UserProfile = ({ user }: UserProfileValues) => {
  const [privacy, setPrivacy] = useState("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [firstPage, setFirstPage] = useState<number>(1);
  const [booksToDisplay, setBooksToDisplay] = useState<BookValues[]>([]);

  const { isLoading, isError, books, changeBookPrivacy, deleteBook } =
    useGetBooks(user?.sub);

  let totalBooks: BookValues[] = books;
  if (privacy !== "all") {
    totalBooks = books.filter((book) => book.privacy === privacy);
  }

  const booksPerPage = 8;
  const pagesToDisplay = 3;
  const totalPages = Math.ceil(totalBooks.length / booksPerPage);

  useEffect(() => {
    setBooksToDisplay(() =>
      totalBooks.filter(
        (book: BookValues, i) =>
          i >= booksPerPage * 1 - 1 - (booksPerPage - 1) &&
          i <= booksPerPage * 1 - 1
      )
    );
    const pageSet = Math.ceil(1 / pagesToDisplay);
    setFirstPage(pageSet * pagesToDisplay - pagesToDisplay + 1);
    setCurrentPage(1);
  }, [books, privacy]);

  const displaySelectedPage = (selectedPage: number) => {
    const pageSet = Math.ceil(selectedPage / pagesToDisplay);
    setFirstPage(pageSet * pagesToDisplay - pagesToDisplay + 1);
    setCurrentPage(selectedPage);
    setBooksToDisplay(() =>
      totalBooks.filter(
        (book: BookValues, i) =>
          i >= booksPerPage * selectedPage - 1 - (booksPerPage - 1) &&
          i <= booksPerPage * selectedPage - 1
      )
    );
  };

  return (
    <>
      <section className="bg-teal ">
        <div className="mx-10 flex justify-between py-14 md:py-0">
          <div className="flex items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose">
                Hello,
              </h1>
            </div>
            <div className="">
              <h1 className="ms-4 p-8 sm:p-10 bg-user-profile bg-cover bg-center bg-no-repeat font-pacifico text-pink font_feature text-4xl sm:text-5xl md:text-6xl">
                {user?.nickname || user?.name}
              </h1>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="/assets/group18.svg"
              alt="group18"
              width={183.817}
              height={295.488}
            />
          </div>
        </div>
      </section>
      <section className="p-10 h-auto">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="relative inline-block">
            <Image
              src="/assets/library.jpg"
              alt="Library"
              width={247}
              height={126}
            />
            <h1 className="absolute top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 md:text-4xl text-3xl font-quicksand font-medium">
              Library
            </h1>
          </div>
          <div className="flex justify-center gap-3 items-center mt-5 md:mt-0 md:me-10">
            <label className="label-input font-bold">Content Privacy</label>
            <select
              name="privacy"
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className="flex rounded-lg my-3 p-3 text-base md:text-lg lg:text-xl text-black outline-0 shadow"
            >
              <option value="all">All</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        <div>
          {!isLoading && !isError && booksToDisplay.length === 0 && (
            <h1 className="py-14 text p-4">
              You don't have any {privacy} book!
            </h1>
          )}
          {isLoading && <LibrarySkeleton />}
          {isError && (
            <h1 className="py-14 text-red-600 text-xl font-semibold flex items-center justify-center">
              Error
            </h1>
          )}
        </div>
        {booksToDisplay.length > 0 && (
          <div className="pt-14 pb-10 place-items-center lg:grid lg:grid-cols-4 gap-x-4 gap-y-14 flex overflow-x-auto scrollbar">
            {booksToDisplay.map((book) => (
              <div key={book.id}>
                <BookCard {...book} />
                <div className="flex mt-5 mx-2 justify-between items-center">
                  <div className="flex gap-3 justify-center">
                    <Button
                      className={`text-black capitalize text-sm ${
                        book.privacy === "public"
                          ? "bg-gray-500 text-white"
                          : ""
                      }`}
                      size="medium"
                      onClick={() => changeBookPrivacy(book.id, "public")}
                    >
                      Public
                    </Button>
                    <Button
                      className={`text-black capitalize text-sm ${
                        book.privacy === "private"
                          ? "bg-gray-500 text-white"
                          : ""
                      }`}
                      size="medium"
                      onClick={() => changeBookPrivacy(book.id, "private")}
                    >
                      Private
                    </Button>
                  </div>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="fa-icon hover:cursor-pointer"
                    onClick={() => deleteBook(book.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <Pagination
          firstPage={firstPage}
          currentPage={currentPage}
          pagesToDisplay={pagesToDisplay}
          displaySelectedPage={displaySelectedPage}
          totalPages={totalPages}
        />
      </section>

      <section className="bg-pink px-10 py-16 flex flex-col justify-center gap-12 lg:h-96 ">
        <div>
          <h1 className="text text-center text-white text-3xl sm:text-4xl md:text-5xl ">
            What story would you like to tell today?
          </h1>
        </div>
        <div className="mx-auto">
          <LinkButton
            href="/create-story"
            intent="teal"
            size="large"
            className="tracking-widest text-center text-base md:text-2xl"
          >
            Start my new book!
          </LinkButton>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
