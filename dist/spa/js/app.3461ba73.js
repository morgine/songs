(function(e){function t(t){for(var r,o,i=t[0],c=t[1],u=t[2],s=0,f=[];s<i.length;s++)o=i[s],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);d&&d(t);while(f.length)f.shift()();return l.push.apply(l,u||[]),n()}function n(){for(var e,t=0;t<l.length;t++){for(var n=l[t],r=!0,o=1;o<n.length;o++){var i=n[o];0!==a[i]&&(r=!1)}r&&(l.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={1:0},a={1:0},l=[];function i(e){return c.p+"js/"+({}[e]||e)+"."+{2:"dffc90b7",3:"56640677",4:"155c98f4",5:"0ff9da5d",6:"250ac0f5",7:"f468593d",8:"c6da84e8",9:"46d57ae4",10:"e01a28c3",11:"a41aa3dc",12:"268b5c32",13:"aae6cf05",14:"2ff31262",15:"f3e4eb7d",16:"73cfafca",17:"4849e6a3",18:"ed086af2"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={2:1,3:1,4:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{2:"0922eb79",3:"9c8809f7",4:"3b1f8c6e",5:"31d6cfe0",6:"31d6cfe0",7:"31d6cfe0",8:"31d6cfe0",9:"31d6cfe0",10:"31d6cfe0",11:"31d6cfe0",12:"31d6cfe0",13:"31d6cfe0",14:"31d6cfe0",15:"31d6cfe0",16:"31d6cfe0",17:"31d6cfe0",18:"31d6cfe0"}[e]+".css",a=c.p+r,l=document.getElementsByTagName("link"),i=0;i<l.length;i++){var u=l[i],s=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(s===r||s===a))return t()}var f=document.getElementsByTagName("style");for(i=0;i<f.length;i++){u=f[i],s=u.getAttribute("data-href");if(s===r||s===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,l=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");l.code="CSS_CHUNK_LOAD_FAILED",l.request=r,delete o[e],d.parentNode.removeChild(d),n(l)},d.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var l=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=l);var u,s=document.createElement("script");s.charset="utf-8",s.timeout=120,c.nc&&s.setAttribute("nonce",c.nc),s.src=i(e);var f=new Error;u=function(t){s.onerror=s.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}a[e]=void 0}};var d=setTimeout((function(){u({type:"timeout",target:s})}),12e4);s.onerror=s.onload=u,document.head.appendChild(s)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=t,u=u.slice();for(var f=0;f<u.length;f++)t(u[f]);var d=s;l.push([0,0]),n()})({0:function(e,t,n){e.exports=n("2f39")},"0047":function(e,t,n){},"2f39":function(e,t,n){"use strict";n.r(t);n("e6cf"),n("5319"),n("7d6e"),n("e54f"),n("985d"),n("0047");var r=n("2b0e"),o=n("bf69"),a=n("42d2"),l=n("b05d"),i=n("2a19"),c=n("436b");r["a"].use(l["a"],{config:{},lang:o["a"],iconSet:a["a"],plugins:{Notify:i["a"],Dialog:c["a"]}});var u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"q-app"}},[n("router-view")],1)},s=[],f={name:"App"},d=f,p=n("2877"),h=Object(p["a"])(d,u,s,!1,null,null,null),m=h.exports,b=n("2f62");r["a"].use(b["a"]);var v=function(){const e=new b["a"].Store({modules:{},strict:!1});return e},g=n("8c4f");const y=[{path:"/",component:()=>Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"c7f7")),children:[{path:"",component:()=>Promise.all([n.e(0),n.e(6)]).then(n.bind(null,"8b24"))},{path:"/login",component:()=>Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"013f"))},{path:"/register",component:()=>Promise.all([n.e(0),n.e(10)]).then(n.bind(null,"56b4"))}]},{path:"/",component:()=>Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"713b")),children:[{path:"/main",component:()=>Promise.all([n.e(0),n.e(7)]).then(n.bind(null,"e5ee"))},{path:"/settings",component:()=>Promise.all([n.e(0),n.e(11)]).then(n.bind(null,"89a3"))},{path:"/dashboard",component:()=>Promise.all([n.e(0),n.e(8)]).then(n.bind(null,"ec95"))},{path:"/apps",component:()=>Promise.all([n.e(0),n.e(13)]).then(n.bind(null,"862d0"))},{path:"/user-tag",component:()=>Promise.all([n.e(0),n.e(14)]).then(n.bind(null,"6375"))},{path:"/summary",component:()=>Promise.all([n.e(0),n.e(15)]).then(n.bind(null,"58c1"))},{path:"/statistics",component:()=>Promise.all([n.e(0),n.e(17)]).then(n.bind(null,"455e"))},{path:"/menus",component:()=>Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"d24f"))},{path:"/advert",component:()=>Promise.all([n.e(0),n.e(12)]).then(n.bind(null,"9641"))},{path:"/pictures",component:()=>Promise.all([n.e(0),n.e(16)]).then(n.bind(null,"7792"))},{path:"/subscribes",component:()=>Promise.all([n.e(0),n.e(18)]).then(n.bind(null,"b85c"))}]},{path:"*",component:()=>Promise.all([n.e(0),n.e(9)]).then(n.bind(null,"e51e"))}];var w=y;r["a"].use(g["a"]);var P=function(){const e=new g["a"]({scrollBehavior:()=>({x:0,y:0}),routes:w,mode:"hash",base:""});return e},O=async function(){const e="function"===typeof v?await v({Vue:r["a"]}):v,t="function"===typeof P?await P({Vue:r["a"],store:e}):P;e.$router=t;const n={router:t,store:e,render:e=>e(m),el:"#q-app"};return{app:n,store:e,router:t}},j=n("bc3a"),S=n.n(j),x=n("4328"),_=n.n(x);const E=S.a.create({baseURL:"http://console.cy66688.cn/v1",paramsSerializer(e){return _.a.stringify(e,{indices:!1})}}),A=localStorage.getItem("Authorization");A&&(E.defaults.headers.common.Authorization=A),r["a"].prototype.$axios=E;var C=n("2819"),k=n.n(C);r["a"].use(k.a);const T="";async function L(){const{app:e,store:t,router:n}=await O();let o=!1;const a=e=>{o=!0;const t=Object(e)===e?n.resolve(e).route.fullPath:e;window.location.href=t},l=window.location.href.replace(window.location.origin,""),i=[void 0,void 0];for(let u=0;!1===o&&u<i.length;u++)if("function"===typeof i[u])try{await i[u]({app:e,router:n,store:t,Vue:r["a"],ssrContext:null,redirect:a,urlPath:l,publicPath:T})}catch(c){return c&&c.url?void(window.location.href=c.url):void console.error("[Quasar] boot error:",c)}!0!==o&&new r["a"](e)}L()}});