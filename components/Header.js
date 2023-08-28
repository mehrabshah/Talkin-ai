import * as React from 'react';
import styles from "/styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';

// Header component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
const Header = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  //const { profilePicture } = useContext(AppContext);
  const [toggled, setToggled] = useState(false);

  return (

  <header className={styles.header}>
    <div className={styles.left}>
      <Link href="/" className={styles.logo}>
        <Image src="/talkinai_logo_white.png" width="80" height="80" alt="Logo" />
        <span className={styles.appName}>TALKIN AI</span>
      </Link>
    </div>
    <div className={styles.right}>
      <SignedOut>
      <div className="app_navbar-login">
        <Link href="/sign-in">Sign in</Link>
        </div>
        <div className="app_navbar-login">
        <Link href="/sign-up">Sign up</Link>
        </div>
      </SignedOut>
      <SignedIn>
        
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
                    <Link href="/text2video">Text2Video</Link>
                   </li>       
                  <li className="p__opensans">
                     <Link href="/pricing">Pricing</Link>
                  </li>
                  <li className="p__opensans">
                     <Link href="/plan">Plan</Link>
                  </li>

                  <li className="p__opensans">
                     <Link href="/contact">Contact</Link>
                  </li>
        
        </ul>
        <UserButton
          userProfileMode="navigation"
          userProfileUrl="/user"
          afterSignOutUrl="/"
          afterMultiSessionSingleSignOutUrl="/"
        />

       {/* small screen */}
       <div className="app_navbar-smallscreen">
       
            <GiHamburgerMenu color="#fff" fontSize={16} onClick={() => setToggleMenu(true)} />
            {toggleMenu && (
               <div className="app_navbar-smallscreen_overlay flex__center slide-bottom">
                  <MdOutlineRestaurantMenu
                     fontSize={9}
                     className="overlay__close"
                     onClick={() => setToggleMenu(false)}
                  />
                  <ul
                     className="app_navbar-smallscreen_links"
                     onClick={() => setToggleMenu(false)}
                  >

                    
                     <li className="p__opensans">
                        <Link href="/create">TalkingAvatar</Link>
                     </li>
                     <li className="p__opensans">
                     <Link href="/text2video">Text2Video</Link>
                     </li>
                     <li className="p__opensans">
                        <Link href="/pricing">Pricing</Link>
                     </li>
                    

                  </ul>
               </div>
            )}
         </div>  

      </SignedIn>
    </div>
  </header>
)
};

export default Header;
