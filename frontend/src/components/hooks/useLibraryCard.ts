import { useUser } from "@auth0/nextjs-auth0/client";
import { BookValues } from "@utils/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

const useLibraryCard = (
  userID?: string | null,
  currentPage?: number,
  search?: string,
  booksPerPage?: number
) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookData, setBookData] = useState<BookValues[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const url = userID
    ? `/api/protected/books/${userID}`
    : `/api/books?page=${currentPage}&limit=${booksPerPage}&search=${search}`;

  // TODO : Implement Abort request in case of search to cancel the unwanted request while typing the search

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        if (userID) {
          setBookData(res.data);
        } else {
          setBookData(res.data.books);
          setTotalPages(res.data.totalPages);
        }
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, [currentPage, search]);

  return {
    isLoading,
    isError,
    bookData,
    totalPages,
  };
};

export default useLibraryCard;
