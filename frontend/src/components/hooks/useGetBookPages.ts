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
  pageNumber: number;
  pageImage: string;
  pageParagraph: string;
  displayNextPage: () => void;
  displayPreviousPage: () => void;
  editImage: boolean | null;
  setEditImage: Dispatch<SetStateAction<boolean | null>>;
  previewImage: string | null;
  setPreviewImage: Dispatch<SetStateAction<string | null>>;
  editParagraph: boolean | null;
  setEditParagraph: Dispatch<SetStateAction<boolean | null>>;
  updateBookPages: (paragraph?: string, image?: string | null) => void;
  message: string;
}

const useGetBookPages = (id: number): GetBookValues => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [bookContent, setBookContent] = useState<BookContentValues[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageId, setPageId] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageImage, setPageImage] = useState<string>("");
  const [pageParagraph, setPageParagraph] = useState<string>("");

  const [editParagraph, setEditParagraph] = useState<boolean | null>(null);
  const [editImage, setEditImage] = useState<boolean | null>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axiosInstance
      .get(`/api/books/${id}/pages`)
      .then((res) => {
        setBookContent(res.data);
        setPageId(res.data[currentPage].id);
        setPageImage(res.data[currentPage].image);
        setPageParagraph(res.data[currentPage].paragraph);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, [id, editParagraph, editImage]);

  const totalPages = bookContent.length;

  const displayNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevState) => prevState + 1);
      setPageNumber((prevState) => prevState + 2);
      setPageImage(bookContent[currentPage + 1].image);
      setPageParagraph(bookContent[currentPage + 1].paragraph);
    }
  };

  const displayPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevState) => prevState - 1);
      setPageNumber((prevState) => prevState - 2);
      setPageImage(bookContent[currentPage - 1].image);
      setPageParagraph(bookContent[currentPage - 1].paragraph);
    }
  };

  const updateBookPages = async (
    paragraph?: string,
    newImageUrl?: string | null
  ) => {
    let formData = {
      paragraph,
      newImageUrl,
    };
    await axiosInstance
      .put(`/api/pages/${pageId}`, formData)
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

  return {
    isLoading,
    isError,
    pageNumber,
    pageImage,
    pageParagraph,
    displayNextPage,
    displayPreviousPage,
    editImage,
    setEditImage,
    previewImage,
    setPreviewImage,
    editParagraph,
    setEditParagraph,
    updateBookPages,
    message,
  };
};

export default useGetBookPages;
