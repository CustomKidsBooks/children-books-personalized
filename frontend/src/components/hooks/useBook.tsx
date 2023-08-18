import { axiosInstance } from "@services/api-client";
import { useEffect, useState } from "react";

interface BookContentValues {
  id: number;
  image?: string;
  paragraph?: string;
}

const useBook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookContent, setBookContent] = useState<BookContentValues[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/api/books/16/pages")
      .then((res) => {
        setBookContent(res.data);
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
  };
};

export default useBook;
