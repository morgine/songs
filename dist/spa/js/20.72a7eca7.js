(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{"455e":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("q-form",{staticClass:"row q-gutter-lg"},[a("q-input",{attrs:{filled:"",label:"开始日期"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{model:{value:e.params.BeginDate,callback:function(t){e.$set(e.params,"BeginDate",t)},expression:"params.BeginDate"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1)]},proxy:!0}]),model:{value:e.params.BeginDate,callback:function(t){e.$set(e.params,"BeginDate",t)},expression:"params.BeginDate"}}),a("q-input",{attrs:{filled:"",label:"结束日期"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{model:{value:e.params.EndDate,callback:function(t){e.$set(e.params,"EndDate",t)},expression:"params.EndDate"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1)]},proxy:!0}]),model:{value:e.params.EndDate,callback:function(t){e.$set(e.params,"EndDate",t)},expression:"params.EndDate"}}),a("q-space"),a("div",{staticClass:"row items-center"},[a("q-btn",{attrs:{label:"获取统计",type:"submit",color:"primary",loading:e.loading},on:{click:e.getStatistics}})],1)],1),e._l(e.dates,(function(t,o){return[a("q-table",{key:"total-"+o,attrs:{title:"总量-"+t.date,data:[t.data],columns:e.columns,"row-key":"cumulate_user"},scopedSlots:e._u([{key:"top-right",fn:function(){return[a("q-btn",{attrs:{color:"primary","icon-right":"archive",label:"导出 csv","no-caps":""},on:{click:function(a){return e.exportTable("总量-"+t.date,[t.data],e.columns)}}})]},proxy:!0}],null,!0)}),a("q-table",{key:"app-"+o,attrs:{title:"详细-"+t.date,data:t.apps,columns:e.appColumns,"sort-method":e.sortColumns,"row-key":"appid"},scopedSlots:e._u([{key:"top-right",fn:function(){return[a("q-btn",{attrs:{color:"primary","icon-right":"archive",label:"导出 csv","no-caps":""},on:{click:function(a){return e.exportTable("详细-"+t.date,t.apps,e.appColumns)}}})]},proxy:!0},{key:"body-cell-total_outcome",fn:function(t){return[a("q-td",[e._v("\n          "+e._s(e.formatMoney(t.row.total_outcome))+"\n          "),a("q-popup-edit",{attrs:{value:e.formatMoney(t.row.total_outcome),title:"设置总支出",buttons:""},on:{input:function(e){t.row.total_outcome=100*e},save:function(a){return e.saveTotalOutcome(a,t.row.appid)}}},[a("q-input",{attrs:{value:e.formatMoney(t.row.total_outcome),dense:"",autofocus:""},on:{input:function(e){t.row.total_outcome=100*e}}})],1)],1)]}}],null,!0)})]}))],2)},n=[],l=(a("4e82"),a("bd4c")),s=a("a357");const r=Date.now(),i=864e5,c=l["b"].formatDate(r-i,"YYYY/MM/DD"),u=l["b"].formatDate(r-i,"YYYY/MM/DD");function p(e,t,a){let o=void 0!==a?a(e):e;return o=void 0===o||null===o?"":String(o),o=o.split('"').join('""'),`"${o}"`}var m={name:"Index",data(){const e=[{name:"total_outcome",label:"总支出(元)",field:e=>`${(e.total_outcome/100).toFixed(2)}`,sortable:!0},{name:"total_income",label:"总收入(元)",field:e=>`${(e.total_income/100).toFixed(2)}`,sortable:!0},{name:"total_income_outcome_rate",label:"总收支比率",field:e=>e.total_outcome?`${(100*e.total_income/e.total_outcome).toFixed(2)}`:"0.00",format:e=>`${e}%`},{name:"income",label:"当日收入(元)",field:e=>`${(e.income/100).toFixed(2)}`,sortable:!0},{name:"expected_payback_days",label:"预计回本天数",field:e=>e.income?Math.ceil((e.total_outcome-e.total_income)/e.income):"#",sortable:!0},{name:"cumulate_user",label:"用户总量",field:"cumulate_user",sortable:!0},{name:"new_user",label:"新增用户",field:"new_user",sortable:!0},{name:"cancel_user",label:"取消用户",field:"cancel_user",sortable:!0},{name:"positive_user",label:"净增用户",field:"positive_user",sortable:!0},{name:"cancel_rate",label:"取关率",field:e=>`${(100*e.cancel_rate).toFixed(2)}%`,sortable:!0},{name:"req_succ_count",label:"拉取量",field:"req_succ_count",sortable:!0},{name:"exposure_count",label:"曝光量",field:"exposure_count",sortable:!0},{name:"exposure_rate",label:"曝光率",field:e=>`${(100*e.exposure_rate).toFixed(2)}%`,sortable:!0},{name:"click_count",label:"点击量",field:"click_count",sortable:!0},{name:"click_rate",label:"点击率",field:e=>`${(100*e.click_rate).toFixed(2)}%`,sortable:!0},{name:"ecpm",label:"千次曝光收益(元)",field:e=>`${(e.ecpm/100).toFixed(2)}`,sortable:!0}];return{params:{Limit:500,Offset:0,BeginDate:u,EndDate:c},loading:!1,columns:e,appColumns:[{name:"index",label:"#",field:"index"},{name:"nickname",label:"公众号名称",field:"nickname"}].concat(e,{name:"errs",label:"错误列表",field:e=>e.errs?`${e.errs.join("\n")}`:""}),dates:[]}},methods:{formatMoney(e){return e/100},getStatistics(){this.loading=!0,this.$axios.get("/user-statistics",{params:this.params}).then((e=>{e=e.data,e&&e.Data&&(this.dates=e.Data,this.loading=!1)}))},exportTable(e,t,a){const o=[a.map((e=>p(e.label)))].concat(t.map((e=>a.map((t=>p("function"===typeof t.field?t.field(e):e[void 0===t.field?t.name:t.field],t.format))).join(",")))).join("\r\n"),n=Object(s["a"])(`${e}.csv`,o,"text/csv");!0!==n&&this.$q.notify({message:"浏览器阻止下载文件...",color:"negative",icon:"warning"})},sortColumns(e,t,a){return e.sort(((e,o)=>a?e[t]-o[t]:o[t]-e[t])),e},saveTotalOutcome(e,t){this.$axios.post("/app-payout",{Appid:t,Payout:100*e}).then((e=>{e=e.data,e&&e.Message&&this.$q.notify(e.Message)}))}}},d=m,f=a("2877"),b=a("9989"),_=a("0378"),y=a("27f9"),v=a("0016"),x=a("7cbe"),g=a("52ee"),q=a("9c40"),w=a("2c91"),h=a("eaac"),k=a("db86"),D=a("42a1"),$=a("7f67"),C=a("eebe"),M=a.n(C),Q=Object(f["a"])(d,o,n,!1,null,"59a40c66",null);t["default"]=Q.exports;M()(Q,"components",{QPage:b["a"],QForm:_["a"],QInput:y["a"],QIcon:v["a"],QPopupProxy:x["a"],QDate:g["a"],QBtn:q["a"],QSpace:w["a"],QTable:h["a"],QTd:k["a"],QPopupEdit:D["a"]}),M()(Q,"directives",{ClosePopup:$["a"]})}}]);