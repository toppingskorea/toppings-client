if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>n(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-981179b2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/122-8d4af793a5482d45.js",revision:"8d4af793a5482d45"},{url:"/_next/static/chunks/247-ae065a333ef39fb5.js",revision:"ae065a333ef39fb5"},{url:"/_next/static/chunks/262-ae66096516c2317f.js",revision:"ae66096516c2317f"},{url:"/_next/static/chunks/284-7d3b25c8c5626f8a.js",revision:"7d3b25c8c5626f8a"},{url:"/_next/static/chunks/461-a57f9934126b8469.js",revision:"a57f9934126b8469"},{url:"/_next/static/chunks/635-4792f31964f854c6.js",revision:"4792f31964f854c6"},{url:"/_next/static/chunks/978-3c89c4a23f0cc580.js",revision:"3c89c4a23f0cc580"},{url:"/_next/static/chunks/framework-a854c81c24cf2e55.js",revision:"a854c81c24cf2e55"},{url:"/_next/static/chunks/main-ad4cfd227aad6c0b.js",revision:"ad4cfd227aad6c0b"},{url:"/_next/static/chunks/pages/404-5539b242486f9e46.js",revision:"5539b242486f9e46"},{url:"/_next/static/chunks/pages/_app-dc5ef7b532bbdccf.js",revision:"dc5ef7b532bbdccf"},{url:"/_next/static/chunks/pages/_error-92e3c202d3b508e2.js",revision:"92e3c202d3b508e2"},{url:"/_next/static/chunks/pages/about-5b527ecf03a3e75e.js",revision:"5b527ecf03a3e75e"},{url:"/_next/static/chunks/pages/index-fc3f2fc953ea8c2f.js",revision:"fc3f2fc953ea8c2f"},{url:"/_next/static/chunks/pages/login-91aef875dece490c.js",revision:"91aef875dece490c"},{url:"/_next/static/chunks/pages/login/redirect-bc931e350282b256.js",revision:"bc931e350282b256"},{url:"/_next/static/chunks/pages/map-6ff3bdd250c73ff6.js",revision:"6ff3bdd250c73ff6"},{url:"/_next/static/chunks/pages/map/viewList-a297d23b363a23b9.js",revision:"a297d23b363a23b9"},{url:"/_next/static/chunks/pages/notice-e7e77c6bcbf46d5a.js",revision:"e7e77c6bcbf46d5a"},{url:"/_next/static/chunks/pages/post/%5Bid%5D-e8d71770afce3390.js",revision:"e8d71770afce3390"},{url:"/_next/static/chunks/pages/post/add-71c61d9f73f4f2b2.js",revision:"71c61d9f73f4f2b2"},{url:"/_next/static/chunks/pages/profile-5819719085413bc9.js",revision:"5819719085413bc9"},{url:"/_next/static/chunks/pages/profile/edit-e3343a6db301e58f.js",revision:"e3343a6db301e58f"},{url:"/_next/static/chunks/pages/profile/edit/eatingHabits-9c0f81b765598e68.js",revision:"9c0f81b765598e68"},{url:"/_next/static/chunks/pages/profile/edit/nationality-951ef365a9080c55.js",revision:"951ef365a9080c55"},{url:"/_next/static/chunks/pages/profile/menu-02b55cfde8a5c324.js",revision:"02b55cfde8a5c324"},{url:"/_next/static/chunks/pages/profile/posts-bd06ac5b0e3791e8.js",revision:"bd06ac5b0e3791e8"},{url:"/_next/static/chunks/pages/profile/reviews-c6ef391e79f508f2.js",revision:"c6ef391e79f508f2"},{url:"/_next/static/chunks/pages/profile/saved-a3e53ed1f02cbd65.js",revision:"a3e53ed1f02cbd65"},{url:"/_next/static/chunks/pages/recent-90197be6b39d6706.js",revision:"90197be6b39d6706"},{url:"/_next/static/chunks/pages/recent/filter/eatingHabit-48e2be56e975d186.js",revision:"48e2be56e975d186"},{url:"/_next/static/chunks/pages/recent/filter/nationality-b193ee22ff30864b.js",revision:"b193ee22ff30864b"},{url:"/_next/static/chunks/pages/recent/filter/restaurant-2ee0d9900b2b9803.js",revision:"2ee0d9900b2b9803"},{url:"/_next/static/chunks/pages/register/eatingHabits-cb47b16b10b8777d.js",revision:"cb47b16b10b8777d"},{url:"/_next/static/chunks/pages/register/nationality-436d488cb76f2e9d.js",revision:"436d488cb76f2e9d"},{url:"/_next/static/chunks/pages/review/%5Bid%5D-df849f91d412fd24.js",revision:"df849f91d412fd24"},{url:"/_next/static/chunks/pages/review/add/%5BrestaurantId%5D-68d739bae3bc079a.js",revision:"68d739bae3bc079a"},{url:"/_next/static/chunks/pages/search/%5Btype%5D-7d0fe384666b422f.js",revision:"7d0fe384666b422f"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-235955b20eb3ee85.js",revision:"235955b20eb3ee85"},{url:"/_next/static/j1D90CSX8eZpwnntjrCb9/_buildManifest.js",revision:"7849eb5f90a985bb182c6e6026a921b1"},{url:"/_next/static/j1D90CSX8eZpwnntjrCb9/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/android-icon-128x128.png",revision:"d0944415ac547329c6618491432db626"},{url:"/android-icon-144x144.png",revision:"e77d62eeb8d9069a7e7231a2243bf847"},{url:"/android-icon-152x152.png",revision:"aa868775213c67615a5480a130fa9429"},{url:"/android-icon-192x192.png",revision:"c6a978f32700cd84af29537f186725c9"},{url:"/android-icon-36x36.png",revision:"46d3384734537e73fb2154de436f1aa3"},{url:"/android-icon-384x384.png",revision:"f87a445811cae15fc45767c229af4b63"},{url:"/android-icon-48x48.png",revision:"fb5c63f0871669c9b5848cb5fffeaad4"},{url:"/android-icon-512x512.png",revision:"370794057443af4c8781007b07b5e54b"},{url:"/android-icon-72x72.png",revision:"5c5446d80dcaa3117949620f75d80c5f"},{url:"/android-icon-96x96.png",revision:"678981bdf9ee061a7e6d95fe8777829a"},{url:"/apple-icon-114x114.png",revision:"67f8f14c5f8040a7962f21c722277fc9"},{url:"/apple-icon-120x120.png",revision:"73b793d95f6d5f32781322f60ed91537"},{url:"/apple-icon-144x144.png",revision:"8f00185c7cf8586c9a34610e412a1f85"},{url:"/apple-icon-152x152.png",revision:"fbb00242c8fe619c2c2f398eb2603834"},{url:"/apple-icon-180x180.png",revision:"769af5b32ac9958362ff7bec864e5ff5"},{url:"/apple-icon-57x57.png",revision:"98845e8d37451536bbe7311b2c2bf9a1"},{url:"/apple-icon-60x60.png",revision:"4c464ee4c4741663a836a6db1584c912"},{url:"/apple-icon-72x72.png",revision:"42c70ab83f56f8b34a365c0bde61f8e9"},{url:"/apple-icon-76x76.png",revision:"9a10a3eb27f2e096b0251bd5c8baefc3"},{url:"/apple-icon-precomposed.png",revision:"501aa691452d022a11a6d6ba31384d64"},{url:"/apple-icon.png",revision:"501aa691452d022a11a6d6ba31384d64"},{url:"/browserconfig.xml",revision:"653d077300a12f09a69caeea7a8947f8"},{url:"/favicon-16x16.png",revision:"2277a19c59e52bb047bfb2ebec5c558b"},{url:"/favicon-32x32.png",revision:"1601703f79b4ae283bc2062287ef6f78"},{url:"/favicon-96x96.png",revision:"97e287a813da31fa390af99334f7c9b7"},{url:"/favicon.ico",revision:"5157af039d5625e90beaf5a434dd2e20"},{url:"/manifest.json",revision:"53f110804ee8974a5e2aebb84156556c"},{url:"/ms-icon-144x144.png",revision:"71c57abf8c67aafce505af77e3b31cd4"},{url:"/ms-icon-150x150.png",revision:"0abe98959a98cc86a9d44435dbac9f20"},{url:"/ms-icon-310x310.png",revision:"c001925e71ae7bf2fa932d9fe59df2a1"},{url:"/ms-icon-70x70.png",revision:"5a4c95d916defdbdeb028cf9d560189e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
