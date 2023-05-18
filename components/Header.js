import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { SlArrowDown, SlLogout, SlUser } from 'react-icons/sl';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppContext from '../utils/AppContext';


export default function Header() {
  const { searchValue, setSearchValue, profilePicture } = useContext(AppContext);
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
    <div className="m-0 fixed border dark:border-none  bg-black text-black py-3 top-0 w-full z-50">
      <div className="flex items-center justify-center mx-2 md:mx-5 my-3">
        <div className="basis-2/4 flex items-center justify-start p-1">
          <div className="md:mr-30">
            <Link href="/"><img src="/talkin_logo.png" alt="talkin-ai-Logo" className="max-w-2xl w-28 m-0" /></Link>
          </div>
          <div className="header1 text-4xl font-bold">TALKIN AI</div>
        </div>

        <div className="basis-2/4 flex items-center justify-end">
          {status === 'authenticated' ? (
            <>
              <div onClick={handleSignout} className="cursor-pointer hidden md:block mr-3 md:mr-5">
                <span className="bg-color-orange text-white p-2 hover:text-gray-400">Logout</span>
              </div>
              <div className="hidden bg-color-orange  text-white p-2 md:flex items-center justify-around mr-3 md:mr-5 cursor-pointer">
                <Link href="/create">
                  <span className={`${router.pathname === '/create' ? 'border-b-4 ' : ''}cursor-pointer hover:text-gray-400`}>TalkingAvatar</span>
                </Link>
              </div>
              <div className="hidden bg-color-orange  text-white p-2 md:flex items-center justify-around mr-3 md:mr-5 cursor-pointer">
                <Link href="/chatgpt">
                  <span className={`${router.pathname === '/chatgpt' ? 'border-b-4 ' : ''}cursor-pointer hover:text-gray-400`}>GPT2Speech</span>
                </Link>
              </div>
              <div className="hidden bg-color-orange  text-white p-2 md:flex items-center justify-around mr-3 md:mr-5 cursor-pointer">
                <Link href="/tube2lip">
                  <span className={`${router.pathname === '/tube2lip' ? 'border-b-4 ' : ''}cursor-pointer hover:text-gray-400`}>Tube2Lip</span>
                </Link>
              </div>
              <div className="hidden bg-color-orange  text-white p-2 md:flex items-center justify-around mr-3 md:mr-5 cursor-pointer">
                <Link href="/creations" className="">
                  <span className={`${router.pathname === '/creations' ? 'border-b-4 ' : ''}cursor-pointer hover:text-gray-400`}>Creations</span>
                </Link>
              </div>
              <div className="hidden bg-color-orange  text-white p-2 md:flex items-center justify-around mr-3 md:mr-5 cursor-pointer">
                <Link href="/pricing" className="">
                  <span className={`${router.pathname === '/pricing' ? 'border-b-4 ' : ''}cursor-pointer hover:text-gray-400`}>Pricing</span>
                </Link>
              </div>

              <div className="hidden bg-color-orange  text-white p-2 md:flex items-center justify-around mr-3 md:mr-5 cursor-pointer">
                <Link href="/q_a" className="">
                  <span className={`${router.pathname === '/q_a' ? 'border-b-4 ' : ''}cursor-pointer hover:text-gray-400`}>Community</span>
                </Link>
              </div>
            </>
          )
            : (
              <div className="flex flex-row">
                <Link href="/auth/signin">
                  <div className="cursor-pointer block mr-5">
                    <span className="header-button text-white p-2 hover:text-gray-400">Log In</span>
                  </div>
                </Link>
                <Link href="/about" className="">
                  <span className={`${router.pathname === '/about' ? 'border-b-4 ' : ''}md:hidden cursor-pointer hover:text-gray-400 mr-5`}>About</span>
                </Link>
              </div>
            )}
          <div className="hidden md:flex items-center justify-around mr-3 md:mr-5 cursor-pointer">
            <Link href="/about" className="">
              <span className={`${router.pathname === '/about' ? 'border-b-4 ' : ''}cursor-pointer hover:text-gray-400`}>About</span>
            </Link>
          </div>

          {status
            ? data?.user
            && (
              <div className="ml-0 md:ml-5 flex flex-col relative z-50">
                <div onClick={() => { setToggled(!toggled); }} className="flex w-40 md:w-fit items-center justify-end space-x-4 cursor-pointer md:cursor-default bg-black    relative z-50 mr-0">
                  {userProfile ? (
                    <>
                      <Link href="/profile">
                        <img className="w-12 border cursor-pointer hidden md:block rounded-full h-12" alt="profile" src={userProfile} />
                      </Link>
                      <img className="w-12 border block md:hidden rounded-full h-12" alt="profile" src={userProfile} />
                    </>
                  )
                    : (
                      <>
                        <Link href="/profile">
                          <img className="w-12 border cursor-pointer hidden md:block rounded-full h-12" alt="profile" src="/talkinai_bobo.jpeg" />
                        </Link>
                        <img className="w-12 border block md:hidden rounded-full h-12" alt="profile" src="/talkinai_bobo.jpeg" />

                      </>
                    )}
                  <span className={`${toggled ? 'rotate-180' : 'rotate-0'} transition-all duration-500 md:hidden p-3`}><SlArrowDown /></span>
                </div>

                <div className={`${toggled ? 'top-12 z-50 bg-white' : '-z-50 top-0 border-none'} flex flex-col absolute -z-50 -right-2 top-0 w-full  dark:bg-slate-800 transition-all duration-500 border border-t-0 dark:border-none md:hidden`}>
                  <Link href="/profile">
                    <p onClick={() => { setToggled(!toggled); }} className={`${toggled ? 'my-5 left-0' : 'h-0 my-0 top-5'} ${router.pathname === '/profile' ? 'border-l-8 border-r-8' : ''} relative cursor-pointer hover:text-gray-400 text-center flex items-center justify-center transition-all duration-150`}>
                      <SlUser size={24} className="border rounded-full p-1" />
                      <span className="ml-3">Profile</span>
                    </p>
                  </Link>
                  <Link href="/create"><span onClick={() => { setToggled(!toggled); }} className={`${toggled ? 'my-5 left-0' : 'h-0 my-0'} ${router.pathname === '/create' ? 'border-l-8 border-r-8' : ''} relative cursor-pointer hover:text-gray-400 text-center transition-all duration-300`}>TalkingAvatar</span></Link>
                  <Link href="/chatgpt"><span onClick={() => { setToggled(!toggled); }} className={`${toggled ? 'my-5 left-0' : 'h-0 my-0'} ${router.pathname === '/chatgpt' ? 'border-l-8 border-r-8' : ''} relative cursor-pointer hover:text-gray-400 text-center transition-all duration-500`}>GPT2Speech</span></Link>
                  <Link href="/tube2lip"><span onClick={() => { setToggled(!toggled); }} className={`${toggled ? 'my-5 left-0' : 'h-0 my-0'} ${router.pathname === '/tube2lip' ? 'border-l-8 border-r-8' : ''} relative cursor-pointer hover:text-gray-400 text-center transition-all duration-500`}>Tube2Lip</span></Link>
                  <Link href="/creations"><span onClick={() => { setToggled(!toggled); }} className={`${toggled ? 'my-5 left-0' : 'h-0 my-0'} ${router.pathname === '/creations' ? 'border-l-8 border-r-8' : ''} relative cursor-pointer hover:text-gray-400 text-center transition-all duration-700`}>Creations</span></Link>
                  <Link href="/pricing"><span onClick={() => { setToggled(!toggled); }} className={`${toggled ? 'my-5 left-0' : 'h-0 my-0'} ${router.pathname === '/pricing' ? 'border-l-8 border-r-8' : ''} relative cursor-pointer hover:text-gray-400 text-center transition-all duration-700`}>Pricing</span></Link>
                  <Link href="/community"><span onClick={() => { setToggled(!toggled); }} className={`${toggled ? 'my-5 left-0' : 'h-0 my-0'} ${router.pathname === '/community' ? 'border-l-8 border-r-8' : ''} relative cursor-pointer hover:text-gray-400 text-center transition-all duration-700`}>Community</span></Link>
                  <p onClick={handleSignout} className="flex items-center justify-center cursor-pointer text-color-orange text-center p-2 hover:text-gray-400">
                    <SlLogout />
                    <span className="ml-4">Logout</span>
                  </p>
                </div>
              </div>
            )
            : null}
        </div>
      </div>
    </div>
  );
}
