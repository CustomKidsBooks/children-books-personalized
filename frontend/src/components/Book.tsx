/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "./ui/Button";
import useGetBookPages from "./hooks/useGetBookPages";

interface BookValues {
  id: number;
}

const Book = ({ id }: BookValues) => {
  let {
    isLoading,
    isError,
    message,
    image,
    previewImage,
    setPreviewImage,
    paragraph,
    editParagraph,
    setEditParagraph,
    editImage,
    setEditImage,
    pageNumber,
    displayNextPage,
    displayPreviousPage,
    updateBookPages,
    resetData,
  } = useGetBookPages(id);

  const paragraphRef = useRef<HTMLTextAreaElement>(null);

  const [selectedImage, setSelectedImage] = useState<File>();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <div>{message}</div>;
  }

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setSelectedImage(selectedFiles?.[0]);
    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
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
        <div className="h-[480px] w-4/6 flex rounded-lg overflow-hidden drop-shadow-xl display_book">
          <div className="w-3/4">
            <div className="relative h-full w-full">
              {previewImage && (
                <div>
                  <Image
                    className="preview"
                    src={previewImage}
                    alt=""
                    fill={true}
                  />
                </div>
              )}
              {!!editImage && !previewImage ? (
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
                      onChange={selectImage}
                    />
                  </label>
                </div>
              ) : (
                <img
                  src={`http://localhost:5001/${image}`}
                  alt=""
                  className="h-full w-full"
                />
              )}
              <p className="absolute bottom-3 left-5 font-bold">{pageNumber}</p>
            </div>
          </div>
          <div className="w-1/4 bg-yellow-200 relative flex items-center font-quicksand font-semibold">
            {editParagraph ? (
              <textarea
                className="m-4 leading-10 text-xl tracking-widest box-border h-full bg-yellow-200"
                rows={8}
                ref={paragraphRef}
                defaultValue={paragraph}
                name="paragraph"
              />
            ) : (
              <p className="m-4 leading-10 text-xl tracking-widest">
                {paragraph}
              </p>
            )}

            <div className="absolute bottom-3 right-5">{pageNumber + 1}</div>
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
        <div className="flex flex-col md:flex-row md:space-x-10 md:justify-center">
          <Button
            className="sm:w-3/4 text-center"
            intent="teal"
            size="medium"
            onClick={() => setEditParagraph(true)}
          >
            Edit Paragraph
          </Button>
          <Button
            className="sm:w-3/4 text-center mt-3 md:mt-0"
            intent="teal"
            size="medium"
            onClick={() => setEditImage(true)}
          >
            Edit Image
          </Button>
        </div>
        <div className="mt-7 md:mt-5 flex flex-col md:flex-row md:space-x-10 md:justify-center">
          <Button
            className="sm:w-3/4 md:w-2/4 text-center capitalize"
            intent="pink"
            size="medium"
            // disabled={!editImage || !editParagraph}
            onClick={() =>
              editParagraph === true
                ? updateBookPages(paragraphRef.current?.value, undefined)
                : editImage == true
                ? updateBookPages(undefined, selectedImage)
                : undefined
            }
          >
            Done
          </Button>
        </div>
        <div className="mt-5 sm:w-3/4 md:w-full text-center font-quicksand">
          <Button
            onClick={resetData}
            intent="secondary"
            className="bg-transparent underline underline-offset-3 shadow-none hover:bg-transparent hover:text-pink"
          >
            Try Again!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Book;
