import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoadindSpinner = () => {
  return (
    <>
      <div className="w-full grid p-30 place-items-center h-60">
        <div>
          <FontAwesomeIcon
            icon={faSpinner}
            className="place-self-center text-pink"
            size="3x"
            spin
          />
        </div>
      </div>
    </>
  );
};

export default LoadindSpinner;
