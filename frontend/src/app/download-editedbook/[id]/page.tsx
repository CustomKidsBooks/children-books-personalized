"use client";
import Image from "next/image";
import useGetBook from "../../../components/hooks/useGetBook";
import PreviewBookSkeleton from "../../../components/skeleton/PreviewBook.skeleton";
import SendBook from "../../../components/SendBook";
import DownloadBook from "../../../components/DownloadBook";
import { faChildReaching } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tag from "../../../components/Tag";
import { useEditedBookContext } from "../../../components/context/EditedBookContext";
import { useState, useEffect } from "react";
import { storage } from "../../../services/firebase";
import { ref, deleteObject } from "firebase/storage";

const EditedBook = ({ params }: { params: { id: string } }) => {
  const [removeEditedBook, setRemoveEditedBook] = useState<boolean>(false);
  const id = Number(params.id);
  const { bookData: book, isLoading, isError } = useGetBook(id);

  const { updateEditedBookContent, editedImages, updateEditedImages } =
    useEditedBookContext();

  useEffect(() => {
    const deleteImagesFromFirebase = async () => {
      for (const image of editedImages) {
        const imageNameToDelete = image.split("2F")[2].split("?")[0];

        const desertRef = ref(
          storage,
          `ChildrenBook/PagesImage/${imageNameToDelete}`
        );
        await deleteObject(desertRef);
      }
      updateEditedImages(null);
      updateEditedBookContent([]);
    };

    if (removeEditedBook) {
      deleteImagesFromFirebase();
    }
    window.addEventListener("beforeunload", cleanup);
    return () => {
      if (removeEditedBook) {
        deleteImagesFromFirebase();
        window.removeEventListener("beforeunload", cleanup);
      }
    };
  }, [removeEditedBook]);

  const cleanup = () => {
    setRemoveEditedBook(true);
  };

  if (isLoading) {
    return <PreviewBookSkeleton />;
  }

  if (isError) {
    return "Error";
  }
  return (
    <section className="w-full p-10">
      <div className="relative mb-10">
        <Image
          src="/assets/story.jpg"
          alt="your-story"
          width={300}
          height={56.957}
        />
        <div className="absolute w-full top-2/4 -translate-y-2/4">
          <h1 className="text-3xl ms-7 font-quicksand font-medium">
            Your Edited <span className="font-pacifico">Story!</span>
          </h1>
        </div>
      </div>
      <div className="bg-reading-book bg-kid-opacity bg-right-top">
        <div className="p-2 mb-3 flex flex-col gap-3 md:gap-0 md:flex-row justify-between md:w-2/4">
          <p className="text">{book?.title}</p>
          <div className="flex gap-2 ">
            <FontAwesomeIcon
              icon={faChildReaching}
              className="fa-icon place-self-center"
            />
            <p className="text-pine-green">2-3</p>
          </div>
        </div>
        <div className="mb-10">{book?.tag && <Tag tag={book.tag} />}</div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/4">
            <div className="preview-card object-contain w-full">
              <Image
                src={
                  book?.image ? `${book.image}` : "/assets/images/family.jpg"
                }
                alt="book cover"
                width={506}
                height={486}
                className="w-full"
              />
            </div>
          </div>
          <div className="mt-10 lg:mt-0 lg:w-1/4 lg:mx-auto gap-5 flex flex-col lg:justify-around">
            <DownloadBook bookId={id} />
            <SendBook bookId={id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditedBook;
