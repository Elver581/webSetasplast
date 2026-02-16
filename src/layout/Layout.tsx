
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Outlet } from 'react-router-dom';
import ChatBot from '../components/ChatBoot';




const Layout= () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
    <ChatBot />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
