import * as React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppContext from '../../utils/AppContext';


const Navbar = () => {
   const [toggleMenu, setToggleMenu] = React.useState(false);

   //const { profilePicture } = useContext(AppContext);
   const [toggled, setToggled] = useState(false);
   const [userProfile, setUserProfile] = useState('');
   const session = useSession();
   const router = useRouter();

   const { status, data } = session;
   const handleSignout = () => {
      signOut({ callbackUrl: '/auth/signin' });
   };


   const fetchUserProfile = async () => {
      const user = await fetch(`/api/fetch-user-profile?email=${data?.user?.email}`);
      const response = await user.json();
      setUserProfile(response?.profilePicture);
   };


   useEffect(() => {
      fetchUserProfile();
      //fetchUserUsage;

   });


   return (
      <div className="app_navbar">
         <div className="app_navbar-logo">
            <img src='/talkinai_logo_white.png' alt="app logo" />
            <div className="header1 text-3xl font-bold">{' '}TALKIN.AI</div>
         </div>

         <div className="basis-2/4 flex items-center justify-end">
            {status === 'authenticated' ? (
               <ul className="app_navbar-links">
                  <li className="p__opensans">
                     <Link href="/">Home</Link>
                  </li>
                  <li className="p__opensans">
                     <Link href="/about">About</Link>
                  </li>
                  <li className="p__opensans">
                     <Link href="/create">TalkingAvatar</Link>
                  </li>
                  <li className="p__opensans">
                     <Link href="/tube2lip">Tube2Lip</Link>
                  </li>



                  <li className="p__opensans">
                     <Link href="/pricing">Pricing</Link>
                  </li>

                  <li className="p__opensans">
                     <Link href="/contact">Contact</Link>
                  </li>
                  <li onClick={handleSignout} className="p__opensans">
                     Logout
                  </li>
                  <li className="app_navbar-profile">
                     <Link href="/profile">
                        {userProfile ? (<img alt="profile" src={userProfile} />) :
                           (<img alt="profile" src="/talkinai_bobo.jpeg" />)}
                     </Link>
                  </li>

               </ul>) : (<>
                  <div className="app_navbar-login">
                     <Link href="/auth/signin">
                        Log In / Register
                     </Link>
                  </div>
               </>)}

         </div>

         {/* small screen */}
         <div className="app_navbar-smallscreen">
            <GiHamburgerMenu color="#fff" fontSize={21} onClick={() => setToggleMenu(true)} />
            {toggleMenu && (
               <div className="app_navbar-smallscreen_overlay flex__center slide-bottom">
                  <MdOutlineRestaurantMenu
                     fontSize={16}
                     className="overlay__close"
                     onClick={() => setToggleMenu(false)}
                  />
                  <ul
                     className="app_navbar-smallscreen_links"
                     onClick={() => setToggleMenu(false)}
                  >

                     <li className="hero-button">
                        <Link href="/auth/signin"> Log In / Register</Link>
                     </li>
                     <li className="p__opensans">
                        <Link href="/create">TalkingAvatar</Link>
                     </li>
                     <li className="p__opensans">
                        <Link href="/tube2lip">Tube2Lip</Link>
                     </li>
                     <li className="p__opensans">
                        <Link href="/chatgpt">GPT2Speech</Link>
                     </li>
                     <li className="p__opensans">
                        <Link href="/pricing">Pricing</Link>
                     </li>

                  </ul>
               </div>
            )}
         </div>
      </div>
   );
};
export default Navbar;
