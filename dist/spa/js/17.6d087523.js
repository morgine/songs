(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[17],{6375:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("q-page",{attrs:{padding:""}},[e("q-form",{staticClass:"row q-gutter-lg items-center"},[e("q-input",{attrs:{filled:"",label:"标签名"},model:{value:t.tag.Name,callback:function(a){t.$set(t.tag,"Name",a)},expression:"tag.Name"}}),e("q-btn",{attrs:{label:"保存",color:"primary"},on:{click:t.saveTag}}),e("q-select",{staticStyle:{"min-width":"120px"},attrs:{options:t.apps,"option-value":"Appid","option-label":"NickName",label:"选择公众号"},model:{value:t.selectApp,callback:function(a){t.selectApp=a},expression:"selectApp"}}),e("q-btn",{attrs:{label:"应用到所有用户",loading:t.loading,color:"primary",disable:!t.selectApp},on:{click:t.setAppTag}})],1)],1)},i=[],p={name:"Tags",data(){return{tag:{Name:""},apps:[],selectApp:null,loading:!1}},created(){this.getTag();const t={Limit:2e3,Offset:0,Column:"id",Desc:!0,Selects:["appid","nick_name"]};this.$axios.get("/apps",{params:t}).then((t=>{t=t.data,t&&t.Data&&(this.apps=t.Data)}))},methods:{getTag(){this.$axios.get("/user-tag").then((t=>{t=t.data,t&&t.Data&&(this.tag=t.Data)}))},saveTag(){this.$axios.put("/user-tag",this.tag).then((t=>{t=t.data,t.Message&&this.$q.notify(t.Message)}))},setAppTag(){this.loading=!0,this.$axios.post("/set-app-user-tag",{Appid:this.selectApp.Appid}).then((t=>{t=t.data,t.Message&&(this.$q.notify(t.Message),this.selectApp=null),this.loading=!1}))}}},l=p,n=e("2877"),o=e("9989"),c=e("0378"),g=e("27f9"),r=e("9c40"),d=e("ddd8"),u=e("eebe"),h=e.n(u),m=Object(n["a"])(l,s,i,!1,null,"7a205e30",null);a["default"]=m.exports;h()(m,"components",{QPage:o["a"],QForm:c["a"],QInput:g["a"],QBtn:r["a"],QSelect:d["a"]})}}]);