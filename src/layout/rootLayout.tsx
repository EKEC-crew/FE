import { Outlet } from "react-router-dom";
import LeftGnb from "../components/LeftGnb/LeftGnb";
import TopGnb from "../components/TopGnb/TopGnb";

const RootLayout = () => {
  return (
    <div className="flex">
      <LeftGnb />
      <TopGnb />
      <main className="ml-16 md:ml-60 flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
