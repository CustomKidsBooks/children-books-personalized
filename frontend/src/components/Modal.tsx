import React, { useState } from "react";
import { ModalProps } from "@utils/interfaces";

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "wrapper") onClose();
  };

  return (
    <div className="md:w-full md:h-full fixed bg-black bg-opacity-40 right-[-100px] top-0 md:left-0 z-50 p-20 flex justify-center items-center" id="wrapper" onClick={handleClose}>
      <div className="md:w-[420px] w-full mx-auto flex flex-col">
        <div className="p-2 rounded">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
