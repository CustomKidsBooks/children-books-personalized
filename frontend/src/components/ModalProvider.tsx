"use client";

import React, { createContext, useState } from "react";

export const ModalContext = createContext({
  showModal: {
    sendEmailModal: false,
  },
  openModal: (modal: "sendEmailModal") => {},
  closeModal: (modal: "sendEmailModal") => {},
});

interface IModalContextProps {
  children: React.ReactNode;
}
export const ModalProvider: React.FC<IModalContextProps> = ({ children }) => {
  const [showModal, setShowModal] = useState({
    deleteModal: false,
    sendEmailModal: false,
  });
  const openModal = (modal: "sendEmailModal") => {
    let temp: any = showModal;

    const obj: any = {};
    temp = Object.keys(showModal).map((key: string) => {
      if (key === modal) {
        temp[key] = true;
      } else {
        temp[key] = false;
      }
      obj[key] = temp[key];
      return { [key]: temp[key] };
    });
    setShowModal(obj);
  };

  const closeModal = (modal: "deleteModal" | "sendEmailModal") => {
    let temp: any = showModal;
    temp = Object.keys(showModal).map((key: string) => {
      temp[key] = false;
      return { [key]: temp[key] };
    });
    setShowModal({ ...showModal, [modal]: false });
  };

  const value = {
    showModal,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
