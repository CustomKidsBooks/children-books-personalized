import React, { useState } from "react";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "wrapper") onClose();
  };

  return (
    <div className="w-full h-full fixed bg-black bg-opacity-40 top-0 left-0 z-50 p-20 flex justify-center items-center" id="wrapper" onClick={handleClose}>
      <div className="md:w-[420px] w-full mx-auto flex flex-col">
        <div className="p-2 rounded">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
