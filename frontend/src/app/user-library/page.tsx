"use client";

import LibraryCard from "@components/Library/LibraryCard";
import Tag from "@components/Tag";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

const UserLibrary = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const tag: string =
    "  1. #FallStorybook  2. #KidsFallAdventure  3. #AutumnFantasy";

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevState) => prevState - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };
  const getTotalPages = (totalPages: number) => {
    setTotalPages(totalPages);
  };

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
        <div className="flex place-items-center shadow-3xl px-2 md:w-[479px]">
          <input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value.toLocaleLowerCase())
            }
            className="w-full text font-bold tracking-widest p-2 focus:outline-none focus:ring focus:border-pink-300"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-pink ms-3"
          />
        </div>
      </div>
      <LibraryCard
        search={search}
        currentPage={currentPage}
        getTotalPages={getTotalPages}
      />

      <div className="mt-20">
        <ul className="flex justify-center gap-3">
          <li onClick={handlePrevious} className="inline-block cursor-pointer">
            Prev
          </li>
          {Array.from(Array(totalPages), (e, i) => {
            return (
              <li
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className="inline-block cursor-pointer border px-2"
              >
                {i + 1}
              </li>
            );
          })}
          <li onClick={handleNext} className="inline-block cursor-pointer">
            Next
          </li>
        </ul>
      </div>
    </section>
  );
};

export default UserLibrary;
