(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e01ea8a4"],{"02fc":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"root"},[e("img",{attrs:{src:t.icon}}),e("h1",[t._v(t._s(t.userName))]),e("p",{staticClass:"auth"},[t._v("Just a normal user, not admin")]),e("h3",[t._v("Other users...")]),t._m(0)])},r=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("p",[e("span",{staticStyle:{"font-weight":"bold"}},[t._v("Mielikki")]),t._v(": "),e("span",{staticClass:"auth"},[t._v("Administrator")])])}],i=e("2b0e"),u=e("f9aa"),c=i["a"].extend({data:function(){return{title:"User Info"}},created:function(){i["a"].prototype.$f_userName="MyName"},computed:{userName:function(){return u["a"].user},icon:function(){return e("75e2")}}}),s=c,o=(e("a16d"),e("2877")),l=Object(o["a"])(s,a,r,!1,null,"4c9c1010",null);n["default"]=l.exports},"466d":function(t,n,e){"use strict";var a=e("d784"),r=e("825a"),i=e("50c4"),u=e("1d80"),c=e("8aa5"),s=e("14c3");a("match",1,(function(t,n,e){return[function(n){var e=u(this),a=void 0==n?void 0:n[t];return void 0!==a?a.call(n,e):new RegExp(n)[t](String(e))},function(t){var a=e(n,t,this);if(a.done)return a.value;var u=r(t),o=String(this);if(!u.global)return s(u,o);var l=u.unicode;u.lastIndex=0;var f,v=[],d=0;while(null!==(f=s(u,o))){var m=String(f[0]);v[d]=m,""===m&&(u.lastIndex=c(o,i(u.lastIndex),l)),d++}return 0===d?null:v}]}))},"75e2":function(t,n,e){t.exports=e.p+"img/icon.b37a2c09.svg"},"85cc":function(t,n,e){},a16d:function(t,n,e){"use strict";var a=e("85cc"),r=e.n(a);r.a},f9aa:function(t,n,e){"use strict";e("baa5"),e("ac1f"),e("466d");var a="system32",r="RooT",i=navigator.userAgent,u=c(i);function c(t){var n;function e(n){var e=t.match(n);return e?e[0]:null}return{arc:e(/x[0-9]+/),cpu:navigator.platform+"/"+t.substring(t.lastIndexOf(" ")+1),memory:(null!==(n=navigator.deviceMemory)&&void 0!==n?n:12)+"GB"}}n["a"]={computer:a,user:r,get computerInfo(){return u}}}}]);
//# sourceMappingURL=chunk-e01ea8a4.8a9cb186.js.map