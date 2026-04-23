import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNav from './MobileNav';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar />
      <div className="w-full lg:ml-72">
        <Topbar />
        <main className="page-shell pb-24 pt-4 md:pt-6 lg:pb-8">
          <div className="fade-in page-stack">
            <Outlet />
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
};

export default AppLayout;
