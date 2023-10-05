import Image from "next/image";
import LibraryCard from "./Library/LibraryCard";
import { LinkButton } from "./ui/LinkButton";
import { UserProfile } from "@auth0/nextjs-auth0/client";

interface UserProfileValues {
  user: UserProfile;
}

const UserProfile = ({ user }: UserProfileValues) => {
  return (
    <>
      <section className="bg-teal ">
        <div className="mx-10 flex justify-between py-14 md:py-0">
          <div className="flex items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose">
                Hi,
              </h1>
            </div>
            <div className="">
              <h1 className="ms-4 p-8 sm:p-10 bg-user-profile bg-cover bg-center bg-no-repeat font-pacifico text-pink font_feature text-4xl sm:text-5xl md:text-6xl">
                {user?.nickname || user?.name}
              </h1>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="/assets/group18.svg"
              alt="group18"
              width={183.817}
              height={295.488}
            />
          </div>
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

      <section className="bg-pink px-10 py-16 flex flex-col justify-center gap-12 lg:h-96 ">
        <div>
          <h1 className="text text-center text-white text-3xl sm:text-4xl md:text-5xl ">
            What story would you like to tell today?
          </h1>
        </div>
        <div className="mx-auto">
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
