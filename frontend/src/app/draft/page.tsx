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
    // <div>
    //   {data.map((d) => (
    //     <div key={d.id}>
    //       <h1>{d.title}</h1>
    //       <p>{d.desc}</p>
    //     </div>
    //   ))}
    // </div>
    <section className="w-full p-10">
      <div className="w-full max-w-2xl p-10">
        <div className="p-1 relative shrink flex flex-col items-center sm:flex-row sm:items-center justify-center">
          <Image
            src="/assets/draft.png"
            alt="book-title"
            width={250}
            height={3}
          />
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-70 p-2 whitespace-nowrap`}
          >
            <h1
              className={`${Heading({
                align: "center",
              })} font-normal text-xl md:text-3xl text-black font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose`}
            >
              Draft{" "}
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full my-5 flex justify-center">
        <div className="w-2/6"></div>
        <div className="w-2/6"></div>
      </div>
      <div className="w-full flex space-x-10 justify-center">
        <LinkButton
          className="w-2/6 text-center"
          href="#"
          intent="teal"
          size="medium"
        >
          Edit Paragraph
        </LinkButton>
        <LinkButton
          className="w-2/6 text-center"
          href="#"
          intent="teal"
          size="medium"
        >
          Edit Image
        </LinkButton>
      </div>
      <div className="mt-5 w-full flex space-x-10 justify-center">
        <LinkButton
          className="w-1/4 text-center capitalize"
          href="#"
          intent="pink"
          size="medium"
        >
          Done
        </LinkButton>
      </div>
      <div className="mt-5 w-full flex space-x-10 justify-center">
        <Link href="#" className="underline underline-offset-4 font-bold">
          Try Again!
        </Link>
      </div>
    </section>
  );
};

export default Draft;
