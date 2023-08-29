import DownloadBook from "@components/DownloadBook";
import PreviewBook from "@components/PreviewBook";
import SendBook from "@components/SendBook";
import Image from "next/image";

const Preview = ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  return (
    <section className="w-full pl-40 py-10 yellow-background_radial">
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
        <div className="bg-reading-book bg-kid-opacity bg-right-top">
          <PreviewBook id={id} />
        </div>
      </div>
    </section>
  );
};

export default Preview;
