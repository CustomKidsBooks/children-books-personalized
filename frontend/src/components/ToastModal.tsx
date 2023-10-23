import React from "react";
import { ToastModalProps } from "@utils/interfaces";

const ToastModal: React.FC<ToastModalProps> = ({ isVisible, message, onClose }) => {
  if (!isVisible) return null;
  const close = () => onClose();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
      <div
        className="bg-white rounded-lg shadow-md p-4 h-32 w-70 md:w-100"
      >
        <div className="text-pink text-lg mb-1">{message}</div>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow float-right mt-0 mr-0" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ToastModal;
