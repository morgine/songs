(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{7792:function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("q-page",{attrs:{padding:""}},[t("q-table",{attrs:{title:"Treats",data:e.data,columns:e.columns,"row-key":"name",selection:"multiple",selected:e.selected,filter:e.filter,grid:"","hide-header":""},on:{"update:selected":function(a){e.selected=a}},scopedSlots:e._u([{key:"top-left",fn:function(){return[t("q-checkbox",{attrs:{dense:"",label:e.props.row.name},model:{value:e.props.selected,callback:function(a){e.$set(e.props,"selected",a)},expression:"props.selected"}})]},proxy:!0},{key:"top-right",fn:function(){return[t("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"Search"},scopedSlots:e._u([{key:"append",fn:function(){return[t("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:e.filter,callback:function(a){e.filter=a},expression:"filter"}})]},proxy:!0},{key:"item",fn:function(a){return[t("div",{staticClass:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition",style:a.selected?"transform: scale(0.95);":""},[t("q-card",{class:a.selected?"bg-grey-2":""},[t("q-card-section",[t("q-checkbox",{attrs:{dense:"",label:a.row.name},model:{value:a.selected,callback:function(t){e.$set(a,"selected",t)},expression:"props.selected"}})],1),t("q-separator"),t("q-list",{attrs:{dense:""}},e._l(a.cols.filter((function(e){return"desc"!==e.name})),(function(a){return t("q-item",{key:a.name},[t("q-item-section",[t("q-item-label",[e._v(e._s(a.label))])],1),t("q-item-section",{attrs:{side:""}},[t("q-item-label",{attrs:{caption:""}},[e._v(e._s(a.value))])],1)],1)})),1)],1)],1)]}}])})],1)},l=[],n={data(){return{filter:"",selected:[],columns:[{name:"desc",required:!0,label:"Dessert (100g serving)",align:"left",field:e=>e.name,format:e=>`${e}`,sortable:!0},{name:"calories",align:"center",label:"Calories",field:"calories",sortable:!0},{name:"fat",label:"Fat (g)",field:"fat",sortable:!0},{name:"carbs",label:"Carbs (g)",field:"carbs"},{name:"protein",label:"Protein (g)",field:"protein"},{name:"sodium",label:"Sodium (mg)",field:"sodium"},{name:"calcium",label:"Calcium (%)",field:"calcium",sortable:!0,sort:(e,a)=>parseInt(e,10)-parseInt(a,10)},{name:"iron",label:"Iron (%)",field:"iron",sortable:!0,sort:(e,a)=>parseInt(e,10)-parseInt(a,10)}],data:[{name:"Frozen Yogurt",calories:159,fat:6,carbs:24,protein:4,sodium:87,calcium:"14%",iron:"1%"},{name:"Ice cream sandwich",calories:237,fat:9,carbs:37,protein:4.3,sodium:129,calcium:"8%",iron:"1%"},{name:"Eclair",calories:262,fat:16,carbs:23,protein:6,sodium:337,calcium:"6%",iron:"7%"},{name:"Cupcake",calories:305,fat:3.7,carbs:67,protein:4.3,sodium:413,calcium:"3%",iron:"8%"},{name:"Gingerbread",calories:356,fat:16,carbs:49,protein:3.9,sodium:327,calcium:"7%",iron:"16%"},{name:"Jelly bean",calories:375,fat:0,carbs:94,protein:0,sodium:50,calcium:"0%",iron:"0%"},{name:"Lollipop",calories:392,fat:.2,carbs:98,protein:0,sodium:38,calcium:"0%",iron:"2%"},{name:"Honeycomb",calories:408,fat:3.2,carbs:87,protein:6.5,sodium:562,calcium:"0%",iron:"45%"},{name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{name:"KitKat",calories:518,fat:26,carbs:65,protein:7,sodium:54,calcium:"12%",iron:"6%"}]}}},s=n,o=t("2877"),i=t("9989"),c=t("eaac"),m=t("8f8e"),d=t("27f9"),u=t("0016"),p=t("f09f"),f=t("a370"),b=t("eb85"),g=t("1c1c"),q=t("66e5"),k=t("4074"),y=t("0170"),h=t("eebe"),x=t.n(h),Q=Object(o["a"])(s,r,l,!1,null,"395f86fe",null);a["default"]=Q.exports;x()(Q,"components",{QPage:i["a"],QTable:c["a"],QCheckbox:m["a"],QInput:d["a"],QIcon:u["a"],QCard:p["a"],QCardSection:f["a"],QSeparator:b["a"],QList:g["a"],QItem:q["a"],QItemSection:k["a"],QItemLabel:y["a"]})}}]);