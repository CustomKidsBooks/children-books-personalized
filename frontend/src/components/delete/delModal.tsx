import React from "react";

interface ModalProps {
  title: string;
  width?: string;
  height?: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
  close?: () => void;
  isVisible?: boolean;
}

const Modal: React.FC<ModalProps> = ({ title, width, height, children, extra, close, isVisible}) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-teal z-50">
      <div
        className="bg-white rounded-lg shadow-md p-6"
        style={{ height: height, width: width }}
      >
        {title && (
          <div className="mb-4 text-xl font-semibold font-quicksand text-black">{title} {extra}</div>
        )}
        {close && (
          <button
            className="absolute top-0 right-0 mt-1 mr-1 text-black text-2xl"
            onClick={close}
          >
            &times;
          </button>
        )}
        <div className="text-left">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
