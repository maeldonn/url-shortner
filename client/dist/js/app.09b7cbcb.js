(function(e){function t(t){for(var n,s,i=t[0],l=t[1],u=t[2],f=0,d=[];f<i.length;f++)s=i[f],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&d.push(a[s][0]),a[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);c&&c(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,i=1;i<r.length;i++){var l=r[i];0!==a[l]&&(n=!1)}n&&(o.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},a={app:0},o=[];function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var c=l;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";var n=r("85ec"),a=r.n(n);a.a},2642:function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=r("4eb5"),o=r.n(a),s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("router-view")],1)},i=[],l=(r("034f"),r("2877")),u={},c=Object(l["a"])(u,s,i,!1,null,null,null),f=c.exports,d=r("8c4f"),p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[e._m(0),e.created?e._e():r("section",{staticClass:"form"},[r("form",{on:{submit:function(t){return t.preventDefault(),e.createShortUrl(t)}}},[e.errorMessage?r("div",{staticClass:"error"},[e._v(e._s(e.errorMessage))]):e._e(),r("input",{directives:[{name:"model",rawName:"v-model",value:e.url,expression:"url"}],attrs:{type:"url",id:"url",placeholder:"enter a url"},domProps:{value:e.url},on:{input:function(t){t.target.composing||(e.url=t.target.value)}}}),r("input",{directives:[{name:"model",rawName:"v-model",value:e.slug,expression:"slug"}],attrs:{id:"slug",maxlength:"5",placeholder:"enter a slug (optional)"},domProps:{value:e.slug},on:{input:function(t){t.target.composing||(e.slug=t.target.value)}}}),r("button",[e._v("KILL URL")])])]),e.created?r("section",{staticClass:"created"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.link,expression:"link"}],domProps:{value:e.link},on:{input:function(t){t.target.composing||(e.link=t.target.value)}}}),r("button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.link,expression:"link",arg:"copy"}]},[e._v("COPY")]),r("button",{on:{click:e.reset}},[e._v("GO BACK")])]):e._e(),e._m(1)])},m=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",[n("img",{staticClass:"logo",attrs:{src:r("cf05")}})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("footer",[r("p",[e._v(" Made with ❤️ by "),r("a",{attrs:{href:"https://maeldonn.github.io/",target:"_blank"}},[e._v("maeldonn")])])])}],v=(r("caad"),r("2532"),r("498a"),r("9911"),r("bc3a")),g=r("d370"),h=g.object({url:g.string().trim().pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/).required(),slug:g.string().trim().pattern(/^[\w\-]+$/i).max(5)}),b={name:"Home",data:function(){return{url:"",slug:"",link:null,created:!1,errorMessage:"",isLoading:!1}},watch:{url:{handler:function(){this.errorMessage=""}},slug:{handler:function(){this.errorMessage=""}}},methods:{createShortUrl:function(){var e=this;this.validateData()&&v.post("/",{url:this.url,slug:this.slug||void 0},{headers:{"content-type":"application/json"}}).then((function(t){e.link=t.data.link,e.created=!0})).catch((function(t){t.message.includes("409")?e.errorMessage="Slug is already in use":t.message.includes("429")?e.errorMessage="You are sending too many requests. Try again in 60 seconds.":e.errorMessage="Impossible to create a short url. Please retry later."}))},validateData:function(){var e=h.validate({url:this.url,slug:this.slug||void 0});return!e.error||(e.error.message.includes("url")?this.errorMessage="URL is not valid":this.errorMessage="Slug is not valid",!1)},reset:function(){this.url="",this.slug="",this.link=null,this.created=!1}}},_=b,w=(r("e4db"),Object(l["a"])(_,p,m,!1,null,"fb39b754",null)),y=w.exports,k=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"not-found"},[e._m(0),r("section",[e._m(1),r("router-link",{staticClass:"btn btn-primary btn-lg",attrs:{to:{name:"Home"},role:"button"}},[r("button",[e._v("GO BACK")])])],1),e._m(2)])},O=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",[n("img",{staticClass:"logo",attrs:{src:r("cf05")}})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("h1",[e._v("4"),r("span",[e._v("0")]),e._v("4")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("footer",[r("p",[e._v(" Made with ❤️ by "),r("a",{attrs:{href:"https://maeldonn.github.io/",target:"_blank"}},[e._v("maeldonn")])])])}],x=(r("cd0f"),{}),M=Object(l["a"])(x,k,O,!1,null,"f8aed610",null),j=M.exports;n["a"].use(d["a"]);var P=[{path:"/",name:"Home",component:y,meta:{title:"URLkiller"}},{path:"/*",name:"404",component:j,meta:{title:"URLkiller - 404"}}],$=new d["a"]({mode:"history",base:"/",routes:P});$.beforeEach((function(e,t,r){document.title=e.meta.title,r()}));var C=$;n["a"].config.productionTip=!1,n["a"].use(o.a),new n["a"]({router:C,render:function(e){return e(f)}}).$mount("#app")},"85ec":function(e,t,r){},cd0f:function(e,t,r){"use strict";var n=r("f046"),a=r.n(n);a.a},cf05:function(e,t,r){e.exports=r.p+"img/logo.0329e402.png"},e4db:function(e,t,r){"use strict";var n=r("2642"),a=r.n(n);a.a},f046:function(e,t,r){}});
//# sourceMappingURL=app.09b7cbcb.js.map