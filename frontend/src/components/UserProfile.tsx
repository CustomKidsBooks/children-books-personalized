import Image from "next/image";
import LibraryCard from "./Library/LibraryCard";
import { LinkButton } from "./ui/LinkButton";

const UserProfile = () => {
  return (
    <>
      <section className="h-55 flex bg-teal">
        <div className="flex-col relative ps-20 py-10">
          <div className="h-40 py-20 flex place-items-center">
            <h1 className="text-5xl md:text-6xl font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose">
              Hi,
            </h1>
            <div className="relative shrink">
              <Image
                src="/assets/user-profile.png"
                alt="User"
                width={240}
                height={100}
              />
              <h1
                className={`text font-normal font-pacifico text-pink font_feature absolute top-1/4 mx-10 md:text-6xl text-4xl`}
              >
                adam
              </h1>
            </div>
          </div>
        </div>
        <div className="ml-auto pe-20 shrink invisible lg:visible">
          <Image
            src="/assets/group18.svg"
            alt="group18"
            width={183.817}
            height={295.488}
          />
        </div>
      </section>
      <section className="p-10 h-auto">
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
        <LibraryCard />
      </section>
      <section className="p-10 lg:h-96 h-auto bg-pink">
        <div className="flex flex-col place-items-center gap-12 p-20">
          <div>
            <h1 className="text text-white text-5xl">
              What story would you like to tell today?
            </h1>
          </div>
          <div className="px-8 py-4 gap-2 items-center flex justify-items-center w-4/6 md:w-3/6 ">
            <LinkButton
              href="/create-story"
              intent="teal"
              size="large"
              className="tracking-widest text-center text-base md:text-2xl"
            >
              Start my new book!
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
