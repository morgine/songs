(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[14],{"862d0":function(a,e,t){"use strict";t.r(e);var i=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("q-page",{attrs:{padding:""}},[t("q-table",{attrs:{title:"公众号列表",data:a.data,columns:a.columns,"row-key":"Appid",pagination:a.pagination,loading:a.loading,selection:"multiple",selected:a.selected,"binary-state-sort":""},on:{"update:pagination":function(e){a.pagination=e},request:a.onRequest,"update:selected":function(e){a.selected=e}},scopedSlots:a._u([{key:"top-right",fn:function(){return[t("q-btn",{attrs:{flat:"",disable:0===a.selected.length},on:{click:a.delApps}},[a._v("删除公众号")]),t("q-btn",{attrs:{flat:""},on:{click:a.resetApp}},[a._v("拉取公众号")]),t("q-btn",{attrs:{flat:""},on:{click:a.addApp}},[a._v("添加公众号")])]},proxy:!0},{key:"body-cell-HeadImg",fn:function(a){return[t("q-td",{attrs:{props:a}},[t("q-img",{attrs:{src:a.value,height:"40px",width:"40px"}})],1)]}},{key:"body-cell-QrcodeUrl",fn:function(e){return[t("q-td",{attrs:{props:e}},[t("a",{attrs:{href:a.$axios.defaults.baseURL+"/proxy?img="+e.value,target:"_blank"}},[a._v("二维码")])])]}}])})],1)},n=[],s=(t("a434"),t("ddb0"),{data(){return{loading:!1,pagination:{sortBy:"id",descending:!0,page:1,rowsPerPage:15,rowsNumber:10},columns:[{name:"ID",align:"right",label:"ID",field:"ID",sortable:!0},{name:"Appid",align:"right",label:"Appid",field:"Appid"},{name:"NickName",align:"right",label:"NickName",field:"NickName"},{name:"HeadImg",align:"right",label:"HeadImg",field:"HeadImg"},{name:"UserName",align:"right",label:"UserName",field:"UserName"},{name:"PrincipalName",align:"right",label:"PrincipalName",field:"PrincipalName"},{name:"Alias",align:"right",label:"Alias",field:"Alias"},{name:"QrcodeUrl",align:"right",label:"QrcodeUrl",field:"QrcodeUrl"},{name:"Signature",align:"right",label:"Signature",field:"Signature"}],data:[],original:[],selected:[]}},mounted(){this.count()},methods:{count(){this.loading=!0,this.$axios.get("/count-apps").then((a=>{a=a.data,a&&a.Data&&(this.pagination.rowsNumber=a.Data,this.onRequest({pagination:this.pagination})),this.loading=!1}))},onRequest(a){const{page:e,rowsPerPage:t,sortBy:i,descending:n}=a.pagination;this.loading=!0;const s=(e-1)*t,l={Limit:t,Offset:s};i&&(l.Column=i,l.Desc=n),this.$axios.get("/apps",{params:l}).then((a=>{a=a.data,a&&a.Data&&(this.data.splice(0,this.data.length,...a.Data),this.pagination.page=e,this.pagination.rowsPerPage=t,this.pagination.sortBy=i,this.pagination.descending=n,this.loading=!1)}))},addApp(){this.$axios.get("/app-authorizer-url").then((a=>{a=a.data,a&&a.Data&&window.open(a.Data,"_blank")}))},delApps(){const a=[];for(const e of this.selected)a.push(e.ID);this.loading=!0,this.$axios.delete("/apps",{params:{IDs:a}}).then((a=>{a=a.data,a&&a.Message&&(this.$q.notify(a.Message),this.loading=!1,this.count())}))},resetApp(){this.$q.dialog({title:"⚠️ 警告",message:"拉取当前开放平台下的所有授权公众号?",cancel:!0,persistent:!0}).onOk((()=>{this.loading=!0,this.$axios.get("/reset-apps").then((a=>{a=a.data,a.Message&&this.$q.notify(a.Message),this.loading=!1,this.count()}))})).onOk((()=>{})).onCancel((()=>{})).onDismiss((()=>{}))}}}),l=s,o=t("2877"),d=t("9989"),r=t("eaac"),g=t("9c40"),p=t("db86"),c=t("068f"),h=t("eebe"),u=t.n(h),m=Object(o["a"])(l,i,n,!1,null,"2c9bb411",null);e["default"]=m.exports;u()(m,"components",{QPage:d["a"],QTable:r["a"],QBtn:g["a"],QTd:p["a"],QImg:c["a"]})}}]);