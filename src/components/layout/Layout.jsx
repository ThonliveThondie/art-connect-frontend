// src/components/layout/Layout.jsx
import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
