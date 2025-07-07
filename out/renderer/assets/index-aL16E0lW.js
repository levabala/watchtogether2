var n, l$1, u$2, i$1, r$1, o$1, e$1, f$2, c$1, s$1, a$1, p$1 = {}, v$1 = [], y$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, w$1 = Array.isArray;
function d$1(n2, l2) {
  for (var u2 in l2) n2[u2] = l2[u2];
  return n2;
}
function g$1(n2) {
  n2 && n2.parentNode && n2.parentNode.removeChild(n2);
}
function _(l2, u2, t2) {
  var i2, r2, o2, e2 = {};
  for (o2 in u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : e2[o2] = u2[o2];
  if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) void 0 === e2[o2] && (e2[o2] = l2.defaultProps[o2]);
  return m$1(l2, e2, i2, r2, null);
}
function m$1(n2, t2, i2, r2, o2) {
  var e2 = { type: n2, props: t2, key: i2, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u$2 : o2, __i: -1, __u: 0 };
  return null == o2 && null != l$1.vnode && l$1.vnode(e2), e2;
}
function k$1(n2) {
  return n2.children;
}
function x(n2, l2) {
  this.props = n2, this.context = l2;
}
function S(n2, l2) {
  if (null == l2) return n2.__ ? S(n2.__, n2.__i + 1) : null;
  for (var u2; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) return u2.__e;
  return "function" == typeof n2.type ? S(n2) : null;
}
function C$1(n2) {
  var l2, u2;
  if (null != (n2 = n2.__) && null != n2.__c) {
    for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) {
      n2.__e = n2.__c.base = u2.__e;
      break;
    }
    return C$1(n2);
  }
}
function M(n2) {
  (!n2.__d && (n2.__d = true) && i$1.push(n2) && !$.__r++ || r$1 != l$1.debounceRendering) && ((r$1 = l$1.debounceRendering) || o$1)($);
}
function $() {
  for (var n2, u2, t2, r2, o2, f2, c2, s2 = 1; i$1.length; ) i$1.length > s2 && i$1.sort(e$1), n2 = i$1.shift(), s2 = i$1.length, n2.__d && (t2 = void 0, o2 = (r2 = (u2 = n2).__v).__e, f2 = [], c2 = [], u2.__P && ((t2 = d$1({}, r2)).__v = r2.__v + 1, l$1.vnode && l$1.vnode(t2), O(u2.__P, t2, r2, u2.__n, u2.__P.namespaceURI, 32 & r2.__u ? [o2] : null, f2, null == o2 ? S(r2) : o2, !!(32 & r2.__u), c2), t2.__v = r2.__v, t2.__.__k[t2.__i] = t2, z$1(f2, t2, c2), t2.__e != o2 && C$1(t2)));
  $.__r = 0;
}
function I(n2, l2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
  var a2, h2, y2, w2, d2, g2, _2 = t2 && t2.__k || v$1, m2 = l2.length;
  for (f2 = P$1(u2, l2, _2, f2, m2), a2 = 0; a2 < m2; a2++) null != (y2 = u2.__k[a2]) && (h2 = -1 == y2.__i ? p$1 : _2[y2.__i] || p$1, y2.__i = a2, g2 = O(n2, y2, h2, i2, r2, o2, e2, f2, c2, s2), w2 = y2.__e, y2.ref && h2.ref != y2.ref && (h2.ref && q$2(h2.ref, null, y2), s2.push(y2.ref, y2.__c || w2, y2)), null == d2 && null != w2 && (d2 = w2), 4 & y2.__u || h2.__k === y2.__k ? f2 = A$2(y2, f2, n2) : "function" == typeof y2.type && void 0 !== g2 ? f2 = g2 : w2 && (f2 = w2.nextSibling), y2.__u &= -7);
  return u2.__e = d2, f2;
}
function P$1(n2, l2, u2, t2, i2) {
  var r2, o2, e2, f2, c2, s2 = u2.length, a2 = s2, h2 = 0;
  for (n2.__k = new Array(i2), r2 = 0; r2 < i2; r2++) null != (o2 = l2[r2]) && "boolean" != typeof o2 && "function" != typeof o2 ? (f2 = r2 + h2, (o2 = n2.__k[r2] = "string" == typeof o2 || "number" == typeof o2 || "bigint" == typeof o2 || o2.constructor == String ? m$1(null, o2, null, null, null) : w$1(o2) ? m$1(k$1, { children: o2 }, null, null, null) : null == o2.constructor && o2.__b > 0 ? m$1(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : o2).__ = n2, o2.__b = n2.__b + 1, e2 = null, -1 != (c2 = o2.__i = L(o2, u2, f2, a2)) && (a2--, (e2 = u2[c2]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c2 && (i2 > s2 ? h2-- : i2 < s2 && h2++), "function" != typeof o2.type && (o2.__u |= 4)) : c2 != f2 && (c2 == f2 - 1 ? h2-- : c2 == f2 + 1 ? h2++ : (c2 > f2 ? h2-- : h2++, o2.__u |= 4))) : n2.__k[r2] = null;
  if (a2) for (r2 = 0; r2 < s2; r2++) null != (e2 = u2[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = S(e2)), B$2(e2, e2));
  return t2;
}
function A$2(n2, l2, u2) {
  var t2, i2;
  if ("function" == typeof n2.type) {
    for (t2 = n2.__k, i2 = 0; t2 && i2 < t2.length; i2++) t2[i2] && (t2[i2].__ = n2, l2 = A$2(t2[i2], l2, u2));
    return l2;
  }
  n2.__e != l2 && (l2 && n2.type && !u2.contains(l2) && (l2 = S(n2)), u2.insertBefore(n2.__e, l2 || null), l2 = n2.__e);
  do {
    l2 = l2 && l2.nextSibling;
  } while (null != l2 && 8 == l2.nodeType);
  return l2;
}
function H$1(n2, l2) {
  return l2 = l2 || [], null == n2 || "boolean" == typeof n2 || (w$1(n2) ? n2.some(function(n3) {
    H$1(n3, l2);
  }) : l2.push(n2)), l2;
}
function L(n2, l2, u2, t2) {
  var i2, r2, o2 = n2.key, e2 = n2.type, f2 = l2[u2];
  if (null === f2 && null == n2.key || f2 && o2 == f2.key && e2 == f2.type && 0 == (2 & f2.__u)) return u2;
  if (t2 > (null != f2 && 0 == (2 & f2.__u) ? 1 : 0)) for (i2 = u2 - 1, r2 = u2 + 1; i2 >= 0 || r2 < l2.length; ) {
    if (i2 >= 0) {
      if ((f2 = l2[i2]) && 0 == (2 & f2.__u) && o2 == f2.key && e2 == f2.type) return i2;
      i2--;
    }
    if (r2 < l2.length) {
      if ((f2 = l2[r2]) && 0 == (2 & f2.__u) && o2 == f2.key && e2 == f2.type) return r2;
      r2++;
    }
  }
  return -1;
}
function T$2(n2, l2, u2) {
  "-" == l2[0] ? n2.setProperty(l2, null == u2 ? "" : u2) : n2[l2] = null == u2 ? "" : "number" != typeof u2 || y$1.test(l2) ? u2 : u2 + "px";
}
function j$2(n2, l2, u2, t2, i2) {
  var r2, o2;
  n: if ("style" == l2) if ("string" == typeof u2) n2.style.cssText = u2;
  else {
    if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u2 && l2 in u2 || T$2(n2.style, l2, "");
    if (u2) for (l2 in u2) t2 && u2[l2] == t2[l2] || T$2(n2.style, l2, u2[l2]);
  }
  else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(f$2, "$1")), o2 = l2.toLowerCase(), l2 = o2 in n2 || "onFocusOut" == l2 || "onFocusIn" == l2 ? o2.slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u2, u2 ? t2 ? u2.u = t2.u : (u2.u = c$1, n2.addEventListener(l2, r2 ? a$1 : s$1, r2)) : n2.removeEventListener(l2, r2 ? a$1 : s$1, r2);
  else {
    if ("http://www.w3.org/2000/svg" == i2) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
      n2[l2] = null == u2 ? "" : u2;
      break n;
    } catch (n3) {
    }
    "function" == typeof u2 || (null == u2 || false === u2 && "-" != l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u2 ? "" : u2));
  }
}
function F$1(n2) {
  return function(u2) {
    if (this.l) {
      var t2 = this.l[u2.type + n2];
      if (null == u2.t) u2.t = c$1++;
      else if (u2.t < t2.u) return;
      return t2(l$1.event ? l$1.event(u2) : u2);
    }
  };
}
function O(n2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
  var a2, h2, p2, v2, y2, _2, m2, b, S2, C2, M2, $2, P2, A2, H2, L2, T2, j2 = u2.type;
  if (null != u2.constructor) return null;
  128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f2 = u2.__e = t2.__e]), (a2 = l$1.__b) && a2(u2);
  n: if ("function" == typeof j2) try {
    if (b = u2.props, S2 = "prototype" in j2 && j2.prototype.render, C2 = (a2 = j2.contextType) && i2[a2.__c], M2 = a2 ? C2 ? C2.props.value : a2.__ : i2, t2.__c ? m2 = (h2 = u2.__c = t2.__c).__ = h2.__E : (S2 ? u2.__c = h2 = new j2(b, M2) : (u2.__c = h2 = new x(b, M2), h2.constructor = j2, h2.render = D$2), C2 && C2.sub(h2), h2.props = b, h2.state || (h2.state = {}), h2.context = M2, h2.__n = i2, p2 = h2.__d = true, h2.__h = [], h2._sb = []), S2 && null == h2.__s && (h2.__s = h2.state), S2 && null != j2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = d$1({}, h2.__s)), d$1(h2.__s, j2.getDerivedStateFromProps(b, h2.__s))), v2 = h2.props, y2 = h2.state, h2.__v = u2, p2) S2 && null == j2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), S2 && null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
    else {
      if (S2 && null == j2.getDerivedStateFromProps && b !== v2 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(b, M2), !h2.__e && null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(b, h2.__s, M2) || u2.__v == t2.__v) {
        for (u2.__v != t2.__v && (h2.props = b, h2.state = h2.__s, h2.__d = false), u2.__e = t2.__e, u2.__k = t2.__k, u2.__k.some(function(n3) {
          n3 && (n3.__ = u2);
        }), $2 = 0; $2 < h2._sb.length; $2++) h2.__h.push(h2._sb[$2]);
        h2._sb = [], h2.__h.length && e2.push(h2);
        break n;
      }
      null != h2.componentWillUpdate && h2.componentWillUpdate(b, h2.__s, M2), S2 && null != h2.componentDidUpdate && h2.__h.push(function() {
        h2.componentDidUpdate(v2, y2, _2);
      });
    }
    if (h2.context = M2, h2.props = b, h2.__P = n2, h2.__e = false, P2 = l$1.__r, A2 = 0, S2) {
      for (h2.state = h2.__s, h2.__d = false, P2 && P2(u2), a2 = h2.render(h2.props, h2.state, h2.context), H2 = 0; H2 < h2._sb.length; H2++) h2.__h.push(h2._sb[H2]);
      h2._sb = [];
    } else do {
      h2.__d = false, P2 && P2(u2), a2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
    } while (h2.__d && ++A2 < 25);
    h2.state = h2.__s, null != h2.getChildContext && (i2 = d$1(d$1({}, i2), h2.getChildContext())), S2 && !p2 && null != h2.getSnapshotBeforeUpdate && (_2 = h2.getSnapshotBeforeUpdate(v2, y2)), L2 = a2, null != a2 && a2.type === k$1 && null == a2.key && (L2 = N$1(a2.props.children)), f2 = I(n2, w$1(L2) ? L2 : [L2], u2, t2, i2, r2, o2, e2, f2, c2, s2), h2.base = u2.__e, u2.__u &= -161, h2.__h.length && e2.push(h2), m2 && (h2.__E = h2.__ = null);
  } catch (n3) {
    if (u2.__v = null, c2 || null != o2) if (n3.then) {
      for (u2.__u |= c2 ? 160 : 128; f2 && 8 == f2.nodeType && f2.nextSibling; ) f2 = f2.nextSibling;
      o2[o2.indexOf(f2)] = null, u2.__e = f2;
    } else for (T2 = o2.length; T2--; ) g$1(o2[T2]);
    else u2.__e = t2.__e, u2.__k = t2.__k;
    l$1.__e(n3, u2, t2);
  }
  else null == o2 && u2.__v == t2.__v ? (u2.__k = t2.__k, u2.__e = t2.__e) : f2 = u2.__e = V$1(t2.__e, u2, t2, i2, r2, o2, e2, c2, s2);
  return (a2 = l$1.diffed) && a2(u2), 128 & u2.__u ? void 0 : f2;
}
function z$1(n2, u2, t2) {
  for (var i2 = 0; i2 < t2.length; i2++) q$2(t2[i2], t2[++i2], t2[++i2]);
  l$1.__c && l$1.__c(u2, n2), n2.some(function(u3) {
    try {
      n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
        n3.call(u3);
      });
    } catch (n3) {
      l$1.__e(n3, u3.__v);
    }
  });
}
function N$1(n2) {
  return "object" != typeof n2 || null == n2 || n2.__b && n2.__b > 0 ? n2 : w$1(n2) ? n2.map(N$1) : d$1({}, n2);
}
function V$1(u2, t2, i2, r2, o2, e2, f2, c2, s2) {
  var a2, h2, v2, y2, d2, _2, m2, b = i2.props, k2 = t2.props, x2 = t2.type;
  if ("svg" == x2 ? o2 = "http://www.w3.org/2000/svg" : "math" == x2 ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), null != e2) {
    for (a2 = 0; a2 < e2.length; a2++) if ((d2 = e2[a2]) && "setAttribute" in d2 == !!x2 && (x2 ? d2.localName == x2 : 3 == d2.nodeType)) {
      u2 = d2, e2[a2] = null;
      break;
    }
  }
  if (null == u2) {
    if (null == x2) return document.createTextNode(k2);
    u2 = document.createElementNS(o2, x2, k2.is && k2), c2 && (l$1.__m && l$1.__m(t2, e2), c2 = false), e2 = null;
  }
  if (null == x2) b === k2 || c2 && u2.data == k2 || (u2.data = k2);
  else {
    if (e2 = e2 && n.call(u2.childNodes), b = i2.props || p$1, !c2 && null != e2) for (b = {}, a2 = 0; a2 < u2.attributes.length; a2++) b[(d2 = u2.attributes[a2]).name] = d2.value;
    for (a2 in b) if (d2 = b[a2], "children" == a2) ;
    else if ("dangerouslySetInnerHTML" == a2) v2 = d2;
    else if (!(a2 in k2)) {
      if ("value" == a2 && "defaultValue" in k2 || "checked" == a2 && "defaultChecked" in k2) continue;
      j$2(u2, a2, null, d2, o2);
    }
    for (a2 in k2) d2 = k2[a2], "children" == a2 ? y2 = d2 : "dangerouslySetInnerHTML" == a2 ? h2 = d2 : "value" == a2 ? _2 = d2 : "checked" == a2 ? m2 = d2 : c2 && "function" != typeof d2 || b[a2] === d2 || j$2(u2, a2, d2, b[a2], o2);
    if (h2) c2 || v2 && (h2.__html == v2.__html || h2.__html == u2.innerHTML) || (u2.innerHTML = h2.__html), t2.__k = [];
    else if (v2 && (u2.innerHTML = ""), I("template" == t2.type ? u2.content : u2, w$1(y2) ? y2 : [y2], t2, i2, r2, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o2, e2, f2, e2 ? e2[0] : i2.__k && S(i2, 0), c2, s2), null != e2) for (a2 = e2.length; a2--; ) g$1(e2[a2]);
    c2 || (a2 = "value", "progress" == x2 && null == _2 ? u2.removeAttribute("value") : null != _2 && (_2 !== u2[a2] || "progress" == x2 && !_2 || "option" == x2 && _2 != b[a2]) && j$2(u2, a2, _2, b[a2], o2), a2 = "checked", null != m2 && m2 != u2[a2] && j$2(u2, a2, m2, b[a2], o2));
  }
  return u2;
}
function q$2(n2, u2, t2) {
  try {
    if ("function" == typeof n2) {
      var i2 = "function" == typeof n2.__u;
      i2 && n2.__u(), i2 && null == u2 || (n2.__u = n2(u2));
    } else n2.current = u2;
  } catch (n3) {
    l$1.__e(n3, t2);
  }
}
function B$2(n2, u2, t2) {
  var i2, r2;
  if (l$1.unmount && l$1.unmount(n2), (i2 = n2.ref) && (i2.current && i2.current != n2.__e || q$2(i2, null, u2)), null != (i2 = n2.__c)) {
    if (i2.componentWillUnmount) try {
      i2.componentWillUnmount();
    } catch (n3) {
      l$1.__e(n3, u2);
    }
    i2.base = i2.__P = null;
  }
  if (i2 = n2.__k) for (r2 = 0; r2 < i2.length; r2++) i2[r2] && B$2(i2[r2], u2, t2 || "function" != typeof n2.type);
  t2 || g$1(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
}
function D$2(n2, l2, u2) {
  return this.constructor(n2, u2);
}
function E$1(u2, t2, i2) {
  var r2, o2, e2, f2;
  t2 == document && (t2 = document.documentElement), l$1.__ && l$1.__(u2, t2), o2 = (r2 = false) ? null : t2.__k, e2 = [], f2 = [], O(t2, u2 = t2.__k = _(k$1, null, [u2]), o2 || p$1, p$1, t2.namespaceURI, o2 ? null : t2.firstChild ? n.call(t2.childNodes) : null, e2, o2 ? o2.__e : t2.firstChild, r2, f2), z$1(e2, u2, f2);
}
n = v$1.slice, l$1 = { __e: function(n2, l2, u2, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, u$2 = 0, x.prototype.setState = function(n2, l2) {
  var u2;
  u2 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d$1({}, this.state), "function" == typeof n2 && (n2 = n2(d$1({}, u2), this.props)), n2 && d$1(u2, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), M(this));
}, x.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
}, x.prototype.render = k$1, i$1 = [], o$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$1 = function(n2, l2) {
  return n2.__v.__b - l2.__v.__b;
}, $.__r = 0, f$2 = /(PointerCapture)$|Capture$/i, c$1 = 0, s$1 = F$1(false), a$1 = F$1(true);
var f$1 = 0;
function u$1(e2, t2, n2, o2, i2, u2) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f$1, __i: -1, __u: 0, __source: i2, __self: u2 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l$1.vnode && l$1.vnode(l2), l2;
}
var t, r, u, i, o = 0, f = [], c = l$1, e = c.__b, a = c.__r, v = c.diffed, l = c.__c, m = c.unmount, s = c.__;
function p(n2, t2) {
  c.__h && c.__h(r, n2, o || t2), o = 0;
  var u2 = r.__H || (r.__H = { __: [], __h: [] });
  return n2 >= u2.__.length && u2.__.push({}), u2.__[n2];
}
function d(n2) {
  return o = 1, h(D$1, n2);
}
function h(n2, u2, i2) {
  var o2 = p(t++, 2);
  if (o2.t = n2, !o2.__c && (o2.__ = [i2 ? i2(u2) : D$1(void 0, u2), function(n3) {
    var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n3);
    t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
  }], o2.__c = r, !r.__f)) {
    var f2 = function(n3, t2, r2) {
      if (!o2.__c.__H) return true;
      var u3 = o2.__c.__H.__.filter(function(n4) {
        return !!n4.__c;
      });
      if (u3.every(function(n4) {
        return !n4.__N;
      })) return !c2 || c2.call(this, n3, t2, r2);
      var i3 = o2.__c.props !== n3;
      return u3.forEach(function(n4) {
        if (n4.__N) {
          var t3 = n4.__[0];
          n4.__ = n4.__N, n4.__N = void 0, t3 !== n4.__[0] && (i3 = true);
        }
      }), c2 && c2.call(this, n3, t2, r2) || i3;
    };
    r.__f = true;
    var c2 = r.shouldComponentUpdate, e2 = r.componentWillUpdate;
    r.componentWillUpdate = function(n3, t2, r2) {
      if (this.__e) {
        var u3 = c2;
        c2 = void 0, f2(n3, t2, r2), c2 = u3;
      }
      e2 && e2.call(this, n3, t2, r2);
    }, r.shouldComponentUpdate = f2;
  }
  return o2.__N || o2.__;
}
function y(n2, u2) {
  var i2 = p(t++, 3);
  !c.__s && C(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r.__H.__h.push(i2));
}
function A$1(n2) {
  return o = 5, T$1(function() {
    return { current: n2 };
  }, []);
}
function T$1(n2, r2) {
  var u2 = p(t++, 7);
  return C(u2.__H, r2) && (u2.__ = n2(), u2.__H = r2, u2.__h = n2), u2.__;
}
function q$1(n2, t2) {
  return o = 8, T$1(function() {
    return n2;
  }, t2);
}
function j$1() {
  for (var n2; n2 = f.shift(); ) if (n2.__P && n2.__H) try {
    n2.__H.__h.forEach(z), n2.__H.__h.forEach(B$1), n2.__H.__h = [];
  } catch (t2) {
    n2.__H.__h = [], c.__e(t2, n2.__v);
  }
}
c.__b = function(n2) {
  r = null, e && e(n2);
}, c.__ = function(n2, t2) {
  n2 && t2.__k && t2.__k.__m && (n2.__m = t2.__k.__m), s && s(n2, t2);
}, c.__r = function(n2) {
  a && a(n2), t = 0;
  var i2 = (r = n2.__c).__H;
  i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.forEach(function(n3) {
    n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
  })) : (i2.__h.forEach(z), i2.__h.forEach(B$1), i2.__h = [], t = 0)), u = r;
}, c.diffed = function(n2) {
  v && v(n2);
  var t2 = n2.__c;
  t2 && t2.__H && (t2.__H.__h.length && (1 !== f.push(t2) && i === c.requestAnimationFrame || ((i = c.requestAnimationFrame) || w)(j$1)), t2.__H.__.forEach(function(n3) {
    n3.u && (n3.__H = n3.u), n3.u = void 0;
  })), u = r = null;
}, c.__c = function(n2, t2) {
  t2.some(function(n3) {
    try {
      n3.__h.forEach(z), n3.__h = n3.__h.filter(function(n4) {
        return !n4.__ || B$1(n4);
      });
    } catch (r2) {
      t2.some(function(n4) {
        n4.__h && (n4.__h = []);
      }), t2 = [], c.__e(r2, n3.__v);
    }
  }), l && l(n2, t2);
}, c.unmount = function(n2) {
  m && m(n2);
  var t2, r2 = n2.__c;
  r2 && r2.__H && (r2.__H.__.forEach(function(n3) {
    try {
      z(n3);
    } catch (n4) {
      t2 = n4;
    }
  }), r2.__H = void 0, t2 && c.__e(t2, r2.__v));
};
var k = "function" == typeof requestAnimationFrame;
function w(n2) {
  var t2, r2 = function() {
    clearTimeout(u2), k && cancelAnimationFrame(t2), setTimeout(n2);
  }, u2 = setTimeout(r2, 35);
  k && (t2 = requestAnimationFrame(r2));
}
function z(n2) {
  var t2 = r, u2 = n2.__c;
  "function" == typeof u2 && (n2.__c = void 0, u2()), r = t2;
}
function B$1(n2) {
  var t2 = r;
  n2.__c = n2.__(), r = t2;
}
function C(n2, t2) {
  return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
    return t3 !== n2[r2];
  });
}
function D$1(n2, t2) {
  return "function" == typeof t2 ? t2(n2) : t2;
}
function ModeSwitcher({ currentMode, onModeChange }) {
  return /* @__PURE__ */ u$1("div", { className: "flex gap-3 mb-8 justify-center", children: [
    /* @__PURE__ */ u$1("div", { "data-testid": "current-mode", className: "sr-only", children: [
      "Current mode: ",
      currentMode
    ] }),
    /* @__PURE__ */ u$1(
      "button",
      {
        "data-testid": "host-mode-button",
        onClick: () => onModeChange("host"),
        className: `px-6 py-3 border-2 rounded-lg font-medium transition-all duration-300 ${currentMode === "host" ? "bg-blue-600 border-blue-600 text-white" : "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"}`,
        children: "Host"
      }
    ),
    /* @__PURE__ */ u$1(
      "button",
      {
        "data-testid": "client-mode-button",
        onClick: () => onModeChange("client"),
        className: `px-6 py-3 border-2 rounded-lg font-medium transition-all duration-300 ${currentMode === "client" ? "bg-blue-600 border-blue-600 text-white" : "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"}`,
        children: "Client"
      }
    )
  ] });
}
function g(n2, t2) {
  for (var e2 in t2) n2[e2] = t2[e2];
  return n2;
}
function E(n2, t2) {
  for (var e2 in n2) if ("__source" !== e2 && !(e2 in t2)) return true;
  for (var r2 in t2) if ("__source" !== r2 && n2[r2] !== t2[r2]) return true;
  return false;
}
function N(n2, t2) {
  this.props = n2, this.context = t2;
}
(N.prototype = new x()).isPureReactComponent = true, N.prototype.shouldComponentUpdate = function(n2, t2) {
  return E(this.props, n2) || E(this.state, t2);
};
var T = l$1.__b;
l$1.__b = function(n2) {
  n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), T && T(n2);
};
var A = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function D(n2) {
  function t2(t3) {
    var e2 = g({}, t3);
    return delete e2.ref, n2(e2, t3.ref || null);
  }
  return t2.$$typeof = A, t2.render = t2, t2.prototype.isReactComponent = t2.__f = true, t2.displayName = "ForwardRef(" + (n2.displayName || n2.name) + ")", t2;
}
var F = l$1.__e;
l$1.__e = function(n2, t2, e2, r2) {
  if (n2.then) {
    for (var u2, o2 = t2; o2 = o2.__; ) if ((u2 = o2.__c) && u2.__c) return null == t2.__e && (t2.__e = e2.__e, t2.__k = e2.__k), u2.__c(n2, t2);
  }
  F(n2, t2, e2, r2);
};
var U = l$1.unmount;
function V(n2, t2, e2) {
  return n2 && (n2.__c && n2.__c.__H && (n2.__c.__H.__.forEach(function(n3) {
    "function" == typeof n3.__c && n3.__c();
  }), n2.__c.__H = null), null != (n2 = g({}, n2)).__c && (n2.__c.__P === e2 && (n2.__c.__P = t2), n2.__c.__e = true, n2.__c = null), n2.__k = n2.__k && n2.__k.map(function(n3) {
    return V(n3, t2, e2);
  })), n2;
}
function W(n2, t2, e2) {
  return n2 && e2 && (n2.__v = null, n2.__k = n2.__k && n2.__k.map(function(n3) {
    return W(n3, t2, e2);
  }), n2.__c && n2.__c.__P === t2 && (n2.__e && e2.appendChild(n2.__e), n2.__c.__e = true, n2.__c.__P = e2)), n2;
}
function P() {
  this.__u = 0, this.o = null, this.__b = null;
}
function j(n2) {
  var t2 = n2.__.__c;
  return t2 && t2.__a && t2.__a(n2);
}
function B() {
  this.i = null, this.l = null;
}
l$1.unmount = function(n2) {
  var t2 = n2.__c;
  t2 && t2.__R && t2.__R(), t2 && 32 & n2.__u && (n2.type = null), U && U(n2);
}, (P.prototype = new x()).__c = function(n2, t2) {
  var e2 = t2.__c, r2 = this;
  null == r2.o && (r2.o = []), r2.o.push(e2);
  var u2 = j(r2.__v), o2 = false, i2 = function() {
    o2 || (o2 = true, e2.__R = null, u2 ? u2(l2) : l2());
  };
  e2.__R = i2;
  var l2 = function() {
    if (!--r2.__u) {
      if (r2.state.__a) {
        var n3 = r2.state.__a;
        r2.__v.__k[0] = W(n3, n3.__c.__P, n3.__c.__O);
      }
      var t3;
      for (r2.setState({ __a: r2.__b = null }); t3 = r2.o.pop(); ) t3.forceUpdate();
    }
  };
  r2.__u++ || 32 & t2.__u || r2.setState({ __a: r2.__b = r2.__v.__k[0] }), n2.then(i2, i2);
}, P.prototype.componentWillUnmount = function() {
  this.o = [];
}, P.prototype.render = function(n2, e2) {
  if (this.__b) {
    if (this.__v.__k) {
      var r2 = document.createElement("div"), o2 = this.__v.__k[0].__c;
      this.__v.__k[0] = V(this.__b, r2, o2.__O = o2.__P);
    }
    this.__b = null;
  }
  var i2 = e2.__a && _(k$1, null, n2.fallback);
  return i2 && (i2.__u &= -33), [_(k$1, null, e2.__a ? null : n2.children), i2];
};
var H = function(n2, t2, e2) {
  if (++e2[1] === e2[0] && n2.l.delete(t2), n2.props.revealOrder && ("t" !== n2.props.revealOrder[0] || !n2.l.size)) for (e2 = n2.i; e2; ) {
    for (; e2.length > 3; ) e2.pop()();
    if (e2[1] < e2[0]) break;
    n2.i = e2 = e2[2];
  }
};
(B.prototype = new x()).__a = function(n2) {
  var t2 = this, e2 = j(t2.__v), r2 = t2.l.get(n2);
  return r2[0]++, function(u2) {
    var o2 = function() {
      t2.props.revealOrder ? (r2.push(u2), H(t2, n2, r2)) : u2();
    };
    e2 ? e2(o2) : o2();
  };
}, B.prototype.render = function(n2) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t2 = H$1(n2.children);
  n2.revealOrder && "b" === n2.revealOrder[0] && t2.reverse();
  for (var e2 = t2.length; e2--; ) this.l.set(t2[e2], this.i = [1, 0, this.i]);
  return n2.children;
}, B.prototype.componentDidUpdate = B.prototype.componentDidMount = function() {
  var n2 = this;
  this.l.forEach(function(t2, e2) {
    H(n2, e2, t2);
  });
};
var q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, G = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, J = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, K = /[A-Z0-9]/g, Q = "undefined" != typeof document, X = function(n2) {
  return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n2);
};
x.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t2) {
  Object.defineProperty(x.prototype, t2, { configurable: true, get: function() {
    return this["UNSAFE_" + t2];
  }, set: function(n2) {
    Object.defineProperty(this, t2, { configurable: true, writable: true, value: n2 });
  } });
});
var en = l$1.event;
function rn() {
}
function un() {
  return this.cancelBubble;
}
function on() {
  return this.defaultPrevented;
}
l$1.event = function(n2) {
  return en && (n2 = en(n2)), n2.persist = rn, n2.isPropagationStopped = un, n2.isDefaultPrevented = on, n2.nativeEvent = n2;
};
var cn = { enumerable: false, configurable: true, get: function() {
  return this.class;
} }, fn = l$1.vnode;
l$1.vnode = function(n2) {
  "string" == typeof n2.type && function(n3) {
    var t2 = n3.props, e2 = n3.type, u2 = {}, o2 = -1 === e2.indexOf("-");
    for (var i2 in t2) {
      var l2 = t2[i2];
      if (!("value" === i2 && "defaultValue" in t2 && null == l2 || Q && "children" === i2 && "noscript" === e2 || "class" === i2 || "className" === i2)) {
        var c2 = i2.toLowerCase();
        "defaultValue" === i2 && "value" in t2 && null == t2.value ? i2 = "value" : "download" === i2 && true === l2 ? l2 = "" : "translate" === c2 && "no" === l2 ? l2 = false : "o" === c2[0] && "n" === c2[1] ? "ondoubleclick" === c2 ? i2 = "ondblclick" : "onchange" !== c2 || "input" !== e2 && "textarea" !== e2 || X(t2.type) ? "onfocus" === c2 ? i2 = "onfocusin" : "onblur" === c2 ? i2 = "onfocusout" : J.test(i2) && (i2 = c2) : c2 = i2 = "oninput" : o2 && G.test(i2) ? i2 = i2.replace(K, "-$&").toLowerCase() : null === l2 && (l2 = void 0), "oninput" === c2 && u2[i2 = c2] && (i2 = "oninputCapture"), u2[i2] = l2;
      }
    }
    "select" == e2 && u2.multiple && Array.isArray(u2.value) && (u2.value = H$1(t2.children).forEach(function(n4) {
      n4.props.selected = -1 != u2.value.indexOf(n4.props.value);
    })), "select" == e2 && null != u2.defaultValue && (u2.value = H$1(t2.children).forEach(function(n4) {
      n4.props.selected = u2.multiple ? -1 != u2.defaultValue.indexOf(n4.props.value) : u2.defaultValue == n4.props.value;
    })), t2.class && !t2.className ? (u2.class = t2.class, Object.defineProperty(u2, "className", cn)) : (t2.className && !t2.class || t2.class && t2.className) && (u2.class = u2.className = t2.className), n3.props = u2;
  }(n2), n2.$$typeof = q, fn && fn(n2);
};
var an = l$1.__r;
l$1.__r = function(n2) {
  an && an(n2), n2.__c;
};
var sn = l$1.diffed;
l$1.diffed = function(n2) {
  sn && sn(n2);
  var t2 = n2.props, e2 = n2.__e;
  null != e2 && "textarea" === n2.type && "value" in t2 && t2.value !== e2.value && (e2.value = null == t2.value ? "" : t2.value);
};
const VideoPlayer = D(
  ({ onVideoEvent, onVideoLoad }, ref) => {
    y(() => {
      const video = ref;
      if (!video.current) return;
      const handleLoadedMetadata = () => {
        if (video.current?.src) {
          onVideoLoad(video.current.src);
        }
      };
      const handlePlay = () => {
        onVideoEvent("play", video.current?.currentTime);
      };
      const handlePause = () => {
        onVideoEvent("pause", video.current?.currentTime);
      };
      const handleSeeked = () => {
        onVideoEvent("seek", video.current?.currentTime);
      };
      const videoElement = video.current;
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("pause", handlePause);
      videoElement.addEventListener("seeked", handleSeeked);
      return () => {
        videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("pause", handlePause);
        videoElement.removeEventListener("seeked", handleSeeked);
      };
    }, [onVideoEvent, onVideoLoad, ref]);
    return /* @__PURE__ */ u$1("div", { className: "w-full max-w-4xl mx-auto mb-8", children: /* @__PURE__ */ u$1("div", { className: "bg-black rounded-xl overflow-hidden", children: /* @__PURE__ */ u$1(
      "video",
      {
        ref,
        controls: true,
        className: "w-full h-96 bg-black",
        children: "Your browser does not support the video tag."
      }
    ) }) });
  }
);
function HostControls({ videoRef, onSetupPeer, onVideoEvent, onAcceptAnswer, connectionStatus }) {
  const [offer, setOffer] = d("");
  const [answerInput, setAnswerInput] = d("");
  const [isHosting, setIsHosting] = d(false);
  const handleStartHosting = async () => {
    const offerData = await onSetupPeer();
    if (offerData) {
      setOffer(offerData);
      setIsHosting(true);
    }
  };
  const handleFileSelect = (e2) => {
    const file = e2.target.files?.[0];
    if (file && videoRef.current) {
      const url = URL.createObjectURL(file);
      videoRef.current.src = url;
    }
  };
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
      onVideoEvent("reset");
    }
  };
  const handleAcceptAnswer = async () => {
    if (answerInput.trim()) {
      await onAcceptAnswer(answerInput.trim());
      setAnswerInput("");
    }
  };
  const handleAnswerChange = async (e2) => {
    const value = e2.target.value;
    setAnswerInput(value);
    console.log("Host: Answer input changed, length:", value.length);
    console.log("Host: Answer content preview:", value.substring(0, 100));
    if (value.trim() && value.includes('"sdp"') && value.includes('"type"')) {
      console.log("Host: Auto-accepting answer...");
      await onAcceptAnswer(value.trim());
      setAnswerInput("");
    }
  };
  return /* @__PURE__ */ u$1("div", { className: "bg-gray-800 rounded-xl p-6 mb-6", children: [
    /* @__PURE__ */ u$1("h3", { className: "text-xl font-semibold text-blue-400 mb-6", children: "Host Controls" }),
    /* @__PURE__ */ u$1("div", { className: "space-y-6", children: [
      !isHosting && /* @__PURE__ */ u$1("div", { className: "text-center", children: /* @__PURE__ */ u$1(
        "button",
        {
          "data-testid": "start-hosting-button",
          onClick: handleStartHosting,
          className: "px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold",
          children: "Start Hosting"
        }
      ) }),
      isHosting && /* @__PURE__ */ u$1(k$1, { children: [
        /* @__PURE__ */ u$1(
          "div",
          {
            "data-testid": "connection-status",
            className: `p-3 rounded-lg text-center font-medium ${connectionStatus.connected ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`,
            children: connectionStatus.message
          }
        ),
        /* @__PURE__ */ u$1("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ u$1("label", { htmlFor: "file-input", className: "text-gray-300 font-medium", children: "Select Video File:" }),
          /* @__PURE__ */ u$1(
            "input",
            {
              type: "file",
              id: "file-input",
              accept: "video/*",
              onChange: handleFileSelect,
              className: "flex-1 p-2 bg-gray-900 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
            }
          )
        ] }),
        /* @__PURE__ */ u$1("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ u$1(
            "button",
            {
              onClick: handlePlay,
              className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
              children: "Play"
            }
          ),
          /* @__PURE__ */ u$1(
            "button",
            {
              onClick: handlePause,
              className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
              children: "Pause"
            }
          ),
          /* @__PURE__ */ u$1(
            "button",
            {
              onClick: handleReset,
              className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
              children: "Reset"
            }
          )
        ] }),
        /* @__PURE__ */ u$1("div", { children: [
          /* @__PURE__ */ u$1("label", { htmlFor: "offer-display", className: "block text-gray-300 mb-2", children: "Share this offer with the client:" }),
          /* @__PURE__ */ u$1(
            "textarea",
            {
              id: "offer-display",
              "data-testid": "offer-display",
              value: offer,
              readOnly: true,
              placeholder: "Offer will appear here...",
              className: "w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-sm resize-y"
            }
          )
        ] }),
        /* @__PURE__ */ u$1("div", { children: [
          /* @__PURE__ */ u$1("label", { htmlFor: "answer-input", className: "block text-gray-300 mb-2", children: "Paste the client's answer here:" }),
          /* @__PURE__ */ u$1("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ u$1(
              "textarea",
              {
                id: "answer-input",
                "data-testid": "answer-input",
                value: answerInput,
                onChange: handleAnswerChange,
                placeholder: "Paste client's answer here (will auto-accept)...",
                className: "flex-1 h-24 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-sm resize-y"
              }
            ),
            /* @__PURE__ */ u$1(
              "button",
              {
                "data-testid": "accept-answer-button",
                onClick: handleAcceptAnswer,
                disabled: !answerInput.trim(),
                className: "px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors",
                children: "Accept Answer"
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
function ClientControls({ connectionStatus, onConnectToHost }) {
  const [offerInput, setOfferInput] = d("");
  const [answer, setAnswer] = d("");
  const handleConnect = async () => {
    if (offerInput.trim()) {
      const answerData = await onConnectToHost(offerInput.trim());
      if (answerData) {
        setAnswer(answerData);
      }
    }
  };
  return /* @__PURE__ */ u$1("div", { className: "bg-gray-800 rounded-xl p-6 mb-6", children: [
    /* @__PURE__ */ u$1("h3", { className: "text-xl font-semibold text-blue-400 mb-6", children: "Client Controls" }),
    /* @__PURE__ */ u$1("div", { className: "space-y-6", children: [
      /* @__PURE__ */ u$1("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ u$1(
          "input",
          {
            type: "text",
            "data-testid": "offer-input",
            value: offerInput,
            onChange: (e2) => setOfferInput(e2.target.value),
            placeholder: "Paste host's offer here...",
            className: "flex-1 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400"
          }
        ),
        /* @__PURE__ */ u$1(
          "button",
          {
            "data-testid": "connect-button",
            onClick: handleConnect,
            className: "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
            children: "Connect"
          }
        )
      ] }),
      /* @__PURE__ */ u$1(
        "div",
        {
          "data-testid": "connection-status",
          className: `p-3 rounded-lg text-center font-medium ${connectionStatus.connected ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`,
          children: connectionStatus.message
        }
      ),
      answer && /* @__PURE__ */ u$1("div", { children: [
        /* @__PURE__ */ u$1("label", { htmlFor: "answer-display", className: "block text-gray-300 mb-2", children: "Send this answer back to the host:" }),
        /* @__PURE__ */ u$1(
          "textarea",
          {
            id: "answer-display",
            "data-testid": "answer-display",
            value: answer,
            readOnly: true,
            placeholder: "Answer will appear here...",
            className: "w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-sm resize-y"
          }
        )
      ] })
    ] })
  ] });
}
function App() {
  const [mode, setMode] = d("host");
  const [connectionStatus, setConnectionStatus] = d({
    connected: false,
    message: "Disconnected"
  });
  const [peerConnection, setPeerConnection] = d(null);
  const videoRef = A$1(null);
  y(() => {
    const initialMode = window.electronAPI?.getAppMode() || "host";
    if (initialMode !== "default") {
      setMode(initialMode);
    }
  }, []);
  const disconnectPeer = () => {
    if (peerConnection) {
      peerConnection.dataChannel?.close();
      peerConnection.connection.close();
      setPeerConnection(null);
    }
    setConnectionStatus({ connected: false, message: "Disconnected" });
  };
  const handleModeChange = (newMode) => {
    setMode(newMode);
    disconnectPeer();
  };
  const sendSyncMessage = (message) => {
    if (peerConnection?.dataChannel?.readyState === "open") {
      peerConnection.dataChannel.send(JSON.stringify(message));
    }
  };
  const handleSyncMessage = (message) => {
    const video = videoRef.current;
    if (!video) return;
    switch (message.type) {
      case "play":
        if (message.currentTime !== void 0) {
          video.currentTime = message.currentTime;
        }
        video.play();
        break;
      case "pause":
        if (message.currentTime !== void 0) {
          video.currentTime = message.currentTime;
        }
        video.pause();
        break;
      case "seek":
        if (message.currentTime !== void 0) {
          video.currentTime = message.currentTime;
        }
        break;
      case "reset":
        video.currentTime = 0;
        video.pause();
        break;
      case "video-loaded":
        if (message.videoUrl) {
          video.src = message.videoUrl;
        }
        break;
    }
  };
  const setupHostPeer = q$1(async () => {
    console.log("🚀 Host: Setting up peer connection...");
    try {
      const connection = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
      });
      console.log("✅ Host: RTCPeerConnection created", connection);
      const dataChannel = connection.createDataChannel("sync", {
        ordered: true
      });
      console.log("📡 Host: Data channel created with label:", dataChannel.label, "id:", dataChannel.id, "readyState:", dataChannel.readyState);
      const newPeerConnection = {
        connection,
        dataChannel,
        isHost: true
      };
      setPeerConnection(newPeerConnection);
      console.log("💾 Host: Peer connection stored in state");
      dataChannel.onmessage = (event) => {
        console.log("📨 Host: Raw message received:", event.data);
        const message = JSON.parse(event.data);
        if (message.type === "pong") {
          console.log("🏓 Host: Received pong - connection alive", message);
        } else {
          console.log("📩 Host: Received message:", message);
        }
      };
      dataChannel.onopen = () => {
        console.log("🔓 Host: Data channel onopen triggered - readyState:", dataChannel.readyState);
        console.log("🎉 Host: Data channel opened - client connected");
        setConnectionStatus({ connected: true, message: "Client connected" });
        console.log("💓 Host: Starting heartbeat ping from onopen");
        const heartbeat = setInterval(() => {
          if (dataChannel.readyState === "open") {
            console.log("🏓 Host: Sending ping from onopen heartbeat...");
            dataChannel.send(JSON.stringify({ type: "ping", timestamp: Date.now() }));
          } else {
            console.log("💔 Host: Heartbeat stopped - dataChannel readyState:", dataChannel.readyState);
            clearInterval(heartbeat);
          }
        }, 5e3);
      };
      dataChannel.addEventListener("readystatechange", () => {
        console.log("🔄 Host: Data channel ready state changed to:", dataChannel.readyState);
        console.log("🔍 Host: Full dataChannel state:", {
          readyState: dataChannel.readyState,
          id: dataChannel.id,
          label: dataChannel.label,
          bufferedAmount: dataChannel.bufferedAmount
        });
        if (dataChannel.readyState === "open") {
          console.log("🎯 Host: Data channel opened via readystatechange - starting ping if not already started");
          setConnectionStatus({ connected: true, message: "Client connected" });
          console.log("💓 Host: Starting heartbeat ping from readystatechange");
          const heartbeat = setInterval(() => {
            if (dataChannel.readyState === "open") {
              console.log("🏓 Host: Sending ping from readystatechange heartbeat...");
              dataChannel.send(JSON.stringify({ type: "ping", timestamp: Date.now() }));
            } else {
              console.log("💔 Host: Heartbeat stopped - dataChannel readyState:", dataChannel.readyState);
              clearInterval(heartbeat);
            }
          }, 5e3);
        } else if (dataChannel.readyState === "connecting") {
          console.log("🔗 Host: Data channel is connecting...");
        } else if (dataChannel.readyState === "closing") {
          console.log("🔒 Host: Data channel is closing...");
        } else if (dataChannel.readyState === "closed") {
          console.log("❌ Host: Data channel is closed");
        }
      });
      dataChannel.onclose = () => {
        console.log("🔒 Host: Data channel onclose triggered");
        console.log("💔 Host: Data channel closed - client disconnected");
        setConnectionStatus({ connected: false, message: "Client disconnected" });
      };
      dataChannel.onerror = (error) => {
        console.error("❌ Host: Data channel error:", error);
        console.error("❌ Host: Data channel error event:", error);
      };
      connection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("🧊 Host: ICE candidate generated:", event.candidate);
          console.log("🧊 Host: ICE candidate details:", {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex
          });
        } else {
          console.log("🧊 Host: ICE gathering complete (null candidate)");
        }
      };
      connection.onconnectionstatechange = () => {
        console.log("🔄 Host: Connection state changed to:", connection.connectionState);
        console.log("🔍 Host: Full connection state:", {
          connectionState: connection.connectionState,
          iceConnectionState: connection.iceConnectionState,
          iceGatheringState: connection.iceGatheringState,
          signalingState: connection.signalingState
        });
        if (connection.connectionState === "connected") {
          console.log("✅ Host: WebRTC connection established");
        } else if (connection.connectionState === "disconnected" || connection.connectionState === "failed") {
          console.log("💔 Host: WebRTC connection lost");
          setConnectionStatus({ connected: false, message: "Client disconnected" });
        }
      };
      connection.oniceconnectionstatechange = () => {
        console.log("🧊 Host: ICE connection state changed to:", connection.iceConnectionState);
      };
      connection.onicegatheringstatechange = () => {
        console.log("🧊 Host: ICE gathering state changed to:", connection.iceGatheringState);
      };
      connection.onsignalingstatechange = () => {
        console.log("📡 Host: Signaling state changed to:", connection.signalingState);
      };
      console.log("📝 Host: Creating offer...");
      const offer = await connection.createOffer();
      console.log("✅ Host: Offer created:", offer);
      console.log("📝 Host: Setting local description...");
      await connection.setLocalDescription(offer);
      console.log("✅ Host: Local description set");
      console.log("🔍 Host: Local description details:", connection.localDescription);
      const offerString = JSON.stringify(offer);
      console.log("📦 Host: Offer stringified, length:", offerString.length);
      console.log("📤 Host: Returning offer string");
      return offerString;
    } catch (error) {
      console.error("💥 Error setting up host peer:", error);
      console.error("💥 Error stack:", error.stack);
      setConnectionStatus({ connected: false, message: "Error setting up host" });
      return null;
    }
  }, []);
  const acceptAnswer = q$1(async (answer) => {
    console.log("🎯 Host: acceptAnswer called");
    console.log("🔍 Host: peerConnection exists:", !!peerConnection);
    console.log("🔍 Host: peerConnection.isHost:", peerConnection?.isHost);
    console.log("🔍 Host: peerConnection details:", peerConnection ? {
      isHost: peerConnection.isHost,
      connectionState: peerConnection.connection.connectionState,
      signalingState: peerConnection.connection.signalingState,
      dataChannelState: peerConnection.dataChannel?.readyState
    } : "null");
    if (!peerConnection || !peerConnection.isHost) {
      console.log("❌ Host: No peer connection or not host, aborting");
      return;
    }
    try {
      console.log("📝 Host: Parsing answer JSON...");
      console.log("📥 Host: Raw answer string:", answer);
      const answerData = JSON.parse(answer);
      console.log("✅ Host: Answer parsed successfully:", answerData);
      console.log("🔍 Host: Answer details:", {
        type: answerData.type,
        sdp: answerData.sdp?.substring(0, 100) + "..."
      });
      console.log("📡 Host: Setting remote description...");
      console.log("🔍 Host: Connection state before setRemoteDescription:", peerConnection.connection.connectionState);
      console.log("🔍 Host: Signaling state before setRemoteDescription:", peerConnection.connection.signalingState);
      console.log("🔍 Host: Data channel state before setRemoteDescription:", peerConnection.dataChannel?.readyState);
      await peerConnection.connection.setRemoteDescription(answerData);
      console.log("✅ Host: Remote description set successfully");
      console.log("🔍 Host: Connection state after setRemoteDescription:", peerConnection.connection.connectionState);
      console.log("🔍 Host: Signaling state after setRemoteDescription:", peerConnection.connection.signalingState);
      console.log("🔍 Host: Data channel state after setRemoteDescription:", peerConnection.dataChannel?.readyState);
      console.log("🔍 Host: Remote description details:", peerConnection.connection.remoteDescription);
      setConnectionStatus({ connected: false, message: "Answer accepted, waiting for connection..." });
      console.log("📱 Host: Status updated to waiting for connection");
    } catch (error) {
      console.error("💥 Host: Error accepting answer:", error);
      console.error("💥 Host: Error stack:", error.stack);
      console.error("💥 Host: Error details:", {
        name: error.name,
        message: error.message,
        code: error.code
      });
      setConnectionStatus({ connected: false, message: "Error accepting answer" });
    }
  }, [peerConnection]);
  const connectToHost = q$1(async (offer) => {
    console.log("🚀 Client: Starting connection to host...");
    try {
      const connection = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
      });
      console.log("✅ Client: RTCPeerConnection created", connection);
      const newPeerConnection = {
        connection,
        dataChannel: null,
        isHost: false
      };
      setPeerConnection(newPeerConnection);
      console.log("💾 Client: Peer connection stored in state");
      connection.ondatachannel = (event) => {
        console.log("📡 Client: Data channel received from host:", event.channel);
        const dataChannel = event.channel;
        newPeerConnection.dataChannel = dataChannel;
        console.log("📡 Client: Data channel details:", {
          label: dataChannel.label,
          id: dataChannel.id,
          readyState: dataChannel.readyState,
          bufferedAmount: dataChannel.bufferedAmount
        });
        dataChannel.onmessage = (event2) => {
          console.log("📨 Client: Raw message received:", event2.data);
          const message = JSON.parse(event2.data);
          if (message.type === "ping") {
            console.log("🏓 Client: Received ping, sending pong...", message);
            const pongMessage = { type: "pong", timestamp: Date.now() };
            console.log("🏓 Client: Sending pong:", pongMessage);
            dataChannel.send(JSON.stringify(pongMessage));
          } else if (message.type === "pong") {
            console.log("🏓 Client: Received pong", message);
          } else {
            console.log("📩 Client: Received sync message:", message);
            handleSyncMessage(message);
          }
        };
        dataChannel.onopen = () => {
          console.log("🔓 Client: Data channel onopen triggered - readyState:", dataChannel.readyState);
          console.log("🎉 Client: Data channel opened - connected to host");
          setConnectionStatus({ connected: true, message: "Connected to host" });
        };
        dataChannel.onclose = () => {
          console.log("🔒 Client: Data channel onclose triggered");
          console.log("💔 Client: Data channel closed - disconnected from host");
          setConnectionStatus({ connected: false, message: "Disconnected from host" });
        };
        dataChannel.onerror = (error) => {
          console.error("❌ Client: Data channel error:", error);
          console.error("❌ Client: Data channel error event:", error);
        };
        dataChannel.addEventListener("readystatechange", () => {
          console.log("🔄 Client: Data channel ready state changed to:", dataChannel.readyState);
          console.log("🔍 Client: Full dataChannel state:", {
            readyState: dataChannel.readyState,
            id: dataChannel.id,
            label: dataChannel.label,
            bufferedAmount: dataChannel.bufferedAmount
          });
        });
      };
      connection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("🧊 Client: ICE candidate generated:", event.candidate);
          console.log("🧊 Client: ICE candidate details:", {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex
          });
        } else {
          console.log("🧊 Client: ICE gathering complete (null candidate)");
        }
      };
      connection.onconnectionstatechange = () => {
        console.log("🔄 Client: Connection state changed to:", connection.connectionState);
        console.log("🔍 Client: Full connection state:", {
          connectionState: connection.connectionState,
          iceConnectionState: connection.iceConnectionState,
          iceGatheringState: connection.iceGatheringState,
          signalingState: connection.signalingState
        });
        if (connection.connectionState === "connected") {
          console.log("✅ Client: WebRTC connection established");
        } else if (connection.connectionState === "disconnected" || connection.connectionState === "failed") {
          console.log("💔 Client: WebRTC connection lost");
          setConnectionStatus({ connected: false, message: "Disconnected from host" });
        }
      };
      connection.oniceconnectionstatechange = () => {
        console.log("🧊 Client: ICE connection state changed to:", connection.iceConnectionState);
      };
      connection.onicegatheringstatechange = () => {
        console.log("🧊 Client: ICE gathering state changed to:", connection.iceGatheringState);
      };
      connection.onsignalingstatechange = () => {
        console.log("📡 Client: Signaling state changed to:", connection.signalingState);
      };
      console.log("📥 Client: Raw offer string:", offer);
      console.log("📝 Client: Parsing offer JSON...");
      const offerData = JSON.parse(offer);
      console.log("✅ Client: Offer parsed successfully:", offerData);
      console.log("🔍 Client: Offer details:", {
        type: offerData.type,
        sdp: offerData.sdp?.substring(0, 100) + "..."
      });
      console.log("📡 Client: Setting remote description...");
      await connection.setRemoteDescription(offerData);
      console.log("✅ Client: Remote description set");
      console.log("🔍 Client: Remote description details:", connection.remoteDescription);
      console.log("📝 Client: Creating answer...");
      const answer = await connection.createAnswer();
      console.log("✅ Client: Answer created:", answer);
      console.log("📝 Client: Setting local description...");
      await connection.setLocalDescription(answer);
      console.log("✅ Client: Local description set");
      console.log("🔍 Client: Local description details:", connection.localDescription);
      const answerString = JSON.stringify(answer);
      console.log("📦 Client: Answer stringified, length:", answerString.length);
      console.log("📤 Client: Returning answer string");
      return answerString;
    } catch (error) {
      console.error("💥 Error connecting to host:", error);
      console.error("💥 Error stack:", error.stack);
      console.error("💥 Error details:", {
        name: error.name,
        message: error.message,
        code: error.code
      });
      setConnectionStatus({ connected: false, message: "Error connecting to host" });
      return null;
    }
  }, [handleSyncMessage]);
  const handleVideoEvent = (eventType, currentTime) => {
    if (mode === "host" && peerConnection?.dataChannel) {
      const message = {
        type: eventType,
        timestamp: Date.now(),
        currentTime
      };
      sendSyncMessage(message);
    }
  };
  const handleVideoLoad = (url) => {
    if (mode === "host" && peerConnection?.dataChannel) {
      sendSyncMessage({
        type: "video-loaded",
        timestamp: Date.now(),
        videoUrl: url
      });
    }
  };
  return /* @__PURE__ */ u$1("div", { className: "min-h-screen bg-gray-900 text-white p-5", children: /* @__PURE__ */ u$1("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ u$1("h1", { className: "text-4xl font-bold mb-8 text-center", children: "Watch Together" }),
    /* @__PURE__ */ u$1(
      ModeSwitcher,
      {
        currentMode: mode,
        onModeChange: handleModeChange
      }
    ),
    /* @__PURE__ */ u$1(
      VideoPlayer,
      {
        ref: videoRef,
        onVideoEvent: handleVideoEvent,
        onVideoLoad: handleVideoLoad
      }
    ),
    mode === "host" ? /* @__PURE__ */ u$1(
      HostControls,
      {
        videoRef,
        onSetupPeer: setupHostPeer,
        onVideoEvent: handleVideoEvent,
        onAcceptAnswer: acceptAnswer,
        connectionStatus
      }
    ) : /* @__PURE__ */ u$1(
      ClientControls,
      {
        connectionStatus,
        onConnectToHost: connectToHost
      }
    )
  ] }) });
}
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (root) {
    E$1(/* @__PURE__ */ u$1(App, {}), root);
  }
});
