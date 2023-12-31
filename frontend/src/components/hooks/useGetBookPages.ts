import { axiosInstance } from "@services/api-client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface BookContentValues {
  id: number;
  image: string;
  paragraph: string | undefined;
  textColor:  string | undefined;
  backgroundColor: string | undefined;
}

interface GetBookValues {
  isLoading: boolean;
  isError: boolean;
  bookContent: BookContentValues[];
  editBookContent: BookContentValues[];
  setEditBookContent: Dispatch<SetStateAction<BookContentValues[]>>;
}

const useGetBookPages = (id: number): GetBookValues => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookContent, setBookContent] = useState<BookContentValues[]>([]);
  const [editBookContent, setEditBookContent] = useState<BookContentValues[]>(
    []
  );

  useEffect(() => {
    axiosInstance
      .get(`/api/books/${id}/pages`)
      .then((res) => {
        setBookContent(res.data);
        setEditBookContent(res.data);
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
    editBookContent,
    setEditBookContent,
  };
};

export default useGetBookPages;
