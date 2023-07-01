"use client";

import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          alt="Children Book"
          src="/public/assets/images/logo.svg"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="">Children Book</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          <button type="button" className="black_btn">
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
