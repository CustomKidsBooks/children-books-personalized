"use client";

import { LinkButton } from "@ui/LinkButton";
import Image from "next/image";
import LibraryDisplay from "./LibraryDisplay";

const AboutPage = () => {
  return (
    <>
      <section className="h-96 bg-teal">
        <div className="w-5/6 mx-auto flex justify-between">
          <div className="flex flex-col justify-evenly h-96">
            <div className="">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-quicksand">
                Unleashing{" "}
                <div className="relative inline px-5">
                  <span className="relative z-10 font-normal font-pacifico text-pink font_feature">
                    Love{" "}
                  </span>
                  <Image
                    src="/assets/love_landing_page.png"
                    alt=""
                    width={300}
                    height={50}
                    className="absolute top-[-25px] right-0 z-0"
                  />
                </div>
                Through Stories <br className="lg:block hidden" />
                <span className="font-bold text-2xl md:text-3xl lg:text-4xl block mt-7">
                  For kids, by you!
                </span>
              </h1>
            </div>
            <div className="flex sm:block">
              <LinkButton
                href="/create-story"
                intent="pink"
                size="large"
                className="text-center"
              >
                Start!
              </LinkButton>
            </div>
          </div>
          <div className="shrink hidden lg:block">
            <Image
              src="/assets/group18.svg"
              alt="group18"
              width={313}
              height={388}
            />
          </div>
        </div>
      </section>
      <section className="bg-ellipse-landing-page bg-no-repeat bg-right sm:bg-none">
        <div className="py-10 w-5/6 mx-auto lg:h-[400px] sm:h-auto">
          <div className="relative shrink">
            <div>
              <Image
                src="/assets/how-to-start.jpg"
                alt="how-to-start"
                width={300}
                height={12.5}
              />
              <h1 className="text absolute top-1/4 text-4xl font-medium mx-10 tracking-widest">
                About Us
              </h1>
            </div>
          </div>
          <h2 className="pt-10 lg:text-xl font-quicksand lg:font-semibold">
            Welcome to the Tiny Tale, an AI-Powered Children&apos;s Books
            Platform!
            <br />
            Our mission is to transform how children engage with stories by
            combining technology
            <br />
            and storytelling to create a personalized and educational reading
            experience.
            <br />
            We are committed to nurturing a love for reading, fostering
            creativity, and
            <br />
            cultivating a thirst for knowledge. Join us on this magical quest to
            make
            <br />
            learning an enchanting adventure for every child, one tiny tale at a
            time.
          </h2>
        </div>
      </section>
      <section className="py-10 w-5/6 mx-auto h-auto">
        <div className="relative shrink">
          <Image
            src="/assets/library.jpg"
            alt="Library"
            width={247}
            height={126}
          />
          <h1 className="absolute top-1/4 md:text-4xl text-3xl font-quicksand font-medium mx-16">
            Library
          </h1>
        </div>
        <LibraryDisplay booksPerPage={4} />
      </section>
    </>
  );
};

export default AboutPage;
