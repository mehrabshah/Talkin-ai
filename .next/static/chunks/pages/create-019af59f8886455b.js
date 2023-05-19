(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[417],{466:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/create",function(){return a(2625)}])},2625:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return j}});var l=a(5893),o=a(9008),i=a.n(o),s=a(1664),n=a.n(s),r=a(7294),d=a(3299),u=a(6554),c=a(5678),h=a(9662),p=a(6859);let m={title:"FAQ (How it works)",rows:[{title:"How to make a talking avatar?",content:'Upload your character image, type in the text or use GPT2Speech module to create what you want your avatar to say, then either select voice or upload custom voice to clone, click on "Generate Talking Avatar" button.'},{title:"Any avatar image requirements?",content:"The avatar image file should be a jpg/jpeg file. Make sure the head is almost in the middle (check existing examples on the website for a reference)."},{title:"Any custom audio requirements?",content:"The custom audio file should be a wav/mp3 file, optimally 10-15 seconds."},{title:"How long does it take to make the video?",content:"It depends. It might in seconds or couple of minutes If you come in non-peak hour, you may have to wait cold-start of the machine. If that's the case, grab your coffee and wait couple of minutes. It's worthwhile your wait."},{title:"How to change the size  of talking avatar video?",content:"The default size is 256\xd7256. But you can easily resize by specify the width and height in the url. \n            For example, the original link is https://res.cloudinary.com/*/video/upload/*. Yon can add h_512,w_512 in the link\n            as  https://res.cloudinary.com/*/video/upload/h_512,w_512/*."},{title:"How to share to social media?",content:"You can either download the video or use the video url to share."},{title:"How long will the video url be valid?",content:"The video url will be valid for 30 days. We still strongly recommend you to download the video and save to your local drive immediately after the creation. "},{title:"How to contact us with further questions?",content:"You may go to Chat page and leave us a review. Please be as specific as possible. "}]},x={bgColor:"black",titleTextColor:"white",rowTitleColor:"white",rowContentColor:"grey",arrowColor:"white"},v={};function f(){return(0,l.jsx)("div",{className:"faq-card",children:(0,l.jsx)(p.Z,{data:m,styles:x,config:v})})}var w=a(1001);let g=e=>new Promise(t=>setTimeout(t,e));function y(){let[e,t]=(0,r.useState)([]),[a,o]=(0,r.useState)(null),[i,s]=(0,r.useState)(null),[p,m]=(0,r.useState)(null),[x,v]=(0,r.useState)(),[y,j]=(0,r.useState)(),[b,S]=(0,r.useState)(null),[_,N]=(0,r.useState)(),[k,T]=(0,r.useState)(),[F,A]=(0,r.useState)(),[C,M]=(0,r.useState)(),[O,U]=(0,r.useState)(),[D,P]=(0,r.useState)(""),[B,E]=(0,r.useState)(""),[G,q]=(0,r.useState)(""),[H,J]=(0,r.useState)(),[I,R]=(0,r.useState)(""),[Y,L]=(0,r.useState)(""),[z,Q]=(0,r.useState)(""),[Z,K]=(0,r.useState)(""),[V,X]=(0,r.useState)(""),[W,$]=(0,r.useState)(""),[ee,et]=(0,r.useState)(!0),[ea,el]=(0,r.useState)(!1),[eo,ei]=(0,r.useState)(!1),[es,en]=(0,r.useState)(!1),er=(0,d.useSession)(),{status:ed,data:eu}=er,ec=async()=>{let e=await fetch("/api/fetch-user-profile?email=".concat(null==eu?void 0:null===(a=eu.user)||void 0===a?void 0:a.email)),t=await e.json();var a,l,o=new Date;if(o.setDate(o.getDate()-3),null==t?void 0:t.isSubscribed){let i=await fetch("/api/fetch-user-usage?email=".concat(null==t?void 0:t.email,"&currentPeriodStart=").concat(null==t?void 0:t.currentPeriodStart)),s=await i.json();if(console.log(null==s?void 0:s._sum.video_duration),E(null==s?void 0:s._sum.video_duration),(null==s?void 0:s._sum.video_duration)==null)et(!1);else switch(null==t?void 0:t.productSubscribed){case"price_1Mw6i7Dfv2951nlDALJ1T3TO":(null==s?void 0:s._sum.video_duration)<18e3&&et(!1);break;case"price_1Mw6lvDfv2951nlDJdONFBJ1":(null==s?void 0:s._sum.video_duration)<54e3&&et(!1);break;case"price_1N8R7vDfv2951nlD2mhgqAuo":(null==s?void 0:s._sum.video_duration)<162e3&&et(!1)}}else if((null==t?void 0:t.onTrial)&&new Date(null==t?void 0:t.trialStartAt)>o){if((null==t?void 0:null===(l=t.creations)||void 0===l?void 0:l.length)==0)et(!1);else{let n=await fetch("/api/fetch-trial-usage?email=".concat(null==t?void 0:t.email,"&trialStartAt=").concat(null==t?void 0:t.trialStartAt)),r=await n.json();(null==r?void 0:r._sum.video_duration)<10800&&et(!1)}}};(0,r.useEffect)(()=>{ec()});let eh=e=>{M("");let t=e.target.files[0];if(!t)return;let a=(0,u.Or)(t.name);if(!a){let l="File type should be a jpg/jpeg image";(0,c.Am)(l,{type:"error"}),M(l);return}let o=(0,u.L8)(t);if(o){let i="File must be less or equal to 1MB";(0,c.Am)(i,{type:"error"}),M(i);return}let s=new FileReader;s.readAsDataURL(t),s.addEventListener("load",()=>{v(s.result),T(t)})},ep=async e=>{U("");let t=e.target.files[0];if(!t)return;let a=(0,u.F0)(t.name);if(!a){let l="File type should be a audio file";(0,c.Am)(l,{type:"error"}),U(l);return}let o=(0,u.jU)(t);if(o){let i="File must be less or equal to 2MB";(0,c.Am)(i,{type:"error"}),U(i);return}let s=new FileReader;s.readAsDataURL(t),s.addEventListener("load",()=>{el(!0),A(t),console.log(ea)})},em=async e=>{e.preventDefault();let t=e.currentTarget,a=Array.from(t.elements).find(e=>{let{name:t}=e;return"image"===t}),l=new FormData;for(let i of a.files)l.append("file",i);l.append("upload_preset","app_users");let n=await fetch("https://api.cloudinary.com/v1_1/dbospsdwo/image/upload",{method:"POST",body:l}).then(e=>e.json()),r=n.secure_url,d=Array.from(t.elements).find(e=>{let{name:t}=e;return"audio"===t}),u=new FormData;for(let c of d.files)u.append("file",c);u.append("upload_preset","app_users");let h=await fetch("https://api.cloudinary.com/v1_1/dbospsdwo/video/upload",{method:"POST",body:u}).then(e=>e.json()),p=h.secure_url;if(S(h.secure_url),ea)var x={Text:z,custom_voice:p};else var x={Text:z,voice_a:W};let v=await fetch("/api/tts_predictions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(x)}),f=await v.json();if(201!==v.status){m(f.detail),s(f);return}for(s(f);"succeeded"!==f.status&&"failed"!==f.status;){await g(1e3);let w=await fetch("/api/tts_predictions/"+f.id);if(f=await w.json(),200!==w.status){m(f.detail);return}console.log({audioPrediction:f}),s(f)}"succeeded"==f.status&&(s(f),j(f.output));let y=null==f?void 0:f.output,b=await fetch("/api/predictions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({image_in:r,audio_in:y})}),_=await b.json();if(201!==b.status){m(_.detail);return}for(o(_);"succeeded"!==_.status&&"failed"!==_.status;){await g(1e3);let N=await fetch("/api/predictions/"+_.id);if(_=await N.json(),200!==N.status){m(_.detail);return}console.log({prediction:_}),o(_)}if("succeeded"==_.status){let k=_.output;try{let T=new FormData;T.append("file",k),T.append("upload_preset","talking_avatar");let F=await fetch("https://api.cloudinary.com/v1_1/dbospsdwo/video/upload",{method:"POST",body:T}).then(e=>e.json()),A=F.secure_url,C=F.public_id,M=Math.floor(60*F.duration);P(F.secure_url);try{await fetch("/api/creation",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cld_video_url:A,cld_video_id:C,cld_video_duration:M})})}catch(O){console.error(O)}}catch(U){console.error(U)}}};return(0,l.jsxs)("div",{className:"max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12",children:[(0,l.jsxs)("div",{className:"grid gap-y-12 md:grid-cols-1 md:gap-x-12 ",children:[(0,l.jsx)("div",{className:"",children:(0,l.jsxs)("form",{onSubmit:e=>em(e),children:[(0,l.jsxs)("div",{className:"flex flex-col",children:[(0,l.jsxs)("label",{className:"text-white",htmlFor:"image",children:["Select Picture: ","   ","    ",(0,l.jsx)("span",{className:"text-red-500",children:"(jpg/jpeg, Max 1MB) "}),(0,l.jsx)("span",{className:"text-red-400",children:"*"})]}),(0,l.jsx)("input",{type:"file",className:"hero-button w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-white-500 my-2 text-white-900",name:"image",placeholder:"Select Picture",onChange:eh}),(0,l.jsx)("img",{src:x,className:"basis-1/2 h-auto w-48 my-5",accept:"image/*"})]}),(0,l.jsxs)("div",{className:"flex flex-col",children:[(0,l.jsx)("label",{htmlFor:"speech",className:"sr-only",children:"Speech (Required)"}),(0,l.jsx)("textarea",{rows:7,value:z,onChange:e=>Q(e.target.value),name:"speech",id:"speech",placeholder:"Speech for AI (Required)",className:"block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"})]}),(0,l.jsxs)("div",{className:"flex flex-col",children:[(0,l.jsx)("label",{className:"text-white",htmlFor:"voice",children:"Option 1: Select voice"}),(0,l.jsxs)("select",{value:W,onChange:e=>$(e.target.value),className:"block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900",name:"voice",id:"voice",type:"text",placeholder:"Select Voice",children:[(0,l.jsx)("option",{value:"",children:"Select Voice"}),(0,l.jsx)("option",{value:"en-US-Male-A",children:"en-US-Male-A"}),(0,l.jsx)("option",{value:"en-US-Female-B",children:"en-US-Female-B"}),(0,l.jsx)("option",{value:"en-US-Male-C",children:"en-US-Male-C"}),(0,l.jsx)("option",{value:"en-US-Female-D",children:"en-US-Female-D"}),(0,l.jsx)("option",{value:"en-GB-Male-E",children:"en-GB-Male-E"}),(0,l.jsx)("option",{value:"en-GB-Female-F",children:"en-GB-Female-F"}),(0,l.jsx)("option",{value:"en-AU-Male-G",children:"en-AU-Male-G"}),(0,l.jsx)("option",{value:"en-AU-Female-H",children:"en-AU-Female-H"}),(0,l.jsx)("option",{value:"Cage",children:"Cage"}),(0,l.jsx)("option",{value:"Fifth_Element",children:"Fifth_Element"}),(0,l.jsx)("option",{value:"Musk",children:"Musk"}),(0,l.jsx)("option",{value:"Obama",children:"Obama"}),(0,l.jsx)("option",{value:"Queen",children:"Queen"}),(0,l.jsx)("option",{value:"Shrek",children:"Shrek"}),(0,l.jsx)("option",{value:"Samuel_Jackson",children:"Samuel_Jackson"}),(0,l.jsx)("option",{value:"Tom",children:"Tom"}),(0,l.jsx)("option",{value:"Trump",children:"Trump"}),(0,l.jsx)("option",{value:"Young_Kid",children:"Young Kid"})]})]}),(0,l.jsxs)("div",{className:"flex flex-col",children:[(0,l.jsxs)("label",{className:"text-white",htmlFor:"audio",children:["Option 2: Upload custom voice ","   ","    ",(0,l.jsx)("span",{className:"text-red-500",children:"(wav/mp3, Max 2MB)"}),(0,l.jsx)("span",{className:"text-red-400",children:"*"})]}),(0,l.jsx)("input",{type:"file",className:"hero-button w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-white-500 my-2 text-white-900",name:"audio",placeholder:"Upload custom voice file",onChange:ep})]}),ee?(0,l.jsx)(n(),{href:"/pricing",children:(0,l.jsx)("button",{className:"hero-button hover:bg-green-700 text-white font-bold py-2 px-4 rounded",children:"Buy a Plan"})}):(0,l.jsx)("button",{className:"hero-button w-full hover:bg-green-700 text-white font-bold mt-6 py-2 px-4 rounded\n                  ".concat(eo||""===i?"cursor-not-allowed opacity-50":""),type:"submit",disabled:eo||""===i,children:eo?"Generating...":"Generate Talking Avatar"})]})}),(0,l.jsx)("div",{className:"",children:(0,l.jsxs)("div",{className:"flex flex-col",children:[(0,l.jsx)("label",{htmlFor:"output",className:"sr-only",children:"Output"}),(null==i?void 0:i.output)&&(0,l.jsx)("div",{children:(0,l.jsx)("audio",{controls:!0,muted:!0,autoPlay:!0,src:y,alt:"output"})}),(null==a?void 0:a.output)&&(0,l.jsx)("div",{children:(0,l.jsx)("video",{controls:!0,muted:!0,autoPlay:!0,src:a.output,alt:"output"})}),(0,l.jsxs)("p",{className:"py-3 text-sm opacity-50",children:["audio status: ",null==i?void 0:i.status]}),(0,l.jsxs)("p",{className:"py-3 text-sm opacity-50",children:["video status: ",null==a?void 0:a.status]}),(0,l.jsxs)("p",{className:"py-3 text-sm opacity-50",children:["video url: ",D]})]})})]}),(0,l.jsx)(w.Z,{}),(0,l.jsx)(h.Z,{url:D}),(0,l.jsx)(f,{})]})}function j(){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(i(),{children:[(0,l.jsx)("title",{children:"AI Talking Avatar Generator"}),(0,l.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,l.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,l.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,l.jsxs)("main",{className:"p-10 mx-auto max-w-4xl",children:[(0,l.jsx)("div",{className:"topnav",children:(0,l.jsx)("div",{children:(0,l.jsx)("h1",{className:"header1 text-2xl md:text-2xl font-bold",children:"Make Your Talking Avatar"})})}),(0,l.jsx)("div",{className:"flex flex-col items-center justify-center px-4 py-2",children:(0,l.jsx)("p",{className:"mt-3 text-1xl text-white",children:"Create Your Unique Talking Avatar in Seconds"})}),(0,l.jsx)(y,{})]})]})}}},function(e){e.O(0,[474,955,774,888,179],function(){return e(e.s=466)}),_N_E=e.O()}]);