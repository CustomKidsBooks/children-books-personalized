"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@ui/Button";

// background: var(--background-light-primary, #FFF);
// box-shadow: 0px 5px 5px 0px rgba(2, 3, 3, 0.04), 0px 3px 14px 0px rgba(2, 3, 3, 0.02), 0px 8px 10px 0px rgba(2, 3, 3, 0.03);

const Nav = () => {
  return (
    <nav className="flex-between w-full h-120 mb-16 py-3 px-20">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          alt="Children Book"
          src="/assets/logo.svg"
          width={150}
          height={150}
          className="object-contain"
        />
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          <Link href="/read-book">Read Book</Link>
        </div>
      </div>
      {/* Mobile NAvigation */}
    </nav>
  );
};

export default Nav;
