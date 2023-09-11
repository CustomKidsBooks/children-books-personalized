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
  message: string;
  image: string;
  paragraph: string;
  editParagraph: boolean;
  setEditParagraph: Dispatch<SetStateAction<boolean>>;
  pageNumber: number;
  displayNextPage: () => void;
  displayPreviousPage: () => void;
  updateBookPages: (image: string, paragraph?: string) => void;
}

// TODO: update API to insert dynamic bookID.

const useBook = (): GetBookValues => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookContent, setBookContent] = useState<BookContentValues[]>([]);

  const [page, setPage] = useState<number>(0);
  const [pageId, setPageId] = useState<number|null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [image, setImage] = useState<string>("");
  const [paragraph, setParagraph] = useState<string>("");

  const [editParagraph, setEditParagraph] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axiosInstance
      .get("/api/books/5/pages")
      .then((res) => {
        setBookContent(res.data); 
        setPageId(res.data[page].id)   
        // console.log('pageId', pageId);
            
        setImage(res.data[page].image);
        setParagraph(res.data[page].paragraph);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [page, pageNumber, image, paragraph, pageId]);

  const totalPages = bookContent.length;

  const displayNextPage = () => {
    if (page < totalPages - 1) {
      setPage((prevState) => prevState + 1);
      setPageNumber((prevState) => prevState + 2);
      setImage(bookContent[page].image);
      setParagraph(bookContent[page].paragraph);
    }
  };

  const displayPreviousPage = () => {
    if (page > 0) {
      setPage((prevState) => prevState - 1);
      setPageNumber((prevState) => prevState - 2);
      setImage(bookContent[page].image);
      setParagraph(bookContent[page].paragraph);
    }
  };

  console.log('book content', bookContent);
  

  const updateBookPages = async (image: string, paragraph?: string) => {
    await axiosInstance
      .put(`/api/pages/${pageId}`, { paragraph, image })
      .then((res) => {
        setMessage(res.data.message);
        console.log(res.data);

        setEditParagraph(false);
      })
      .catch((err) => {
        setMessage(err.message);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    isLoading,
    isError,
    message,
    image,
    paragraph,
    pageNumber,
    editParagraph,
    setEditParagraph,
    displayNextPage,
    displayPreviousPage,
    updateBookPages
  };
};

export default useBook;
