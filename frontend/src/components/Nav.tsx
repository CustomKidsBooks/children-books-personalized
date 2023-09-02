"use client";

import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Modal from "@components/Modal";
import LoginForm from "@components/LoginForm";
import { LoginFormValues } from "@utils/interfaces";
import { SignUpFormValues } from "@utils/interfaces";
import { ModalContext } from "./ModalProvider";
import SignUpForm from "./SignUpForm";
import DeleteModal from './delete/delete';

//Todo: Need to Handle login, signup, delete logic once Api completed
const Nav = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const { showModal, openModal, closeModal, auth, setToken } = useContext(ModalContext);
  const handleImageClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const handleDeleteClick = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    setDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };
  const handleSubmit = async (values: LoginFormValues | SignUpFormValues, formType: 'login' | 'signup') => {
    try {
      if (formType === 'login') {
        setLoggedIn(true);
        setToken('xyz');
        closeModal('loginModal');
      } else if (formType === 'signup') {
        setLoggedIn(true);
        closeModal('signUpModal');
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setToken('');
  };

  return (
    <div className="bg-white shadow-3xl">
      <nav className="flex-between w-full h-120 py-5 px-5 md:px-10">
        <Link href="/">
          <Image
            alt="Children Book"
            src="/assets/logo.svg"
            width={150}
            height={150}
            className="object-contain"
          />
        </Link>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto justify-end lg:text-right">
          <div className="text-2xl font-quicksand font-medium lg:flex-grow">
            <div className="inline-flex">
              <div className="flex items-center justify-end">
                <a href="/" onClick={() => setActiveLink("home")}
                  className={`block mt-4 lg:inline-block lg:mt-0 text-black hover:text-pink mx-4 ${pathname === "/" ? "underline text-pink" : ""
                    }`} >
                  Home
                </a>
                <a href="/create-story" onClick={() => setActiveLink("About us")}
                  className={`block mt-4 lg:inline-block lg:mt-0 text-black hover:text-pink mx-4 ${pathname === "/create-story" ? "underline text-pink" : ""
                    }`}>
                  About us
                </a>
                <a href="/user-library" onClick={() => setActiveLink("Library")}
                  className={`block mt-4 lg:inline-block lg:mt-0 text-black hover:text-pink mx-4 ${pathname === "/user-library" ? "underline text-pink" : ""
                    }`}>
                  Library
                </a>
              </div>
              {auth.length > 0 ? (
                <div className="flex items-center justify-end">
                  <div className="relative">
                    <button onClick={handleImageClick}>
                      <Image
                        src="/assets/healthicons_ui-user-profile.svg"
                        alt="avatar"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </button>
                    {isDropdownVisible && (
                      <div className="absolute right-0 mt-6 py-2 px-2 w-44 border-solid border-pink flex-shrink-0 bg-white rounded-lg shadow-3xl">
                        <a href="#" onClick={handleDeleteClick} className="text-black font-quicksand text-sm font-normal inline-flex items-center justify-center px-3 py-2 bg-teal">Delete My Account</a>
                      </div>
                    )}
                  </div>
                  <a
                    href="#" onClick={handleLogout} className={`mt-4 lg:inline-block lg:mt-0 text-black hover:text-pink mx-4 ${pathname === "/logout" ? "underline text-pink" : ""
                      }`}>
                    Logout
                  </a>
                  {isDeleteModalVisible && (
                    <DeleteModal
                      onClose={handleDeleteCancel}
                      title="Delete Confirmation"
                      text="Are you sure you want to delete?"
                      buttonText="Delete"
                      isVisible={true}
                      onConfirm={handleDeleteConfirm}
                    />
                  )}
                </div>
              ) : (
                <a
                  href="#"
                  onClick={() => {
                    openModal('loginModal')
                  }}
                  className="inline-block px-4 py-2 leading-none border rounded border-white hover:border-transparent text-white bg-pink mt-4 lg:mt-0"
                >
                  Login
                </a>
              )}
              {showModal.loginModal && (
                <>
                  <Modal isVisible={showModal.loginModal} onClose={() => closeModal('loginModal')}>
                    <LoginForm handleSubmit={handleSubmit} />
                  </Modal>
                </>
              )}
              {showModal.signUpModal && (
                <Modal isVisible={showModal.signUpModal} onClose={() => closeModal('signUpModal')}>
                  <SignUpForm handleSubmit={handleSubmit} />
                </Modal>
              )}
            </div>
          </div>
        </div>
      </nav >
    </div >
  );
};

export default Nav;
