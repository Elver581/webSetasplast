
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Outlet, useLocation } from 'react-router-dom';
//import ChatBot from '../components/ChatBoot';




const Layout = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
  {/**  <ChatBot />*/}
      {/* En el inicio el Hero pasa por debajo del navbar; en el resto se compensa la altura */}
      <main className={`flex-grow ${isHome ? '' : 'pt-20'}`}>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
