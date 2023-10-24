"use client";

import React, { createContext, useState } from "react";

export const ModalContext = createContext({
  showModal: {
    loginModal: false,
    signUpModal: false,
    sendEmailModal: false
  },
  openModal: (modal: 'loginModal' | 'signUpModal' | 'sendEmailModal') => { },
  closeModal: (modal: 'loginModal' | 'signUpModal' | 'sendEmailModal') => { },
  auth: '',
  setToken: (token: string) => { },
});

interface IModalContextProps {
  children: React.ReactNode;
}
export const ModalProvider: React.FC<IModalContextProps> = ({ children }) => {
  const [showModal, setShowModal] = useState({
    loginModal: false,
    signUpModal: false,
    deleteModal: false,
    sendEmailModal: false,
  });
  const [auth, setAuth] = useState<string>('');
  const setToken = (token: string) => setAuth(token)

  const openModal = (modal: 'loginModal' | 'signUpModal' | 'sendEmailModal') => {
    let temp: any = showModal;

    const obj: any = {}
    temp = Object.keys(showModal).map((key: string) => {
      if (key === modal) {
        temp[key] = true;
      } else {
        temp[key] = false;
      }
      obj[key] = temp[key];
      return { [key]: temp[key] }
    })
    setShowModal(obj)
  };

  const closeModal = (modal: 'loginModal' | 'signUpModal' | 'deleteModal' | 'sendEmailModal' ) => {
    let temp: any = showModal;
    temp = Object.keys(showModal).map((key: string) => {
      temp[key] = false;
      return { [key]: temp[key] }
    })
    setShowModal({ ...showModal, [modal]: false })
  };

  const value = {
    showModal,
    openModal,
    closeModal,
    auth,
    setToken,
  };

  return (
    <ModalContext.Provider value={value}>{children}
    </ModalContext.Provider>
  );
};