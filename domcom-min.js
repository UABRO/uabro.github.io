!function(){"remove"in Element.prototype||(Element.prototype.remove=function(){this.length?this.map(function(e){e.parentNode&&e.parentNode.removeChild(e)}):this.parentNode&&this.parentNode.removeChild(this)});Element.prototype.css=function(e){var d;if("string"==typeof e)return this.style[e];for(var h in e)d=e[h],"string"!=typeof d&&(d+="px"),this.style[h]=d;return this};Element.prototype.resize=document.resize=function(e){console.log("ok")};Element.prototype.attr=function(e){if("string"==typeof e)return this.getAttribute(e);
  for(var d in e)this.setAttribute(d,e[d]);return!0};Element.prototype.show=function(e){arguments.length||(e="block");this.style.display=e};Element.prototype.hide=function(){this.style.display="none"};Element.prototype.height=function(){return this.offsetHeight};Element.prototype.width=function(){return this.offsetWidth};Element.prototype.text=function(e){if(e)this.textContent=e;else return this.textContent};Element.prototype.html=function(e){if(e)this.innerHTML=e;else return this.innerHTML};Element.prototype.val=
  function(e){if("undefined"!=typeof e)this.value=e;else return this.value};Element.prototype.crec=function(){return this.getBoundingClientRect()};var m=function(){function e(a,b){for(var c in b)Object.defineProperty(a,c,b[c])}var d=this;Object.defineProperty(this,"version",{get:function(){return"1.9.1"}});if(window.fetch){var h=function(a,b){for(var c,f,d,e,g=-1,x,k,l,h,w,q,m,r,u="",t="",p="",v=0;v<a.length;v++)c=a[v],m?w?'"'==c?(k=!k,!k&&h.length&&(c={},c[h]=t,h="",f.attr(c)),t=""):k?t+=c:e||">"==
        c?">"==c&&(m=0,e?(f&&f.parentNode&&(f=f.parentNode),x?d.parentNode&&(d=d.parentNode):x=1,g=0):f&&/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i.test(f.tagName)&&(f=f.parentNode),e=0):"/"==c?e=1:/[^a-z0-9_]/i.test(c)||(h+=c):q?/[ >]/.test(c)?(q=0,w=1,h="",f=document.createElement(p),l&&d?d.appendChild(f):d=l=f,">"==c&&(m=0),p=""):p+=c:/[a-z0-9_]/i.test(c)&&(q=1,p=c):r?w?(p+=a[v-1],b[p].insertIn(f),r=0):"}"==a[v+1]?w=1:p+=c:"<"==c?(m=1,p="",u.length&&f&&(f.appendChild(document.createTextNode(u)),
        u=""),/[a-z0-9_]/i.test(a[v+1])?(w=0,g?d=f:g++,x=0):"/"==a[v+1]&&(e=1)):"{"==c?(r=1,w=0,p="",u.length&&f&&(f.appendChild(document.createTextNode(u)),u="")):u+=c;return l};d.ready=function(a){document.addEventListener("DOMContentLoaded",a)};var l={},k={};(function(){var a={lang:1};d.setPseudo=function(b){"string"==typeof b&&(b=[b]);b.forEach(function(b){a[b]||(a[b]=[])})};d.newPseudo=function(b,c){a[b]&&a[b].push(c)};d.isPseudo=function(b){return!!a[b]};d.emit=function(b,c){a[b]&&a[b].forEach(function(a){a["on"+
b](c)})}})();d.lang=function(){var a,b={},c=function(f){return a?b[a][f]:(console.log("Error. Language was not set"),"undefined")};c.set=function(a){for(var f in a)b[f]=a[f];return c};c.get=function(){return a};c.ready=function(a){return!!b[a]};c.turn=function(b){if(b!=a){a=b;for(var c in k)if(b=k[c],b.f)b.f();else switch(b.type){case "html":b.dc.change({html:d.lang(b.dc.state.ihtml)});break;case "placeholder":b.dc.change({placeholder:d.lang(b.dc.state.iholder)});break;default:b.dc.change({text:d.lang(b.dc.state.itext)})}}};
  return c}();var m=0,r,q;d.sel=function(a,b){var c;if("object"==typeof a)return a===document?document:a instanceof Element?a:a.el;"#"==a[0]?c=document.getElementById(a.substr(1)):b?c=document.querySelector(a):c=document.querySelectorAll(a);return c.length||c instanceof Element?c:!1};d.onwindow=function(a,b){window.addEventListener(a,b)};d.forg=function(a,b){if(b)l[a]&&l[a].forEach(function(a){b(a)});else return l[a]};var g=function(a){a||(a={});a.getSelf&&a.getSelf(this);var b=this,c=++m,f={"class":""},
  g={};b.state=f;b.data=g;e(b,{id:{get:function(){return c}},t:{get:function(){return b.el.textContent},set:function(a){f.text=a;b.el.textContent=a}},h:{get:function(){return b.el.innerHTML},set:function(a){f.html=a;b.el.innerHTML=a}},v:{get:function(){return b.el.value},set:function(a){f.val=a;b.el.value=a}},d:{get:function(){return g},set:function(a){console.log("error. you cannot change data reference")}}});a.elType&&(a.eltype=a.elType);b.eltype=a.eltype?a.eltype:"div";b.el=document.createElement(b.eltype);
  a.extend&&b.extend(a.extend);if(a.state)for(var n in a.state)if("class"==n)b.state["class"]=a.state[n];else{if("itext"==n||"ihtml"==n||"iholder"==n)k[c]={dc:b},"ihtml"==n?(k[c].type="html",b.h=d.lang(a.state.ihtml)):"iholder"==n?(k[c].type="placeholder",b.state.placeholder=d.lang(a.state.iholder)):(k[c].type="itext",b.t=d.lang(a.state.itext));b.state[n]=a.state[n]}if(a.attrs)for(var h in a.attrs)r={},r[h]=a.attrs[h],"value"==h?b.state.val=a.attrs[h]:b.state[h]=a.attrs[h],b.el.attr(r);a.groups&&(q=
    a.groups,b.groups=q,(r=l[q])?l[q].push(b):l[q]=[b]);"function"==typeof a.chapi&&(b.chapi=a.chapi);a.init?(b.init=a.init,b.init()):a.initLater&&(b.init=a.initLater);a.data&&(b.data=a.data);a.events&&b.addEvents(a.events)};g.prototype.parentEl=!1;g.prototype.insertIn=g.prototype.iIn=function(a){a=d.sel(a,1);a.appendChild(this.el);this.parentEl=a;return this.render()};g.prototype.insertAs=g.prototype.iAs=function(a){this.el=d.sel(a,1);return this.render({})};g.prototype.change=function(a,b){var c={},
  f=0;if(b&&this.chapi&&a)this.chapi(a);else{for(var d in a)this.state[d]=a[d],c[d]=!0,["html","text","val","placeholder","class"].indexOf(d)+1&&f++;if(f)this.render(c);else return this}};g.prototype.hasClass=function(a){var b=this.state["class"],b=b.split(" ");return-1<b.indexOf(a)};g.prototype.addClass=function(a){var b=this.state["class"],b=b.split(" ");-1==b.indexOf(a)&&(b.push(a),this.state["class"]=this.el.classList=b.join(" "))};g.prototype.removeClass=function(a){var b=this.state["class"],b=
  b.split(" ");-1<b.indexOf(a)&&(b.splice(b.indexOf(a),1),this.state["class"]=this.el.classList=b.join(" "))};g.prototype.toggleClass=function(a){this.hasClass(a)?this.removeClass(a):this.addClass(a)};g.prototype.eventsArr=[];g.prototype.intervalArr=[];g.prototype.interval=function(a,b){this.intervalArr.push(setInterval(a,b))};g.prototype.clearIntervals=function(){this.intervalArr.forEach(function(a){clearInterval(a)})};g.prototype.timeoutArr=[];g.prototype.timeout=function(a,b){this.timeoutArr.push(setTimeout(a,
  b))};g.prototype.clearTimeouts=function(){this.timeoutArr.forEach(function(a){clearTimeout(a)})};g.prototype.remove=function(){this.el.remove();this.removed=!0;this.clearIntervals();return!0};g.prototype.replaceWith=function(a,b){if("string"==typeof a)a=b?h(a):document.createTextNode(a);else if("el"in a){if(a.state)for(var c in a.state)this.state[c]=a.state[c];a=a.el}this.el.parentNode.replaceChild(a,this.el);this.el=a};g.prototype.parse=function(a,b){var c=h(a,b);this.el=c;c.attr("class")&&(this.state["class"]=
  c.attr("class"));return this};g.prototype.extend=function(a){for(var b in a)"events"==b?this.addEvents(a[b]):this[b]=a[b]};g.prototype.addEvents=function(a){for(var b in a)d.isPseudo(b)?("lang"==b?k[this.id]={dc:this,f:a[b].bind(this)}:d.newPseudo(b,this),this["on"+b]=a[b].bind(this)):(this.eventsArr.push(b),this["on"+b]=a[b].bind(this.el),this.el.addEventListener(b,this["on"+b]))};g.prototype.DClist=function(a){var b=this;b.change({html:""});a.map(function(a){a.insertIn(b)});return b};g.prototype.render=
  function(a){var b=this.state;a?("html"in a&&(this.el.innerHTML=b.html),"text"in a&&(this.el.textContent=b.text),"val"in a&&(this.el.value=b.val),"placeholder"in a&&(this.el.placeholder=b.placeholder),"class"in a&&(a=b["class"],a="string"==typeof a?a:a.join(" "),this.el.attr({"class":a}))):(b.html&&b.html!=this.el.innerHTML&&(this.el.innerHTML=b.html),b.text&&b.text!=this.el.textContent&&(this.el.textContent=b.text),b.val&&b.val!=this.el.value&&(this.el.value=b.val),b.placeholder&&b.placeholder!=this.el.placeholder&&
    (this.el.placeholder=b.placeholder),b["class"]&&(a=b["class"],a="string"==typeof a?a:a.join(" "),this.el.attr({"class":a})));return this};d.make=function(a){"function"==typeof a&&(a=a());return new g(a)};d.temp=function(a){"function"==typeof a&&(a=a());"undefined"==typeof a&&(a={});a.temp=1;return new g(a)};d.module=function(){var a=function(b,c){if(b){if(!c)return a.loaded[b];a.loaded[b]=c}else console.log("loaded module have wrong structure")};a.loaded={};a.run=function(b,c){var f=c.data,d=c.ready;
  a.loaded[b]?(f||(f={}),f=a.loaded[b](f),a.loaded[b]=f,d&&d(f.dc,f.api)):c.err&&c.err('module "'+b+'" not loaded')};return a}();var t={};d.model=function(a,b){t[a]=b};d.getModel=function(a){return t[a]};d.getModels=function(){return t};d.from=function(a,b){if("function"===typeof a)return d.temp(a(b));var c=t[a],c=c?c(b):b;return d.temp(c)};d.load=function(){var a=d.module.loaded,b,c=function(c){function f(){c.raw?(c.rawcss&&d.temp({eltype:"style",state:{text:c.rawcss}}).insertIn(document.head),d.temp({eltype:"script",
    state:{text:c.raw}}).insertIn(document.head),d.module.run(e,c)):d.temp({eltype:"script",attrs:{src:b+e+".js"},events:{load:function(){d.module.run(e,c);this.remove()},error:function(){c.err&&c.err('module "'+e+"\" can't be loaded")}}}).insertIn(document.head)}var e=c.name;if(a[e]&&!c.force)if(c.exist){var g=a[e];"function"==typeof c.exist&&c.exist(g.dc,g.api)}else c.err&&c.err('module "'+e+'" already loaded. Use `force` to load it again');else c.start&&c.start(),c.css?d.temp({eltype:"link",attrs:{rel:"stylesheet",
    href:b+"css/"+e+".css"},events:{load:function(){f()},error:function(a){c.err&&c.err('css for module "'+e+"\" can't be loaded")}}}).insertIn(document.head):f()};c.config=function(a){a.src&&(b=a.src)};return c}()}else d.ready=function(){document.addEventListener("DOMContentLoaded",function(){document.body.innerHTML="<h1><b style='color:#000;padding:10px;'>You are using bad browser! What's wrong with you, man!???</b></h1>"})}};m.prototype.instance=function(){return new m};var y=new m;window.DC=y;window.$=
  y.sel}();