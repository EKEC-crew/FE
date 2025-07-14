import LeftGnbMyCrew from "./LeftGnbMyCrew";
import FilterButton from "./FilterButton";
import CrewButton from "./CrewButton";
import CrewCategory from "./CrewCategory";

const LeftGnb = () => {
  return (
    <nav className="fixed top-0 left-0 w-60 h-screen pl-4 pt-20 bg-white overflow-y-auto nav-scroll-hide">
      <div className="flex flex-col space-y-2 pb-4">
        <CrewButton />
        <LeftGnbMyCrew />
        <FilterButton />
        <CrewCategory />
      </div>
    </nav>
  );
};

export default LeftGnb;
