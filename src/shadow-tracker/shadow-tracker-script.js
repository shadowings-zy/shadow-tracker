!(function (t) {
  var n = {};
  function e(r) {
    if (n[r]) return n[r].exports;
    var o = (n[r] = { i: r, l: !1, exports: {} });
    return t[r].call(o.exports, o, o.exports, e), (o.l = !0), o.exports;
  }
  (e.m = t),
    (e.c = n),
    (e.d = function (t, n, r) {
      e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: r });
    }),
    (e.r = function (t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (e.t = function (t, n) {
      if ((1 & n && (t = e(t)), 8 & n)) return t;
      if (4 & n && 'object' == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (e.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: t }),
        2 & n && 'string' != typeof t)
      )
        for (var o in t)
          e.d(
            r,
            o,
            function (n) {
              return t[n];
            }.bind(null, o)
          );
      return r;
    }),
    (e.n = function (t) {
      var n =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return e.d(n, 'a', n), n;
    }),
    (e.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }),
    (e.p = ''),
    e((e.s = 91));
})([
  function (t, n, e) {
    var r = e(20)('wks'),
      o = e(15),
      i = e(6).Symbol,
      a = 'function' == typeof i;
    (t.exports = function (t) {
      return r[t] || (r[t] = (a && i[t]) || (a ? i : o)('Symbol.' + t));
    }).store = r;
  },
  function (t, n, e) {
    var r = e(10);
    t.exports = function (t) {
      if (!r(t)) throw TypeError(t + ' is not an object!');
      return t;
    };
  },
  function (t, n, e) {
    t.exports = !e(5)(function () {
      return (
        7 !=
        Object.defineProperty({}, 'a', {
          get: function () {
            return 7;
          }
        }).a
      );
    });
  },
  function (t, n, e) {
    var r = e(6),
      o = e(13),
      i = e(7),
      a = e(8),
      c = e(41),
      u = function (t, n, e) {
        var s,
          l,
          f,
          p,
          d = t & u.F,
          v = t & u.G,
          g = t & u.S,
          h = t & u.P,
          y = t & u.B,
          m = v ? r : g ? r[n] || (r[n] = {}) : (r[n] || {}).prototype,
          b = v ? o : o[n] || (o[n] = {}),
          w = b.prototype || (b.prototype = {});
        for (s in (v && (e = n), e))
          (f = ((l = !d && m && void 0 !== m[s]) ? m : e)[s]),
            (p = y && l ? c(f, r) : h && 'function' == typeof f ? c(Function.call, f) : f),
            m && a(m, s, f, t & u.U),
            b[s] != f && i(b, s, p),
            h && w[s] != f && (w[s] = f);
      };
    (r.core = o),
      (u.F = 1),
      (u.G = 2),
      (u.S = 4),
      (u.P = 8),
      (u.B = 16),
      (u.W = 32),
      (u.U = 64),
      (u.R = 128),
      (t.exports = u);
  },
  function (t, n, e) {
    var r = e(1),
      o = e(39),
      i = e(25),
      a = Object.defineProperty;
    n.f = e(2)
      ? Object.defineProperty
      : function (t, n, e) {
          if ((r(t), (n = i(n, !0)), r(e), o))
            try {
              return a(t, n, e);
            } catch (t) {}
          if ('get' in e || 'set' in e) throw TypeError('Accessors not supported!');
          return 'value' in e && (t[n] = e.value), t;
        };
  },
  function (t, n) {
    t.exports = function (t) {
      try {
        return !!t();
      } catch (t) {
        return !0;
      }
    };
  },
  function (t, n) {
    var e = (t.exports =
      'undefined' != typeof window && window.Math == Math
        ? window
        : 'undefined' != typeof self && self.Math == Math
        ? self
        : Function('return this')());
    'number' == typeof __g && (__g = e);
  },
  function (t, n, e) {
    var r = e(4),
      o = e(14);
    t.exports = e(2)
      ? function (t, n, e) {
          return r.f(t, n, o(1, e));
        }
      : function (t, n, e) {
          return (t[n] = e), t;
        };
  },
  function (t, n, e) {
    var r = e(6),
      o = e(7),
      i = e(9),
      a = e(15)('src'),
      c = e(62),
      u = ('' + c).split('toString');
    (e(13).inspectSource = function (t) {
      return c.call(t);
    }),
      (t.exports = function (t, n, e, c) {
        var s = 'function' == typeof e;
        s && (i(e, 'name') || o(e, 'name', n)),
          t[n] !== e &&
            (s && (i(e, a) || o(e, a, t[n] ? '' + t[n] : u.join(String(n)))),
            t === r
              ? (t[n] = e)
              : c
              ? t[n]
                ? (t[n] = e)
                : o(t, n, e)
              : (delete t[n], o(t, n, e)));
      })(Function.prototype, 'toString', function () {
        return ('function' == typeof this && this[a]) || c.call(this);
      });
  },
  function (t, n) {
    var e = {}.hasOwnProperty;
    t.exports = function (t, n) {
      return e.call(t, n);
    };
  },
  function (t, n) {
    t.exports = function (t) {
      return 'object' == typeof t ? null !== t : 'function' == typeof t;
    };
  },
  function (t, n, e) {
    var r = e(44),
      o = e(22);
    t.exports = function (t) {
      return r(o(t));
    };
  },
  function (t, n, e) {
    var r = e(23),
      o = Math.min;
    t.exports = function (t) {
      return t > 0 ? o(r(t), 9007199254740991) : 0;
    };
  },
  function (t, n) {
    var e = (t.exports = { version: '2.6.12' });
    'number' == typeof __e && (__e = e);
  },
  function (t, n) {
    t.exports = function (t, n) {
      return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: n };
    };
  },
  function (t, n) {
    var e = 0,
      r = Math.random();
    t.exports = function (t) {
      return 'Symbol('.concat(void 0 === t ? '' : t, ')_', (++e + r).toString(36));
    };
  },
  function (t, n, e) {
    var r = e(43),
      o = e(28);
    t.exports =
      Object.keys ||
      function (t) {
        return r(t, o);
      };
  },
  function (t, n) {
    var e = {}.toString;
    t.exports = function (t) {
      return e.call(t).slice(8, -1);
    };
  },
  function (t, n, e) {
    var r = e(22);
    t.exports = function (t) {
      return Object(r(t));
    };
  },
  function (t, n) {
    t.exports = {};
  },
  function (t, n, e) {
    var r = e(13),
      o = e(6),
      i = o['__core-js_shared__'] || (o['__core-js_shared__'] = {});
    (t.exports = function (t, n) {
      return i[t] || (i[t] = void 0 !== n ? n : {});
    })('versions', []).push({
      version: r.version,
      mode: e(21) ? 'pure' : 'global',
      copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
    });
  },
  function (t, n) {
    t.exports = !1;
  },
  function (t, n) {
    t.exports = function (t) {
      if (null == t) throw TypeError("Can't call method on  " + t);
      return t;
    };
  },
  function (t, n) {
    var e = Math.ceil,
      r = Math.floor;
    t.exports = function (t) {
      return isNaN((t = +t)) ? 0 : (t > 0 ? r : e)(t);
    };
  },
  function (t, n) {
    n.f = {}.propertyIsEnumerable;
  },
  function (t, n, e) {
    var r = e(10);
    t.exports = function (t, n) {
      if (!r(t)) return t;
      var e, o;
      if (n && 'function' == typeof (e = t.toString) && !r((o = e.call(t)))) return o;
      if ('function' == typeof (e = t.valueOf) && !r((o = e.call(t)))) return o;
      if (!n && 'function' == typeof (e = t.toString) && !r((o = e.call(t)))) return o;
      throw TypeError("Can't convert object to primitive value");
    };
  },
  function (t, n, e) {
    var r = e(3);
    r(r.S + r.F, 'Object', { assign: e(63) });
  },
  function (t, n, e) {
    var r = e(20)('keys'),
      o = e(15);
    t.exports = function (t) {
      return r[t] || (r[t] = o(t));
    };
  },
  function (t, n) {
    t.exports =
      'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
        ','
      );
  },
  function (t, n) {
    n.f = Object.getOwnPropertySymbols;
  },
  function (t, n, e) {
    'use strict';
    var r = e(49)(!0);
    t.exports = function (t, n, e) {
      return n + (e ? r(t, n).length : 1);
    };
  },
  function (t, n, e) {
    'use strict';
    var r = e(32),
      o = RegExp.prototype.exec;
    t.exports = function (t, n) {
      var e = t.exec;
      if ('function' == typeof e) {
        var i = e.call(t, n);
        if ('object' != typeof i)
          throw new TypeError('RegExp exec method returned something other than an Object or null');
        return i;
      }
      if ('RegExp' !== r(t)) throw new TypeError('RegExp#exec called on incompatible receiver');
      return o.call(t, n);
    };
  },
  function (t, n, e) {
    var r = e(17),
      o = e(0)('toStringTag'),
      i =
        'Arguments' ==
        r(
          (function () {
            return arguments;
          })()
        );
    t.exports = function (t) {
      var n, e, a;
      return void 0 === t
        ? 'Undefined'
        : null === t
        ? 'Null'
        : 'string' ==
          typeof (e = (function (t, n) {
            try {
              return t[n];
            } catch (t) {}
          })((n = Object(t)), o))
        ? e
        : i
        ? r(n)
        : 'Object' == (a = r(n)) && 'function' == typeof n.callee
        ? 'Arguments'
        : a;
    };
  },
  function (t, n, e) {
    'use strict';
    e(66);
    var r = e(8),
      o = e(7),
      i = e(5),
      a = e(22),
      c = e(0),
      u = e(34),
      s = c('species'),
      l = !i(function () {
        var t = /./;
        return (
          (t.exec = function () {
            var t = [];
            return (t.groups = { a: '7' }), t;
          }),
          '7' !== ''.replace(t, '$<a>')
        );
      }),
      f = (function () {
        var t = /(?:)/,
          n = t.exec;
        t.exec = function () {
          return n.apply(this, arguments);
        };
        var e = 'ab'.split(t);
        return 2 === e.length && 'a' === e[0] && 'b' === e[1];
      })();
    t.exports = function (t, n, e) {
      var p = c(t),
        d = !i(function () {
          var n = {};
          return (
            (n[p] = function () {
              return 7;
            }),
            7 != ''[t](n)
          );
        }),
        v = d
          ? !i(function () {
              var n = !1,
                e = /a/;
              return (
                (e.exec = function () {
                  return (n = !0), null;
                }),
                'split' === t &&
                  ((e.constructor = {}),
                  (e.constructor[s] = function () {
                    return e;
                  })),
                e[p](''),
                !n
              );
            })
          : void 0;
      if (!d || !v || ('replace' === t && !l) || ('split' === t && !f)) {
        var g = /./[p],
          h = e(a, p, ''[t], function (t, n, e, r, o) {
            return n.exec === u
              ? d && !o
                ? { done: !0, value: g.call(n, e, r) }
                : { done: !0, value: t.call(e, n, r) }
              : { done: !1 };
          }),
          y = h[0],
          m = h[1];
        r(String.prototype, t, y),
          o(
            RegExp.prototype,
            p,
            2 == n
              ? function (t, n) {
                  return m.call(t, this, n);
                }
              : function (t) {
                  return m.call(t, this);
                }
          );
      }
    };
  },
  function (t, n, e) {
    'use strict';
    var r,
      o,
      i = e(35),
      a = RegExp.prototype.exec,
      c = String.prototype.replace,
      u = a,
      s =
        ((r = /a/),
        (o = /b*/g),
        a.call(r, 'a'),
        a.call(o, 'a'),
        0 !== r.lastIndex || 0 !== o.lastIndex),
      l = void 0 !== /()??/.exec('')[1];
    (s || l) &&
      (u = function (t) {
        var n,
          e,
          r,
          o,
          u = this;
        return (
          l && (e = new RegExp('^' + u.source + '$(?!\\s)', i.call(u))),
          s && (n = u.lastIndex),
          (r = a.call(u, t)),
          s && r && (u.lastIndex = u.global ? r.index + r[0].length : n),
          l &&
            r &&
            r.length > 1 &&
            c.call(r[0], e, function () {
              for (o = 1; o < arguments.length - 2; o++) void 0 === arguments[o] && (r[o] = void 0);
            }),
          r
        );
      }),
      (t.exports = u);
  },
  function (t, n, e) {
    'use strict';
    var r = e(1);
    t.exports = function () {
      var t = r(this),
        n = '';
      return (
        t.global && (n += 'g'),
        t.ignoreCase && (n += 'i'),
        t.multiline && (n += 'm'),
        t.unicode && (n += 'u'),
        t.sticky && (n += 'y'),
        n
      );
    };
  },
  function (t, n, e) {
    var r = e(4).f,
      o = e(9),
      i = e(0)('toStringTag');
    t.exports = function (t, n, e) {
      t && !o((t = e ? t : t.prototype), i) && r(t, i, { configurable: !0, value: n });
    };
  },
  function (t, n, e) {
    'use strict';
    var r = e(32),
      o = {};
    (o[e(0)('toStringTag')] = 'z'),
      o + '' != '[object z]' &&
        e(8)(
          Object.prototype,
          'toString',
          function () {
            return '[object ' + r(this) + ']';
          },
          !0
        );
  },
  function (t, n, e) {
    'use strict';
    var r = e(78),
      o = e(79),
      i = e(19),
      a = e(11);
    (t.exports = e(59)(
      Array,
      'Array',
      function (t, n) {
        (this._t = a(t)), (this._i = 0), (this._k = n);
      },
      function () {
        var t = this._t,
          n = this._k,
          e = this._i++;
        return !t || e >= t.length
          ? ((this._t = void 0), o(1))
          : o(0, 'keys' == n ? e : 'values' == n ? t[e] : [e, t[e]]);
      },
      'values'
    )),
      (i.Arguments = i.Array),
      r('keys'),
      r('values'),
      r('entries');
  },
  function (t, n, e) {
    t.exports =
      !e(2) &&
      !e(5)(function () {
        return (
          7 !=
          Object.defineProperty(e(40)('div'), 'a', {
            get: function () {
              return 7;
            }
          }).a
        );
      });
  },
  function (t, n, e) {
    var r = e(10),
      o = e(6).document,
      i = r(o) && r(o.createElement);
    t.exports = function (t) {
      return i ? o.createElement(t) : {};
    };
  },
  function (t, n, e) {
    var r = e(42);
    t.exports = function (t, n, e) {
      if ((r(t), void 0 === n)) return t;
      switch (e) {
        case 1:
          return function (e) {
            return t.call(n, e);
          };
        case 2:
          return function (e, r) {
            return t.call(n, e, r);
          };
        case 3:
          return function (e, r, o) {
            return t.call(n, e, r, o);
          };
      }
      return function () {
        return t.apply(n, arguments);
      };
    };
  },
  function (t, n) {
    t.exports = function (t) {
      if ('function' != typeof t) throw TypeError(t + ' is not a function!');
      return t;
    };
  },
  function (t, n, e) {
    var r = e(9),
      o = e(11),
      i = e(45)(!1),
      a = e(27)('IE_PROTO');
    t.exports = function (t, n) {
      var e,
        c = o(t),
        u = 0,
        s = [];
      for (e in c) e != a && r(c, e) && s.push(e);
      for (; n.length > u; ) r(c, (e = n[u++])) && (~i(s, e) || s.push(e));
      return s;
    };
  },
  function (t, n, e) {
    var r = e(17);
    t.exports = Object('z').propertyIsEnumerable(0)
      ? Object
      : function (t) {
          return 'String' == r(t) ? t.split('') : Object(t);
        };
  },
  function (t, n, e) {
    var r = e(11),
      o = e(12),
      i = e(46);
    t.exports = function (t) {
      return function (n, e, a) {
        var c,
          u = r(n),
          s = o(u.length),
          l = i(a, s);
        if (t && e != e) {
          for (; s > l; ) if ((c = u[l++]) != c) return !0;
        } else for (; s > l; l++) if ((t || l in u) && u[l] === e) return t || l || 0;
        return !t && -1;
      };
    };
  },
  function (t, n, e) {
    var r = e(23),
      o = Math.max,
      i = Math.min;
    t.exports = function (t, n) {
      return (t = r(t)) < 0 ? o(t + n, 0) : i(t, n);
    };
  },
  function (t, n, e) {
    var r = e(3);
    r(r.S + r.F * !e(2), 'Object', { defineProperty: e(4).f });
  },
  function (t, n, e) {
    'use strict';
    var r = e(3),
      o = e(45)(!1),
      i = [].indexOf,
      a = !!i && 1 / [1].indexOf(1, -0) < 0;
    r(r.P + r.F * (a || !e(64)(i)), 'Array', {
      indexOf: function (t) {
        return a ? i.apply(this, arguments) || 0 : o(this, t, arguments[1]);
      }
    });
  },
  function (t, n, e) {
    var r = e(23),
      o = e(22);
    t.exports = function (t) {
      return function (n, e) {
        var i,
          a,
          c = String(o(n)),
          u = r(e),
          s = c.length;
        return u < 0 || u >= s
          ? t
            ? ''
            : void 0
          : (i = c.charCodeAt(u)) < 55296 ||
            i > 56319 ||
            u + 1 === s ||
            (a = c.charCodeAt(u + 1)) < 56320 ||
            a > 57343
          ? t
            ? c.charAt(u)
            : i
          : t
          ? c.slice(u, u + 2)
          : a - 56320 + ((i - 55296) << 10) + 65536;
      };
    };
  },
  function (t, n, e) {
    'use strict';
    var r = e(67),
      o = e(1),
      i = e(68),
      a = e(30),
      c = e(12),
      u = e(31),
      s = e(34),
      l = e(5),
      f = Math.min,
      p = [].push,
      d = 'length',
      v = !l(function () {
        RegExp(4294967295, 'y');
      });
    e(33)('split', 2, function (t, n, e, l) {
      var g;
      return (
        (g =
          'c' == 'abbc'.split(/(b)*/)[1] ||
          4 != 'test'.split(/(?:)/, -1)[d] ||
          2 != 'ab'.split(/(?:ab)*/)[d] ||
          4 != '.'.split(/(.?)(.?)/)[d] ||
          '.'.split(/()()/)[d] > 1 ||
          ''.split(/.?/)[d]
            ? function (t, n) {
                var o = String(this);
                if (void 0 === t && 0 === n) return [];
                if (!r(t)) return e.call(o, t, n);
                for (
                  var i,
                    a,
                    c,
                    u = [],
                    l =
                      (t.ignoreCase ? 'i' : '') +
                      (t.multiline ? 'm' : '') +
                      (t.unicode ? 'u' : '') +
                      (t.sticky ? 'y' : ''),
                    f = 0,
                    v = void 0 === n ? 4294967295 : n >>> 0,
                    g = new RegExp(t.source, l + 'g');
                  (i = s.call(g, o)) &&
                  !(
                    (a = g.lastIndex) > f &&
                    (u.push(o.slice(f, i.index)),
                    i[d] > 1 && i.index < o[d] && p.apply(u, i.slice(1)),
                    (c = i[0][d]),
                    (f = a),
                    u[d] >= v)
                  );

                )
                  g.lastIndex === i.index && g.lastIndex++;
                return (
                  f === o[d] ? (!c && g.test('')) || u.push('') : u.push(o.slice(f)),
                  u[d] > v ? u.slice(0, v) : u
                );
              }
            : '0'.split(void 0, 0)[d]
            ? function (t, n) {
                return void 0 === t && 0 === n ? [] : e.call(this, t, n);
              }
            : e),
        [
          function (e, r) {
            var o = t(this),
              i = null == e ? void 0 : e[n];
            return void 0 !== i ? i.call(e, o, r) : g.call(String(o), e, r);
          },
          function (t, n) {
            var r = l(g, t, this, n, g !== e);
            if (r.done) return r.value;
            var s = o(t),
              p = String(this),
              d = i(s, RegExp),
              h = s.unicode,
              y =
                (s.ignoreCase ? 'i' : '') +
                (s.multiline ? 'm' : '') +
                (s.unicode ? 'u' : '') +
                (v ? 'y' : 'g'),
              m = new d(v ? s : '^(?:' + s.source + ')', y),
              b = void 0 === n ? 4294967295 : n >>> 0;
            if (0 === b) return [];
            if (0 === p.length) return null === u(m, p) ? [p] : [];
            for (var w = 0, x = 0, S = []; x < p.length; ) {
              m.lastIndex = v ? x : 0;
              var k,
                O = u(m, v ? p : p.slice(x));
              if (null === O || (k = f(c(m.lastIndex + (v ? 0 : x)), p.length)) === w)
                x = a(p, x, h);
              else {
                if ((S.push(p.slice(w, x)), S.length === b)) return S;
                for (var L = 1; L <= O.length - 1; L++)
                  if ((S.push(O[L]), S.length === b)) return S;
                x = w = k;
              }
            }
            return S.push(p.slice(w)), S;
          }
        ]
      );
    });
  },
  function (t, n, e) {
    var r = e(4).f,
      o = Function.prototype,
      i = /^\s*function ([^ (]*)/;
    'name' in o ||
      (e(2) &&
        r(o, 'name', {
          configurable: !0,
          get: function () {
            try {
              return ('' + this).match(i)[1];
            } catch (t) {
              return '';
            }
          }
        }));
  },
  function (t, n, e) {
    'use strict';
    var r = e(6),
      o = e(9),
      i = e(2),
      a = e(3),
      c = e(8),
      u = e(70).KEY,
      s = e(5),
      l = e(20),
      f = e(36),
      p = e(15),
      d = e(0),
      v = e(53),
      g = e(71),
      h = e(72),
      y = e(54),
      m = e(1),
      b = e(10),
      w = e(18),
      x = e(11),
      S = e(25),
      k = e(14),
      O = e(55),
      L = e(74),
      E = e(75),
      T = e(29),
      j = e(4),
      P = e(16),
      I = E.f,
      M = j.f,
      A = L.f,
      _ = r.Symbol,
      C = r.JSON,
      R = C && C.stringify,
      N = d('_hidden'),
      z = d('toPrimitive'),
      D = {}.propertyIsEnumerable,
      F = l('symbol-registry'),
      H = l('symbols'),
      U = l('op-symbols'),
      X = Object.prototype,
      q = 'function' == typeof _ && !!T.f,
      V = r.QObject,
      W = !V || !V.prototype || !V.prototype.findChild,
      $ =
        i &&
        s(function () {
          return (
            7 !=
            O(
              M({}, 'a', {
                get: function () {
                  return M(this, 'a', { value: 7 }).a;
                }
              })
            ).a
          );
        })
          ? function (t, n, e) {
              var r = I(X, n);
              r && delete X[n], M(t, n, e), r && t !== X && M(X, n, r);
            }
          : M,
      B = function (t) {
        var n = (H[t] = O(_.prototype));
        return (n._k = t), n;
      },
      G =
        q && 'symbol' == typeof _.iterator
          ? function (t) {
              return 'symbol' == typeof t;
            }
          : function (t) {
              return t instanceof _;
            },
      J = function (t, n, e) {
        return (
          t === X && J(U, n, e),
          m(t),
          (n = S(n, !0)),
          m(e),
          o(H, n)
            ? (e.enumerable
                ? (o(t, N) && t[N][n] && (t[N][n] = !1), (e = O(e, { enumerable: k(0, !1) })))
                : (o(t, N) || M(t, N, k(1, {})), (t[N][n] = !0)),
              $(t, n, e))
            : M(t, n, e)
        );
      },
      K = function (t, n) {
        m(t);
        for (var e, r = h((n = x(n))), o = 0, i = r.length; i > o; ) J(t, (e = r[o++]), n[e]);
        return t;
      },
      Y = function (t) {
        var n = D.call(this, (t = S(t, !0)));
        return (
          !(this === X && o(H, t) && !o(U, t)) &&
          (!(n || !o(this, t) || !o(H, t) || (o(this, N) && this[N][t])) || n)
        );
      },
      Q = function (t, n) {
        if (((t = x(t)), (n = S(n, !0)), t !== X || !o(H, n) || o(U, n))) {
          var e = I(t, n);
          return !e || !o(H, n) || (o(t, N) && t[N][n]) || (e.enumerable = !0), e;
        }
      },
      Z = function (t) {
        for (var n, e = A(x(t)), r = [], i = 0; e.length > i; )
          o(H, (n = e[i++])) || n == N || n == u || r.push(n);
        return r;
      },
      tt = function (t) {
        for (var n, e = t === X, r = A(e ? U : x(t)), i = [], a = 0; r.length > a; )
          !o(H, (n = r[a++])) || (e && !o(X, n)) || i.push(H[n]);
        return i;
      };
    q ||
      (c(
        (_ = function () {
          if (this instanceof _) throw TypeError('Symbol is not a constructor!');
          var t = p(arguments.length > 0 ? arguments[0] : void 0),
            n = function (e) {
              this === X && n.call(U, e),
                o(this, N) && o(this[N], t) && (this[N][t] = !1),
                $(this, t, k(1, e));
            };
          return i && W && $(X, t, { configurable: !0, set: n }), B(t);
        }).prototype,
        'toString',
        function () {
          return this._k;
        }
      ),
      (E.f = Q),
      (j.f = J),
      (e(57).f = L.f = Z),
      (e(24).f = Y),
      (T.f = tt),
      i && !e(21) && c(X, 'propertyIsEnumerable', Y, !0),
      (v.f = function (t) {
        return B(d(t));
      })),
      a(a.G + a.W + a.F * !q, { Symbol: _ });
    for (
      var nt =
          'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(
            ','
          ),
        et = 0;
      nt.length > et;

    )
      d(nt[et++]);
    for (var rt = P(d.store), ot = 0; rt.length > ot; ) g(rt[ot++]);
    a(a.S + a.F * !q, 'Symbol', {
      for: function (t) {
        return o(F, (t += '')) ? F[t] : (F[t] = _(t));
      },
      keyFor: function (t) {
        if (!G(t)) throw TypeError(t + ' is not a symbol!');
        for (var n in F) if (F[n] === t) return n;
      },
      useSetter: function () {
        W = !0;
      },
      useSimple: function () {
        W = !1;
      }
    }),
      a(a.S + a.F * !q, 'Object', {
        create: function (t, n) {
          return void 0 === n ? O(t) : K(O(t), n);
        },
        defineProperty: J,
        defineProperties: K,
        getOwnPropertyDescriptor: Q,
        getOwnPropertyNames: Z,
        getOwnPropertySymbols: tt
      });
    var it = s(function () {
      T.f(1);
    });
    a(a.S + a.F * it, 'Object', {
      getOwnPropertySymbols: function (t) {
        return T.f(w(t));
      }
    }),
      C &&
        a(
          a.S +
            a.F *
              (!q ||
                s(function () {
                  var t = _();
                  return '[null]' != R([t]) || '{}' != R({ a: t }) || '{}' != R(Object(t));
                })),
          'JSON',
          {
            stringify: function (t) {
              for (var n, e, r = [t], o = 1; arguments.length > o; ) r.push(arguments[o++]);
              if (((e = n = r[1]), (b(n) || void 0 !== t) && !G(t)))
                return (
                  y(n) ||
                    (n = function (t, n) {
                      if (('function' == typeof e && (n = e.call(this, t, n)), !G(n))) return n;
                    }),
                  (r[1] = n),
                  R.apply(C, r)
                );
            }
          }
        ),
      _.prototype[z] || e(7)(_.prototype, z, _.prototype.valueOf),
      f(_, 'Symbol'),
      f(Math, 'Math', !0),
      f(r.JSON, 'JSON', !0);
  },
  function (t, n, e) {
    n.f = e(0);
  },
  function (t, n, e) {
    var r = e(17);
    t.exports =
      Array.isArray ||
      function (t) {
        return 'Array' == r(t);
      };
  },
  function (t, n, e) {
    var r = e(1),
      o = e(73),
      i = e(28),
      a = e(27)('IE_PROTO'),
      c = function () {},
      u = function () {
        var t,
          n = e(40)('iframe'),
          r = i.length;
        for (
          n.style.display = 'none',
            e(56).appendChild(n),
            n.src = 'javascript:',
            (t = n.contentWindow.document).open(),
            t.write('<script>document.F=Object</script>'),
            t.close(),
            u = t.F;
          r--;

        )
          delete u.prototype[i[r]];
        return u();
      };
    t.exports =
      Object.create ||
      function (t, n) {
        var e;
        return (
          null !== t
            ? ((c.prototype = r(t)), (e = new c()), (c.prototype = null), (e[a] = t))
            : (e = u()),
          void 0 === n ? e : o(e, n)
        );
      };
  },
  function (t, n, e) {
    var r = e(6).document;
    t.exports = r && r.documentElement;
  },
  function (t, n, e) {
    var r = e(43),
      o = e(28).concat('length', 'prototype');
    n.f =
      Object.getOwnPropertyNames ||
      function (t) {
        return r(t, o);
      };
  },
  function (t, n, e) {
    'use strict';
    var r = e(49)(!0);
    e(59)(
      String,
      'String',
      function (t) {
        (this._t = String(t)), (this._i = 0);
      },
      function () {
        var t,
          n = this._t,
          e = this._i;
        return e >= n.length
          ? { value: void 0, done: !0 }
          : ((t = r(n, e)), (this._i += t.length), { value: t, done: !1 });
      }
    );
  },
  function (t, n, e) {
    'use strict';
    var r = e(21),
      o = e(3),
      i = e(8),
      a = e(7),
      c = e(19),
      u = e(76),
      s = e(36),
      l = e(77),
      f = e(0)('iterator'),
      p = !([].keys && 'next' in [].keys()),
      d = function () {
        return this;
      };
    t.exports = function (t, n, e, v, g, h, y) {
      u(e, n, v);
      var m,
        b,
        w,
        x = function (t) {
          if (!p && t in L) return L[t];
          switch (t) {
            case 'keys':
            case 'values':
              return function () {
                return new e(this, t);
              };
          }
          return function () {
            return new e(this, t);
          };
        },
        S = n + ' Iterator',
        k = 'values' == g,
        O = !1,
        L = t.prototype,
        E = L[f] || L['@@iterator'] || (g && L[g]),
        T = E || x(g),
        j = g ? (k ? x('entries') : T) : void 0,
        P = ('Array' == n && L.entries) || E;
      if (
        (P &&
          (w = l(P.call(new t()))) !== Object.prototype &&
          w.next &&
          (s(w, S, !0), r || 'function' == typeof w[f] || a(w, f, d)),
        k &&
          E &&
          'values' !== E.name &&
          ((O = !0),
          (T = function () {
            return E.call(this);
          })),
        (r && !y) || (!p && !O && L[f]) || a(L, f, T),
        (c[n] = T),
        (c[S] = d),
        g)
      )
        if (((m = { values: k ? T : x('values'), keys: h ? T : x('keys'), entries: j }), y))
          for (b in m) b in L || i(L, b, m[b]);
        else o(o.P + o.F * (p || O), n, m);
      return m;
    };
  },
  function (t, n, e) {
    for (
      var r = e(38),
        o = e(16),
        i = e(8),
        a = e(6),
        c = e(7),
        u = e(19),
        s = e(0),
        l = s('iterator'),
        f = s('toStringTag'),
        p = u.Array,
        d = {
          CSSRuleList: !0,
          CSSStyleDeclaration: !1,
          CSSValueList: !1,
          ClientRectList: !1,
          DOMRectList: !1,
          DOMStringList: !1,
          DOMTokenList: !0,
          DataTransferItemList: !1,
          FileList: !1,
          HTMLAllCollection: !1,
          HTMLCollection: !1,
          HTMLFormElement: !1,
          HTMLSelectElement: !1,
          MediaList: !0,
          MimeTypeArray: !1,
          NamedNodeMap: !1,
          NodeList: !0,
          PaintRequestList: !1,
          Plugin: !1,
          PluginArray: !1,
          SVGLengthList: !1,
          SVGNumberList: !1,
          SVGPathSegList: !1,
          SVGPointList: !1,
          SVGStringList: !1,
          SVGTransformList: !1,
          SourceBufferList: !1,
          StyleSheetList: !0,
          TextTrackCueList: !1,
          TextTrackList: !1,
          TouchList: !1
        },
        v = o(d),
        g = 0;
      g < v.length;
      g++
    ) {
      var h,
        y = v[g],
        m = d[y],
        b = a[y],
        w = b && b.prototype;
      if (w && (w[l] || c(w, l, p), w[f] || c(w, f, y), (u[y] = p), m))
        for (h in r) w[h] || i(w, h, r[h], !0);
    }
  },
  function (t, n, e) {
    var r = e(3);
    r(r.S, 'Date', {
      now: function () {
        return new Date().getTime();
      }
    });
  },
  function (t, n, e) {
    t.exports = e(20)('native-function-to-string', Function.toString);
  },
  function (t, n, e) {
    'use strict';
    var r = e(2),
      o = e(16),
      i = e(29),
      a = e(24),
      c = e(18),
      u = e(44),
      s = Object.assign;
    t.exports =
      !s ||
      e(5)(function () {
        var t = {},
          n = {},
          e = Symbol(),
          r = 'abcdefghijklmnopqrst';
        return (
          (t[e] = 7),
          r.split('').forEach(function (t) {
            n[t] = t;
          }),
          7 != s({}, t)[e] || Object.keys(s({}, n)).join('') != r
        );
      })
        ? function (t, n) {
            for (var e = c(t), s = arguments.length, l = 1, f = i.f, p = a.f; s > l; )
              for (
                var d, v = u(arguments[l++]), g = f ? o(v).concat(f(v)) : o(v), h = g.length, y = 0;
                h > y;

              )
                (d = g[y++]), (r && !p.call(v, d)) || (e[d] = v[d]);
            return e;
          }
        : s;
  },
  function (t, n, e) {
    'use strict';
    var r = e(5);
    t.exports = function (t, n) {
      return (
        !!t &&
        r(function () {
          n ? t.call(null, function () {}, 1) : t.call(null);
        })
      );
    };
  },
  function (t, n, e) {
    'use strict';
    var r = e(1),
      o = e(12),
      i = e(30),
      a = e(31);
    e(33)('match', 1, function (t, n, e, c) {
      return [
        function (e) {
          var r = t(this),
            o = null == e ? void 0 : e[n];
          return void 0 !== o ? o.call(e, r) : new RegExp(e)[n](String(r));
        },
        function (t) {
          var n = c(e, t, this);
          if (n.done) return n.value;
          var u = r(t),
            s = String(this);
          if (!u.global) return a(u, s);
          var l = u.unicode;
          u.lastIndex = 0;
          for (var f, p = [], d = 0; null !== (f = a(u, s)); ) {
            var v = String(f[0]);
            (p[d] = v), '' === v && (u.lastIndex = i(s, o(u.lastIndex), l)), d++;
          }
          return 0 === d ? null : p;
        }
      ];
    });
  },
  function (t, n, e) {
    'use strict';
    var r = e(34);
    e(3)({ target: 'RegExp', proto: !0, forced: r !== /./.exec }, { exec: r });
  },
  function (t, n, e) {
    var r = e(10),
      o = e(17),
      i = e(0)('match');
    t.exports = function (t) {
      var n;
      return r(t) && (void 0 !== (n = t[i]) ? !!n : 'RegExp' == o(t));
    };
  },
  function (t, n, e) {
    var r = e(1),
      o = e(42),
      i = e(0)('species');
    t.exports = function (t, n) {
      var e,
        a = r(t).constructor;
      return void 0 === a || null == (e = r(a)[i]) ? n : o(e);
    };
  },
  function (t, n, e) {
    'use strict';
    var r = e(1),
      o = e(18),
      i = e(12),
      a = e(23),
      c = e(30),
      u = e(31),
      s = Math.max,
      l = Math.min,
      f = Math.floor,
      p = /\$([$&`']|\d\d?|<[^>]*>)/g,
      d = /\$([$&`']|\d\d?)/g;
    e(33)('replace', 2, function (t, n, e, v) {
      return [
        function (r, o) {
          var i = t(this),
            a = null == r ? void 0 : r[n];
          return void 0 !== a ? a.call(r, i, o) : e.call(String(i), r, o);
        },
        function (t, n) {
          var o = v(e, t, this, n);
          if (o.done) return o.value;
          var f = r(t),
            p = String(this),
            d = 'function' == typeof n;
          d || (n = String(n));
          var h = f.global;
          if (h) {
            var y = f.unicode;
            f.lastIndex = 0;
          }
          for (var m = []; ; ) {
            var b = u(f, p);
            if (null === b) break;
            if ((m.push(b), !h)) break;
            '' === String(b[0]) && (f.lastIndex = c(p, i(f.lastIndex), y));
          }
          for (var w, x = '', S = 0, k = 0; k < m.length; k++) {
            b = m[k];
            for (
              var O = String(b[0]), L = s(l(a(b.index), p.length), 0), E = [], T = 1;
              T < b.length;
              T++
            )
              E.push(void 0 === (w = b[T]) ? w : String(w));
            var j = b.groups;
            if (d) {
              var P = [O].concat(E, L, p);
              void 0 !== j && P.push(j);
              var I = String(n.apply(void 0, P));
            } else I = g(O, p, L, E, j, n);
            L >= S && ((x += p.slice(S, L) + I), (S = L + O.length));
          }
          return x + p.slice(S);
        }
      ];
      function g(t, n, r, i, a, c) {
        var u = r + t.length,
          s = i.length,
          l = d;
        return (
          void 0 !== a && ((a = o(a)), (l = p)),
          e.call(c, l, function (e, o) {
            var c;
            switch (o.charAt(0)) {
              case '$':
                return '$';
              case '&':
                return t;
              case '`':
                return n.slice(0, r);
              case "'":
                return n.slice(u);
              case '<':
                c = a[o.slice(1, -1)];
                break;
              default:
                var l = +o;
                if (0 === l) return e;
                if (l > s) {
                  var p = f(l / 10);
                  return 0 === p
                    ? e
                    : p <= s
                    ? void 0 === i[p - 1]
                      ? o.charAt(1)
                      : i[p - 1] + o.charAt(1)
                    : e;
                }
                c = i[l - 1];
            }
            return void 0 === c ? '' : c;
          })
        );
      }
    });
  },
  function (t, n, e) {
    var r = e(15)('meta'),
      o = e(10),
      i = e(9),
      a = e(4).f,
      c = 0,
      u =
        Object.isExtensible ||
        function () {
          return !0;
        },
      s = !e(5)(function () {
        return u(Object.preventExtensions({}));
      }),
      l = function (t) {
        a(t, r, { value: { i: 'O' + ++c, w: {} } });
      },
      f = (t.exports = {
        KEY: r,
        NEED: !1,
        fastKey: function (t, n) {
          if (!o(t)) return 'symbol' == typeof t ? t : ('string' == typeof t ? 'S' : 'P') + t;
          if (!i(t, r)) {
            if (!u(t)) return 'F';
            if (!n) return 'E';
            l(t);
          }
          return t[r].i;
        },
        getWeak: function (t, n) {
          if (!i(t, r)) {
            if (!u(t)) return !0;
            if (!n) return !1;
            l(t);
          }
          return t[r].w;
        },
        onFreeze: function (t) {
          return s && f.NEED && u(t) && !i(t, r) && l(t), t;
        }
      });
  },
  function (t, n, e) {
    var r = e(6),
      o = e(13),
      i = e(21),
      a = e(53),
      c = e(4).f;
    t.exports = function (t) {
      var n = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});
      '_' == t.charAt(0) || t in n || c(n, t, { value: a.f(t) });
    };
  },
  function (t, n, e) {
    var r = e(16),
      o = e(29),
      i = e(24);
    t.exports = function (t) {
      var n = r(t),
        e = o.f;
      if (e)
        for (var a, c = e(t), u = i.f, s = 0; c.length > s; ) u.call(t, (a = c[s++])) && n.push(a);
      return n;
    };
  },
  function (t, n, e) {
    var r = e(4),
      o = e(1),
      i = e(16);
    t.exports = e(2)
      ? Object.defineProperties
      : function (t, n) {
          o(t);
          for (var e, a = i(n), c = a.length, u = 0; c > u; ) r.f(t, (e = a[u++]), n[e]);
          return t;
        };
  },
  function (t, n, e) {
    var r = e(11),
      o = e(57).f,
      i = {}.toString,
      a =
        'object' == typeof window && window && Object.getOwnPropertyNames
          ? Object.getOwnPropertyNames(window)
          : [];
    t.exports.f = function (t) {
      return a && '[object Window]' == i.call(t)
        ? (function (t) {
            try {
              return o(t);
            } catch (t) {
              return a.slice();
            }
          })(t)
        : o(r(t));
    };
  },
  function (t, n, e) {
    var r = e(24),
      o = e(14),
      i = e(11),
      a = e(25),
      c = e(9),
      u = e(39),
      s = Object.getOwnPropertyDescriptor;
    n.f = e(2)
      ? s
      : function (t, n) {
          if (((t = i(t)), (n = a(n, !0)), u))
            try {
              return s(t, n);
            } catch (t) {}
          if (c(t, n)) return o(!r.f.call(t, n), t[n]);
        };
  },
  function (t, n, e) {
    'use strict';
    var r = e(55),
      o = e(14),
      i = e(36),
      a = {};
    e(7)(a, e(0)('iterator'), function () {
      return this;
    }),
      (t.exports = function (t, n, e) {
        (t.prototype = r(a, { next: o(1, e) })), i(t, n + ' Iterator');
      });
  },
  function (t, n, e) {
    var r = e(9),
      o = e(18),
      i = e(27)('IE_PROTO'),
      a = Object.prototype;
    t.exports =
      Object.getPrototypeOf ||
      function (t) {
        return (
          (t = o(t)),
          r(t, i)
            ? t[i]
            : 'function' == typeof t.constructor && t instanceof t.constructor
            ? t.constructor.prototype
            : t instanceof Object
            ? a
            : null
        );
      };
  },
  function (t, n, e) {
    var r = e(0)('unscopables'),
      o = Array.prototype;
    null == o[r] && e(7)(o, r, {}),
      (t.exports = function (t) {
        o[r][t] = !0;
      });
  },
  function (t, n) {
    t.exports = function (t, n) {
      return { value: n, done: !!t };
    };
  },
  function (t, n, e) {
    'use strict';
    var r = e(3),
      o = e(56),
      i = e(17),
      a = e(46),
      c = e(12),
      u = [].slice;
    r(
      r.P +
        r.F *
          e(5)(function () {
            o && u.call(o);
          }),
      'Array',
      {
        slice: function (t, n) {
          var e = c(this.length),
            r = i(this);
          if (((n = void 0 === n ? e : n), 'Array' == r)) return u.call(this, t, n);
          for (var o = a(t, e), s = a(n, e), l = c(s - o), f = new Array(l), p = 0; p < l; p++)
            f[p] = 'String' == r ? this.charAt(o + p) : this[o + p];
          return f;
        }
      }
    );
  },
  function (t, n, e) {
    'use strict';
    var r = e(41),
      o = e(3),
      i = e(18),
      a = e(82),
      c = e(83),
      u = e(12),
      s = e(84),
      l = e(85);
    o(
      o.S +
        o.F *
          !e(86)(function (t) {
            Array.from(t);
          }),
      'Array',
      {
        from: function (t) {
          var n,
            e,
            o,
            f,
            p = i(t),
            d = 'function' == typeof this ? this : Array,
            v = arguments.length,
            g = v > 1 ? arguments[1] : void 0,
            h = void 0 !== g,
            y = 0,
            m = l(p);
          if (
            (h && (g = r(g, v > 2 ? arguments[2] : void 0, 2)), null == m || (d == Array && c(m)))
          )
            for (e = new d((n = u(p.length))); n > y; y++) s(e, y, h ? g(p[y], y) : p[y]);
          else
            for (f = m.call(p), e = new d(); !(o = f.next()).done; y++)
              s(e, y, h ? a(f, g, [o.value, y], !0) : o.value);
          return (e.length = y), e;
        }
      }
    );
  },
  function (t, n, e) {
    var r = e(1);
    t.exports = function (t, n, e, o) {
      try {
        return o ? n(r(e)[0], e[1]) : n(e);
      } catch (n) {
        var i = t.return;
        throw (void 0 !== i && r(i.call(t)), n);
      }
    };
  },
  function (t, n, e) {
    var r = e(19),
      o = e(0)('iterator'),
      i = Array.prototype;
    t.exports = function (t) {
      return void 0 !== t && (r.Array === t || i[o] === t);
    };
  },
  function (t, n, e) {
    'use strict';
    var r = e(4),
      o = e(14);
    t.exports = function (t, n, e) {
      n in t ? r.f(t, n, o(0, e)) : (t[n] = e);
    };
  },
  function (t, n, e) {
    var r = e(32),
      o = e(0)('iterator'),
      i = e(19);
    t.exports = e(13).getIteratorMethod = function (t) {
      if (null != t) return t[o] || t['@@iterator'] || i[r(t)];
    };
  },
  function (t, n, e) {
    var r = e(0)('iterator'),
      o = !1;
    try {
      var i = [7][r]();
      (i.return = function () {
        o = !0;
      }),
        Array.from(i, function () {
          throw 2;
        });
    } catch (t) {}
    t.exports = function (t, n) {
      if (!n && !o) return !1;
      var e = !1;
      try {
        var i = [7],
          a = i[r]();
        (a.next = function () {
          return { done: (e = !0) };
        }),
          (i[r] = function () {
            return a;
          }),
          t(i);
      } catch (t) {}
      return e;
    };
  },
  function (t, n, e) {
    var r = e(3);
    r(r.S, 'Array', { isArray: e(54) });
  },
  function (t, n, e) {
    var r = Date.prototype,
      o = r.toString,
      i = r.getTime;
    new Date(NaN) + '' != 'Invalid Date' &&
      e(8)(r, 'toString', function () {
        var t = i.call(this);
        return t == t ? o.call(this) : 'Invalid Date';
      });
  },
  function (t, n, e) {
    'use strict';
    e(90);
    var r = e(1),
      o = e(35),
      i = e(2),
      a = /./.toString,
      c = function (t) {
        e(8)(RegExp.prototype, 'toString', t, !0);
      };
    e(5)(function () {
      return '/a/b' != a.call({ source: 'a', flags: 'b' });
    })
      ? c(function () {
          var t = r(this);
          return '/'.concat(
            t.source,
            '/',
            'flags' in t ? t.flags : !i && t instanceof RegExp ? o.call(t) : void 0
          );
        })
      : 'toString' != a.name &&
        c(function () {
          return a.call(this);
        });
  },
  function (t, n, e) {
    e(2) &&
      'g' != /./g.flags &&
      e(4).f(RegExp.prototype, 'flags', { configurable: !0, get: e(35) });
  },
  function (t, n, e) {
    'use strict';
    e.r(n);
    e(61), e(26), e(47), e(48), e(65), e(50), e(69);
    function r(t, n) {
      for (var e = 0; e < n.length; e++) {
        var r = n[e];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          'value' in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function o(t, n, e) {
      return (
        n && r(t.prototype, n),
        e && r(t, e),
        Object.defineProperty(t, 'prototype', { writable: !1 }),
        t
      );
    }
    var i = o(function t(n, e, r, o, i) {
      !(function (t, n) {
        if (!(t instanceof n)) throw new TypeError('Cannot call a class as a function');
      })(this, t),
        (this.logTime = new Date().getTime()),
        (this.url = n.encodeURI ? encodeURIComponent(window.location.href) : window.location.href),
        (this.logType = e),
        (this.logContent = r),
        (this.logSession = o),
        n.custom && (this.custom = { log: n.customizeLog(e, r), detail: i });
    });
    function a(t) {
      var n = (function () {
          var t = navigator.userAgent,
            n = {
              browser: !1,
              mobile: !1,
              type: 'unknown',
              version: 'unknown',
              name: 'unknown',
              userAgent: t,
              screenWidth: 0,
              screenHeight: 0,
              clientWidth: 0,
              clientHeight: 0
            };
          if (-1 === t.indexOf('Mobile')) {
            var e = (function (t) {
              var n = { name: 'unknown', version: 'unknown' },
                e = t.toLowerCase();
              if (e.indexOf('msie') > 0) {
                var r = e.match(/msie [\d.]+/gi)[0];
                (n.name = r.split('/')[0]), (n.version = r.split('/')[1]);
              }
              if (e.indexOf('edge') > 0) {
                var o = e.match(/edge\/[\d.]+/gi)[0];
                (n.name = o.split('/')[0]), (n.version = o.split('/')[1]);
              }
              if (e.indexOf('firefox') > 0) {
                var i = e.match(/firefox\/[\d.]+/gi)[0];
                (n.name = i.split('/')[0]), (n.version = i.split('/')[1]);
              }
              if (e.indexOf('safari') > 0 && e.indexOf('chrome') < 0) {
                var a = e.match(/safari\/[\d.]+/gi)[0];
                (n.name = a.split('/')[0]), (n.version = a.split('/')[1]);
              }
              if (e.indexOf('chrome') > 0) {
                var c = e.match(/chrome\/[\d.]+/gi)[0];
                (n.name = c.split('/')[0]), (n.version = c.split('/')[1]);
              }
              return n;
            })(t);
            ((n = Object.assign(n, e)).browser = !0), (n.type = 'computer');
          } else {
            var r = (function (t) {
              var n = { type: 'unknown', version: 'unknown', name: 'unknown', isWebView: !1 },
                e = t.match(/(Android)?[\s/]+([\d.]+)?/),
                r = t.match(/(iPad).*OS\s([\d_]+)/),
                o = t.match(/(iPod)(.*OS\s([\d_]+))?/),
                i = !r && t.match(/(iPhone\sOS)\s([\d_]+)/),
                a = /MicroMessenger/i.test(t),
                c = /windows mobile/i.test(t);
              if (e) {
                (n.type = 'android'), (n.version = e[2]);
                var u = t.match(/Android\s[\S\s]+Build\//);
                if (u) {
                  var s = u[0].split(';')[1].replace(/Build\//g, '');
                  n.name = s.replace(/(^\s*)|(\s*$)/g, '');
                }
              }
              if (r || o || i) {
                if (
                  ((n.type = 'ios'),
                  r && ((n.version = r[2].replace(/_/g, '.')), (n.name = 'ipad')),
                  o &&
                    ((n.version = o[3] ? o[3].replace(/_/g, '.') : 'unknown'), (n.name = 'ipod')),
                  i)
                ) {
                  (n.version = i[2].replace(/_/g, '.')), (n.name = 'iphone');
                  var l = window.screen.width,
                    f = window.screen.height;
                  320 === l && 480 === f
                    ? (n.name = 'iphone 4')
                    : 320 === l && 568 === f
                    ? (n.name = 'iphone 5/SE')
                    : 375 === l && 667 === f
                    ? (n.name = 'iphone 6/7/8')
                    : 414 === l && 736 === f
                    ? (n.name = 'iphone 6/7/8 Plus')
                    : 375 === l && 812 === f && (n.name = 'iphone X/S/Max');
                }
                t.indexOf('Version/') >= 0 &&
                  '10' === n.osVersion.split('.')[0] &&
                  (n.version = t.toLowerCase().split('version/')[1].split(' ')[0]),
                  (n.isWebView = /.*AppleWebKit(?!.*Safari)/i.test(t));
              }
              a && (n.type = 'wechat');
              c && (n.type = 'windows mobile');
              return n;
            })(t);
            (n = Object.assign(n, r)).mobile = !0;
          }
          var o = {
            screenWidth: screen.width,
            screenHeight: screen.height,
            clientWidth: document.documentElement.clientWidth,
            clientHeight: document.documentElement.clientHeight
          };
          return (n = Object.assign(n, o));
        })(),
        e = new i(
          t.trackerOptions,
          'Device Log',
          n,
          t.sessionId,
          t.trackerOptions.customizeDeviceLog(navigator.userAgent)
        );
      t.logList.push(e), console.debug('Device Traking Log:\n', e);
    }
    function c(t) {
      var n = (function () {
          var t = {};
          if (window.performance) {
            var n = window.performance.getEntries();
            n[0] && 'navigate' === n[0].type ? (t.loadType = 'load') : (t.loadType = 'reload');
          }
          var e = performance && performance.timing;
          e &&
            ((t.loadPageTime = e.loadEventEnd - e.navigationStart),
            (t.domReadyTime = e.domComplete - e.responseEnd),
            (t.redirectTime = e.redirectEnd - e.redirectStart),
            (t.domainLookupTime = e.domainLookupEnd - e.domainLookupStart),
            (t.timeToFirstByte = e.responseStart - e.navigationStart),
            (t.requestTime = e.responseEnd - e.requestStart),
            (t.loadEventTime = e.loadEventEnd - e.loadEventStart),
            (t.cacheTime = e.domainLookupStart - e.fetchStart),
            (t.unloadTime = e.unloadEventEnd - e.unloadEventStart),
            (t.connectTime = e.connectEnd - e.connectStart));
          return t;
        })(),
        e = new i(
          t.trackerOptions,
          'Performance Log',
          n,
          t.sessionId,
          t.trackerOptions.customizePerformanceLog(window.performance)
        );
      t.logList.push(e), console.debug('Performance Traking Log:\n', e);
    }
    function u(t) {
      return (t = t || window.event)
        ? (t.target || (t.target = t.srcElement),
          t.currentTarget || (t.currentTarget = t.srcElement),
          t)
        : t;
    }
    function s() {
      var t = 'addEventListener',
        n = 'removeEventListener',
        e = '';
      return (
        window.addEventListener || ((t = 'attachEvent'), (n = 'detachEvent'), (e = 'on')),
        { addMethod: t, removeMethod: n, prefix: e }
      );
    }
    var l;
    e(51);
    function f(t) {
      var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        e = [];
      if (!t || !t.tagName) return '';
      if (t.id) return '#'.concat(t.id);
      if ((e.push(t.tagName.toLowerCase()), n)) {
        var r = t.className;
        if (r && 'string' == typeof r) {
          var o = r.split(/\s+/);
          e.push('.'.concat(o.join('.')));
        }
      }
      return t.name && e.push('[name='.concat(t.name, ']')), e.join('');
    }
    function p(t) {
      return (
        document.getElementById(t) || document.getElementsByName(t)[0] || document.querySelector(t)
      );
    }
    function d(t) {
      (l = window.location.href),
        (function (t) {
          for (
            var n = ['mousedown', 'keyup'], e = s(), r = e.addMethod, o = e.prefix, a = 0;
            a < n.length;
            a++
          ) {
            var c = n[a];
            document.body[r](
              o + c,
              function (n) {
                var e = u(n);
                if (e) {
                  var r = v(e, t.trackerOptions.useClass),
                    o = g(e),
                    a = h(e),
                    c = {};
                  'mousedown' === e.type
                    ? (c = Object.assign(r, o))
                    : 'keyup' === e.type && (c = Object.assign(r, a));
                  var s = new i(
                    t.trackerOptions,
                    'Event Log',
                    c,
                    t.sessionId,
                    t.trackerOptions.customizeEventLog(e)
                  );
                  t.logList.push(s), console.debug('DOM Event Traking Log:\n', s);
                }
              },
              !1
            );
          }
        })(t),
        (function (t) {
          var n = s(),
            e = n.addMethod,
            r = n.prefix;
          console.log('capture url hash event'),
            window[e](r + 'hashchange', function (n) {
              var e = u(n);
              if (e && l !== window.location.href) {
                var r = { trackingType: 'urlchange', oldUrl: l, newUrl: window.location.href };
                l = window.location.href;
                var o = new i(
                  t.trackerOptions,
                  'Event Log',
                  r,
                  t.sessionId,
                  t.trackerOptions.customizeEventLog(e)
                );
                t.logList.push(o), console.debug('Url Event Traking Log:\n', o);
              }
            });
        })(t),
        (function (t) {
          console.log('capture url history event');
          var n = s(),
            e = n.addMethod,
            r = n.prefix;
          window[e](r + 'popstate', function (n) {
            var e = u(n);
            if (e && l !== window.location.href) {
              var r = { trackingType: 'urlchange', oldUrl: l, newUrl: window.location.href };
              l = window.location.href;
              var o = new i(
                t.trackerOptions,
                'Event Log',
                r,
                t.sessionId,
                t.trackerOptions.customizeEventLog(e)
              );
              t.logList.push(o), console.debug('Url Event Traking Log:\n', o);
            }
          });
          var o = history.pushState;
          history.pushState = function () {
            for (var n = arguments.length, e = new Array(n), r = 0; r < n; r++) e[r] = arguments[r];
            if ((o.apply(history, arguments), l !== window.location.href)) {
              var a = { trackingType: 'urlchange', oldUrl: l, newUrl: window.location.href };
              l = window.location.href;
              var c = new i(t.trackerOptions, 'Event Log', a, t.sessionId, {});
              t.logList.push(c), console.debug('Url Event Traking Log:\n', c);
            }
          };
          var a = history.replaceState;
          history.replaceState = function () {
            if ((a.apply(history, arguments), l !== window.location.href)) {
              var n = { trackingType: 'urlchange', oldUrl: l, newUrl: window.location.href };
              l = window.location.href;
              var e = new i(t.trackerOptions, 'Event Log', n, t.sessionId, {});
              t.logList.push(e), console.debug('Url Event Traking Log:\n', e);
            }
          };
        })(t);
    }
    function v(t, n) {
      return {
        domPath: (function (t) {
          var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          if (!(t instanceof HTMLElement))
            return console.warn('input element is not a HTML element!'), '';
          for (var e = [], r = t; r; ) {
            var o = f(r, n);
            if (!o) break;
            if ((e.unshift(o), p(e.join('>')) === t || o.indexOf('body') >= 0)) break;
            e.shift();
            var i = r.parentNode.children;
            if (i.length > 1)
              for (var a = 0; a < i.length; a++)
                if (i[a] === r) {
                  o += ':nth-child('.concat(a + 1, ')');
                  break;
                }
            if ((e.unshift(o), p(e.join('>')) === t)) break;
            r = r.parentNode;
          }
          return e.join('>');
        })(t.target, n),
        trackingType: t.type
      };
    }
    function g(t) {
      var n = (function (t) {
        var n = t.getBoundingClientRect();
        return {
          width: n.width || n.right - n.left,
          height: n.height || n.bottom - n.top,
          left: n.left || 0,
          top: n.top || 0
        };
      })(t.target);
      if (0 !== n.width && 0 !== n.height && (void 0 !== t.pageX || void 0 !== t.clientX)) {
        var e = document.documentElement || document.body.parentNode,
          r = (e && 'number' == typeof e.scrollLeft ? e : document.body).scrollLeft,
          o = (e && 'number' == typeof e.scrollTop ? e : document.body).scrollTop,
          i = t.pageX || t.clientX + r,
          a = t.pageY || t.clientY + o;
        return {
          offsetX: ((i - n.left - r) / n.width).toFixed(6),
          offsetY: ((a - n.top - o) / n.height).toFixed(6)
        };
      }
    }
    function h(t) {
      if (void 0 !== t.key) return { inputKey: t.key, currentValue: t.target.value };
    }
    e(52), e(58), e(37), e(38), e(60);
    function y(t) {
      return (y =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            })(t);
    }
    function m(t) {
      !(function (t) {
        var n = console.error;
        console.error = function (e) {
          var r = (arguments[0] && arguments[0].message) || e,
            o = 0,
            a = 0,
            c = arguments[0] && arguments[0].stack;
          if (c) {
            var u = { errorType: 'js', errorMsg: r, lineNumber: o, columnNumber: a };
            (u = new i(
              t.trackerOptions,
              'Error Log',
              u,
              t.sessionId,
              t.trackerOptions.customizeErrorLog(e)
            )),
              t.logList.push(u),
              console.debug('Error Traking Log:\n', u);
          } else {
            if ('object' == y(r))
              try {
                r = JSON.stringify(r);
              } catch (t) {
                r = '错误无法解析';
              }
            var s = {
              errorType: 'customize',
              errorMsg: 'Customize Error: ' + r,
              lineNumber: o,
              columnNumber: a
            };
            (s = new i(
              t.trackerOptions,
              'Error Log',
              s,
              t.sessionId,
              t.trackerOptions.customizeErrorLog(e)
            )),
              t.logList.push(s),
              console.debug('Error Traking Log:\n', s);
          }
          return n.apply(console, arguments);
        };
      })(t),
        (function (t) {
          (window.onerror = function (n, e, r, o, a) {
            var c = {
              errorType: 'window.onerror',
              errorMsg: n,
              lineNumber: r,
              columnNumber: o,
              errorStack: a ? a.stack : null
            };
            (c = new i(
              t.trackerOptions,
              'Error Log',
              c,
              t.sessionId,
              t.trackerOptions.customizeErrorLog(n)
            )),
              t.logList.push(c),
              console.debug('Error Traking Log:\n', c);
          }),
            (window.onunhandledrejection = function (n) {
              var e = '',
                r = '';
              'object' === y(n.reason)
                ? ((e = n.reason.message), (r = n.reason.stack))
                : ((e = n.reason), (r = ''));
              var o = {
                errorType: 'window.onunhandledrejection',
                errorMsg: e,
                lineNumber: lineNumber,
                columnNumber: columnNumber,
                errorStack: r
              };
              (o = new i(
                t.trackerOptions,
                'Error Log',
                o,
                t.sessionId,
                t.trackerOptions.customizeErrorLog(n)
              )),
                t.logList.push(o),
                console.debug('Error Traking Log:\n', o);
            });
        })(t);
    }
    e(80), e(81), e(87);
    function b(t, n) {
      var e = ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
      if (!e) {
        if (
          Array.isArray(t) ||
          (e = (function (t, n) {
            if (!t) return;
            if ('string' == typeof t) return w(t, n);
            var e = Object.prototype.toString.call(t).slice(8, -1);
            'Object' === e && t.constructor && (e = t.constructor.name);
            if ('Map' === e || 'Set' === e) return Array.from(t);
            if ('Arguments' === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))
              return w(t, n);
          })(t)) ||
          (n && t && 'number' == typeof t.length)
        ) {
          e && (t = e);
          var r = 0,
            o = function () {};
          return {
            s: o,
            n: function () {
              return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
            },
            e: function (t) {
              throw t;
            },
            f: o
          };
        }
        throw new TypeError(
          'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
      }
      var i,
        a = !0,
        c = !1;
      return {
        s: function () {
          e = e.call(t);
        },
        n: function () {
          var t = e.next();
          return (a = t.done), t;
        },
        e: function (t) {
          (c = !0), (i = t);
        },
        f: function () {
          try {
            a || null == e.return || e.return();
          } finally {
            if (c) throw i;
          }
        }
      };
    }
    function w(t, n) {
      (null == n || n > t.length) && (n = t.length);
      for (var e = 0, r = new Array(n); e < n; e++) r[e] = t[e];
      return r;
    }
    function x(t, n, e, r) {
      var o = (function (t) {
        var n,
          e = [],
          r = b(t);
        try {
          for (r.s(); !(n = r.n()).done; ) {
            var o = n.value;
            'Event Log' === o.logType && e.push(o);
          }
        } catch (t) {
          r.e(t);
        } finally {
          r.f();
        }
        return e;
      })(t);
      if (o.length > 0) {
        for (
          var i = (function (t) {
              for (var n = 0; n < t.length - 1; n++) {
                (('keyup' === t[n].logContent.trackingType &&
                  'keyup' !== t[n + 1].logContent.trackingType) ||
                  ('keyup' === t[n].logContent.trackingType &&
                    'keyup' === t[n + 1].logContent.trackingType &&
                    t[n].logContent.domPath !== t[n + 1].logContent.domPath)) &&
                  (t[n].logContent.finalInput = !0);
              }
              if (t.length > 1) {
                var e = t[t.length - 1].logContent,
                  r = t[t.length - 2].logContent;
                'keyup' === e.trackingType &&
                  'keyup' === r.trackingType &&
                  e.domPath === r.domPath &&
                  (t[t.length - 1].logContent.finalInput = !0);
              } else if (1 === t.length) {
                'keyup' === t[t.length - 1].logContent.trackingType &&
                  (t[t.length - 1].logContent.finalInput = !0);
              }
              return t;
            })(o),
            a = i[0].logTime,
            c = 'function test(browser) {\nbrowser\n.url('
              .concat(i[0].url, ').pause(')
              .concat(n, ')\n'),
            u = 0;
          u < i.length;
          u++
        ) {
          var s = i[u],
            l = s.logContent,
            f = 0;
          u + 1 !== i.length && (f = i[u + 1].logTime - a),
            'mousedown' === l.trackingType
              ? ((c += '.assert.elementPresent("'.concat(l.domPath, '")\n')),
                (c += '.click("'.concat(l.domPath, '").pause(').concat(f + e, ')\n')),
                (a = s.logTime))
              : 'keyup' === l.trackingType &&
                l.finalInput &&
                ((c += '.setValue("'
                  .concat(l.domPath, '", "')
                  .concat(l.currentValue, '").pause(')
                  .concat(f + r, ')\n')),
                (a = s.logTime));
        }
        return (c = ''.concat(c, '}'));
      }
      return '';
    }
    e(88), e(89);
    var S = window.XMLHttpRequest;
    function k(t) {
      var n = new CustomEvent(t, { detail: this });
      window.dispatchEvent(n);
    }
    function O() {
      var t = new S();
      return (
        t.addEventListener(
          'abort',
          function () {
            k.call(this, 'ajaxAbort');
          },
          !1
        ),
        t.addEventListener(
          'error',
          function () {
            k.call(this, 'ajaxError');
          },
          !1
        ),
        t.addEventListener(
          'load',
          function () {
            k.call(this, 'ajaxLoad');
          },
          !1
        ),
        t.addEventListener(
          'loadstart',
          function () {
            k.call(this, 'ajaxLoadStart');
          },
          !1
        ),
        t.addEventListener(
          'progress',
          function () {
            k.call(this, 'ajaxProgress');
          },
          !1
        ),
        t.addEventListener(
          'timeout',
          function () {
            k.call(this, 'ajaxTimeout');
          },
          !1
        ),
        t.addEventListener(
          'loadend',
          function () {
            k.call(this, 'ajaxLoadEnd');
          },
          !1
        ),
        t.addEventListener(
          'readystatechange',
          function () {
            k.call(this, 'ajaxReadyStateChange');
          },
          !1
        ),
        t
      );
    }
    function L(t) {
      (window.XMLHttpRequest = O),
        window.addEventListener('ajaxLoadStart', function (n) {
          var e = new i(
            t.trackerOptions,
            'XMLHttpRequest Log',
            { event: 'ajaxLoadStart' },
            t.sessionId,
            t.trackerOptions.customizeXMLHttpRequestLog(n)
          );
          t.logList.push(e), console.debug('XMLHttpRequest Traking Log:\n', e);
        }),
        window.addEventListener('ajaxLoadEnd', function (n) {
          var e = {
              event: 'ajaxLoadEnd',
              status: n.detail.status,
              response: n.detail.response
                .toString()
                .substring(0, t.trackerOptions.maxResponseTextLength)
            },
            r = new i(
              t.trackerOptions,
              'XMLHttpRequest Log',
              e,
              t.sessionId,
              t.trackerOptions.customizeXMLHttpRequestLog(n)
            );
          t.logList.push(r), console.debug('XMLHttpRequest Traking Log:\n', r);
        });
    }
    function E(t, n) {
      for (var e = 0; e < n.length; e++) {
        var r = n[e];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          'value' in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var T = {
      sessionId: ''.concat(Date.now()).concat(Math.floor(1e3 * Math.random())),
      useClass: !1,
      maxResponseTextLength: 1e3,
      timeTracelInitTime: 3e3,
      timeTravelClickDelayTime: 1e3,
      timeTracelInputDelayTime: 1e3,
      captureEvent: !0,
      captureJsError: !0,
      captureXMLHttpRequest: !0,
      custom: !1,
      customizeLog: function (t, n) {},
      customizeEventLog: function (t) {},
      customizeErrorLog: function (t) {},
      customizeXMLHttpRequestLog: function (t) {},
      customizeDeviceLog: function (t) {},
      customizePerformanceLog: function (t) {}
    };
    if ('undefined' != typeof window) {
      var j = new ((function () {
        function t() {
          !(function (t, n) {
            if (!(t instanceof n)) throw new TypeError('Cannot call a class as a function');
          })(this, t),
            (this.trackerInitialized = !1),
            (this.trackerOptions = T),
            (this.logList = []),
            (this.sessionId = '');
        }
        var n, e, r;
        return (
          (n = t),
          (e = [
            {
              key: 'getDeviceInfo',
              value: function () {
                a(this);
              }
            },
            {
              key: 'getPerformanceInfo',
              value: function () {
                c(this);
              }
            },
            {
              key: 'getLogList',
              value: function () {
                return this.logList;
              }
            },
            {
              key: 'getTimeTravelCode',
              value: function () {
                return x(
                  this.logList,
                  this.trackerOptions.timeTracelInitTime,
                  this.trackerOptions.timeTravelClickDelayTime,
                  this.trackerOptions.timeTracelInputDelayTime
                );
              }
            },
            {
              key: 'init',
              value: function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return (
                  (this.trackerOptions = Object.assign(T, t)),
                  (this.sessionId = this.trackerOptions.sessionId),
                  this.trackerInitialized ||
                    (this.trackerOptions.captureEvent && d(this),
                    this.trackerOptions.captureJsError && m(this),
                    this.trackerOptions.captureXMLHttpRequest && L(this),
                    (this.trackerInitialized = !0)),
                  this
                );
              }
            }
          ]) && E(n.prototype, e),
          r && E(n, r),
          Object.defineProperty(n, 'prototype', { writable: !1 }),
          t
        );
      })())();
      window.tracker = j;
    } else console.error('init shadow-tracker error, no window object');
  }
]);
