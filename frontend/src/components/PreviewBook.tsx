"use client";

import Image from "next/image";
import useGetBook from "./hooks/useGetBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChildReaching } from "@fortawesome/free-solid-svg-icons";
import Tag from "./Tag";
import DownloadBook from "./DownloadBook";
import SendBook from "./SendBook";
import LoadindSpinner from "./ui/LoadindSpinner";
import PreviewBookSkeleton from "./skeleton/PreviewBook.skeleton";

interface PreviewBookValues {
  id: number;
}

// TODO: Remove tag const and retrive tags from database when API ready
// TODO: Add functionality to the page

const PreviewBook = ({ id }: PreviewBookValues) => {
  const { bookData: book, isLoading, isError } = useGetBook(id);

  const tag = ["family", "love", "Divorce"];

  if (isLoading) {
    return <PreviewBookSkeleton />;
  }

  if (isError) {
    return "Error";
  }

  return (
    <section className="mt-10">
      <div className="p-2 mb-3 grid grid-cols-2 w-[506.622px]">
        <p className="text">{book?.title}</p>
        <div className="flex gap-2 ">
          <FontAwesomeIcon
            icon={faChildReaching}
            className="fa-icon place-self-center"
          />
          <p className="text-pine-green">2-3</p>
        </div>
      </div>
      <Tag tag={tag} />
      <div className="pt-10 lg:grid lg:grid-cols-2 inline-grid lg:h-auto gap-10 place-content-evenly shrink">
        <div className="preview-card object-contain relative">
          <Image
            src={
              book?.image
                ? `/assets/images/cover.jpg`
                : "/assets/images/family.jpg"
            }
            alt="book cover"
            fill={true}
          />
        </div>
        <div className="p-4">
          <div className="flex lg:flex-col flex-row  gap-24 w-full">
            <DownloadBook bookId={id} />
            <SendBook />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewBook;
