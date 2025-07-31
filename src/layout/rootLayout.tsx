import { Outlet } from "react-router-dom";
import LeftGnb from "../components/LeftGnb/LeftGnb";
import TopGnb from "../components/TopGnb/TopGnb";

const RootLayout = () => {
  return (
    <div className="flex">
      <LeftGnb />
      <TopGnb />
      <main className="md:ml-[18.75rem] flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
