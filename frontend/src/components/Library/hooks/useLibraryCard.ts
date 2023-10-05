import { useUser } from "@auth0/nextjs-auth0/client";
import { axiosInstance } from "@services/api-client";
import { BookValues } from "@utils/interfaces";
import { useEffect, useState } from "react";

const useLibraryCard = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookData, setBookData] = useState<BookValues[]>([]);

  const userEmail = user && user.email;

  useEffect(() => {
    // if (userEmail) {
    //   axiosInstance
    //     .get(`/api/books?userEmail=${userEmail}`)
    //     .then((res) => {
    //       setBookData(res.data);
    //     })
    //     .catch((err) => {
    //       setIsError(true);
    //       console.log(err);
    //     })
    //     .finally(() => setIsLoading(false));
    // } else {
    //   axiosInstance
    //     .get(`/api/books/`)
    //     .then((res) => {
    //       setBookData(res.data);
    //     })
    //     .catch((err) => {
    //       setIsError(true);
    //       console.log(err);
    //     })
    //     .finally(() => setIsLoading(false));
    // }

    axiosInstance
      .get(`/api/books/`)
      .then((res) => {
        setBookData(res.data);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [userEmail]);

  return {
    isLoading,
    isError,
    bookData,
  };
};

export default useLibraryCard;
