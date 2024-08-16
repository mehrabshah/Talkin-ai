// pages/pricing.js

import React, { useState,useContext } from 'react';

import Head from 'next/head';

import Image from "next/image";

import Container from '../components/Container';


import NewUserTrial from "../components/NewUserTrial";



import { motion } from "framer-motion";
import { useUser } from '@clerk/nextjs';
import SubscriptionContext from '../context/SubscriptionContext';





export default function PlanPage() {
    // display plans

    //const { isLoaded, isSignedIn, user } = useUser();

    // const {
    //   isLoaded,
    //   products,

    //   redirectToCheckout,
    //   redirectToCustomerPortal,
    // } = useSubscription();

    const {

        subscriptionData,
        updateSubscriptionPlan,
        cancelSubscription,
        decreaseStoryBoardAndImage2VideoCount,
        decreaseText2VideoCount,
    } = useContext(SubscriptionContext)
   console.log(subscriptionData);

    const { isLoaded, isSignedIn, user } = useUser();
    console.log(user?.primaryEmailAddress?.emailAddress);

    const modifiedData = {
        "Current Plan": subscriptionData?.metadata?.activePlan,
        "Subscription Status": subscriptionData?.metadata?.isSubscribed,
        "Subscription ID": subscriptionData?.metadata?.subscriptionId,
        "StoryBoarder/Image2Video": subscriptionData?.metadata?.storyBoardCount,
        "Text2Video": subscriptionData?.metadata?.text2Video
    };

    const handleCancel= async()=>{
        const  confirm = window.confirm('Are you sure you want to cancel this subscription?, It cannot be undone');
       if(confirm) {
           await cancelSubscription(subscriptionData?.metadata?.subscriptionId);
           window.alert('Subscription cancelled successfully')
            window.location.reload();

       }

    }


    return (
        <>
            <Head>
                <title>TALKIN AI PLAN</title>

                <meta name="description" content="Talking Avatar  videos with AI, Text to Video " />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="icon" href="/talkin_logo.png" />
            </Head>

            <main>
                <div className="p-5 mx-auto min-h-screen select-none overflow-hidden">



                    <motion.img

                        alt="Transition Image"
                        transition={{
                            opacity: 0,
                            layout: { duration: 0.6 },
                        }}
                        className=" absolute left-0  top-15  z-0   h-full w-full object-cover brightness-50"
                        src="robo_1.jpeg"
                    />


                    <div className="relative pt-20 ml-auto">
                        <div className="lg:w-2/3 text-center mx-auto">
                            <h1 className="text-white dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Your Plan.</h1>
                            <p className="mt-8 text-2xl text-gray-700 dark:text-gray-300">Manage Your Plan </p>
                        </div>


                    </div>



                    <Container>
                        <div className="z-10 flex w-full items-center justify-center">

                            <SubscriptionTable handleCancel={handleCancel} isSubscribed={subscriptionData?.metadata?.isSubscribed} data={modifiedData} />
                            
                          
                        </div>
                    </Container>

                   {
                    subscriptionData?.metadata?.isSubscribed === 'true'
                    &&
                        <Container>
                            <SubscriptionManagement
                                updateSubscriptionPlan={updateSubscriptionPlan}
                                subscriptionId={subscriptionData?.metadata?.subscriptionId}
                                currentActivePlan={subscriptionData?.metadata?.activePlan}
                            />
                        </Container>
                   }





                    <div className="py-20  z-10 flex  flex-wrap justify-center gap-8 lg:gap-42.5">
                        <motion.div
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: -20,
                                },

                                visible: {
                                    opacity: 1,
                                    y: 0,
                                },
                            }}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ duration: 20, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="animate_top text-center"
                        >
                            <h3 className="font-bold z-10 text-white dark:text-white text-3xl xl:text-sectiontitle3 mb-2.5">
                                500K
                            </h3>
                            <p className="text-lg z-10 lg:text-para2">World Wide Users</p>
                        </motion.div>
                        <motion.div
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: -20,
                                },

                                visible: {
                                    opacity: 1,
                                    y: 0,
                                },
                            }}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ duration: 20, delay: 0.7 }}
                            viewport={{ once: true }}
                            className="animate_top text-center"
                        >
                            <h3 className="font-bold z-10 text-white dark:text-white text-3xl xl:text-sectiontitle3 mb-2.5">
                                1M+
                            </h3>
                            <p className="text-lg z-10 lg:text-para2">Creations</p>
                        </motion.div>
                        <motion.div
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: -20,
                                },

                                visible: {
                                    opacity: 1,
                                    y: 0,
                                },
                            }}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ duration: 20, delay: 0.8 }}
                            viewport={{ once: true }}
                            className="animate_top text-center"
                        >
                            <h3 className="z-10 font-bold text-white dark:text-white text-3xl xl:text-sectiontitle3 mb-2.5">
                                21
                            </h3>
                            <p className="z-10 text-lg lg:text-para2">Winning Awards</p>
                        </motion.div>
                    </div>



                    {subscriptionData?.metadata?.isSubscribed === 'false' ? (
                        <NewUserTrial />
                    ) : null
                    }

                </div>

            </main>

        </>

    )

};


const SubscriptionTable = ({ data, handleCancel, isSubscribed }) => {
    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl text-black font-semibold mb-4">Subscription Details</h3>
            <table className="min-w-full bg-white border border-gray-200 rounded-md overflow-hidden">
                {/*  */}
                <tbody>
                    {Object.entries(data).map(([key, value]) => (
                        <tr key={key} className="border-t border-gray-200">
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">{key}</td>
                            <td className="py-4 px-6 text-sm text-gray-700">{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {
                isSubscribed === 'true' &&
                <button
                    onClick={handleCancel}
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
                    Cancel now
                </button>
            }
            

        </div>
    );
};

const getFilteredPlans = (currentActivePlan) => {
    const plans = [
        {
            id: process.env.NEXT_PUBLIC_M_LITE,
            name: 'Lite Monthly',
            activePlan: 'Lite month',
            description: '$9.99/month'
        },
        {
            id: process.env.NEXT_PUBLIC_M_STANDARD,
            name: 'Standard Monthly',
            activePlan: 'Standard month',
            description: '$29.99/month'
        },
        {
            id: process.env.NEXT_PUBLIC_M_PLUS,
            name: 'Plus Monthly',
            activePlan: 'Plus month',
            description: '$59.99/month'
        },
        {
            id: process.env.NEXT_PUBLIC_M_PRO,
            name: 'Pro Monthly',
            activePlan: 'Pro month',
            description: '$89.99/month'
        },
        {
            id: process.env.NEXT_PUBLIC_M_PREMIER,
            name: 'Premier Monthly',
            activePlan: 'Premier month',
            description: '$299.99/month'
        },
        {
            id: process.env.NEXT_PUBLIC_Y_LITE,
            name: 'Lite Yearly',
            activePlan: 'Lite year',
            description: '$95.90/year'
        },
        {
            id: process.env.NEXT_PUBLIC_Y_STANDARD,
            name: 'Standard Yearly',
            activePlan: 'Standard year',
            description: '$287.90/year'
        },
        {
            id: process.env.NEXT_PUBLIC_Y_PLUS,
            name: 'Plus Yearly',
            activePlan: 'Plus year',
            description: '$575.88/year'
        },
        {
            id: process.env.NEXT_PUBLIC_Y_PRO,
            name: 'Pro Yearly',
            activePlan: 'Pro year',
            description: '$863.90/year'
        },
        {
            id: process.env.NEXT_PUBLIC_Y_PREMIER,
            name: 'Premier Yearly',
            activePlan: 'Premier year',
            description: '$2879.90/year'
        }
    ];


    // Filter out the plan with the current priceId
    const filteredPlans = plans.filter(plan => plan.activePlan !== currentActivePlan);

    return filteredPlans;
};


const SubscriptionManagement = ({ subscriptionId, updateSubscriptionPlan, currentActivePlan }) => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = getFilteredPlans(currentActivePlan);

    const handlePlanChange = async () => {
        if (!selectedPlan) return alert("Please select a plan.");

        try {
            const confirm = window.confirm('Are you sure you want to change your plan?');
            if (confirm){
                //updateSubscriptionPlan(subscriptionId, selectedPlan)
                const updateRes = await updateSubscriptionPlan(subscriptionId, selectedPlan)

                console.log(updateRes);
                if(updateRes){
                    window.alert('Plan changed successfully!')
                    window.location.reload();
                }
            }

           
        } catch (error) {
            console.error("Error updating subscription:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="max-w-lg text-black mx-auto p-4">
            <h2 className="text-white text-xl font-semibold mb-4">Upgrade/Downgrade your Subscription</h2>
            <select
                className="border rounded-lg p-2 w-full mb-4"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
            >
                <option value="">Select a plan</option>
                {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                        {plan.name} - {plan.description}
                    </option>
                ))}
            </select>
            <button
                onClick={handlePlanChange}
                className="bg-[#ce4a1e] text-white py-2 px-4 rounded-lg hover:bg-[#97381e] focus:outline-none focus:ring-2 focus:ring-[#cd4a1d]"
            >
                Update Subscription
            </button>
        </div>
    );
};











