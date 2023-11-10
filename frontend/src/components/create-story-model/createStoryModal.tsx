import React from "react";
import { createStoryModalProps } from "@utils/interfaces";

const Modal: React.FC<createStoryModalProps> = ({
  width,
  height,
  children,
  isVisible,
}) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
      <div
        className="bg-white rounded-lg shadow-md pt-5"
        style={{ height: height, width: width }}
      >
        <div className="text-left">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
