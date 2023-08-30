"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "@components/Modal";
import LoginForm from "@components/LoginForm";
import { LoginFormValues } from "@utils/interfaces";

const Nav = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      // Simulate an API call for login
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Handle successful login here
        console.log("Login successful");
        setIsLoginModalOpen(false); // Close the modal after successful login
      } else {
        // Handle login error here
        console.error("Login error");
      }
    } catch (error) {
      console.error("API error:", error);
    }
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
            <a href="/" onClick={() => setActiveLink("home")}
              className={`block mt-4 lg:inline-block lg:mt-0 text-black hover:text-pink mx-4 ${activeLink === "home" ? "underline" : ""
                }`} >
              Home
            </a>
            <a href="/login" onClick={() => setActiveLink("About us")}
              className={`block mt-4 lg:inline-block lg:mt-0 text-black hover:text-pink mx-4 ${activeLink === "About us" ? "underline" : ""
                }`}>
              About us
            </a>
            <a href="/signup" onClick={() => setActiveLink("Library")}
              className={`block mt-4 lg:inline-block lg:mt-0 text-black hover:text-pink mx-4 ${activeLink === "Library" ? "underline" : ""
                }`}>
              Library
            </a>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              openLoginModal();
            }} className="inline-block px-4 py-2 leading-none border rounded border-white hover:border-transparent text-white bg-pink mt-4 lg:mt-0">Login</a>
          </div>
        </div>
      </nav>
      {isLoginModalOpen && (
        <Modal isVisible={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
          <LoginForm handleSubmit={handleSubmit} />
        </Modal>
      )}
    </div>
  );
};

export default Nav;
