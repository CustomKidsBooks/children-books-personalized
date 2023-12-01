/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/Button";
import useGetBookPages from "./hooks/useGetBookPages";
import { storage } from "../services/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import axios from "axios";
import { axiosInstance } from "@services/api-client";
import { useEditedBookContext } from "./context/EditedBookContext";

interface BookValues {
  id: number;
  isAuthenticated: boolean;
}

const Book = ({ id, isAuthenticated }: BookValues) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editImage, setEditImage] = useState<boolean>(false);
  const [editParagraph, setEditParagraph] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [isCleanup, setIsCleanup] = useState<boolean>(false);
  const [editedImages, setEditedImages] = useState<string[]>([]);
  let { isLoading, isError, bookContent, setEditBookContent, editBookContent } =
    useGetBookPages(id);

  const { updateEditedImages, updateEditedBookContent } =
    useEditedBookContext();
  const router = useRouter();
  useEffect(() => {
    if (isCleanup) {
      setEditedImages([]);
    }
    window.addEventListener("beforeunload", cleanup);
    return () => {
      window.removeEventListener("beforeunload", cleanup);
    };
  }, [isCleanup]);

  const cleanup = (event: Event) => {
    setIsCleanup(true);
  };
  const deleteImagesFromFirebase = async () => {
    for (const image of editedImages) {
      const imageNameToDelete = image.split("2F")[2].split("?")[0];
      const desertRef = ref(storage, `ChildrenBook/Image/${imageNameToDelete}`);
      await deleteObject(desertRef);
    }
    setEditedImages([]);
  };

  const reset = async () => {
    setCurrentPage(0);
    setEditBookContent(bookContent);
    setIsEdited(false);
    deleteImagesFromFirebase();
  };

  const paragraphRef = useRef<HTMLTextAreaElement>(null);

  const totalPages = editBookContent.length;
  let pageId = editBookContent[currentPage]?.id;
  let pageParagraph = editBookContent[currentPage]?.paragraph;
  let pageImage = editBookContent[currentPage]?.image;
  let pageNumber = currentPage * 2 + 1;

  const displayPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevState) => prevState - 1);
    }
  };

  const displayNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((preState) => preState + 1);
    }
  };

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    let imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    const storageRef = ref(storage, `ChildrenBook/Image/${imageName}`);
    const snapshot = await uploadBytes(storageRef, selectedFiles[0]);
    const uploadedImageurl = await getDownloadURL(storageRef);
    setPreviewImage(uploadedImageurl);
  };

  const handleUpdateImage = () => {
    if (previewImage) {
      setEditedImages((prev) => [...prev, previewImage]);
      pageImage = previewImage;
      const updatedBook = editBookContent.map((page) => {
        if (page.id === pageId) {
          return {
            ...page,
            image: previewImage,
          };
        } else {
          return page;
        }
      });
      setEditBookContent(updatedBook);
    }
    setPreviewImage(null);
  };

  const handleUpdateParagraph = () => {
    if (paragraphRef.current?.value !== undefined) {
      pageParagraph = paragraphRef.current?.value;
      const updatedBook = editBookContent.map((page) => {
        if (page.id === pageId) {
          return {
            ...page,
            paragraph: paragraphRef.current?.value,
          };
        } else {
          return page;
        }
      });
      setEditBookContent(updatedBook);
    }
  };

  const handleDownload = async () => {
    updateEditedImages(editedImages);
    updateEditedBookContent(editBookContent);
    router.push(`/download-editedbook/${id}`);
  };

  const updateCreatedBook = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}/pages`,
        {
          pages: editBookContent,
        }
      );
      setEditedImages([]);
      alert(response.data.message);
    } catch (error) {
      alert("Error : Try Again");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <section className="my-10 py-10">
      <div className="flex justify-around items-center">
        <div className="w-1/6 flex justify-center fill-amber-100">
          <Button
            onClick={displayPreviousPage}
            className="shadow-none disabled:opacity-50"
            disabled={
              editImage || editParagraph || currentPage === 0 ? true : false
            }
          >
            <Image
              src="/assets/backward-arrow.svg"
              alt="backward-arrow"
              width={25}
              height={10}
              className="hover:cursor-pointer fill-amber-100"
            />
          </Button>
        </div>
        <div className="h-[480px] w-4/6 flex flex-col md:flex-row rounded-lg overflow-hidden drop-shadow-xl">
          <span
            className="md:absolute md:block md:z-[1] md:border md:border-slate-300 md:border-solid md:inset-x-2/4 md:inset-y-0"
            area-hidden="true"
          ></span>
          <div className="md:w-3/4">
            <div className="relative h-full w-full">
              {previewImage ? (
                <div>
                  <Image
                    className="preview h-full w-full"
                    src={`${previewImage}`}
                    alt=""
                    height={200}
                    width={200}
                  />
                </div>
              ) : editImage ? (
                <div className="h-full w-full flex items-center space-x-6 justify-center">
                  <label className="block">
                    <input
                      type="file"
                      className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-pink
                    hover:file:bg-violet-100
                  "
                      name="image"
                      onChange={uploadImage}
                    />
                  </label>
                </div>
              ) : (
                <Image
                  src={`${pageImage ? pageImage : ""}`}
                  alt="book_cover"
                  height={200}
                  width={200}
                  className="h-full w-full"
                />
              )}
              <p className="absolute bottom-3 left-5 font-bold">{pageNumber}</p>
            </div>
          </div>
          <div className="md:w-1/4  overflow-auto scrollbar bg-yellow relative flex items-start font-quicksand font-semibold">
            {editParagraph ? (
              <textarea
                className="mx-2 relative z-[10] w-full scrollbar leading-10 text-base md:text-xl tracking-widest box-border h-full bg-yellow-200"
                rows={8}
                ref={paragraphRef}
                defaultValue={pageParagraph}
                name="paragraph"
              />
            ) : (
              <p className="m-4 leading-10 text-base md:text-2xl tracking-widest font-semibold">
                {pageParagraph}
              </p>
            )}
            <div className="fixed bottom-3 right-5">{pageNumber + 1}</div>
          </div>
        </div>
        <div className="w-1/6 flex justify-center text-green-500">
          <Button
            onClick={displayNextPage}
            className="shadow-none disabled:opacity-50"
            disabled={
              editImage || editParagraph || currentPage === totalPages - 1
                ? true
                : false
            }
          >
            <Image
              src="/assets/forward-arrow.svg"
              alt="forward-arrow"
              width={25}
              height={10}
              className="hover:cursor-pointer"
            />
          </Button>
        </div>
      </div>
      <div className="w-4/6 mx-auto my-10 py-10">
        {isEdited ? (
          <div className="flex flex-col md:flex-row md:space-x-10 md:justify-center font-bold text-2xl">
            <div className="sm:w-3/4 text-center mt-3 md:mt-0 px-2 py-4">
              <Button
                className="w-full"
                intent="teal"
                size="medium"
                onClick={() => setIsEdited(false)}
              >
                Continue Editing
              </Button>
            </div>
            <div className="sm:w-3/4 text-center px-2 py-4">
              <Button
                className="w-full"
                intent="teal"
                size="medium"
                onClick={handleDownload}
              >
                Download
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:space-x-10 md:justify-center font-bold text-2xl">
            <div className="sm:w-3/4 text-center mt-3 md:mt-0 px-2 py-4">
              {editImage ? (
                <Button
                  className="w-full"
                  intent="teal"
                  size="medium"
                  onClick={() => {
                    setEditImage(false);
                    handleUpdateImage();
                  }}
                >
                  update Image
                </Button>
              ) : (
                <Button
                  className="w-full"
                  intent="teal"
                  size="medium"
                  onClick={() => setEditImage(true)}
                >
                  Edit Image
                </Button>
              )}
            </div>

            <div className="sm:w-3/4 text-center px-2 py-4">
              {editParagraph ? (
                <Button
                  className="w-full"
                  intent="teal"
                  size="medium"
                  onClick={() => {
                    setEditParagraph(false);
                    handleUpdateParagraph();
                  }}
                >
                  Update Paragraph
                </Button>
              ) : (
                <Button
                  className="w-full"
                  intent="teal"
                  size="medium"
                  onClick={() => setEditParagraph(true)}
                >
                  Edit Paragraph
                </Button>
              )}
            </div>
          </div>
        )}

        {!isEdited ? (
          <div className="mt-7 md:mt-5 flex flex-col md:flex-row md:space-x-10 md:justify-center">
            <Button
              className="sm:w-3/4 md:w-2/4 text-center capitalize disabled:opacity-50"
              intent="pink"
              size="medium"
              onClick={() => setIsEdited(true)}
              disabled={editImage || editParagraph ? true : false}
            >
              Done
            </Button>
          </div>
        ) : (
          ""
        )}
        {/* ) : (
          <div className="mt-7 md:mt-5 flex flex-col md:flex-row md:space-x-10 md:justify-center">
            <Button
              className="sm:w-3/4 md:w-2/4 text-center capitalize disabled:opacity-50"
              intent="pink"
              size="medium"
              onClick={() => setIsEdited(false)}
            >
              Edit Again
            </Button>
          </div>
        )} */}
        {isAuthenticated && isEdited ? (
          <div className="mt-7 md:mt-5 flex flex-col md:flex-row md:space-x-10 md:justify-center">
            <Button
              className="sm:w-3/4 md:w-2/4 text-center capitalize disabled:opacity-50"
              intent="pink"
              size="medium"
              onClick={updateCreatedBook}
            >
              Update Created Book
            </Button>
          </div>
        ) : (
          ""
        )}
        <div className="mt-5 sm:w-3/4 md:w-full text-center font-quicksand">
          <Button
            onClick={reset}
            intent="secondary"
            className="bg-transparent underline underline-offset-3 disabled:opacity-50 shadow-none hover:bg-transparent hover:text-pink"
            disabled={editImage || editParagraph ? true : false}
          >
            Undo All Changes!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Book;
