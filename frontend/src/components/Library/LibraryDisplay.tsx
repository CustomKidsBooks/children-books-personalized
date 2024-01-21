import useGetBooks from "@components/hooks/useGetBooks";
import { useEffect } from "react";
import LibrarySkeleton from "./LibraryCard.skeleton";
import BookCard from "@components/BookCard";

interface LibraryDisplayValues {
  userID?: string | null;
  search?: string;
  privacy?: string;
  currentPage?: number;
  booksPerPage?: number;
  getTotalPages?: (arg: number) => void;
}

const LibraryDisplay = ({
  userID,
  search,
  currentPage,
  getTotalPages,
  booksPerPage,
}: LibraryDisplayValues) => {
  const { isLoading, isError, books, totalPages } = useGetBooks(
    userID,
    currentPage,
    search,
    booksPerPage
  );
  useEffect(() => {
    getTotalPages ? getTotalPages(totalPages) : "";
  }, [totalPages]);

  if (isLoading) {
    return <LibrarySkeleton />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (books.length === 0) {
    return (
      <section>
        <h1 className="text p-4">You don't have any book!</h1>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="py-3 place-items-center lg:grid lg:grid-cols-4 gap-4 flex overflow-x-auto scrollbar">
        {books!.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </section>
  );
};

export default LibraryDisplay;
