import React, { useState } from 'react';



const PricingPlans = ({ pricingData, handleSubscribe }) => {
    const [activeTab, setActiveTab] = useState('yearly');

    return (
        <section className="">
            <div className="">
                <div className="mb-12 text-center">
                    
                    <div className="tabs">
                        {/* tabs */}
                        <div className="flex justify-between">
                            <h1 className='mr-6 text-xl bold'></h1>
                            <div>
                                {Object.keys(pricingData).map((tab) => (
                                    <button
                                        key={tab}

                                        className={`inline-block  text-center 
                                        border border-gray-400
                                        
                                        transition-all duration-500  text-gray-400 font-semibold py-3 px-3 lg:px-11 ${activeTab === tab
                                            ? `bg-[#cd4a1d] text-white 
                                            ${activeTab === 'yearly' ?'rounded-tl-3xl rounded-bl-3xl':'rounded-br-3xl rounded-tr-3xl'}
                                            `
                                            : `hover:text-[#cd4a1d]
                                            ${activeTab === 'yearly' ? 'rounded-tr-3xl rounded-br-3xl' :'rounded-bl-3xl rounded-tl-3xl'}
                                            `
                                            }`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    
                        {/* main */}
                        <div className="mt-12 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-8 lg:space-y-0">
                            {pricingData[activeTab].map((plan, index) => (
                                <div
                                    onClick={() => handleSubscribe(plan)}
                                    key={index}
                                    className={`group cursor-pointer relative bg-[#30373d00] text-white  mx-auto w-full max-w-sm rounded-2xl border border-solid border-gray-600 hover:border-gray-300 text-center transition-all duration-300 p-3 `}
                                >
                                    <div className='flex justify-between mb-1'>
                                        <h3 className={`font-manrope text-xl font-bold  ${plan.popular ? 'text-white' : ''}`}>
                                            {plan.title}

                                        </h3>
                                        <div className=" flex flex-col items-end">
                                            <span className={`font-manrope text-xl font-semibold  ${plan.popular ? 'text-white' : ''}`}>
                                                {plan.price}
                                            </span>
                                            <span className={`text-sm ${plan.popular ? 'text-gray-300' : 'text-gray-400'}`}>
                                                {plan.description}
                                            </span>
                                        </div>
                                    </div>
                                    <ul className="text-left  list-disc pl-5">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="text-sm text-gray-500">
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>


                                    {/* <button

                                        
                                       
                                        className={`py-2.5 px-5 ${plan.popular ? 'bg-white text-[#cd4a1d]' : 'bg-indigo-50 text-[#cd4a1d]'} shadow-sm rounded-full transition-all duration-500 text-base font-semibold text-center w-fit mx-auto ${plan.popular ? 'group-hover:bg-[#cd4a1d] group-hover:text-white' : 'group-hover:bg-[#cd4a1d] group-hover:text-white'}`}
                                    >
                                        Purchase Plan
                                    </button> */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingPlans;
