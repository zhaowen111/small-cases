(self.webpackChunksmall_case=self.webpackChunksmall_case||[]).push([[411],{709:(n,e,t)=>{"use strict";t.d(e,{Z:()=>o});var r=t(645),i=t.n(r)()((function(n){return n[1]}));i.push([n.id,"*{padding:0;margin:0;box-sizing:border-box}#htmlContent{padding:20px}#div1{top:20px;left:100%;position:fixed;width:200px;height:200px;overflow:hidden;border:1px solid red;transition:transform ease-out .5s}",""]);const o=i},645:n=>{"use strict";n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t=n(e);return e[2]?"@media ".concat(e[2]," {").concat(t,"}"):t})).join("")},e.i=function(n,t,r){"string"==typeof n&&(n=[[null,n,""]]);var i={};if(r)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(i[a]=!0)}for(var s=0;s<n.length;s++){var c=[].concat(n[s]);r&&i[c[0]]||(t&&(c[2]?c[2]="".concat(t," and ").concat(c[2]):c[2]=t),e.push(c))}},e}},379:(n,e,t)=>{"use strict";var r,i=function(){var n={};return function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}n[e]=t}return n[e]}}(),o=[];function a(n){for(var e=-1,t=0;t<o.length;t++)if(o[t].identifier===n){e=t;break}return e}function s(n,e){for(var t={},r=[],i=0;i<n.length;i++){var s=n[i],c=e.base?s[0]+e.base:s[0],d=t[c]||0,l="".concat(c," ").concat(d);t[c]=d+1;var u=a(l),f={css:s[1],media:s[2],sourceMap:s[3]};-1!==u?(o[u].references++,o[u].updater(f)):o.push({identifier:l,updater:v(f,e),references:1}),r.push(l)}return r}function c(n){var e=document.createElement("style"),r=n.attributes||{};if(void 0===r.nonce){var o=t.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(n){e.setAttribute(n,r[n])})),"function"==typeof n.insert)n.insert(e);else{var a=i(n.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(e)}return e}var d,l=(d=[],function(n,e){return d[n]=e,d.filter(Boolean).join("\n")});function u(n,e,t,r){var i=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(n.styleSheet)n.styleSheet.cssText=l(e,i);else{var o=document.createTextNode(i),a=n.childNodes;a[e]&&n.removeChild(a[e]),a.length?n.insertBefore(o,a[e]):n.appendChild(o)}}function f(n,e,t){var r=t.css,i=t.media,o=t.sourceMap;if(i?n.setAttribute("media",i):n.removeAttribute("media"),o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),n.styleSheet)n.styleSheet.cssText=r;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(r))}}var h=null,p=0;function v(n,e){var t,r,i;if(e.singleton){var o=p++;t=h||(h=c(e)),r=u.bind(null,t,o,!1),i=u.bind(null,t,o,!0)}else t=c(e),r=f.bind(null,t,e),i=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)};return r(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;r(n=e)}else i()}}n.exports=function(n,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=(void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r));var t=s(n=n||[],e);return function(n){if(n=n||[],"[object Array]"===Object.prototype.toString.call(n)){for(var r=0;r<t.length;r++){var i=a(t[r]);o[i].references--}for(var c=s(n,e),d=0;d<t.length;d++){var l=a(t[d]);0===o[l].references&&(o[l].updater(),o.splice(l,1))}t=c}}}},810:(n,e,t)=>{"use strict";var r=t(379),i=t.n(r),o=t(709);i()(o.Z,{insert:"head",singleton:!1}),o.Z.locals;let a=document.querySelector("#htmlContent"),s=document.querySelector("#style"),c=(document.querySelector("#div1"),"\n/* 你好，我叫小赵\n* 给你看个东西\n* 首先画一个框\n**/\n#div1 {\n transform: translateX(-100%);\n}\n/* 接下来我把 框 变成一个八卦图\n* 注意看好了\n* 首先，把 div 变成一个圆\n**/\n#div1 {\n border-radius: 50%;\n box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);\n border: none;\n}\n/*然后一半黑，一半白*/\n#div1 {\n background: linear-gradient(to right, white 50%, black 50%);\n}\n\n\n#div1::before,\n#div1::after {\n position: absolute;\n box-sizing: border-box;\n width: 100px;\n height: 100px;\n content: '';\n border-radius: 50%;\n transition: transform ease-out 0.5s;\n}\n/* 然后画两个小球*/\n\n\n#div1::before {\n top: 0;\n left: 50%;\n background: radial-gradient(circle, white 25%, black 25%);\n}\n\n#div1::after {\n bottom: 0;\n right: 50%;\n background: radial-gradient(circle, black 25%, white 25%);\n}\n/* 然后做一个鼠标放上去，太极归位的效果*/\n#div1:hover::before {\n transform: translateX(-50%);\n}\n#div1:hover::after {\n transform: translateX(50%);\n} \n/*\n现在把你的鼠标放上去试试啊\n*/\n\n/*\nBye bye!\n*/\n"),d="",l=0;!function n(){setTimeout((()=>{"\n"===c[l]?d+="<br>":" "===c[l]?d+="&nbsp":d+=c[l],a.innerHTML=d,s.innerHTML=c.substr(0,l),window.scrollTo({top:9999,behavior:"instant"}),l<c.length-1&&(l++,n())}),10)}()}},n=>{"use strict";n(n.s=810)}]);