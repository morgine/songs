(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{d674:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("q-page",{attrs:{padding:""}},[t("q-form",{staticClass:"row q-gutter-lg"},[t("q-input",{attrs:{filled:"",label:"开始日期"},scopedSlots:e._u([{key:"append",fn:function(){return[t("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[t("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[t("q-date",{model:{value:e.params.BeginDate,callback:function(a){e.$set(e.params,"BeginDate",a)},expression:"params.BeginDate"}},[t("div",{staticClass:"row items-center justify-end"},[t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1)]},proxy:!0}]),model:{value:e.params.BeginDate,callback:function(a){e.$set(e.params,"BeginDate",a)},expression:"params.BeginDate"}}),t("q-input",{attrs:{filled:"",label:"结束日期"},scopedSlots:e._u([{key:"append",fn:function(){return[t("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[t("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[t("q-date",{model:{value:e.params.EndDate,callback:function(a){e.$set(e.params,"EndDate",a)},expression:"params.EndDate"}},[t("div",{staticClass:"row items-center justify-end"},[t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1)]},proxy:!0}]),model:{value:e.params.EndDate,callback:function(a){e.$set(e.params,"EndDate",a)},expression:"params.EndDate"}}),t("q-space"),t("div",{staticClass:"row items-center"},[t("q-btn",{attrs:{label:"获取统计",type:"submit",color:"primary"},on:{click:e.getStatistics}})],1)],1),t("q-table",{attrs:{title:"统计总量",data:e.statistics?[e.statistics]:[],columns:e.columns,"row-key":"name",loading:e.loading},scopedSlots:e._u([{key:"top-right",fn:function(){return[t("q-btn",{attrs:{color:"primary","icon-right":"archive",label:"导出 csv","no-caps":""},on:{click:function(a){return e.exportTable("总量-"+e.params.BeginDate+"-"+e.params.EndDate,e.statistics?[e.statistics]:[],e.columns)}}})]},proxy:!0}])})],1)},n=[],i=t("bd4c"),r=t("a357");const l=Date.now(),c=864e5,o=i["b"].formatDate(l-c,"YYYY/MM/DD"),u=i["b"].formatDate(l-2*c,"YYYY/MM/DD");function p(e,a){let t=void 0!==a?a(e):e;return t=void 0===t||null===t?"":String(t),t=t.split('"').join('""'),`"${t}"`}var m={data(){return{params:{Limit:500,Offset:0,BeginDate:u,EndDate:o},pagination:{page:0,maxPage:0},loading:!1,columns:[{name:"count",align:"right",label:"公众号数量",field:"count"},{name:"cumulate_user",align:"right",label:"用户总计",field:"cumulate_user"},{name:"new_user",align:"right",label:"新增用户",field:"new_user"},{name:"cancel_user",align:"right",label:"取关用户",field:"cancel_user"},{name:"positive_user",align:"right",label:"净增用户",field:e=>e.new_user-e.cancel_user}],statistics:{count:0,cumulate_user:0,new_user:0,cancel_user:0,app_user_statistics:[{appid:"",nickname:"",err:"",statistics:{cumulate_user:0,new_user:0,cancel_user:0,cumulates:[{ref_date:"",cumulate_user:0,new_user:0,cancel_user:0,summaries:[{ref_date:"",user_source:0,new_user:0,cancel_user:0}]}]}}]}}},methods:{getStatistics(){this.loading=!0,this.$axios.get("/user-statistics",{params:this.params}).then((e=>{e=e.data,e&&e.Data&&(this.statistics=e.Data,this.loading=!1)}))},exportTable(e,a,t){const s=[t.map((e=>p(e.label)))].concat(a.map((e=>t.map((a=>p("function"===typeof a.field?a.field(e):e[void 0===a.field?a.name:a.field],a.format))).join(",")))).join("\r\n"),n=Object(r["a"])(`${e}.csv`,s,"text/csv");!0!==n&&this.$q.notify({message:"浏览器阻止下载文件...",color:"negative",icon:"warning"})}}},d=m,f=t("2877"),g=t("9989"),b=t("0378"),_=t("27f9"),v=t("0016"),D=t("7cbe"),w=t("52ee"),h=t("9c40"),y=t("2c91"),q=t("eaac"),x=t("7f67"),k=t("eebe"),B=t.n(k),C=Object(f["a"])(d,s,n,!1,null,"76cf2593",null);a["default"]=C.exports;B()(C,"components",{QPage:g["a"],QForm:b["a"],QInput:_["a"],QIcon:v["a"],QPopupProxy:D["a"],QDate:w["a"],QBtn:h["a"],QSpace:y["a"],QTable:q["a"]}),B()(C,"directives",{ClosePopup:x["a"]})}}]);