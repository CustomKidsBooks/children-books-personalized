import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  height?: string;
  width?: string;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  height,
  width,
  children,
}) => {
  return (
    <div
      className={`
    ${
      isOpen ? "block" : "hidden"
    } fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
     bg-white px-3 py-2 rounded-md z-20 shadow-2xl shadow-black
    ${height ? `h-${height}` : ""} ${width ? `w-${width}` : "w-[90%] md:w-auto"}
  `}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-white rounded-lg shadow-3xl"
        onClick={onClose}
      ></div>
      <div className="relative">
        <button
          className="absolute top-0 right-0 font-semibold text-xl me-2"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
