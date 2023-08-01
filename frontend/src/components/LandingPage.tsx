"use client";

import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <section className="h-96 flex">
      <div className="flex-col relative">
        <div className="h-40 py-10 ps-10">
          <h1 className="text-5xl font-satoshi tracking-widest leading-loose">
            Unleashing{" "}
            <span className="font-normal font-inter text-pink font_feature">
              {/* <Image src="/assets/group.svg" alt="group" width={100} height={100} /> */}
              Love{" "}
            </span>
            Through Stories <br className="md:flex" />
            <span className="font-bold text-4xl">For kids, by you</span>
          </h1>
        </div>
        <div className="absolute bottom-20 left-10 shadow-lg">
          <Link
            href="/create-story"
            className="bg-pink p-3 text-white font-satoshi rounded w-40 px-10 text-2xl"
          >
            Start!
          </Link>
        </div>
      </div>
      <div className="ml-auto pe-20">
        <Image
          src="/assets/group18.svg"
          alt="group18"
          width={300}
          height={500}
        />
      </div>
    </section>
  );
};

export default LandingPage;
