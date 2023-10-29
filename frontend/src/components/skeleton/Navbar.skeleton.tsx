import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NavbarSkeleton = () => {
  return (
    <div className="p-7">
      <Skeleton height={50} />
    </div>
  );
};

export default NavbarSkeleton;
