import DownloadBook from "@components/DownloadBook";
import SendBook from "@components/SendBook";
import Image from "next/image";
const PreviewBook = () => {
  return (
    <section className="w-full pl-10 py-10 yellow-background_radial">
      <div className="mr-0 bg-undraw_flowers bg-right-bottom bg-no-repeat bg-contain">
        <div className="relative shrink">
          <Image
            src="/assets/story.jpg"
            alt="your-story"
            width={250}
            height={56.957}
          />
          <div className="absolute  w-72 h-20 top-1/3">
            <h1 className="text-4xl font-quicksand font-medium mx-10 tracking-widest leading-relaxed">
              Your <span className="font-pacifico">Story!</span>
            </h1>
          </div>
        </div>
        <div className="py-10 grid grid-cols-2 gap-10">
          <div>book info</div>
          <div>
            <div className="flex flex-col gap-5 w-52">
              <DownloadBook />
              <SendBook />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewBook;
