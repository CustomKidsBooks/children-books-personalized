"use client";

import LibraryCard from "@components/Library/LibraryCard";
import Tag from "@components/Tag";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const UserLibrary = () => {
  const tag: string[] = [
    "family",
    "divorce",
    "love",
    "friendship",
    "nature",
    "art",
  ];

  return (
    <section className="p-10 h-auto">
      <div className="relative shrink flex-center">
        <Image
          src="/assets/library.jpg"
          alt="Library"
          width={247}
          height={126}
        />
        <h1 className="absolute top-1/4 md:text-4xl text-3xl text mx-16">
          Library
        </h1>
      </div>
      <div className="p-10 md:flex justify-between items-center grid gap-3">
        <Tag tag={tag} />
        <div className="flex place-items-center shadow-3xl px-2 py-4 md:w-[479px]">
          <input
            type="text"
            placeholder="Search here"
            className="w-full focus:outline-none focus:ring focus:border-pink-300"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-pink ms-3"
            onClick={() => alert("clicked")}
          />
        </div>
      </div>
      <LibraryCard />
    </section>
  );
};

export default UserLibrary;
