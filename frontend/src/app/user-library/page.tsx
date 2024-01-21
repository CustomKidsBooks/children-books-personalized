"use client";

import Tag from "@components/Tag";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Button } from "../../components/ui/Button";
import Pagination from "@components/Pagination";
import LibraryDisplay from "@components/Library/LibraryDisplay";

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

  const displaySelectedPage = (selectedPage: number) => {
    const pageSet = Math.ceil(selectedPage / pagesToDisplay);
    setFirstPage(pageSet * pagesToDisplay - pagesToDisplay + 1);
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
      <LibraryDisplay
        search={search}
        currentPage={currentPage}
        getTotalPages={getTotalPages}
        booksPerPage={booksPerPage}
      />

      <Pagination
        firstPage={firstPage}
        currentPage={currentPage}
        pagesToDisplay={pagesToDisplay}
        displaySelectedPage={displaySelectedPage}
        totalPages={totalPages}
      ></Pagination>
    </section>
  );
};

export default UserLibrary;
