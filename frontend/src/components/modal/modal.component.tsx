"use client";
import React, { useEffect, ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
  title?: string;
  width?: string;
  height?: string;
  minHeight?: string;
  closable?: boolean;
  center?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  title,
  width = "100%",
  height = "100%",
  minHeight,
  closable = true,
  center = false,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <div className="w-full h-full fixed bg-black bg-opacity-60 top-0 left-0 z-50 p-5 flex justify-center items-center">
      <div
        className={`bg-white p-5 rounded-md ${width} ${height} ${
          minHeight ? minHeight : "min-h-[unset]"
        } relative`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
