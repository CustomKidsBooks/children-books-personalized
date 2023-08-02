"use client";

import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <section className="h-96 flex bg-green">
        <div className="flex-col relative">
          <div className="h-40 py-10 ps-10">
            <h1 className="text-5xl font-satoshi tracking-widest leading-loose">
              Unleashing{" "}
              <span className="font-normal font-inter text-pink font_feature">
                {/* <Image
                  src="/assets/group.svg"
                  alt="group"
                  width={100}
                  height={100}
                /> */}
                Love{" "}
              </span>
              Through Stories <br className="lg:block hidden" />
              <span className="font-bold text-4xl ">For kids, by you!</span>
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
        <div className="ml-auto pe-20 shrink invisible lg:visible">
          <Image
            src="/assets/group18.svg"
            alt="group18"
            width={313}
            height={388}
            // fill
            // sizes="(max-width: 1024px) 313px, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </section>
      <section className="p-10 h-[800px]">
        <div className="relative shrink">
          <Image
            src="/assets/library.jpg"
            alt="Library"
            width={247}
            height={126}
          />
          <h1 className="absolute top-1/3 md:text-4xl text-3xl font-satoshi font-medium mx-16">
            Library
          </h1>
        </div>
      </section>
      <section className="p-10 h-[500px]">
        <div className="relative shrink">
          <Image
            src="/assets/how-to-start.jpg"
            alt="how-to-start"
            width={289.713}
            height={12.5}
          />
          <h1 className="absolute top-1/3 md:text-3xl text-lg font-satoshi font-medium mx-10">
            How to start?
          </h1>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
