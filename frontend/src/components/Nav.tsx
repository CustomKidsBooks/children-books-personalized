"use client";

import Image from "next/image";
import Link from "next/link";

const Nav = () => {
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
      </nav>
    </div>
  );
};

export default Nav;
