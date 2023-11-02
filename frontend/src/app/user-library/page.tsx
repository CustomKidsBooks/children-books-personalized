"use client";

import LibraryCard from "@components/Library/LibraryCard";
import Tag from "@components/Tag";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Button } from "../../components/ui/Button";

const UserLibrary = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const booksPerPage = 8;
  const tag: string =
    "  1. #FallStorybook  2. #KidsFallAdventure  3. #AutumnFantasy";

  const displayPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevState) => prevState - 1);
    }
  };
  const displayNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };
  const getTotalPages = (totalPages: number): void => {
    setTotalPages(totalPages);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLocaleLowerCase());
    setCurrentPage(1);
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
            onChange={handleSearch}
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
        booksPerPage={booksPerPage}
      />

      <div className="my-16">
        <div className="flex justify-center items-center gap-3">
          <Button
            onClick={displayPreviousPage}
            className="shadow-none disabled:opacity-50"
            disabled={currentPage === 1 ? true : false}
          >
            <Image
              src="/assets/backward-arrow.svg"
              alt="backward-arrow"
              width={15}
              height={3}
              className="hover:cursor-pointer fill-amber-100"
            />
          </Button>

          {Array.from(Array(totalPages), (e, i) => {
            return (
              <div
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={
                  currentPage === i + 1
                    ? "bg-pink border-black rounded-full text-white"
                    : ""
                }
              >
                <button className="border rounded-full py-2 px-4 cursor-pointer font-quicksand font-bold">
                  {i + 1}
                </button>
              </div>
            );
          })}
          <Button
            onClick={displayNextPage}
            className="shadow-none disabled:opacity-50"
            disabled={currentPage === totalPages ? true : false}
          >
            <Image
              src="/assets/forward-arrow.svg"
              alt="forward-arrow"
              width={15}
              height={3}
              className="hover:cursor-pointer"
            />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UserLibrary;
