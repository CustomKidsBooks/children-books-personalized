import { axiosInstance } from "@services/api-client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface BookContentValues {
  id: number;
  image: string;
  paragraph: string;
}

interface GetBookValues {
  isLoading: boolean;
  isError: boolean;
  bookContent: BookContentValues[];
}

const useGetBookPages = (id: number): GetBookValues => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookContent, setBookContent] = useState<BookContentValues[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`/api/books/${id}/pages`)
      .then((res) => {
        setBookContent(res.data);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return {
    isLoading,
    isError,
    bookContent,
  };
};

export default useGetBookPages;
