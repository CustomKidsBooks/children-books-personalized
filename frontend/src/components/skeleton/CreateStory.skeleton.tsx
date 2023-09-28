import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateStorySkeleton = () => {
  return (
    <div className="w-full grid p-30 place-items-center h-60">
      <FontAwesomeIcon
        icon={faBook}
        className="place-self-center text-pink"
        size="3x"
        spin
      />
      <p className="text-pink">We are Creating Your Story....</p>
    </div>
  );
};

export default CreateStorySkeleton;
