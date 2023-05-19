import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { RiSunFill, RiMoonFill } from 'react-icons/ri';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import State from './State';
//import Subscription from './Subscription';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from '../utils/AppContext';

export default function Layout({ children }) {
  return (
    <div className="bg-black">
      <Navbar />
      <ToastContainer hideProgressBar toastStyle={{ backgroundColor: "#cd4a1d", color: "#ffffff" }} />
      <div className="content">
        {children}


      </div>
      <Footer />
    </div>
  );
}
