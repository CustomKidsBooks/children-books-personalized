import { BookValues } from "@utils/interfaces";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { axiosInstance } from "@services/api-client";

const useGetBooks = (
  userID?: string | null,
  currentPage?: number,
  search?: string,
  booksPerPage?: number
) => {
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [books, setBooks] = useState<BookValues[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const url = userID
    ? `/api/books/${userID}`
    : `/api/books?page=${currentPage || 1}&limit=${booksPerPage}&search=${
        search || ""
      }`;

  useEffect(() => {
    if (userID) {
      getAccessTokenSilently()
        .then((token) =>
          axiosInstance.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
        .then((res) => {
          setBooks(res.data);
        })
        .catch((err) => {
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      axiosInstance
        .get(url)
        .then((res) => {
          setBooks(res.data.books);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [currentPage, search]);

  return {
    isLoading,
    isError,
    books,
    totalPages,
  };
};

export default useGetBooks;
