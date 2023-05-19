(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888];
exports.modules = {

/***/ 7731:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./styles/globals.css
var globals = __webpack_require__(6764);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/react-toastify.esm.mjs
var react_toastify_esm = __webpack_require__(5678);
// EXTERNAL MODULE: external "react-icons/ri"
var ri_ = __webpack_require__(8098);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: external "react-icons/sl"
const sl_namespaceObject = require("react-icons/sl");
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./utils/AppContext.js
var utils_AppContext = __webpack_require__(5477);
;// CONCATENATED MODULE: ./components/Header.js







function Header() {
    const { searchValue , setSearchValue , profilePicture  } = useContext(AppContext);
    const [toggled, setToggled] = useState(false);
    const [userProfile, setUserProfile] = useState("");
    const session = useSession();
    const router = useRouter();
    const { status , data  } = session;
    const handleSignout = ()=>{
        signOut({
            callbackUrl: "/auth/signin"
        });
    };
    const fetchUserProfile = async ()=>{
        const user = await fetch(`/api/fetch-user-profile?email=${data?.user?.email}`);
        const response = await user.json();
        setUserProfile(response?.profilePicture);
    };
    useEffect(()=>{
        fetchUserProfile();
    //fetchUserUsage;
    });
    return /*#__PURE__*/ _jsx("div", {
        className: "m-0 fixed border dark:border-none bg-black text-black py-3 top-0 w-full z-50",
        children: /*#__PURE__*/ _jsxs("div", {
            className: "flex items-center justify-center mx-2 md:mx-5 my-3",
            children: [
                /*#__PURE__*/ _jsxs("div", {
                    className: "basis-2/4 flex items-center justify-start p-1",
                    children: [
                        /*#__PURE__*/ _jsx("div", {
                            className: "md:mr-30",
                            children: /*#__PURE__*/ _jsx(Link, {
                                href: "/",
                                children: /*#__PURE__*/ _jsx("img", {
                                    src: "/talkin_logo.png",
                                    alt: "talkin-ai-Logo",
                                    className: "max-w-2xl w-28 m-0"
                                })
                            })
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "header1 text-4xl font-bold",
                            children: "TALKIN AI"
                        })
                    ]
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: "basis-2/4 flex items-center justify-end",
                    children: [
                        status === "authenticated" ? /*#__PURE__*/ _jsxs(_Fragment, {
                            children: [
                                /*#__PURE__*/ _jsx("div", {
                                    onClick: handleSignout,
                                    className: "cursor-pointer hidden md:block mr-3 md:mr-5",
                                    children: /*#__PURE__*/ _jsx("span", {
                                        className: "bg-color-orange text-white p-2 hover:text-gray-400",
                                        children: "Logout"
                                    })
                                }),
                                /*#__PURE__*/ _jsx("div", {
                                    className: "hidden bg-color-orange text-white p-2 md:flex items-center justify-around mr-3 md:mr-5 cursor-pointer",
                                    children: /*#__PURE__*/ _jsx(Link, {
                                        href: "/create",
                                        children: /*#__PURE__*/ _jsx("span", {
                                            className: `${router.pathname === "/create" ? "border-b-4 " : ""}cursor-pointer hover:text-gray-400`,
                                            children: "TalkingAvatar"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ _jsx("div", {
                                    className: "hidden bg-color-orange text-white p-2 md:flex items-center justify-around mr-3 md:mr-5 cursor-pointer",
                                    children: /*#__PURE__*/ _jsx(Link, {
                                        href: "/chatgpt",
                                        children: /*#__PURE__*/ _jsx("span", {
                                            className: `${router.pathname === "/chatgpt" ? "border-b-4 " : ""}cursor-pointer hover:text-gray-400`,
                                            children: "GPT2Speech"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ _jsx("div", {
                                    className: "hidden bg-color-orange text-white p-2 md:flex items-center justify-around mr-3 md:mr-5 cursor-pointer",
                                    children: /*#__PURE__*/ _jsx(Link, {
                                        href: "/tube2lip",
                                        children: /*#__PURE__*/ _jsx("span", {
                                            className: `${router.pathname === "/tube2lip" ? "border-b-4 " : ""}cursor-pointer hover:text-gray-400`,
                                            children: "Tube2Lip"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ _jsx("div", {
                                    className: "hidden bg-color-orange text-white p-2 md:flex items-center justify-around mr-3 md:mr-5 cursor-pointer",
                                    children: /*#__PURE__*/ _jsx(Link, {
                                        href: "/creations",
                                        className: "",
                                        children: /*#__PURE__*/ _jsx("span", {
                                            className: `${router.pathname === "/creations" ? "border-b-4 " : ""}cursor-pointer hover:text-gray-400`,
                                            children: "Creations"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ _jsx("div", {
                                    className: "hidden bg-color-orange text-white p-2 md:flex items-center justify-around mr-3 md:mr-5 cursor-pointer",
                                    children: /*#__PURE__*/ _jsx(Link, {
                                        href: "/pricing",
                                        className: "",
                                        children: /*#__PURE__*/ _jsx("span", {
                                            className: `${router.pathname === "/pricing" ? "border-b-4 " : ""}cursor-pointer hover:text-gray-400`,
                                            children: "Pricing"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ _jsx("div", {
                                    className: "hidden bg-color-orange text-white p-2 md:flex items-center justify-around mr-3 md:mr-5 cursor-pointer",
                                    children: /*#__PURE__*/ _jsx(Link, {
                                        href: "/q_a",
                                        className: "",
                                        children: /*#__PURE__*/ _jsx("span", {
                                            className: `${router.pathname === "/q_a" ? "border-b-4 " : ""}cursor-pointer hover:text-gray-400`,
                                            children: "Community"
                                        })
                                    })
                                })
                            ]
                        }) : /*#__PURE__*/ _jsxs("div", {
                            className: "flex flex-row",
                            children: [
                                /*#__PURE__*/ _jsx(Link, {
                                    href: "/auth/signin",
                                    children: /*#__PURE__*/ _jsx("div", {
                                        className: "cursor-pointer block mr-5",
                                        children: /*#__PURE__*/ _jsx("span", {
                                            className: "header-button text-white p-2 hover:text-gray-400",
                                            children: "Log In"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ _jsx(Link, {
                                    href: "/about",
                                    className: "",
                                    children: /*#__PURE__*/ _jsx("span", {
                                        className: `${router.pathname === "/about" ? "border-b-4 " : ""}md:hidden cursor-pointer hover:text-gray-400 mr-5`,
                                        children: "About"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: "hidden md:flex items-center justify-around mr-3 md:mr-5 cursor-pointer",
                            children: /*#__PURE__*/ _jsx(Link, {
                                href: "/about",
                                className: "",
                                children: /*#__PURE__*/ _jsx("span", {
                                    className: `${router.pathname === "/about" ? "border-b-4 " : ""}cursor-pointer hover:text-gray-400`,
                                    children: "About"
                                })
                            })
                        }),
                        status ? data?.user && /*#__PURE__*/ _jsxs("div", {
                            className: "ml-0 md:ml-5 flex flex-col relative z-50",
                            children: [
                                /*#__PURE__*/ _jsxs("div", {
                                    onClick: ()=>{
                                        setToggled(!toggled);
                                    },
                                    className: "flex w-40 md:w-fit items-center justify-end space-x-4 cursor-pointer md:cursor-default bg-black relative z-50 mr-0",
                                    children: [
                                        userProfile ? /*#__PURE__*/ _jsxs(_Fragment, {
                                            children: [
                                                /*#__PURE__*/ _jsx(Link, {
                                                    href: "/profile",
                                                    children: /*#__PURE__*/ _jsx("img", {
                                                        className: "w-12 border cursor-pointer hidden md:block rounded-full h-12",
                                                        alt: "profile",
                                                        src: userProfile
                                                    })
                                                }),
                                                /*#__PURE__*/ _jsx("img", {
                                                    className: "w-12 border block md:hidden rounded-full h-12",
                                                    alt: "profile",
                                                    src: userProfile
                                                })
                                            ]
                                        }) : /*#__PURE__*/ _jsxs(_Fragment, {
                                            children: [
                                                /*#__PURE__*/ _jsx(Link, {
                                                    href: "/profile",
                                                    children: /*#__PURE__*/ _jsx("img", {
                                                        className: "w-12 border cursor-pointer hidden md:block rounded-full h-12",
                                                        alt: "profile",
                                                        src: "/talkinai_bobo.jpeg"
                                                    })
                                                }),
                                                /*#__PURE__*/ _jsx("img", {
                                                    className: "w-12 border block md:hidden rounded-full h-12",
                                                    alt: "profile",
                                                    src: "/talkinai_bobo.jpeg"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsx("span", {
                                            className: `${toggled ? "rotate-180" : "rotate-0"} transition-all duration-500 md:hidden p-3`,
                                            children: /*#__PURE__*/ _jsx(SlArrowDown, {})
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ _jsxs("div", {
                                    className: `${toggled ? "top-12 z-50 bg-white" : "-z-50 top-0 border-none"} flex flex-col absolute -z-50 -right-2 top-0 w-full  dark:bg-slate-800 transition-all duration-500 border border-t-0 dark:border-none md:hidden`,
                                    children: [
                                        /*#__PURE__*/ _jsx(Link, {
                                            href: "/profile",
                                            children: /*#__PURE__*/ _jsxs("p", {
                                                onClick: ()=>{
                                                    setToggled(!toggled);
                                                },
                                                className: `${toggled ? "my-5 left-0" : "h-0 my-0 top-5"} ${router.pathname === "/profile" ? "border-l-8 border-r-8" : ""} relative cursor-pointer hover:text-gray-400 text-center flex items-center justify-center transition-all duration-150`,
                                                children: [
                                                    /*#__PURE__*/ _jsx(SlUser, {
                                                        size: 24,
                                                        className: "border rounded-full p-1"
                                                    }),
                                                    /*#__PURE__*/ _jsx("span", {
                                                        className: "ml-3",
                                                        children: "Profile"
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx(Link, {
                                            href: "/create",
                                            children: /*#__PURE__*/ _jsx("span", {
                                                onClick: ()=>{
                                                    setToggled(!toggled);
                                                },
                                                className: `${toggled ? "my-5 left-0" : "h-0 my-0"} ${router.pathname === "/create" ? "border-l-8 border-r-8" : ""} relative cursor-pointer hover:text-gray-400 text-center transition-all duration-300`,
                                                children: "TalkingAvatar"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx(Link, {
                                            href: "/chatgpt",
                                            children: /*#__PURE__*/ _jsx("span", {
                                                onClick: ()=>{
                                                    setToggled(!toggled);
                                                },
                                                className: `${toggled ? "my-5 left-0" : "h-0 my-0"} ${router.pathname === "/chatgpt" ? "border-l-8 border-r-8" : ""} relative cursor-pointer hover:text-gray-400 text-center transition-all duration-500`,
                                                children: "GPT2Speech"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx(Link, {
                                            href: "/tube2lip",
                                            children: /*#__PURE__*/ _jsx("span", {
                                                onClick: ()=>{
                                                    setToggled(!toggled);
                                                },
                                                className: `${toggled ? "my-5 left-0" : "h-0 my-0"} ${router.pathname === "/tube2lip" ? "border-l-8 border-r-8" : ""} relative cursor-pointer hover:text-gray-400 text-center transition-all duration-500`,
                                                children: "Tube2Lip"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx(Link, {
                                            href: "/creations",
                                            children: /*#__PURE__*/ _jsx("span", {
                                                onClick: ()=>{
                                                    setToggled(!toggled);
                                                },
                                                className: `${toggled ? "my-5 left-0" : "h-0 my-0"} ${router.pathname === "/creations" ? "border-l-8 border-r-8" : ""} relative cursor-pointer hover:text-gray-400 text-center transition-all duration-700`,
                                                children: "Creations"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx(Link, {
                                            href: "/pricing",
                                            children: /*#__PURE__*/ _jsx("span", {
                                                onClick: ()=>{
                                                    setToggled(!toggled);
                                                },
                                                className: `${toggled ? "my-5 left-0" : "h-0 my-0"} ${router.pathname === "/pricing" ? "border-l-8 border-r-8" : ""} relative cursor-pointer hover:text-gray-400 text-center transition-all duration-700`,
                                                children: "Pricing"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx(Link, {
                                            href: "/community",
                                            children: /*#__PURE__*/ _jsx("span", {
                                                onClick: ()=>{
                                                    setToggled(!toggled);
                                                },
                                                className: `${toggled ? "my-5 left-0" : "h-0 my-0"} ${router.pathname === "/community" ? "border-l-8 border-r-8" : ""} relative cursor-pointer hover:text-gray-400 text-center transition-all duration-700`,
                                                children: "Community"
                                            })
                                        }),
                                        /*#__PURE__*/ _jsxs("p", {
                                            onClick: handleSignout,
                                            className: "flex items-center justify-center cursor-pointer text-color-orange text-center p-2 hover:text-gray-400",
                                            children: [
                                                /*#__PURE__*/ _jsx(SlLogout, {}),
                                                /*#__PURE__*/ _jsx("span", {
                                                    className: "ml-4",
                                                    children: "Logout"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }) : null
                    ]
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: external "react-icons/gi"
const gi_namespaceObject = require("react-icons/gi");
;// CONCATENATED MODULE: external "react-icons/md"
const md_namespaceObject = require("react-icons/md");
;// CONCATENATED MODULE: ./components/Navbar/index.tsx








const Navbar = ()=>{
    const [toggleMenu, setToggleMenu] = external_react_.useState(false);
    //const { profilePicture } = useContext(AppContext);
    const [toggled, setToggled] = (0,external_react_.useState)(false);
    const [userProfile, setUserProfile] = (0,external_react_.useState)("");
    const session = (0,react_.useSession)();
    const router = (0,router_.useRouter)();
    const { status , data  } = session;
    const handleSignout = ()=>{
        (0,react_.signOut)({
            callbackUrl: "/auth/signin"
        });
    };
    const fetchUserProfile = async ()=>{
        const user = await fetch(`/api/fetch-user-profile?email=${data?.user?.email}`);
        const response = await user.json();
        setUserProfile(response?.profilePicture);
    };
    (0,external_react_.useEffect)(()=>{
        fetchUserProfile();
    //fetchUserUsage;
    });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "app__navbar",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "app__navbar-logo",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: "/talkinai_logo_white.png",
                        alt: "app logo"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "header1 text-3xl font-bold",
                        children: [
                            " ",
                            "TALKIN.AI"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "basis-2/4 flex items-center justify-end",
                children: status === "authenticated" ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                    className: "app__navbar-links",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            className: "p__opensans",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/",
                                children: "Home"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            className: "p__opensans",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/create",
                                children: "TalkingAvatar"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            className: "p__opensans",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/tube2lip",
                                children: "Tube2Lip"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            className: "p__opensans",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/chatgpt",
                                children: "GPT2Speech"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            className: "p__opensans",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/pricing",
                                children: "Pricing"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            className: "p__opensans",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/q_a",
                                children: "Chat"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            onClick: handleSignout,
                            className: "p__opensans",
                            children: "Logout"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            className: "app__navbar-profile",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/profile",
                                children: userProfile ? /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    alt: "profile",
                                    src: userProfile
                                }) : /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    alt: "profile",
                                    src: "/talkinai_bobo.jpeg"
                                })
                            })
                        })
                    ]
                }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "app__navbar-login",
                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/auth/signin",
                            children: "Log In / Register"
                        })
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "app__navbar-smallscreen",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(gi_namespaceObject.GiHamburgerMenu, {
                        color: "#fff",
                        fontSize: 21,
                        onClick: ()=>setToggleMenu(true)
                    }),
                    toggleMenu && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "app__navbar-smallscreen_overlay flex__center slide-bottom",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(md_namespaceObject.MdOutlineRestaurantMenu, {
                                fontSize: 16,
                                className: "overlay__close",
                                onClick: ()=>setToggleMenu(false)
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                className: "app__navbar-smallscreen_links",
                                onClick: ()=>setToggleMenu(false),
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        className: "hero-button",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: "/auth/signin",
                                            children: " Log In / Register"
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        className: "p__opensans",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: "/create",
                                            children: "TalkingAvatar"
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        className: "p__opensans",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: "/tube2lip",
                                            children: "Tube2Lip"
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        className: "p__opensans",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: "/chatgpt",
                                            children: "GPT2Speech"
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        className: "p__opensans",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: "/pricing",
                                            children: "Pricing"
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_Navbar = (Navbar);

;// CONCATENATED MODULE: external "react-icons/si"
const si_namespaceObject = require("react-icons/si");
;// CONCATENATED MODULE: ./components/Footer/index.jsx



// React Icons

const Footer = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "bg-black py-12 px-4",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "max-w-7xl w-100 m-auto grid grid-cols-1 gap-6 md:gap-4 md:grid-cols-3 place-items-center sm:grid-cols-2",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "flex flex-col justify-center items-center",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "md:mr-30",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    src: "/talkinai_logo_white.png",
                                    alt: "talkin-ai-Logo",
                                    className: "max-w-2xl w-28 m-0"
                                })
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("h5", {
                            className: "text-gray mt-4",
                            children: "\xa9 TALKIN AI 2023"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                            className: "text-xl font-semibold text-white",
                            children: "Join The Community"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                            className: "mt-2 text-center md:text-left",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    className: "text-gray mb-2 w-max m-auto md:mx-0 hover:text-light-gray",
                                    title: "Youtube",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        target: "_blank",
                                        href: "https://discord.gg/TFPVcDKK9n",
                                        rel: "noopener noreferrer",
                                        children: "Discord"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    className: "text-gray mb-2 w-max m-auto md:mx-0 hover:text-light-gray",
                                    title: "Twitter",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "https://twitter.com/",
                                        children: "Twitter"
                                    })
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "text-center md:text-left",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h5", {
                        className: "mt-2 text-gray",
                        children: [
                            "This website is made with ❤️ By ",
                            " ",
                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("h5", {
                                    className: "text-pink",
                                    children: "TALKIN.AI"
                                })
                            })
                        ]
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const components_Footer = (Footer);

;// CONCATENATED MODULE: ./components/State/data/data.js
const data_states = [
    {
        id: 1,
        icon: "FiTwitter",
        title: "Twitter",
        statistics: "+500 Followers",
        action: "Follow",
        link: "https://twitter.com/BiztechMorocco"
    },
    {
        id: 2,
        title: "YouTube",
        statistics: "+80 subscribers",
        action: "Subscribe",
        link: "https://www.youtube.com/channel/UCbJ1L2YRk6_CoVbl3_6tBew"
    },
    {
        id: 1,
        title: "Facebook",
        statistics: "+100 Likes",
        action: "Like",
        link: "https://www.facebook.com/BizTechMorocco"
    }
];
/* harmony default export */ const data = ((/* unused pure expression or super */ null && (data_states)));

;// CONCATENATED MODULE: external "react-icons/fa"
const fa_namespaceObject = require("react-icons/fa");
;// CONCATENATED MODULE: ./components/State/index.jsx



// State Data

// React Icons

const State = ()=>{
    return /*#__PURE__*/ _jsx("div", {
        className: "content bg-light-purple py-24 md:py-14 pb-26 md:pb-36",
        children: /*#__PURE__*/ _jsxs("div", {
            className: "max-w-5xl w-100 m-auto px-4",
            children: [
                /*#__PURE__*/ _jsx("h2", {
                    className: "mb-10 text-white text-2xl font-semibold text-center md:text-3xl",
                    children: "Join The Community"
                }),
                /*#__PURE__*/ _jsx("div", {
                    className: "bg-light-purple grid place-items-center grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2",
                    children: states.map((state, index)=>/*#__PURE__*/ _jsxs("div", {
                            title: state.title,
                            className: "state-card flex flex-col justify-center items-center py-8 px-12 text-center rounded-md",
                            children: [
                                /*#__PURE__*/ _jsx("span", {
                                    className: "mb-2 text-white text-4xl",
                                    children: state.title == "Twitter" ? /*#__PURE__*/ _jsx(FaTwitter, {}) : state.title == "YouTube" ? /*#__PURE__*/ _jsx(FaYoutube, {}) : state.title == "Facebook" ? /*#__PURE__*/ _jsx(FaFacebook, {}) : ""
                                }),
                                /*#__PURE__*/ _jsx("h2", {
                                    className: "my-2 text-2xl text-white font-semibold",
                                    children: state.title
                                }),
                                /*#__PURE__*/ _jsx("p", {
                                    className: "mb-4 text-md text-gray",
                                    children: state.statistics
                                }),
                                /*#__PURE__*/ _jsx(Link, {
                                    href: state.link,
                                    children: /*#__PURE__*/ _jsxs("span", {
                                        title: state.action,
                                        target: "_blank",
                                        className: "action-button flex justify-center items-center gap-2 rounded-full py-2 px-4 w-max m-auto bg-white text-blue text-md font-semibold active:scale-95",
                                        children: [
                                            /*#__PURE__*/ _jsx("span", {
                                                children: state.action
                                            }),
                                            /*#__PURE__*/ _jsx("span", {
                                                className: "text-blue text-md",
                                                children: state.title == "Twitter" ? /*#__PURE__*/ _jsx(FaTwitter, {}) : state.title == "YouTube" ? /*#__PURE__*/ _jsx(FaYoutube, {}) : state.title == "Facebook" ? /*#__PURE__*/ _jsx(FaFacebook, {}) : ""
                                            })
                                        ]
                                    })
                                })
                            ]
                        }, index))
                })
            ]
        })
    });
};
/* harmony default export */ const components_State = ((/* unused pure expression or super */ null && (State)));

// EXTERNAL MODULE: ./node_modules/react-toastify/dist/ReactToastify.css
var ReactToastify = __webpack_require__(8819);
;// CONCATENATED MODULE: ./components/Layout.js








//import Subscription from './Subscription';


function Layout({ children  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "bg-black",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(components_Navbar, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(react_toastify_esm/* ToastContainer */.Ix, {
                hideProgressBar: true,
                toastStyle: {
                    backgroundColor: "#cd4a1d",
                    color: "#ffffff"
                }
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "content",
                children: children
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components_Footer, {})
        ]
    });
}

;// CONCATENATED MODULE: ./pages/_app.js






function MyApp({ Component , pageProps: { session , ...pageProps }  }) {
    const [profilePicture, setProfilePicture] = (0,external_react_.useState)("");
    return /*#__PURE__*/ jsx_runtime_.jsx(react_.SessionProvider, {
        session: session,
        children: /*#__PURE__*/ jsx_runtime_.jsx(utils_AppContext/* default.Provider */.Z.Provider, {
            value: {
                profilePicture,
                setProfilePicture
            },
            children: /*#__PURE__*/ jsx_runtime_.jsx(Layout, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                    ...pageProps
                })
            })
        })
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 5477:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const AppContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppContext);


/***/ }),

/***/ 8819:
/***/ (() => {



/***/ }),

/***/ 6764:
/***/ (() => {



/***/ }),

/***/ 8103:
/***/ ((module) => {

"use strict";
module.exports = require("clsx");

/***/ }),

/***/ 1649:
/***/ ((module) => {

"use strict";
module.exports = require("next-auth/react");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 5874:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 4331:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 8098:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/ri");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [9210,676,1664,5678], () => (__webpack_exec__(7731)));
module.exports = __webpack_exports__;

})();