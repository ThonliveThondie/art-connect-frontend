import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({userType = 'artist'}) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar userType={userType} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header userType={userType} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
