"use client";

import { faChildReaching } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import DownloadBook from "./DownloadBook";
import SendBook from "./SendBook";
import Tag from "./Tag";
import useGetBook from "./hooks/useGetBook";
import PreviewBookSkeleton from "./skeleton/PreviewBook.skeleton";
import { Button } from "./ui/Button";
interface PreviewBookValues {
  id: number;
}
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
// TODO: Add functionality to the page

const PreviewBook = ({ id }: PreviewBookValues) => {
  const { bookData: book, isLoading, isError } = useGetBook(id);
  const { user, getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const router = useRouter();
  if (isLoading) {
    return <PreviewBookSkeleton />;
  }

  if (isError) {
    return "Error";
  }

  return (
    <section className="">
      <div className="p-2 mb-3 flex flex-col gap-3 md:gap-0 md:flex-row justify-between md:w-2/4">
        <p className="text">{book?.title}</p>
        <div className="flex gap-2 ">
          <FontAwesomeIcon
            icon={faChildReaching}
            className="fa-icon place-self-center"
          />
          <span className="text-pine-green">{book?.ageGroup}</span>
        </div>
      </div>
      <div className="mb-10">{book?.tag && <Tag tag={book.tag} />}</div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/4">
          <div className="preview-card object-contain w-full">
            <Image
              src={book?.image ? `${book.image}` : "/assets/images/family.jpg"}
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
          <div className="items-center">
            <h1 className="font-bold text text-2xl lg:text-3xl">
              Get Printed Book
            </h1>
            <div className="mt-3 py-4">
              <Button
                // href={`/order-printed-book/${id}`}
                intent="teal"
                className="text font-bold"
                onClick={() =>
                  !user
                    ? loginWithRedirect()
                    : router.push(`/order-printed-book/${id}`)
                }
              >
                Order Printed Book
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewBook;
