"use client";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface PaginationValues {
  firstPage: number;
  currentPage: number;
  totalPages: number;
  pagesToDisplay: number;
  displaySelectedPage: (arg: number) => void;
}

const Pagination = ({
  firstPage,
  currentPage,
  totalPages,
  pagesToDisplay,
  displaySelectedPage,
}: PaginationValues) => {
  return (
    <>
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
            {Array.from(Array(pagesToDisplay), (e, i) => {
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
    </>
  );
};

export default Pagination;
