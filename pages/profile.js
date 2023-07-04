import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getToken } from 'next-auth/jwt';
import { toast } from 'react-toastify';
import Link from 'next/link';
import prisma from '../lib/prisma';
import ErrorComponent from '../components/ErrorComponent';
import Loading from '../components/Loading';
import AppContext from '../utils/AppContext';
import { BsFillCupHotFill } from 'react-icons/bs';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import Head from "next/head";
import { loadPortal } from 'utils/payment';

export default function Profile({
  error, user, creations
}) {


  const { id, email, fullname, profilePicture, profilePictureId } = user;
  const router = useRouter();
  const { setProfilePicture } = useContext(AppContext);
  //const [componentLoading, setComponentLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [newImage, setNewImage] = useState();

  //get lag 3 days date

  var trial_date = new Date();

  trial_date.setDate(trial_date.getDate() - 3);


  if (error) {
    return <ErrorComponent />;
  }




  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 1000000) {
      toast('Please select file size less or equal to 1MB', { type: 'error' });
      return;
    }

    setNewImage(e.target.files[0]);
  };
  const handleImageChange = async () => {
    if (!newImage) return;
    setImageUploading(true);
    const formData = new FormData();
    formData.append('image', newImage);
    formData.append('imageId', user.profilePictureId);
    formData.append('userId', user.id);
    setImageUploading(true);
    const res = await fetch('/api/update-profile-picture', {
      method: 'POST',
      body: formData,
    });
    const { error, data } = await res.json();
    if (error) {
      toast(error, { type: 'error' });
      setImageUploading(false);
    } else {
      setProfilePicture(data.profilePicture);
      setImageUploading(false);
      router.replace(router.asPath);
    }
  };

  return (
    <>
      <Head>
        <title>Your Profile @ TALKIN AI</title>
        <meta name="description" content="profile page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/talkin_logo.png" />
      </Head>

      <main className="p-10 mx-auto max-w-4xl">

        <div className="topnav">
          <div>
            <h1 className="header1 text-2xl md:text-2xl font-bold">Your Profile</h1>
          </div>
        </div>


        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">


          <h1 className="my-5 text-1xl">
            Welcome, {' '}
            {user.fullname},

          </h1>
          <div>
            <div className="profilenav">
              <h1 className="my-5">Your Profile Picture</h1>
            </div>
            <div className="rowC">

              <div className="my-5">

                {user.profilePicture ? <img alt="profile" className="w-36 h-36 rounded-full my-5" src={user.profilePicture} />
                  : <img alt="profile" className="w-36 h-36 rounded-full my-5" src="/talkinai_bobo.jpeg" />}
              </div>
              <div className="my-5">
                <label >Replace Image </label>
                <input type="file" onChange={handleSelectImage} name="image" className="my-5 block" />
                {imageUploading ? <Loading /> : <button type="button" onClick={handleImageChange} className="border p-1  bg-black text-white rounded">Change</button>}
              </div>
            </div>


          </div>

          <div>

            <div className="profilenav">
              <h1 className="my-5">Your Plan</h1>
            </div>

            <div>

              {(user.onTrial && new Date(user.trialStartAt) > trial_date) ? (<div className="flex justify-center items-center gap-3 w-max m-auto mt-8 py-3 px-6 text-sm text-white font-semibold rounded-full active:scale-95 md:text-md md:m-0">
                <span className="text-xl md:text-2xl p-2"><BsFillCupHotFill /></span>
                <span>You are on new user trial!</span> </div>) : null}

              {user.isSubscribed ? (<div className="flex justify-center items-center gap-3 w-max m-auto mt-8 py-3 px-6 text-sm text-white font-semibold rounded-full active:scale-95 md:text-md md:m-0">
                <span className="text-xl md:text-2xl p-2"><BsFillCupHotFill /></span>
                <span>You are subscribed!</span> </div>) : null}

            </div>


            <div className="mx-auto mt-10 max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <button
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-orange-600 shadow-sm hover:bg-gray-500 sm:px-8"
                onClick={() => loadPortal()}
              >
                <span className="text-xl md:text-2xl"><BsFillPlayCircleFill /></span>
                <span> Manage Your Plan</span>
              </button>
            </div>

          </div>

          <div>

            <div className="profilenav">
              <h1 className="my-5">Your Creations In Last 30 Days</h1>
            </div>


            <h1 className="text-1xl md:text-1xl font-bold p-5">
              <span>Total Number of Creations:  {creations.length} </span>
            </h1>

            <ul>
              {creations.map((creation) => (
                <div key={creation.id} className="rowC">

                  <div className="h-full w-100 md:w-1/2">
                    <h2 className="text-sm text-white font-semibold my-4">
                      {creation.id} - {creation.video_url}
                    </h2>
                    <p className="text-sm font-normal text-gray leading-6">video duration (seconds): {Math.ceil(creation.video_duration / 60)}</p>
                  </div>
                </div>
              ))}
            </ul>

          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async ({ req }) => {

  //Get the lag 30 days date
  var date = new Date();

  date.setDate(date.getDate() - 30);

  const token = await getToken({ req });
  if (!token) {
    return {
      props: {
        error: 'You are not signed in', data: null,
      },
    };
  }
  try {

    const user = await prisma.user.findUnique({
      where: {
        id: token.user.id,
      },

    });


    const creation_data = await prisma.creation.findMany({
      where: {
        video_url: {
          not: null,
        },

        createdAt: {
          gt: date,
        },

        user: {
          id: token.user.id,
        },
      },

    });
    //convert decimal value to string to pass through as json
    const creations = creation_data.map((creation) => ({
      ...creation,
      createdAt: Math.floor((new Date() - creation.createdAt) / 1000),
    }));




    return {
      props: { error: null, user: JSON.parse(JSON.stringify(user)), creations },
    };
  } catch (error) {
    return { props: { error: error.message, data: null } };
  }
};