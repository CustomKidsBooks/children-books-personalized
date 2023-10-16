import axios from "axios";
import { useEffect, useState } from "react";

const useUpdateBookPages = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookData, setBookData] = useState();

  useEffect(() => {
    axios
      .put("/api/pages/4")
      .then((res) => {
        setBookData(res.data.message);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    isError,
    bookData,
  };
};

export default useUpdateBookPages;
