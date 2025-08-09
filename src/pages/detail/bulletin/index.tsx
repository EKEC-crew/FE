import { Outlet } from "react-router-dom";
import BulletinList from "../../../components/detail/bulletin/BulletinList";

function Bulletin() {
  return (
    <div className="min-h-screen">
      <BulletinList />
      <Outlet />
    </div>
  );
}

export default Bulletin; 