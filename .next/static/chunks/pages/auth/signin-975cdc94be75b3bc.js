(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[65],{2413:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/auth/signin",function(){return a(6260)}])},3033:function(e,s,a){"use strict";a.d(s,{Z:function(){return r}});var n=a(5893);function r(){return(0,n.jsxs)("div",{className:"loading",children:[(0,n.jsx)("span",{}),(0,n.jsx)("span",{}),(0,n.jsx)("span",{}),(0,n.jsx)("span",{}),(0,n.jsx)("span",{})]})}a(7294)},6260:function(e,s,a){"use strict";a.r(s),a.d(s,{__N_SSP:function(){return m},default:function(){return h}});var n=a(5893),r=a(3299),t=a(9352),l=a(1664),i=a.n(l),c=a(7294),d=a(1163),u=a(5678),o=a(3033);a(5675);var m=!0;function h(e){let{csrfToken:s,providers:a}=e,l=(0,d.useRouter)(),[m,h]=(0,c.useState)(!1),[x,p]=(0,c.useState)(""),[j,f]=(0,c.useState)({email:"",password:""}),[w,b]=(0,c.useState)({email:"",password:""}),N=e=>!!e.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),g=e=>{p(""),b(s=>({...s,[e.target.name]:""})),f(s=>({...s,[e.target.name]:e.target.value}))},v=async e=>{if(e.preventDefault(),""===j.email){b(e=>({...e,email:"Please enter email address"}));return}let s=N(j.email);if(!s){b(e=>({...e,email:"Please enter a correct email address"}));return}if(""===j.password){b(e=>({...e,password:"Please enter password"}));return}h(!0);let a=await (0,r.signIn)("credentials",{password:j.password,email:j.email,redirect:!1});if(200!==a.status){p(a.error),h(!1),(0,u.Am)(a.error,{type:"error"});return}h(!1),(0,u.Am)("Signin Successful!",{type:"success"}),l.push("/")},_=async()=>{await (0,r.signIn)("github",{callbackUrl:"/"})};return(0,n.jsx)("div",{className:"bg-black text-white",children:(0,n.jsxs)("div",{className:"h-screen flex flex-col justify-center items-center",children:[(0,n.jsxs)("form",{onSubmit:v,method:"post",action:"/api/auth/callback/credentials",className:"w-4/5 sm:w-96 md:lg-1/3 lg:w-1/4",children:[(0,n.jsx)("input",{name:"csrfToken",type:"hidden",defaultValue:s}),(0,n.jsx)("h1",{className:"header1 text-center my-5 text-3xl",children:"Please login "}),x&&(0,n.jsx)("p",{className:"text-red-400",children:x}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"Email"}),(0,n.jsx)("input",{onChange:g,name:"email",placeholder:"johndoe@gmail.com",className:"mt-2 block text-black border w-full p-2 rounded-md"}),w.email&&(0,n.jsx)("p",{className:"text-red-400",children:w.email})]}),(0,n.jsxs)("div",{className:"mt-5",children:[(0,n.jsx)("label",{children:"Password"}),(0,n.jsx)("input",{onChange:g,name:"password",placeholder:"**************",type:"password",className:"mt-2 block text-black border w-full p-2 rounded-md"}),w.password&&(0,n.jsx)("p",{className:"text-red-400",children:w.password})]}),m?(0,n.jsx)(o.Z,{}):(0,n.jsx)("button",{type:"submit",className:"hero-button text-white p-2 rounded-md mt-5 w-20 border",children:"Sign in"})]}),(0,n.jsx)("div",{className:"w-4/5 sm:w-96 md:lg-1/3 lg:w-1/4 mt-5",children:a&&(0,n.jsxs)("div",{className:"w-full",children:[(0,n.jsx)("h2",{className:"text-center my-4",children:"Sign in with"}),(0,n.jsx)("div",{className:"",children:(0,n.jsx)("div",{className:"flex justify-around",children:(0,n.jsx)("span",{onClick:_,className:"cursor-pointer p-2 bg-[#171515] text-white text-2xl rounded-3xl border basis-1/2 flex items-center justify-center",children:(0,n.jsx)(t.ioR,{})})})})]},"github")}),(0,n.jsx)("div",{className:"my-4",children:(0,n.jsxs)("p",{children:["Don't Have an account?",(0,n.jsx)(i(),{href:"/auth/signup",children:(0,n.jsx)("span",{className:"underline cursor-pointer dark:border-none ml-4 border-2 p-1 border-dashed",children:"Signup"})})]})})]})})}}},function(e){e.O(0,[937,675,774,888,179],function(){return e(e.s=2413)}),_N_E=e.O()}]);