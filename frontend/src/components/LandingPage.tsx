"use client";

import Image from "next/image";
import StartStep from "./StartStep";
import { LinkButton } from "@ui/LinkButton";

const LandingPage = () => {
  return (
    <>
      <section className="h-96 flex bg-teal">
        <div className="flex-col relative">
          <div className="h-40 py-10 ps-10">
            <h1 className="text-4xl md:text-5xl font-sans-serif tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose">
              Unleashing{" "}
              <span className="font-normal font-inter text-pink font_feature">
                Love{" "}
              </span>
              Through Stories <br className="lg:block hidden" />
              <span className="font-bold text-4xl ">For kids, by you!</span>
            </h1>
          </div>
          <div className="absolute bottom-20 left-10 shadow-lg">
            <LinkButton href="/create-story" intent="pink" size="large">
              Start!
            </LinkButton>
          </div>
        </div>
        <div className="ml-auto pe-20 shrink invisible lg:visible">
          <Image
            src="/assets/group18.svg"
            alt="group18"
            width={313}
            height={388}
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
          <h1 className="absolute top-1/3 md:text-4xl text-3xl font-sans-serif font-medium mx-16">
            Library
          </h1>
        </div>
      </section>
      <section className="p-10 lg:h-[600px] sm:h-auto">
        <div className="relative shrink">
          <div>
            <Image
              src="/assets/how-to-start.jpg"
              alt="how-to-start"
              width={289.713}
              height={12.5}
            />
            <h1 className="absolute top-1/3 text-3xl font-sans-serif font-medium mx-10">
              How to start?
            </h1>
          </div>
        </div>
        <StartStep />
      </section>
    </>
  );
};

export default LandingPage;
