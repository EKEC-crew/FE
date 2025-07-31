import LeftGnbMyCrew from "./MyCrew";
import FilterButton from "./FilterButton";
import CrewButton from "./CreateCrewButton";
import CrewCategory from "./CrewCategoryButton";

const LeftGnb = () => {
  return (
    <nav className="fixed top-0 left-0 w-[18.75rem] h-screen px-2 pt-20 bg-white overflow-y-auto nav-scroll-hide">
      <div className="flex flex-col space-y-2 items-center pb-4">
        <CrewButton />
        <LeftGnbMyCrew />
        <FilterButton />
        <CrewCategory />
      </div>
    </nav>
  );
};

export default LeftGnb;
