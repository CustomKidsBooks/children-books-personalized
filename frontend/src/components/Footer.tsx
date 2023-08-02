import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <section className="h-36 shadow-lg shadow-regal-blue px-5 py-10 flex gap-10 flex-between">
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
      <div className="flex-between gap-5">
        <Link href="/" className="font-satoshi">
          tinytale@mail.com
        </Link>
        <h1 className="font-satoshi">&copy;2023 Tiny Tale.</h1>
      </div>
    </section>
  );
};

export default Footer;
