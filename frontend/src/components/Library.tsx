import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChildReaching } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Tag from "./Tag";

const Library = () => {
  let tag: string[] = ["family", "divorce", "love"];

  return (
    <section className="py-10 place-items-center grid lg:grid-cols-4 gap-4 w-full md:grid-cols-2 sm:grid-cols-1">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div className="card" key={i}>
          <Image
            src="/assets/images/family.jpg"
            width={247.324}
            height={164}
            alt=""
          />
          <div className="p-2 flex justify-between items-center">
            <p className="text">Our Family</p>
            <div className="flex gap-2 ">
              <FontAwesomeIcon icon={faChildReaching} className="fa-icon" />
              <p className="text-pine-green">2-3</p>
            </div>
          </div>
          <Tag tag={tag} />
        </div>
      ))}
    </section>
  );
};

export default Library;
