(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-276b64d8"],{1699:function(t,e,s){},2203:function(t,e,s){"use strict";s("1699")},"513c":function(t,e,s){"use strict";var i=s("1e2c"),a=s("d890"),n=s("e8d6"),o=s("1944"),r=s("faa8"),c=s("2118"),l=s("7063"),u=s("9f67"),_=s("efe2"),d=s("6d60"),h=s("b338").f,f=s("aa6b").f,v=s("d910").f,p=s("c10f").trim,b="Number",m=a[b],w=m.prototype,g=c(d(w))==b,x=function(t){var e,s,i,a,n,o,r,c,l=u(t,!1);if("string"==typeof l&&l.length>2)if(l=p(l),e=l.charCodeAt(0),43===e||45===e){if(s=l.charCodeAt(2),88===s||120===s)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:i=2,a=49;break;case 79:case 111:i=8,a=55;break;default:return+l}for(n=l.slice(2),o=n.length,r=0;r<o;r++)if(c=n.charCodeAt(r),c<48||c>a)return NaN;return parseInt(n,i)}return+l};if(n(b,!m(" 0o1")||!m("0b1")||m("+0x1"))){for(var k,$=function(t){var e=arguments.length<1?0:t,s=this;return s instanceof $&&(g?_((function(){w.valueOf.call(s)})):c(s)!=b)?l(new m(x(e)),s,$):x(e)},y=i?h(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;y.length>N;N++)r(m,k=y[N])&&!r($,k)&&v($,k,f(m,k));$.prototype=w,w.constructor=$,o(a,b,$)}},b637:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("TaskFrame",{ref:"frame",attrs:{type:0,excel_url:t.excel_url,save_roster_store:"scheduling_update_knowing",flush_task_store:"task_rest_knowing"},scopedSlots:t._u([{key:"scheduling",fn:function(e){return t._l(e.roster,(function(i,a){return s("div",{directives:[{name:"show",rawName:"v-show",value:e.actives[e.active_index].is_open,expression:"data.actives[data.active_index].is_open"}],key:a,staticClass:"roster_box"},[s("h3",[t._v(t._s(i.title))]),t._l(i.layer_list,(function(e,i){return s("div",{key:i,staticClass:"layer"},[s("h4",[t._v(t._s(e.title))]),t._l(e.user,(function(i,a){return s("div",{key:a,staticClass:"layer"},[t._v(" "+t._s(i.username)+" "+t._s(i.name)+" "+t._s(i.tel)+" "),s("el-button",{directives:[{name:"show",rawName:"v-show",value:t.is_show_button,expression:"is_show_button"}],attrs:{size:"mini",icon:"el-icon-close"},on:{click:function(s){return t.remove_user(e,a)}}})],1)})),s("div",{directives:[{name:"show",rawName:"v-show",value:t.is_show_button,expression:"is_show_button"}],staticClass:"search_box"},[s("el-row",{attrs:{gutter:10}},[s("el-col",{attrs:{xs:24,md:8}},[s("el-input",{attrs:{size:"small",placeholder:"学号"},model:{value:e.user_object.username,callback:function(s){t.$set(e.user_object,"username",s)},expression:"layer.user_object.username"}})],1),s("el-col",{attrs:{xs:24,md:8}},[s("el-input",{attrs:{size:"small",placeholder:"姓名"},model:{value:e.user_object.name,callback:function(s){t.$set(e.user_object,"name",s)},expression:"layer.user_object.name"}})],1),s("el-col",{attrs:{xs:24,md:8}},[s("el-input",{attrs:{size:"small",placeholder:"电话"},model:{value:e.user_object.tel,callback:function(s){t.$set(e.user_object,"tel",s)},expression:"layer.user_object.tel"}})],1)],1)],1),s("el-button",{directives:[{name:"show",rawName:"v-show",value:t.is_show_button,expression:"is_show_button"}],attrs:{size:"small",icon:"el-icon-search"},on:{click:function(s){return t.search_user(e)}}},[t._v("搜索")]),s("el-button",{directives:[{name:"show",rawName:"v-show",value:t.is_show_button,expression:"is_show_button"}],attrs:{size:"small",icon:"el-icon-circle-plus-outline"},on:{click:function(s){return t.add_user(e)}}},[t._v("添加")])],2)}))],2)}))}},{key:"scheduling_button",fn:function(){return[s("el-button",{on:{click:function(e){return t.simple_information()}}},[t._v("查看/修改")])]},proxy:!0}])})],1)},a=[],n=(s("e35a"),s("0d7a"),s("08ba"),s("ea69"),s("ee01")),o={components:{TaskFrame:n["a"]},data:function(){return{input_user_object:{},user_list_str:"",excel_url:"",is_show_button:!0}},methods:{simple_information:function(){this.$data.is_show_button=!this.$data.is_show_button},add_user:function(t){t.user.push(JSON.parse(JSON.stringify(t.user_object))),t.user_object={username:"",name:"",grade:"",tel:""}},add_user_list_str:function(){var t=this,e=this.$data.user_list_str;if(!(e.length<1)){var s=e.split("\n");s.forEach((function(e){t.$store.dispatch("school_information/student_information",{username:e}).then((function(e){t.$refs.frame.roster.push(e.data)}))})),console.log(s)}},remove_user:function(t,e){t.user.splice(e,1)},search_user:function(t){this.$store.dispatch("school_information/student_information",{username:t.user_object.username}).then((function(e){t.user_object=e.data})),clearTimeout(this.timeout),this.timeout=setTimeout((function(){}),2e3*Math.random())}}},r=o,c=s("cba8"),l=Object(c["a"])(r,i,a,!1,null,null,null);e["default"]=l.exports},ea69:function(t,e,s){"use strict";var i=s("1c8b"),a=s("e1d6"),n=s("3da3"),o=s("d88d"),r=s("3553"),c=s("1ca1"),l=s("1bbd"),u=s("1ea7"),_=s("ff9c"),d=u("splice"),h=_("splice",{ACCESSORS:!0,0:0,1:2}),f=Math.max,v=Math.min,p=9007199254740991,b="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!d||!h},{splice:function(t,e){var s,i,u,_,d,h,m=r(this),w=o(m.length),g=a(t,w),x=arguments.length;if(0===x?s=i=0:1===x?(s=0,i=w-g):(s=x-2,i=v(f(n(e),0),w-g)),w+s-i>p)throw TypeError(b);for(u=c(m,i),_=0;_<i;_++)d=g+_,d in m&&l(u,_,m[d]);if(u.length=i,s<i){for(_=g;_<w-i;_++)d=_+i,h=_+s,d in m?m[h]=m[d]:delete m[h];for(_=w;_>w-i+s;_--)delete m[_-1]}else if(s>i)for(_=w-i;_>g;_--)d=_+i-1,h=_+s-1,d in m?m[h]=m[d]:delete m[h];for(_=0;_<s;_++)m[_+g]=arguments[_+2];return m.length=w-i+s,u}})},ee01:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-row",{attrs:{gutter:10}},[s("el-col",[s("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",[t._v(" "+t._s(t.actives[t.active_index].name)+" ")]),s("div",{staticStyle:{display:"inline"},on:{click:function(e){return t.task_switch_put()}}},[s("el-switch",{staticStyle:{float:"right",padding:"3px 0"},attrs:{disabled:t.is_switch,"active-text":"开启","inactive-text":"关闭"},model:{value:t.actives[t.active_index].is_open,callback:function(e){t.$set(t.actives[t.active_index],"is_open",e)},expression:"actives[active_index].is_open"}})],1)]),s("div",{directives:[{name:"show",rawName:"v-show",value:t.actives[t.active_index].is_open,expression:"actives[active_index].is_open"}],staticClass:"text item"},[s("el-button",{on:{click:function(e){t.dialogVisible_roster_box=!0}}},[t._v("排班 ")]),s("el-button",{on:{click:function(e){return t.flush()}}},[t._v(" 重置任务")]),t.excel_url?s("a",{attrs:{href:t.excel_url}},[s("el-button",[t._v("导出Excel")])],1):t._e(),s("el-button",{attrs:{loading:t.search_loading},on:{click:function(e){return t.get_condition()}}},[t._v("刷新记录")])],1)])],1)],1),s("br"),s("el-dialog",{staticClass:"dialog_roster",attrs:{title:"排班",visible:t.dialogVisible_roster_box,width:"90%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible_roster_box=e}}},[t._t("scheduling",null,{roster:t.roster,active_index:t.active_index,actives:t.actives}),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.dialogVisible_roster_box=!1}}},[t._v("取 消")]),t._t("scheduling_button"),s("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.save_roster()}}},[t._v("保存")])],2)],2),s("br"),s("el-row",[s("el-col",{attrs:{sm:24}},[s("el-card",{directives:[{name:"show",rawName:"v-show",value:t.actives[t.active_index].is_open,expression:"actives[active_index].is_open"}],attrs:{shadow:"hover"}},[s("div",{attrs:{slot:"header"},slot:"header"},[s("span",[t._v("检查记录")])]),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[s("el-table-column",{attrs:{prop:"student_approved_number",label:"学号",width:"180"}}),s("el-table-column",{attrs:{prop:"student_approved",label:"姓名",width:"180"}}),s("el-table-column",{attrs:{prop:"rule_str",label:"原因"}}),s("el-table-column",{attrs:{prop:"worker",label:"执行人"}}),s("el-table-column",{attrs:{prop:"room_str",label:"寝室"}}),s("el-table-column",{attrs:{prop:"star_time",label:"执行时间"}}),s("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{width:"120",type:e.row.flg?"warning":"info"},on:{click:function(s){return t.pintle(1,e.row)}}},[t._v(" 销假")])]}}])})],1)],1)],1)],1)],1)},a=[],n=(s("513c"),s("08ba"),s("5f87")),o={props:{type:Number,flush_task_store:String,save_roster_store:String},data:function(){return{is_switch:!1,switc:"",actives:[{id:"",name:"加载中",is_open:!1,is_builder:!1}],active_index:0,tableData:[],flg:!0,formLabelWidth:"120px",username:"",roster:[],dialogVisible_roster_box:!1,timer:null,excel_url:"",search_loading:!1}},created:function(){var t=this;this.get_activa(),this.get_condition(),this.timer=setInterval((function(){!0===t.$data.actives[t.$data.active_index].is_open&&t.get_condition()}),2e4)},beforeDestroy:function(){clearInterval(this.timer),this.timer=null},methods:{get_activa:function(){var t=this;this.$store.dispatch("school_attendance/task_obtain",{type:this.$props.type}).then((function(e){var s=e.data;t.actives=s,t.get_scheduling();var i="?task_id="+s[0].id+"&token="+Object(n["a"])();t.excel_url=t.$api.school_attendance.out_knowing_excel_data+i})).catch((function(){}))},task_switch_put:function(){var t=this,e=this.$data.actives[this.active_index].id;this.is_switch=!0,this.$store.dispatch("school_attendance/task_switch",{task_id:e}).then((function(e){t.$data.switc=e.data,t.is_switch=!1})).catch((function(e){console.log(e),t.is_switch=!1}))},flush:function(){var t=this;this.$confirm("此操作将重置任务操作数据，但不会清空记录的人员名单","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var e=t.actives[t.active_index].id;t.$store.dispatch("school_attendance/"+t.$props.flush_task_store,{task_id:e})})).catch((function(){t.$message({type:"info",message:"已取消"})}))},get_scheduling:function(){var t=this;this.$store.dispatch("school_attendance/scheduling",{task_id:this.actives[this.active_index]["id"]}).then((function(e){t.roster=e.data}))},save_roster:function(){var t=this,e=this.actives[this.active_index].id;this.$store.dispatch("school_attendance/"+this.$props.save_roster_store,{task_id:e,roster:this.roster}).then((function(e){t.$data.dialogVisible_roster_box=!1}))},get_condition:function(){var t=this,e=this;this.$data.actives[this.active_index].id&&(e.search_loading=!0,this.$store.dispatch("school_attendance/condition",{task_id:this.$data.actives[this.active_index].id}).then((function(s){s.data.forEach((function(t,e){t["flg"]=!0})),t.$data.tableData=s.data,e.search_loading=!1})).catch((function(){e.search_loading=!1})))},pintle:function(t,e){var s=this;this.$confirm("此操作将对该同学销假,并且记录您的信息 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){s.$store.dispatch("school_attendance/undo_record",{record_id:e.id,task_id:s.$data.actives[s.active_index].id}).then((function(t){e.flg=!1}))})).catch((function(){s.$message({type:"info",message:"已取消"})}))},handleClose:function(t){t()}}},r=o,c=(s("2203"),s("cba8")),l=Object(c["a"])(r,i,a,!1,null,"0bfd2c9d",null);e["a"]=l.exports}}]);