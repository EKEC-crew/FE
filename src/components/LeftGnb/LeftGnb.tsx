import LeftGnbMyCrew from "./LeftGnbMyCrew";
import FilterButton from "./FilterButton";
import CrewButton from "./CrewButton";
import CrewCategory from "./CrewCategory";

const LeftGnb = () => {
  return (
    <nav className=" p-2 pt-20 h-screen w-60 fixed top-0 left-0">
      <div className="flex flex-col space-y-2">
        <CrewButton />
        <LeftGnbMyCrew />
        <FilterButton />
        <CrewCategory />
      </div>
    </nav>
  );
};

export default LeftGnb;
