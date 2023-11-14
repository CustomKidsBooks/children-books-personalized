import ViewBook from "@components/ViewBook";
import Image from "next/image";

const ViewBookPage = ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  return (
    <section className="w-full p-10">
      <div className="relative mb-10">
        <Image
          src="/assets/story.jpg"
          alt="your-story"
          width={250}
          height={56.957}
        />
        <div className="absolute w-full top-2/4 -translate-y-2/4">
          <h1 className="text-3xl ms-7 font-quicksand font-medium">
            Your <span className="font-pacifico">Story!</span>
          </h1>
        </div>
      </div>
      <div className="bg-reading-book bg-kid-opacity bg-right-top">
        <ViewBook id={id} />
      </div>
    </section>
  );
};

export default ViewBookPage;
