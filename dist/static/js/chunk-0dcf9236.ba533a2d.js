(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0dcf9236"],{"3aa2":function(t,e,n){"use strict";n("ec19")},ec19:function(t,e,n){},ef92:function(t,e,n){"use strict";n.r(e);var c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app"},[n("div",{staticClass:"code_now",on:{click:t.get_code}},[t._v(" 当前验证码(点击获取)："+t._s(t.code)+" ")]),n("div",[t._v(" 任务状态（0-任务停止 1-执行中）: "+t._s(t.switc)+" ")]),n("el-button",{attrs:{type:"primary"},on:{click:t.flush_code}},[t._v("刷新验证码")]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.flg=!0}}},[t._v("销假")]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.flg=!1}}},[t._v("今日缺勤")]),n("el-button",{on:{click:function(e){return t.switchknowing()}}},[t._v("切换任务状态")]),n("a",{attrs:{href:t.excel_url}},[n("el-button",[t._v("导出Excel")])],1),n("el-button",{on:{click:function(e){return t.flush()}}},[t._v(" 重置任务")]),n("div",{staticClass:"user_list"},t._l(t.tableData,(function(e){return n("el-popover",{key:e.id,attrs:{trigger:"hover",placement:"top",width:"160"}},[n("p",[t._v("班级："+t._s(e.classname))]),n("p",[t._v("寝室："+t._s(e.room_name))]),n("p",[t._v("原因："+t._s(e.reason))]),n("p",[t._v("执行人："+t._s(e.worker_name))]),n("p",[t._v("执行时间："+t._s(e.created_time))]),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{width:"120",type:"primary"},on:{click:function(n){return t.pintle(e.index,e)}}},[t._v(" 销假")])],1),n("el-button",{attrs:{slot:"reference",type:e.flg?"":"info"},slot:"reference"},[n("span",[t._v(t._s(e.student_name))]),n("br"),t._v(" "),n("span",[t._v(t._s(e.student))])])],1)})),1)],1)},i=[],s=(n("159b"),n("22ad")),a={data:function(){return{excel_url:"",switc:"",code:"*****",tableData:[],dialogTableVisible:!0,flg:!0,formLabelWidth:"120px"}},created:function(){var t=this;this.get_recordsearch(),this.get_switchknowing(),this.excel_url="http://47.102.215.230:8000/api/life/exportexcel",setInterval((function(){t.get_recordsearch()}),25e3)},methods:{get_code:function(){var t=this;this.$api.life.idcode().then((function(e){t.$data.code=e.data})).catch((function(){}))},flush_code:function(){var t=this;this.$store.dispatch("life/getIdcode").then((function(e){t.$data.code=e.data})).catch((function(){}))},get_recordsearch:function(){var t=this;this.$store.dispatch("life/recordsearch").then((function(e){e.data.forEach((function(t,e){t["flg"]=!0})),t.$data.tableData=e.data})).catch((function(){}))},pintle:function(t,e){var n=this;this.$confirm("此操作将对该同学销假,并且记录您的信息 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.flg=!1,n.$store.dispatch("life/studentleak",{record_id:e.id}).then((function(t){2e3===t.code&&n.$message({message:t.message,type:"success"}),console.log(111,t)}))})).catch((function(){n.$message({type:"info",message:"已取消"})}))},flush:function(){var t=this;this.$confirm("此操作将对当前查寝记录初始化 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){s["e"]().then((function(e){t.$message({message:e.message,type:"success"}),t.get_switchknowing(),t.$store.dispatch("life/getIdcode",{flag:"1"}).then((function(e){t.$data.code=e.data})).catch((function(){}))}))})).catch((function(){t.$message({type:"info",message:"已取消"})}))},get_switchknowing:function(){var t=this;this.$store.dispatch("life/get_switchknowing").then((function(e){t.$data.switc=e.data,console.log(111,e)}))},switchknowing:function(){var t=this;this.$store.dispatch("life/switchknowing").then((function(e){t.$data.switc=e.data,console.log(111,e)}))},exportexcel:function(){var t=this;s["b"]().then((function(e){t.$message({message:e.message,type:"success"})}))}}},o=a,r=(n("3aa2"),n("2877")),l=Object(r["a"])(o,c,i,!1,null,"134a5cf0",null);e["default"]=l.exports}}]);