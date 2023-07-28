"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Heading } from "@ui/Heading";
import Image from "next/image";

const LandingPage = () => {
  const [input, setInput] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setInput(event.target.value);
  };

  return (
    <section className="h-96 flex">
      <div className="h-40 py-20 ps-10">
        <h1 className="text-5xl font-satoshi tracking-widest leading-loose">
          Unleashing{" "}
          <span className="font-normal font-inter text-pink font_feature">
            {/* <Image src="/assets/group.svg" alt="group" width={100} height={100} /> */}
            Love{" "}
          </span>
          Through Stories <br />
          <span className="font-bold text-4xl">For kids, by you!</span>
        </h1>
      </div>
      <div>
        <Image
          src="/assets/group18.svg"
          alt="group18"
          width={300}
          height={500}
        />
      </div>

      {/* <Link href="/create-story" className="rounded-full bg-orange-300 p-5">
        Create a Story
      </Link> */}
    </section>
  );
};

export default LandingPage;
