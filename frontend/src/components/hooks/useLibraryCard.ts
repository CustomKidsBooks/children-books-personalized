import { BookValues } from "@utils/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useLibraryCard = (
  userID?: string | null,
  currentPage?: number,
  search?: string,
  booksPerPage?: number
) => {
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookData, setBookData] = useState<BookValues[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const url = userID
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${userID}`
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books?page=${currentPage || 1}&limit=${booksPerPage}&search=${search || ''}`;

  useEffect(() => {
    if (userID) {
      getAccessTokenSilently()
        .then((token) =>
          axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
        .then((res) => {
          setBookData(res.data);
        })
        .catch((err) => {
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      axios
        .get(url)
        .then((res) => {
          setBookData(res.data.books);
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
    bookData,
    totalPages,
  };
};

export default useLibraryCard;
