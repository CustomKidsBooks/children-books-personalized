"use client";

import { axiosInstance } from "@services/api-client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heading } from "@ui/Heading";
import { LinkButton } from "@ui/LinkButton";

interface dataValues {
  id: number;
  title: string;
  desc: string;
  author: string;
}

const Draft = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getBooks() {
      const response = await axiosInstance.get("/api/books/10/pages");
      setData(response.data);
    }
    getBooks();
  }, []);

  return (
    <section className="w-full py-10 mt-5 bg-[url('/assets/bg_ellipse.png')] bg-no-repeat bg-cover bg-right">
      <div className="w-4/6 mx-auto">
        <div className="relative">
          <Image
            src="/assets/draft.png"
            alt="book-title"
            width={200}
            height={3}
          />
          <div className="absolute top-1/2 left-20 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-70 p-2 whitespace-nowrap">
            <h1 className="mt-0 font-normal text-3xl md:text-4xl text-green font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose">
              Draft{" "}
            </h1>
          </div>
        </div>
      </div>

      <div className="w-4/6 my-10 mx-auto">
        <h2 className="text-xl">
          <span className="font-semibold">Title :</span> Our Family{" "}
        </h2>
        <h2 className="text-xl mt-3">
          <span className="font-semibold">Story :</span> The story that was
          written in the create page{" "}
        </h2>
        <h2 className="text-xl mt-3 font-semibold">
          Back to{" "}
          <Link href="/create-story" className="text-pink">
            Create your <i>Story!</i>
          </Link>
        </h2>
      </div>

      <div className="h-[300px] bg-[url('/assets/bg_flower.png')] bg-no-repeat bg-contain bg-[center_right_20rem]"></div>

      <div className="w-4/6 mx-auto">
        <div className="flex flex-col md:flex-row md:space-x-10 md:justify-center">
          <LinkButton
            className="w-3/4 text-center font-quicksand"
            href="#"
            intent="teal"
            size="medium"
          >
            Edit Paragraph
          </LinkButton>
          <LinkButton
            className="w-3/4 text-center mt-3 md:mt-0 font-quicksand"
            href="#"
            intent="teal"
            size="medium"
          >
            Edit Image
          </LinkButton>
        </div>
        <div className="mt-7 md:mt-5 flex flex-col md:flex-row md:space-x-10 md:justify-center">
          <LinkButton
            className="w-3/4 md:w-2/4 text-center capitalize font-quicksand"
            href="#"
            intent="pink"
            size="medium"
          >
            Done
          </LinkButton>
        </div>
        <div className="mt-5 w-3/4 md:w-full text-center">
          <Link href="#" className="underline underline-offset-3 font-bold">
            Try Again!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Draft;
