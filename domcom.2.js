/**
 * @name DomCom framework, 2017,
 * @author Oleksii Shnyra, UABRO
 * @website https://uabro.com
 * @namespace DC
 * @version 2.0.3
 */

(function () {
  if (!window.Worker) {// support only modern browsers
    document.addEventListener("DOMContentLoaded", function () {
      document.body.innerHTML = "<h1><b style='color:#000;padding:10px;'>You are using bad browser! What's wrong with you, man!???</b></h1>";
    });
    return;
  }

  const DC = function () {
    return (tag = 'div', rules) => {
      if (typeof tag === 'function') {
        if (!rules) {
          const el = document.createElement('div');
          return DomRules.apply(el, tag(el));
        }
        tag = tag();
      }
      if (typeof tag === 'object' && !rules) {
        rules = tag;
        tag = 'div';
      }
      const el = document.createElement(tag);
      if (!rules) return el;
      return DomRules.apply(el, rules);
    };
  }();

  DC.Emitter = function () {
    const events = {};
    this.on = (event, f) => {
      if (!events[event]) events[event] = [];
      events[event].push(f);
    };
    this.emit = (event, data) => {
      if (events[event]) events[event].forEach(f => f(data));
    }
  };

  const gmtr = DC.gmtr = new DC.Emitter;

  const models = {};

  const iterNodes = (element, result = []) => {
    element.childNodes
      .forEach(n => {
        result.push(n);
        result.push(...iterNodes(n).map(e => e));
      });
    return result;
  };

  const iterObj = (obj, fn) => {
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      fn(key, obj[key]);
    }
  };

  Object.assign(Element.prototype, {
    show(v) {
      if (!arguments.length) v = 'block';
      this.style.display = v;
      return this;
    },
    hide() {
      this.show('none');
      return this;
    },
    attr(a) {
      if (typeof a == 'string') {
        return this.getAttribute(a);
      } else {
        iterObj(a, (k, v) => this.setAttribute(k, v));
        return this;
      }
    },
    crec() {
      return this.getBoundingClientRect();
    },
    clear() {
      this.h = '';
      return this;
    },
    css(obj) {
      if (typeof obj == 'string') return this.style[obj];
      iterObj(obj, (k, v) => {
        if (typeof v != 'string') v += 'px';
        this.style[k] = v;
      });
      return this;
    },
    into(target) {
      target.appendChild(this);
      return this;
    },
    prepend(target) {
      target.insertBefore(this, target.firstChild);
      return this;
    },
    before(target) {
      target.parentNode.insertBefore(this, target);
      return this;
    },
    after(target) {
      target.parentNode.insertBefore(this, target.nextSibling);
      return this;
    },
    instead(target) {
      this.before(target);
      target.remove();
      return this;
    },
    addClass(_class) {
      this.classList.add(_class);
      return this;
    },
    removeClass(_class) {
      this.classList.remove(_class);
      return this;
    },
    toggleClass(_class) {
      this.classList.toggle(_class);
      return this;
    },
    parse(html, ctx = {}) {
      this.h = html.replace(/{\w*}/gi, m => '<!--' + m + '-->');
      const comments = iterNodes(this).filter(n => n.nodeType === Element.COMMENT_NODE);
      comments.forEach(c => {
        const id = c.textContent.substr(1, c.textContent.length - 2);
        if (ctx[id]) ctx[id].instead(c);
      });
      return this;
    },
    list(array) {
      this.clear();
      array.forEach(e => e.into(this));
      return this;
    },
    extend(obj) {
      Object.assign(this, obj);
      return this;
    },
    on() {
      this.addEventListener.apply(this, arguments);
      return this;
    },
    events(obj) {
      iterObj(obj, (k, v) => this.on(k, v));
      return this;
    }
  });

  iterObj({
    t: {
      get() {
        return this.textContent;
      },
      set(text) {
        if (this.textContent !== text) this.textContent = text;
      }
    },
    h: {
      get() {
        return this.innerHTML;
      },
      set(html) {
        if (this.innerHTML !== html) this.innerHTML = html;
      }
    },
    v: {
      get() {
        return this.value;
      },
      set(val) {
        if (this.value !== val) this.value = val;
      }
    },
    ph: {
      get() {
        return this.placeholder;
      },
      set(val) {
        if (this.placeholder !== val) this.placeholder = val;
      }
    },
    c: {
      get() {
        return this.classList;
      },
      set(val) {
        if (this.classList !== val) this.classList = val;
      }
    },
    accommodate: {
      set(el) {
        this.clear().appendChild(el);
      }
    },
  }, (k, v) => Object.defineProperty(Element.prototype, k, v));

  function _dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  Object.defineProperty(Array.prototype, "sortBy", {
    enumerable: false,
    writable: true,
    value: function () {
      return this.sort(_dynamicSort.apply(null, arguments));
    }
  });

  class DomRules {
    constructor(tag, rules) {
      DomRules.init();
      tag = tag.toLowerCase();
      if (!DomRules.tags[tag]) DomRules.tags[tag] = [];
      DomRules.tags[tag].push(rules);
    }

    static apply(element, rules = {}) {
      if (typeof rules === 'function') rules = rules(element);
      const prevented = rules.prevented ? rules.prevented.map(a => a) : null;
      if (rules.events) iterObj(rules.events, (k, v) => {
        if (k === 'keypress' && rules.events.enter) return;
        if (prevented) {
          const index = prevented.indexOf(k);
          if (~index) {
            const orig = v;
            v = function (e) {
              e.preventDefault();
              return orig.apply(element, arguments);
            };
            prevented.splice(index, 1);
          }
        }
        if (k === 'enter') {
          return element.addEventListener('keypress', e => {
            if (e.keyCode === 13 && !e.shiftKey) return v.bind(element)(e);
            rules.events.keypress && rules.events.keypress(e);
          });
        }
        element.addEventListener(k, v);
      });
      if (rules.attr) element.attr(rules.attr);
      if (rules.c) element.c = rules.c;
      if (rules.style) element.style = rules.style;
      if (rules.extend) element.extend(rules.extend);
      if ('t' in rules) element.t = rules.t;
      if ('v' in rules) element.v = rules.v;
      if ('h' in rules) element.h = rules.h;
      if ('ph' in rules) element.ph = rules.ph;
      if (rules.gmtr) iterObj(rules.gmtr, (k, v) => gmtr.on(k, v));
      prevented && prevented.forEach(k => element.addEventListener(k, e => e.preventDefault()));
      rules.init && rules.init.bind(element)();
      return element;
    }

    static forTag(element, tag) {
      const arr = DomRules.tags[tag];
      if (!arr) return;
      arr.forEach(rules => DomRules.apply(element, rules));
    }

    static init() {
      if (DomRules.initialized) return;
      DomRules.tags = {};
      new MutationObserver(a => a.forEach(a => {
        a.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            DomRules.forTag(node, node.nodeName.toLowerCase());
            Array.prototype.forEach.call(node.attributes, a => DomRules.forTag(node, '_' + a.name));
          }
        });
        // a.removedNodes.forEach(node => {
        //   if (node.nodeType === Node.ELEMENT_NODE) {
        //   }
        // })
      }))
        .observe(document.body, {childList: true, subtree: true, attributes: true});
      DomRules.initialized = true;
    }
  }

  class LivePrimitive {
    constructor(key, liveObject) {
      this.key = key;
      this.listeners = [];
      this.liveObject = liveObject;
    }

    set(val) {
      if (this.val === val) return;
      this.val = val;
      this.listeners.forEach(cb => cb(val));
      return this;
    }

    def(val) {
      this.default = val;
      return this;
    }

    then(cb) {
      this.listeners.push(cb);
      cb(this.val || this.default || this.liveObject.getDef(this.key));
      return this;
    }
  }

  class LiveObject {
    constructor() {
      this.storage = {};
      this.defaults = {};
    }

    get(key, cb) {
      const q = this.storage[key] || new LivePrimitive(key, this);
      if (!this.storage[key]) this.storage[key] = q;
      if (cb) return q.then(cb);
      return q;
    }

    set(key, val) {
      return this.get(key).set(val);
    }

    def(key, val) {
      this.defaults[key] = val;
    }

    getDef(key) {
      return this.defaults[key] || this.default;
    }
  }

  class Router {
    constructor() {
      this.rules = [];
      DC.onwindow('popstate', e => this.checkRules());
    }

    rule(pattern, fn) {
      this.rules.push({pattern, fn});
    }

    checkRules(data) {
      for (let i = this.rules.length - 1; i >= 0; i -= 1) {
        const o = this.rules[i];
        if (location.pathname.match(o.pattern)) {
          o.fn(data);
          break;
        }
      }
    }

    go(url, query, data) {
      if (query) {
        url += '?';
        DC.iterObj(query, (k, v) => {
          url += `${k}=${v}`
        });
      }
      history.pushState(null, null, url);
      this.checkRules(data);
    }
  }

  Object.defineProperty(Router.prototype, 'query', {
    get() {
      const arr = location.search.substr(1).split('&');
      const keys = {};
      if (!arr.length || arr[0] === '') return keys;
      arr.forEach(s => {
        const r = s.split('=');
        keys[r[0].toLowerCase()] = r[1];
      });
      return keys;
    }
  });

  DC.model = (name, tag, defaults) => {
    if (!defaults) {
      defaults = tag;
    } else {
      defaults.tag = tag;
    }
    models[name] = defaults;
  };

  DC.getModel = name => {
    return models[name];
  };

  DC.getModels = () => {
    return models;
  };

  DC.from = (name, params = {}) => {
    if (typeof params === 'function') params = params();
    const model = models[name];
    if (!model) return console.log('model not found. Check model name', name);
    let obj = model(params);
    if (obj instanceof Element) return obj;
    return DC(model.tag || 'div', obj);
  };

  DC.module = function () {
    let fn = function (name, script) {
      if (!name) {
        console.log('loaded module has wrong structure');
        return;
      }
      if (!script) return fn.loaded[name];
      fn.loaded[name] = script;
    };
    fn.loaded = {};
    fn.run = function (name, obj) {
      if (fn.loaded[name]) {
        obj.ready && obj.ready(fn.loaded[name] = fn.loaded[name](obj.data || {}));
      } else {
        obj.err && obj.err('module "' + name + '" not loaded');
      }
    };
    return fn;
  }();

  DC.load = function () {
    let loaded = DC.module.loaded;
    let mn_src = '/modules/';
    let fn = function (obj) {
      let name = obj.name;
      if (loaded[name] && !obj.force) {
        if (obj.exist) {
          let module = loaded[name];
          if (typeof obj.exist == 'function') obj.exist(module);
        } else {
          obj.err && obj.err('module "' + name + '" already loaded. Use `force` to load it again');
        }
        return;
      }
      obj.start && obj.start();
      if (obj.css) {
        DC('link', {
          attr: {
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
        }).into(document.head);
      } else {
        load_script();
      }
      function load_script() {
        if (obj.raw) {
          if (obj.rawcss) DC('style').into(document.head).t = obj.rawcss;
          new Function(obj.raw);
          DC.module.run(name, obj);
        } else {
          let src = mn_src + name;
          DC('script', {
            attr: {
              src: src + '.js'
            },
            events: {
              load() {
                DC.module.run(name, obj);
                this.remove();
              },
              error() {
                obj.err && obj.err('module "' + name + '" ' + "can't be loaded");
              }
            }
          }).into(document.head);
        }
      }
    };
    fn.config = function (obj) {
      if (obj.src) mn_src = obj.src;
    };
    return fn;
  }();

  DC.Rest = function () {
    const self = this;
    let headers = {};
    this.base = '';

    const request = (type) => function(url, data) {
      return sendRequest.bind(this)(type, url, data);
    };

    function Pre(request, headers) {
      this._request = request;
      this._headers = headers;
    }

    this.get = Pre.prototype.get = request('GET');

    this.post = Pre.prototype.post = request('POST');

    this.put = Pre.prototype.put = request('PUT');

    this.delete = Pre.prototype.delete = request('DELETE');

    this.patch = Pre.prototype.patch = request('PATCH');

    this.setH = (key, val) => headers[key] = val;

    this.remH = key => delete headers[key];

    this.headers = obj => {
      const request = new XMLHttpRequest();
      return new Pre(request, obj);
    };

    this.xhr = fn => {
      const request = new XMLHttpRequest();
      fn(request);
      return new Pre(request);
    };

    function sendRequest(type, url, data) {
      const pre = this;
      const request = this._request || new XMLHttpRequest();
      return new Promise((resolve, reject) => {
        if(!url) url = '';
        if(type === 'GET' && data) {
          url += url.match(/\\?/) ? '&' : '?';
          const query = [];
          iterObj(data, (k,v) => {
            query.push(`${k}=${v}`);
          });
          url += query.join('&');
        }
        request.open(type, self.base + url);

        if (pre._headers) DC.iterObj(pre._headers, (k, v) => {
          request.setRequestHeader(k, v);
        });

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

  DC.ready = fn => document.addEventListener("DOMContentLoaded", function () {
    fn && fn();
  });

  DC.onwindow = function (e, f) {
    window.addEventListener(e, f);
  };

  DC.DomRules = DomRules;
  DC.Router = Router;
  DC.LiveObject = LiveObject;
  DC.iterObj = iterObj;
  // shared references
  DC.shared = {};
  // shared functions
  DC.fshared = {};
  // global live object
  DC.live = new DC.LiveObject();
  // global emitter
  window.gmtr = gmtr;
  iterObj({
    live: {
      get() {
        return DC.live;
      },
    }
  }, (k, v) => Object.defineProperty(window, k, v));

  window.DC = DC;
  window.$ = document.querySelector.bind(document);
  window.$$ = document.querySelectorAll.bind(document);

})();