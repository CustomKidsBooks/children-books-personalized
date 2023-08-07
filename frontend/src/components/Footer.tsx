import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="md:h-36  shadow-pink shadow-inner ">
      <section className=" px-5 py-10 flex gap-10 flex-between">
        <div className="items-center">
          <Link href="/">
            <Image
              alt="Tiny Tale"
              src="/assets/tiny-tale-text.svg"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="pe-20">
          <h1 className="uppercase text-center font-bold font-sans-serif">
            contact
          </h1>
          <div className="flex-between gap-1">
            <FontAwesomeIcon icon={faEnvelope} />
            <a href="mailto:tinytale@mail.com" className="font-sans-serif">
              tinytale@mail.com
            </a>
          </div>
        </div>
      </section>
      <div className="font-sans-serif text-center h-10 bg-pink py-3 opacity-75">
        <h1 className="font-bold text-white">&copy; Tiny Tale. 2023</h1>
      </div>
    </div>
  );
};

export default Footer;
