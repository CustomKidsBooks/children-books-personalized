import { axiosInstance } from "@services/api-client";
import { useEffect, useState } from "react";

interface BookContentValues {
  id: number;
  image: string;
  paragraph: string;
}

const useBook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookContent, setBookContent] = useState<BookContentValues[]>([]);

  let [pageNumber, setPageNumber] = useState(0);
  let [image, setImage] = useState("");
  let [paragraph, setParagraph] = useState("");

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
  };
};

export default useBook;
