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
import DeleteModal from "./delete/delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { useUser } from "@auth0/nextjs-auth0/client";

const Nav = () => {
  const { user, error, isLoading } = useUser();
  console.log("user", user);

  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const { showModal, openModal, closeModal, auth, setToken } =
    useContext(ModalContext);
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
  const handleSubmit = async (
    values: LoginFormValues | SignUpFormValues,
    formType: "login" | "signup"
  ) => {
    try {
      if (formType === "login") {
        setLoggedIn(true);
        setToken("xyz");
        closeModal("loginModal");
      } else if (formType === "signup") {
        setLoggedIn(true);
        closeModal("signUpModal");
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setToken("");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const LoginButton = () => {
    return (
      <>
        {user ? (
          <div className="flex items-center">
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
                <div className="absolute right-[-120px] top-[22px] mt-6 py-2 px-2 w-44 border-solid border-pink flex-shrink-0 bg-white rounded-lg shadow-3xl">
                  <a
                    href="#"
                    onClick={handleDeleteClick}
                    className="text-black font-quicksand text-sm font-normal inline-flex items-center justify-center px-3 py-2 bg-teal"
                  >
                    Delete My Account
                  </a>
                </div>
              )}
            </div>
            <a
              href="/api/auth/logout"
              // onClick={handleLogout}
              className={` lg:inline-block lg:mt-0 text-black hover:text-pink mx-4 ${
                pathname === "/logout" ? "underline text-pink" : ""
              }`}
            >
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
            href="/api/auth/login"
            // onClick={() => {
            //   openModal("loginModal");
            // }}
            // onClick={handleLogin}
            className="inline-block px-4 py-2 leading-none border rounded border-white hover:border-transparent text-white bg-pink mt-4 lg:mt-0"
          >
            Login
          </a>
        )}
      </>
    );
  };

  return (
    <>
      <nav className="bg-white">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  <Image
                    alt="Children Book"
                    src="/assets/logo.svg"
                    width={150}
                    height={150}
                    className="object-contain"
                  />
                </Link>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="font-quicksand font-medium text-2xl hidden sm:ml-6 sm:block">
                <div className="flex items-center">
                  <a
                    href="/"
                    onClick={() => setActiveLink("home")}
                    className={`block lg:inline-block lg:mt-0 text-black hover:text-pink mx-4 ${
                      pathname === "/" ? "underline text-pink" : ""
                    }`}
                  >
                    Home
                  </a>
                  <a
                    href="/create-story"
                    onClick={() => setActiveLink("About us")}
                    className={`block lg:inline-block lg:mt-0 text-black hover:text-pink mx-4 ${
                      pathname === "/create-story" ? "underline text-pink" : ""
                    }`}
                  >
                    About us
                  </a>
                  <a
                    href="/user-library"
                    onClick={() => setActiveLink("Library")}
                    className={`block lg:inline-block lg:mt-0 text-black hover:text-pink mx-4 ${
                      pathname === "/user-library" ? "underline text-pink" : ""
                    }`}
                  >
                    Library
                  </a>
                  {LoginButton()}
                </div>
              </div>
            </div>
            {showModal.loginModal && (
              <>
                <Modal
                  isVisible={showModal.loginModal}
                  onClose={() => closeModal("loginModal")}
                >
                  <LoginForm handleSubmit={handleSubmit} />
                </Modal>
              </>
            )}
            {showModal.signUpModal && (
              <Modal
                isVisible={showModal.signUpModal}
                onClose={() => closeModal("signUpModal")}
              >
                <SignUpForm handleSubmit={handleSubmit} />
              </Modal>
            )}
            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setMenuOpen(!isMenuOpen)}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2 font-quicksand font-medium text-lg">
              <a
                href="/"
                onClick={() => setActiveLink("home")}
                className={`block mt-4 lg:inline-block lg:mt-0 text-black hover:text-pink mx-4 ${
                  pathname === "/" ? "underline text-pink" : ""
                }`}
              >
                Home
              </a>
              <a
                href="/create-story"
                onClick={() => setActiveLink("About us")}
                className={`block mt-4 lg:inline-block lg:mt-0 text-black hover:text-pink mx-4 ${
                  pathname === "/create-story" ? "underline text-pink" : ""
                }`}
              >
                About us
              </a>
              <a
                href="/user-library"
                onClick={() => setActiveLink("Library")}
                className={`block mt-4 lg:inline-block lg:mt-0 text-black hover:text-pink mx-4 ${
                  pathname === "/user-library" ? "underline text-pink" : ""
                }`}
              >
                Library
              </a>
              {LoginButton()}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;
