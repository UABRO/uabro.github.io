/*

DomCom framework, 2016,
Oleksii Shnyra, UABRO

*/
(function () {
  'use strict';
  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
      if (this.length) {
        this.map(function (v) {
          if (v.parentNode) {
            v.parentNode.removeChild(v);
          }
        })
      } else {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      }
    };
  }

  Element.prototype.css = function (obj) {
    var prop;
    if (typeof obj == 'string') {
      return this.style[obj];
    }
    for (var i in obj) {
      prop = obj[i];
      if (typeof prop != 'string') prop += 'px';
      this.style[i] = prop;
    }
    return this;
  };

  Element.prototype.resize = document.resize = function (obj) {
    var prop;
    console.log('ok');
  };

  Element.prototype.attr = function (a) {
    if (typeof a == 'string') {
      return this.getAttribute(a);
    } else {
      for (var b in a) {
        this.setAttribute(b, a[b]);
      }
      return true;
    }
  }

  Element.prototype.show = function (v) {
    if (!arguments.length) v = 'block';
    this.style.display = v;
  }

  Element.prototype.hide = function () {
    this.style.display = 'none';
  }

  Element.prototype.height = function () {
    return this.offsetHeight;
  }

  Element.prototype.width = function () {
    return this.offsetWidth;
  }

  Element.prototype.text = function (v) {
    if (v) { this.textContent = v; } else {
      return this.textContent;
    }
  }

  Element.prototype.html = function (v) {
    if (v) { this.innerHTML = v; } else {
      return this.innerHTML;
    }
  }

  Element.prototype.val = function (v) {
    if (typeof v != 'undefined') { this.value = v; } else {
      return this.value;
    }
  }

  Element.prototype.crec = function () {
    return this.getBoundingClientRect();
  }

  // actual initialization of DC

  var DC = function () {
    var selfDC = this;
    Object.defineProperty(this, 'version', {
      get() {
        return '1.8.9';
      }
    });
    if (!window.Worker) {// support only IE10+
      selfDC.ready = function () {
        document.addEventListener("DOMContentLoaded", function () {
          document.body.innerHTML = "<h1><b style='color:#000;padding:10px;'>You are using bad browser! What's wrong with you, man!???</b></h1>";
        });
      }
      return false;
    }
    var parseHTML = function (html, ctx) {
      var a, el, ctxel, char, parent, closingtag, godown = -1, goup,
        quoted, dom, attris, tagready, tagstarted, intag, inspectag,
        text = '',
        quote = '',
        buf = '';
      for (var i = 0; i < html.length; i++) {
        char = html[i];
        if (intag) {// for operations between "<" && ">"
          if (tagready) {
            if (char == '"') {
              quoted = !quoted;
              if (!quoted && attris.length) {
                a = {};
                a[attris] = quote;
                attris = '';
                el.attr(a);
              }
              quote = '';
            } else
              if (quoted) {
                quote += char;
              } else {
                if (closingtag || char == '>') {
                  if (char == '>') {
                    intag = 0;
                    if (closingtag) {
                      if (el && el.parentNode) el = el.parentNode;
                      if (goup) {
                        if (parent.parentNode) parent = parent.parentNode;
                        godown = 0;
                      } else {
                        goup = 1;
                        godown = 0;
                      }
                    } else
                      if (el && /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i.test(el.tagName)) el = el.parentNode;
                    closingtag = 0;
                  }
                } else {
                  if (char == '/') {
                    closingtag = 1;
                  } else {
                    if (/[^a-z0-9_]/i.test(char)) {
                    } else { attris += char; }
                  }
                }
              }
          } else {
            if (tagstarted) {
              if (/[ >]/.test(char)) {
                tagstarted = 0;
                tagready = 1;
                attris = '';
                el = document.createElement(buf);
                if (dom && parent) {
                  parent.appendChild(el);
                } else {
                  parent = dom = el;
                }
                if (char == '>') intag = 0;
                buf = '';
              } else {
                buf += char;
              }
            } else if (/[a-z0-9_]/i.test(char)) { tagstarted = 1; buf = char; }
          }
        } else
          if (inspectag) {// for operations between "{" && "}"
            if (tagready) {
              buf += html[i - 1];
              ctx[buf].insertIn(el);
              inspectag = 0;
            } else {
              if (html[i + 1] == '}') {
                tagready = 1;
              } else {
                buf += char;
              }
            }
          } else {
            if (char == '<') {
              intag = 1;
              buf = '';
              if (text.length && el) { el.appendChild(document.createTextNode(text)); text = ''; }
              if (/[a-z0-9_]/i.test(html[i + 1])) {
                tagready = 0;
                if (godown) {
                  parent = el;
                  goup = 0;
                } else {
                  godown++;
                  goup = 0;
                }
              } else
                if (html[i + 1] == '/') {
                  closingtag = 1;
                }
            } else
              if (char == '{') {
                inspectag = 1;
                tagready = 0;
                buf = '';
                if (text.length && el) { el.appendChild(document.createTextNode(text)); text = ''; }
              } else {
                text += char;
              }
          }
      }
      return dom;
    }

    selfDC.ready = function (a) {
      document.addEventListener("DOMContentLoaded", a);
    }

    var DCglo = [];
    var Groups = {};// consist of arrays of reference to dcs
    var LangDC = {};// references to dcs for multi language purposes

    (function () {
      var Events = { 'lang': 1 };// list of all pseudo-events

      selfDC.setPseudo = arr => {
        if (typeof arr == 'string') arr = [arr];
        arr.forEach(name => {
          if (Events[name]) return;
          Events[name] = [];
        });
      }

      selfDC.newPseudo = (name, dc) => {
        if (!Events[name]) return;
        Events[name].push(dc);
      }

      selfDC.isPseudo = name => {
        return Events[name] ? true : false;
      }

      selfDC.emit = name => {
        if (!Events[name]) return;
        Events[name].forEach(dc => {
          dc['on' + name]();
        });
      }
    } ());

    selfDC.lang = function () {
      var current;// current language indicator [en,uk etc.]
      var Lang = {};// language specific phrases
      var fn = phrase => {
        if (!current) {
          console.log('Error. Language was not set');
          return 'undefined';
        }
        return Lang[current][phrase];
      }

      fn.set = obj => {
        for (var lang in obj) {
          Lang[lang] = obj[lang];
        }
        return fn;
      }

      fn.get = obj => {
        return current;
      }

      fn.ready = lang => {
        return Lang[lang] ? true : false;
      }

      fn.turn = lang => {
        if (lang != current) {
          current = lang;
          for (var key in LangDC) {
            var obj = LangDC[key];
            if (obj.f) {
              obj.f();
            } else {
              switch (obj.type) {
                case 'html':
                  obj.dc.change({ html: selfDC.lang(obj.dc.state.ihtml) });
                  break;
                case 'placeholder':
                  obj.dc.change({ placeholder: selfDC.lang(obj.dc.state.iholder) });
                  break;
                default:
                  obj.dc.change({ text: selfDC.lang(obj.dc.state.itext) });
                  break;
              };
            }
          }
        }
      }

      return fn;
    } ();

    var DCid = 0;
    var a, b, c;// temp reference
    // DC.all not recommend to be used in production mode
    // selfDC.all = function(){
    //   return DCglo;
    // }

    selfDC.sel = function (v, one) {
      var el;
      if (typeof v == 'object') {
        if (v === document) {
          return document;
        } else {
          return v instanceof Element ? v : v.el;
        }
      } else if (v[0] == '#') {
        el = document.getElementById(v.substr(1));
      } else {
        one ?
          el = document.querySelector(v) :
          el = document.querySelectorAll(v);
      }
      if (!el.length && !(el instanceof Element)) return false;
      return el;
    }

    selfDC.onwindow = function (e, f) {
      window.addEventListener(e, f);
    }

    selfDC.forg = function (a, f) {
      if (f) {
        if (Groups[a]) Groups[a].forEach(function (dc) {
          f(dc);
        });
      } else {
        return Groups[a];
      }
    }

    function apply_set_get(object, set_get) {
      for (let prop in set_get) Object.defineProperty(object, prop, set_get[prop]);
    }

    var DomCom = function (obj) {
      if (!obj) { obj = {}; } else if (!obj.temp) {
        DCglo.push(this);
      }
      if (obj.getSelf) {
        obj.getSelf(this);
      }
      var instance = this;
      var selfid = ++DCid;
      const state = {
        class: ''
      };
      const data = {};
      instance.state = state;
      instance.data = data;
      apply_set_get(instance, {
        id: {
          get() {
            return selfid;
          }
        },
        t: {
          get() {
            return instance.el.textContent;
          },
          set(text) {
            state.text = text;
            instance.el.textContent = text;
          }
        },
        h: {
          get() {
            return instance.el.innerHTML;
          },
          set(html) {
            state.html = html;
            instance.el.innerHTML = html;
          }
        },
        v: {
          get() {
            return instance.el.value;
          },
          set(val) {
            state.val = val;
            instance.el.value = val;
          }
        },
        d: {
          get() {
            return data;
          },
          set(val) {
            console.log('error. you cannot change data reference');
          }
        }
      });
      instance.eltype = obj.eltype ? obj.eltype : 'div';
      instance.el = document.createElement(instance.eltype);
      if (obj.extend) {
        instance.extend(obj.extend);
      }
      if (obj.state) {
        for (var prop in obj.state) {
          if (prop == 'class') {
            instance.state.class = obj.state[prop];
          } else {
            if (prop == 'itext' || prop == 'ihtml' || prop == 'iholder') {
              LangDC[selfid] = {
                dc: instance
              };
              if (prop == 'ihtml') {
                LangDC[selfid].type = 'html';
                instance.h = selfDC.lang(obj.state.ihtml);
              } else if (prop == 'iholder') {
                LangDC[selfid].type = 'placeholder';
                instance.state.placeholder = selfDC.lang(obj.state.iholder);
              } else {
                LangDC[selfid].type = 'itext';
                instance.t = selfDC.lang(obj.state.itext);
              }
            }
            instance.state[prop] = obj.state[prop];
          }
        }
      }
      if (obj.attrs) {
        for (var prop in obj.attrs) {
          a = {};
          a[prop] = obj.attrs[prop];
          if (prop == 'value') { instance.state.val = obj.attrs[prop]; } else { instance.state[prop] = obj.attrs[prop]; }
          instance.el.attr(a);
        }
      }
      if (obj.groups) {
        b = obj.groups;
        instance.groups = b;
        a = Groups[b];
        if (a) {
          Groups[b].push(instance);
        } else {
          Groups[b] = [instance];
        }
      }
      if (typeof obj.chapi == 'function') {
        instance.chapi = obj.chapi;
      }
      if (obj.init) {
        instance.init = obj.init;
        instance.init();
      } else if (obj.initLater) {
        instance.init = obj.initLater;
      }
      if (obj.data) {
        instance.data = obj.data;
      }
      if (obj.events) {// should be last obj method
        instance.addEvents(obj.events);
      }
    }

    // use prototype for performance reasons
    DomCom.prototype.parentEl = false;

    DomCom.prototype.insertIn = DomCom.prototype.iIn = function (target) {
      var el = selfDC.sel(target, 1);
      el.appendChild(this.el);
      this.parentEl = el;
      return this.render();
    }

    DomCom.prototype.insertAs = DomCom.prototype.iAs = function (target) {
      var el = selfDC.sel(target, 1);
      this.el = el;
      return this.render({});
    }

    DomCom.prototype.change = function (state, api) {
      var only = {}, i = 0;
      if (api) {
        if (this.chapi && state) {// onChange API
          this.chapi(state);
          return;
        }
      }
      for (var b in state) {
        this.state[b] = state[b], only[b] = true;
        if (['html', 'text', 'val', 'placeholder', 'class'].indexOf(b) + 1) i++;
      }
      if (i) { this.render(only); } else { return this; }
    }

    DomCom.prototype.hasClass = function (v) {
      var cur = this.state.class;
      cur = cur.split(' ');
      return cur.indexOf(v) > -1;
    }

    DomCom.prototype.addClass = function (v) {
      var cur = this.state.class;
      cur = cur.split(' ');
      if(cur.indexOf(v) == -1){
        cur.push(v);
        this.state.class = this.el.classList = cur.join(' ');
      }
    }

    DomCom.prototype.removeClass = function (v) {
      var cur = this.state.class;
      cur = cur.split(' ');
      if(cur.indexOf(v) > -1){
        cur.splice(cur.indexOf(v),1);
        this.state.class = this.el.classList = cur.join(' ');
      }
    }

    DomCom.prototype.toggleClass = function (v) {
      this.hasClass(v)?
      this.removeClass(v):
      this.addClass(v);
    }

    DomCom.prototype.eventsArr = [];
    DomCom.prototype.intervalArr = [];
    DomCom.prototype.interval = function (f, t) {
      this.intervalArr.push(setInterval(f, t));
    }

    DomCom.prototype.clearIntervals = function () {
      this.intervalArr.forEach(function (v) {
        clearInterval(v);
      });
    }

    DomCom.prototype.timeoutArr = [];
    DomCom.prototype.timeout = function (f, t) {
      this.timeoutArr.push(setTimeout(f, t));
    }

    DomCom.prototype.clearTimeouts = function () {
      this.timeoutArr.forEach(function (v) {
        clearTimeout(v);
      });
    }

    DomCom.prototype.remove = function () {
      this.el.remove();
      this.removed = true;
      this.clearIntervals();
      return true;
    }

    DomCom.prototype.replaceWith = function (node, ishtml) {
      if (typeof node == 'string') {
        if (ishtml) {
          node = parseHTML(node);
        } else {
          node = document.createTextNode(node);
        }
      } else if ('el' in node) {
        // if `node` is dc
        if(node.state) for(let prop in node.state) this.state[prop] = node.state[prop];
        node = node.el;
      }
      this.el.parentNode.replaceChild(node, this.el);
      this.el = node;
    }

    DomCom.prototype.parse = function (html, ctx) {// parse string as html and insert accordingly contextual elements as dcs
      var dom = parseHTML(html, ctx);
      this.el = dom;
      if (dom.attr('class')) this.state.class = dom.attr('class');
      return this;
    }

    DomCom.prototype.extend = function (obj) {// set or rewrite methods and properties of dc
      var self = this;
      for (var prop in obj) {
        if (prop == 'events') {
          self.addEvents(obj[prop]);
        } else {
          self[prop] = obj[prop];
        }
      }
    }

    DomCom.prototype.addEvents = function (obj) {
      var self = this;
      for (var prop in obj) {
        if (selfDC.isPseudo(prop)) {
          if (prop == 'lang') {
            LangDC[self.id] = {
              dc: self,
              f: obj[prop].bind(self)
            }
          } else {
            selfDC.newPseudo(prop, self);
          }
          self['on' + prop] = obj[prop].bind(self);
        } else {
          self.eventsArr.push(prop);
          self['on' + prop] = obj[prop].bind(self.el);
          self.el.addEventListener(prop, self['on' + prop]);
        }
      }
    }

    DomCom.prototype.DClist = function (v) {
      var self = this;
      self.change({ html: '' });
      v.map(function (a) {
        a.insertIn(self);
      });
      return self;
    }

    DomCom.prototype.render = function (only) {
      var state = this.state, cs;
      if (only) {
        if ('html' in only) this.el.innerHTML = state.html;
        if ('text' in only) this.el.textContent = state.text;
        if ('val' in only) this.el.value = state.val;
        if ('placeholder' in only) this.el.placeholder = state.placeholder;
        if ('class' in only) {
          cs = state.class;
          cs = typeof cs == 'string' ? cs : cs.join(' ');
          this.el.attr({ class: cs });
        }
      } else {
        if (state.html && state.html != this.el.innerHTML) this.el.innerHTML = state.html;
        if (state.text && state.text != this.el.textContent) this.el.textContent = state.text;
        if (state.val && state.val != this.el.value) this.el.value = state.val;
        if (state.placeholder && state.placeholder != this.el.placeholder) this.el.placeholder = state.placeholder;
        if (state.class) {
          cs = state.class;
          cs = typeof cs == 'string' ? cs : cs.join(' ');
          this.el.attr({ class: cs });
        }
      }
      return this;
    }

    selfDC.make = function (obj) {
      if (typeof obj == 'function') obj = obj();
      return new DomCom(obj);
    }

    selfDC.temp = function (obj) {
      if (typeof obj == 'function') obj = obj();
      if (typeof obj == 'undefined') obj = {};
      obj.temp = 1;
      return new DomCom(obj);
    }

    selfDC.module = function () {
      var fn = function (name, script) {
        if (!name) {
          console.log('loaded module have wrong structure');
          return;
        }
        if (!script) return fn.loaded[name];
        fn.loaded[name] = script;
      }
      fn.loaded = {};
      fn.run = function (name, obj) {
        var data = obj.data;
        var api = obj.ready;
        if (fn.loaded[name]) {
          if (!data) data = {};
          var module = fn.loaded[name](data);
          fn.loaded[name] = module;
          if (api) api(module.dc, module.api);
        } else {
          obj.err && obj.err('module "' + name + '" not loaded');
        }
      }
      return fn;
    } ();

    selfDC.load = function () {
      var loaded = selfDC.module.loaded;
      var mn_src;
      var fn = function (obj) {
        var name = obj.name;
        if (loaded[name] && !obj.force) {
          if (obj.exist) {
            var module = loaded[name];
            if (typeof obj.exist == 'function') obj.exist(module.dc, module.api);
          } else {
            obj.err && obj.err('module "' + name + '" already loaded. Use `force` to load it again');
          }
          return;
        }
        obj.start && obj.start();
        if (obj.css) {
          selfDC.temp({
            eltype: 'link',
            attrs: {
              rel: 'stylesheet',
              href: mn_src + 'css/' + name + '.css'
            },
            events: {
              load() {
                load_script();
              },
              error(err) {
                obj.err && obj.err('css for module "' + name + '" ' + "can't be loaded");
              }
            }
          })
            .insertIn(document.head);
        } else {
          load_script();
        }
        function load_script() {
          if (obj.raw) {
            if (obj.rawcss) selfDC.temp({
              eltype: 'style',
              state: {
                text: obj.rawcss
              }
            })
              .insertIn(document.head);
            selfDC.temp({
              eltype: 'script',
              state: {
                text: obj.raw
              }
            })
              .insertIn(document.head);
            selfDC.module.run(name, obj);
          } else {
            var src = mn_src + name;
            selfDC.temp({
              eltype: 'script',
              attrs: {
                src: src + '.js'
              },
              events: {
                load() {
                  selfDC.module.run(name, obj);
                  this.remove();
                },
                error() {
                  obj.err && obj.err('module "' + name + '" ' + "can't be loaded");
                }
              }
            })
              .insertIn(document.head);
          }
        }
      }
      fn.config = function (obj) {
        if (obj.src) mn_src = obj.src;
      }
      return fn;
    } ();
  }
  DC = new DC;

  window.DC = DC;
  window.$ = DC.sel;

} ());