!function(){function p(e,d){for(var h in e)e.hasOwnProperty(h)&&d(h,e[h])}"remove"in Element.prototype||(Element.prototype.remove=function(){this.length?this.map(function(e){e.parentNode&&e.parentNode.removeChild(e)}):this.parentNode&&this.parentNode.removeChild(this)});Element.prototype.css=function(e){if("string"==typeof e)return this.style[e];for(var d in e){var h=e[d];"string"!=typeof h&&(h+="px");this.style[d]=h}return this};Element.prototype.resize=document.resize=function(e){console.log("ok")};
Element.prototype.attr=function(e){if("string"==typeof e)return this.getAttribute(e);for(var d in e)this.setAttribute(d,e[d]);return!0};Element.prototype.show=function(e){arguments.length||(e="block");this.style.display=e};Element.prototype.hide=function(){this.style.display="none"};Element.prototype.height=function(){return this.offsetHeight};Element.prototype.width=function(){return this.offsetWidth};Element.prototype.text=function(e){if(e)this.textContent=e;else return this.textContent};Element.prototype.html=
function(e){if(e)this.innerHTML=e;else return this.innerHTML};Element.prototype.val=function(e){if("undefined"!=typeof e)this.value=e;else return this.value};Element.prototype.crec=function(){return this.getBoundingClientRect()};var m=function(){function e(a,b){for(var c in b)Object.defineProperty(a,c,b[c])}var d=this;Object.defineProperty(this,"version",{get:function(){return"1.9.4"}});if(window.Worker){var h=function(a,b){for(var c,f,d,w,e=-1,g,h,n,k,l,m,r,p,u="",t="",q="",v=0;v<a.length;v++)c=
a[v],r?l?'"'==c?(h=!h,!h&&k.length&&(c={},c[k]=t,k="",f.attr(c)),t=""):h?t+=c:w||">"==c?">"==c&&(r=0,w?(f&&f.parentNode&&(f=f.parentNode),g?d.parentNode&&(d=d.parentNode):g=1,e=0):f&&/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i.test(f.tagName)&&(f=f.parentNode),w=0):"/"==c?w=1:/[^a-z0-9_]/i.test(c)||(k+=c):m?/[ >]/.test(c)?(m=0,l=1,k="",f=document.createElement(q),n&&d?d.appendChild(f):d=n=f,">"==c&&(r=0),q=""):q+=c:/[a-z0-9_]/i.test(c)&&(m=1,q=c):p?l?(q+=a[v-1],b[q].insertIn(f),p=0):"}"==
a[v+1]?l=1:q+=c:"<"==c?(r=1,q="",u.length&&f&&(f.appendChild(document.createTextNode(u)),u=""),/[a-z0-9_]/i.test(a[v+1])?(l=0,e?d=f:e++,g=0):"/"==a[v+1]&&(w=1)):"{"==c?(p=1,l=0,q="",u.length&&f&&(f.appendChild(document.createTextNode(u)),u="")):u+=c;return n};d.ready=function(a){document.addEventListener("DOMContentLoaded",a)};var k={},n={};(function(){var a={lang:1};d.setPseudo=function(b){"string"==typeof b&&(b=[b]);b.forEach(function(b){a[b]||(a[b]=[])})};d.newPseudo=function(b,c){a[b]&&a[b].push(c)};
d.isPseudo=function(b){return!!a[b]};d.emit=function(b,c){a[b]&&a[b].forEach(function(a){a["on"+b](c)})}})();d.lang=function(){var a,b={},c=function(c){return a?b[a][c]:(console.log("Error. Language was not set"),"undefined")};c.set=function(a){p(a,function(a,c){return b[a]=c});return c};c.get=function(){return a};c.ready=function(a){return!!b[a]};c.turn=function(b){if(b!=a){a=b;for(var c in n)if(b=n[c],b.f)b.f();else switch(b.type){case "html":b.dc.change({html:d.lang(b.dc.state.ihtml)});break;case "placeholder":b.dc.change({placeholder:d.lang(b.dc.state.iholder)});
break;default:b.dc.change({text:d.lang(b.dc.state.itext)})}}};return c}();var m=0,r,l;d.sel=function(a,b){var c;if("object"==typeof a)return a===document?document:a instanceof Element?a:a.el;"#"==a[0]?c=document.getElementById(a.substr(1)):b?c=document.querySelector(a):c=document.querySelectorAll(a);return c.length||c instanceof Element?c:!1};d.onwindow=function(a,b){window.addEventListener(a,b)};d.forg=function(a,b){if(b)k[a]&&k[a].forEach(function(a){b(a)});else return k[a]};var g=function(a){a||
(a={});a.getSelf&&a.getSelf(this);var b=this,c=++m,f={"class":""},g={};b.state=f;b.data=g;e(b,{id:{get:function(){return c}},t:{get:function(){return b.el.textContent},set:function(a){f.text=a;b.el.textContent=a}},h:{get:function(){return b.el.innerHTML},set:function(a){f.html=a;b.el.innerHTML=a}},v:{get:function(){return b.el.value},set:function(a){f.val=a;b.el.value=a}},d:{get:function(){return g},set:function(a){console.log("error. you cannot change data reference")}}});a.elType&&(a.eltype=a.elType);
b.eltype=a.eltype?a.eltype:"div";b.el=document.createElement(b.eltype);a.extend&&b.extend(a.extend);a.state&&p(a.state,function(a,f){if("class"===a)b.state["class"]=f;else{if("itext"===a||"ihtml"===a||"iholder"===a)n[c]={dc:b},"ihtml"==a?(n[c].type="html",b.h=d.lang(f)):"iholder"==a?(n[c].type="placeholder",b.state.placeholder=d.lang(f)):(n[c].type="itext",b.t=d.lang(f));b.state[a]=f}});a.attrs&&p(a.attrs,function(a,c){r={};r[a]=c;"value"==a?b.state.val=c:b.state[a]=c;b.el.attr(r)});a.groups&&(l=
a.groups,b.groups=l,(r=k[l])?k[l].push(b):k[l]=[b]);"function"==typeof a.chapi&&(b.chapi=a.chapi);a.init?(b.init=a.init,b.init()):a.initLater&&(b.init=a.initLater);a.data&&(b.data=a.data);a.events&&b.addEvents(a.events)};g.prototype.parentEl=!1;g.prototype.insertIn=g.prototype.iIn=function(a){a=d.sel(a,1);a.appendChild(this.el);this.parentEl=a;return this.render()};g.prototype.insertAs=g.prototype.iAs=function(a){this.el=d.sel(a,1);return this.render({})};g.prototype.change=function(a,b){var c=this,
f={},d=0;if(b&&this.chapi&&a)this.chapi(a);else if(p(a,function(a,b){c.state[a]=b;f[a]=!0;["html","text","val","placeholder","class"].indexOf(a)+1&&d++}),d)this.render(f);else return this};g.prototype.hasClass=function(a){var b=this.state["class"],b=b.split(" ");return-1<b.indexOf(a)};g.prototype.addClass=function(a){var b=this.state["class"],b=b.split(" ");-1==b.indexOf(a)&&(b.push(a),this.state["class"]=this.el.classList=b.join(" "))};g.prototype.removeClass=function(a){var b=this.state["class"],
b=b.split(" ");-1<b.indexOf(a)&&(b.splice(b.indexOf(a),1),this.state["class"]=this.el.classList=b.join(" "))};g.prototype.toggleClass=function(a){this.hasClass(a)?this.removeClass(a):this.addClass(a)};g.prototype.eventsArr=[];g.prototype.intervalArr=[];g.prototype.interval=function(a,b){this.intervalArr.push(setInterval(a,b))};g.prototype.clearIntervals=function(){this.intervalArr.forEach(function(a){clearInterval(a)})};g.prototype.timeoutArr=[];g.prototype.timeout=function(a,b){this.timeoutArr.push(setTimeout(a,
b))};g.prototype.clearTimeouts=function(){this.timeoutArr.forEach(function(a){clearTimeout(a)})};g.prototype.remove=function(){this.el.remove();this.removed=!0;this.clearIntervals();return!0};g.prototype.replaceWith=function(a,b){if("string"==typeof a)a=b?h(a):document.createTextNode(a);else if("el"in a){if(a.state)for(var c in a.state)this.state[c]=a.state[c];a=a.el}this.el.parentNode.replaceChild(a,this.el);this.el=a};g.prototype.parse=function(a,b){var c=h(a,b);this.el=c;c.attr("class")&&(this.state["class"]=
c.attr("class"));return this};g.prototype.extend=function(a){var b=this;p(a,function(a,f){"events"==a?b.addEvents(f):b[a]=f})};g.prototype.addEvents=function(a){var b=this;p(a,function(a,f){d.isPseudo(a)?("lang"==a?n[b.id]={dc:b,f:f.bind(b)}:d.newPseudo(a,b),b["on"+a]=f.bind(b)):(b.eventsArr.push(a),b["on"+a]=f.bind(b.el),b.el.addEventListener(a,b["on"+a]))})};g.prototype.DClist=function(a){var b=this;b.change({html:""});a.map(function(a){a.insertIn(b)});return b};g.prototype.render=function(a){var b=
this.state;a?("html"in a&&(this.el.innerHTML=b.html),"text"in a&&(this.el.textContent=b.text),"val"in a&&(this.el.value=b.val),"placeholder"in a&&(this.el.placeholder=b.placeholder),"class"in a&&(a=b["class"],a="string"==typeof a?a:a.join(" "),this.el.attr({"class":a}))):(b.html&&b.html!=this.el.innerHTML&&(this.el.innerHTML=b.html),b.text&&b.text!=this.el.textContent&&(this.el.textContent=b.text),b.val&&b.val!=this.el.value&&(this.el.value=b.val),b.placeholder&&b.placeholder!=this.el.placeholder&&
(this.el.placeholder=b.placeholder),b["class"]&&(a=b["class"],a="string"==typeof a?a:a.join(" "),this.el.attr({"class":a})));return this};d.make=function(a){"function"==typeof a&&(a=a());return new g(a)};d.temp=function(a){"function"==typeof a&&(a=a());"undefined"==typeof a&&(a={});a.temp=1;return new g(a)};d.module=function(){var a=function(b,c){if(b){if(!c)return a.loaded[b];a.loaded[b]=c}else console.log("loaded module have wrong structure")};a.loaded={};a.run=function(b,c){var f=c.data,d=c.ready;
a.loaded[b]?(f||(f={}),f=a.loaded[b](f),a.loaded[b]=f,d&&d(f.dc,f.api)):c.err&&c.err('module "'+b+'" not loaded')};return a}();var t={};d.model=function(a,b){t[a]=b};d.getModel=function(a){return t[a]};d.getModels=function(){return t};d.from=function(a,b){if("function"===typeof a)return d.temp(a(b));"function"===typeof b&&(b=b());var c=t[a],c=c?c(b):b;return c instanceof g?c:d.temp(c)};d.load=function(){var a=d.module.loaded,b,c=function(c){function f(){c.raw?(c.rawcss&&d.temp({eltype:"style",state:{text:c.rawcss}}).insertIn(document.head),
d.temp({eltype:"script",state:{text:c.raw}}).insertIn(document.head),d.module.run(e,c)):d.temp({eltype:"script",attrs:{src:b+e+".js"},events:{load:function(){d.module.run(e,c);this.remove()},error:function(){c.err&&c.err('module "'+e+"\" can't be loaded")}}}).insertIn(document.head)}var e=c.name;if(a[e]&&!c.force)if(c.exist){var g=a[e];"function"==typeof c.exist&&c.exist(g.dc,g.api)}else c.err&&c.err('module "'+e+'" already loaded. Use `force` to load it again');else c.start&&c.start(),c.css?d.temp({eltype:"link",
attrs:{rel:"stylesheet",href:b+"css/"+e+".css"},events:{load:function(){f()},error:function(a){c.err&&c.err('css for module "'+e+"\" can't be loaded")}}}).insertIn(document.head):f()};c.config=function(a){a.src&&(b=a.src)};return c}()}else d.ready=function(){document.addEventListener("DOMContentLoaded",function(){document.body.innerHTML="<h1><b style='color:#000;padding:10px;'>You are using bad browser! What's wrong with you, man!???</b></h1>"})}};m.prototype.shared={};m.prototype.fshared={};m.prototype.iterObj=
p;m.prototype.instance=function(){return new m};m.prototype.Emitter=function(){var e={};this.on=function(d,h){e[d]||(e[d]=[]);e[d].push(h)};this.emit=function(d,h){e[d]&&e[d].forEach(function(d){return d(h)})}};m.prototype.Rest=function(){function e(e,k,m){var l=new XMLHttpRequest;return new Promise(function(g,n){l.open(e,d.base+k);l.onreadystatechange=function(){if(4===this.readyState){try{var a=JSON.parse(this.responseText)}catch(c){a={}}this.json=a;200===this.status?g(a):n(this)}};for(var a in h)h.hasOwnProperty(a)&&
l.setRequestHeader(a,h[a]);"GET"===e?l.send():(l.setRequestHeader("Content-Type","application/json"),l.send(JSON.stringify(m)))})}var d=this,h={};this.base="";var k=function(d){return function(h,k){return e(d,h,k)}};this.get=k("GET");this.post=k("POST");this.put=k("PUT");this["delete"]=k("DELETE");this.patch=k("PATCH");this.setH=function(d,e){return h[d]=e};this.remH=function(d){return delete h[d]}};var x=new m;window.DC=x;window.$=x.sel}();