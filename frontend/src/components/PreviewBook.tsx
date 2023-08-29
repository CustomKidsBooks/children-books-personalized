"use client";

import Image from "next/image";
import useBook from "./hooks/useBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChildReaching } from "@fortawesome/free-solid-svg-icons";
import Tag from "./Tag";
import DownloadBook from "./DownloadBook";
import SendBook from "./SendBook";

interface PreviewBookValues {
  id: number;
}

const PreviewBook = ({ id }: PreviewBookValues) => {
  const { bookData: book, isLoading, isError } = useBook(id);
  const tag = ["family", "love", "Divorce"];
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
      <div className="pt-10 grid grid-cols-2 gap-10 ">
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
          <div className="flex flex-col w-52 gap-24">
            <DownloadBook />
            <SendBook />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewBook;
