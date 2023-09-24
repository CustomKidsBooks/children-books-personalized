import Image from "next/image";
import LibraryCard from "./Library/LibraryCard";
import { LinkButton } from "./ui/LinkButton";

const UserProfile = () => {
  return (
    <>
      <section className="h-55 flex justify-between relative bg-teal ">
        <div className="flex items-center py-10 md:py-0 mx-auto sm:mx-10">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose">
              Hi,
            </h1>
          </div>
          <div className="relative">
            <Image
              src="/assets/user-profile.png"
              alt="User"
              width={240}
              height={100}
            />
            <h1 className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text font-normal font-pacifico text-pink font_feature md:text-6xl sm:text-5xl text-4xl">
              adam
            </h1>
          </div>
        </div>
        <div className="hidden md:block me-10">
          <Image
            src="/assets/group18.svg"
            alt="group18"
            width={183.817}
            height={295.488}
            className="responsive"
          />
        </div>
      </section>
      <section className="p-10 h-auto">
        <div className="relative inline-block">
          <Image
            src="/assets/library.jpg"
            alt="Library"
            width={247}
            height={126}
          />
          <h1 className="absolute top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 md:text-4xl text-3xl font-quicksand font-medium">
            Library
          </h1>
        </div>
        <LibraryCard />
      </section>

      <section className="px-10 py-20 lg:h-96 flex flex-col justify-center items-center gap-12 h-auto bg-pink">
        <div>
          <h1 className="text text-center text-white text-3xl sm:text-4xl md:text-5xl ">
            What story would you like to tell today?
          </h1>
        </div>
        <div>
          <LinkButton
            href="/create-story"
            intent="teal"
            size="large"
            className="tracking-widest text-center text-base md:text-2xl"
          >
            Start my new book!
          </LinkButton>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
