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
  const [firstPage, setFirstPage] = useState<number>(1);
  const booksPerPage = 8;
  const pagesToDisplay = 3;
  const tag: string =
    "  1. #FallStorybook  2. #KidsFallAdventure  3. #AutumnFantasy";

  const getTotalPages = (totalPages: number): void => {
    setTotalPages(totalPages);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLocaleLowerCase());
    setCurrentPage(1);
    setFirstPage(1);
  };

  const displayPreviousPages = () => {
    if (firstPage > pagesToDisplay) {
      setFirstPage(() => firstPage - pagesToDisplay);
      setCurrentPage(() => firstPage - pagesToDisplay);
    }
  };

  const displayNextPages = () => {
    if (firstPage <= totalPages - pagesToDisplay) {
      setFirstPage(() => firstPage + pagesToDisplay);
      setCurrentPage(() => firstPage + pagesToDisplay);
    }
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
        <div className="flex justify-between sm:justify-center items-center gap-2 md:gap-3">
          <Button
            onClick={displayPreviousPages}
            className="shadow-none disabled:opacity-50"
            disabled={firstPage <= 3 ? true : false}
          >
            <Image
              src="/assets/backward-arrow.svg"
              alt="backward-arrow"
              width={15}
              height={3}
              className="hover:cursor-pointer fill-amber-100"
            />
          </Button>

          {firstPage > pagesToDisplay ? <div>...</div> : ""}

          {Array.from(Array(pagesToDisplay), (e, i) => {
            return (
              <div key={i}>
                {firstPage + i <= totalPages && (
                  <div
                    onClick={() => setCurrentPage(firstPage + i)}
                    className={
                      currentPage === firstPage + i
                        ? "bg-pink border-black rounded-full text-white"
                        : ""
                    }
                  >
                    <button className="border rounded-full text-sm md:text-base py-2 px-3 md:py-2 md:px-4 cursor-pointer font-quicksand font-bold">
                      {firstPage + i}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          {firstPage <= totalPages - pagesToDisplay ? <div>...</div> : ""}

          <Button
            onClick={displayNextPages}
            className="shadow-none disabled:opacity-50"
            disabled={firstPage > totalPages - 3 ? true : false}
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
