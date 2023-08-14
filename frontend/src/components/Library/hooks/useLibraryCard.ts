import { axiosInstance } from "@services/api-client";
import { useEffect, useState } from "react";

interface BookValues {
  id: number;
  title: string;
  desc?: string;
  author?: string;
  page?: number;
  image?: string;
}

const useLibraryCard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookData, setBookData] = useState<BookValues[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/api/books")
      .then((res) => {
        setBookData(res.data);
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
    bookData,
  };
};

export default useLibraryCard;
