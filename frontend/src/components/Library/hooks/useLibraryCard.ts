import { useUser } from "@auth0/nextjs-auth0/client";
import { axiosInstance } from "@services/api-client";
import { BookValues } from "@utils/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

const useLibraryCard = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookData, setBookData] = useState<BookValues[]>([]);
  console.log("user", user);

  useEffect(() => {
    axios
      .get(`/api/books`)
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
