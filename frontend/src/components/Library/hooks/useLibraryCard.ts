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

  const userEmail = user && user.email;

  useEffect(() => {

    // if (userEmail) {
    //   axios
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
    //   axios
    //     .get(`/api/books`)
    //     .then((res) => {
    //       setBookData(res.data);
    //     })
    //     .catch((err) => {
    //       setIsError(true);
    //       console.log(err);
    //     })
    //     .finally(() => setIsLoading(false));
    // }

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
  }, [userEmail]);

  return {
    isLoading,
    isError,
    bookData,
  };
};

export default useLibraryCard;
