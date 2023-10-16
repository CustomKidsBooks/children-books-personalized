import { BookValues } from "@utils/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";


const useGetBook = (id: number) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [bookData, setBookData] = useState<BookValues>();
  
    useEffect(() => {
      axios
        .get(`/api/book/${id}`)
        .then((res) => {
          setBookData(res.data.data);          
        })
        .catch((err) => {
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }, [id]);
  
    return {
      isLoading,
      isError,
      bookData,
    };

}

export default useGetBook;