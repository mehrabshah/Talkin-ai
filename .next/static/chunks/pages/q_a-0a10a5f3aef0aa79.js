(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[170],{5847:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/q_a",function(){return a(6177)}])},6177:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return v}});var n=a(5893),t=a(7294),i=a(9008),o=a.n(i),l=a(1502),r=a.n(l),d=a(5675),c=a.n(d),m=a(1664),u=a.n(m),h=a(4740),p=a(633),x=a(1375),g=a(3299);function _(){let[e,s]=(0,t.useState)(),[a,i]=(0,t.useState)(),[l,r]=(0,t.useState)(),[d,c]=(0,t.useState)(""),[m,u]=(0,t.useState)(""),[h,p]=(0,t.useState)(!1),x=(0,g.useSession)(),{status:_,data:v}=x,f=s=>{s.preventDefault(),fetch("/api/add-review",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({productName:e,planName:a,productReview:l})}).then(()=>{u(!1),c("We have received your feedback! Thank you!")}).catch(e=>{u(!0),c("Something is wrong!")}),s.target.reset()};return(0,n.jsxs)("div",{className:"background-remover",children:[(0,n.jsxs)(o(),{children:[(0,n.jsx)("title",{children:"Send Us Your Feedback"}),(0,n.jsx)("meta",{name:"description",content:"Background-remover"})]}),(0,n.jsxs)("div",{className:"max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12",children:[(0,n.jsx)("form",{onSubmit:e=>f(e),children:(0,n.jsxs)("div",{className:"review-card shadow sm:rounded-md sm:overflow-hidden",children:[(0,n.jsxs)("div",{className:"flex flex-col",children:[(0,n.jsx)("label",{className:"text-white",htmlFor:"productName",children:"Product Name"}),(0,n.jsxs)("select",{value:e,onChange:e=>s(e.target.value),className:"block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900",name:"productName",id:"productName",children:[(0,n.jsx)("option",{value:"",children:"Select Product"}),(0,n.jsx)("option",{value:"TalkingAvatar",children:"Talking Avatar"}),(0,n.jsx)("option",{value:"Tube2Lip",children:"Tube2Lip"}),(0,n.jsx)("option",{value:"GPT2Speech",children:"GPT2Speech"}),(0,n.jsx)("option",{value:"Other",children:"Other"})]})]}),(0,n.jsxs)("div",{className:"flex flex-col",children:[(0,n.jsx)("label",{className:"text-white",htmlFor:"planName",children:"Plan Name"}),(0,n.jsxs)("select",{value:a,onChange:e=>i(e.target.value),className:"block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900",name:"planName",id:"planName",children:[(0,n.jsx)("option",{value:"",children:"Select Plan"}),(0,n.jsx)("option",{value:"New User Trial",children:"New User Trial"}),(0,n.jsx)("option",{value:"Lite Plan",children:"Lite Plan"}),(0,n.jsx)("option",{value:"Pro Plan",children:"Pro Plan"}),(0,n.jsx)("option",{value:"Advanced Plan",children:"Advanced Plan"})]})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{htmlFor:"about",className:"block text-sm font-medium text-white-700",children:"Review"}),(0,n.jsx)("div",{className:"text-black mt-1",children:(0,n.jsx)("textarea",{id:"productReview",name:"productReview",rows:7,value:l,onChange:e=>r(e.target.value),className:"shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"})})]}),(0,n.jsx)("div",{children:(0,n.jsx)("button",{type:"submit",className:"hero-button w-full hover:bg-green-700 text-white font-bold mt-6 py-2 px-4 rounded\n                  ".concat(h||""===a?"cursor-not-allowed opacity-50":""),disabled:h||""===a,children:h?"Generating...":"Submit Your Review"})})]})}),(0,n.jsx)("p",{className:"header1 py-3",children:d})]})]})}function v(){let[e,s]=(0,t.useState)(""),[a,i]=(0,t.useState)(!1),[l,d]=(0,t.useState)({messages:[{message:"Hi, I'm an AI assistant for TALKIN AI. How can I help you?",type:"apiMessage"}],history:[]}),{messages:m,pending:g,history:v}=l,f=(0,t.useRef)(null),j=(0,t.useRef)(null);(0,t.useEffect)(()=>{let e=f.current;e&&(e.scrollTop=e.scrollHeight)},[g]),(0,t.useEffect)(()=>{var e;null===(e=j.current)||void 0===e||e.focus()},[a]);let w=async a=>{a.preventDefault();let n=e.trim();if(""===n)return;d(e=>({...e,messages:[...e.messages,{type:"userMessage",message:n}],pending:void 0})),i(!0),s(""),d(e=>({...e,pending:""}));let t=new AbortController;(0,x.L)("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:n,history:v}),signal:t.signal,onmessage:e=>{var s,a,o;if("[DONE]"===e.data)d(e=>({history:[...e.history,[n,null!==(s=e.pending)&&void 0!==s?s:""]],messages:[...e.messages,{type:"apiMessage",message:null!==(a=e.pending)&&void 0!==a?a:""}],pending:void 0})),i(!1),t.abort();else{let l=JSON.parse(e.data);d(e=>({...e,pending:(null!==(o=e.pending)&&void 0!==o?o:"")+l.data}))}}})},N=s=>{"Enter"===s.key&&e?!s.shiftKey&&e&&w(s):"Enter"===s.key&&s.preventDefault()},b=(0,t.useMemo)(()=>[...m,...g?[{type:"apiMessage",message:g}]:[]],[m,g]);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(o(),{children:[(0,n.jsx)("title",{children:"TALKIN AI ChatBOT"}),(0,n.jsx)("meta",{name:"title",content:"Chat Your Data"}),(0,n.jsx)("meta",{name:"description",content:"Using AI to answer questions"}),(0,n.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.jsxs)("div",{className:"max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12",children:[(0,n.jsx)("div",{className:r().topnav,children:(0,n.jsx)("div",{children:(0,n.jsx)(u(),{href:"/",children:(0,n.jsx)("h1",{className:"header1 text-2xl md:text-2xl font-bold",children:"TALKIN.AI ChatBOT"})})})}),(0,n.jsxs)("main",{className:r().main,children:[(0,n.jsx)("div",{className:r().cloud,children:(0,n.jsx)("div",{ref:f,className:r().messagelist,children:b.map((e,s)=>{let t,i;return"apiMessage"===e.type?(t=(0,n.jsx)(c(),{src:"/talkinai_bobo.png",alt:"AI",width:"30",height:"30",className:r().boticon,priority:!0}),i=r().apimessage):(t=(0,n.jsx)(c(),{src:"/usericon.png",alt:"Me",width:"30",height:"30",className:r().usericon,priority:!0}),i=a&&s===b.length-1?r().usermessagewaiting:r().usermessage),(0,n.jsxs)("div",{className:i,children:[t,(0,n.jsx)("div",{className:r().markdownanswer,children:(0,n.jsx)(h.D,{children:e.message})})]},s)})})}),(0,n.jsxs)("div",{className:r().center,children:[(0,n.jsx)("div",{className:r().cloudform,children:(0,n.jsxs)("form",{onSubmit:w,children:[(0,n.jsx)("textarea",{disabled:a,onKeyDown:N,ref:j,autoFocus:!1,rows:1,maxLength:512,id:"userInput",name:"userInput",placeholder:a?"Waiting for response...":"Type your question...",value:e,onChange:e=>s(e.target.value),className:r().textarea}),(0,n.jsx)("button",{type:"submit",disabled:a,className:r().generatebutton,children:a?(0,n.jsx)("div",{className:r().loadingwheel,children:(0,n.jsx)(p.Z,{color:"inherit",size:20})}):(0,n.jsx)("svg",{viewBox:"0 0 20 20",className:r().svgicon,xmlns:"http://www.w3.org/2000/svg",children:(0,n.jsx)("path",{d:"M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"})})})]})}),(0,n.jsx)("div",{className:r().footer,children:(0,n.jsx)("p",{children:" "})})]}),(0,n.jsx)("div",{className:r().topnav,children:(0,n.jsx)("div",{children:(0,n.jsx)(u(),{href:"/",children:(0,n.jsx)("h1",{className:"header1 text-2xl md:text-2xl font-bold",children:"Write a Review"})})})}),(0,n.jsx)(_,{})]})]})]})}},1502:function(e){e.exports={main:"Home_main__nLjiQ",header:"Home_header__GCVRv",topnav:"Home_topnav__BfkuW",navlogo:"Home_navlogo__AhPAx",navlinks:"Home_navlinks__mBPil",apptitle:"Home_apptitle__ajcBb",appdescription:"Home_appdescription__3WT4M",link:"Home_link__mt0ji",cloudform:"Home_cloudform__W4PLJ",textarea:"Home_textarea__lSHf7",generatebutton:"Home_generatebutton__omKYX",loadingwheel:"Home_loadingwheel__IWJnE",svgicon:"Home_svgicon__PLaWz",messagelist:"Home_messagelist__YHr8p",messagelistloading:"Home_messagelistloading__tlCYV",usermessage:"Home_usermessage__tWHWR",usermessagewaiting:"Home_usermessagewaiting__PYv_4","loading-gradient":"Home_loading-gradient__8jpVG",apimessage:"Home_apimessage__VhfTn",fadein:"Home_fadein__CBLON",markdownanswer:"Home_markdownanswer__UUDfu",boticon:"Home_boticon__Xr0Q4",usericon:"Home_usericon___BrVD",center:"Home_center__4BFgC",cloud:"Home_cloud__S7par",pointsnormal:"Home_pointsnormal__yRwA_",pointsdim:"Home_pointsdim__x_zcw",footer:"Home_footer____T7K",fadeIn:"Home_fadeIn__rYUMu"}}},function(e){e.O(0,[675,490,774,888,179],function(){return e(e.s=5847)}),_N_E=e.O()}]);