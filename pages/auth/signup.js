import { signIn, getProviders } from 'next-auth/react';
import { RiGithubLine } from 'react-icons/ri';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';

export default function SignIn({ providers }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [userInfo, setUserInfo] = useState({
    fullName: '', email: '', password: '',
  });
  const [errors, setErrors] = useState({
    fullName: '', email: '', password: '',
  });

  // validate email address
  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegex)) {
      return true;
    }
    return false;
  };

  // handle user's input
  const handleFormInput = (e) => {
    setSignupError('');
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle submission for credentials
  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();

    if (userInfo.fullName === '') {
      setErrors((prev) => ({ ...prev, fullName: 'Please enter full name' }));
      return;
    }

    if (userInfo.email === '') {
      setErrors((prev) => ({ ...prev, email: 'Please enter email address' }));
      return;
    }
    const emailCorrect = validateEmail(userInfo.email);
    if (!emailCorrect) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a correct email address' }));
      return;
    }

    if (userInfo.password === '') {
      setErrors((prev) => ({ ...prev, password: 'Please enter password' }));
      return;
    }

    setLoading(true);

    // send request to api/signup route
    let res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res = await res.json();
    const { error } = res;
    if (error) {
      setLoading(false);
      toast(error, { type: 'error' });
      setSignupError(error);
      return;
    }
    setLoading(false);
    toast('Signup Successful!', { type: 'success' });
    // redirect to sigin page
    router.push('/auth/signin');
  };

  // signup using github
  //const handleGithubSubmit = async () => {
  //  await signIn('github', { callbackUrl: '/' });
  //};

  return (
    <div className="text-white">
      <div class="inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div class="blur-[106px] h-30 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div class="blur-[106px] h-20 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
    </div>
      <div className="h-screen flex flex-col justify-center items-center">
        <form onSubmit={handleCredentialsSubmit} method="post" className="w-4/5 sm:w-96 md:lg-1/3 lg:w-1/4">
          <h1 className="header1 text-center my-5 text-3xl">Please Signup </h1>
          {signupError && <p className="text-center text-red-500">{signupError}</p>}
          <div className="mt-5">
            <label htmlFor="fullName">Full Name</label>
            <input onChange={handleFormInput} placeholder="John Doe" name="fullName" className="mt-2 text-black block border w-full p-2 rounded-md" />
            {errors.fullName && <p className="text-red-400">{errors.fullName}</p>}
          </div>
          <div className="mt-5">
            <label htmlFor="email">Email</label>
            <input onChange={handleFormInput} placeholder="janedoe@gmail.com" name="email" className="mt-2 text-black block border w-full p-2 rounded-md" />
            {errors.email && <p className="text-red-400">{errors.email}</p>}
          </div>
          <div className="mt-5">
            <label htmlFor="password">Password</label>
            <input onChange={handleFormInput} placeholder="***********" name="password" type="password" className="mt-2 text-black block border w-full p-2 rounded-md" />
            {errors.password && <p className="text-red-400">{errors.password}</p>}
          </div>
          {loading ? <Loading className="border" /> : <button type="submit" className="hero-button bg-black w-20 border text-white p-2 rounded-md mt-5">Sign up</button>}
        </form>
        <div className="w-4/5 sm:w-96 md:lg-1/3 lg:w-1/4 mt-5">
        <p className="text-gray-600 font-bold text-left  text-sm">
                  By clicking Sign up, you agree to our <Link href='/terms' className='myLink'>Terms and Conditions </Link> and <Link href='/privacy-policy' className='myLink'>Privacy Policy</Link>.
                  </p>
          
        </div>
        <div className="my-4">
          <p>
            Already Have an account?
            <Link href="/auth/signin"><span className="underline ml-4 p-1 cursor-pointer border-2 border-dashed">Login</span></Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// fetch providers available
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
