/*

 DomCom framework, 2016,
 Oleksii Shnyra, UABRO

 */
!function () {
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
    let prop;
    if (typeof obj == 'string') {
      return this.style[obj];
    }
    for (let i in obj) {
      prop = obj[i];
      if (typeof prop != 'string') prop += 'px';
      this.style[i] = prop;
    }
    return this;
  };

  Element.prototype.resize = document.resize = function (obj) {
    let prop;
    console.log('ok');
  };

  Element.prototype.attr = function (a) {
    if (typeof a == 'string') {
      return this.getAttribute(a);
    } else {
      for (let b in a) {
        this.setAttribute(b, a[b]);
      }
      return true;
    }
  };

  Element.prototype.show = function (v) {
    if (!arguments.length) v = 'block';
    this.style.display = v;
  };

  Element.prototype.hide = function () {
    this.style.display = 'none';
  };

  Element.prototype.height = function () {
    return this.offsetHeight;
  };

  Element.prototype.width = function () {
    return this.offsetWidth;
  };

  Element.prototype.text = function (v) {
    if (v) {
      this.textContent = v;
    } else {
      return this.textContent;
    }
  };

  Element.prototype.html = function (v) {
    if (v) {
      this.innerHTML = v;
    } else {
      return this.innerHTML;
    }
  };

  Element.prototype.val = function (v) {
    if (typeof v != 'undefined') {
      this.value = v;
    } else {
      return this.value;
    }
  };

  Element.prototype.crec = function () {
    return this.getBoundingClientRect();
  };

  function iterObj(obj, fn) {
    for(let key in obj) {
      if(!obj.hasOwnProperty(key)) continue;
      fn(key, obj[key]);
    }
  }

  // actual initialization of DC

  const DC = function () {
    let selfDC = this;
    Object.defineProperty(this, 'version', {
      get() {
        return '1.9.4';
      }
    });
    if (!window.Worker) {// support only modern browsers
      selfDC.ready = function () {
        document.addEventListener("DOMContentLoaded", function () {
          document.body.innerHTML = "<h1><b style='color:#000;padding:10px;'>You are using bad browser! What's wrong with you, man!???</b></h1>";
        });
      };
      return;
    }
    let parseHTML = function (html, ctx) {
      let a, el, char, parent, closingtag, godown = -1, goup,
        quoted, dom, attris, tagready, tagstarted, intag, inspectag,
        text = '',
        quote = '',
        buf = '';
      for (let i = 0; i < html.length; i++) {
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
            } else if (quoted) {
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
                  } else if (el && /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i.test(el.tagName)) el = el.parentNode;
                  closingtag = 0;
                }
              } else {
                if (char == '/') {
                  closingtag = 1;
                } else {
                  if (/[^a-z0-9_]/i.test(char)) {
                  } else {
                    attris += char;
                  }
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
            } else if (/[a-z0-9_]/i.test(char)) {
              tagstarted = 1;
              buf = char;
            }
          }
        } else if (inspectag) {// for operations between "{" && "}"
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
            if (text.length && el) {
              el.appendChild(document.createTextNode(text));
              text = '';
            }
            if (/[a-z0-9_]/i.test(html[i + 1])) {
              tagready = 0;
              if (godown) {
                parent = el;
                goup = 0;
              } else {
                godown++;
                goup = 0;
              }
            } else if (html[i + 1] == '/') {
              closingtag = 1;
            }
          } else if (char == '{') {
            inspectag = 1;
            tagready = 0;
            buf = '';
            if (text.length && el) {
              el.appendChild(document.createTextNode(text));
              text = '';
            }
          } else {
            text += char;
          }
        }
      }
      return dom;
    };

    selfDC.ready = function (a) {
      document.addEventListener("DOMContentLoaded", a);
    };

    let Groups = {};// consist of arrays of reference to dcs
    let LangDC = {};// references to dcs for multi language purposes

    (function () {
      let Events = {'lang': 1};// list of all pseudo-events

      selfDC.setPseudo = arr => {
        if (typeof arr == 'string') arr = [arr];
        arr.forEach(name => {
          if (Events[name]) return;
          Events[name] = [];
        });
      };

      selfDC.newPseudo = (name, dc) => {
        if (!Events[name]) return;
        Events[name].push(dc);
      };

      selfDC.isPseudo = name => {
        return !!Events[name];
      };

      selfDC.emit = (name, data) => {
        if (!Events[name]) return;
        Events[name].forEach(dc => {
          dc['on' + name](data);
        });
      }
    }());

    selfDC.lang = function () {
      let current;// current language indicator [en,uk etc.]
      let Lang = {};// language specific phrases
      let fn = phrase => {
        if (!current) {
          console.log('Error. Language was not set');
          return 'undefined';
        }
        return Lang[current][phrase];
      };

      fn.set = obj => {
        iterObj(obj, (key, val) => Lang[key] = val);
        return fn;
      };

      fn.get = () => {
        return current;
      };

      fn.ready = lang => {
        return !!Lang[lang];
      };

      fn.turn = lang => {
        if (lang != current) {
          current = lang;
          for (let key in LangDC) {
            let obj = LangDC[key];
            if (obj.f) {
              obj.f();
            } else {
              switch (obj.type) {
                case 'html':
                  obj.dc.change({html: selfDC.lang(obj.dc.state.ihtml)});
                  break;
                case 'placeholder':
                  obj.dc.change({placeholder: selfDC.lang(obj.dc.state.iholder)});
                  break;
                default:
                  obj.dc.change({text: selfDC.lang(obj.dc.state.itext)});
                  break;
              }
            }
          }
        }
      };

      return fn;
    }();

    let DCid = 0;
    let a, b;

    selfDC.sel = function (v, one) {
      let el;
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
    };

    selfDC.onwindow = function (e, f) {
      window.addEventListener(e, f);
    };

    selfDC.forg = function (a, f) {
      if (f) {
        if (Groups[a]) Groups[a].forEach(function (dc) {
          f(dc);
        });
      } else {
        return Groups[a];
      }
    };

    function apply_set_get(object, set_get) {
      for (let prop in set_get) Object.defineProperty(object, prop, set_get[prop]);
    }

    const DomCom = function (obj) {
      if (!obj) {
        obj = {};
      }
      if (obj.getSelf) {
        obj.getSelf(this);
      }
      let instance = this;
      let selfId = ++DCid;
      const state = {
        class: ''
      };
      const data = {};
      instance.state = state;
      instance.data = data;
      apply_set_get(instance, {
        id: {
          get() {
            return selfId;
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
      if (obj.elType) obj.eltype = obj.elType;
      instance.eltype = obj.eltype ? obj.eltype : 'div';
      instance.el = document.createElement(instance.eltype);
      if (obj.extend) {
        instance.extend(obj.extend);
      }
      if (obj.state) {
        iterObj(obj.state, (key, val) => {
          if (key === 'class') {
            instance.state.class = val;
          } else {
            if (key === 'itext' || key === 'ihtml' || key === 'iholder') {
              LangDC[selfId] = {
                dc: instance
              };
              if (key == 'ihtml') {
                LangDC[selfId].type = 'html';
                instance.h = selfDC.lang(val);
              } else if (key == 'iholder') {
                LangDC[selfId].type = 'placeholder';
                instance.state.placeholder = selfDC.lang(val);
              } else {
                LangDC[selfId].type = 'itext';
                instance.t = selfDC.lang(val);
              }
            }
            instance.state[key] = val;
          }
        });
      }
      if (obj.attrs) {
        iterObj(obj.attrs, (key, val) => {
          a = {};
          a[key] = val;
          if (key == 'value') {
            instance.state.val = val;
          } else {
            instance.state[key] = val;
          }
          instance.el.attr(a);
        });
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
    };

    // use prototype for performance reasons
    DomCom.prototype.parentEl = false;

    DomCom.prototype.insertIn = DomCom.prototype.iIn = function (target) {
      let el = selfDC.sel(target, 1);
      el.appendChild(this.el);
      this.parentEl = el;
      return this.render();
    };

    DomCom.prototype.insertAs = DomCom.prototype.iAs = function (target) {
      this.el = selfDC.sel(target, 1);
      return this.render({});
    };

    DomCom.prototype.change = function (state, api) {
      let only = {}, i = 0;
      if (api) {
        if (this.chapi && state) {// onChange API
          this.chapi(state);
          return;
        }
      }
      iterObj(state, (a, b) => {
        this.state[a] = b;
        only[a] = true;
        if (['html', 'text', 'val', 'placeholder', 'class'].indexOf(a) + 1) i++;
      });
      if (i) {
        this.render(only);
      } else {
        return this;
      }
    };

    DomCom.prototype.hasClass = function (v) {
      let cur = this.state.class;
      cur = cur.split(' ');
      return cur.indexOf(v) > -1;
    };

    DomCom.prototype.addClass = function (v) {
      let cur = this.state.class;
      cur = cur.split(' ');
      if (cur.indexOf(v) == -1) {
        cur.push(v);
        this.state.class = this.el.classList = cur.join(' ');
      }
    };

    DomCom.prototype.removeClass = function (v) {
      let cur = this.state.class;
      cur = cur.split(' ');
      if (cur.indexOf(v) > -1) {
        cur.splice(cur.indexOf(v), 1);
        this.state.class = this.el.classList = cur.join(' ');
      }
    };

    DomCom.prototype.toggleClass = function (v) {
      this.hasClass(v) ?
        this.removeClass(v) :
        this.addClass(v);
    };

    DomCom.prototype.eventsArr = [];
    DomCom.prototype.intervalArr = [];
    DomCom.prototype.interval = function (f, t) {
      this.intervalArr.push(setInterval(f, t));
    };

    DomCom.prototype.clearIntervals = function () {
      this.intervalArr.forEach(function (v) {
        clearInterval(v);
      });
    };

    DomCom.prototype.timeoutArr = [];
    DomCom.prototype.timeout = function (f, t) {
      this.timeoutArr.push(setTimeout(f, t));
    };

    DomCom.prototype.clearTimeouts = function () {
      this.timeoutArr.forEach(function (v) {
        clearTimeout(v);
      });
    };

    DomCom.prototype.remove = function () {
      this.el.remove();
      this.removed = true;
      this.clearIntervals();
      return true;
    };

    DomCom.prototype.replaceWith = function (node, ishtml) {
      if (typeof node == 'string') {
        if (ishtml) {
          node = parseHTML(node);
        } else {
          node = document.createTextNode(node);
        }
      } else if ('el' in node) {
        // if `node` is dc
        if (node.state) for (let prop in node.state) this.state[prop] = node.state[prop];
        node = node.el;
      }
      this.el.parentNode.replaceChild(node, this.el);
      this.el = node;
    };

    DomCom.prototype.parse = function (html, ctx) {// parse string as html and insert accordingly contextual elements as dcs
      let dom = parseHTML(html, ctx);
      this.el = dom;
      if (dom.attr('class')) this.state.class = dom.attr('class');
      return this;
    };

    DomCom.prototype.extend = function (obj) {// set or rewrite methods and properties of dc
      let self = this;
      iterObj(obj, (key, val) => {
        if (key == 'events') {
          self.addEvents(val);
        } else {
          self[key] = val;
        }
      });
    };

    DomCom.prototype.addEvents = function (obj) {
      let self = this;
      iterObj(obj, (key, val) => {
        if (selfDC.isPseudo(key)) {
          if (key == 'lang') {
            LangDC[self.id] = {
              dc: self,
              f: val.bind(self)
            }
          } else {
            selfDC.newPseudo(key, self);
          }
          self['on' + key] = val.bind(self);
        } else {
          self.eventsArr.push(key);
          self['on' + key] = val.bind(self.el);
          self.el.addEventListener(key, self['on' + key]);
        }
      });
    };

    DomCom.prototype.DClist = function (v) {
      let self = this;
      self.change({html: ''});
      v.map(function (a) {
        a.insertIn(self);
      });
      return self;
    };

    DomCom.prototype.render = function (only) {
      let state = this.state, cs;
      if (only) {
        if ('html' in only) this.el.innerHTML = state.html;
        if ('text' in only) this.el.textContent = state.text;
        if ('val' in only) this.el.value = state.val;
        if ('placeholder' in only) this.el.placeholder = state.placeholder;
        if ('class' in only) {
          cs = state.class;
          cs = typeof cs == 'string' ? cs : cs.join(' ');
          this.el.attr({class: cs});
        }
      } else {
        if (state.html && state.html != this.el.innerHTML) this.el.innerHTML = state.html;
        if (state.text && state.text != this.el.textContent) this.el.textContent = state.text;
        if (state.val && state.val != this.el.value) this.el.value = state.val;
        if (state.placeholder && state.placeholder != this.el.placeholder) this.el.placeholder = state.placeholder;
        if (state.class) {
          cs = state.class;
          cs = typeof cs == 'string' ? cs : cs.join(' ');
          this.el.attr({class: cs});
        }
      }
      return this;
    };

    selfDC.make = function (obj) {
      if (typeof obj == 'function') obj = obj();
      return new DomCom(obj);
    };

    selfDC.temp = function (obj) {
      if (typeof obj == 'function') obj = obj();
      if (typeof obj == 'undefined') obj = {};
      obj.temp = 1;
      return new DomCom(obj);
    };

    selfDC.module = function () {
      let fn = function (name, script) {
        if (!name) {
          console.log('loaded module have wrong structure');
          return;
        }
        if (!script) return fn.loaded[name];
        fn.loaded[name] = script;
      };
      fn.loaded = {};
      fn.run = function (name, obj) {
        let data = obj.data;
        let api = obj.ready;
        if (fn.loaded[name]) {
          if (!data) data = {};
          let module = fn.loaded[name](data);
          fn.loaded[name] = module;
          if (api) api(module.dc, module.api);
        } else {
          obj.err && obj.err('module "' + name + '" not loaded');
        }
      };
      return fn;
    }();

    const models = {};
    selfDC.model = (name, defaults) => {
      models[name] = defaults;
    };

    selfDC.getModel = name => {
      return models[name];
    };

    selfDC.getModels = () => {
      return models;
    };

    selfDC.from = (name, params) => {
      if (typeof name === 'function') return selfDC.temp(name(params));
      if (typeof params === 'function') params = params();
      let base = models[name];
      if (!base) {
        base = params;
      } else {
        base = base(params);
      }
      if (base instanceof DomCom) return base;
      return selfDC.temp(base);
    };

    selfDC.load = function () {
      let loaded = selfDC.module.loaded;
      let mn_src;
      let fn = function (obj) {
        let name = obj.name;
        if (loaded[name] && !obj.force) {
          if (obj.exist) {
            let module = loaded[name];
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
            let src = mn_src + name;
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
      };
      fn.config = function (obj) {
        if (obj.src) mn_src = obj.src;
      };
      return fn;
    }();
  };

  // shared objects
  DC.prototype.shared = {};
  // shared functions
  DC.prototype.fshared = {};

  DC.prototype.iterObj = iterObj;

  DC.prototype.instance = () => {
    return new DC;
  };

  DC.prototype.Emitter = function () {
    const events = {};
    this.on = (event, f) => {
      if (!events[event]) events[event] = [];
      events[event].push(f);
    };
    this.emit = (event, data) => {
      if (events[event]) events[event].forEach(f => f(data));
    }
  };

  DC.prototype.Rest = function () {
    const self = this;
    let headers = {};
    this.base = '';

    const request = (type) => (url, data) => sendRequest(type, url, data);

    this.get = request('GET');

    this.post = request('POST');

    this.put = request('PUT');

    this.delete = request('DELETE');

    this.patch = request('PATCH');

    this.setH = (key, val) => headers[key] = val;

    this.remH = key => delete headers[key];

    function sendRequest(type, url, data) {
      const request = new XMLHttpRequest();
      return new Promise((resolve, reject) => {
        request.open(type, self.base + url);

        request.onreadystatechange = function () {
          if (this.readyState === 4) {
            let res;
            try {
              res = JSON.parse(this.responseText);
            } catch (err) {
              res = {};
            }
            this.json = res;
            this.status === 200 ?
              resolve(res) :
              reject(this);
          }
        };

        for (let key in headers) {
          if (!headers.hasOwnProperty(key)) continue;
          request.setRequestHeader(key, headers[key]);
        }

        if (type === 'GET') {
          request.send();
        } else {
          request.setRequestHeader('Content-Type', 'application/json');
          request.send(JSON.stringify(data));
        }
      });
    }
  };

  let iDC = new DC;

  window.DC = iDC;
  window.$ = iDC.sel;

}();