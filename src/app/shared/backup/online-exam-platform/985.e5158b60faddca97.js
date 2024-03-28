"use strict";(self.webpackChunkonlineExamPlatform=self.webpackChunkonlineExamPlatform||[]).push([[985],{4920:(wt,V,b)=>{b.d(V,{z:()=>v});var E=b(755),l=b(3232);let v=(()=>{class w{constructor(y){this.sanitized=y}transform(y){return this.sanitized.bypassSecurityTrustHtml(y)}static#t=this.\u0275fac=function(O){return new(O||w)(E.Y36(l.H7,16))};static#e=this.\u0275pipe=E.Yjl({name:"safeHtml",type:w,pure:!0})}return w})()},2325:(wt,V,b)=>{b.d(V,{u:()=>Ma,d:()=>Ra});var E=b(8239),l=b(755);function O(t,e=new Set){const r=[t],n=new Set;let o=0;for(;r.length>o;){const s=r[o++];if(!n.has(s)&&B(s)&&!e.has(s))if(n.add(s),Symbol.iterator in s)try{for(const i of s)r.push(i)}catch{}else for(const i in s)"defaultValue"!==i&&r.push(s[i])}return n}function B(t){const e=Object.prototype.toString.call(t),r=typeof t;return!("number"===r||"boolean"===r||"string"===r||"symbol"===r||"function"===r||"[object Date]"===e||"[object RegExp]"===e||"[object Module]"===e||null==t||t._watchdogExcluded||t instanceof EventTarget||t instanceof Event)}Symbol("MainQueueId");class ot{constructor(e){if(this.crashes=[],this.state="initializing",this._now=Date.now,this.crashes=[],this._crashNumberLimit="number"==typeof e.crashNumberLimit?e.crashNumberLimit:3,this._minimumNonErrorTimePeriod="number"==typeof e.minimumNonErrorTimePeriod?e.minimumNonErrorTimePeriod:5e3,this._boundErrorHandler=r=>{const n="error"in r?r.error:r.reason;n instanceof Error&&this._handleError(n,r)},this._listeners={},!this._restart)throw new Error("The Watchdog class was split into the abstract `Watchdog` class and the `EditorWatchdog` class. Please, use `EditorWatchdog` if you have used the `Watchdog` class previously.")}destroy(){this._stopErrorHandling(),this._listeners={}}on(e,r){this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(r)}off(e,r){this._listeners[e]=this._listeners[e].filter(n=>n!==r)}_fire(e,...r){const n=this._listeners[e]||[];for(const o of n)o.apply(this,[null,...r])}_startErrorHandling(){window.addEventListener("error",this._boundErrorHandler),window.addEventListener("unhandledrejection",this._boundErrorHandler)}_stopErrorHandling(){window.removeEventListener("error",this._boundErrorHandler),window.removeEventListener("unhandledrejection",this._boundErrorHandler)}_handleError(e,r){if(this._shouldReactToError(e)){this.crashes.push({message:e.message,stack:e.stack,filename:r instanceof ErrorEvent?r.filename:void 0,lineno:r instanceof ErrorEvent?r.lineno:void 0,colno:r instanceof ErrorEvent?r.colno:void 0,date:this._now()});const n=this._shouldRestart();this.state="crashed",this._fire("stateChange"),this._fire("error",{error:e,causesRestart:n}),n?this._restart():(this.state="crashedPermanently",this._fire("stateChange"))}}_shouldReactToError(e){return e.is&&e.is("CKEditorError")&&null!=e.context&&"ready"===this.state&&this._isErrorComingFromThisItem(e)}_shouldRestart(){return this.crashes.length<=this._crashNumberLimit||(this.crashes[this.crashes.length-1].date-this.crashes[this.crashes.length-1-this._crashNumberLimit].date)/this._crashNumberLimit>this._minimumNonErrorTimePeriod}}const S=function Ee(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)},Ot="object"==typeof global&&global&&global.Object===Object&&global;var Oe="object"==typeof self&&self&&self.Object===Object&&self;const T=Ot||Oe||Function("return this")(),st=function(){return T.Date.now()};var xe=/\s/;var Ie=/^\s+/;const Ne=function De(t){return t&&t.slice(0,function je(t){for(var e=t.length;e--&&xe.test(t.charAt(e)););return e}(t)+1).replace(Ie,"")},L=T.Symbol;var St=Object.prototype,Me=St.hasOwnProperty,Be=St.toString,J=L?L.toStringTag:void 0;var Ue=Object.prototype.toString;var At=L?L.toStringTag:void 0;const D=function Ve(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":At&&At in Object(t)?function Re(t){var e=Me.call(t,J),r=t[J];try{t[J]=void 0;var n=!0}catch{}var o=Be.call(t);return n&&(e?t[J]=r:delete t[J]),o}(t):function Ke(t){return Ue.call(t)}(t)},x=function ze(t){return null!=t&&"object"==typeof t};var Qe=/^[-+]0x[0-9a-f]+$/i,qe=/^0b[01]+$/i,Ye=/^0o[0-7]+$/i,Xe=parseInt;const jt=function tr(t){if("number"==typeof t)return t;if(function $e(t){return"symbol"==typeof t||x(t)&&"[object Symbol]"==D(t)}(t))return NaN;if(S(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=S(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=Ne(t);var r=qe.test(t);return r||Ye.test(t)?Xe(t.slice(2),r?2:8):Qe.test(t)?NaN:+t};var rr=Math.max,nr=Math.min;const cr=function ar(t,e,r){var n=!0,o=!0;if("function"!=typeof t)throw new TypeError("Expected a function");return S(r)&&(n="leading"in r?!!r.leading:n,o="trailing"in r?!!r.trailing:o),function or(t,e,r){var n,o,s,i,a,u,c=0,f=!1,p=!1,j=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function k(_){var P=n,q=o;return n=o=void 0,c=_,i=t.apply(q,P)}function C(_){var P=_-u;return void 0===u||P>=e||P<0||p&&_-c>=s}function m(){var _=st();if(C(_))return Te(_);a=setTimeout(m,function nt(_){var Ce=e-(_-u);return p?nr(Ce,s-(_-c)):Ce}(_))}function Te(_){return a=void 0,j&&n?k(_):(n=o=void 0,i)}function Et(){var _=st(),P=C(_);if(n=arguments,o=this,u=_,P){if(void 0===a)return function Ct(_){return c=_,a=setTimeout(m,e),f?k(_):i}(u);if(p)return clearTimeout(a),a=setTimeout(m,e),k(u)}return void 0===a&&(a=setTimeout(m,e)),i}return e=jt(e)||0,S(r)&&(f=!!r.leading,s=(p="maxWait"in r)?rr(jt(r.maxWait)||0,e):s,j="trailing"in r?!!r.trailing:j),Et.cancel=function La(){void 0!==a&&clearTimeout(a),c=0,n=u=o=a=void 0},Et.flush=function Wa(){return void 0===a?i:Te(st())},Et}(t,e,{leading:n,maxWait:e,trailing:o})},Pt=function ur(t,e){return function(r){return t(e(r))}},it=Pt(Object.getPrototypeOf,Object);var It=Function.prototype.toString,fr=Object.prototype.hasOwnProperty,gr=It.call(Object);const Dt=function yr(t){return x(t)&&1===t.nodeType&&!function pr(t){if(!x(t)||"[object Object]"!=D(t))return!1;var e=it(t);if(null===e)return!0;var r=fr.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&It.call(r)==gr}(t)},Nt=function Tr(t,e){return t===e||t!=t&&e!=e},Y=function Cr(t,e){for(var r=t.length;r--;)if(Nt(t[r][0],e))return r;return-1};var wr=Array.prototype.splice;function W(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}W.prototype.clear=function mr(){this.__data__=[],this.size=0},W.prototype.delete=function Or(t){var e=this.__data__,r=Y(e,t);return!(r<0||(r==e.length-1?e.pop():wr.call(e,r,1),--this.size,0))},W.prototype.get=function Ar(t){var e=this.__data__,r=Y(e,t);return r<0?void 0:e[r][1]},W.prototype.has=function jr(t){return Y(this.__data__,t)>-1},W.prototype.set=function Ir(t,e){var r=this.__data__,n=Y(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this};const X=W,Ft=function Vr(t){if(!S(t))return!1;var e=D(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e};var t,zr=T["__core-js_shared__"],Mt=(t=/[^.]+$/.exec(zr&&zr.keys&&zr.keys.IE_PROTO||""))?"Symbol(src)_1."+t:"";var Qr=Function.prototype.toString;const N=function qr(t){if(null!=t){try{return Qr.call(t)}catch{}try{return t+""}catch{}}return""};var Xr=/^\[object .+?Constructor\]$/,on=RegExp("^"+Function.prototype.toString.call(Object.prototype.hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");const an=function sn(t){return!(!S(t)||function Jr(t){return!!Mt&&Mt in t}(t))&&(Ft(t)?on:Xr).test(N(t))},F=function hn(t,e){var r=function cn(t,e){return t?.[e]}(t,e);return an(r)?r:void 0},$=F(T,"Map"),Z=F(Object,"create");var mn=Object.prototype.hasOwnProperty;var En=Object.prototype.hasOwnProperty;function U(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}U.prototype.clear=function _n(){this.__data__=Z?Z(null):{},this.size=0},U.prototype.delete=function gn(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},U.prototype.get=function vn(t){var e=this.__data__;if(Z){var r=e[t];return"__lodash_hash_undefined__"===r?void 0:r}return mn.call(e,t)?e[t]:void 0},U.prototype.has=function wn(t){var e=this.__data__;return Z?void 0!==e[t]:En.call(e,t)},U.prototype.set=function An(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=Z&&void 0===e?"__lodash_hash_undefined__":e,this};const Bt=U,tt=function Nn(t,e){var r=t.__data__;return function In(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}(e)?r["string"==typeof e?"string":"hash"]:r.map};function K(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}K.prototype.clear=function jn(){this.size=0,this.__data__={hash:new Bt,map:new($||X),string:new Bt}},K.prototype.delete=function Fn(t){var e=tt(this,t).delete(t);return this.size-=e?1:0,e},K.prototype.get=function Bn(t){return tt(this,t).get(t)},K.prototype.has=function Ln(t){return tt(this,t).has(t)},K.prototype.set=function Un(t,e){var r=tt(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this};const Gn=K;function G(t){var e=this.__data__=new X(t);this.size=e.size}G.prototype.clear=function Nr(){this.__data__=new X,this.size=0},G.prototype.delete=function Mr(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r},G.prototype.get=function Rr(t){return this.__data__.get(t)},G.prototype.has=function Wr(t){return this.__data__.has(t)},G.prototype.set=function kn(t,e){var r=this.__data__;if(r instanceof X){var n=r.__data__;if(!$||n.length<199)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new Gn(n)}return r.set(t,e),this.size=r.size,this};const zn=G;var Zn=function(){try{var t=F(Object,"defineProperty");return t({},"",{}),t}catch{}}();const Rt=Zn,Lt=function Qn(t,e,r){"__proto__"==e&&Rt?Rt(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r};var Yn=Object.prototype.hasOwnProperty;const Wt=function Xn(t,e,r){var n=t[e];(!Yn.call(t,e)||!Nt(n,r)||void 0===r&&!(e in t))&&Lt(t,e,r)},et=function to(t,e,r,n){var o=!r;r||(r={});for(var s=-1,i=e.length;++s<i;){var a=e[s],u=n?n(r[a],t[a],a,r,t):void 0;void 0===u&&(u=t[a]),o?Lt(r,a,u):Wt(r,a,u)}return r},Ut=function oo(t){return x(t)&&"[object Arguments]"==D(t)};var Kt=Object.prototype,so=Kt.hasOwnProperty,io=Kt.propertyIsEnumerable,ao=Ut(function(){return arguments}())?Ut:function(t){return x(t)&&so.call(t,"callee")&&!io.call(t,"callee")};const co=ao,ct=Array.isArray;var Gt="object"==typeof exports&&exports&&!exports.nodeType&&exports,Ht=Gt&&"object"==typeof module&&module&&!module.nodeType&&module,kt=Ht&&Ht.exports===Gt?T.Buffer:void 0;const Vt=(kt?kt.isBuffer:void 0)||function ho(){return!1};var bo=/^(?:0|[1-9]\d*)$/;const mo=function yo(t,e){var r=typeof t;return!!(e=e??9007199254740991)&&("number"==r||"symbol"!=r&&bo.test(t))&&t>-1&&t%1==0&&t<e},zt=function To(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991};var d={};d["[object Float32Array]"]=d["[object Float64Array]"]=d["[object Int8Array]"]=d["[object Int16Array]"]=d["[object Int32Array]"]=d["[object Uint8Array]"]=d["[object Uint8ClampedArray]"]=d["[object Uint16Array]"]=d["[object Uint32Array]"]=!0,d["[object Arguments]"]=d["[object Array]"]=d["[object ArrayBuffer]"]=d["[object Boolean]"]=d["[object DataView]"]=d["[object Date]"]=d["[object Error]"]=d["[object Function]"]=d["[object Map]"]=d["[object Number]"]=d["[object Object]"]=d["[object RegExp]"]=d["[object Set]"]=d["[object String]"]=d["[object WeakMap]"]=!1;const ut=function $o(t){return function(e){return t(e)}};var Jt="object"==typeof exports&&exports&&!exports.nodeType&&exports,Q=Jt&&"object"==typeof module&&module&&!module.nodeType&&module,ht=Q&&Q.exports===Jt&&Ot.process;const H=function(){try{return Q&&Q.require&&Q.require("util").types||ht&&ht.binding&&ht.binding("util")}catch{}}();var $t=H&&H.isTypedArray;const Yo=$t?ut($t):function zo(t){return x(t)&&zt(t.length)&&!!d[D(t)]};var ts=Object.prototype.hasOwnProperty;const Zt=function es(t,e){var r=ct(t),n=!r&&co(t),o=!r&&!n&&Vt(t),s=!r&&!n&&!o&&Yo(t),i=r||n||o||s,a=i?function eo(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],u=a.length;for(var c in t)(e||ts.call(t,c))&&(!i||!("length"==c||o&&("offset"==c||"parent"==c)||s&&("buffer"==c||"byteLength"==c||"byteOffset"==c)||mo(c,u)))&&a.push(c);return a};var rs=Object.prototype;const dt=function ns(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||rs)},ss=Pt(Object.keys,Object);var as=Object.prototype.hasOwnProperty;const Qt=function hs(t){return null!=t&&zt(t.length)&&!Ft(t)},lt=function ds(t){return Qt(t)?Zt(t):function cs(t){if(!dt(t))return ss(t);var e=[];for(var r in Object(t))as.call(t,r)&&"constructor"!=r&&e.push(r);return e}(t)};var bs=Object.prototype.hasOwnProperty;const ms=function ys(t){if(!S(t))return function fs(t){var e=[];if(null!=t)for(var r in Object(t))e.push(r);return e}(t);var e=dt(t),r=[];for(var n in t)"constructor"==n&&(e||!bs.call(t,n))||r.push(n);return r},_t=function vs(t){return Qt(t)?Zt(t,!0):ms(t)};var qt="object"==typeof exports&&exports&&!exports.nodeType&&exports,Yt=qt&&"object"==typeof module&&module&&!module.nodeType&&module,Xt=Yt&&Yt.exports===qt?T.Buffer:void 0,te=Xt?Xt.allocUnsafe:void 0;const ee=function Ps(){return[]};var Ds=Object.prototype.propertyIsEnumerable,re=Object.getOwnPropertySymbols,Ns=re?function(t){return null==t?[]:(t=Object(t),function xs(t,e){for(var r=-1,n=null==t?0:t.length,o=0,s=[];++r<n;){var i=t[r];e(i,r,t)&&(s[o++]=i)}return s}(re(t),function(e){return Ds.call(t,e)}))}:ee;const ft=Ns,ne=function Bs(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t};var Ls=Object.getOwnPropertySymbols?function(t){for(var e=[];t;)ne(e,ft(t)),t=it(t);return e}:ee;const oe=Ls,se=function Ks(t,e,r){var n=e(t);return ct(t)?n:ne(n,r(t))},Hs=function Gs(t){return se(t,lt,ft)},Vs=function ks(t){return se(t,_t,oe)},gt=F(T,"DataView"),pt=F(T,"Promise"),bt=F(T,"Set"),yt=F(T,"WeakMap");var ie="[object Map]",ae="[object Promise]",ce="[object Set]",ue="[object WeakMap]",he="[object DataView]",qs=N(gt),Ys=N($),Xs=N(pt),ti=N(bt),ei=N(yt),M=D;(gt&&M(new gt(new ArrayBuffer(1)))!=he||$&&M(new $)!=ie||pt&&M(pt.resolve())!=ae||bt&&M(new bt)!=ce||yt&&M(new yt)!=ue)&&(M=function(t){var e=D(t),r="[object Object]"==e?t.constructor:void 0,n=r?N(r):"";if(n)switch(n){case qs:return he;case Ys:return ie;case Xs:return ae;case ti:return ce;case ei:return ue}return e});const mt=M;var ni=Object.prototype.hasOwnProperty;const de=T.Uint8Array,vt=function ai(t){var e=new t.constructor(t.byteLength);return new de(e).set(new de(t)),e};var hi=/\w*$/;var le=L?L.prototype:void 0,_e=le?le.valueOf:void 0;const Ri=function Bi(t,e,r){var n=t.constructor;switch(e){case"[object ArrayBuffer]":return vt(t);case"[object Boolean]":case"[object Date]":return new n(+t);case"[object DataView]":return function ci(t,e){var r=e?vt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}(t,r);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return function gi(t,e){var r=e?vt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}(t,r);case"[object Map]":case"[object Set]":return new n;case"[object Number]":case"[object String]":return new n(t);case"[object RegExp]":return function di(t){var e=new t.constructor(t.source,hi.exec(t));return e.lastIndex=t.lastIndex,e}(t);case"[object Symbol]":return function _i(t){return _e?Object(_e.call(t)):{}}(t)}};var fe=Object.create,Li=function(){function t(){}return function(e){if(!S(e))return{};if(fe)return fe(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();const Wi=Li;var ge=H&&H.isMap;const zi=ge?ut(ge):function Hi(t){return x(t)&&"[object Map]"==mt(t)};var pe=H&&H.isSet;const qi=pe?ut(pe):function $i(t){return x(t)&&"[object Set]"==mt(t)};var be="[object Arguments]",ye="[object Function]",me="[object Object]",h={};h[be]=h["[object Array]"]=h["[object ArrayBuffer]"]=h["[object DataView]"]=h["[object Boolean]"]=h["[object Date]"]=h["[object Float32Array]"]=h["[object Float64Array]"]=h["[object Int8Array]"]=h["[object Int16Array]"]=h["[object Int32Array]"]=h["[object Map]"]=h["[object Number]"]=h[me]=h["[object RegExp]"]=h["[object Set]"]=h["[object String]"]=h["[object Symbol]"]=h["[object Uint8Array]"]=h["[object Uint8ClampedArray]"]=h["[object Uint16Array]"]=h["[object Uint32Array]"]=!0,h["[object Error]"]=h[ye]=h["[object WeakMap]"]=!1;const wa=function rt(t,e,r,n,o,s){var i,a=1&e,u=2&e,c=4&e;if(r&&(i=o?r(t,n,o,s):r(t)),void 0!==i)return i;if(!S(t))return t;var f=ct(t);if(f){if(i=function oi(t){var e=t.length,r=new t.constructor(e);return e&&"string"==typeof t[0]&&ni.call(t,"index")&&(r.index=t.index,r.input=t.input),r}(t),!a)return function Ss(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}(t,i)}else{var p=mt(t),j=p==ye||"[object GeneratorFunction]"==p;if(Vt(t))return function ws(t,e){if(e)return t.slice();var r=t.length,n=te?te(r):new t.constructor(r);return t.copy(n),n}(t,a);if(p==me||p==be||j&&!o){if(i=u||j?{}:function Ui(t){return"function"!=typeof t.constructor||dt(t)?{}:Wi(it(t))}(t),!a)return u?function Ws(t,e){return et(t,oe(t),e)}(t,function Ts(t,e){return t&&et(e,_t(e),t)}(i,t)):function Fs(t,e){return et(t,ft(t),e)}(t,function ls(t,e){return t&&et(e,lt(e),t)}(i,t))}else{if(!h[p])return o?t:{};i=Ri(t,p,a)}}s||(s=new zn);var k=s.get(t);if(k)return k;s.set(t,i),qi(t)?t.forEach(function(C){i.add(rt(C,e,r,C,t,s))}):zi(t)&&t.forEach(function(C,m){i.set(m,rt(C,e,r,m,t,s))});var nt=f?void 0:(c?u?Vs:Hs:u?_t:lt)(t);return function Jn(t,e){for(var r=-1,n=null==t?0:t.length;++r<n&&!1!==e(t[r],r,t););}(nt||t,function(C,m){nt&&(C=t[m=C]),Wt(i,m,rt(C,e,r,m,t,s))}),i};class ja extends ot{constructor(e,r={}){super(r),this._editor=null,this._initUsingData=!0,this._editables={},this._throttledSave=cr(this._save.bind(this),"number"==typeof r.saveInterval?r.saveInterval:5e3),e&&(this._creator=(n,o)=>e.create(n,o)),this._destructor=n=>n.destroy()}get editor(){return this._editor}get _item(){return this._editor}setCreator(e){this._creator=e}setDestructor(e){this._destructor=e}_restart(){return Promise.resolve().then(()=>(this.state="initializing",this._fire("stateChange"),this._destroy())).catch(e=>{console.error("An error happened during the editor destroying.",e)}).then(()=>{const e={},r=[],n=this._config.rootsAttributes||{},o={};for(const[i,a]of Object.entries(this._data.roots))a.isLoaded?(e[i]="",o[i]=n[i]||{}):r.push(i);const s={...this._config,extraPlugins:this._config.extraPlugins||[],lazyRoots:r,rootsAttributes:o,_watchdogInitialData:this._data};return delete s.initialData,s.extraPlugins.push(Pa),this._initUsingData?this.create(e,s,s.context):Dt(this._elementOrData)?this.create(this._elementOrData,s,s.context):this.create(this._editables,s,s.context)}).then(()=>{this._fire("restart")})}create(e=this._elementOrData,r=this._config,n){return Promise.resolve().then(()=>(super._startErrorHandling(),this._elementOrData=e,this._initUsingData="string"==typeof e||Object.keys(e).length>0&&"string"==typeof Object.values(e)[0],this._config=this._cloneEditorConfiguration(r)||{},this._config.context=n,this._creator(e,this._config))).then(o=>{this._editor=o,o.model.document.on("change:data",this._throttledSave),this._lastDocumentVersion=o.model.document.version,this._data=this._getData(),this._initUsingData||(this._editables=this._getEditables()),this.state="ready",this._fire("stateChange")})}destroy(){return Promise.resolve().then(()=>(this.state="destroyed",this._fire("stateChange"),super.destroy(),this._destroy()))}_destroy(){return Promise.resolve().then(()=>{this._stopErrorHandling(),this._throttledSave.cancel();const e=this._editor;return this._editor=null,e.model.document.off("change:data",this._throttledSave),this._destructor(e)})}_save(){const e=this._editor.model.document.version;try{this._data=this._getData(),this._initUsingData||(this._editables=this._getEditables()),this._lastDocumentVersion=e}catch(r){console.error(r,"An error happened during restoring editor data. Editor will be restored from the previously saved data.")}}_setExcludedProperties(e){this._excludedProps=e}_getData(){const e=this._editor,r=e.model.document.roots.filter(a=>a.isAttached()&&"$graveyard"!=a.rootName),{plugins:n}=e,o=n.has("CommentsRepository")&&n.get("CommentsRepository"),s=n.has("TrackChanges")&&n.get("TrackChanges"),i={roots:{},markers:{},commentThreads:JSON.stringify([]),suggestions:JSON.stringify([])};r.forEach(a=>{i.roots[a.rootName]={content:JSON.stringify(Array.from(a.getChildren())),attributes:JSON.stringify(Array.from(a.getAttributes())),isLoaded:a._isLoaded}});for(const a of e.model.markers)a._affectsData&&(i.markers[a.name]={rangeJSON:a.getRange().toJSON(),usingOperation:a._managedUsingOperations,affectsData:a._affectsData});return o&&(i.commentThreads=JSON.stringify(o.getCommentThreads({toJSON:!0,skipNotAttached:!0}))),s&&(i.suggestions=JSON.stringify(s.getSuggestions({toJSON:!0,skipNotAttached:!0}))),i}_getEditables(){const e={};for(const r of this.editor.model.document.getRootNames()){const n=this.editor.ui.getEditableElement(r);n&&(e[r]=n)}return e}_isErrorComingFromThisItem(e){return function I(t,e,r=new Set){if(t===e&&function A(t){return"object"==typeof t&&null!==t}(t))return!0;const n=O(t,r),o=O(e,r);for(const s of n)if(o.has(s))return!0;return!1}(this._editor,e.context,this._excludedProps)}_cloneEditorConfiguration(e){return function Aa(t,e){return wa(t,5,e="function"==typeof e?e:void 0)}(e,(r,n)=>{if(Dt(r)||"context"===n)return r})}}class Pa{constructor(e){this.editor=e,this._data=e.config.get("_watchdogInitialData")}init(){this.editor.data.on("init",e=>{e.stop(),this.editor.model.enqueueChange({isUndoable:!1},r=>{this._restoreCollaborationData(),this._restoreEditorData(r)}),this.editor.data.fire("ready")},{priority:999})}_createNode(e,r){if("name"in r){const n=e.createElement(r.name,r.attributes);if(r.children)for(const o of r.children)n._appendChild(this._createNode(e,o));return n}return e.createText(r.data,r.attributes)}_restoreEditorData(e){const r=this.editor;Object.entries(this._data.roots).forEach(([n,{content:o,attributes:s}])=>{const i=JSON.parse(o),a=JSON.parse(s),u=r.model.document.getRoot(n);for(const[c,f]of a)e.setAttribute(c,f,u);for(const c of i){const f=this._createNode(e,c);e.insert(f,u,"end")}}),Object.entries(this._data.markers).forEach(([n,o])=>{const{document:s}=r.model,{rangeJSON:{start:i,end:a},...u}=o,c=s.getRoot(i.root),f=e.createPositionFromPath(c,i.path,i.stickiness),p=e.createPositionFromPath(c,a.path,a.stickiness),j=e.createRange(f,p);e.addMarker(n,{range:j,...u})})}_restoreCollaborationData(){const e=JSON.parse(this._data.commentThreads),r=JSON.parse(this._data.suggestions);e.forEach(n=>{const o=this.editor.config.get("collaboration.channelId"),s=this.editor.plugins.get("CommentsRepository");s.hasCommentThread(n.threadId)&&s.getCommentThread(n.threadId).remove(),s.addCommentThread({channelId:o,...n})}),r.forEach(n=>{const o=this.editor.plugins.get("TrackChangesEditing");o.hasSuggestion(n.id)?o.getSuggestion(n.id).attributes=n.attributes:o.addSuggestionData(n)})}}var Ia=b(6121),ve=b(3226),Da=b(6733);function Na(t,e){}const g=new Array(256).fill(0).map((t,e)=>("0"+e.toString(16)).slice(-2)),Tt="Lock from Angular integration (@ckeditor/ckeditor5-angular)";let Ma=(()=>{class t{constructor(r,n){this.config={},this.data="",this.tagName="div",this.disableTwoWayDataBinding=!1,this.ready=new l.vpe,this.change=new l.vpe,this.blur=new l.vpe,this.focus=new l.vpe,this.error=new l.vpe,this.initiallyDisabled=!1,this.isEditorSettingData=!1,this.id=function Fa(){const t=4294967296*Math.random()>>>0,e=4294967296*Math.random()>>>0,r=4294967296*Math.random()>>>0,n=4294967296*Math.random()>>>0;return"e"+g[t>>0&255]+g[t>>8&255]+g[t>>16&255]+g[t>>24&255]+g[e>>0&255]+g[e>>8&255]+g[e>>16&255]+g[e>>24&255]+g[r>>0&255]+g[r>>8&255]+g[r>>16&255]+g[r>>24&255]+g[n>>0&255]+g[n>>8&255]+g[n>>16&255]+g[n>>24&255]}(),this.ngZone=n,this.elementRef=r;const{CKEDITOR_VERSION:o}=window;if(o){const[s]=o.split(".").map(Number);s<37&&console.warn("The <CKEditor> component requires using CKEditor 5 in version 37 or higher.")}else console.warn('Cannot find the "CKEDITOR_VERSION" in the "window" scope.')}set disabled(r){this.setDisabledState(r)}get disabled(){return this.editorInstance?this.editorInstance.isReadOnly:this.initiallyDisabled}get editorInstance(){let r=this.editorWatchdog;return this.watchdog&&(r=this.watchdog._watchdogs.get(this.id)),r?r.editor:null}getId(){return this.id}ngOnChanges(r){Object.prototype.hasOwnProperty.call(r,"data")&&r.data&&!r.data.isFirstChange()&&this.writeValue(r.data.currentValue)}ngAfterViewInit(){this.attachToWatchdog()}ngOnDestroy(){var r=this;return(0,E.Z)(function*(){r.watchdog?yield r.watchdog.remove(r.id):r.editorWatchdog&&r.editorWatchdog.editor&&(yield r.editorWatchdog.destroy(),r.editorWatchdog=void 0)})()}writeValue(r){null===r&&(r=""),this.editorInstance?(this.isEditorSettingData=!0,this.editorInstance.data.set(r),this.isEditorSettingData=!1):(this.data=r,this.ready.pipe((0,Ia.P)()).subscribe(n=>{n.data.set(this.data)}))}registerOnChange(r){this.cvaOnChange=r}registerOnTouched(r){this.cvaOnTouched=r}setDisabledState(r){this.editorInstance&&(r?this.editorInstance.enableReadOnlyMode(Tt):this.editorInstance.disableReadOnlyMode(Tt)),this.initiallyDisabled=r}attachToWatchdog(){var r=this;const n=(u,c)=>this.ngZone.runOutsideAngular((0,E.Z)(function*(){r.elementRef.nativeElement.appendChild(u);const f=yield r.editor.create(u,c);return r.initiallyDisabled&&f.enableReadOnlyMode(Tt),r.ngZone.run(()=>{r.ready.emit(f)}),r.setUpEditorEvents(f),f})),o=function(){var u=(0,E.Z)(function*(c){yield c.destroy(),r.elementRef.nativeElement.removeChild(r.editorElement)});return function(f){return u.apply(this,arguments)}}(),s=u=>{(function Ba(t){return t.observed||t.observers.length>0})(this.error)&&this.ngZone.run(()=>this.error.emit(u))},i=document.createElement(this.tagName),a=this.getConfig();if(this.editorElement=i,this.watchdog)this.watchdog.add({id:this.id,type:"editor",creator:n,destructor:o,sourceElementOrData:i,config:a}).catch(u=>{s(u)}),this.watchdog.on("itemError",(u,{itemId:c})=>{c===this.id&&s()});else{const u=new ja(this.editor,this.editorWatchdogConfig);u.setCreator(n),u.setDestructor(o),u.on("error",s),this.editorWatchdog=u,this.ngZone.runOutsideAngular(()=>{u.create(i,a).catch(c=>{s(c)})})}}getConfig(){if(this.data&&this.config.initialData)throw new Error("Editor data should be provided either using `config.initialData` or `data` properties.");const r={...this.config},n=this.config.initialData||this.data;return n&&(r.initialData=n),r}setUpEditorEvents(r){const o=r.editing.view.document;r.model.document.on("change:data",s=>{this.ngZone.run(()=>{if(!this.disableTwoWayDataBinding){if(this.cvaOnChange&&!this.isEditorSettingData){const i=r.data.get();this.cvaOnChange(i)}this.change.emit({event:s,editor:r})}})}),o.on("focus",s=>{this.ngZone.run(()=>{this.focus.emit({event:s,editor:r})})}),o.on("blur",s=>{this.ngZone.run(()=>{this.cvaOnTouched&&this.cvaOnTouched(),this.blur.emit({event:s,editor:r})})})}}return t.\u0275fac=function(r){return new(r||t)(l.Y36(l.SBq),l.Y36(l.R0b))},t.\u0275cmp=l.Xpm({type:t,selectors:[["ckeditor"]],inputs:{editor:"editor",config:"config",data:"data",tagName:"tagName",watchdog:"watchdog",editorWatchdogConfig:"editorWatchdogConfig",disableTwoWayDataBinding:"disableTwoWayDataBinding",disabled:"disabled"},outputs:{ready:"ready",change:"change",blur:"blur",focus:"focus",error:"error"},features:[l._Bn([{provide:ve.JU,useExisting:(0,l.Gpc)(()=>t),multi:!0}]),l.TTD],decls:1,vars:0,template:function(r,n){1&r&&l.YNc(0,Na,0,0,"ng-template")},encapsulation:2}),t})(),Ra=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=l.oAB({type:t}),t.\u0275inj=l.cJS({imports:[[ve.u5,Da.ez]]}),t})()},8239:(wt,V,b)=>{function E(v,w,z,y,O,B,I){try{var R=v[B](I),A=R.value}catch(ot){return void z(ot)}R.done?w(A):Promise.resolve(A).then(y,O)}function l(v){return function(){var w=this,z=arguments;return new Promise(function(y,O){var B=v.apply(w,z);function I(A){E(B,y,O,I,R,"next",A)}function R(A){E(B,y,O,I,R,"throw",A)}I(void 0)})}}b.d(V,{Z:()=>l})}}]);