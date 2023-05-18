import React from 'react';
import Head from 'next/head';
import { getToken } from 'next-auth/jwt';
import prisma from '../lib/prisma';
import { useSession, getSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

import ErrorComponent from '../components/ErrorComponent';
import SkeletonLoader from '../components/SkeletonLoader';



import Creation from '../components/Creation';

import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';



import {
  TwitterShareButton,
  TwitterIcon,
} from 'next-share';

import {
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share';


import {
  FacebookShareButton,
  FacebookIcon,
} from 'next-share';

import {
  PinterestShareButton,
  PinterestIcon,
} from 'next-share'


import {
  RedditShareButton,
  RedditIcon,
} from 'next-share'


import {
  WeiboShareButton,
  WeiboIcon,
} from 'next-share'

import {
  WhatsappShareButton,
  WhatsappIcon,
} from 'next-share'


export const getServerSideProps = async ({ req }) => {
  const token = await getToken({ req });
  if (!token) {
    return {
      props: {
        error: 'You are not signed in', data: null,
      },
    };
  }
  try {

    const data = await prisma.creation.findMany({
      where: {
        video_url: {
          not: null,
        },

        user: {
          id: token.user.id,
        },
      },

    });
    //convert decimal value to string to pass through as json
    const creations = data.map((creation) => ({
      ...creation,
      createdAt: Math.floor((new Date() - creation.createdAt) / 1000),
    }));
    return {
      props: { error: null, creations },
    };

  } catch (error) {
    return { props: { error: error.message, data: null } };
  }
};


export default function Home({ error, creations }) {
  if (error) {
    return <ErrorComponent />;
  }

  const name = "My Talking Avatar";
  const companyName = "TALKIN AI";

  const CreationUrl = creations.length > 0 ? creations[creations.length - 1].video_url : null;
  const companyUrl = "https://www.talkin-ai.com"
  const videoId = creations.length > 0 ? creations[creations.length - 1].video_id : null;
  const logoId = "TALKIN_AI_logo_2_dbcqjk";
  const audioId = "youtube_audio_ppvxml";
  const color = "black";
  const title = `${decodeURIComponent(name)}`;
  const description = ` ${name} created at ${companyName}. Grab your free ticket on ${companyUrl}.`;

  /* Twitter Config */
  const tweetText = encodeURIComponent(
    "AI-Generated Talking Avatar!\n\n",
  );
  const twitterShareUrl = encodeURIComponent(`${CreationUrl}?name=${name}&shared=true`);
  const twitterShareHref = `https://twitter.com/intent/tweet?url=${twitterShareUrl}&text=${tweetText}`;

  /* LinkedIn Config */
  const linkedInShareUrl = `${CreationUrl}?name%3D${name}&shared%3Dtrue`;
  const linkedInShareHref = `https://www.linkedin.com/sharing/share-offsite/?url=${linkedInShareUrl}`;

  return (
    <>
      <Head>
        <title>talking avarter creations</title>
        <meta name="description" content="Your Creations at TALKIN AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-10 mx-auto max-w-4xl">
        <h1 className="text-6xl font-bold mb-4 text-center"></h1>
        <div className="flex flex-col items-center justify-center px-4 py-2">
          <h1 className="header1 text-4xl md:text-4xl font-bold">
            Total Number of Creations
          </h1>
          <p className="mt-3 text-2xl">
            <span className="text-2xl font-bold text-white">
              {creations.length}
            </span>
          </p>
        </div>
        <p className="mb-20 text-xl text-center text-white">
          <span>🔥 Your Recent Creations 🔥 </span>
        </p>
        <ul className="app__social-links">
          <li><TwitterShareButton href={twitterShareHref}>
            <TwitterIcon size={40} round />
          </TwitterShareButton> </li>
          <li><LinkedinShareButton href={linkedInShareHref}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton></li>
          <li><FacebookShareButton>
            <FacebookIcon size={40} round />
          </FacebookShareButton></li>

          <li><WhatsappShareButton>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton></li>

          <li> <WeiboShareButton>
            <WeiboIcon size={40} round />
          </WeiboShareButton></li>

          <li> <RedditShareButton>
            <RedditIcon size={40} round />
          </RedditShareButton></li>

          <li><PinterestShareButton>
            <PinterestIcon size={40} round />
          </PinterestShareButton></li>


        </ul>
        <div className="grid md:grid-cols-1 sm:grid-cols-1 grid-cols-1 justify-items-center  gap-3">
          {creations.map((creation) => (
            <Creation creation={creation} key={creation.id} />
          ))}
        </div>
      </main>
    </>
  );
}







