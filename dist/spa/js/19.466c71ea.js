(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[19],{"2a45":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("div",{staticClass:"row q-gutter-lg items-center"},[a("q-input",{attrs:{filled:""},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{mask:"YYYY-MM-DD"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1)]},proxy:!0}]),model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),a("q-btn",{attrs:{label:"获取",loading:t.loading},on:{click:t.getEvents}})],1),a("q-table",{staticClass:"q-mt-xl",attrs:{title:"总和",data:t.sums,columns:t.sumsColumns,align:"center",loading:t.loading},scopedSlots:t._u([{key:"bottom",fn:function(){},proxy:!0}])}),a("q-table",{staticClass:"q-mt-xl",attrs:{title:"详细数据",data:t.evtApps,columns:t.columns,loading:t.loading,"row-key":"Appid"}})],1)},o=[],s=(a("ddb0"),a("bd4c"));const l=Date.now();var i={name:"Event",data(){return{events:[],start:l,apps:[],sums:[],sumsColumns:[{name:"AppNum",label:"已发送公众号数量",field:"AppNum",align:"center"},{name:"TotalCount",label:"标签下的粉丝数",field:"TotalCount",align:"center"},{name:"FilterCount",label:"发送消息的粉丝数",field:"FilterCount",align:"center"},{name:"SentCount",label:"发送成功粉丝数",field:"SentCount",align:"center"}],evtApps:[],columns:[{name:"NickName",label:"公众号",field:"NickName"},{name:"Status",label:"状态",field:"Status"},{name:"TotalCount",label:"标签下的粉丝数",field:"TotalCount",sortable:!0},{name:"FilterCount",label:"发送消息的粉丝数",field:"FilterCount",sortable:!0},{name:"SentCount",label:"发送成功粉丝数",field:"SentCount",sortable:!0}],loading:!1}},computed:{date:{get(){return s["b"].formatDate(this.start,"YYYY-MM-DD")},set(t){this.start=s["b"].extractDate(t,"YYYY-MM-DD")}}},created(){const t={Limit:2e3,Offset:0,Column:"id",Desc:!0,Selects:["appid","nick_name"]};this.$axios.get("/apps",{params:t}).then((t=>{t=t.data,t&&t.Data&&(this.apps=t.Data)}))},methods:{getEvents(){this.loading=!0,this.evtApps=[],this.sums=[];const t=Math.ceil(s["b"].startOfDate(this.start,"day")/1e3);this.$axios.get("/app-group-msg-result",{params:{Start:t,End:t+86400}}).then((t=>{if(t=t.data,t&&t.Data){const e=[],a={AppNum:0,TotalCount:0,FilterCount:0,SentCount:0};for(const n of this.apps){const o={Appid:n.Appid,NickName:n.NickName,Status:"",TotalCount:0,FilterCount:0,SentCount:0,ErrorCount:0};for(const e of t.Data)if(e.Appid===n.Appid){o.Status=e.Status,o.TotalCount=e.TotalCount,o.FilterCount=e.FilterCount,o.SentCount=e.SentCount,o.ErrorCount=e.ErrorCount,a.AppNum++,a.TotalCount+=e.TotalCount,a.FilterCount+=e.FilterCount,a.SentCount+=e.SentCount;break}e.push(o)}this.evtApps=e,this.sums.push(a)}this.loading=!1}))}}},r=i,u=a("2877"),p=a("9989"),c=a("27f9"),d=a("0016"),m=a("7cbe"),C=a("52ee"),b=a("9c40"),f=a("eaac"),g=a("7f67"),h=a("eebe"),v=a.n(h),S=Object(u["a"])(r,n,o,!1,null,"1b04bd8e",null);e["default"]=S.exports;v()(S,"components",{QPage:p["a"],QInput:c["a"],QIcon:d["a"],QPopupProxy:m["a"],QDate:C["a"],QBtn:b["a"],QTable:f["a"]}),v()(S,"directives",{ClosePopup:g["a"]})}}]);