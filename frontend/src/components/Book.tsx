/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "./ui/Button";
import useGetBookPages from "./hooks/useGetBookPages";

import { storage } from "../services/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

interface BookValues {
  id: number;
}

const Book = ({ id }: BookValues) => {
  let {
    isLoading,
    isError,
    pageNumber,
    pageImage,
    pageParagraph,
    displayNextPage,
    displayPreviousPage,
    message,
    previewImage,
    setPreviewImage,
    editParagraph,
    setEditParagraph,
    editImage,
    setEditImage,
    updateBookPages,
  } = useGetBookPages(id);
  const paragraphRef = useRef<HTMLTextAreaElement>(null);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <div>{message}</div>;
  }

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    let imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    const storageRef = ref(storage, `ChildrenBook/PagesImage/${imageName}`);
    const snapshot = await uploadBytes(storageRef, selectedFiles[0]);
    const uploadedImageurl = await getDownloadURL(storageRef);
    setPreviewImage((prevState) => uploadedImageurl);
  };

  const updatePageInDB = async () => {
    if (editImage) {
      const deleteImageName = pageImage.split("2F")[2].split("?")[0];
      const desertRef = ref(
        storage,
        `ChildrenBook/PagesImage/${deleteImageName}`
      );
      try {
        await deleteObject(desertRef);
      } catch (error) {}
    }
    if (editParagraph !== null || editImage) {
      await updateBookPages(paragraphRef.current?.value, previewImage);
    }
  };

  const resetData = async () => {
    if (previewImage) {
      const deleteImageName = previewImage?.split("2F")[2].split("?")[0];
      const desertRef = ref(
        storage,
        `ChildrenBook/PagesImage/${deleteImageName}`
      );
      try {
        await deleteObject(desertRef);
      } catch (error) {}
    }
    setEditParagraph(null);
    setEditImage(false);
    setPreviewImage(null);
  };

  return (
    <section className="my-10 py-10">
      <div className="flex justify-around items-center">
        <div className="w-1/6 flex justify-center fill-amber-100">
          <Button
            onClick={displayPreviousPage}
            className="shadow-none disabled:opacity-50"
            disabled={editImage || editParagraph ? true : false}
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
                  src={`${pageImage}`}
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
            disabled={editImage || editParagraph ? true : false}
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
        <div className="flex flex-col md:flex-row md:space-x-10 md:justify-center font-bold text-2xl">
          <Button
            className="sm:w-3/4 text-center px-2 py-4"
            intent="teal"
            size="medium"
            onClick={() => setEditParagraph(true)}
          >
            Edit Paragraph
          </Button>
          <Button
            className="sm:w-3/4 text-center mt-3 md:mt-0 px-2 py-4"
            intent="teal"
            size="medium"
            onClick={() => setEditImage(true)}
          >
            Edit Image
          </Button>
        </div>
        <div className="mt-7 md:mt-5 flex flex-col md:flex-row md:space-x-10 md:justify-center">
          <Button
            className="sm:w-3/4 md:w-2/4 text-center capitalize disabled:opacity-80"
            intent="pink"
            size="medium"
            onClick={updatePageInDB}
            disabled={editImage || editParagraph ? false : true}
          >
            Done
          </Button>
        </div>
        <div className="mt-5 sm:w-3/4 md:w-full text-center font-quicksand">
          <Button
            onClick={resetData}
            intent="secondary"
            className="bg-transparent underline underline-offset-3 disabled:opacity-80 shadow-none hover:bg-transparent hover:text-pink"
            disabled={editImage || editParagraph ? false : true}
          >
            Try Again!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Book;
