import React from "react";
import { DeleteModalProps } from "@utils/interfaces";

const Modal: React.FC<DeleteModalProps> = ({ title, width, height, children, extra, isVisible}) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
      <div
        className="bg-white rounded-lg shadow-md p-6"
        style={{ height: height, width: width }}
      >
        {title && (
          <div className="mb-4 text-xl font-semibold font-quicksand text-black text-center">{title} {extra}</div>
        )}
        <div className="text-left">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
