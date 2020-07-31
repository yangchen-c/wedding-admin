(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-456f9078"],{"0066":function(t,e,n){"use strict";var a=n("2161"),r=n.n(a);r.a},"0625":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:t.transitionName}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"back-to-ceiling",style:t.customStyle,on:{click:t.backToTop}},[n("svg",{staticClass:"Icon Icon--backToTopArrow",staticStyle:{height:"16px",width:"16px"},attrs:{width:"16",height:"16",viewBox:"0 0 17 17",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"}},[n("title",[t._v("回到顶部")]),t._v(" "),n("g",[n("path",{attrs:{d:"M12.036 15.59c0 .55-.453.995-.997.995H5.032c-.55 0-.997-.445-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29c.39-.39 1.026-.385 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z","fill-rule":"evenodd"}})])])])])},r=[],i=(n("163d"),{name:"BackToTop",props:{visibilityHeight:{type:Number,default:400},backPosition:{type:Number,default:0},customStyle:{type:Object,default:function(){return{right:"50px",bottom:"50px",width:"40px",height:"40px","border-radius":"4px","line-height":"45px",background:"#e7eaf1"}}},transitionName:{type:String,default:"fade"}},data:function(){return{visible:!1,interval:null,isMoving:!1}},mounted:function(){window.addEventListener("scroll",this.handleScroll)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll),this.interval&&clearInterval(this.interval)},methods:{handleScroll:function(){this.visible=window.pageYOffset>this.visibilityHeight},backToTop:function(){var t=this;if(!this.isMoving){var e=window.pageYOffset,n=0;this.isMoving=!0,this.interval=setInterval((function(){var a=Math.floor(t.easeInOutQuad(10*n,e,-e,500));a<=t.backPosition?(window.scrollTo(0,t.backPosition),clearInterval(t.interval),t.isMoving=!1):window.scrollTo(0,a),n++}),16.7)}},easeInOutQuad:function(t,e,n,a){return(t/=a/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e}}}),o=i,u=(n("cd7b"),n("9ca4")),l=Object(u["a"])(o,a,r,!1,null,"6172f71e",null);e["a"]=l.exports},"0f4e":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-button",{staticClass:"filter-item",staticStyle:{"margin-right":"100px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加")]),t._v(" "),n("el-select",{attrs:{clearable:"",placeholder:"请选择商品一级分类"},on:{change:t.changeFirstType},model:{value:t.listQuery.firstType,callback:function(e){t.$set(t.listQuery,"firstType",e)},expression:"listQuery.firstType"}},t._l(t.goodsFirstTypeAll,(function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1),t._v(" "),n("el-select",{attrs:{clearable:"",placeholder:"请选择商品二级分类"},on:{change:t.changeSecondType},model:{value:t.listQuery.secondType,callback:function(e){t.$set(t.listQuery,"secondType",e)},expression:"listQuery.secondType"}},t._l(t.goodsSecondTypeAll,(function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1),t._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"160px"},attrs:{clearable:"",placeholder:"请输入商品名称"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),n("el-select",{attrs:{clearable:"",placeholder:"选择专区"},on:{change:t.changeGoodsType},model:{value:t.listQuery.type,callback:function(e){t.$set(t.listQuery,"type",e)},expression:"listQuery.type"}},[n("el-option",{attrs:{label:"体验品专区",value:0}}),t._v(" "),n("el-option",{attrs:{label:"消费商专区",value:1}}),t._v(" "),n("el-option",{attrs:{label:"平价专区",value:2}})],1),t._v(" "),n("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查找")])],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,"element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"商品ID",prop:"id"}}),t._v(" "),n("el-table-column",{attrs:{align:"center","min-width":"100",label:"排序"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.sort))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center","min-width":"100",label:"名称"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center","min-width":"100",label:"售价"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.price)+"元")])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"商品图片"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return t._l(a.photos,(function(t,e){return n("el-image",{key:e,staticStyle:{width:"40px",height:"40px","margin-right":"5px"},attrs:{src:t,"preview-src-list":a.photos}})}))}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"详情图片"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return t._l(a.infos,(function(t,e){return n("el-image",{key:e,staticStyle:{width:"40px",height:"40px","margin-right":"5px"},attrs:{src:t,"preview-src-list":a.infos}})}))}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"内容"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.content))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"所属分类"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.classification.name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"厂家名称"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.supplierId.name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"当前销量"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.sales))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"商品状态"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("el-tag",{attrs:{type:0==a.state?"success":"danger"}},[t._v(t._s(0==a.state?"在售":"下架"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"是否展示在首页"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.home?"是":"否"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"所属专区"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(t._f("typeFilter")(a.type)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作",width:"300","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(e){return t.showSpecList(a)}}},[t._v("规格")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.handleUpdate(a)}}},[t._v("编辑")]),t._v(" "),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(e){return t.handleDelete(a)}}},[t._v("删除")])]}}])})],1),t._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getAll}}),t._v(" "),n("el-tooltip",{attrs:{placement:"top",content:"返回顶部"}},[n("back-to-top",{attrs:{"visibility-height":100}})],1),t._v(" "),n("el-dialog",{attrs:{visible:t.detailDialogVisible,title:"商品规格"},on:{"update:visible":function(e){t.detailDialogVisible=e}}},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.specListLoading,expression:"specListLoading"}],attrs:{data:t.specList,"element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"ID",prop:"id"}}),t._v(" "),n("el-table-column",{attrs:{align:"center","min-width":"100",label:"名称"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center","min-width":"100",label:"进价"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.purchase)+"元")])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center","min-width":"100",label:"售价"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.price)+"元")])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center","min-width":"100",label:"库存"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.stock)+"件")])]}}])})],1)],1)],1)},r=[],i=(n("9a33"),n("cc57"),n("4ec3")),o=n("0625"),u=n("333d"),l={name:"GoodsList",components:{BackToTop:o["a"],Pagination:u["a"]},filters:{typeFilter:function(t){var e={0:"体验品专区",1:"消费商专区",2:"平价专区"};return e[t]}},data:function(){return{list:[],total:0,listLoading:!0,listQuery:{page:1,limit:20,name:"",firstType:"",secondType:"",type:""},detailDialogVisible:!1,specListLoading:!0,specList:[],selectedTradeId:"",goodsFirstTypeAll:[],goodsSecondTypeAll:[]}},created:function(){this.getAll(),this.getGoodsTypeAll(0,"first")},methods:{getAll:function(){var t=this;this.listLoading=!0;var e={page:this.listQuery.page,size:this.listQuery.limit},n={type:""!==this.listQuery.type?this.listQuery.type:void 0,classificationId:""!==this.listQuery.secondType?this.listQuery.secondType:void 0,name:""!==this.listQuery.name?this.listQuery.name:void 0};Object(i["q"])(e,n).then((function(e){var n=e.data.data.currentList;n=n.map((function(t){return t.photos=t.photo.split(","),t.infos=t.info.split(","),t})),t.list=n,t.total=e.data.data.totalRecords,t.listLoading=!1})).catch((function(){t.list=[],t.total=0,t.listLoading=!1}))},changeSecondType:function(){this.handleFilter()},changeFirstType:function(){this.listQuery.secondType="",this.getGoodsTypeAll(this.listQuery.firstType,"second")},getGoodsTypeAll:function(t,e){var n=this,a={parentId:t};Object(i["v"])(a).then((function(t){"first"===e?n.goodsFirstTypeAll=t.data.data:n.goodsSecondTypeAll=t.data.data})).catch((function(){n.goodsFirstTypeAll=[],n.goodsSecondTypeAll=[]}))},changeGoodsType:function(t){this.listQuery.type=t,this.handleFilter()},handleFilter:function(){this.listQuery.page=1,this.getAll()},handleCreate:function(){this.$router.push({path:"/goods/create"})},handleUpdate:function(t){this.$router.push({path:"/goods/create",query:{id:t.id}})},handleDelete:function(t){var e=this,n={id:t.id};Object(i["o"])(n).then((function(t){e.$notify.success({title:"成功",message:"删除成功"}),e.getAll()})).catch((function(t){e.$notify.error({title:"失败",message:t.data.message})}))},showSpecList:function(t){this.detailDialogVisible=!0,this.selectedTradeId=t.id,this.getSpecList(t.id)},getSpecList:function(t){var e=this,n={id:t};Object(i["p"])(n).then((function(t){e.specList=t.data.data.specifications,e.specListLoading=!1})).catch((function(){e.specList=[],e.specListLoading=!1}))}}},c=l,s=(n("0066"),n("9ca4")),d=Object(s["a"])(c,a,r,!1,null,null,null);e["default"]=d.exports},2161:function(t,e,n){},"281e":function(t,e,n){},"2d13":function(t,e,n){"use strict";var a=n("281e"),r=n.n(a);r.a},"333d":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[n("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},r=[];n("163d");Math.easeInOutQuad=function(t,e,n,a){return t/=a/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function o(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function u(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(t,e,n){var a=u(),r=t-a,l=20,c=0;e="undefined"===typeof e?500:e;var s=function t(){c+=l;var u=Math.easeInOutQuad(c,a,r,e);o(u),c<e?i(t):n&&"function"===typeof n&&n()};s()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&l(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},s=c,d=(n("2d13"),n("9ca4")),p=Object(d["a"])(s,a,r,!1,null,"2fc659d3",null);e["a"]=p.exports},"4ec3":function(t,e,n){"use strict";n.d(e,"V",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o})),n.d(e,"d",(function(){return u})),n.d(e,"b",(function(){return l})),n.d(e,"A",(function(){return c})),n.d(e,"y",(function(){return s})),n.d(e,"B",(function(){return d})),n.d(e,"z",(function(){return p})),n.d(e,"W",(function(){return f})),n.d(e,"P",(function(){return g})),n.d(e,"N",(function(){return m})),n.d(e,"Q",(function(){return h})),n.d(e,"O",(function(){return b})),n.d(e,"L",(function(){return v})),n.d(e,"J",(function(){return y})),n.d(e,"M",(function(){return _})),n.d(e,"K",(function(){return w})),n.d(e,"T",(function(){return O})),n.d(e,"R",(function(){return j})),n.d(e,"U",(function(){return k})),n.d(e,"S",(function(){return S})),n.d(e,"j",(function(){return T})),n.d(e,"l",(function(){return x})),n.d(e,"i",(function(){return Q})),n.d(e,"m",(function(){return L})),n.d(e,"k",(function(){return z})),n.d(e,"I",(function(){return A})),n.d(e,"H",(function(){return P})),n.d(e,"v",(function(){return I})),n.d(e,"u",(function(){return C})),n.d(e,"s",(function(){return $})),n.d(e,"w",(function(){return F})),n.d(e,"t",(function(){return N})),n.d(e,"q",(function(){return B})),n.d(e,"p",(function(){return D})),n.d(e,"n",(function(){return E})),n.d(e,"x",(function(){return M})),n.d(e,"o",(function(){return G})),n.d(e,"r",(function(){return V})),n.d(e,"E",(function(){return q})),n.d(e,"D",(function(){return H})),n.d(e,"C",(function(){return R})),n.d(e,"h",(function(){return J})),n.d(e,"g",(function(){return U})),n.d(e,"f",(function(){return Y})),n.d(e,"e",(function(){return K})),n.d(e,"X",(function(){return W})),n.d(e,"Y",(function(){return X})),n.d(e,"G",(function(){return Z})),n.d(e,"F",(function(){return tt}));var a=n("b775"),r="http://api.yyfsdjk.com/upload";function i(t){return Object(a["a"])({url:"banner",method:"get",params:t})}function o(t){return Object(a["a"])({url:"banner",method:"post",data:t})}function u(t){return Object(a["a"])({url:"banner",method:"put",data:t})}function l(t){return Object(a["a"])({url:"banner",method:"delete",params:t})}function c(t){return Object(a["a"])({url:"notice/getPaging/".concat(t.page,"/").concat(t.limit),method:"get"})}function s(t){return Object(a["a"])({url:"notice",method:"post",data:t})}function d(t){return Object(a["a"])({url:"notice",method:"put",data:t})}function p(t){return Object(a["a"])({url:"notice",method:"delete",params:t})}function f(t){return Object(a["a"])({url:"user",method:"delete",params:t})}function g(t){return Object(a["a"])({url:"class_room/getPaging/".concat(t.page,"/").concat(t.limit),method:"get"})}function m(t){return Object(a["a"])({url:"class_room",method:"post",data:t})}function h(t){return Object(a["a"])({url:"class_room",method:"put",data:t})}function b(t){return Object(a["a"])({url:"class_room",method:"delete",params:t})}function v(t){return Object(a["a"])({url:"store/getPaging/".concat(t.page,"/").concat(t.limit),method:"get"})}function y(t){return Object(a["a"])({url:"store",method:"post",data:t})}function _(t){return Object(a["a"])({url:"store",method:"put",data:t})}function w(t){return Object(a["a"])({url:"store",method:"delete",params:t})}function O(t,e){return Object(a["a"])({url:"community/getPaging/".concat(t.page,"/").concat(t.limit),method:"get",params:e})}function j(t){return Object(a["a"])({url:"community",method:"post",data:t})}function k(t){return Object(a["a"])({url:"community",method:"put",data:t})}function S(t){return Object(a["a"])({url:"community",method:"delete",params:t})}function T(){return Object(a["a"])({url:"supplier",method:"get"})}function x(t){return Object(a["a"])({url:"supplier/getPaging/".concat(t.page,"/").concat(t.limit),method:"get"})}function Q(t){return Object(a["a"])({url:"supplier",method:"post",data:t})}function L(t){return Object(a["a"])({url:"supplier",method:"put",data:t})}function z(t){return Object(a["a"])({url:"supplier",method:"delete",params:t})}function A(t){return Object(a["a"])({url:"order/salesVolumeByGoodsId",method:"get",params:t})}function P(t){return Object(a["a"])({url:"order/salesVolumeBySupplierId",method:"get",params:t})}function I(t){return Object(a["a"])({url:"classification",method:"get",params:t})}function C(t){return Object(a["a"])({url:"classification",method:"get",params:t})}function $(t){return Object(a["a"])({url:"classification",method:"post",data:t})}function F(t){return Object(a["a"])({url:"classification",method:"put",data:t})}function N(t){return Object(a["a"])({url:"classification",method:"delete",params:t})}function B(t,e){return Object(a["a"])({url:"goods/getPaging/".concat(t.page,"/").concat(t.size),method:"get",params:e})}function D(t){return Object(a["a"])({url:"goods/getById",method:"get",params:t})}function E(t){return Object(a["a"])({url:"goods",method:"post",data:t})}function M(t){return Object(a["a"])({url:"goods",method:"put",data:t})}function G(t){return Object(a["a"])({url:"goods",method:"delete",params:t})}function V(t){return Object(a["a"])({url:"specification",method:"delete",params:t})}function q(t,e){return Object(a["a"])({url:"order/getPaging/".concat(t.page,"/").concat(t.size),method:"get",params:e})}function H(t){return Object(a["a"])({url:"order/expressNumber",method:"post",params:t})}function R(t){return Object(a["a"])({url:"order",method:"delete",params:t})}function J(t){return Object(a["a"])({url:"withdrawal/getPaging/".concat(t.page,"/").concat(t.size),method:"get"})}function U(t){return Object(a["a"])({url:"withdrawal",method:"put",data:t})}function Y(t){return Object(a["a"])({url:"bv",method:"post",data:t})}function K(){return Object(a["a"])({url:"bv",method:"get"})}function W(t){return Object(a["a"])({url:"user/getPaging/".concat(t.page,"/").concat(t.size),method:"get"})}function X(t){return Object(a["a"])({url:"user",method:"put",data:t})}function Z(t){return Object(a["a"])({url:"poor/getPaging/".concat(t.page,"/").concat(t.size),method:"get"})}function tt(t){return Object(a["a"])({url:"poor",method:"put",data:t})}},cd7b:function(t,e,n){"use strict";var a=n("f21a"),r=n.n(a);r.a},f21a:function(t,e,n){}}]);