import styles from "/styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';

// Header component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
const Header = () => (
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
        <Link href="/sign-in">Sign in / Sign up</Link>
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
                  
                  <li className="dropdown">
    <button className="dropbtn">AI2Tube 
      <i className="fa fa-caret-down"></i>
    </button>
    <div className="dropdown-content">
      <Link href="/tube2lip">Text2Tube</Link>
      <Link href="/tube2lip_v2">Tube2Tube</Link>
      
    </div>
  </li> 
                  
                  
                  <li className="p__opensans">
                     <Link href="/pricing">Pricing</Link>
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

         

      </SignedIn>
    </div>
  </header>
);

export default Header;
