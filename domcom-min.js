(function(){"remove"in Element.prototype||(Element.prototype.remove=function(){this.length?this.map(function(g){g.parentNode&&g.parentNode.removeChild(g)}):this.parentNode&&this.parentNode.removeChild(this)});Element.prototype.css=function(g){var d;if("string"==typeof g)return this.style[g];for(var l in g)d=g[l],"string"!=typeof d&&(d+="px"),this.style[l]=d;return this};Element.prototype.resize=document.resize=function(g){console.log("ok")};Element.prototype.attr=function(g){if("string"==typeof g)return this.getAttribute(g);
for(var d in g)this.setAttribute(d,g[d]);return!0};Element.prototype.show=function(g){arguments.length||(g="block");this.style.display=g};Element.prototype.hide=function(){this.style.display="none"};Element.prototype.height=function(){return this.offsetHeight};Element.prototype.width=function(){return this.offsetWidth};Element.prototype.text=function(g){if(g)this.textContent=g;else return this.textContent};Element.prototype.html=function(g){if(g)this.innerHTML=g;else return this.innerHTML};Element.prototype.val=
function(g){if("undefined"!=typeof g)this.value=g;else return this.value};Element.prototype.crec=function(){return this.getBoundingClientRect()};var p;p=new function(){function g(a,b){for(var c in b)Object.defineProperty(a,c,b[c])}var d=this;Object.defineProperty(this,"version",{get:function(){return"1.8.7"}});if(!window.Worker)return d.ready=function(){document.addEventListener("DOMContentLoaded",function(){document.body.innerHTML="<h1><b style='color:#000;padding:10px;'>You are using bad browser! What's wrong with you, man!???</b></h1>"})},
!1;var l=function(a,b){for(var c,f,d,h,g=-1,e,k,m,l,v,p,n,r,t="",w="",q="",u=0;u<a.length;u++)c=a[u],n?v?'"'==c?(k=!k,!k&&l.length&&(c={},c[l]=w,l="",f.attr(c)),w=""):k?w+=c:h||">"==c?">"==c&&(n=0,h?(f&&f.parentNode&&(f=f.parentNode),e?d.parentNode&&(d=d.parentNode):e=1,g=0):f&&/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i.test(f.tagName)&&(f=f.parentNode),h=0):"/"==c?h=1:/[^a-z0-9_]/i.test(c)||(l+=c):p?/[ >]/.test(c)?(p=0,v=1,l="",f=document.createElement(q),m&&d?d.appendChild(f):d=m=f,
">"==c&&(n=0),q=""):q+=c:/[a-z0-9_]/i.test(c)&&(p=1,q=c):r?v?(q+=a[u-1],b[q].insertIn(f),r=0):"}"==a[u+1]?v=1:q+=c:"<"==c?(n=1,q="",t.length&&f&&(f.appendChild(document.createTextNode(t)),t=""),/[a-z0-9_]/i.test(a[u+1])?(v=0,g?d=f:g++,e=0):"/"==a[u+1]&&(h=1)):"{"==c?(r=1,v=0,q="",t.length&&f&&(f.appendChild(document.createTextNode(t)),t="")):t+=c;return m};d.ready=function(a){document.addEventListener("DOMContentLoaded",a)};var p=[],m={},k={};(function(){var a={lang:1};d.setPseudo=function(b){"string"==
typeof b&&(b=[b]);b.forEach(function(b){a[b]||(a[b]=[])})};d.newPseudo=function(b,c){a[b]&&a[b].push(c)};d.isPseudo=function(b){return a[b]?!0:!1};d.emit=function(b){a[b]&&a[b].forEach(function(a){a["on"+b]()})}})();d.lang=function(){var a,b={},c=function(f){return a?b[a][f]:(console.log("Error. Language was not set"),"undefined")};c.set=function(a){for(var f in a)b[f]=a[f];return c};c.get=function(b){return a};c.ready=function(a){return b[a]?!0:!1};c.turn=function(b){if(b!=a){a=b;for(var c in k)if(b=
k[c],b.f)b.f();else switch(b.type){case "html":b.dc.change({html:d.lang(b.dc.state.ihtml)});break;case "placeholder":b.dc.change({placeholder:d.lang(b.dc.state.iholder)});break;default:b.dc.change({text:d.lang(b.dc.state.itext)})}}};return c}();var x=0,r,n;d.sel=function(a,b){var c;if("object"==typeof a)return a===document?document:a instanceof Element?a:a.el;"#"==a[0]?c=document.getElementById(a.substr(1)):b?c=document.querySelector(a):c=document.querySelectorAll(a);return c.length||c instanceof
Element?c:!1};d.onwindow=function(a,b){window.addEventListener(a,b)};d.forg=function(a,b){if(b)m[a]&&m[a].forEach(function(a){b(a)});else return m[a]};var e=function(a){a?a.temp||p.push(this):a={};a.getSelf&&a.getSelf(this);var b=this,c=++x,f={},e={};b.state=f;b.data=e;g(b,{id:{get:function(){return c}},t:{get:function(){return b.el.textContent},set:function(a){f.text=a;b.el.textContent=a}},h:{get:function(){return b.el.innerHTML},set:function(a){f.html=a;b.el.innerHTML=a}},v:{get:function(){return b.el.value},
set:function(a){f.val=a;b.el.value=a}},d:{get:function(){return e},set:function(a){console.log("error. you cannot change data reference")}}});b.eltype=a.eltype?a.eltype:"div";b.el=document.createElement(b.eltype);a.extend&&b.extend(a.extend);if(a.state)for(var h in a.state)if("class"==h)b.state["class"]=a.state[h];else{if("itext"==h||"ihtml"==h||"iholder"==h)k[c]={dc:b},"ihtml"==h?(k[c].type="html",b.h=d.lang(a.state.ihtml)):"iholder"==h?(k[c].type="placeholder",b.state.placeholder=d.lang(a.state.iholder)):
(k[c].type="itext",b.t=d.lang(a.state.itext));b.state[h]=a.state[h]}if(a.attrs)for(h in a.attrs)r={},r[h]=a.attrs[h],"value"==h?b.state.val=a.attrs[h]:b.state[h]=a.attrs[h],b.el.attr(r);a.groups&&(n=a.groups,b.groups=n,(r=m[n])?m[n].push(b):m[n]=[b]);"function"==typeof a.chapi&&(b.chapi=a.chapi);a.init?(b.init=a.init,b.init()):a.initLater&&(b.init=a.initLater);a.data&&(b.data=a.data);a.events&&b.addEvents(a.events)};e.prototype.parentEl=!1;e.prototype.insertIn=e.prototype.iIn=function(a){a=d.sel(a,
1);a.appendChild(this.el);this.parentEl=a;return this.render()};e.prototype.insertAs=e.prototype.iAs=function(a){this.el=d.sel(a,1);return this.render({})};e.prototype.change=function(a,b){var c={},f=0;if(b&&this.chapi&&a)this.chapi(a);else{for(var d in a)this.state[d]=a[d],c[d]=!0,["html","text","val","placeholder","class"].indexOf(d)+1&&f++;if(f)this.render(c);else return this}};e.prototype.hasClass=function(a){var b=this.state["class"];if(b&&b.length)a=b?b.indexOf(a)+1:!1;else return!1;return a?
a:!1};e.prototype.addClass=function(a){this.el.classList.add(a)};e.prototype.removeClass=function(a){this.el.classList.remove(a)};e.prototype.toggleClass=function(a){this.el.classList.toggle(a)};e.prototype.eventsArr=[];e.prototype.intervalArr=[];e.prototype.interval=function(a,b){this.intervalArr.push(setInterval(a,b))};e.prototype.clearIntervals=function(){this.intervalArr.forEach(function(a){clearInterval(a)})};e.prototype.timeoutArr=[];e.prototype.timeout=function(a,b){this.timeoutArr.push(setTimeout(a,
b))};e.prototype.clearTimeouts=function(){this.timeoutArr.forEach(function(a){clearTimeout(a)})};e.prototype.remove=function(){this.el.remove();this.removed=!0;this.clearIntervals();return!0};e.prototype.replaceWith=function(a,b){if("string"==typeof a)a=b?l(a):document.createTextNode(a);else if("el"in a){if(a.state)for(var c in a.state)this.state[c]=a.state[c];a=a.el}this.el.parentNode.replaceChild(a,this.el);this.el=a};e.prototype.parse=function(a,b){var c=l(a,b);this.el=c;c.attr("class")&&(this.state["class"]=
c.attr("class"));return this};e.prototype.extend=function(a){for(var b in a)"events"==b?this.addEvents(a[b]):this[b]=a[b]};e.prototype.addEvents=function(a){for(var b in a)d.isPseudo(b)?("lang"==b?k[this.id]={dc:this,f:a[b].bind(this)}:d.newPseudo(b,this),this["on"+b]=a[b].bind(this)):(this.eventsArr.push(b),this["on"+b]=a[b].bind(this.el),this.el.addEventListener(b,this["on"+b]))};e.prototype.DClist=function(a){var b=this;b.change({html:""});a.map(function(a){a.insertIn(b)});return b};e.prototype.render=
function(a){var b=this.state;a?("html"in a&&(this.el.innerHTML=b.html),"text"in a&&(this.el.textContent=b.text),"val"in a&&(this.el.value=b.val),"placeholder"in a&&(this.el.placeholder=b.placeholder),"class"in a&&(a=b["class"],a="string"==typeof a?a:a.join(" "),this.el.attr({"class":a}))):(b.html&&b.html!=this.el.innerHTML&&(this.el.innerHTML=b.html),b.text&&b.text!=this.el.textContent&&(this.el.textContent=b.text),b.val&&b.val!=this.el.value&&(this.el.value=b.val),b.placeholder&&b.placeholder!=this.el.placeholder&&
(this.el.placeholder=b.placeholder),b["class"]&&(a=b["class"],a="string"==typeof a?a:a.join(" "),this.el.attr({"class":a})));return this};d.make=function(a){"function"==typeof a&&(a=a());return new e(a)};d.temp=function(a){"function"==typeof a&&(a=a());"undefined"==typeof a&&(a={});a.temp=1;return new e(a)};d.module=function(){var a=function(b,c){if(b){if(!c)return a.loaded[b];a.loaded[b]=c}else console.log("loaded module have wrong structure")};a.loaded={};a.run=function(b,c){var f=c.data,d=c.ready;
a.loaded[b]?(f||(f={}),f=a.loaded[b](f),a.loaded[b]=f,d&&d(f.dc,f.api)):c.err&&c.err('module "'+b+'" not loaded')};return a}();d.load=function(){var a=d.module.loaded,b,c=function(c){function f(){c.raw?(c.rawcss&&d.temp({eltype:"style",state:{text:c.rawcss}}).insertIn(document.head),d.temp({eltype:"script",state:{text:c.raw}}).insertIn(document.head),d.module.run(e,c)):d.temp({eltype:"script",attrs:{src:b+e+".js"},events:{load:function(){d.module.run(e,c);this.remove()},error:function(){c.err&&c.err('module "'+
e+"\" can't be loaded")}}}).insertIn(document.head)}var e=c.name;if(a[e]&&!c.force)if(c.exist){var g=a[e];"function"==typeof c.exist&&c.exist(g.dc,g.api)}else c.err&&c.err('module "'+e+'" already loaded. Use `force` to load it again');else c.start&&c.start(),c.css?d.temp({eltype:"link",attrs:{rel:"stylesheet",href:b+"css/"+e+".css"},events:{load:function(){f()},error:function(a){c.err&&c.err('css for module "'+e+"\" can't be loaded")}}}).insertIn(document.head):f()};c.config=function(a){a.src&&(b=
a.src)};return c}()};window.DC=p;window.$=p.sel})();