import { axiosInstance } from "@services/api-client";
import { useEffect, useState } from "react";

interface BookContentValues {
  id: number;
  image: string;
  paragraph: string;
}

// TODO: update API to insert dynamic bookID.

const useBook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookContent, setBookContent] = useState<BookContentValues[]>([]);

  let [page, setPage] = useState(0);
  let [pageNumber, setPageNumber] = useState(1);
  let [image, setImage] = useState<String>("");
  let [paragraph, setParagraph] = useState<String>("");

  useEffect(() => {
    axiosInstance
      .get("/api/books/17/pages")
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

  return {
    isLoading,
    isError,
    bookContent,
    image,
    setImage,
    paragraph,
    setParagraph,
    pageNumber,
    setPageNumber,
    page,
    setPage,
  };
};

export default useBook;
