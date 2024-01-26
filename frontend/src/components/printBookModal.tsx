import React from "react";
import { ModalProps } from "@utils/interfaces";

const PrintBookModal: React.FC<ModalProps> = ({
  children,
  isVisible,
  onClose,
}) => {
  return (
    <div
      className={`
    fixed inset-0 flex justify-center items-center transition-colors px-2 text-center
    ${isVisible ? "visible bg-black/20" : "invisible"}
  `}
    >
      <div
        className={`
      bg-white rounded-xl shadow p-6 flex flex-col items-center gap-5
      ${isVisible ? "scale-100 opacity-100" : "scale-125 opacity-0"}
      lg:w-1/3
    `}
      >
        <div className="w-full">{children}</div>
        <div className="w-full flex justify-center">
          <button
            onClick={onClose}
            className="px-5 py-1 font-semibold bg-pink text-white hover:font-bold rounded-md"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintBookModal;
