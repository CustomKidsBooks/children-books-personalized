"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";

const LandingPage = () => {
  const [input, setInput] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setInput(event.target.value);
  };

  return (
    <section className="home">
      <Link href="/create-story" className="rounded-full bg-orange-300 p-5">
        Create a Story
      </Link>
    </section>
  );
};

export default LandingPage;
