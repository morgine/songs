(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{9641:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("q-page",{attrs:{padding:""}},[e.unauthorized?[t("div",[e._v("当前未授权\n      "),t("q-btn",{attrs:{label:"去授权",size:"sm"},on:{click:e.goAuth}})],1),e.refresh?t("div",[e._v("如果已授权成功则\n      "),t("q-btn",{attrs:{label:"刷新",icon:"refresh",size:"sm"},on:{click:e.checkAuth}})],1):e._e()]:[t("q-form",{staticClass:"q-gutter-md"},[t("q-input",{attrs:{filled:"",label:"广告主帐号 id"},model:{value:e.dailyReportsParams.account_id,callback:function(a){e.$set(e.dailyReportsParams,"account_id",a)},expression:"dailyReportsParams.account_id"}}),t("q-select",{attrs:{filled:"",options:e.levels,"emit-value":"","map-options":"",label:"报表级别"},model:{value:e.dailyReportsParams.level,callback:function(a){e.$set(e.dailyReportsParams,"level",a)},expression:"dailyReportsParams.level"}}),t("q-input",{attrs:{filled:"",label:"开始日期"},scopedSlots:e._u([{key:"append",fn:function(){return[t("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[t("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[t("q-date",{attrs:{mask:"YYYY-MM-DD"},model:{value:e.dailyReportsParams.date_range.start_date,callback:function(a){e.$set(e.dailyReportsParams.date_range,"start_date",a)},expression:"dailyReportsParams.date_range.start_date"}},[t("div",{staticClass:"row items-center justify-end"},[t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1)]},proxy:!0}]),model:{value:e.dailyReportsParams.date_range.start_date,callback:function(a){e.$set(e.dailyReportsParams.date_range,"start_date",a)},expression:"dailyReportsParams.date_range.start_date"}}),t("q-input",{attrs:{filled:"",label:"结束日期"},scopedSlots:e._u([{key:"append",fn:function(){return[t("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[t("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[t("q-date",{attrs:{mask:"YYYY-MM-DD"},model:{value:e.dailyReportsParams.date_range.end_date,callback:function(a){e.$set(e.dailyReportsParams.date_range,"end_date",a)},expression:"dailyReportsParams.date_range.end_date"}},[t("div",{staticClass:"row items-center justify-end"},[t("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1)]},proxy:!0}]),model:{value:e.dailyReportsParams.date_range.end_date,callback:function(a){e.$set(e.dailyReportsParams.date_range,"end_date",a)},expression:"dailyReportsParams.date_range.end_date"}}),t("q-select",{attrs:{filled:"",options:e.timeLines,"emit-value":"","map-options":"",label:"时间口径"},model:{value:e.dailyReportsParams.time_line,callback:function(a){e.$set(e.dailyReportsParams,"time_line",a)},expression:"dailyReportsParams.time_line"}}),t("q-table",{attrs:{title:"可选字段",data:e.fields,columns:e.columns,"row-key":"name",selection:"multiple",selected:e.selectedFields},on:{"update:selected":function(a){e.selectedFields=a}}}),t("div",[t("q-btn",{attrs:{label:"获取统计",type:"submit",color:"primary"},on:{click:e.getDailyReports}})],1)],1),e.dailyReports.list.length?t("q-table",{staticClass:"q-mt-lg",attrs:{title:"广告统计",data:e.dailyReports.list,columns:e.selectedColumns,pagination:e.dailyReportsPagination,"row-key":e.selectedColumns[0]?e.selectedColumns[0].name:"name"},on:{"update:pagination":function(a){e.dailyReportsPagination=a},request:e.getDailyReports},scopedSlots:e._u([{key:"top-right",fn:function(){return[t("q-btn",{attrs:{color:"primary","icon-right":"archive",label:"导出 csv","no-caps":""},on:{click:function(a){return e.exportTable("广告统计-"+e.dailyReportsParams.date_range.start_date+"-"+e.dailyReportsParams.date_range.end_date,e.dailyReports.list,e.selectedColumns)}}})]},proxy:!0}],null,!1,1269218743)}):e._e()]],2)},l=[],i=(t("ddb0"),t("a357"));function r(e,a){let t=void 0!==a?a(e):e;return t=void 0===t||null===t?"":String(t),t=t.split('"').join('""'),`"${t}"`}var o={name:"Index",data(){return{unauthorized:!0,refresh:!1,dailyReportsParams:{account_id:0,level:"",date_range:{start_date:"",end_date:""},filtering:[{field:"",operator:"",values:[""]}],group_by:[""],order_by:[{sort_field:"",sort_type:""}],page:1,page_size:20,time_line:"REPORTING_TIME",fields:[]},dailyReports:{list:[{date:"2017-05-01",campaign_id:"<CAMPAIGN_ID>",adgroup_id:"<ADGROUP_ID>",ad_id:"<AD_ID>",cost:1200,image_click:0,like_or_comment:0,app_payment_count:0,app_payment_amount:0,app_installation:0,activation:0,click:1200,conversion:0,download:0,follow:0,impression:12e3,order_placement:0,register:0,reservation:0,share:0}],page_info:{page:1,page_size:10,total_number:1,total_page:1}},levels:[{value:"REPORT_LEVEL_ADVERTISER_WECHAT",label:"微信广告主级别报表"},{value:"REPORT_LEVEL_CAMPAIGN_WECHAT",label:"微信推广计划级别报表"},{value:"REPORT_LEVEL_ADGROUP_WECHAT",label:"微信广告组级别报表"},{value:"REPORT_LEVEL_AD_WECHAT",label:"微信广告级别报表"}],timeLines:[{value:"REPORTING_TIME",label:"上报时间口径"}],columns:[{name:"displayName",align:"left",label:"名称",field:"displayName"},{name:"tip",align:"left",label:"说明",field:"tip"}],fields:[],selectedFields:[],selectedColumns:[],dailyReportsPagination:{page:0,rowsPerPage:0,rowsNumber:0}}},computed:{selectedLevel(){return this.dailyReportsParams.level}},created(){this.checkAuth()},watch:{selectedLevel(){this.getDailyReportsLevelFields()},selectedFields(e){const a=[],t=[];for(const s of e)a.push(s.name),t.push({name:s.name,label:s.displayName,align:"left",field:s.name});this.dailyReportsParams.fields=a,this.selectedColumns=t},dailyReportsPagination(e){this.dailyReportsParams.page=e.page,this.dailyReportsParams.page_size=e.rowsPerPage}},methods:{goAuth(){this.$axios.get("/advert-authorizer-url").then((e=>{e=e.data,e&&e.Data&&(this.refresh=!0,window.open(e.Data,"_blank"))}))},checkAuth(){this.$axios.get("/check-advert-authorized").then((e=>{e=e.data,e&&e.Data&&(this.unauthorized=!1,this.refresh=!1)}))},getDailyReportsLevelFields(){this.$axios.get("/daily-reports-level-fields",{params:{Level:this.dailyReportsParams.level}}).then((e=>{e=e.data,e.Data&&(this.fields=e.Data)}))},getDailyReports(){this.$axios.post("/daily-reports",this.dailyReportsParams).then((e=>{e=e.data,e&&e.Data&&(this.dailyReports=e.Data,this.dailyReportsPagination.rowsNumber=this.dailyReports.page_info.total_number,this.dailyReportsPagination.page=this.dailyReports.page_info.page,this.dailyReportsPagination.rowsPerPage=this.dailyReports.page_info.page_size)}))},exportTable(e,a,t){const s=[t.map((e=>r(e.label)))].concat(a.map((e=>t.map((a=>r("function"===typeof a.field?a.field(e):e[void 0===a.field?a.name:a.field],a.format))).join(",")))).join("\r\n"),l=Object(i["a"])(`${e}.csv`,s,"text/csv");!0!==l&&this.$q.notify({message:"浏览器阻止下载文件...",color:"negative",icon:"warning"})}}},n=o,d=t("2877"),p=t("9989"),c=t("9c40"),m=t("0378"),u=t("27f9"),_=t("ddd8"),y=t("0016"),g=t("7cbe"),f=t("52ee"),R=t("eaac"),h=t("7f67"),v=t("eebe"),P=t.n(v),b=Object(d["a"])(n,s,l,!1,null,"354c9aa4",null);a["default"]=b.exports;P()(b,"components",{QPage:p["a"],QBtn:c["a"],QForm:m["a"],QInput:u["a"],QSelect:_["a"],QIcon:y["a"],QPopupProxy:g["a"],QDate:f["a"],QTable:R["a"]}),P()(b,"directives",{ClosePopup:h["a"]})}}]);