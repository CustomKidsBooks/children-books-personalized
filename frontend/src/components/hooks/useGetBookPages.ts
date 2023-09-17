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
  previewImage: string | null;
  setPreviewImage: Dispatch<SetStateAction<string | null>>;
  paragraph: string;
  editParagraph: boolean | null;
  setEditParagraph: Dispatch<SetStateAction<boolean | null>>;
  editImage: boolean | null;
  setEditImage: Dispatch<SetStateAction<boolean | null>>;
  pageNumber: number;
  displayNextPage: () => void;
  displayPreviousPage: () => void;
  updateBookPages: (paragraph?: string, image?: File) => void;
  resetData: () => void;
}

// TODO: update API to insert dynamic bookID.

const useGetBookPages = (): GetBookValues => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookContent, setBookContent] = useState<BookContentValues[]>([]);

  const [page, setPage] = useState<number>(0);
  const [pageId, setPageId] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [image, setImage] = useState<string>("");
  const [paragraph, setParagraph] = useState<string>("");

  const [editParagraph, setEditParagraph] = useState<boolean | null>(null);
  const [editImage, setEditImage] = useState<boolean | null>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [tryAgain, setTryAgain] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axiosInstance
      .get("/api/books/7/pages")
      .then((res) => {
        setBookContent(res.data);
        setPageId(res.data[page].id);
        setImage(res.data[page].image);
        setParagraph(res.data[page].paragraph);
        setTryAgain(false)
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [
    page,
    pageNumber,
    image,
    paragraph,
    pageId,
    editParagraph,
    editImage,
    tryAgain,
  ]);

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

  const updateBookPages = async (paragraph?: string, image?: File) => {
    const formData = new FormData();

    paragraph
      ? formData.append("paragraph", paragraph)
      : image
      ? formData.append("image", image)
      : undefined;

    await axiosInstance
      .put(`/api/pages/${pageId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setMessage(res.data.message);
        setEditParagraph(null);
        setEditImage(false);
        setPreviewImage(null);
      })
      .catch((err) => {
        setMessage(err.message);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const resetData = () => {
    setTryAgain(true)
    setEditImage(false)
    setEditParagraph(false)
    setPreviewImage(null)
  };

  return {
    isLoading,
    isError,
    message,
    image,
    previewImage,
    setPreviewImage,
    paragraph,
    pageNumber,
    editParagraph,
    setEditParagraph,
    editImage,
    setEditImage,
    displayNextPage,
    displayPreviousPage,
    updateBookPages,
    resetData,
  };
};

export default useGetBookPages;
