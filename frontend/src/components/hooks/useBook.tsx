import { axiosInstance } from "@services/api-client";
import { useEffect, useState } from "react";

interface BookContentValues {
  id: number;
  image: string;
  paragraph: string;
}

interface GetBookValues {
  isLoading: boolean;
  isError: boolean;
  image: String;
  paragraph: String;
  pageNumber: number;
  displayNextPage: () => void;
  displayPreviousPage: () => void;
}

// TODO: update API to insert dynamic bookID.

const useBook = (): GetBookValues => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookContent, setBookContent] = useState<BookContentValues[]>([]);

  let [page, setPage] = useState(0);
  let [pageNumber, setPageNumber] = useState(1);
  let [image, setImage] = useState<String>("");
  let [paragraph, setParagraph] = useState<String>("");

  useEffect(() => {
    axiosInstance
      .get("/api/books/4/pages")
      .then((res) => {
        setBookContent(res.data);
        setImage(res.data[0].image);
        setParagraph(res.data[0].paragraph);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const totalPages = bookContent.length;

  const displayNextPage = () => {
    if (page < totalPages - 1) {
      setPage(++page);
      setPageNumber(pageNumber + 2);
      setImage(bookContent[page].image);
      setParagraph(bookContent[page].paragraph);
    }
  };

  const displayPreviousPage = () => {
    if (page > 0) {
      setPage(--page);
      setPageNumber(pageNumber - 2);
      setImage(bookContent[page].image);
      setParagraph(bookContent[page].paragraph);
    }
  };

  return {
    isLoading,
    isError,
    image,
    paragraph,
    pageNumber,
    displayNextPage,
    displayPreviousPage,
  };
};

export default useBook;
