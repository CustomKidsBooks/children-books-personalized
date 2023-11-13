"use client";
import React from "react";
import Modal from "./createStoryModal";
import { createStoryModalProps } from "@utils/interfaces";

const createStoryResponseModal: React.FC<createStoryModalProps> = ({
  onClose,
  isVisible,
  bookID,
  isError,
}) => {
  const close = () => onClose();

  return (
    <Modal width="450px" height="250px" onClose={close} isVisible={isVisible}>
      <div className="p-2">
        <div className="flex justify-end">
          <button
            onClick={close}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow float-right mt-0 me-5"
          >
            X
          </button>
        </div>
        <div className="mt-4">
          <div>
            {isError && (
              <div className="flex flex-col items-center gap-2 text-red-700">
                <p>Please Try Again Later</p>
                <p>Or Contact Us At</p>
                <p>TinyTaleCreators@gmail.com</p>
              </div>
            )}
            {bookID !== "" && (
              <div className="flex flex-col items-center gap-10">
                <p className="text-center font-semibold text-pink">
                  Your book has been successfully created.
                </p>
                <div>
                  <a
                    href={`/draft/${bookID}`}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-0 me-5"
                  >
                    Read Book
                  </a>
                  <a
                    href={`/donwload/${bookID}`}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-0 me-5"
                  >
                    Get Book
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default createStoryResponseModal;
