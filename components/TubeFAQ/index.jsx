
import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";

const data = {
    title: "FAQ (How it works)",
    rows: [
        {
            title: "How to make a Tube2Lip video?",
            content: `Input the youtube video url, type in the text or use GPT2Speech to create the speech, then either select voice or upload custom voice to clone, click on "Generate Youtube Video" button.`,
        },
        {
            title: "Any custom audio requirements?",
            content: `The custom audio file should be a wav/mp3 file, optimaly 10-15 seconds.`,
        },
        {
            title: "How fast the process is?",
            content: `It depends. It might in seconds or couple of minutes If you come in non-peak hour, you may have to wait cold-start of the machine. If that's the case, grab your coffee and wait couple of minutes. It's worthwhile your wait.`,
        },
        {
            title: "How to change the size  of Tube2Lip video?",
            content: `The default size is 640×360. But you can easily resize by specify the width and height in the url. 
            For example, the original link is https://res.cloudinary.com/*/video/upload/*. Yon can add h_512,w_512 in the link
            as  https://res.cloudinary.com/*/video/upload/h_512,w_512/*.`,
        },


        {
            title: "How to share to social media?",
            content:
                "You can either download the video or use the video url to share.",
        },
        {
            title: "How long will the video url be valid?",
            content: `The video url will be valid for 30 days. We still strongly recommend you to download the video and save to your local drive. `,
        },

        {
            title: "How to contact us with further questions?",
            content: `You may go to Chat page and leave us a review. Please be as specific as possible. `,
        },
    ],
};

const styles = {
    bgColor: 'black',
    titleTextColor: "white",
    rowTitleColor: "white",
    rowContentColor: 'grey',
    arrowColor: "white",
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};

export default function TubeFAQ() {

    return (
        <div className="max-w-7xl w-full h-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">

            <Faq
                data={data}
                styles={styles}
                config={config}
            />
        </div>
    );
}
