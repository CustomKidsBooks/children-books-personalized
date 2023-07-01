"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";

const LandingPage = () => {
  const [input, setInput] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    console.log(event.target.value);
    setInput(event.target.value);
  };

  return (
    <section className="home">
      {/* <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Enter a text"
          onChange={handleChange}
          required
          className="search_input"
        />
      </form>
      <div>
        <p>{input}</p> 
      </div>*/}
      <Link href="/create-story" className="rounded-full bg-orange-300 p-5">
        Create a Story
      </Link>
    </section>
  );
};

export default LandingPage;
