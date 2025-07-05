import { Outlet } from 'react-router-dom';
import LeftGnb from '../components/LeftGnb/LeftGnb';

const RootLayout = () => {
  return (
    <div className="flex">
      <LeftGnb />
      <main className="ml-16 md:ml-60 flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
