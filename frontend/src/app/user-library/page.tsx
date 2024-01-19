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
  const booksPerPage = 1;
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

  const displaySelectedPage = (selectedPage: number) => {
    const pageSet = Math.ceil(selectedPage / 3);
    setFirstPage(pageSet * 3 - 3 + 1);
    setCurrentPage(selectedPage);
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
        <div className="flex gap-3 justify-center items-center my-14">
          <div className="flex items-center me-3">
            <Button
              disabled={currentPage === 1}
              onClick={() => displaySelectedPage(currentPage - 1)}
              className="shadow-none disabled:opacity-50"
            >
              <Image
                src="/assets/backward-arrow.svg"
                alt="backward-arrow"
                width={15}
                height={3}
                className="hover:cursor-pointer fill-amber-100"
              />
            </Button>
          </div>
          <div className={`${totalPages > 1 && `flex gap-3`}`}>
            {Array.from(Array(3), (e, i) => {
              return (
                <div key={i}>
                  {firstPage + i <= totalPages && (
                    <button
                      onClick={() => displaySelectedPage(i + firstPage)}
                      className={
                        currentPage === i + firstPage
                          ? "bg-pink text-white font-semibold border px-4 py-2 rounded-full"
                          : "border-pink text-black font-semibold border px-4 py-2 rounded-full"
                      }
                    >
                      {i + firstPage}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center ms-3">
            <Button
              disabled={currentPage === totalPages}
              onClick={() => displaySelectedPage(currentPage + 1)}
              className="shadow-none disabled:opacity-50"
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
      </div>
    </section>
  );
};

export default UserLibrary;
