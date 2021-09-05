/**
 * @license
 * KLineChart v7.5.0
 * Copyright (c) 2019 lihu.
 * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
 */
 !function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).klinecharts = {})
}(this, (function(t) {
    "use strict";
    var e = {
        name: "BBI",
        series: "price",
        precision: 2,
        calcParams: [3, 6, 12, 24],
        shouldCheckParamCount: !0,
        shouldOhlc: !0,
        plots: [{
            key: "bbi",
            title: "BBI: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t, e) {
            var i = Math.max.apply(null, e)
              , a = []
              , n = [];
            return t.map((function(r, o) {
                var s = {}
                  , c = r.close;
                if (e.forEach((function(e, i) {
                    a[i] = (a[i] || 0) + c,
                    e - 1 > o || (n[i] = a[i] / e,
                    a[i] -= t[o - (e - 1)].close)
                }
                )),
                o >= i - 1) {
                    var h = 0;
                    n.forEach((function(t) {
                        h += t
                    }
                    )),
                    s.bbi = h / 4
                }
                return s
            }
            ))
        }
    }
      , i = {
        name: "DMA",
        calcParams: [10, 50, 10],
        plots: [{
            key: "dma",
            title: "DMA: ",
            type: "line"
        }, {
            key: "ama",
            title: "AMA: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t, e) {
            var i = Math.max(e[0], e[1])
              , a = 0
              , n = 0
              , r = 0
              , o = [];
            return t.forEach((function(s, c) {
                var h, l, u = {}, d = s.close;
                if (a += d,
                n += d,
                e[0] - 1 > c || (h = a / e[0],
                a -= t[c - (e[0] - 1)].close),
                e[1] - 1 > c || (l = n / e[1],
                n -= t[c - (e[1] - 1)].close),
                c >= i - 1) {
                    var _ = h - l;
                    u.dma = _,
                    r += _,
                    i + e[2] - 2 > c || (u.ama = r / e[2],
                    r -= o[c - (e[2] - 1)].dma)
                }
                o.push(u)
            }
            )),
            o
        }
    }
      , a = {
        name: "DMI",
        calcParams: [14, 6],
        plots: [{
            key: "pdi",
            title: "PDI: ",
            type: "line"
        }, {
            key: "mdi",
            title: "MDI: ",
            type: "line"
        }, {
            key: "adx",
            title: "ADX: ",
            type: "line"
        }, {
            key: "adxr",
            title: "ADXR: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t, e) {
            var i = 0
              , a = 0
              , n = 0
              , r = 0
              , o = 0
              , s = 0
              , c = 0
              , h = 0
              , l = [];
            return t.forEach((function(u, d) {
                var _ = {}
                  , v = t[d - 1] || u
                  , f = v.close
                  , p = u.high
                  , y = u.low
                  , m = p - y
                  , x = Math.abs(p - f)
                  , g = Math.abs(f - y)
                  , k = p - v.high
                  , D = v.low - y
                  , w = Math.max(Math.max(m, x), g)
                  , b = k > 0 && k > D ? k : 0
                  , M = D > 0 && D > k ? D : 0;
                if (i += w,
                a += b,
                n += M,
                d >= e[0] - 1) {
                    d > e[0] - 1 ? (r = r - r / e[0] + w,
                    o = o - o / e[0] + b,
                    s = s - s / e[0] + M) : (r = i,
                    o = a,
                    s = n);
                    var P = 0
                      , E = 0;
                    0 !== r && (P = 100 * o / r,
                    E = 100 * s / r),
                    _.pdi = P,
                    _.mdi = E;
                    var C = 0;
                    E + P !== 0 && (C = Math.abs(E - P) / (E + P) * 100),
                    c += C,
                    2 * e[0] - 2 > d || (_.adx = h = d > 2 * e[0] - 2 ? (h * (e[0] - 1) + C) / e[0] : c / e[0],
                    2 * e[0] + e[1] - 3 > d || (_.adxr = (l[d - (e[1] - 1)].adx + h) / 2))
                }
                l.push(_)
            }
            )),
            l
        }
    }
      , n = {
        name: "MACD",
        calcParams: [12, 26, 9],
        baseValue: 0,
        plots: [{
            key: "dif",
            title: "DIF: ",
            type: "line"
        }, {
            key: "dea",
            title: "DEA: ",
            type: "line"
        }, {
            key: "macd",
            title: "MACD: ",
            type: "bar",
            color: function(t, e) {
                var i = (t.currentData.technicalIndicatorData || {}).macd;
                return i > 0 ? e.bar.upColor : 0 > i ? e.bar.downColor : e.bar.noChangeColor
            },
            isStroke: function(t) {
                return (t.currentData.technicalIndicatorData || {}).macd > (t.preData.technicalIndicatorData || {}).macd
            }
        }],
        calcTechnicalIndicator: function(t, e) {
            var i, a, n = 0, r = 0, o = 0, s = 0, c = Math.max(e[0], e[1]);
            return t.map((function(t, h) {
                var l = {}
                  , u = t.close;
                return n += u,
                e[0] - 1 > h || (i = h > e[0] - 1 ? (2 * u + (e[0] - 1) * i) / (e[0] + 1) : n / e[0]),
                e[1] - 1 > h || (a = h > e[1] - 1 ? (2 * u + (e[1] - 1) * a) / (e[1] + 1) : n / e[1]),
                c - 1 > h || (l.dif = r = i - a,
                o += r,
                c + e[2] - 2 > h || (l.macd = 2 * (r - (s = h > c + e[2] - 2 ? (2 * r + s * (e[2] - 1)) / (e[2] + 1) : o / e[2])),
                l.dea = s)),
                l
            }
            ))
        }
    }
      , r = {
        name: "CR",
        calcParams: [26, 10, 20, 40, 60],
        plots: [{
            key: "cr",
            title: "CR: ",
            type: "line"
        }, {
            key: "ma1",
            title: "MA1: ",
            type: "line"
        }, {
            key: "ma2",
            title: "MA2: ",
            type: "line"
        }, {
            key: "ma3",
            title: "MA3: ",
            type: "line"
        }, {
            key: "ma4",
            title: "MA4: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t, e) {
            var i = Math.ceil(e[1] / 2.5 + 1)
              , a = Math.ceil(e[2] / 2.5 + 1)
              , n = Math.ceil(e[3] / 2.5 + 1)
              , r = Math.ceil(e[4] / 2.5 + 1)
              , o = 0
              , s = []
              , c = 0
              , h = []
              , l = 0
              , u = []
              , d = 0
              , _ = []
              , v = [];
            return t.forEach((function(f, p) {
                var y = {}
                  , m = t[p - 1] || f
                  , x = (m.high + m.close + m.low + m.open) / 4
                  , g = Math.max(0, f.high - x)
                  , k = Math.max(0, x - f.low);
                e[0] - 1 > p || (y.cr = 0 !== k ? g / k * 100 : 0,
                o += y.cr,
                c += y.cr,
                l += y.cr,
                d += y.cr,
                e[0] + e[1] - 2 > p || (s.push(o / e[1]),
                e[0] + e[1] + i - 3 > p || (y.ma1 = s[s.length - 1 - i]),
                o -= v[p - (e[1] - 1)].cr),
                e[0] + e[2] - 2 > p || (h.push(c / e[2]),
                e[0] + e[2] + a - 3 > p || (y.ma2 = h[h.length - 1 - a]),
                c -= v[p - (e[2] - 1)].cr),
                e[0] + e[3] - 2 > p || (u.push(l / e[3]),
                e[0] + e[3] + n - 3 > p || (y.ma3 = u[u.length - 1 - n]),
                l -= v[p - (e[3] - 1)].cr),
                e[0] + e[4] - 2 > p || (_.push(d / e[4]),
                e[0] + e[4] + r - 3 > p || (y.ma4 = _[_.length - 1 - r]),
                d -= v[p - (e[4] - 1)].cr)),
                v.push(y)
            }
            )),
            v
        }
    }
      , o = {
        name: "AO",
        calcParams: [5, 34],
        shouldCheckParamCount: !0,
        plots: [{
            key: "ao",
            title: "AO: ",
            type: "bar",
            color: function(t, e) {
                return (t.currentData.technicalIndicatorData || {}).ao > (t.preData.technicalIndicatorData || {}).ao ? e.bar.upColor : e.bar.downColor
            },
            isStroke: function(t) {
                return (t.currentData.technicalIndicatorData || {}).ao > (t.preData.technicalIndicatorData || {}).ao
            }
        }],
        baseValue: 0,
        calcTechnicalIndicator: function(t, e) {
            var i = Math.max(e[0], e[1])
              , a = 0
              , n = 0
              , r = 0
              , o = 0;
            return t.map((function(s, c) {
                var h = {}
                  , l = (s.low + s.high) / 2;
                if (a += l,
                n += l,
                c >= e[0] - 1) {
                    r = a / e[0];
                    var u = t[c - (e[0] - 1)];
                    a -= (u.low + u.high) / 2
                }
                if (c >= e[1] - 1) {
                    o = n / e[1];
                    var d = t[c - (e[1] - 1)];
                    n -= (d.low + d.high) / 2
                }
                return i - 1 > c || (h.ao = r - o),
                h
            }
            ))
        }
    }
      , s = {
        name: "CCI",
        calcParams: [20],
        plots: [{
            key: "cci",
            title: "CCI: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t, e) {
            var i = e[0] - 1
              , a = 0
              , n = [];
            return t.map((function(r, o) {
                var s = {}
                  , c = (r.high + r.low + r.close) / 3;
                if (a += c,
                n.push(c),
                o >= i) {
                    var h = a / e[0]
                      , l = n.slice(o - i, o + 1)
                      , u = 0;
                    l.forEach((function(t) {
                        u += Math.abs(t - h)
                    }
                    ));
                    var d = u / e[0];
                    s.cci = 0 !== d ? (c - h) / d / .015 : 0,
                    a -= (t[o - i].high + t[o - i].low + t[o - i].close) / 3
                }
                return s
            }
            ))
        }
    }
      , c = {
        name: "RSI",
        calcParams: [6, 12, 24],
        shouldCheckParamCount: !1,
        plots: [{
            key: "rsi1",
            title: "RSI1: ",
            type: "line"
        }, {
            key: "rsi2",
            title: "RSI2: ",
            type: "line"
        }, {
            key: "rsi3",
            title: "RSI3: ",
            type: "line"
        }],
        regeneratePlots: function(t) {
            return t.map((function(t, e) {
                var i = e + 1;
                return {
                    key: "rsi".concat(i),
                    title: "RSI".concat(i, ": "),
                    type: "line"
                }
            }
            ))
        },
        calcTechnicalIndicator: function(t, e, i) {
            var a = []
              , n = [];
            return t.map((function(r, o) {
                var s = {}
                  , c = r.close - (t[o - 1] || r).close;
                return e.forEach((function(e, r) {
                    if (c > 0 ? a[r] = (a[r] || 0) + c : n[r] = (n[r] || 0) + Math.abs(c),
                    o >= e - 1) {
                        s[i[r].key] = 0 !== n[r] ? 100 - 100 / (1 + a[r] / n[r]) : 0;
                        var h = t[o - (e - 1)]
                          , l = h.close - (t[o - e] || h).close;
                        l > 0 ? a[r] -= l : n[r] -= Math.abs(l)
                    }
                }
                )),
                s
            }
            ))
        }
    };
    function h() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
          , e = Number.MIN_SAFE_INTEGER
          , i = Number.MAX_SAFE_INTEGER;
        return t.forEach((function(t) {
            e = Math.max(t.high, e),
            i = Math.min(t.low, i)
        }
        )),
        {
            hn: e,
            ln: i
        }
    }
    var l = {
        name: "KDJ",
        calcParams: [9, 3, 3],
        plots: [{
            key: "k",
            title: "K: ",
            type: "line"
        }, {
            key: "d",
            title: "D: ",
            type: "line"
        }, {
            key: "j",
            title: "J: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t, e) {
            var i = [];
            return t.forEach((function(a, n) {
                var r = {}
                  , o = a.close;
                if (n >= e[0] - 1) {
                    var s = h(t.slice(n - (e[0] - 1), n + 1))
                      , c = s.ln
                      , l = s.hn - c;
                    r.k = ((e[1] - 1) * (i[n - 1].k || 50) + (o - c) / (0 === l ? 1 : l) * 100) / e[1],
                    r.d = ((e[2] - 1) * (i[n - 1].d || 50) + r.k) / e[2],
                    r.j = 3 * r.k - 2 * r.d
                }
                i.push(r)
            }
            )),
            i
        }
    }
      , u = {
        name: "WR",
        calcParams: [6, 10, 14],
        shouldCheckParamCount: !1,
        plots: [{
            key: "wr1",
            title: "WR1: ",
            type: "line"
        }, {
            key: "wr2",
            title: "WR2: ",
            type: "line"
        }, {
            key: "wr3",
            title: "WR3: ",
            type: "line"
        }],
        regeneratePlots: function(t) {
            return t.map((function(t, e) {
                return {
                    key: "wr".concat(e + 1),
                    title: "WR".concat(e + 1, ": "),
                    type: "line"
                }
            }
            ))
        },
        calcTechnicalIndicator: function(t, e, i) {
            return t.map((function(a, n) {
                var r = {}
                  , o = a.close;
                return e.forEach((function(e, a) {
                    var s = e - 1;
                    if (n >= s) {
                        var c = h(t.slice(n - s, n + 1))
                          , l = c.hn
                          , u = l - c.ln;
                        r[i[a].key] = 0 === u ? 0 : (o - l) / u * 100
                    }
                }
                )),
                r
            }
            ))
        }
    };
    var d = {
        name: "BOLL",
        series: "price",
        calcParams: [20, 2],
        calcParamsAllowDecimal: {
            1: !0
        },
        precision: 2,
        shouldOhlc: !0,
        plots: [{
            key: "up",
            title: "UP: ",
            type: "line"
        }, {
            key: "mid",
            title: "MID: ",
            type: "line"
        }, {
            key: "dn",
            title: "DN: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t, e) {
            var i = e[0] - 1
              , a = 0;
            return t.map((function(n, r) {
                var o = {};
                if (a += n.close,
                r >= i) {
                    o.mid = a / e[0];
                    var s = function(t, e) {
                        var i = t.length
                          , a = 0;
                        t.forEach((function(t) {
                            var i = t.close - e;
                            a += i * i
                        }
                        ));
                        var n = a > 0
                          , r = Math.sqrt((a = Math.abs(a)) / i);
                        return n ? r : -1 * r
                    }(t.slice(r - i, r + 1), o.mid);
                    o.up = o.mid + e[1] * s,
                    o.dn = o.mid - e[1] * s,
                    a -= t[r - i].close
                }
                return o
            }
            ))
        }
    }
      , _ = {
        name: "SAR",
        series: "price",
        calcParams: [2, 2, 20],
        precision: 2,
        shouldOhlc: !0,
        plots: [{
            key: "sar",
            title: "SAR: ",
            type: "circle",
            color: function(t, e) {
                var i = t.currentData
                  , a = i.kLineData || {};
                return (a.high + a.low) / 2 > (i.technicalIndicatorData || {}).sar ? e.circle.upColor : e.circle.downColor
            }
        }],
        calcTechnicalIndicator: function(t, e) {
            var i = e[0] / 100
              , a = e[1] / 100
              , n = e[2] / 100
              , r = i
              , o = -100
              , s = !1
              , c = 0;
            return t.map((function(e, h) {
                var l = c
                  , u = e.high
                  , d = e.low;
                if (s) {
                    (-100 === o || u > o) && (o = u,
                    r = Math.min(r + a, n)),
                    c = l + r * (o - l);
                    var _ = Math.min(t[Math.max(1, h) - 1].low, d);
                    c > e.low ? (c = o,
                    r = i,
                    o = -100,
                    s = !s) : c > _ && (c = _)
                } else {
                    (-100 === o || o > d) && (o = d,
                    r = Math.min(r + a, n)),
                    c = l + r * (o - l);
                    var v = Math.max(t[Math.max(1, h) - 1].high, u);
                    e.high > c ? (c = o,
                    r = 0,
                    o = -100,
                    s = !s) : v > c && (c = v)
                }
                return {
                    sar: c
                }
            }
            ))
        }
    }
      , v = {
        technicalIndicatorExtensions: {},
        graphicMarkExtensions: {},
        addTechnicalIndicator: function(t) {
            var e = this;
            t && [].concat(t).forEach((function(t) {
                t.name && (e.technicalIndicatorExtensions[t.name] = t)
            }
            ))
        },
        addGraphicMark: function(t) {
            var e = this;
            t && [].concat(t).forEach((function(t) {
                t.name && (e.graphicMarkExtensions[t.name] = t)
            }
            ))
        }
    };
    function f(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(t);
            e && (a = a.filter((function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }
            ))),
            i.push.apply(i, a)
        }
        return i
    }
    function p(t) {
        for (var e = 1; arguments.length > e; e++) {
            var i = null != arguments[e] ? arguments[e] : {};
            e % 2 ? f(Object(i), !0).forEach((function(e) {
                k(t, e, i[e])
            }
            )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : f(Object(i)).forEach((function(e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
            }
            ))
        }
        return t
    }
    function y(t) {
        return (y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        )(t)
    }
    function m(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function x(t, e) {
        for (var i = 0; e.length > i; i++) {
            var a = e[i];
            a.enumerable = a.enumerable || !1,
            a.configurable = !0,
            "value"in a && (a.writable = !0),
            Object.defineProperty(t, a.key, a)
        }
    }
    function g(t, e, i) {
        return e && x(t.prototype, e),
        i && x(t, i),
        t
    }
    function k(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i,
        t
    }
    function D(t, e) {
        if ("function" != typeof e && null !== e)
            throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }),
        e && b(t, e)
    }
    function w(t) {
        return (w = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        }
        )(t)
    }
    function b(t, e) {
        return (b = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    function M(t, e) {
        return !e || "object" != typeof e && "function" != typeof e ? function(t) {
            if (void 0 === t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }(t) : e
    }
    function P(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
            if (Reflect.construct.sham)
                return !1;
            if ("function" == typeof Proxy)
                return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                ))),
                !0
            } catch (t) {
                return !1
            }
        }();
        return function() {
            var i, a = w(t);
            if (e) {
                var n = w(this).constructor;
                i = Reflect.construct(a, arguments, n)
            } else
                i = a.apply(this, arguments);
            return M(this, i)
        }
    }
    function E(t, e, i) {
        return (E = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t, e, i) {
            var a = function(t, e) {
                for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = w(t)); )
                    ;
                return t
            }(t, e);
            if (a) {
                var n = Object.getOwnPropertyDescriptor(a, e);
                return n.get ? n.get.call(i) : n.value
            }
        }
        )(t, e, i || t)
    }
    function C(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, a = Array(e); e > i; i++)
            a[i] = t[i];
        return a
    }
    function A(t, e) {
        var i = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
        if (!i) {
            if (Array.isArray(t) || (i = function(t, e) {
                if (t) {
                    if ("string" == typeof t)
                        return C(t, e);
                    var i = Object.prototype.toString.call(t).slice(8, -1);
                    return "Object" === i && t.constructor && (i = t.constructor.name),
                    "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? C(t, e) : void 0
                }
            }(t)) || e && t && "number" == typeof t.length) {
                i && (t = i);
                var a = 0
                  , n = function() {};
                return {
                    s: n,
                    n: function() {
                        return t.length > a ? {
                            done: !1,
                            value: t[a++]
                        } : {
                            done: !0
                        }
                    },
                    e: function(t) {
                        throw t
                    },
                    f: n
                }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var r, o = !0, s = !1;
        return {
            s: function() {
                i = i.call(t)
            },
            n: function() {
                var t = i.next();
                return o = t.done,
                t
            },
            e: function(t) {
                s = !0,
                r = t
            },
            f: function() {
                try {
                    o || null == i.return || i.return()
                } finally {
                    if (s)
                        throw r
                }
            }
        }
    }
    function T(t, e) {
        if (O(t) && O(e))
            for (var i in e)
                if (i in t) {
                    var a = t[i]
                      , n = e[i];
                    O(n) && O(a) && !I(n) && !I(a) ? T(a, n) : F(e[i]) && (t[i] = e[i])
                }
    }
    function S(t) {
        if (!O(t))
            return t;
        var e;
        for (var i in e = I(t) ? [] : {},
        t)
            if (t.hasOwnProperty(i)) {
                var a = t[i];
                e[i] = O(a) ? S(a) : a
            }
        return e
    }
    function I(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
    function L(t) {
        return "function" == typeof t
    }
    function O(t) {
        return !!t && "object" === y(t)
    }
    function R(t) {
        return "number" == typeof t && !isNaN(t)
    }
    function F(t) {
        return null != t
    }
    function z(t) {
        return "boolean" == typeof t
    }
    function B(t) {
        return "string" == typeof t
    }
    function V(t) {
        return t && t instanceof HTMLElement && t.appendChild && "function" == typeof t.appendChild
    }
    var H = "dash"
      , Y = "left"
      , W = "right"
      , G = "normal"
      , N = "percentage"
      , X = "log"
      , j = "candle_solid"
      , Z = "candle_stroke"
      , U = "candle_up_stroke"
      , K = "candle_down_stroke"
      , q = "ohlc"
      , $ = "area"
      , J = "always"
      , Q = "follow_cross"
      , tt = "rect"
      , et = "standard"
      , it = "circle"
      , at = "rect"
      , nt = "triangle"
      , rt = "diamond"
      , ot = "custom"
      , st = "point"
      , ct = "top"
      , ht = "bottom"
      , lt = {
        grid: {
            show: !0,
            horizontal: {
                show: !0,
                size: 1,
                color: "#EDEDED",
                style: H,
                dashValue: [2, 2]
            },
            vertical: {
                show: !0,
                size: 1,
                color: "#EDEDED",
                style: H,
                dashValue: [2, 2]
            }
        },
        candle: {
            margin: {
                top: .2,
                bottom: .1
            },
            type: j,
            bar: {
                upColor: "#26A69A",
                downColor: "#EF5350",
                noChangeColor: "#999999"
            },
            area: {
                lineSize: 2,
                lineColor: "#2196F3",
                value: "close",
                fillColor: [{
                    offset: 0,
                    color: "rgba(33, 150, 243, 0.01)"
                }, {
                    offset: 1,
                    color: "rgba(33, 150, 243, 0.2)"
                }]
            },
            priceMark: {
                show: !0,
                high: {
                    show: !0,
                    color: "#76808F",
                    textMargin: 5,
                    textSize: 10,
                    textFamily: "Helvetica Neue",
                    textWeight: "normal"
                },
                low: {
                    show: !0,
                    color: "#76808F",
                    textMargin: 5,
                    textSize: 10,
                    textFamily: "Helvetica Neue",
                    textWeight: "normal"
                },
                last: {
                    show: !0,
                    upColor: "#26A69A",
                    downColor: "#EF5350",
                    noChangeColor: "#888888",
                    line: {
                        show: !0,
                        style: H,
                        dashValue: [4, 4],
                        size: 1
                    },
                    text: {
                        show: !0,
                        size: 12,
                        paddingLeft: 2,
                        paddingTop: 2,
                        paddingRight: 2,
                        paddingBottom: 2,
                        color: "#FFFFFF",
                        family: "Helvetica Neue",
                        weight: "normal",
                        borderRadius: 2
                    }
                }
            },
            tooltip: {
                showRule: J,
                showType: et,
                labels: ["时间: ", "开: ", "收: ", "高: ", "低: ", "成交量: "],
                values: null,
                defaultValue: "n/a",
                rect: {
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: 0,
                    paddingBottom: 6,
                    offsetLeft: 8,
                    offsetTop: 8,
                    offsetRight: 8,
                    borderRadius: 4,
                    borderSize: 1,
                    borderColor: "#F2F3F5",
                    fillColor: "#FEFEFE"
                },
                text: {
                    size: 12,
                    family: "Helvetica Neue",
                    weight: "normal",
                    color: "#76808F",
                    marginLeft: 8,
                    marginTop: 6,
                    marginRight: 8,
                    marginBottom: 0
                }
            }
        },
        technicalIndicator: {
            margin: {
                top: .2,
                bottom: .1
            },
            bar: {
                upColor: "rgba(38, 166, 154, .65)",
                downColor: "rgba(239, 83, 80, .65)",
                noChangeColor: "#888888"
            },
            line: {
                size: 1,
                colors: ["#FF9600", "#9D65C9", "#2196F3", "#E11D74", "#01C5C4"]
            },
            circle: {
                upColor: "rgba(38, 166, 154, .65)",
                downColor: "rgba(239, 83, 80, .65)",
                noChangeColor: "#888888"
            },
            lastValueMark: {
                show: !1,
                text: {
                    show: !1,
                    color: "#FFFFFF",
                    size: 12,
                    family: "Helvetica Neue",
                    weight: "normal",
                    paddingLeft: 3,
                    paddingTop: 2,
                    paddingRight: 3,
                    paddingBottom: 2,
                    borderRadius: 2
                }
            },
            tooltip: {
                showRule: J,
                showType: et,
                showName: !0,
                showParams: !0,
                defaultValue: "n/a",
                text: {
                    size: 12,
                    family: "Helvetica Neue",
                    weight: "normal",
                    color: "#76808F",
                    marginTop: 6,
                    marginRight: 8,
                    marginBottom: 0,
                    marginLeft: 8
                }
            }
        },
        xAxis: {
            show: !0,
            height: null,
            axisLine: {
                show: !0,
                color: "#DDDDDD",
                size: 1
            },
            tickText: {
                show: !0,
                color: "#76808F",
                size: 12,
                family: "Helvetica Neue",
                weight: "normal",
                paddingTop: 3,
                paddingBottom: 6
            },
            tickLine: {
                show: !0,
                size: 1,
                length: 3,
                color: "#DDDDDD"
            }
        },
        yAxis: {
            show: !0,
            width: null,
            type: G,
            position: W,
            inside: !1,
            axisLine: {
                show: !0,
                color: "#DDDDDD",
                size: 1
            },
            tickText: {
                show: !0,
                color: "#76808F",
                size: 12,
                family: "Helvetica Neue",
                weight: "normal",
                paddingLeft: 3,
                paddingRight: 6
            },
            tickLine: {
                show: !0,
                size: 1,
                length: 3,
                color: "#DDDDDD"
            }
        },
        separator: {
            size: 1,
            color: "#DDDDDD",
            fill: !0,
            activeBackgroundColor: "rgba(33, 150, 243, 0.08)"
        },
        crosshair: {
            show: !0,
            horizontal: {
                show: !0,
                line: {
                    show: !0,
                    style: H,
                    dashValue: [4, 2],
                    size: 1,
                    color: "#76808F"
                },
                text: {
                    show: !0,
                    color: "#FFFFFF",
                    size: 12,
                    family: "Helvetica Neue",
                    weight: "normal",
                    paddingLeft: 2,
                    paddingRight: 2,
                    paddingTop: 2,
                    paddingBottom: 2,
                    borderSize: 1,
                    borderColor: "#686D76",
                    borderRadius: 2,
                    backgroundColor: "#686D76"
                }
            },
            vertical: {
                show: !0,
                line: {
                    show: !0,
                    style: H,
                    dashValue: [4, 2],
                    size: 1,
                    color: "#76808F"
                },
                text: {
                    show: !0,
                    color: "#FFFFFF",
                    size: 12,
                    family: "Helvetica Neue",
                    weight: "normal",
                    paddingLeft: 2,
                    paddingRight: 2,
                    paddingTop: 2,
                    paddingBottom: 2,
                    borderSize: 1,
                    borderRadius: 2,
                    borderColor: "#686D76",
                    backgroundColor: "#686D76"
                }
            }
        },
        graphicMark: {
            point: {
                backgroundColor: "#2196F3",
                borderColor: "rgba(33, 150, 243, 0.35)",
                borderSize: 1,
                radius: 5,
                activeBackgroundColor: "#2196F3",
                activeBorderColor: "rgba(33, 150, 243, 0.35)",
                activeBorderSize: 3,
                activeRadius: 5
            },
            line: {
                color: "#2196F3",
                size: 1,
                dashValue: [2, 2]
            },
            polygon: {
                stroke: {
                    size: 1,
                    color: "#2196F3"
                },
                fill: {
                    color: "rgba(33, 150, 243, 0.1)"
                }
            },
            arc: {
                stroke: {
                    size: 1,
                    color: "#2196F3"
                },
                fill: {
                    color: "rgba(33, 150, 243, 0.1)"
                }
            },
            text: {
                color: "#2196F3",
                size: 12,
                family: "Helvetica Neue",
                weight: "normal",
                marginLeft: 2,
                marginRight: 2,
                marginTop: 2,
                marginBottom: 6
            }
        },
        annotation: {
            symbol: {
                type: rt,
                position: ct,
                size: 8,
                color: "#2196F3",
                activeSize: 10,
                activeColor: "#FF9600",
                offset: [0, 20]
            }
        },
        tag: {
            position: st,
            offset: 0,
            line: {
                show: !0,
                style: H,
                dashValue: [4, 2],
                size: 1,
                color: "#2196F3"
            },
            text: {
                color: "#FFFFFF",
                backgroundColor: "#2196F3",
                size: 12,
                family: "Helvetica Neue",
                weight: "normal",
                paddingLeft: 2,
                paddingRight: 2,
                paddingTop: 2,
                paddingBottom: 2,
                borderRadius: 2
            },
            mark: {
                color: "#FFFFFF",
                backgroundColor: "#2196F3",
                size: 12,
                family: "Helvetica Neue",
                weight: "normal",
                paddingLeft: 2,
                paddingRight: 2,
                paddingTop: 2,
                paddingBottom: 2,
                borderRadius: 2
            }
        }
    };
    function ut(t, e) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "--";
        if (O(t)) {
            var a = t[e];
            if (F(a))
                return a
        }
        return i
    }
    function dt(t, e) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "MM-DD hh:mm";
        if (R(e)) {
            var a = t.format(new Date(e))
              , n = a.split(", ")
              , r = n[0].split("/")
              , o = {
                YYYY: r[2],
                MM: r[0],
                DD: r[1],
                "hh:mm": "24" === n[1].match(/^[\d]{2}/)[0] ? n[1].replace(/^[\d]{2}/, "00") : n[1]
            };
            return i.replace(/YYYY|MM|DD|(hh:mm)/g, (function(t) {
                return o[t]
            }
            ))
        }
        return "--"
    }
    function _t(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2
          , i = +t;
        return (i || 0 === i) && R(i) ? i.toFixed(e) : "".concat(i)
    }
    function vt(t) {
        return R(+t) ? t > 1e9 ? "".concat(+(t / 1e9).toFixed(3), "B") : t > 1e6 ? "".concat(+(t / 1e6).toFixed(3), "M") : t > 1e3 ? "".concat(+(t / 1e3).toFixed(3), "K") : t : "--"
    }
    function ft(t, e) {
        return null == e && (e = 10),
        +(t = (+t).toFixed(e = Math.min(Math.max(0, e), 20)))
    }
    function pt(t) {
        return Math.log(t) / Math.log(10)
    }
    function yt(t) {
        return Math.pow(10, t)
    }
    var mt = "price"
      , xt = "volume"
      , gt = "line"
      , kt = "bar"
      , Dt = "circle"
      , wt = function() {
        function t(e) {
            var i = e.name
              , a = e.series
              , n = e.calcParams
              , r = e.plots
              , o = e.precision
              , s = e.calcParamsAllowDecimal
              , c = e.shouldCheckParamCount
              , h = e.shouldOhlc
              , l = e.shouldFormatBigNumber
              , u = e.baseValue
              , d = e.minValue
              , _ = e.maxValue
              , v = e.styles;
            m(this, t),
            this.name = i || "",
            this.series = a || "normal",
            this.precision = R(o) && o >= 0 ? o : 4,
            this.calcParams = I(n) ? n : [],
            this.plots = I(r) ? r : [],
            this.calcParamsAllowDecimal = O(s) ? s : {},
            this.shouldCheckParamCount = !z(c) || c,
            this.shouldOhlc = h,
            this.shouldFormatBigNumber = l,
            this.baseValue = R(u) ? u : null,
            this.minValue = d,
            this.maxValue = _,
            this.styles = v
        }
        return g(t, [{
            key: "setPrecision",
            value: function(t) {
                return !(!R(t) || 0 > t) && (this.precision = parseInt(t, 10),
                !0)
            }
        }, {
            key: "setCalcParamsAllowDecimal",
            value: function(t) {
                O(t) && (this.calcParamsAllowDecimal = t)
            }
        }, {
            key: "setCalcParams",
            value: function(t) {
                if (!I(t))
                    return !1;
                if (this.shouldCheckParamCount && t.length !== this.calcParams.length)
                    return !1;
                for (var e = 0; t.length > e; e++) {
                    var i = t[e];
                    if (!R(i) || 0 >= i || !this.calcParamsAllowDecimal[e] && parseInt(i, 10) !== i)
                        return !1
                }
                this.calcParams = S(t);
                var a = this.regeneratePlots(t);
                return a && I(a) && (this.plots = a),
                !0
            }
        }, {
            key: "setStyles",
            value: function(t, e) {
                return !!O(t) && (this.styles || (this.styles = {
                    bar: S(e.bar),
                    line: S(e.line),
                    circle: S(e.circle)
                }),
                T(this.styles, t),
                !0)
            }
        }, {
            key: "calcTechnicalIndicator",
            value: function(t, e) {}
        }, {
            key: "regeneratePlots",
            value: function(t) {}
        }]),
        t
    }();
    function bt(t) {
        var e = t.name
          , i = t.series
          , a = t.calcParams
          , n = t.plots
          , r = t.precision
          , o = t.calcParamsAllowDecimal
          , s = t.shouldCheckParamCount
          , c = t.shouldOhlc
          , h = t.shouldFormatBigNumber
          , l = t.baseValue
          , u = t.minValue
          , d = t.maxValue
          , _ = t.styles
          , v = t.calcTechnicalIndicator
          , f = t.regeneratePlots
          , p = t.render;
        if (!e || !L(v))
            return null;
        var y = function(t) {
            D(f, t);
            var v = P(f);
            function f() {
                return m(this, f),
                v.call(this, {
                    name: e,
                    series: i,
                    calcParams: a,
                    plots: n,
                    precision: r,
                    calcParamsAllowDecimal: o,
                    shouldCheckParamCount: s,
                    shouldOhlc: c,
                    shouldFormatBigNumber: h,
                    baseValue: l,
                    minValue: u,
                    maxValue: d,
                    styles: _
                })
            }
            return f
        }(wt);
        return y.prototype.calcTechnicalIndicator = v,
        f && L(f) && (y.prototype.regeneratePlots = f),
        p && L(p) && (y.prototype.render = p),
        new y
    }
    function Mt(t) {
        return {
            name: t.name,
            series: t.series,
            calcParams: t.calcParams,
            calcParamsAllowDecimal: t.calcParamsAllowDecimal,
            shouldCheckParamCount: t.shouldCheckParamCount,
            shouldOhlc: t.shouldOhlc,
            shouldFormatBigNumber: t.shouldFormatBigNumber,
            precision: t.precision,
            styles: t.styles,
            result: t.result || []
        }
    }
    function Pt() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
          , e = arguments.length > 1 ? arguments[1] : void 0
          , i = e.calcParams
          , a = e.plots
          , n = e.precision
          , r = e.shouldFormatBigNumber
          , o = []
          , s = ""
          , c = "";
        return a.length > 0 && (s = e.name),
        i.length > 0 && (c = "(".concat(i.join(","), ")")),
        a.forEach((function(e) {
            var i = {};
            if (F(e.title)) {
                var a = t[e.key];
                F(a) && (a = _t(a, n),
                r && (a = vt(a))),
                i.title = e.title,
                i.value = a
            }
            o.push(i)
        }
        )),
        {
            values: o,
            name: s,
            calcParamText: c
        }
    }
    var Et = function() {
        function t(e) {
            var i = e.id
              , a = e.chartData
              , n = e.xAxis
              , r = e.yAxis;
            m(this, t),
            this._id = i,
            this._chartData = a,
            this._xAxis = n,
            this._yAxis = r,
            this._styles = null
        }
        return g(t, [{
            key: "draw",
            value: function(t) {}
        }, {
            key: "setStyles",
            value: function(t, e) {
                return !!O(t) && (this._styles || (this._styles = S(e)),
                T(this._styles, t),
                !0)
            }
        }, {
            key: "id",
            value: function() {
                return this._id
            }
        }, {
            key: "styles",
            value: function() {
                return this._styles
            }
        }, {
            key: "checkMousePointOnGraphic",
            value: function(t) {}
        }, {
            key: "onClick",
            value: function(t) {}
        }, {
            key: "onRightClick",
            value: function(t) {}
        }, {
            key: "onMouseEnter",
            value: function(t) {}
        }, {
            key: "onMouseLeave",
            value: function(t) {}
        }]),
        t
    }();
    function Ct(t, e, i, a) {
        t.fillStyle = e,
        t.beginPath(),
        t.arc(i.x, i.y, a, 0, 2 * Math.PI),
        t.closePath(),
        t.fill()
    }
    function At(t, e, i) {
        var a = Math.abs(e.x - t.x)
          , n = Math.abs(e.y - t.y)
          , r = Math.abs(i.x - t.x);
        return Math.abs(a * Math.abs(i.y - t.y) - r * n) / 2
    }
    function Tt(t, e) {
        var i = t.x - e.x;
        if (0 !== i) {
            var a = (t.y - e.y) / i;
            return {
                k: a,
                b: t.y - a * t.x
            }
        }
    }
    function St(t, e, i) {
        return It(Tt(t, e), i)
    }
    function It(t, e) {
        return t ? e.x * t.k + t.b : e.y
    }
    function Lt(t, e, i) {
        if (!i || !t || !e)
            return !1;
        if (t.x === e.x)
            return 2 > Math.abs(i.x - t.x);
        var a = Tt(t, e)
          , n = It(a, i)
          , r = Math.abs(n - i.y);
        return 4 > r * r / (a.k * a.k + 1)
    }
    function Ot(t, e, i) {
        return !!Lt(t, e, i) && (t.x === e.x ? e.y > t.y ? 2 > t.y - i.y : 2 > i.y - t.y : e.x > t.x ? 2 > t.x - i.x : 2 > i.x - t.x)
    }
    function Rt(t, e, i) {
        return !!Lt(t, e, i) && (t.x === e.x ? 4 > Math.abs(t.y - i.y) + Math.abs(e.y - i.y) - Math.abs(t.y - e.y) : 4 > Math.abs(t.x - i.x) + Math.abs(e.x - i.x) - Math.abs(t.x - e.x))
    }
    function Ft(t, e, i) {
        if (!i)
            return !1;
        var a = i.x - t.x
          , n = i.y - t.y;
        return !(a * a + n * n > e * e)
    }
    function zt(t, e) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
          , a = [];
        if (t.length > 1)
            if (t[0].x === t[1].x) {
                var n = 0
                  , r = e.y;
                if (a.push([{
                    x: t[0].x,
                    y: n
                }, {
                    x: t[0].x,
                    y: r
                }]),
                t.length > 2) {
                    a.push([{
                        x: t[2].x,
                        y: n
                    }, {
                        x: t[2].x,
                        y: r
                    }]);
                    for (var o = t[0].x - t[2].x, s = 0; i > s; s++) {
                        var c = o * (s + 1);
                        a.push([{
                            x: t[0].x + c,
                            y: n
                        }, {
                            x: t[0].x + c,
                            y: r
                        }])
                    }
                }
            } else {
                var h = 0
                  , l = e.x
                  , u = Tt(t[0], t[1])
                  , d = u.k
                  , _ = u.b;
                if (a.push([{
                    x: h,
                    y: h * d + _
                }, {
                    x: l,
                    y: l * d + _
                }]),
                t.length > 2) {
                    var v = t[2].y - d * t[2].x;
                    a.push([{
                        x: h,
                        y: h * d + v
                    }, {
                        x: l,
                        y: l * d + v
                    }]);
                    for (var f = _ - v, p = 0; i > p; p++) {
                        var y = _ + f * (p + 1);
                        a.push([{
                            x: h,
                            y: h * d + y
                        }, {
                            x: l,
                            y: l * d + y
                        }])
                    }
                }
            }
        return a
    }
    function Bt(t, e, i, a) {
        t.beginPath();
        var n = t.lineWidth % 2 ? .5 : 0;
        t.moveTo(i, e + n),
        t.lineTo(a, e + n),
        t.stroke(),
        t.closePath()
    }
    function Vt(t, e, i, a) {
        t.beginPath();
        var n = t.lineWidth % 2 ? .5 : 0;
        t.moveTo(e + n, i),
        t.lineTo(e + n, a),
        t.stroke(),
        t.closePath()
    }
    function Ht(t, e) {
        t.save(),
        t.lineWidth % 2 && t.translate(.5, .5),
        e(),
        t.restore()
    }
    var Yt = "other"
      , Wt = "point"
      , Gt = "none"
      , Nt = "line"
      , Xt = "text"
      , jt = "continuous_line"
      , Zt = "polygon"
      , Ut = "arc"
      , Kt = "stroke"
      , qt = "fill"
      , $t = "dash"
      , Jt = 0
      , Qt = 1
      , te = 2;
    var ee = function(t) {
        D(i, t);
        var e = P(i);
        function i(t) {
            var a, n = t.id, r = t.name, o = t.totalStep, s = t.chartData, c = t.xAxis, h = t.yAxis, l = t.points, u = t.styles, d = t.lock;
            return m(this, i),
            (a = e.call(this, {
                id: n,
                chartData: s,
                xAxis: c,
                yAxis: h
            }))._name = r,
            a._totalStep = o,
            a._lock = d,
            a._drawStep = 1,
            a._points = [],
            a.setPoints(l),
            a.setStyles(u, s.styleOptions().graphicMark),
            a
        }
        return g(i, [{
            key: "setPoints",
            value: function(t) {
                if (I(t) && t.length > 0) {
                    var e;
                    this._totalStep - 1 > t.length ? (this._drawStep = t.length + 1,
                    this._points = S(t),
                    e = t.length) : (this._drawStep = -1,
                    this._points = t.slice(0, this._totalStep - 1),
                    e = this._totalStep - 1);
                    for (var i = 0; e > i; i++)
                        this.performMouseMoveForDrawing(i + 2, this.points, this._points[i], this._xAxis, this._yAxis);
                    -1 === this._drawStep && this.performMousePressedMove(this._points, this._points.length - 1, this._points[this._points.length - 1], this._xAxis, this._yAxis)
                }
            }
        }, {
            key: "_timestampOrDataIndexToPointX",
            value: function(t) {
                var e = t.timestamp
                  , i = t.dataIndex;
                return this._xAxis.convertToPixel(e ? this._chartData.timestampToDataIndex(e) : i)
            }
        }, {
            key: "_drawLines",
            value: function(t, e, i, a) {
                t.save(),
                t.strokeStyle = a.line.color,
                t.lineWidth = a.line.size,
                i === $t && t.setLineDash(a.line.dashValue),
                e.forEach((function(e) {
                    var i, a;
                    if (e.length > 1)
                        switch ((i = e[0]).x === (a = e[1]).x ? te : i.y === a.y ? Qt : Jt) {
                        case Jt:
                            Ht(t, (function() {
                                t.beginPath(),
                                t.moveTo(e[0].x, e[0].y),
                                t.lineTo(e[1].x, e[1].y),
                                t.stroke(),
                                t.closePath()
                            }
                            ));
                            break;
                        case Qt:
                            Bt(t, e[0].y, e[0].x, e[1].x);
                            break;
                        case te:
                            Vt(t, e[0].x, e[0].y, e[1].y)
                        }
                }
                )),
                t.restore()
            }
        }, {
            key: "_drawContinuousLines",
            value: function(t, e, i, a) {
                t.save(),
                t.strokeStyle = a.line.color,
                t.lineWidth = a.line.size,
                i === $t && t.setLineDash(a.line.dashValue),
                e.forEach((function(e) {
                    e.length > 0 && Ht(t, (function() {
                        t.beginPath(),
                        t.moveTo(e[0].x, e[0].y);
                        for (var i = 1; e.length > i; i++)
                            t.lineTo(e[i].x, e[i].y);
                        t.stroke(),
                        t.closePath()
                    }
                    ))
                }
                )),
                t.restore()
            }
        }, {
            key: "_drawPolygons",
            value: function(t, e, i, a) {
                var n;
                t.save(),
                i === qt ? (t.fillStyle = a.polygon.fill.color,
                n = t.fill) : (t.lineWidth = a.polygon.stroke.size,
                t.strokeStyle = a.polygon.stroke.color,
                n = t.stroke),
                e.forEach((function(e) {
                    e.length > 0 && Ht(t, (function() {
                        t.beginPath(),
                        t.moveTo(e[0].x, e[0].y);
                        for (var i = 1; e.length > i; i++)
                            t.lineTo(e[i].x, e[i].y);
                        t.closePath(),
                        n.call(t)
                    }
                    ))
                }
                )),
                t.restore()
            }
        }, {
            key: "_drawArcs",
            value: function(t, e, i, a) {
                t.save(),
                i === qt ? t.fillStyle = a.arc.fill.color : (t.lineWidth = a.arc.stroke.size,
                t.strokeStyle = a.arc.stroke.color),
                e.forEach((function(e) {
                    var a = e.x
                      , n = e.y
                      , r = e.radius
                      , o = e.startAngle
                      , s = e.endAngle;
                    t.beginPath(),
                    t.arc(a, n, r, o, s),
                    i === qt ? (t.closePath(),
                    t.fill()) : (t.stroke(),
                    t.closePath())
                }
                )),
                t.restore()
            }
        }, {
            key: "_drawText",
            value: function(t, e, i, a) {
                var n;
                t.save(),
                i === Kt ? (t.strokeStyle = a.text.color,
                n = t.strokeText) : (t.fillStyle = a.text.color,
                n = t.fillText),
                t.font = "".concat(a.text.weight, " ").concat(a.text.size, "px ").concat(a.text.family),
                e.forEach((function(e) {
                    n.call(t, e.text, e.x + a.text.marginLeft, e.y - a.text.marginBottom)
                }
                )),
                t.restore()
            }
        }, {
            key: "draw",
            value: function(t) {
                var e = this
                  , i = this._points.map((function(t) {
                    var i = t.price;
                    return {
                        x: e._timestampOrDataIndexToPointX({
                            timestamp: t.timestamp,
                            dataIndex: t.dataIndex
                        }),
                        y: e._yAxis.convertToPixel(i)
                    }
                }
                ))
                  , a = this._styles || this._chartData.styleOptions().graphicMark;
                if (1 !== this._drawStep && i.length > 0) {
                    var n = {
                        width: this._xAxis.width(),
                        height: this._yAxis.height()
                    }
                      , r = {
                        price: this._chartData.pricePrecision(),
                        volume: this._chartData.volumePrecision()
                    }
                      , o = this.createGraphicDataSource(this._drawStep, this._points, i, n, r, this._xAxis, this._yAxis) || [];
                    o.forEach((function(i) {
                        var n = i.type
                          , r = i.isDraw
                          , o = i.style
                          , s = i.dataSource
                          , c = void 0 === s ? [] : s;
                        if (!F(r) || r)
                            switch (n) {
                            case Nt:
                                e._drawLines(t, c, o, a);
                                break;
                            case jt:
                                e._drawContinuousLines(t, c, o, a);
                                break;
                            case Zt:
                                e._drawPolygons(t, c, o, a);
                                break;
                            case Ut:
                                e._drawArcs(t, c, o, a);
                                break;
                            case Xt:
                                e._drawText(t, c, o, a)
                            }
                    }
                    )),
                    this.drawExtend && (t.save(),
                    this.drawExtend(t, o, a, n, r, this._xAxis, this._yAxis),
                    t.restore())
                }
                var s = this._chartData.graphicMarkMouseOperate();
                (s.hover.id === this._id && s.hover.element !== Gt || s.click.id === this._id && s.click.element !== Gt) && i.forEach((function(i, n) {
                    var r = i.x
                      , o = i.y
                      , c = a.point.radius
                      , h = a.point.backgroundColor
                      , l = a.point.borderColor
                      , u = a.point.borderSize;
                    s.hover.id === e._id && s.hover.element === Wt && n === s.hover.elementIndex && (c = a.point.activeRadius,
                    h = a.point.activeBackgroundColor,
                    l = a.point.activeBorderColor,
                    u = a.point.activeBorderSize),
                    Ct(t, l, {
                        x: r,
                        y: o
                    }, c + u),
                    Ct(t, h, {
                        x: r,
                        y: o
                    }, c)
                }
                ))
            }
        }, {
            key: "setLock",
            value: function(t) {
                this._lock = t
            }
        }, {
            key: "name",
            value: function() {
                return this._name
            }
        }, {
            key: "lock",
            value: function() {
                return this._lock
            }
        }, {
            key: "totalStep",
            value: function() {
                return this._totalStep
            }
        }, {
            key: "points",
            value: function() {
                return this._points
            }
        }, {
            key: "isDrawing",
            value: function() {
                return -1 !== this._drawStep
            }
        }, {
            key: "checkMousePointOnGraphic",
            value: function(t) {
                for (var e = this._styles || this._chartData.styleOptions().graphicMark, i = [], a = 0; this._points.length > a; a++) {
                    var n = this._points[a]
                      , r = n.price
                      , o = {
                        x: this._timestampOrDataIndexToPointX({
                            timestamp: n.timestamp,
                            dataIndex: n.dataIndex
                        }),
                        y: this._yAxis.convertToPixel(r)
                    };
                    if (i.push(o),
                    Ft(o, e.point.radius, t))
                        return {
                            id: this._id,
                            element: Wt,
                            elementIndex: a,
                            instance: this
                        }
                }
                var s, c = A(this.createGraphicDataSource(this._drawStep, this._points, i, {
                    width: this._xAxis.width(),
                    height: this._yAxis.height()
                }, {
                    price: this._chartData.pricePrecision(),
                    volume: this._chartData.volumePrecision()
                }, this._xAxis, this._yAxis) || []);
                try {
                    for (c.s(); !(s = c.n()).done; ) {
                        var h = s.value
                          , l = h.key
                          , u = h.type
                          , d = h.dataSource
                          , _ = void 0 === d ? [] : d;
                        if (h.isCheck)
                            for (var v = 0; _.length > v; v++) {
                                if (this.checkMousePointOn(l, u, _[v], t))
                                    return {
                                        id: this._id,
                                        element: Yt,
                                        elementIndex: v,
                                        instance: this
                                    }
                            }
                    }
                } catch (t) {
                    c.e(t)
                } finally {
                    c.f()
                }
            }
        }, {
            key: "mouseMoveForDrawing",
            value: function(t) {
                var e = this._xAxis.convertFromPixel(t.x)
                  , i = this._chartData.dataIndexToTimestamp(e)
                  , a = this._yAxis.convertFromPixel(t.y);
                this._points[this._drawStep - 1] = {
                    timestamp: i,
                    price: a,
                    dataIndex: e
                },
                this.performMouseMoveForDrawing(this._drawStep, this._points, {
                    timestamp: i,
                    price: a,
                    dataIndex: e
                }, this._xAxis, this._yAxis),
                this.onDrawing({
                    id: this._id,
                    step: this._drawStep,
                    points: this._points
                })
            }
        }, {
            key: "mouseLeftButtonDownForDrawing",
            value: function() {
                this._drawStep === this._totalStep - 1 ? (this._drawStep = -1,
                this.onDrawEnd({
                    id: this._id,
                    points: this._points
                })) : this._drawStep++
            }
        }, {
            key: "mousePressedMove",
            value: function(t, e) {
                var i = this._chartData.graphicMarkMouseOperate()
                  , a = i.click.elementIndex;
                if (!this._lock && i.click.id === this._id && i.click.element === Wt && -1 !== a) {
                    var n = this._xAxis.convertFromPixel(t.x)
                      , r = this._chartData.dataIndexToTimestamp(n)
                      , o = this._yAxis.convertFromPixel(t.y);
                    this._points[a].timestamp = r,
                    this._points[a].dataIndex = n,
                    this._points[a].price = o,
                    this.performMousePressedMove(this._points, a, {
                        dataIndex: n,
                        timestamp: r,
                        price: o
                    }, this._xAxis, this._yAxis),
                    this.onPressedMove({
                        id: i.click.id,
                        points: this._points,
                        event: e
                    })
                }
            }
        }, {
            key: "onDrawStart",
            value: function(t) {}
        }, {
            key: "onDrawing",
            value: function(t) {}
        }, {
            key: "onDrawEnd",
            value: function(t) {}
        }, {
            key: "onPressedMove",
            value: function(t) {}
        }, {
            key: "onRemove",
            value: function(t) {}
        }, {
            key: "checkMousePointOn",
            value: function(t, e, i, a) {}
        }, {
            key: "createGraphicDataSource",
            value: function(t, e, i, a, n, r, o) {}
        }, {
            key: "performMouseMoveForDrawing",
            value: function(t, e, i, a, n) {}
        }, {
            key: "performMousePressedMove",
            value: function(t, e, i, a, n) {}
        }]),
        i
    }(Et)
      , ie = function() {
        function t() {
            m(this, t),
            this._observers = []
        }
        return g(t, [{
            key: "subscribe",
            value: function(t) {
                0 > this._observers.indexOf(t) && this._observers.push(t)
            }
        }, {
            key: "unsubscribe",
            value: function(t) {
                var e = this._observers.indexOf(t);
                e > -1 ? this._observers.splice(e, 1) : this._observers = []
            }
        }, {
            key: "execute",
            value: function(t) {
                this._observers.forEach((function(e) {
                    e(t)
                }
                ))
            }
        }, {
            key: "hasObservers",
            value: function() {
                return this._observers.length > 0
            }
        }]),
        t
    }();
    function ae(t) {
        var e = t.name
          , i = t.totalStep
          , a = t.checkMousePointOn
          , n = t.createGraphicDataSource
          , r = t.performMousePressedMove
          , o = t.performMouseMoveForDrawing
          , s = t.drawExtend;
        if (!(e && R(i) && L(a) && L(n)))
            return null;
        var c = function(t) {
            D(n, t);
            var a = P(n);
            function n(t) {
                var r = t.id
                  , o = t.chartData
                  , s = t.xAxis
                  , c = t.yAxis
                  , h = t.points
                  , l = t.styles
                  , u = t.lock;
                return m(this, n),
                a.call(this, {
                    id: r,
                    name: e,
                    totalStep: i,
                    chartData: o,
                    xAxis: s,
                    yAxis: c,
                    points: h,
                    styles: l,
                    lock: u
                })
            }
            return n
        }(ee);
        return c.prototype.checkMousePointOn = a,
        c.prototype.createGraphicDataSource = n,
        L(r) && (c.prototype.performMousePressedMove = r),
        L(o) && (c.prototype.performMouseMoveForDrawing = o),
        L(s) && (c.prototype.drawExtend = s),
        c
    }
    function ne(t) {
        return {
            name: t.name(),
            id: t.id(),
            totalStep: t.totalStep(),
            lock: t.lock(),
            points: t.tpPoints(),
            styles: t.styles()
        }
    }
    var re = "technical_indicator_pane_"
      , oe = "graphic_mark_"
      , se = "candle_pane"
      , ce = 1
      , he = 2
      , le = 3
      , ue = {
        DRAW_CANDLE: "drawCandle",
        DRAW_TECHNICAL_INDICATOR: "drawTechnicalIndicator",
        ZOOM: "zoom",
        SCROLL: "scroll",
        CROSSHAIR: "crosshair",
        PANE_DRAG: "pane_drag"
    }
      , de = function() {
        function t(e, i) {
            m(this, t),
            this._handler = i,
            this._styleOptions = S(lt),
            T(this._styleOptions, e),
            this._technicalIndicatorMapping = function() {
                var t = {}
                  , e = v.technicalIndicatorExtensions;
                for (var i in e) {
                    var a = bt(e[i]);
                    a && (t[i] = a)
                }
                return t
            }(),
            this._zoomEnabled = !0,
            this._scrollEnabled = !0,
            this._pricePrecision = 2,
            this._volumePrecision = 0,
            this._dateTimeFormat = new Intl.DateTimeFormat("en",{
                hour12: !1,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            }),
            this._dataList = [],
            this._visibleDataList = [],
            this._loading = !0,
            this._loadMoreCallback = null,
            this._more = !0,
            this._totalDataSpace = 0,
            this._dataSpace = 6,
            this._barSpace = this._calcBarSpace(),
            this._offsetRightSpace = 50,
            this._offsetRightBarCount = this._offsetRightSpace / this._dataSpace,
            this._leftMinVisibleBarCount = 2,
            this._rightMinVisibleBarCount = 2,
            this._from = 0,
            this._to = 0,
            this._crosshair = {},
            this._preOffsetRightBarCount = 0,
            this._dragGraphicMarkFlag = !1,
            this._graphicMarkMapping = function() {
                var t = {}
                  , e = v.graphicMarkExtensions;
                for (var i in e) {
                    var a = ae(e[i]);
                    a && (t[i] = a)
                }
                return t
            }(),
            this._graphicMarkMouseOperate = {
                click: {
                    id: "",
                    element: Gt,
                    elementIndex: -1
                },
                hover: {
                    id: "",
                    element: Gt,
                    elementIndex: -1
                }
            },
            this._graphicMarks = [],
            this._annotations = new Map,
            this._visibleAnnotations = [],
            this._annotationMouseOperate = {
                id: ""
            },
            this._tags = new Map,
            this._dragPaneFlag = !1,
            this._actionDelegate = new Map
        }
        return g(t, [{
            key: "_calcBarSpace",
            value: function() {
                return Math.max(1, Math.min(Math.floor(.8 * this._dataSpace), Math.floor(this._dataSpace) - 1))
            }
        }, {
            key: "_adjustVisibleDataList",
            value: function() {
                var t = this._dataList.length;
                this._visibleDataList = [],
                this._visibleAnnotations = [];
                for (var e = this._from; this._to > e; e++) {
                    var i = this._dataList[e]
                      , a = this._totalDataSpace - (t + this._offsetRightBarCount - e - .5) * this._dataSpace;
                    this._visibleDataList.push({
                        index: e,
                        x: a,
                        data: i
                    });
                    var n = this._annotations.get(i.timestamp) || [];
                    if (n.length > 0) {
                        var r, o = A(n);
                        try {
                            for (o.s(); !(r = o.n()).done; ) {
                                var s = r.value;
                                s.createSymbolCoordinate(a),
                                this._visibleAnnotations.push(s)
                            }
                        } catch (t) {
                            o.e(t)
                        } finally {
                            o.f()
                        }
                    }
                }
            }
        }, {
            key: "_adjustFromTo",
            value: function() {
                var t = this._dataList.length
                  , e = this._totalDataSpace / this._dataSpace
                  , i = e - Math.min(this._leftMinVisibleBarCount, t);
                this._offsetRightBarCount > i && (this._offsetRightBarCount = i);
                var a = -t + Math.min(this._rightMinVisibleBarCount, t);
                a > this._offsetRightBarCount && (this._offsetRightBarCount = a),
                this._to = Math.round(this._offsetRightBarCount + t + .5),
                this._from = Math.round(this._to - e) - 1,
                this._to > t && (this._to = t),
                0 > this._from && (this._from = 0),
                this._adjustVisibleDataList(),
                0 === this._from && this._more && !this._loading && this._loadMoreCallback && L(this._loadMoreCallback) && (this._loading = !0,
                this._loadMoreCallback(ut(this._dataList[0], "timestamp")))
            }
        }, {
            key: "styleOptions",
            value: function() {
                return this._styleOptions
            }
        }, {
            key: "applyStyleOptions",
            value: function(t) {
                T(this._styleOptions, t)
            }
        }, {
            key: "getTechnicalIndicatorInfo",
            value: function(t) {
                if (!F(t)) {
                    var e = {};
                    for (var i in this._technicalIndicatorMapping) {
                        e[i] = Mt(this._technicalIndicatorMapping[i])
                    }
                    return e
                }
                var a = this.getTechnicalIndicatorInstance(t);
                return a ? Mt(a) : {}
            }
        }, {
            key: "getTechnicalIndicatorInstance",
            value: function(t) {
                return this._technicalIndicatorMapping[t]
            }
        }, {
            key: "pricePrecision",
            value: function() {
                return this._pricePrecision
            }
        }, {
            key: "volumePrecision",
            value: function() {
                return this._volumePrecision
            }
        }, {
            key: "dateTimeFormat",
            value: function() {
                return this._dateTimeFormat
            }
        }, {
            key: "setTimezone",
            value: function(t) {
                var e;
                try {
                    e = new Intl.DateTimeFormat("en",{
                        hour12: !1,
                        timeZone: t,
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                    })
                } catch (t) {}
                e && (this._dateTimeFormat = e)
            }
        }, {
            key: "timezone",
            value: function() {
                return this._dateTimeFormat.resolvedOptions().timeZone
            }
        }, {
            key: "setPriceVolumePrecision",
            value: function(t, e) {
                for (var i in this._pricePrecision = t,
                this._volumePrecision = e,
                this._technicalIndicatorMapping) {
                    switch (this._technicalIndicatorMapping[i].series) {
                    case mt:
                        this._technicalIndicatorMapping[i].setPrecision(t);
                        break;
                    case xt:
                        this._technicalIndicatorMapping[i].setPrecision(e)
                    }
                }
            }
        }, {
            key: "dataList",
            value: function() {
                return this._dataList
            }
        }, {
            key: "visibleDataList",
            value: function() {
                return this._visibleDataList
            }
        }, {
            key: "clearDataList",
            value: function() {
                this._more = !0,
                this._loading = !0,
                this._dataList = [],
                this._visibleDataList = [],
                this._from = 0,
                this._to = 0
            }
        }, {
            key: "addData",
            value: function(t, e, i) {
                if (O(t)) {
                    if (I(t)) {
                        this._loading = !1,
                        this._more = !z(i) || i;
                        var a = 0 === this._dataList.length;
                        this._dataList = t.concat(this._dataList),
                        a && this.setOffsetRightSpace(this._offsetRightSpace),
                        this._adjustFromTo()
                    } else {
                        this._dataList.length > e ? (this._dataList[e] = t,
                        this._adjustVisibleDataList()) : (this._dataList.push(t),
                        0 > this._offsetRightBarCount && (this._offsetRightBarCount -= 1),
                        this._adjustFromTo())
                    }
                    this.setCrosshair(this._crosshair, !0)
                }
            }
        }, {
            key: "dataSpace",
            value: function() {
                return this._dataSpace
            }
        }, {
            key: "barSpace",
            value: function() {
                return this._barSpace
            }
        }, {
            key: "setDataSpace",
            value: function(t, e) {
                1 > t || t > 50 || this._dataSpace === t || (this._dataSpace = t,
                this._barSpace = this._calcBarSpace(),
                e && e(),
                this._adjustFromTo(),
                this.setCrosshair(this._crosshair, !0),
                this.invalidate())
            }
        }, {
            key: "setTotalDataSpace",
            value: function(t) {
                this._totalDataSpace !== t && (this._totalDataSpace = t,
                this._adjustFromTo(),
                this.setCrosshair(this._crosshair, !0))
            }
        }, {
            key: "setOffsetRightSpace",
            value: function(t, e) {
                this._offsetRightSpace = t,
                this._offsetRightBarCount = t / this._dataSpace,
                e && (this._adjustFromTo(),
                this.setCrosshair(this._crosshair, !0),
                this.invalidate())
            }
        }, {
            key: "offsetRightSpace",
            value: function() {
                return this._offsetRightSpace
            }
        }, {
            key: "offsetRightBarCount",
            value: function() {
                return this._offsetRightBarCount
            }
        }, {
            key: "setLeftMinVisibleBarCount",
            value: function(t) {
                this._leftMinVisibleBarCount = t
            }
        }, {
            key: "setRightMinVisibleBarCount",
            value: function(t) {
                this._rightMinVisibleBarCount = t
            }
        }, {
            key: "from",
            value: function() {
                return this._from
            }
        }, {
            key: "to",
            value: function() {
                return this._to
            }
        }, {
            key: "crosshair",
            value: function() {
                return this._crosshair
            }
        }, {
            key: "setCrosshair",
            value: function(t, e) {
                var i, a, n = t || {};
                a = F(n.x) ? 0 > (i = this.coordinateToDataIndex(n.x)) ? 0 : i > this._dataList.length - 1 ? this._dataList.length - 1 : i : i = this._dataList.length - 1;
                var r = this._dataList[a]
                  , o = this.dataIndexToCoordinate(i)
                  , s = this._crosshair.x
                  , c = this._crosshair.y
                  , h = this._crosshair.paneId;
                this._crosshair = p(p({}, n), {}, {
                    realX: o,
                    kLineData: r,
                    realDataIndex: i,
                    dataIndex: a
                }),
                n.paneId && r && this._handler.crosshair({
                    realDataIndex: i,
                    dataIndex: a,
                    kLineData: r,
                    x: n.x,
                    y: n.y
                }),
                s === n.x && c === n.y && h === n.paneId || e || this.invalidate(ce)
            }
        }, {
            key: "startScroll",
            value: function() {
                this._preOffsetRightBarCount = this._offsetRightBarCount
            }
        }, {
            key: "scroll",
            value: function(t, e) {
                if (this._scrollEnabled) {
                    var i = t / this._dataSpace;
                    this.actionExecute(ue.SCROLL, {
                        barCount: i,
                        distance: t
                    }),
                    this._offsetRightBarCount = this._preOffsetRightBarCount - i,
                    this._adjustFromTo(),
                    this.setCrosshair(e || this._crosshair, !0),
                    this.invalidate()
                }
            }
        }, {
            key: "coordinateToFloatIndex",
            value: function(t) {
                return Math.round(1e6 * (this._dataList.length + this._offsetRightBarCount - (this._totalDataSpace - t) / this._dataSpace)) / 1e6
            }
        }, {
            key: "dataIndexToTimestamp",
            value: function(t) {
                var e = this._dataList[t];
                if (e)
                    return e.timestamp
            }
        }, {
            key: "timestampToDataIndex",
            value: function(t) {
                return 0 === this._dataList.length ? 0 : function(t, e, i) {
                    var a = 0
                      , n = 0;
                    for (n = t.length - 1; a !== n; ) {
                        var r = Math.floor((n + a) / 2)
                          , o = n - a
                          , s = t[r][e];
                        if (i === t[a][e])
                            return a;
                        if (i === t[n][e])
                            return n;
                        if (i === s)
                            return r;
                        if (i > s ? a = r : n = r,
                        2 >= o)
                            break
                    }
                    return a
                }(this._dataList, "timestamp", t)
            }
        }, {
            key: "dataIndexToCoordinate",
            value: function(t) {
                return this._totalDataSpace - (this._dataList.length + this._offsetRightBarCount - t - .5) * this._dataSpace
            }
        }, {
            key: "coordinateToDataIndex",
            value: function(t) {
                return Math.ceil(this.coordinateToFloatIndex(t)) - 1
            }
        }, {
            key: "zoom",
            value: function(t, e) {
                var i = this;
                if (this._zoomEnabled) {
                    e && F(e.x) || (e = {
                        x: F(this._crosshair.x) ? this._crosshair.x : this._totalDataSpace / 2
                    }),
                    this.actionExecute(ue.ZOOM, {
                        point: e,
                        scale: t
                    });
                    var a = this.coordinateToFloatIndex(e.x);
                    this.setDataSpace(this._dataSpace + t * (this._dataSpace / 10), (function() {
                        i._offsetRightBarCount += a - i.coordinateToFloatIndex(e.x)
                    }
                    ))
                }
            }
        }, {
            key: "invalidate",
            value: function(t) {
                this._handler.invalidate(t)
            }
        }, {
            key: "setZoomEnabled",
            value: function(t) {
                this._zoomEnabled = t
            }
        }, {
            key: "zoomEnabled",
            value: function() {
                return this._zoomEnabled
            }
        }, {
            key: "setScrollEnabled",
            value: function(t) {
                this._scrollEnabled = t
            }
        }, {
            key: "scrollEnabled",
            value: function() {
                return this._scrollEnabled
            }
        }, {
            key: "setLoadMoreCallback",
            value: function(t) {
                this._loadMoreCallback = t
            }
        }, {
            key: "addGraphicMarkInstance",
            value: function(t) {
                if (this._graphicMarks.find((function(e) {
                    return e.id() === t.id()
                }
                )))
                    return !1;
                var e = this._graphicMarks[this._graphicMarks.length - 1];
                return e && e.isDrawing() ? this._graphicMarks[this._graphicMarks.length - 1] = t : this._graphicMarks.push(t),
                this.invalidate(ce),
                !0
            }
        }, {
            key: "addCustomGraphicMark",
            value: function(t) {
                var e = this;
                t.forEach((function(t) {
                    var i = ae(t);
                    i && (e._graphicMarkMapping[t.name] = i)
                }
                ))
            }
        }, {
            key: "setGraphicMarkOptions",
            value: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                  , i = e.styles
                  , a = e.lock
                  , n = this._graphicMarks.find((function(e) {
                    return e.id() === t
                }
                ));
                n && (n.setLock(a),
                n.setStyles(i, this._styleOptions.graphicMark) && this.invalidate(ce))
            }
        }, {
            key: "getGraphicMark",
            value: function(t) {
                if (!t)
                    return this._graphicMarks.map((function(t) {
                        return ne(t)
                    }
                    ));
                var e = this._graphicMarks.find((function(e) {
                    return e.id() === t
                }
                ));
                return e ? ne(e) : null
            }
        }, {
            key: "removeGraphicMarkInstance",
            value: function(t) {
                var e = this._graphicMarks;
                if (F(t)) {
                    var i = e.findIndex((function(e) {
                        return e.id() === t
                    }
                    ));
                    i > -1 && (e[i].onRemove({
                        id: e[i].id()
                    }),
                    e.splice(i, 1),
                    this.invalidate(ce))
                } else
                    e.length > 0 && (e.forEach((function(t) {
                        t.onRemove({
                            id: t.id()
                        })
                    }
                    )),
                    this._graphicMarks = [],
                    this.invalidate(ce))
            }
        }, {
            key: "dragGraphicMarkFlag",
            value: function() {
                return this._dragGraphicMarkFlag
            }
        }, {
            key: "setDragGraphicMarkFlag",
            value: function(t) {
                this._dragGraphicMarkFlag = t
            }
        }, {
            key: "graphicMarkMouseOperate",
            value: function() {
                return this._graphicMarkMouseOperate
            }
        }, {
            key: "dragPaneFlag",
            value: function() {
                return this._dragPaneFlag
            }
        }, {
            key: "setDragPaneFlag",
            value: function(t) {
                this._dragPaneFlag = t
            }
        }, {
            key: "graphicMarkMapping",
            value: function() {
                return this._graphicMarkMapping
            }
        }, {
            key: "graphicMarks",
            value: function() {
                return this._graphicMarks
            }
        }, {
            key: "visibleAnnotations",
            value: function() {
                return this._visibleAnnotations
            }
        }, {
            key: "annotationMouseOperate",
            value: function() {
                return this._annotationMouseOperate
            }
        }, {
            key: "addAnnotations",
            value: function(t) {
                var e = this;
                t.forEach((function(t) {
                    e._annotations.has(t.id()) ? e._annotations.get(t.id()).push(t) : e._annotations.set(t.id(), [t])
                }
                )),
                this._adjustVisibleDataList(),
                this.invalidate(ce)
            }
        }, {
            key: "removeAnnotation",
            value: function(t) {
                var e = this
                  , i = !1;
                F(t) ? ([].concat(t).forEach((function(t) {
                    var a = t.timestamp;
                    e._annotations.has(a) && (i = !0,
                    e._annotations.delete(a))
                }
                )),
                i && this._adjustVisibleDataList()) : (i = !0,
                this._annotations.clear(),
                this._visibleAnnotations = []),
                i && this.invalidate(ce)
            }
        }, {
            key: "tags",
            value: function() {
                return this._tags
            }
        }, {
            key: "getTag",
            value: function(t) {
                return this._tags.get(t)
            }
        }, {
            key: "addTags",
            value: function(t) {
                var e = this;
                t.forEach((function(t) {
                    e._tags.set(t.id(), t)
                }
                )),
                this.invalidate(ce)
            }
        }, {
            key: "removeTag",
            value: function(t) {
                var e = this
                  , i = !1;
                F(t) ? [].concat(t).forEach((function(t) {
                    e._tags.has(t) && (i = !0,
                    e._tags.delete(t))
                }
                )) : (i = !0,
                this._tags.clear());
                i && this.invalidate(ce)
            }
        }, {
            key: "setOverlayMouseOperate",
            value: function(t, e) {
                var i = this._graphicMarkMouseOperate
                  , a = i.hover
                  , n = i.click
                  , r = this._annotationMouseOperate.id
                  , o = this._graphicMarks[this._graphicMarks.length - 1]
                  , s = !1;
                !t.hover || a.id === t.hover.id && a.element === t.hover.element && a.elementIndex === t.hover.elementIndex || (this._graphicMarkMouseOperate.hover = p({}, t.hover),
                s = !0),
                !t.click || n.id === t.click.id && n.element === t.click.element && n.elementIndex === t.click.elementIndex || (this._graphicMarkMouseOperate.click = p({}, t.click),
                s = !0),
                e && r !== e.id && (this._annotationMouseOperate = p({}, e),
                s = !0),
                (s || o && o.isDrawing()) && this.invalidate(ce)
            }
        }, {
            key: "addCustomTechnicalIndicator",
            value: function(t) {
                var e = this;
                t.forEach((function(t) {
                    var i = bt(t || {});
                    i && (e._technicalIndicatorMapping[i.name] = i)
                }
                ))
            }
        }, {
            key: "actionExecute",
            value: function(t, e, i, a) {
                this.hasAction(t) && (i && i(),
                this._actionDelegate.get(t).execute(e),
                a && a())
            }
        }, {
            key: "hasAction",
            value: function(t) {
                return this._actionDelegate.has(t) && this._actionDelegate.get(t).hasObservers()
            }
        }, {
            key: "subscribeAction",
            value: function(t, e) {
                return Object.values(ue).indexOf(t) >= 0 && (this._actionDelegate.has(t) || this._actionDelegate.set(t, new ie),
                this._actionDelegate.get(t).subscribe(e),
                !0)
            }
        }, {
            key: "unsubscribeAction",
            value: function(t, e) {
                if (0 > Object.values(ue).indexOf(t))
                    return !1;
                if (this._actionDelegate.has(t)) {
                    var i = this._actionDelegate.get(t);
                    return i.unsubscribe(e),
                    i.hasObservers() || this._actionDelegate.delete(t),
                    !0
                }
                return !1
            }
        }]),
        t
    }();
    function _e(t) {
        return t.ownerDocument && t.ownerDocument.defaultView && t.ownerDocument.defaultView.devicePixelRatio || 2
    }
    function ve(t, e) {
        return Math.round(t.measureText(e).width)
    }
    function fe() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 12
          , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "normal"
          , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Helvetica Neue";
        return "".concat(e, " ").concat(t, "px ").concat(i)
    }
    var pe = function() {
        function t(e) {
            m(this, t),
            this._height = -1,
            this._container = e.container,
            this._chartData = e.chartData,
            this._initBefore(e),
            this._initElement(),
            this._mainWidget = this._createMainWidget(this._element, e),
            this._yAxisWidget = this._createYAxisWidget(this._element, e)
        }
        return g(t, [{
            key: "_initBefore",
            value: function(t) {}
        }, {
            key: "_initElement",
            value: function() {
                this._element = document.createElement("div"),
                this._element.style.margin = "0",
                this._element.style.padding = "0",
                this._element.style.position = "relative",
                this._element.style.overflow = "hidden",
                this._element.style.width = "100%";
                var t = this._container.lastChild;
                t ? this._container.insertBefore(this._element, t) : this._container.appendChild(this._element)
            }
        }, {
            key: "_createMainWidget",
            value: function(t, e) {}
        }, {
            key: "_createYAxisWidget",
            value: function(t, e) {}
        }, {
            key: "width",
            value: function() {
                return this._element.offsetWidth
            }
        }, {
            key: "setWidth",
            value: function(t, e) {
                this._mainWidget.setWidth(t),
                this._yAxisWidget && this._yAxisWidget.setWidth(e)
            }
        }, {
            key: "height",
            value: function() {
                return this._height
            }
        }, {
            key: "setHeight",
            value: function(t) {
                this._height = t,
                this._mainWidget.setHeight(t),
                this._yAxisWidget && this._yAxisWidget.setHeight(t)
            }
        }, {
            key: "setOffsetLeft",
            value: function(t, e) {
                this._mainWidget.setOffsetLeft(t),
                this._yAxisWidget && this._yAxisWidget.setOffsetLeft(e)
            }
        }, {
            key: "layout",
            value: function() {
                this._element.offsetHeight !== this._height && (this._element.style.height = "".concat(this._height, "px")),
                this._mainWidget.layout(),
                this._yAxisWidget && this._yAxisWidget.layout()
            }
        }, {
            key: "invalidate",
            value: function(t) {
                this._yAxisWidget && this._yAxisWidget.invalidate(t),
                this._mainWidget.invalidate(t)
            }
        }, {
            key: "getImage",
            value: function(t) {
                var e = document.createElement("canvas")
                  , i = e.getContext("2d")
                  , a = _e(e)
                  , n = this._element.offsetWidth
                  , r = this._element.offsetHeight;
                e.style.width = "".concat(n, "px"),
                e.style.height = "".concat(r, "px"),
                e.width = n * a,
                e.height = r * a,
                i.scale(a, a);
                var o = this._mainWidget.getElement()
                  , s = o.offsetWidth
                  , c = o.offsetHeight
                  , h = parseInt(o.style.left, 10);
                if (i.drawImage(this._mainWidget.getImage(t), h, 0, s, c),
                this._yAxisWidget) {
                    var l = this._yAxisWidget.getElement()
                      , u = l.offsetWidth
                      , d = l.offsetHeight
                      , _ = parseInt(l.style.left, 10);
                    i.drawImage(this._yAxisWidget.getImage(t), _, 0, u, d)
                }
                return e
            }
        }, {
            key: "destroy",
            value: function() {
                this._container.removeChild(this._element)
            }
        }]),
        t
    }()
      , ye = function() {
        function t(e) {
            m(this, t),
            this._width = 0,
            this._height = 0,
            this._initElement(e.container),
            this._mainView = this._createMainView(this._element, e),
            this._overlayView = this._createOverlayView(this._element, e)
        }
        return g(t, [{
            key: "_initElement",
            value: function(t) {
                this._element = document.createElement("div"),
                this._element.style.top = "0",
                this._element.style.margin = "0",
                this._element.style.padding = "0",
                this._element.style.position = "absolute",
                this._element.style.overflow = "hidden",
                t.appendChild(this._element)
            }
        }, {
            key: "_createMainView",
            value: function(t, e) {}
        }, {
            key: "_createOverlayView",
            value: function(t, e) {}
        }, {
            key: "getElement",
            value: function() {
                return this._element
            }
        }, {
            key: "setWidth",
            value: function(t) {
                this._width = t,
                this._mainView.setWidth(t),
                this._overlayView.setWidth(t)
            }
        }, {
            key: "setHeight",
            value: function(t) {
                this._height = t,
                this._mainView.setHeight(t),
                this._overlayView.setHeight(t)
            }
        }, {
            key: "setOffsetLeft",
            value: function(t) {
                this._element.style.left = "".concat(t, "px")
            }
        }, {
            key: "layout",
            value: function() {
                this._element.offsetWidth !== this._width && (this._element.style.width = "".concat(this._width, "px")),
                this._element.offsetHeight !== this._height && (this._element.style.height = "".concat(this._height, "px")),
                this._mainView.layout(),
                this._overlayView.layout()
            }
        }, {
            key: "invalidate",
            value: function(t) {
                switch (t) {
                case ce:
                    this._overlayView.flush();
                    break;
                case he:
                case le:
                    this._mainView.flush(),
                    this._overlayView.flush()
                }
            }
        }, {
            key: "getImage",
            value: function(t) {
                var e = document.createElement("canvas")
                  , i = e.getContext("2d")
                  , a = _e(e);
                return e.style.width = "".concat(this._width, "px"),
                e.style.height = "".concat(this._height, "px"),
                e.width = this._width * a,
                e.height = this._height * a,
                i.scale(a, a),
                i.drawImage(this._mainView.getImage(), 0, 0, this._width, this._height),
                t && this._overlayView && i.drawImage(this._overlayView.getImage(), 0, 0, this._width, this._height),
                e
            }
        }]),
        t
    }();
    function me(t) {
        return window.requestAnimationFrame ? window.requestAnimationFrame(t) : window.setTimeout(t, 20)
    }
    var xe = function() {
        function t(e, i) {
            m(this, t),
            this._chartData = i,
            this._initCanvas(e)
        }
        return g(t, [{
            key: "_initCanvas",
            value: function(t) {
                this._canvas = document.createElement("canvas"),
                this._canvas.style.position = "absolute",
                this._canvas.style.top = "0",
                this._canvas.style.left = "0",
                this._canvas.style.zIndex = "2",
                this._ctx = this._canvas.getContext("2d"),
                t.appendChild(this._canvas)
            }
        }, {
            key: "_redraw",
            value: function(t) {
                this._ctx.clearRect(0, 0, this._canvas.offsetWidth, this._canvas.offsetHeight),
                t && t(),
                this._draw()
            }
        }, {
            key: "_draw",
            value: function() {}
        }, {
            key: "setWidth",
            value: function(t) {
                this._width = t
            }
        }, {
            key: "setHeight",
            value: function(t) {
                this._height = t
            }
        }, {
            key: "layout",
            value: function() {
                var t = this;
                this._height !== this._canvas.offsetHeight || this._width !== this._canvas.offsetWidth ? this._redraw((function() {
                    var e = _e(t._canvas);
                    t._canvas.style.width = "".concat(t._width, "px"),
                    t._canvas.style.height = "".concat(t._height, "px"),
                    t._canvas.width = Math.floor(t._width * e),
                    t._canvas.height = Math.floor(t._height * e),
                    t._ctx.scale(e, e)
                }
                )) : this.flush()
            }
        }, {
            key: "flush",
            value: function() {
                var t, e = this;
                this.requestAnimationId && (t = this.requestAnimationId,
                window.cancelAnimationFrame || clearTimeout(t),
                window.cancelAnimationFrame(t),
                this.requestAnimationId = null),
                this.requestAnimationId = me((function() {
                    e._redraw()
                }
                ))
            }
        }, {
            key: "getImage",
            value: function() {
                return this._canvas
            }
        }]),
        t
    }()
      , ge = function(t) {
        D(i, t);
        var e = P(i);
        function i(t, a, n, r, o) {
            var s;
            return m(this, i),
            (s = e.call(this, t, a))._xAxis = n,
            s._yAxis = r,
            s._additionalDataProvider = o,
            s
        }
        return g(i, [{
            key: "_draw",
            value: function() {
                this._drawGrid(),
                this._drawTechnicalIndicators()
            }
        }, {
            key: "_drawGrid",
            value: function() {
                var t = this
                  , e = this._chartData.styleOptions().grid;
                if (e.show) {
                    var i = e.horizontal;
                    this._ctx.save(),
                    i.show && (this._ctx.strokeStyle = i.color,
                    this._ctx.lineWidth = i.size,
                    this._ctx.setLineDash(i.style === H ? i.dashValue : []),
                    this._yAxis.ticks().forEach((function(e) {
                        Bt(t._ctx, e.y, 0, t._width)
                    }
                    )));
                    var a = e.vertical;
                    a.show && (this._ctx.strokeStyle = a.color,
                    this._ctx.lineWidth = a.size,
                    this._ctx.setLineDash(a.style === H ? a.dashValue : []),
                    this._xAxis.ticks().forEach((function(e) {
                        Vt(t._ctx, e.x, 0, t._height)
                    }
                    ))),
                    this._ctx.restore()
                }
            }
        }, {
            key: "_drawTechnicalIndicators",
            value: function() {
                var t = this
                  , e = this._chartData.styleOptions().technicalIndicator;
                this._additionalDataProvider.technicalIndicators().forEach((function(i) {
                    var a = i.plots
                      , n = []
                      , r = t._chartData.dataList()
                      , o = i.result
                      , s = i.styles || e;
                    i.render && (t._ctx.save(),
                    i.render(t._ctx, {
                        from: t._chartData.from(),
                        to: t._chartData.to(),
                        kLineDataList: t._chartData.dataList(),
                        technicalIndicatorDataList: o
                    }, {
                        width: t._width,
                        height: t._height,
                        dataSpace: t._chartData.dataSpace(),
                        barSpace: t._chartData.barSpace()
                    }, s, {
                        convertFromPixel: t._xAxis.convertFromPixel.bind(t._xAxis),
                        convertToPixel: t._xAxis.convertToPixel.bind(t._xAxis)
                    }, {
                        convertFromPixel: t._yAxis.convertFromPixel.bind(t._yAxis),
                        convertToPixel: t._yAxis.convertToPixel.bind(t._yAxis)
                    }, t._yAxis.isCandleYAxis()),
                    t._ctx.restore());
                    var c = i.baseValue;
                    F(c) || (c = t._yAxis.min());
                    var h = t._yAxis.convertToPixel(c)
                      , l = t._yAxis.isCandleYAxis();
                    t._ctx.lineWidth = 1,
                    t._drawGraphics((function(e, c, u, d, _) {
                        var v = o[c] || {}
                          , f = 0;
                        i.shouldOhlc && !l && t._drawCandleBar(e, d, _, c, u, s.bar, q);
                        var y = {};
                        a.forEach((function(a) {
                            var m = v[a.key]
                              , x = t._yAxis.convertToPixel(m);
                            switch (y[a.key] = x,
                            a.type) {
                            case Dt:
                                if (F(m)) {
                                    var g = {
                                        preData: {
                                            kLineData: r[c - 1],
                                            technicalIndicatorData: o[c - 1]
                                        },
                                        currentData: {
                                            kLineData: u,
                                            technicalIndicatorData: v
                                        },
                                        nextData: {
                                            kLineData: r[c + 1],
                                            technicalIndicatorData: o[c + 1]
                                        }
                                    }
                                      , k = {
                                        x: e,
                                        y: x,
                                        radius: d,
                                        color: a.color && a.color(g, s) || s.circle.noChangeColor,
                                        isStroke: !a.isStroke || a.isStroke(g)
                                    };
                                    t._drawCircle(k)
                                }
                                break;
                            case kt:
                                if (F(m)) {
                                    var D = {
                                        preData: {
                                            kLineData: r[c - 1],
                                            technicalIndicatorData: o[c - 1]
                                        },
                                        currentData: {
                                            kLineData: u,
                                            technicalIndicatorData: v
                                        },
                                        nextData: {
                                            kLineData: r[c + 1],
                                            technicalIndicatorData: o[c + 1]
                                        }
                                    }
                                      , w = Math.abs(h - x)
                                      , b = {
                                        x: e - d,
                                        width: 2 * d,
                                        height: Math.max(1, w)
                                    };
                                    b.y = x > h ? h : 1 > w ? h - 1 : x,
                                    b.color = a.color && a.color(D, s) || s.bar.noChangeColor,
                                    b.isStroke = !!a.isStroke && a.isStroke(D),
                                    t._drawBar(b)
                                }
                                break;
                            case gt:
                                var M = null;
                                F(m) && (M = {
                                    x: e,
                                    y: x
                                }),
                                n[f] ? n[f].push(M) : n[f] = [M],
                                f++
                            }
                            t._drawActionExecute(ue.DRAW_TECHNICAL_INDICATOR, {
                                ctx: t._ctx,
                                kLineData: u,
                                dataIndex: c,
                                technicalIndicatorData: v,
                                technicalIndicatorName: i.name,
                                coordinate: p({
                                    x: e
                                }, y),
                                viewport: {
                                    width: t._width,
                                    height: t._height
                                },
                                barSpace: _,
                                halfBarSpace: d,
                                isCandle: l
                            })
                        }
                        ))
                    }
                    ), (function() {
                        t._drawLines(n, s)
                    }
                    ))
                }
                ))
            }
        }, {
            key: "_drawGraphics",
            value: function(t, e) {
                var i = this._chartData.visibleDataList()
                  , a = this._chartData.barSpace()
                  , n = a / 2;
                i.forEach((function(e, i) {
                    t(e.x, e.index, e.data, n, a, i)
                }
                )),
                e && e()
            }
        }, {
            key: "_drawLines",
            value: function(t, e) {
                var i = this
                  , a = e.line.colors || []
                  , n = a.length;
                this._ctx.lineWidth = e.line.size,
                Ht(this._ctx, (function() {
                    t.forEach((function(t, e) {
                        i._ctx.strokeStyle = a[e % n],
                        i._ctx.beginPath();
                        var r = !0;
                        t.forEach((function(t) {
                            F(t) && (r ? (i._ctx.moveTo(t.x, t.y),
                            r = !1) : i._ctx.lineTo(t.x, t.y))
                        }
                        )),
                        i._ctx.stroke(),
                        i._ctx.closePath()
                    }
                    ))
                }
                ))
            }
        }, {
            key: "_drawBar",
            value: function(t) {
                t.isStroke ? (this._ctx.strokeStyle = t.color,
                this._ctx.strokeRect(t.x + .5, t.y, t.width - 1, t.height)) : (this._ctx.fillStyle = t.color,
                this._ctx.fillRect(t.x, t.y, t.width, t.height))
            }
        }, {
            key: "_drawCircle",
            value: function(t) {
                this._ctx.strokeStyle = t.color,
                this._ctx.fillStyle = t.color,
                this._ctx.beginPath(),
                this._ctx.arc(t.x, t.y, t.radius, 2 * Math.PI, 0, !0),
                t.isStroke ? this._ctx.stroke() : this._ctx.fill(),
                this._ctx.closePath()
            }
        }, {
            key: "_drawCandleBar",
            value: function(t, e, i, a, n, r, o) {
                var s = n.open
                  , c = n.close
                  , h = n.high
                  , l = n.low;
                c > s ? (this._ctx.strokeStyle = r.upColor,
                this._ctx.fillStyle = r.upColor) : s > c ? (this._ctx.strokeStyle = r.downColor,
                this._ctx.fillStyle = r.downColor) : (this._ctx.strokeStyle = r.noChangeColor,
                this._ctx.fillStyle = r.noChangeColor);
                var u = this._yAxis.convertToPixel(s)
                  , d = this._yAxis.convertToPixel(c)
                  , _ = this._yAxis.convertToPixel(h)
                  , v = this._yAxis.convertToPixel(l)
                  , f = Math.min(u, d)
                  , p = Math.max(u, d);
                this._ctx.fillRect(t - .5, _, 1, f - _),
                this._ctx.fillRect(t - .5, p, 1, v - p);
                var y = Math.max(1, p - f);
                switch (o) {
                case j:
                    this._ctx.fillRect(t - e, f, i, y);
                    break;
                case Z:
                    this._ctx.strokeRect(t - e + .5, f, i - 1, y);
                    break;
                case U:
                    c > s ? this._ctx.strokeRect(t - e + .5, f, i - 1, y) : this._ctx.fillRect(t - e, f, i, y);
                    break;
                case K:
                    c > s ? this._ctx.fillRect(t - e, f, i, y) : this._ctx.strokeRect(t - e + .5, f, i - 1, y);
                    break;
                default:
                    this._ctx.fillRect(t - .5, _, 1, v - _),
                    this._ctx.fillRect(t - e, u - .5, e, 1),
                    this._ctx.fillRect(t, d - .5, e, 1)
                }
                this._drawActionExecute(ue.DRAW_CANDLE, {
                    ctx: this._ctx,
                    dataIndex: a,
                    kLineData: n,
                    coordinate: {
                        x: t,
                        open: u,
                        close: d,
                        high: _,
                        low: v
                    },
                    viewport: {
                        width: this._width,
                        height: this._height
                    },
                    barSpace: i,
                    halfBarSpace: e,
                    isCandle: this._yAxis.isCandleYAxis()
                })
            }
        }, {
            key: "_drawActionExecute",
            value: function(t, e) {
                var i = this;
                this._chartData.actionExecute(t, e, (function() {
                    i._ctx.save()
                }
                ), (function() {
                    i._ctx.restore()
                }
                ))
            }
        }]),
        i
    }(xe);
    function ke(t, e, i, a, n) {
        t.fillStyle = e,
        t.fillText(n, i, a)
    }
    var De = function(t) {
        D(i, t);
        var e = P(i);
        function i(t, a, n, r, o) {
            var s;
            return m(this, i),
            (s = e.call(this, t, a))._xAxis = n,
            s._yAxis = r,
            s._additionalDataProvider = o,
            s
        }
        return g(i, [{
            key: "_draw",
            value: function() {
                this._drawCover();
                var t = this._chartData.crosshair();
                if (t.kLineData) {
                    var e = this._additionalDataProvider.technicalIndicators()
                      , i = this._chartData.styleOptions().crosshair;
                    t.paneId === this._additionalDataProvider.id() && this._drawCrosshairLine(i, "horizontal", t.y, 0, this._width, Bt),
                    t.paneId && this._drawCrosshairLine(i, "vertical", t.realX, 0, this._height, Vt),
                    this._drawTooltip(t, e)
                }
            }
        }, {
            key: "_drawCover",
            value: function() {}
        }, {
            key: "_drawTooltip",
            value: function(t, e) {
                var i = this._chartData.styleOptions().technicalIndicator;
                this._drawBatchTechnicalIndicatorToolTip(t, e, i, 0, this._shouldDrawTooltip(t, i.tooltip))
            }
        }, {
            key: "_drawCrosshairLine",
            value: function(t, e, i, a, n, r) {
                var o = t[e]
                  , s = o.line;
                t.show && o.show && s.show && (this._ctx.save(),
                this._ctx.lineWidth = s.size,
                this._ctx.strokeStyle = s.color,
                s.style === H && this._ctx.setLineDash(s.dashValue),
                r(this._ctx, i, a, n),
                this._ctx.restore())
            }
        }, {
            key: "_drawBatchTechnicalIndicatorToolTip",
            value: function(t, e, i) {
                var a = this
                  , n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0
                  , r = arguments.length > 4 ? arguments[4] : void 0;
                if (r) {
                    var o = i.tooltip
                      , s = n;
                    e.forEach((function(e) {
                        a._drawTechnicalIndicatorTooltip(t, e, i, s),
                        s += o.text.marginTop + o.text.size + o.text.marginBottom
                    }
                    ))
                }
            }
        }, {
            key: "_drawTechnicalIndicatorTooltip",
            value: function(t, e, i) {
                var a = this
                  , n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0
                  , r = i.tooltip
                  , o = e.styles || i
                  , s = e.result
                  , c = s[t.dataIndex]
                  , h = Pt(c, e)
                  , l = o.line.colors
                  , u = this._chartData.dataList()
                  , d = {
                    preData: {
                        kLineData: u[t.dataIndex - 1],
                        technicalIndicatorData: s[t.dataIndex - 1]
                    },
                    currentData: {
                        kLineData: u[t.dataIndex],
                        technicalIndicatorData: c
                    },
                    nextData: {
                        kLineData: u[t.dataIndex + 1],
                        technicalIndicatorData: s[t.dataIndex + 1]
                    }
                }
                  , _ = e.plots
                  , v = r.text
                  , f = h.values
                  , p = v.marginLeft
                  , y = v.marginRight
                  , m = 0
                  , x = v.marginTop + n
                  , g = v.size
                  , k = v.color
                  , D = l.length;
                if (this._ctx.textBaseline = "top",
                this._ctx.font = fe(g, v.weight, v.family),
                r.showName) {
                    var w = h.name
                      , b = ve(this._ctx, w);
                    ke(this._ctx, k, m += p, x, w),
                    m += b,
                    r.showParams || (m += y)
                }
                if (r.showParams) {
                    var M = h.calcParamText
                      , P = ve(this._ctx, M);
                    r.showName || (m += p),
                    ke(this._ctx, k, m, x, M),
                    m += P + y
                }
                var E, C = 0;
                _.forEach((function(t, e) {
                    switch (t.type) {
                    case Dt:
                        E = t.color && t.color(d, o) || o.circle.noChangeColor;
                        break;
                    case kt:
                        E = t.color && t.color(d, o) || o.bar.noChangeColor;
                        break;
                    case gt:
                        E = l[C % D] || k,
                        C++
                    }
                    var i = f[e].title;
                    if (F(i)) {
                        m += p;
                        var n = "".concat(i).concat(f[e].value || r.defaultValue)
                          , s = ve(a._ctx, n);
                        ke(a._ctx, E, m, x, n),
                        m += s + y
                    }
                }
                ))
            }
        }, {
            key: "_shouldDrawTooltip",
            value: function(t, e) {
                var i = e.showRule;
                return i === J || i === Q && !!t.paneId
            }
        }]),
        i
    }(xe)
      , we = function(t) {
        D(i, t);
        var e = P(i);
        function i() {
            return m(this, i),
            e.apply(this, arguments)
        }
        return g(i, [{
            key: "_createMainView",
            value: function(t, e) {
                return new ge(t,e.chartData,e.xAxis,e.yAxis,e.additionalDataProvider)
            }
        }, {
            key: "_createOverlayView",
            value: function(t, e) {
                return new De(t,e.chartData,e.xAxis,e.yAxis,e.additionalDataProvider)
            }
        }]),
        i
    }(ye);
    function be(t, e, i, a, n, r, o, s, c) {
        Pe(t, e, n, r, o, s, c),
        Me(t, i, a, n, r, o, s, c)
    }
    function Me(t, e, i, a, n, r, o, s) {
        t.lineWidth = i,
        t.strokeStyle = e,
        Ee(t, a, n, r, o, s),
        t.stroke()
    }
    function Pe(t, e, i, a, n, r, o) {
        t.fillStyle = e,
        Ee(t, i, a, n, r, o),
        t.fill()
    }
    function Ee(t, e, i, a, n, r) {
        t.beginPath(),
        t.moveTo(e + r, i),
        t.arcTo(e + a, i, e + a, i + n, r),
        t.arcTo(e + a, i + n, e, i + n, r),
        t.arcTo(e, i + n, e, i, r),
        t.arcTo(e, i, e + a, i, r),
        t.closePath()
    }
    var Ce = function(t) {
        D(i, t);
        var e = P(i);
        function i(t, a, n, r) {
            var o;
            return m(this, i),
            (o = e.call(this, t, a))._yAxis = n,
            o._additionalDataProvider = r,
            o
        }
        return g(i, [{
            key: "_draw",
            value: function() {
                var t = this._chartData.styleOptions().yAxis;
                t.show && (this._drawAxisLine(t),
                this._drawTickLines(t),
                this._drawTickLabels(t),
                this._drawTechnicalIndicatorLastValue(t),
                this._drawLastPriceLabel(t))
            }
        }, {
            key: "_drawAxisLine",
            value: function(t) {
                var e, i = t.axisLine;
                i.show && (this._ctx.strokeStyle = i.color,
                this._ctx.lineWidth = i.size,
                e = this._yAxis.isFromYAxisZero() ? 0 : this._width - 1,
                Vt(this._ctx, e, 0, this._height))
            }
        }, {
            key: "_drawTickLines",
            value: function(t) {
                var e = this
                  , i = t.tickLine;
                if (i.show) {
                    this._ctx.lineWidth = i.size,
                    this._ctx.strokeStyle = i.color;
                    var a, n, r = i.length;
                    this._yAxis.isFromYAxisZero() ? (a = 0,
                    t.axisLine.show && (a += t.axisLine.size),
                    n = a + r) : (a = this._width,
                    t.axisLine.show && (a -= t.axisLine.size),
                    n = a - r),
                    this._yAxis.ticks().forEach((function(t) {
                        Bt(e._ctx, t.y, a, n)
                    }
                    ))
                }
            }
        }, {
            key: "_drawTickLabels",
            value: function(t) {
                var e = this
                  , i = t.tickText;
                if (i.show) {
                    var a, n = t.tickLine, r = n.show, o = n.length;
                    this._yAxis.isFromYAxisZero() ? (a = i.paddingLeft,
                    t.axisLine.show && (a += t.axisLine.size),
                    r && (a += o),
                    this._ctx.textAlign = "left") : (a = this._width - i.paddingRight,
                    t.axisLine.show && (a -= t.axisLine.size),
                    r && (a -= o),
                    this._ctx.textAlign = "right"),
                    this._ctx.textBaseline = "middle",
                    this._ctx.font = fe(i.size, i.weight, i.family),
                    this._ctx.fillStyle = i.color,
                    this._yAxis.ticks().forEach((function(t) {
                        e._ctx.fillText(t.v, a, t.y)
                    }
                    )),
                    this._ctx.textAlign = "left"
                }
            }
        }, {
            key: "_drawTechnicalIndicatorLastValue",
            value: function(t) {
                var e = this
                  , i = this._chartData.styleOptions().technicalIndicator
                  , a = i.lastValueMark
                  , n = this._additionalDataProvider.technicalIndicators();
                if (a.show && a.text.show) {
                    var r = this._chartData.dataList();
                    n.forEach((function(n) {
                        var o = n.result || []
                          , s = o.length
                          , c = o[s - 1] || {}
                          , h = {
                            preData: {
                                kLineData: r[s - 2],
                                technicalIndicatorData: o[s - 2]
                            },
                            currentData: {
                                kLineData: r[s - 1],
                                technicalIndicatorData: c
                            },
                            nextData: {
                                kLineData: null,
                                technicalIndicatorData: null
                            }
                        }
                          , l = n.precision
                          , u = n.styles || i
                          , d = u.line.colors || []
                          , _ = d.length
                          , v = 0;
                        n.plots.forEach((function(i) {
                            var r, o = c[i.key];
                            switch (i.type) {
                            case Dt:
                                r = i.color && i.color(h, u) || u.circle.noChangeColor;
                                break;
                            case kt:
                                r = i.color && i.color(h, u) || u.bar.noChangeColor;
                                break;
                            case gt:
                                r = d[v % _],
                                v++
                            }
                            F(o) && e._drawMarkLabel(t, o, l, n.shouldFormatBigNumber, p(p({}, a.text), {}, {
                                backgroundColor: r
                            }))
                        }
                        ))
                    }
                    ))
                }
            }
        }, {
            key: "_drawLastPriceLabel",
            value: function(t) {
                if (this._yAxis.isCandleYAxis()) {
                    var e = this._chartData.styleOptions().candle.priceMark
                      , i = e.last;
                    if (e.show && i.show && i.text.show) {
                        var a = this._chartData.dataList()
                          , n = a[a.length - 1];
                        if (n) {
                            var r, o = n.close, s = n.open;
                            r = o > s ? i.upColor : s > o ? i.downColor : i.noChangeColor,
                            this._drawMarkLabel(t, o, this._chartData.pricePrecision(), !1, p(p({}, i.text), {}, {
                                backgroundColor: r
                            }))
                        }
                    }
                }
            }
        }, {
            key: "_drawMarkLabel",
            value: function(t, e, i, a, n) {
                var r, o = n.size, s = n.weight, c = n.family, h = n.color, l = n.backgroundColor, u = n.borderRadius, d = n.paddingLeft, _ = n.paddingTop, v = n.paddingRight, f = n.paddingBottom, p = this._yAxis.convertToNicePixel(e);
                if (this._yAxis.yAxisType() === N) {
                    var y = ((this._chartData.visibleDataList()[0] || {}).data || {}).close;
                    r = "".concat(((e - y) / y * 100).toFixed(2), "%")
                } else
                    r = _t(e, i),
                    a && (r = vt(r));
                this._ctx.font = fe(o, s, c);
                var m, x = ve(this._ctx, r) + d + v, g = _ + o + f;
                m = this._yAxis.isFromYAxisZero() ? 0 : this._width - x,
                Pe(this._ctx, l, m, p - _ - o / 2, x, g, u),
                this._ctx.textBaseline = "middle",
                ke(this._ctx, h, m + d, p, r)
            }
        }]),
        i
    }(xe)
      , Ae = function(t) {
        D(i, t);
        var e = P(i);
        function i(t, a, n, r) {
            var o;
            return m(this, i),
            (o = e.call(this, t, a))._yAxis = n,
            o._additionalDataProvider = r,
            o
        }
        return g(i, [{
            key: "_draw",
            value: function() {
                var t = this;
                (this._ctx.textBaseline = "middle",
                this._yAxis.isCandleYAxis()) && this._chartData.tags().forEach((function(e) {
                    e.drawText(t._ctx)
                }
                ));
                this._drawCrossHairLabel()
            }
        }, {
            key: "_drawCrossHairLabel",
            value: function() {
                var t = this._chartData.crosshair();
                if (t.paneId === this._additionalDataProvider.id() && 0 !== this._chartData.dataList().length) {
                    var e = this._chartData.styleOptions().crosshair
                      , i = e.horizontal
                      , a = i.text;
                    if (e.show && i.show && a.show) {
                        var n, r = this._yAxis.convertFromPixel(t.y);
                        if (this._yAxis.yAxisType() === N) {
                            var o = (this._chartData.visibleDataList()[0] || {}).data || {};
                            n = "".concat(((r - o.close) / o.close * 100).toFixed(2), "%")
                        } else {
                            var s = this._additionalDataProvider.technicalIndicators()
                              , c = 0
                              , h = !1;
                            this._yAxis.isCandleYAxis() ? c = this._chartData.pricePrecision() : s.forEach((function(t) {
                                c = Math.max(t.precision, c),
                                h || (h = t.shouldFormatBigNumber)
                            }
                            )),
                            n = _t(r, c),
                            h && (n = vt(n))
                        }
                        var l = a.size;
                        this._ctx.font = fe(l, a.weight, a.family);
                        var u, d = ve(this._ctx, n), _ = a.paddingLeft, v = a.paddingTop, f = a.borderSize, p = d + 2 * f + _ + a.paddingRight, y = l + 2 * f + v + a.paddingBottom;
                        u = this._yAxis.isFromYAxisZero() ? 0 : this._width - p,
                        be(this._ctx, a.backgroundColor, a.borderColor, f, u, t.y - f - v - l / 2, p, y, a.borderRadius),
                        ke(this._ctx, a.color, u + f + _, t.y, n)
                    }
                }
            }
        }]),
        i
    }(xe)
      , Te = function(t) {
        D(i, t);
        var e = P(i);
        function i() {
            return m(this, i),
            e.apply(this, arguments)
        }
        return g(i, [{
            key: "_createMainView",
            value: function(t, e) {
                return new Ce(t,e.chartData,e.yAxis,e.additionalDataProvider)
            }
        }, {
            key: "_createOverlayView",
            value: function(t, e) {
                return new Ae(t,e.chartData,e.yAxis,e.additionalDataProvider)
            }
        }]),
        i
    }(ye)
      , Se = function() {
        function t(e) {
            m(this, t),
            this._chartData = e,
            this._width = 0,
            this._height = 0,
            this._cacheMinValue = 0,
            this._cacheMaxValue = 0,
            this._minValue = 0,
            this._maxValue = 0,
            this._range = 0,
            this._ticks = [],
            this._initMeasureCanvas()
        }
        return g(t, [{
            key: "_initMeasureCanvas",
            value: function() {
                var t = document.createElement("canvas")
                  , e = _e(t);
                this._measureCtx = t.getContext("2d"),
                this._measureCtx.scale(e, e)
            }
        }, {
            key: "min",
            value: function() {
                return this._minValue
            }
        }, {
            key: "max",
            value: function() {
                return this._maxValue
            }
        }, {
            key: "width",
            value: function() {
                return this._width
            }
        }, {
            key: "height",
            value: function() {
                return this._height
            }
        }, {
            key: "setWidth",
            value: function(t) {
                this._width = t
            }
        }, {
            key: "setHeight",
            value: function(t) {
                this._height = t
            }
        }, {
            key: "ticks",
            value: function() {
                return this._ticks
            }
        }, {
            key: "computeAxis",
            value: function(t) {
                var e = this._optimalMinMax(this._computeMinMax());
                return this._minValue = e.min,
                this._maxValue = e.max,
                this._range = e.range,
                !(this._cacheMinValue === e.min && this._cacheMaxValue === e.max && !t) && (this._cacheMinValue = e.min,
                this._cacheMaxValue = e.max,
                this._ticks = this._optimalTicks(this._computeTicks()),
                !0)
            }
        }, {
            key: "_computeMinMax",
            value: function() {}
        }, {
            key: "_optimalMinMax",
            value: function(t) {}
        }, {
            key: "_computeTicks",
            value: function() {
                var t = [];
                if (this._range >= 0) {
                    var e = this._computeInterval(this._range)
                      , i = e.interval
                      , a = e.precision
                      , n = ft(Math.ceil(this._minValue / i) * i, a)
                      , r = ft(Math.floor(this._maxValue / i) * i, a)
                      , o = 0
                      , s = n;
                    if (0 !== i)
                        for (; r >= s; )
                            t[o] = {
                                v: s.toFixed(a)
                            },
                            ++o,
                            s += i
                }
                return t
            }
        }, {
            key: "_optimalTicks",
            value: function(t) {}
        }, {
            key: "_computeInterval",
            value: function(t) {
                var e, i, a, n, r = (i = Math.floor(pt(e = t / 8)),
                a = yt(i),
                e = (1.5 > (n = e / a) ? 1 : 2.5 > n ? 2 : 3.5 > n ? 3 : 4.5 > n ? 4 : 5.5 > n ? 5 : 6.5 > n ? 6 : 8) * a,
                -20 > i ? e : +e.toFixed(0 > i ? -i : 0));
                return {
                    interval: r,
                    precision: function(t) {
                        var e = "" + t
                          , i = e.indexOf("e");
                        if (i > 0) {
                            var a = +e.slice(i + 1);
                            return 0 > a ? -a : 0
                        }
                        var n = e.indexOf(".");
                        return 0 > n ? 0 : e.length - 1 - n
                    }(r)
                }
            }
        }]),
        t
    }()
      , Ie = function(t) {
        D(i, t);
        var e = P(i);
        function i(t, a, n) {
            var r;
            return m(this, i),
            (r = e.call(this, t))._realRange = 0,
            r._isCandleYAxis = a,
            r._additionalDataProvider = n,
            r
        }
        return g(i, [{
            key: "_computeMinMax",
            value: function() {
                var t = this
                  , e = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]
                  , i = []
                  , a = !1
                  , n = Number.MAX_SAFE_INTEGER
                  , r = Number.MIN_SAFE_INTEGER
                  , o = Number.MAX_SAFE_INTEGER;
                this._additionalDataProvider.technicalIndicators().forEach((function(t) {
                    a || (a = t.shouldOhlc),
                    o = Math.min(o, t.precision),
                    R(t.minValue) && (n = Math.min(n, t.minValue)),
                    R(t.maxValue) && (r = Math.max(r, t.maxValue)),
                    i.push({
                        plots: t.plots,
                        result: t.result
                    })
                }
                ));
                var s = 4;
                if (this._isCandleYAxis) {
                    var c = this._chartData.pricePrecision();
                    s = o !== Number.MAX_SAFE_INTEGER ? Math.min(o, c) : c
                } else
                    o !== Number.MAX_SAFE_INTEGER && (s = o);
                var h = this._chartData.visibleDataList()
                  , l = this._chartData.styleOptions().candle
                  , u = l.type === $
                  , d = l.area.value
                  , _ = this._isCandleYAxis && !u || !this._isCandleYAxis && a;
                return h.forEach((function(a) {
                    var n = a.index
                      , r = a.data;
                    _ && (e[0] = Math.min(e[0], r.low),
                    e[1] = Math.max(e[1], r.high)),
                    t._isCandleYAxis && u && (e[0] = Math.min(e[0], r[d]),
                    e[1] = Math.max(e[1], r[d])),
                    i.forEach((function(t) {
                        var i = t.result[n] || {};
                        t.plots.forEach((function(t) {
                            var a = i[t.key];
                            F(a) && (e[0] = Math.min(e[0], a),
                            e[1] = Math.max(e[1], a))
                        }
                        ))
                    }
                    ))
                }
                )),
                e[0] !== Number.MAX_SAFE_INTEGER && e[1] !== Number.MIN_SAFE_INTEGER ? (e[0] = Math.min(n, e[0]),
                e[1] = Math.max(r, e[1])) : (e[0] = 0,
                e[1] = 10),
                {
                    min: e[0],
                    max: e[1],
                    precision: s,
                    specifyMin: n,
                    specifyMax: r
                }
            }
        }, {
            key: "_optimalMinMax",
            value: function(t) {
                var e, i, a, n, r = t.precision, o = t.specifyMin, s = t.specifyMax, c = t.min, h = t.max, l = this.yAxisType();
                switch (l) {
                case N:
                    var u = (this._chartData.visibleDataList()[0] || {}).data || {};
                    R(u.close) && (c = (c - u.close) / u.close * 100,
                    h = (h - u.close) / u.close * 100),
                    e = .01;
                    break;
                case X:
                    c = pt(c),
                    h = pt(h),
                    e = .05 * yt(-r);
                    break;
                default:
                    e = yt(-r)
                }
                if (c === h || e > Math.abs(c - h)) {
                    var d = o === c
                      , _ = s === h;
                    c = d ? c : _ ? c - 8 * e : c - 4 * e,
                    h = _ ? h : d ? h + 8 * e : h + 4 * e
                }
                a = (i = this._isCandleYAxis ? this._chartData.styleOptions().candle.margin : this._chartData.styleOptions().technicalIndicator.margin).top > 1 ? i.top / this._height : R(i.top) ? i.top : .2,
                n = i.bottom > 1 ? i.bottom / this._height : R(i.bottom) ? i.bottom : .1;
                var v = Math.abs(h - c);
                return v = Math.abs((h += v * a) - (c -= v * n)),
                this._realRange = l === X ? Math.abs(yt(h) - yt(c)) : v,
                {
                    min: c,
                    max: h,
                    range: v
                }
            }
        }, {
            key: "_optimalTicks",
            value: function(t) {
                var e = this
                  , i = []
                  , a = this.yAxisType()
                  , n = this._additionalDataProvider.technicalIndicators()
                  , r = 0
                  , o = !1;
                this._isCandleYAxis ? r = this._chartData.pricePrecision() : n.forEach((function(t) {
                    r = Math.max(r, t.precision),
                    o || (o = t.shouldFormatBigNumber)
                }
                ));
                var s, c, h = this._chartData.styleOptions().xAxis.tickText.size;
                return a === X && (s = this._computeInterval(this._realRange)),
                t.forEach((function(t) {
                    var n, l = t.v, u = e._innerConvertToPixel(+l);
                    switch (a) {
                    case N:
                        n = "".concat(_t(l, 2), "%");
                        break;
                    case X:
                        n = ft(yt(l), s.precision),
                        u = e._innerConvertToPixel(pt(n)),
                        n = _t(n, r);
                        break;
                    default:
                        n = _t(l, r),
                        o && (n = vt(n))
                    }
                    u > h && e._height - h > u && (c && c - u > 2 * h || !c) && (i.push({
                        v: n,
                        y: u
                    }),
                    c = u)
                }
                )),
                i
            }
        }, {
            key: "_innerConvertToPixel",
            value: function(t) {
                return Math.round((1 - (t - this._minValue) / this._range) * this._height)
            }
        }, {
            key: "isCandleYAxis",
            value: function() {
                return this._isCandleYAxis
            }
        }, {
            key: "yAxisType",
            value: function() {
                return this._isCandleYAxis ? this._chartData.styleOptions().yAxis.type : G
            }
        }, {
            key: "isFromYAxisZero",
            value: function() {
                var t = this._chartData.styleOptions().yAxis;
                return t.position === Y && t.inside || t.position === W && !t.inside
            }
        }, {
            key: "getSelfWidth",
            value: function() {
                var t = this
                  , e = this._chartData.styleOptions()
                  , i = e.yAxis
                  , a = i.width;
                if (R(a))
                    return a;
                var n = 0;
                if (i.show && (i.axisLine.show && (n += i.axisLine.size),
                i.tickLine.show && (n += i.tickLine.length),
                i.tickText.show)) {
                    var r = 0;
                    this._measureCtx.font = fe(i.tickText.size, i.tickText.weight, i.tickText.family),
                    this._ticks.forEach((function(e) {
                        r = Math.max(r, ve(t._measureCtx, e.v))
                    }
                    )),
                    n += i.tickText.paddingLeft + i.tickText.paddingRight + r
                }
                var o = e.crosshair
                  , s = 0;
                if (o.show && o.horizontal.show && o.horizontal.text.show) {
                    var c = this._additionalDataProvider.technicalIndicators()
                      , h = 0
                      , l = !1;
                    c.forEach((function(t) {
                        h = Math.max(t.precision, h),
                        l || (l = t.shouldFormatBigNumber)
                    }
                    )),
                    this._measureCtx.font = fe(o.horizontal.text.size, o.horizontal.text.weight, o.horizontal.text.family);
                    var u = 2;
                    if (this.yAxisType() !== N)
                        if (this._isCandleYAxis) {
                            var d = this._chartData.pricePrecision()
                              , _ = e.technicalIndicator.lastValueMark;
                            u = _.show && _.text.show ? Math.max(h, d) : d
                        } else
                            u = h;
                    var v = _t(this._maxValue, u);
                    l && (v = vt(v)),
                    s += o.horizontal.text.paddingLeft + o.horizontal.text.paddingRight + 2 * o.horizontal.text.borderSize + ve(this._measureCtx, v)
                }
                return Math.max(n, s)
            }
        }, {
            key: "convertFromPixel",
            value: function(t) {
                var e = (1 - t / this._height) * this._range + this._minValue;
                switch (this.yAxisType()) {
                case N:
                    var i = (this._chartData.visibleDataList()[0] || {}).data || {};
                    if (R(i.close))
                        return i.close * e / 100 + i.close;
                    break;
                case X:
                    return yt(e);
                default:
                    return e
                }
            }
        }, {
            key: "convertToPixel",
            value: function(t) {
                var e;
                switch (this.yAxisType()) {
                case N:
                    var i = (this._chartData.visibleDataList()[0] || {}).data || {};
                    R(i.close) && (e = (t - i.close) / i.close * 100);
                    break;
                case X:
                    e = pt(t);
                    break;
                default:
                    e = t
                }
                return this._innerConvertToPixel(e)
            }
        }, {
            key: "convertToNicePixel",
            value: function(t) {
                var e = this.convertToPixel(t);
                return Math.round(Math.max(.05 * this._height, Math.min(e, .98 * this._height)))
            }
        }]),
        i
    }(Se)
      , Le = function(t) {
        D(i, t);
        var e = P(i);
        function i(t) {
            var a;
            return m(this, i),
            (a = e.call(this, t))._techs = new Map,
            "height"in t && a.setHeight(t.height),
            a.setTechnicalIndicator(a._chartData.getTechnicalIndicatorInstance(t.name)),
            a
        }
        return g(i, [{
            key: "_initBefore",
            value: function(t) {
                this._id = t.id,
                this._yAxis = this._createYAxis(t)
            }
        }, {
            key: "_createYAxis",
            value: function(t) {
                return new Ie(t.chartData,!1,{
                    technicalIndicators: this.technicalIndicators.bind(this)
                })
            }
        }, {
            key: "_createMainWidget",
            value: function(t, e) {
                return new we({
                    container: t,
                    chartData: e.chartData,
                    xAxis: e.xAxis,
                    yAxis: this._yAxis,
                    additionalDataProvider: {
                        technicalIndicators: this.technicalIndicators.bind(this),
                        id: this.id.bind(this)
                    }
                })
            }
        }, {
            key: "_createYAxisWidget",
            value: function(t, e) {
                return new Te({
                    container: t,
                    chartData: e.chartData,
                    yAxis: this._yAxis,
                    additionalDataProvider: {
                        technicalIndicators: this.technicalIndicators.bind(this),
                        id: this.id.bind(this)
                    }
                })
            }
        }, {
            key: "setHeight",
            value: function(t) {
                E(w(i.prototype), "setHeight", this).call(this, t),
                this._yAxis.setHeight(t)
            }
        }, {
            key: "setWidth",
            value: function(t, e) {
                E(w(i.prototype), "setWidth", this).call(this, t, e),
                this._yAxis.setWidth(e)
            }
        }, {
            key: "id",
            value: function() {
                return this._id
            }
        }, {
            key: "yAxis",
            value: function() {
                return this._yAxis
            }
        }, {
            key: "technicalIndicators",
            value: function() {
                return this._techs
            }
        }, {
            key: "isEmptyTechnicalIndicator",
            value: function() {
                return 0 === this._techs.size
            }
        }, {
            key: "removeTechnicalIndicator",
            value: function(t) {
                return t ? !!this._techs.has(t) && (this._techs.delete(t),
                !0) : (this._techs.clear(),
                !0)
            }
        }, {
            key: "setTechnicalIndicator",
            value: function(t, e) {
                if (t) {
                    if (this._techs.has(t.name))
                        return !1;
                    var i = Object.create(t);
                    return e ? this._techs.set(i.name, i) : this._techs = new Map([[i.name, i]]),
                    this.calcTechnicalIndicator(i),
                    !0
                }
                return !1
            }
        }, {
            key: "calcTechnicalIndicator",
            value: function(t) {
                t.result = t.calcTechnicalIndicator(this._chartData.dataList(), t.calcParams, t.plots) || []
            }
        }, {
            key: "calcAllTechnicalIndicator",
            value: function() {
                var t = this;
                return this._techs.forEach((function(e) {
                    t.calcTechnicalIndicator(e)
                }
                )),
                this._yAxis.computeAxis()
            }
        }]),
        i
    }(pe)
      , Oe = function(t) {
        D(i, t);
        var e = P(i);
        function i() {
            return m(this, i),
            e.apply(this, arguments)
        }
        return g(i, [{
            key: "_draw",
            value: function() {
                this._drawGrid();
                var t = this._chartData.styleOptions().candle;
                t.type === $ ? this._drawArea(t) : (this._drawCandle(t),
                this._drawLowHighPrice(t.priceMark, "high", "high", Number.MIN_SAFE_INTEGER, [-2, -5], (function(t, e) {
                    if (t > e)
                        return t
                }
                )),
                this._drawLowHighPrice(t.priceMark, "low", "low", Number.MAX_SAFE_INTEGER, [2, 5], (function(t, e) {
                    if (e > t)
                        return t
                }
                ))),
                this._drawTechnicalIndicators(),
                this._drawLastPriceLine(t.priceMark)
            }
        }, {
            key: "_drawArea",
            value: function(t) {
                var e = this
                  , i = []
                  , a = []
                  , n = Number.MAX_SAFE_INTEGER
                  , r = t.area;
                this._drawGraphics((function(t, o, s, c, h, l) {
                    var u = s[r.value];
                    if (R(u)) {
                        var d = e._yAxis.convertToPixel(u);
                        if (0 === l) {
                            var _ = t - c;
                            a.push({
                                x: _,
                                y: e._height
                            }),
                            a.push({
                                x: _,
                                y: d
                            }),
                            i.push({
                                x: _,
                                y: d
                            })
                        }
                        i.push({
                            x: t,
                            y: d
                        }),
                        a.push({
                            x: t,
                            y: d
                        }),
                        n = Math.min(n, d)
                    }
                }
                ), (function() {
                    var t = a.length;
                    if (t > 0) {
                        var o = a[t - 1]
                          , s = e._chartData.barSpace() / 2
                          , c = o.x + s;
                        i.push({
                            x: c,
                            y: o.y
                        }),
                        a.push({
                            x: c,
                            y: o.y
                        }),
                        a.push({
                            x: c,
                            y: e._height
                        })
                    }
                    if (i.length > 0 && (e._ctx.lineWidth = r.lineSize,
                    e._ctx.strokeStyle = r.lineColor,
                    Ht(e._ctx, (function() {
                        e._ctx.beginPath(),
                        e._ctx.moveTo(i[0].x, i[0].y);
                        for (var t = 1; i.length > t; t++)
                            e._ctx.lineTo(i[t].x, i[t].y);
                        e._ctx.stroke(),
                        e._ctx.closePath()
                    }
                    ))),
                    a.length > 0) {
                        var h = r.fillColor;
                        if (I(h)) {
                            var l = e._ctx.createLinearGradient(0, e._height, 0, n);
                            try {
                                h.forEach((function(t) {
                                    l.addColorStop(t.offset, t.color)
                                }
                                ))
                            } catch (t) {}
                            e._ctx.fillStyle = l
                        } else
                            e._ctx.fillStyle = h;
                        e._ctx.beginPath(),
                        e._ctx.moveTo(a[0].x, a[0].y);
                        for (var u = 1; a.length > u; u++)
                            e._ctx.lineTo(a[u].x, a[u].y);
                        e._ctx.closePath(),
                        e._ctx.fill()
                    }
                }
                ))
            }
        }, {
            key: "_drawCandle",
            value: function(t) {
                var e = this;
                this._drawGraphics((function(i, a, n, r, o) {
                    e._drawCandleBar(i, r, o, a, n, t.bar, t.type)
                }
                ))
            }
        }, {
            key: "_drawLowHighPrice",
            value: function(t, e, i, a, n, r) {
                var o = this
                  , s = t[e];
                if (t.show && s.show) {
                    var c = this._chartData.visibleDataList()
                      , h = a
                      , l = -1;
                    c.forEach((function(t) {
                        var e = t.index
                          , n = r(ut(t.data, i, a), h);
                        n && (h = n,
                        l = e)
                    }
                    ));
                    var u = this._chartData.pricePrecision()
                      , d = this._yAxis.convertToPixel(h)
                      , _ = this._xAxis.convertToPixel(l)
                      , v = d + n[0];
                    this._ctx.textAlign = "left",
                    this._ctx.lineWidth = 1,
                    this._ctx.strokeStyle = s.color,
                    this._ctx.fillStyle = s.color,
                    Ht(this._ctx, (function() {
                        o._ctx.beginPath(),
                        o._ctx.moveTo(_ - 2, v + n[0]),
                        o._ctx.lineTo(_, v),
                        o._ctx.lineTo(_ + 2, v + n[0]),
                        o._ctx.stroke(),
                        o._ctx.closePath()
                    }
                    ));
                    var f = v + n[1];
                    Ht(this._ctx, (function() {
                        o._ctx.beginPath(),
                        o._ctx.moveTo(_, v),
                        o._ctx.lineTo(_, f),
                        o._ctx.lineTo(_ + 5, f),
                        o._ctx.stroke(),
                        o._ctx.closePath()
                    }
                    )),
                    this._ctx.font = fe(s.textSize, s.textWeight, s.textFamily);
                    var p = _t(h, u);
                    this._ctx.textBaseline = "middle",
                    this._ctx.fillText(p, _ + 5 + s.textMargin, f)
                }
            }
        }, {
            key: "_drawLastPriceLine",
            value: function(t) {
                var e = t.last;
                if (t.show && e.show && e.line.show) {
                    var i = this._chartData.dataList()
                      , a = i[i.length - 1];
                    if (a) {
                        var n, r = a.close, o = a.open, s = this._yAxis.convertToNicePixel(r);
                        n = r > o ? e.upColor : o > r ? e.downColor : e.noChangeColor,
                        this._ctx.save(),
                        this._ctx.strokeStyle = n,
                        this._ctx.lineWidth = e.line.size,
                        e.line.style === H && this._ctx.setLineDash(e.line.dashValue),
                        Bt(this._ctx, s, 0, this._width),
                        this._ctx.restore()
                    }
                }
            }
        }]),
        i
    }(ge)
      , Re = function(t) {
        D(i, t);
        var e = P(i);
        function i() {
            return m(this, i),
            e.apply(this, arguments)
        }
        return g(i, [{
            key: "_drawCover",
            value: function() {
                var t = this;
                this._ctx.textBaseline = "alphabetic",
                this._chartData.tags().forEach((function(e) {
                    e.drawMarkLine(t._ctx)
                }
                )),
                this._chartData.graphicMarks().forEach((function(e) {
                    e.draw(t._ctx)
                }
                )),
                this._chartData.visibleAnnotations().forEach((function(e) {
                    e.draw(t._ctx)
                }
                ))
            }
        }, {
            key: "_drawTooltip",
            value: function(t, e) {
                var i = this._chartData.styleOptions()
                  , a = i.candle
                  , n = a.tooltip
                  , r = i.technicalIndicator
                  , o = r.tooltip
                  , s = this._shouldDrawTooltip(t, n)
                  , c = this._shouldDrawTooltip(t, o);
                n.showType === tt && o.showType === tt ? this._drawCandleTooltipWithRect(t, e, a, s, r, c) : n.showType === et ? (this._drawCandleTooltipWithStandard(t.kLineData, a, s),
                o.showType === et ? this._drawBatchTechnicalIndicatorToolTip(t, e, r, s ? n.text.size + n.text.marginTop : 0, c) : this._drawCandleTooltipWithRect(t, e, a, !1, r, c)) : (this._drawCandleTooltipWithRect(t, e, a, s, r, !1),
                this._drawBatchTechnicalIndicatorToolTip(t, e, r, 0, c))
            }
        }, {
            key: "_drawCandleTooltipWithStandard",
            value: function(t, e, i) {
                var a = this;
                if (i) {
                    var n = this._getCandleTooltipData(t, e)
                      , r = e.tooltip
                      , o = r.text.marginLeft
                      , s = r.text.marginRight
                      , c = r.text.size
                      , h = r.text.color
                      , l = r.labels;
                    this._ctx.textBaseline = "top",
                    this._ctx.font = fe(c, r.text.weight, r.text.family);
                    var u = o
                      , d = r.text.marginTop;
                    l.forEach((function(t, e) {
                        var i = ve(a._ctx, t);
                        ke(a._ctx, h, u, d, t),
                        u += i;
                        var c, l, _ = n[e] || r.defaultValue;
                        O(_) ? (c = _.value || r.defaultValue,
                        l = _.color || h) : (l = h,
                        c = _);
                        var v = ve(a._ctx, c);
                        ke(a._ctx, l, u, d, c),
                        u += v + o + s
                    }
                    ))
                }
            }
        }, {
            key: "_drawCandleTooltipWithRect",
            value: function(t, e, i, a, n, r) {
                var o = this;
                if (a || r) {
                    var s = i.tooltip
                      , c = s.labels
                      , h = this._getCandleTooltipData(t.kLineData, i)
                      , l = s.text.marginLeft
                      , u = s.text.marginRight
                      , d = s.text.marginTop
                      , _ = s.text.marginBottom
                      , v = s.text.size
                      , f = s.text.color
                      , p = s.rect
                      , y = p.borderSize
                      , m = p.paddingLeft
                      , x = p.paddingRight
                      , g = p.paddingTop
                      , k = p.paddingBottom
                      , D = p.offsetLeft
                      , w = p.offsetRight
                      , b = 0
                      , M = 0
                      , P = 0;
                    this._ctx.save(),
                    this._ctx.textBaseline = "top",
                    a && (this._ctx.font = fe(v, s.text.weight, s.text.family),
                    c.forEach((function(t, e) {
                        var i, a = h[e];
                        i = O(a) ? a.value || s.defaultValue : a;
                        var n = "".concat(t).concat(i)
                          , r = ve(o._ctx, n) + l + u;
                        b = Math.max(b, r)
                    }
                    )),
                    P += (_ + d + v) * c.length);
                    var E = n.tooltip
                      , C = E.text.marginLeft
                      , A = E.text.marginRight
                      , T = E.text.marginTop
                      , S = E.text.marginBottom
                      , I = E.text.size
                      , L = []
                      , R = this._chartData.dataList();
                    if (e.forEach((function(e) {
                        var i = e.result;
                        L.push({
                            name: e.name,
                            tooltipData: Pt(i[t.dataIndex], e),
                            cbData: {
                                preData: {
                                    kLineData: R[t.dataIndex - 1],
                                    technicalIndicatorData: i[t.dataIndex - 1]
                                },
                                currentData: {
                                    kLineData: R[t.dataIndex],
                                    technicalIndicatorData: i[t.dataIndex]
                                },
                                nextData: {
                                    kLineData: R[t.dataIndex + 1],
                                    technicalIndicatorData: i[t.dataIndex + 1]
                                }
                            }
                        })
                    }
                    )),
                    r && (this._ctx.font = fe(I, E.text.weight, E.text.family),
                    L.forEach((function(t) {
                        t.tooltipData.values.forEach((function(t) {
                            var e = t.title
                              , i = t.value;
                            if (F(e)) {
                                var a = i || E.defaultValue
                                  , n = "".concat(e).concat(a)
                                  , r = ve(o._ctx, n) + C + A;
                                b = Math.max(b, r),
                                P += T + S + I
                            }
                        }
                        ))
                    }
                    ))),
                    0 !== (M += b) && 0 !== P) {
                        var z;
                        M += 2 * y + m + x;
                        var B = p.offsetTop
                          , V = p.borderRadius;
                        Pe(this._ctx, p.fillColor, z = this._width / 2 > t.realX ? this._width - w - M : D, B, M, P += 2 * y + g + k, V),
                        Me(this._ctx, p.borderColor, y, z, B, M, P, V);
                        var H = z + y + m + l
                          , Y = B + y + g;
                        if (a && (this._ctx.font = fe(v, s.text.weight, s.text.family),
                        c.forEach((function(t, e) {
                            Y += d,
                            o._ctx.textAlign = "left",
                            ke(o._ctx, f, H, Y, t);
                            var i, a, n = h[e];
                            O(n) ? (a = n.color || f,
                            i = n.value || s.defaultValue) : (a = f,
                            i = n || s.defaultValue),
                            o._ctx.textAlign = "right",
                            ke(o._ctx, a, z + M - y - u - x, Y, i),
                            Y += v + _
                        }
                        ))),
                        r) {
                            var W = this._chartData.styleOptions().technicalIndicator
                              , G = z + y + m + C;
                            this._ctx.font = fe(I, E.text.weight, E.text.family),
                            L.forEach((function(t) {
                                var i, a = t.tooltipData, n = t.cbData, r = e.get(t.name), s = r.styles || W, c = s.line.colors, h = c.length, l = 0;
                                r.plots.forEach((function(t, e) {
                                    switch (t.type) {
                                    case Dt:
                                        i = t.color && t.color(n, s) || s.circle.noChangeColor;
                                        break;
                                    case kt:
                                        i = t.color && t.color(n, s) || s.bar.noChangeColor;
                                        break;
                                    case gt:
                                        i = c[l % h] || s.text.color,
                                        l++
                                    }
                                    var r = a.values[e];
                                    F(r.title) && (Y += T,
                                    o._ctx.textAlign = "left",
                                    o._ctx.fillStyle = i,
                                    o._ctx.fillText("".concat(r.title), G, Y),
                                    o._ctx.textAlign = "right",
                                    o._ctx.fillText(r.value || E.defaultValue, z + M - y - A - x, Y),
                                    Y += I + S)
                                }
                                ))
                            }
                            ))
                        }
                        this._ctx.restore()
                    }
                }
            }
        }, {
            key: "_getCandleTooltipData",
            value: function(t, e) {
                var i = this
                  , a = e.tooltip.values
                  , n = [];
                if (a)
                    L(a) ? n = a(t, e) || [] : I(a) && (n = a);
                else {
                    var r = this._chartData.pricePrecision()
                      , o = this._chartData.volumePrecision();
                    (n = [ut(t, "timestamp"), ut(t, "open"), ut(t, "close"), ut(t, "high"), ut(t, "low"), ut(t, "volume")]).forEach((function(t, e) {
                        switch (e) {
                        case 0:
                            n[e] = dt(i._chartData.dateTimeFormat(), t, "YYYY-MM-DD hh:mm");
                            break;
                        case n.length - 1:
                            n[e] = vt(_t(t, o));
                            break;
                        default:
                            n[e] = _t(t, r)
                        }
                    }
                    ))
                }
                return n
            }
        }]),
        i
    }(De)
      , Fe = function(t) {
        D(i, t);
        var e = P(i);
        function i() {
            return m(this, i),
            e.apply(this, arguments)
        }
        return g(i, [{
            key: "_createMainView",
            value: function(t, e) {
                return new Oe(t,e.chartData,e.xAxis,e.yAxis,e.additionalDataProvider)
            }
        }, {
            key: "_createOverlayView",
            value: function(t, e) {
                return new Re(t,e.chartData,e.xAxis,e.yAxis,e.additionalDataProvider)
            }
        }]),
        i
    }(we)
      , ze = function(t) {
        D(i, t);
        var e = P(i);
        function i() {
            return m(this, i),
            e.apply(this, arguments)
        }
        return g(i, [{
            key: "_createYAxis",
            value: function(t) {
                return new Ie(t.chartData,!0,{
                    technicalIndicators: this.technicalIndicators.bind(this)
                })
            }
        }, {
            key: "_createMainWidget",
            value: function(t, e) {
                return new Fe({
                    container: t,
                    chartData: e.chartData,
                    xAxis: e.xAxis,
                    yAxis: this._yAxis,
                    additionalDataProvider: {
                        technicalIndicators: this.technicalIndicators.bind(this),
                        id: this.id.bind(this)
                    }
                })
            }
        }]),
        i
    }(Le)
      , Be = function(t) {
        D(i, t);
        var e = P(i);
        function i(t, a, n) {
            var r;
            return m(this, i),
            (r = e.call(this, t, a))._xAxis = n,
            r
        }
        return g(i, [{
            key: "_draw",
            value: function() {
                var t = this._chartData.styleOptions().xAxis;
                t.show && (this._drawAxisLine(t),
                this._drawTickLines(t),
                this._drawTickLabels(t))
            }
        }, {
            key: "_drawAxisLine",
            value: function(t) {
                var e = t.axisLine;
                e.show && (this._ctx.strokeStyle = e.color,
                this._ctx.lineWidth = e.size,
                Bt(this._ctx, 0, 0, this._width))
            }
        }, {
            key: "_drawTickLines",
            value: function(t) {
                var e = this
                  , i = t.tickLine;
                if (i.show) {
                    this._ctx.lineWidth = i.size,
                    this._ctx.strokeStyle = i.color;
                    var a = t.axisLine.show ? t.axisLine.size : 0
                      , n = a + i.length;
                    this._xAxis.ticks().forEach((function(t) {
                        Vt(e._ctx, t.x, a, n)
                    }
                    ))
                }
            }
        }, {
            key: "_drawTickLabels",
            value: function(t) {
                var e = t.tickText;
                if (e.show) {
                    var i = t.tickLine;
                    this._ctx.textBaseline = "top",
                    this._ctx.font = fe(e.size, e.weight, e.family),
                    this._ctx.textAlign = "center",
                    this._ctx.fillStyle = e.color;
                    var a = e.paddingTop;
                    t.axisLine.show && (a += t.axisLine.size),
                    i.show && (a += i.length);
                    for (var n = this._xAxis.ticks(), r = n.length, o = 0; r > o; o++)
                        this._ctx.fillText(n[o].v, n[o].x, a)
                }
            }
        }]),
        i
    }(xe)
      , Ve = function(t) {
        D(i, t);
        var e = P(i);
        function i(t, a, n) {
            var r;
            return m(this, i),
            (r = e.call(this, t, a))._xAxis = n,
            r
        }
        return g(i, [{
            key: "_draw",
            value: function() {
                this._drawCrosshairLabel()
            }
        }, {
            key: "_drawCrosshairLabel",
            value: function() {
                var t = this._chartData.crosshair();
                if (t.paneId) {
                    var e = this._chartData.styleOptions().crosshair
                      , i = e.vertical
                      , a = i.text;
                    if (e.show && i.show && a.show && t.dataIndex === t.realDataIndex) {
                        var n = t.realX
                          , r = t.kLineData.timestamp
                          , o = dt(this._chartData.dateTimeFormat(), r, "YYYY-MM-DD hh:mm")
                          , s = a.size;
                        this._ctx.font = fe(s, a.weight, a.family);
                        var c = ve(this._ctx, o)
                          , h = n - c / 2
                          , l = a.paddingLeft
                          , u = a.paddingRight
                          , d = a.paddingTop
                          , _ = a.borderSize;
                        l + _ > h ? h = l + _ : h > this._width - c - _ - u && (h = this._width - c - _ - u),
                        be(this._ctx, a.backgroundColor, a.borderColor, _, h - _ - l, 0, c + 2 * _ + u + l, s + 2 * _ + d + a.paddingBottom, a.borderRadius),
                        this._ctx.textBaseline = "top",
                        ke(this._ctx, a.color, h, _ + d, o)
                    }
                }
            }
        }]),
        i
    }(xe)
      , He = function(t) {
        D(i, t);
        var e = P(i);
        function i() {
            return m(this, i),
            e.apply(this, arguments)
        }
        return g(i, [{
            key: "_createMainView",
            value: function(t, e) {
                return new Be(t,e.chartData,e.xAxis)
            }
        }, {
            key: "_createOverlayView",
            value: function(t, e) {
                return new Ve(t,e.chartData,e.xAxis)
            }
        }]),
        i
    }(ye)
      , Ye = function(t) {
        D(i, t);
        var e = P(i);
        function i() {
            return m(this, i),
            e.apply(this, arguments)
        }
        return g(i, [{
            key: "_computeMinMax",
            value: function() {
                return {
                    min: this._chartData.from(),
                    max: this._chartData.to() - 1
                }
            }
        }, {
            key: "_optimalMinMax",
            value: function(t) {
                var e = t.min
                  , i = t.max;
                return {
                    min: e,
                    max: i,
                    range: i - e + 1
                }
            }
        }, {
            key: "_optimalTicks",
            value: function(t) {
                var e = []
                  , i = t.length
                  , a = this._chartData.dataList();
                if (i > 0) {
                    var n = this._chartData.dateTimeFormat()
                      , r = this._chartData.styleOptions().xAxis.tickText;
                    this._measureCtx.font = fe(r.size, r.weight, r.family);
                    var o = ve(this._measureCtx, "00-00 00:00")
                      , s = this.convertToPixel(parseInt(t[0].v, 10))
                      , c = 1;
                    if (i > 1) {
                        var h = this.convertToPixel(parseInt(t[1].v, 10))
                          , l = Math.abs(h - s);
                        o > l && (c = Math.ceil(o / l))
                    }
                    for (var u = 0; i > u; u += c) {
                        var d = parseInt(t[u].v, 10)
                          , _ = a[d].timestamp
                          , v = dt(n, _, "hh:mm");
                        if (0 !== u)
                            v = this._optimalTickLabel(n, _, a[parseInt(t[u - c].v, 10)].timestamp) || v;
                        var f = this.convertToPixel(d);
                        e.push({
                            v: v,
                            x: f,
                            oV: _
                        })
                    }
                    if (1 === e.length)
                        e[0].v = dt(n, e[0].oV, "YYYY-MM-DD hh:mm");
                    else {
                        var p = e[0].oV
                          , y = e[1].oV;
                        if (e[2]) {
                            var m = e[2].v;
                            /^[0-9]{2}-[0-9]{2}$/.test(m) ? e[0].v = dt(n, p, "MM-DD") : /^[0-9]{4}-[0-9]{2}$/.test(m) ? e[0].v = dt(n, p, "YYYY-MM") : /^[0-9]{4}$/.test(m) && (e[0].v = dt(n, p, "YYYY"))
                        } else
                            e[0].v = this._optimalTickLabel(n, p, y) || e[0].v
                    }
                }
                return e
            }
        }, {
            key: "_optimalTickLabel",
            value: function(t, e, i) {
                var a = dt(t, e, "YYYY")
                  , n = dt(t, e, "YYYY-MM")
                  , r = dt(t, e, "MM-DD");
                return a !== dt(t, i, "YYYY") ? a : n !== dt(t, i, "YYYY-MM") ? n : r !== dt(t, i, "MM-DD") ? r : null
            }
        }, {
            key: "getSelfHeight",
            value: function() {
                var t = this._chartData.styleOptions()
                  , e = t.xAxis
                  , i = e.height;
                if (R(i))
                    return i;
                var a = t.crosshair
                  , n = 0;
                e.show && (e.axisLine.show && (n += e.axisLine.size),
                e.tickLine.show && (n += e.tickLine.length),
                e.tickText.show && (n += e.tickText.paddingTop + e.tickText.paddingBottom + e.tickText.size));
                var r = 0;
                return a.show && a.vertical.show && a.vertical.text.show && (r += a.vertical.text.paddingTop + a.vertical.text.paddingBottom + 2 * a.vertical.text.borderSize + a.vertical.text.size),
                Math.max(n, r)
            }
        }, {
            key: "convertFromPixel",
            value: function(t) {
                return this._chartData.coordinateToDataIndex(t)
            }
        }, {
            key: "convertToPixel",
            value: function(t) {
                return this._chartData.dataIndexToCoordinate(t)
            }
        }]),
        i
    }(Se)
      , We = function(t) {
        D(i, t);
        var e = P(i);
        function i() {
            return m(this, i),
            e.apply(this, arguments)
        }
        return g(i, [{
            key: "_initBefore",
            value: function() {
                this._xAxis = new Ye(this._chartData)
            }
        }, {
            key: "_createMainWidget",
            value: function(t, e) {
                return new He({
                    container: t,
                    chartData: e.chartData,
                    xAxis: this._xAxis
                })
            }
        }, {
            key: "xAxis",
            value: function() {
                return this._xAxis
            }
        }, {
            key: "setWidth",
            value: function(t, e) {
                E(w(i.prototype), "setWidth", this).call(this, t, e),
                this._xAxis.setWidth(t)
            }
        }, {
            key: "setHeight",
            value: function(t) {
                E(w(i.prototype), "setHeight", this).call(this, t),
                this._xAxis.setHeight(t)
            }
        }]),
        i
    }(pe)
      , Ge = 0
      , Ne = 2;
    function Xe(t) {
        return t.getBoundingClientRect() || {
            left: 0,
            top: 0
        }
    }
    function je(t) {
        return !!t.touches
    }
    function Ze(t) {
        t.cancelable && t.preventDefault()
    }
    var Ue = !!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || "ontouchstart"in window || !!(window.DocumentTouch && document instanceof window.DocumentTouch)
      , Ke = "onorientationchange"in window && Ue;
    function qe(t, e) {
        var i = t.clientX - e.clientX
          , a = t.clientY - e.clientY;
        return Math.sqrt(i * i + a * a)
    }
    var $e = "mouse"
      , Je = "touch"
      , Qe = function() {
        function t(e, i, a) {
            m(this, t),
            this._target = e,
            this._handler = i,
            this._options = a,
            this._clickCount = 0,
            this._clickTimeoutId = null,
            this._longTapTimeoutId = null,
            this._longTapActive = !1,
            this._mouseMoveStartPosition = null,
            this._moveExceededManhattanDistance = !1,
            this._cancelClick = !1,
            this._unsubscribeOutsideEvents = null,
            this._unsubscribeMousemove = null,
            this._unsubscribeRoot = null,
            this._startPinchMiddlePoint = null,
            this._startPinchDistance = 0,
            this._pinchPrevented = !1,
            this._preventDragProcess = !1,
            this._mousePressed = !1,
            this._init()
        }
        return g(t, [{
            key: "destroy",
            value: function() {
                null !== this._unsubscribeOutsideEvents && (this._unsubscribeOutsideEvents(),
                this._unsubscribeOutsideEvents = null),
                null !== this._unsubscribeMousemove && (this._unsubscribeMousemove(),
                this._unsubscribeMousemove = null),
                null !== this._unsubscribeRoot && (this._unsubscribeRoot(),
                this._unsubscribeRoot = null),
                this._clearLongTapTimeout(),
                this._resetClickTimeout()
            }
        }, {
            key: "_mouseEnterHandler",
            value: function(t) {
                var e = this;
                this._unsubscribeMousemove && this._unsubscribeMousemove();
                var i = this._mouseMoveHandler.bind(this)
                  , a = this._mouseWheelHandler.bind(this);
                this._unsubscribeMousemove = function() {
                    e._target.removeEventListener("mousemove", i),
                    e._target.removeEventListener("wheel", a)
                }
                ,
                this._target.addEventListener("mousemove", i),
                this._target.addEventListener("wheel", a, {
                    passive: !1
                }),
                je(t) && this._mouseMoveHandler(t);
                var n = this._makeCompatEvent(t);
                this._processEvent(n, this._handler.mouseEnterEvent)
            }
        }, {
            key: "_resetClickTimeout",
            value: function() {
                null !== this._clickTimeoutId && clearTimeout(this._clickTimeoutId),
                this._clickCount = 0,
                this._clickTimeoutId = null
            }
        }, {
            key: "_mouseMoveHandler",
            value: function(t) {
                if (!this._mousePressed || je(t)) {
                    var e = this._makeCompatEvent(t);
                    this._processEvent(e, this._handler.mouseMoveEvent)
                }
            }
        }, {
            key: "_mouseWheelHandler",
            value: function(t) {
                var e = this._makeCompatEvent(t);
                t.localX = e.localX,
                t.localY = e.localY,
                this._processEvent(t, this._handler.mouseWheelEvent)
            }
        }, {
            key: "_mouseMoveWithDownHandler",
            value: function(t) {
                if ((!("button"in t) || t.button === Ge) && null === this._startPinchMiddlePoint) {
                    var e = je(t);
                    if (!this._preventDragProcess || !e) {
                        this._pinchPrevented = !0;
                        var i = this._makeCompatEvent(t)
                          , a = this._mouseMoveStartPosition
                          , n = Math.abs(a.x - i.pageX)
                          , r = Math.abs(a.y - i.pageY)
                          , o = n + r > 5;
                        if (o || !e) {
                            if (o && !this._moveExceededManhattanDistance && e) {
                                var s = .5 * n;
                                r >= s && !this._options.treatVertTouchDragAsPageScroll || s > r && !this._options.treatHorzTouchDragAsPageScroll || (this._preventDragProcess = !0)
                            }
                            o && (this._moveExceededManhattanDistance = !0,
                            this._cancelClick = !0,
                            e && this._clearLongTapTimeout()),
                            this._preventDragProcess || (this._processEvent(i, this._handler.pressedMouseMoveEvent),
                            e && Ze(t))
                        }
                    }
                }
            }
        }, {
            key: "_mouseUpHandler",
            value: function(t) {
                if (!("button"in t) || t.button === Ge) {
                    var e = this._makeCompatEvent(t);
                    this._clearLongTapTimeout(),
                    this._mouseMoveStartPosition = null,
                    this._mousePressed = !1,
                    this._unsubscribeRoot && (this._unsubscribeRoot(),
                    this._unsubscribeRoot = null),
                    je(t) && this._mouseLeaveHandler(t),
                    this._processEvent(e, this._handler.mouseUpEvent),
                    ++this._clickCount,
                    this._clickTimeoutId && this._clickCount > 1 ? (this._processEvent(e, this._handler.mouseDoubleClickEvent),
                    this._resetClickTimeout()) : this._cancelClick || this._processEvent(e, this._handler.mouseClickEvent),
                    je(t) && (Ze(t),
                    this._mouseLeaveHandler(t),
                    0 === t.touches.length && (this._longTapActive = !1))
                }
            }
        }, {
            key: "_clearLongTapTimeout",
            value: function() {
                null !== this._longTapTimeoutId && (clearTimeout(this._longTapTimeoutId),
                this._longTapTimeoutId = null)
            }
        }, {
            key: "_mouseDownHandler",
            value: function(t) {
                if (!("button"in t) || t.button === Ge || t.button === Ne) {
                    var e = this._makeCompatEvent(t);
                    if ("button"in t && t.button === Ne)
                        this._processEvent(e, this._handler.mouseRightDownEvent);
                    else {
                        this._cancelClick = !1,
                        this._moveExceededManhattanDistance = !1,
                        this._preventDragProcess = !1,
                        je(t) && this._mouseEnterHandler(t),
                        this._mouseMoveStartPosition = {
                            x: e.pageX,
                            y: e.pageY
                        },
                        this._unsubscribeRoot && (this._unsubscribeRoot(),
                        this._unsubscribeRoot = null);
                        var i = this._mouseMoveWithDownHandler.bind(this)
                          , a = this._mouseUpHandler.bind(this)
                          , n = this._target.ownerDocument.documentElement;
                        this._unsubscribeRoot = function() {
                            n.removeEventListener("touchmove", i),
                            n.removeEventListener("touchend", a),
                            n.removeEventListener("mousemove", i),
                            n.removeEventListener("mouseup", a)
                        }
                        ,
                        n.addEventListener("touchmove", i, {
                            passive: !1
                        }),
                        n.addEventListener("touchend", a, {
                            passive: !1
                        }),
                        this._clearLongTapTimeout(),
                        je(t) && 1 === t.touches.length ? this._longTapTimeoutId = setTimeout(this._longTapHandler.bind(this, t), 600) : (n.addEventListener("mousemove", i),
                        n.addEventListener("mouseup", a)),
                        this._mousePressed = !0,
                        this._processEvent(e, this._handler.mouseDownEvent),
                        this._clickTimeoutId || (this._clickCount = 0,
                        this._clickTimeoutId = setTimeout(this._resetClickTimeout.bind(this), 500))
                    }
                }
            }
        }, {
            key: "_init",
            value: function() {
                var t = this;
                this._target.addEventListener("mouseenter", this._mouseEnterHandler.bind(this)),
                this._target.addEventListener("touchcancel", this._clearLongTapTimeout.bind(this));
                var e = this._target.ownerDocument
                  , i = function(e) {
                    t._handler.mouseDownOutsideEvent && (e.target && t._target.contains(e.target) || t._handler.mouseDownOutsideEvent())
                };
                this._unsubscribeOutsideEvents = function() {
                    e.removeEventListener("mousedown", i),
                    e.removeEventListener("touchstart", i)
                }
                ,
                e.addEventListener("mousedown", i),
                e.addEventListener("touchstart", i, {
                    passive: !0
                }),
                this._target.addEventListener("mouseleave", this._mouseLeaveHandler.bind(this)),
                this._target.addEventListener("touchstart", this._mouseDownHandler.bind(this), {
                    passive: !0
                }),
                Ke || this._target.addEventListener("mousedown", this._mouseDownHandler.bind(this)),
                this._initPinch(),
                this._target.addEventListener("touchmove", (function() {}
                ), {
                    passive: !1
                })
            }
        }, {
            key: "_initPinch",
            value: function() {
                var t = this;
                void 0 === this._handler.pinchStartEvent && void 0 === this._handler.pinchEvent && void 0 === this._handler.pinchEndEvent || (this._target.addEventListener("touchstart", (function(e) {
                    return t._checkPinchState(e.touches)
                }
                ), {
                    passive: !0
                }),
                this._target.addEventListener("touchmove", (function(e) {
                    if (2 === e.touches.length && null !== t._startPinchMiddlePoint && void 0 !== t._handler.pinchEvent) {
                        var i = qe(e.touches[0], e.touches[1]);
                        t._handler.pinchEvent(t._startPinchMiddlePoint, i / t._startPinchDistance),
                        Ze(e)
                    }
                }
                ), {
                    passive: !1
                }),
                this._target.addEventListener("touchend", (function(e) {
                    t._checkPinchState(e.touches)
                }
                )))
            }
        }, {
            key: "_checkPinchState",
            value: function(t) {
                1 === t.length && (this._pinchPrevented = !1),
                2 !== t.length || this._pinchPrevented || this._longTapActive ? this._stopPinch() : this._startPinch(t)
            }
        }, {
            key: "_startPinch",
            value: function(t) {
                var e = Xe(this._target);
                this._startPinchMiddlePoint = {
                    x: (t[0].clientX - e.left + (t[1].clientX - e.left)) / 2,
                    y: (t[0].clientY - e.top + (t[1].clientY - e.top)) / 2
                },
                this._startPinchDistance = qe(t[0], t[1]),
                void 0 !== this._handler.pinchStartEvent && this._handler.pinchStartEvent(),
                this._clearLongTapTimeout()
            }
        }, {
            key: "_stopPinch",
            value: function() {
                null !== this._startPinchMiddlePoint && (this._startPinchMiddlePoint = null,
                void 0 !== this._handler.pinchEndEvent && this._handler.pinchEndEvent())
            }
        }, {
            key: "_mouseLeaveHandler",
            value: function(t) {
                this._unsubscribeMousemove && this._unsubscribeMousemove();
                var e = this._makeCompatEvent(t);
                this._processEvent(e, this._handler.mouseLeaveEvent)
            }
        }, {
            key: "_longTapHandler",
            value: function(t) {
                var e = this._makeCompatEvent(t);
                this._processEvent(e, this._handler.longTapEvent),
                this._cancelClick = !0,
                this._longTapActive = !0
            }
        }, {
            key: "_processEvent",
            value: function(t, e) {
                e && e.call(this._handler, t)
            }
        }, {
            key: "_makeCompatEvent",
            value: function(t) {
                var e;
                e = "touches"in t && t.touches.length ? t.touches[0] : "changedTouches"in t && t.changedTouches.length ? t.changedTouches[0] : t;
                var i = Xe(this._target);
                return {
                    clientX: e.clientX,
                    clientY: e.clientY,
                    pageX: e.pageX,
                    pageY: e.pageY,
                    screenX: e.screenX,
                    screenY: e.screenY,
                    localX: e.clientX - i.left,
                    localY: e.clientY - i.top,
                    ctrlKey: t.ctrlKey,
                    altKey: t.altKey,
                    shiftKey: t.shiftKey,
                    metaKey: t.metaKey,
                    type: t.type.startsWith("mouse") ? $e : Je,
                    target: e.target,
                    view: t.view
                }
            }
        }]),
        t
    }()
      , ti = function() {
        function t(e, i, a, n, r, o) {
            m(this, t),
            this._chartData = i,
            this._topPaneId = a,
            this._bottomPaneId = n,
            this._dragEnabled = r,
            this._width = 0,
            this._offsetLeft = 0,
            this._dragEventHandler = o,
            this._dragFlag = !1,
            this._initElement(e),
            this._initEvent(r)
        }
        return g(t, [{
            key: "_initElement",
            value: function(t) {
                this._container = t,
                this._wrapper = this._createElement(),
                this._wrapper.style.position = "relative",
                this._element = this._createElement(),
                this._element.style.width = "100%",
                this._element.style.position = "absolute",
                this._element.style.zIndex = "20",
                this._element.style.top = "-3px",
                this._element.style.height = "7px",
                this._wrapper.appendChild(this._element);
                var e = t.lastChild;
                e ? t.insertBefore(this._wrapper, e) : t.appendChild(this._wrapper)
            }
        }, {
            key: "_initEvent",
            value: function(t) {
                t && (this._element.style.cursor = "ns-resize",
                this._dragEvent = new Qe(this._element,{
                    mouseDownEvent: this._mouseDownEvent.bind(this),
                    mouseUpEvent: this._mouseUpEvent.bind(this),
                    pressedMouseMoveEvent: this._pressedMouseMoveEvent.bind(this),
                    mouseEnterEvent: this._mouseEnterEvent.bind(this),
                    mouseLeaveEvent: this._mouseLeaveEvent.bind(this)
                },{
                    treatVertTouchDragAsPageScroll: !1,
                    treatHorzTouchDragAsPageScroll: !0
                }))
            }
        }, {
            key: "_createElement",
            value: function() {
                var t = document.createElement("div");
                return t.style.margin = "0",
                t.style.padding = "0",
                t
            }
        }, {
            key: "_mouseDownEvent",
            value: function(t) {
                this._dragFlag = !0,
                this._startY = t.pageY,
                this._dragEventHandler.startDrag(this._topPaneId, this._bottomPaneId)
            }
        }, {
            key: "_mouseUpEvent",
            value: function() {
                this._dragFlag = !1,
                this._chartData.setDragPaneFlag(!1)
            }
        }, {
            key: "_pressedMouseMoveEvent",
            value: function(t) {
                this._dragEventHandler.drag(t.pageY - this._startY, this._topPaneId, this._bottomPaneId),
                this._chartData.setDragPaneFlag(!0),
                this._chartData.setCrosshair()
            }
        }, {
            key: "_mouseEnterEvent",
            value: function() {
                var t = this._chartData.styleOptions().separator;
                this._element.style.background = t.activeBackgroundColor,
                this._chartData.setDragPaneFlag(!0),
                this._chartData.setCrosshair()
            }
        }, {
            key: "_mouseLeaveEvent",
            value: function() {
                this._dragFlag || (this._element.style.background = null,
                this._chartData.setDragPaneFlag(!1))
            }
        }, {
            key: "height",
            value: function() {
                return this._wrapper.offsetHeight
            }
        }, {
            key: "setSize",
            value: function(t, e) {
                this._offsetLeft = t,
                this._width = e,
                this.invalidate()
            }
        }, {
            key: "setDragEnabled",
            value: function(t) {
                t !== this._dragEnabled && (this._dragEnabled = t,
                t ? !this._dragEvent && this._initEvent(t) : (this._element.style.cursor = "default",
                this._dragEvent && this._dragEvent.destroy(),
                this._dragEvent = null))
            }
        }, {
            key: "topPaneId",
            value: function() {
                return this._topPaneId
            }
        }, {
            key: "bottomPaneId",
            value: function() {
                return this._bottomPaneId
            }
        }, {
            key: "updatePaneId",
            value: function(t, e) {
                F(t) && (this._topPaneId = t),
                F(e) && (this._bottomPaneId = e)
            }
        }, {
            key: "invalidate",
            value: function() {
                var t = this._chartData.styleOptions().separator;
                this._element.style.top = "".concat(-Math.floor((7 - t.size) / 2), "px"),
                this._wrapper.style.backgroundColor = t.color,
                this._wrapper.style.height = "".concat(t.size, "px"),
                this._wrapper.style.marginLeft = "".concat(t.fill ? 0 : this._offsetLeft, "px"),
                this._wrapper.style.width = t.fill ? "100%" : "".concat(this._width, "px")
            }
        }, {
            key: "getImage",
            value: function() {
                var t = this._chartData.styleOptions().separator
                  , e = document.createElement("canvas")
                  , i = e.getContext("2d")
                  , a = _e(e)
                  , n = this._wrapper.offsetWidth
                  , r = t.size;
                return e.style.width = "".concat(n, "px"),
                e.style.height = "".concat(r, "px"),
                e.width = n * a,
                e.height = r * a,
                i.scale(a, a),
                i.fillStyle = t.color,
                i.fillRect(this._offsetLeft, 0, n, r),
                e
            }
        }, {
            key: "destroy",
            value: function() {
                this._dragEvent && this._dragEvent.destroy(),
                this._container.removeChild(this._wrapper)
            }
        }]),
        t
    }();
    function ei(t) {
        return t.type === Je
    }
    function ii(t) {
        return t.type === $e
    }
    var ai = function() {
        function t(e) {
            m(this, t),
            this._chartData = e,
            this._chartContentSize = {},
            this._paneContentSize = {}
        }
        return g(t, [{
            key: "_checkEventPointX",
            value: function(t) {
                return t > 0 && this._chartContentSize.contentRight - this._chartContentSize.contentLeft > t
            }
        }, {
            key: "setChartContentSize",
            value: function(t) {
                this._chartContentSize = t
            }
        }, {
            key: "setPaneContentSize",
            value: function(t) {
                this._paneContentSize = t
            }
        }]),
        t
    }()
      , ni = function(t) {
        D(i, t);
        var e = P(i);
        function i(t) {
            var a;
            return m(this, i),
            (a = e.call(this, t))._startScrollPoint = {},
            a._touchPoint = null,
            a._touchCancelCrossHair = !1,
            a._touchZoomed = !1,
            a._pinchScale = 1,
            a
        }
        return g(i, [{
            key: "pinchStartEvent",
            value: function() {
                this._pinchScale = 1,
                this._touchZoomed = !0
            }
        }, {
            key: "pinchEvent",
            value: function(t, e) {
                var i = 5 * (e - this._pinchScale);
                this._pinchScale = e,
                this._chartData.zoom(i, t)
            }
        }, {
            key: "mouseLeaveEvent",
            value: function(t) {
                ii(t) && this._chartData.setCrosshair()
            }
        }, {
            key: "mouseMoveEvent",
            value: function(t) {
                var e = this;
                ii(t) && this._performCross(t, !1, (function(i) {
                    e._chartData.setCrosshair({
                        x: t.localX,
                        y: i.y,
                        paneId: i.paneId
                    })
                }
                ), (function() {
                    e._chartData.setCrosshair()
                }
                ))
            }
        }, {
            key: "mouseWheelEvent",
            value: function(t) {
                if (this._checkEventPointX(t.localX))
                    if (Math.abs(t.deltaX) > Math.abs(t.deltaY)) {
                        if (t.cancelable && t.preventDefault(),
                        0 === Math.abs(t.deltaX))
                            return;
                        this._chartData.startScroll(),
                        this._chartData.scroll(-t.deltaX)
                    } else {
                        var e = -t.deltaY / 100;
                        if (0 === e)
                            return;
                        switch (t.cancelable && t.preventDefault(),
                        t.deltaMode) {
                        case t.DOM_DELTA_PAGE:
                            e *= 120;
                            break;
                        case t.DOM_DELTA_LINE:
                            e *= 32
                        }
                        if (0 !== e) {
                            var i = Math.sign(e) * Math.min(1, Math.abs(e));
                            this._chartData.zoom(i, {
                                x: t.localX,
                                y: t.localY
                            })
                        }
                    }
            }
        }, {
            key: "mouseClickEvent",
            value: function(t) {
                var e = this;
                this._performCross(t, !0, (function(i) {
                    e._touchPoint || e._touchCancelCrossHair || e._touchZoomed || (e._touchPoint = {
                        x: t.localX,
                        y: t.localY
                    },
                    e._chartData.setCrosshair({
                        x: t.localX,
                        y: i.y,
                        paneId: i.paneId
                    }))
                }
                ))
            }
        }, {
            key: "mouseDownEvent",
            value: function(t) {
                var e = this;
                this._startScrollPoint = {
                    x: t.localX,
                    y: t.localY
                },
                this._chartData.startScroll(),
                this._performCross(t, !0, (function(i) {
                    if (e._touchZoomed = !1,
                    e._touchPoint) {
                        var a = t.localX - e._touchPoint.x
                          , n = t.localY - e._touchPoint.y;
                        10 > Math.sqrt(a * a + n * n) ? (e._touchPoint = {
                            x: t.localX,
                            y: t.localY
                        },
                        e._chartData.setCrosshair({
                            x: t.localX,
                            y: i.y,
                            paneId: i.paneId
                        })) : (e._touchCancelCrossHair = !0,
                        e._touchPoint = null,
                        e._chartData.setCrosshair())
                    } else
                        e._touchCancelCrossHair = !1
                }
                ))
            }
        }, {
            key: "pressedMouseMoveEvent",
            value: function(t) {
                var e = this;
                this._performCross(t, !1, (function(i) {
                    var a = {
                        x: t.localX,
                        y: i.y,
                        paneId: i.paneId
                    };
                    if (ei(t)) {
                        if (e._touchPoint)
                            return e._touchPoint = {
                                x: t.localX,
                                y: t.localY
                            },
                            void e._chartData.setCrosshair(a);
                        a = null
                    }
                    e._chartData.scroll(t.localX - e._startScrollPoint.x, a)
                }
                ))
            }
        }, {
            key: "longTapEvent",
            value: function(t) {
                var e = this;
                this._performCross(t, !0, (function(i) {
                    e._touchPoint = {
                        x: t.localX,
                        y: t.localY
                    },
                    e._chartData.setCrosshair({
                        x: t.localX,
                        y: i.y,
                        paneId: i.paneId
                    })
                }
                ))
            }
        }, {
            key: "_performCross",
            value: function(t, e, i, a) {
                if (!e || ei(t))
                    if (this._checkEventPointX(t.localX)) {
                        var n = !1;
                        for (var r in this._paneContentSize) {
                            var o = this._paneContentSize[r];
                            if (t.localY > o.contentTop && o.contentBottom > t.localY) {
                                n = !0,
                                i && i({
                                    paneId: r,
                                    y: t.localY - o.contentTop
                                });
                                break
                            }
                        }
                        !n && a && a()
                    } else
                        a && a()
            }
        }]),
        i
    }(ai)
      , ri = function(t) {
        D(i, t);
        var e = P(i);
        function i(t) {
            var a;
            return m(this, i),
            (a = e.call(this, t))._pressedGraphicMark = null,
            a
        }
        return g(i, [{
            key: "_performOverlayMouseHover",
            value: function(t, e, i, a) {
                var n, r, o = A(t);
                try {
                    for (o.s(); !(r = o.n()).done; ) {
                        if (n = r.value.checkMousePointOnGraphic(i))
                            break
                    }
                } catch (t) {
                    o.e(t)
                } finally {
                    o.f()
                }
                return n && e.id === n.id || (e.id && e.instance && ii(a) && e.instance.onMouseLeave({
                    id: e.id,
                    points: e.instance.points(),
                    event: a
                }),
                n && n.id !== e.id && n.instance && ii(a) && n.instance.onMouseEnter({
                    id: n.id,
                    points: n.instance.points(),
                    event: a
                })),
                n
            }
        }, {
            key: "mouseUpEvent",
            value: function(t) {
                this._pressedGraphicMark && (this._pressedGraphicMark = null,
                this._chartData.setDragGraphicMarkFlag(!1))
            }
        }, {
            key: "mouseMoveEvent",
            value: function(t) {
                if (this._checkEventPointX(t.localX) && this._checkEventPointY(t.localY) && !this._waitingForMouseMoveAnimationFrame) {
                    this._waitingForMouseMoveAnimationFrame = !0;
                    var e, i, a, n = {
                        x: t.localX,
                        y: t.localY
                    }, r = this._chartData.graphicMarks(), o = this._chartData.visibleAnnotations(), s = r[r.length - 1], c = this._chartData.graphicMarkMouseOperate().hover, h = this._chartData.annotationMouseOperate();
                    s && s.isDrawing() ? (s.mouseMoveForDrawing(n),
                    e = s.checkMousePointOnGraphic(n),
                    i = {
                        id: "",
                        element: Gt,
                        elementIndex: -1
                    }) : (e = this._performOverlayMouseHover(r, c, n, t),
                    a = this._performOverlayMouseHover(o, h, n, t)),
                    this._chartData.setOverlayMouseOperate({
                        hover: e || {
                            id: "",
                            element: Gt,
                            elementIndex: -1
                        },
                        click: i
                    }, a || {
                        id: ""
                    }),
                    this._waitingForMouseMoveAnimationFrame = !1
                }
            }
        }, {
            key: "mouseDownEvent",
            value: function(t) {
                if (this._checkEventPointX(t.localX) && this._checkEventPointY(t.localY)) {
                    var e, i = {
                        x: t.localX,
                        y: t.localY
                    }, a = this._chartData.graphicMarks(), n = a[a.length - 1], r = {
                        id: "",
                        element: Gt,
                        elementIndex: -1
                    };
                    if (n && n.isDrawing())
                        n.mouseLeftButtonDownForDrawing(i),
                        e = n.checkMousePointOnGraphic(i);
                    else {
                        var o, s = A(a);
                        try {
                            for (s.s(); !(o = s.n()).done; ) {
                                var c = o.value;
                                if (e = c.checkMousePointOnGraphic(i)) {
                                    e.element === Wt && (this._pressedGraphicMark = c,
                                    this._chartData.setDragGraphicMarkFlag(!0),
                                    r = p({}, e)),
                                    c.onClick({
                                        id: e.id,
                                        points: c.points(),
                                        event: t
                                    });
                                    break
                                }
                            }
                        } catch (t) {
                            s.e(t)
                        } finally {
                            s.f()
                        }
                        var h, l = A(this._chartData.visibleAnnotations());
                        try {
                            for (l.s(); !(h = l.n()).done; ) {
                                var u = h.value
                                  , d = u.checkMousePointOnGraphic(i);
                                if (d) {
                                    u.onClick({
                                        id: d.id,
                                        points: u.points(),
                                        event: t
                                    });
                                    break
                                }
                            }
                        } catch (t) {
                            l.e(t)
                        } finally {
                            l.f()
                        }
                    }
                    this._chartData.setOverlayMouseOperate({
                        hover: r,
                        click: e || {
                            id: "",
                            element: Gt,
                            elementIndex: -1
                        }
                    })
                }
            }
        }, {
            key: "mouseRightDownEvent",
            value: function(t) {
                var e = this._chartData.graphicMarks().find((function(e) {
                    return e.checkMousePointOnGraphic({
                        x: t.localX,
                        y: t.localY
                    })
                }
                ));
                e && !e.onRightClick({
                    id: e.id(),
                    points: e.points(),
                    event: t
                }) && this._chartData.removeGraphicMarkInstance(e.id());
                var i = this._chartData.visibleAnnotations().find((function(e) {
                    return e.checkMousePointOnGraphic({
                        x: t.localX,
                        y: t.localY
                    })
                }
                ));
                i && i.onRightClick({
                    id: i.id(),
                    points: i.points(),
                    event: t
                })
            }
        }, {
            key: "pressedMouseMoveEvent",
            value: function(t) {
                var e = this._chartData.graphicMarks()
                  , i = e[e.length - 1];
                i && i.isDrawing() || !this._pressedGraphicMark || (this._pressedGraphicMark.mousePressedMove({
                    x: t.localX,
                    y: t.localY
                }, t),
                this._chartData.invalidate(ce))
            }
        }, {
            key: "_checkEventPointY",
            value: function(t) {
                var e = this._paneContentSize.candle_pane;
                return t > e.contentTop && e.contentBottom > t
            }
        }]),
        i
    }(ai)
      , oi = "Equal"
      , si = "Minus"
      , ci = "ArrowLeft"
      , hi = "ArrowRight"
      , li = function(t) {
        D(i, t);
        var e = P(i);
        function i() {
            return m(this, i),
            e.apply(this, arguments)
        }
        return g(i, [{
            key: "keyBoardDownEvent",
            value: function(t) {
                if (t.shiftKey)
                    switch (t.code) {
                    case oi:
                        this._chartData.zoom(.5);
                        break;
                    case si:
                        this._chartData.zoom(-.5);
                        break;
                    case ci:
                        this._chartData.startScroll(),
                        this._chartData.scroll(-3 * this._chartData.dataSpace());
                        break;
                    case hi:
                        this._chartData.startScroll(),
                        this._chartData.scroll(3 * this._chartData.dataSpace())
                    }
            }
        }]),
        i
    }(ai)
      , ui = function() {
        function t(e, i) {
            m(this, t),
            this._target = e,
            this._chartData = i,
            this._chartContentSize = {},
            this._event = new Qe(this._target,{
                pinchStartEvent: this._pinchStartEvent.bind(this),
                pinchEvent: this._pinchEvent.bind(this),
                mouseUpEvent: this._mouseUpEvent.bind(this),
                mouseClickEvent: this._mouseClickEvent.bind(this),
                mouseDownEvent: this._mouseDownEvent.bind(this),
                mouseRightDownEvent: this._mouseRightDownEvent.bind(this),
                mouseLeaveEvent: this._mouseLeaveEvent.bind(this),
                mouseMoveEvent: this._mouseMoveEvent.bind(this),
                mouseWheelEvent: this._mouseWheelEvent.bind(this),
                pressedMouseMoveEvent: this._pressedMouseMoveEvent.bind(this),
                longTapEvent: this._longTapEvent.bind(this)
            },{
                treatVertTouchDragAsPageScroll: !1,
                treatHorzTouchDragAsPageScroll: !1
            }),
            this._boundKeyBoardDownEvent = this._keyBoardDownEvent.bind(this),
            this._target.addEventListener("keydown", this._boundKeyBoardDownEvent),
            this._boundContextMenuEvent = function(t) {
                t.preventDefault()
            }
            ,
            this._target.addEventListener("contextmenu", this._boundContextMenuEvent, !1),
            this._zoomScrollEventHandler = new ni(i),
            this._overlayEventHandler = new ri(i),
            this._keyBoardEventHandler = new li(i)
        }
        return g(t, [{
            key: "_keyBoardDownEvent",
            value: function(t) {
                this._keyBoardEventHandler.keyBoardDownEvent(t)
            }
        }, {
            key: "_pinchStartEvent",
            value: function() {
                this._zoomScrollEventHandler.pinchStartEvent()
            }
        }, {
            key: "_pinchEvent",
            value: function(t, e) {
                this._zoomScrollEventHandler.pinchEvent(t, e)
            }
        }, {
            key: "_mouseUpEvent",
            value: function(t) {
                this._target.style.cursor = "crosshair",
                this._shouldPerformOverlayEvent() && (t.localX -= this._chartContentSize.contentLeft,
                this._overlayEventHandler.mouseUpEvent(t))
            }
        }, {
            key: "_mouseLeaveEvent",
            value: function(t) {
                this._checkZoomScroll() && (t.localX -= this._chartContentSize.contentLeft,
                this._zoomScrollEventHandler.mouseLeaveEvent(t))
            }
        }, {
            key: "_mouseMoveEvent",
            value: function(t) {
                t.localX -= this._chartContentSize.contentLeft,
                this._shouldPerformOverlayEvent() && this._overlayEventHandler.mouseMoveEvent(t),
                this._checkZoomScroll() && this._zoomScrollEventHandler.mouseMoveEvent(t)
            }
        }, {
            key: "_mouseWheelEvent",
            value: function(t) {
                this._checkZoomScroll() && this._zoomScrollEventHandler.mouseWheelEvent(t)
            }
        }, {
            key: "_mouseClickEvent",
            value: function(t) {
                this._checkZoomScroll() && (t.localX -= this._chartContentSize.contentLeft,
                this._zoomScrollEventHandler.mouseClickEvent(t))
            }
        }, {
            key: "_mouseDownEvent",
            value: function(t) {
                this._target.style.cursor = "pointer",
                t.localX -= this._chartContentSize.contentLeft,
                this._shouldPerformOverlayEvent() && this._overlayEventHandler.mouseDownEvent(t),
                this._checkZoomScroll() && this._zoomScrollEventHandler.mouseDownEvent(t)
            }
        }, {
            key: "_mouseRightDownEvent",
            value: function(t) {
                this._shouldPerformOverlayEvent() && (t.localX -= this._chartContentSize.contentLeft,
                this._overlayEventHandler.mouseRightDownEvent(t))
            }
        }, {
            key: "_pressedMouseMoveEvent",
            value: function(t) {
                t.localX -= this._chartContentSize.contentLeft,
                this._chartData.dragGraphicMarkFlag() && (this._overlayEventHandler.pressedMouseMoveEvent(t),
                this._chartData.crosshair().paneId && this._chartData.setCrosshair()),
                this._checkZoomScroll() && this._zoomScrollEventHandler.pressedMouseMoveEvent(t)
            }
        }, {
            key: "_longTapEvent",
            value: function(t) {
                this._checkZoomScroll() && (t.localX -= this._chartContentSize.contentLeft,
                this._zoomScrollEventHandler.longTapEvent(t))
            }
        }, {
            key: "_checkZoomScroll",
            value: function() {
                var t = this._chartData.graphicMarks()
                  , e = t.length;
                return !(this._chartData.dragPaneFlag() || this._chartData.dragGraphicMarkFlag() || 0 !== e && t[e - 1].isDrawing())
            }
        }, {
            key: "_shouldPerformOverlayEvent",
            value: function() {
                return this._chartData.graphicMarks().length > 0 || this._chartData.visibleAnnotations().length > 0
            }
        }, {
            key: "setChartContentSize",
            value: function(t) {
                this._chartContentSize = t,
                this._zoomScrollEventHandler.setChartContentSize(t),
                this._overlayEventHandler.setChartContentSize(t)
            }
        }, {
            key: "setPaneContentSize",
            value: function(t) {
                this._zoomScrollEventHandler.setPaneContentSize(t),
                this._overlayEventHandler.setPaneContentSize(t)
            }
        }, {
            key: "destroy",
            value: function() {
                this._event.destroy(),
                this._target.removeEventListener("keydown", this._boundKeyBoardDownEvent),
                this._target.removeEventListener("contextmenu", this._boundContextMenuEvent)
            }
        }]),
        t
    }();
    function di(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20
          , i = 0;
        return function() {
            var a = Date.now()
              , n = this
              , r = arguments;
            a - i > e && (t.apply(n, r),
            i = a)
        }
    }
    var _i = function(t) {
        D(i, t);
        var e = P(i);
        function i(t) {
            var a, n = t.id, r = t.point, o = t.chartData, s = t.xAxis, c = t.yAxis, h = t.styles;
            return m(this, i),
            (a = e.call(this, {
                id: n,
                chartData: o,
                xAxis: s,
                yAxis: c
            }))._point = r,
            a._symbolCoordinate = {},
            a.setStyles(h, o.styleOptions().annotation),
            a
        }
        return g(i, [{
            key: "_drawSymbol",
            value: function(t, e, i) {
                var a = this._chartData.barSpace()
                  , n = i.symbol
                  , r = n.size
                  , o = n.activeSize
                  , s = e ? R(o) ? o : a : R(r) ? r : a
                  , c = e ? n.activeColor : n.color;
                switch (n.type) {
                case it:
                    Ct(t, c, this._symbolCoordinate, s / 2);
                    break;
                case at:
                    !function(t, e, i, a, n, r) {
                        t.fillStyle = e,
                        t.fillRect(i, a, n, r)
                    }(t, c, this._symbolCoordinate.x - s / 2, this._symbolCoordinate.y - s / 2, s, s);
                    break;
                case rt:
                    !function(t, e, i, a, n) {
                        t.fillStyle = e,
                        t.beginPath(),
                        t.moveTo(i.x - a / 2, i.y),
                        t.lineTo(i.x, i.y - n / 2),
                        t.lineTo(i.x + a / 2, i.y),
                        t.lineTo(i.x, i.y + n / 2),
                        t.closePath(),
                        t.fill()
                    }(t, c, this._symbolCoordinate, s, s);
                    break;
                case nt:
                    !function(t, e, i, a, n) {
                        t.fillStyle = e,
                        t.beginPath(),
                        t.moveTo(i.x - a / 2, i.y + n / 2),
                        t.lineTo(i.x, i.y - n / 2),
                        t.lineTo(i.x + a / 2, i.y + n / 2),
                        t.closePath(),
                        t.fill()
                    }(t, c, this._symbolCoordinate, s, s);
                    break;
                case ot:
                    this.drawCustomSymbol({
                        ctx: t,
                        point: this._point,
                        coordinate: this._symbolCoordinate,
                        viewport: {
                            width: this._xAxis.width(),
                            height: this._yAxis.height(),
                            barSpace: a
                        },
                        styles: n,
                        isActive: e
                    })
                }
            }
        }, {
            key: "draw",
            value: function(t) {
                var e = this._styles || this._chartData.styleOptions().annotation
                  , i = e.symbol
                  , a = i.offset || []
                  , n = 0;
                switch (i.position) {
                case st:
                    n = this._yAxis.convertToPixel(this._point.price);
                    break;
                case ct:
                    n = 0;
                    break;
                case ht:
                    n = this._yAxis.height()
                }
                this._symbolCoordinate.y = n + (a[1] || 0);
                var r = this._id === this._chartData.annotationMouseOperate().id;
                this._drawSymbol(t, r, e),
                this.drawExtend && (t.save(),
                this.drawExtend({
                    ctx: t,
                    point: this._point,
                    coordinate: this._symbolCoordinate,
                    viewport: {
                        width: this._xAxis.width(),
                        height: this._yAxis.height()
                    },
                    styles: e,
                    isActive: r
                }),
                t.restore())
            }
        }, {
            key: "checkMousePointOnGraphic",
            value: function(t) {
                var e, i, a, n, r = this._chartData.barSpace(), o = (this._styles || this._chartData.styleOptions().annotation).symbol, s = R(o.size) ? o.size : r;
                switch (o.type) {
                case it:
                    e = Ft(this._symbolCoordinate, s / 2, t);
                    break;
                case at:
                    a = {
                        x: this._symbolCoordinate.x + s / 2,
                        y: this._symbolCoordinate.y + s / 2
                    },
                    e = !((i = {
                        x: this._symbolCoordinate.x - s / 2,
                        y: this._symbolCoordinate.y - s / 2
                    }).x > (n = t).x || n.x > a.x || i.y > n.y || n.y > a.y);
                    break;
                case rt:
                    e = function(t, e, i, a) {
                        return e * i / 2 + 2 > Math.abs(t.x - a.x) * i + Math.abs(t.y - a.y) * e
                    }(this._symbolCoordinate, s, s, t);
                    break;
                case nt:
                    e = function(t, e) {
                        var i = At(t[0], t[1], t[2])
                          , a = At(t[0], t[1], e) + At(t[0], t[2], e) + At(t[1], t[2], e);
                        return 2 > Math.abs(i - a)
                    }([{
                        x: this._symbolCoordinate.x - s / 2,
                        y: this._symbolCoordinate.y + s / 2
                    }, {
                        x: this._symbolCoordinate.x,
                        y: this._symbolCoordinate.y - s / 2
                    }, {
                        x: this._symbolCoordinate.x + s / 2,
                        y: this._symbolCoordinate.y + s / 2
                    }], t);
                    break;
                case ot:
                    e = this.checkPointInCustomSymbol({
                        mouseCoordinate: t,
                        coordinate: this._symbolCoordinate,
                        size: s
                    })
                }
                if (e)
                    return {
                        id: this._id,
                        instance: this
                    }
            }
        }, {
            key: "createSymbolCoordinate",
            value: function(t) {
                var e = this._styles || this._chartData.styleOptions().annotation;
                this._symbolCoordinate = {
                    x: t + ((e.symbol.offset || [])[0] || 0)
                }
            }
        }, {
            key: "points",
            value: function() {
                return this._point
            }
        }, {
            key: "checkPointInCustomSymbol",
            value: function(t) {}
        }, {
            key: "drawCustomSymbol",
            value: function(t) {}
        }]),
        i
    }(Et)
      , vi = function(t) {
        D(i, t);
        var e = P(i);
        function i(t) {
            var a, n = t.id, r = t.point, o = t.text, s = t.mark, c = t.chartData, h = t.xAxis, l = t.yAxis, u = t.styles;
            return m(this, i),
            (a = e.call(this, {
                id: n,
                chartData: c,
                xAxis: h,
                yAxis: l
            }))._point = r || {},
            a._text = o,
            a._mark = s,
            a.setStyles(u, c.styleOptions().tag),
            a
        }
        return g(i, [{
            key: "update",
            value: function(t) {
                var e = t.point
                  , i = t.text
                  , a = t.mark
                  , n = t.styles
                  , r = !1;
                return O(e) && (this._point = e,
                r = !0),
                F(i) && (this._text = i,
                r = !0),
                F(a) && (this._mark = a,
                r = !0),
                this.setStyles(n, this._chartData.styleOptions().tag) && (r = !0),
                r
            }
        }, {
            key: "drawMarkLine",
            value: function(t) {
                var e = this._chartData.styleOptions()
                  , i = e.yAxis
                  , a = this._styles || e.tag
                  , n = this._getY(a);
                t.save(),
                this._drawLine(t, n, a.line),
                this._drawMark(t, n, a, i),
                t.restore()
            }
        }, {
            key: "drawText",
            value: function(t) {
                if (F(this._text)) {
                    var e = this._chartData.styleOptions()
                      , i = this._styles || e.tag
                      , a = i.text;
                    t.font = fe(a.size, a.weight, a.family);
                    var n, r = this._getTextRectWidth(t, a), o = a.paddingTop + a.paddingBottom + a.size;
                    n = this._yAxis.isFromYAxisZero() ? 0 : this._yAxis.width() - r;
                    var s = this._getY(i);
                    Pe(t, a.backgroundColor, n, s - o / 2, r, o, a.borderRadius),
                    ke(t, a.color, n + a.paddingLeft, s, this._text)
                }
            }
        }, {
            key: "_drawLine",
            value: function(t, e, i) {
                i.show && (t.strokeStyle = i.color,
                t.lineWidth = i.size,
                i.style === H && t.setLineDash(i.dashValue),
                Bt(t, e, 0, this._xAxis.width()))
            }
        }, {
            key: "_drawMark",
            value: function(t, e, i, a) {
                if (F(this._mark)) {
                    var n = i.mark;
                    t.font = fe(n.size, n.weight, n.family);
                    var r, o = n.paddingLeft + n.paddingRight + ve(t, this._mark), s = n.paddingTop + n.paddingBottom + n.size;
                    if (a.inside) {
                        var c = 0;
                        F(this._text) && (c = this._getTextRectWidth(t, i.text)),
                        r = a.position === Y ? c : this._xAxis.width() - c - o
                    } else
                        r = a.position === Y ? 0 : this._xAxis.width() - o;
                    Pe(t, n.backgroundColor, r, e - s / 2, o, s, n.borderRadius),
                    t.textBaseline = "middle",
                    t.font = fe(n.size, n.weight, n.family),
                    ke(t, n.color, r + n.paddingLeft, e, this._mark)
                }
            }
        }, {
            key: "_getY",
            value: function(t) {
                var e = t.offset;
                switch (t.position) {
                case ct:
                    return e;
                case ht:
                    return this._yAxis.height() + e;
                default:
                    return this._yAxis.convertToNicePixel(this._point.price) + e
                }
            }
        }, {
            key: "_getTextRectWidth",
            value: function(t, e) {
                return t.font = fe(e.size, e.weight, e.family),
                e.paddingLeft + e.paddingRight + ve(t, this._text)
            }
        }]),
        i
    }(Et)
      , fi = function() {
        function t(e, i) {
            m(this, t),
            this._initChartContainer(e),
            this._graphicMarkBaseId = 0,
            this._paneBaseId = 0,
            this._separatorDragStartTopPaneHeight = 0,
            this._separatorDragStartBottomPaneHeight = 0,
            this._chartData = new de(i,{
                invalidate: this._invalidatePane.bind(this),
                crosshair: this._crosshairObserver.bind(this)
            }),
            this._xAxisPane = new We({
                container: this._chartContainer,
                chartData: this._chartData
            }),
            this._panes = new Map([[se, new ze({
                container: this._chartContainer,
                chartData: this._chartData,
                xAxis: this._xAxisPane.xAxis(),
                id: se
            })]]),
            this._separators = new Map,
            this._chartWidth = {},
            this._chartHeight = {},
            this._chartEvent = new ui(this._chartContainer,this._chartData),
            this.adjustPaneViewport(!0, !0, !0)
        }
        return g(t, [{
            key: "_initChartContainer",
            value: function(t) {
                this._container = t,
                this._chartContainer = document.createElement("div"),
                this._chartContainer.style.userSelect = "none",
                this._chartContainer.style.webkitUserSelect = "none",
                this._chartContainer.style.msUserSelect = "none",
                this._chartContainer.style.MozUserSelect = "none",
                this._chartContainer.style.webkitTapHighlightColor = "transparent",
                this._chartContainer.style.position = "relative",
                this._chartContainer.style.outline = "none",
                this._chartContainer.style.borderStyle = "none",
                this._chartContainer.style.width = "100%",
                this._chartContainer.style.cursor = "crosshair",
                this._chartContainer.tabIndex = 1,
                t.appendChild(this._chartContainer)
            }
        }, {
            key: "_crosshairObserver",
            value: function(t) {
                var e = t.dataIndex
                  , i = t.kLineData
                  , a = t.x
                  , n = t.y;
                if (this.chartData().hasAction(ue.CROSSHAIR)) {
                    var r = {};
                    this._panes.forEach((function(t, i) {
                        var a = {};
                        t.technicalIndicators().forEach((function(t) {
                            a[t.name] = t.result[e]
                        }
                        )),
                        r[i] = a
                    }
                    )),
                    this._chartData.actionExecute(ue.CROSSHAIR, {
                        coordinate: {
                            x: a,
                            y: n
                        },
                        dataIndex: e,
                        kLineData: i,
                        technicalIndicatorData: r
                    })
                }
            }
        }, {
            key: "_separatorStartDrag",
            value: function(t, e) {
                this._separatorDragStartTopPaneHeight = this._panes.get(t).height(),
                this._separatorDragStartBottomPaneHeight = this._panes.get(e).height()
            }
        }, {
            key: "_separatorDrag",
            value: function(t, e, i) {
                var a = this._separatorDragStartTopPaneHeight + t
                  , n = this._separatorDragStartBottomPaneHeight - t;
                a > this._separatorDragStartTopPaneHeight + this._separatorDragStartBottomPaneHeight && (a = this._separatorDragStartTopPaneHeight + this._separatorDragStartBottomPaneHeight,
                n = 0),
                0 > a && (a = 0,
                n = this._separatorDragStartTopPaneHeight + this._separatorDragStartBottomPaneHeight),
                this._panes.get(e).setHeight(a),
                this._panes.get(i).setHeight(n),
                this._chartData.actionExecute(ue.PANE_DRAG, {
                    topPaneId: e,
                    bottomPaneId: i,
                    topPaneHeight: a,
                    bottomPaneHeight: n
                }),
                this.adjustPaneViewport(!0, !0, !0, !0, !0)
            }
        }, {
            key: "_invalidatePane",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : le;
                if (t === ce)
                    this._xAxisPane.invalidate(t),
                    this._panes.forEach((function(e) {
                        e.invalidate(t)
                    }
                    ));
                else {
                    var e = !1;
                    this._panes.forEach((function(t) {
                        var i = t.yAxis().computeAxis();
                        i && (e = i)
                    }
                    )),
                    this.adjustPaneViewport(!1, e, !0)
                }
            }
        }, {
            key: "_calcAllPaneTechnicalIndicator",
            value: function() {
                var t = this
                  , e = [];
                this._panes.forEach((function(t) {
                    e.push(Promise.resolve(t.calcAllTechnicalIndicator()))
                }
                )),
                Promise.all(e).then((function(e) {
                    var i = e.indexOf(!0) > -1;
                    t.adjustPaneViewport(!1, i, !0)
                }
                ))
            }
        }, {
            key: "_measurePaneHeight",
            value: function() {
                var t = this
                  , e = this._chartData.styleOptions()
                  , i = this._container.offsetHeight
                  , a = e.separator.size
                  , n = a * this._separators.size
                  , r = this._xAxisPane.xAxis().getSelfHeight()
                  , o = i - r - n
                  , s = 0;
                this._panes.forEach((function(t) {
                    if (t.id() !== se) {
                        var e = t.height();
                        s + e > o ? (t.setHeight(o - s),
                        s = o) : s += e
                    }
                }
                ));
                var c = o - s
                  , h = {};
                h.candle_pane = {
                    contentTop: 0,
                    contentBottom: c
                };
                var l = c
                  , u = c;
                this._panes.get(se).setHeight(c),
                this._chartHeight.candle_pane = c,
                this._panes.forEach((function(e) {
                    if (e.id() !== se) {
                        var i = e.height();
                        u += i + a,
                        h[e.id()] = {
                            contentTop: l,
                            contentBottom: u
                        },
                        t._chartHeight[e.id()] = i,
                        l = u
                    }
                }
                )),
                this._xAxisPane.setHeight(r),
                this._chartHeight.xAxis = r,
                this._chartHeight.total = i,
                this._chartEvent.setPaneContentSize(h)
            }
        }, {
            key: "_measurePaneWidth",
            value: function() {
                var t, e, i, a = this, n = this._chartData.styleOptions().yAxis, r = n.position === Y, o = this._container.offsetWidth, s = Number.MIN_SAFE_INTEGER;
                !n.inside ? (this._panes.forEach((function(t) {
                    s = Math.max(s, t.yAxis().getSelfWidth())
                }
                )),
                t = o - s,
                r ? (e = 0,
                i = s) : (i = 0,
                e = o - s)) : (t = o,
                s = o,
                e = 0,
                i = 0),
                this._chartData.setTotalDataSpace(t),
                this._panes.forEach((function(n, r) {
                    n.setWidth(t, s),
                    n.setOffsetLeft(i, e);
                    var o = a._separators.get(r);
                    o && o.setSize(i, t)
                }
                )),
                this._chartWidth = {
                    content: t,
                    yAxis: s,
                    total: o
                },
                this._xAxisPane.setWidth(t, s),
                this._xAxisPane.setOffsetLeft(i, e),
                this._chartEvent.setChartContentSize({
                    contentLeft: i,
                    contentRight: i + t
                })
            }
        }, {
            key: "adjustPaneViewport",
            value: function(t, e, i, a, n) {
                t && this._measurePaneHeight();
                var r = !1;
                a && this._panes.forEach((function(t) {
                    var e = t.yAxis().computeAxis(n);
                    r || (r = e)
                }
                )),
                (!a && e || a && r) && this._measurePaneWidth(),
                i && (this._xAxisPane.xAxis().computeAxis(!0),
                this._xAxisPane.layout(),
                this._panes.forEach((function(t) {
                    t.layout()
                }
                )))
            }
        }, {
            key: "chartData",
            value: function() {
                return this._chartData
            }
        }, {
            key: "overrideTechnicalIndicator",
            value: function(t, e) {
                var i = this
                  , a = e.name
                  , n = e.calcParams
                  , r = e.precision
                  , o = e.styles;
                t.setCalcParamsAllowDecimal(e.calcParamsAllowDecimal);
                var s = t.setCalcParams(n)
                  , c = t.setPrecision(r)
                  , h = this._chartData.styleOptions().technicalIndicator
                  , l = t.setStyles(o, h);
                if (s || c || l) {
                    var u = !1
                      , d = [];
                    this._panes.forEach((function(t) {
                        var e = t.technicalIndicators();
                        if (e.has(a)) {
                            u = !0;
                            var i = e.get(a);
                            s && d.push(Promise.resolve(t.calcTechnicalIndicator(i)))
                        }
                    }
                    )),
                    u && Promise.all(d).then((function(t) {
                        i.adjustPaneViewport(!1, !0, !0, !0)
                    }
                    ))
                }
            }
        }, {
            key: "_applyDataList",
            value: function(t, e, i) {
                I(t) && (L(i) && i(),
                this._chartData.addData(t, 0, e),
                this._calcAllPaneTechnicalIndicator())
            }
        }, {
            key: "applyNewData",
            value: function(t, e) {
                var i = this;
                this._applyDataList(t, e, (function() {
                    i._chartData.clearDataList()
                }
                ))
            }
        }, {
            key: "applyMoreData",
            value: function(t, e) {
                this._applyDataList(t, e)
            }
        }, {
            key: "updateData",
            value: function(t) {
                var e = this._chartData.dataList()
                  , i = e.length
                  , a = ut(t, "timestamp", 0)
                  , n = ut(e[i - 1], "timestamp", 0);
                if (a >= n) {
                    var r = i;
                    a === n && (r = i - 1),
                    this._chartData.addData(t, r),
                    this._calcAllPaneTechnicalIndicator()
                }
            }
        }, {
            key: "removeTechnicalIndicator",
            value: function(t, e) {
                var i = this;
                if (this._panes.has(t))
                    if (t === se)
                        this._panes.get(se).removeTechnicalIndicator(e) && this.adjustPaneViewport(!1, !0, !0, !0);
                    else {
                        var a = this._panes.get(t)
                          , n = a.removeTechnicalIndicator(e);
                        if (a.isEmptyTechnicalIndicator()) {
                            a.destroy();
                            var r = this._separators.get(t).topPaneId();
                            this._separators.get(t).destroy(),
                            this._panes.delete(t),
                            this._separators.delete(t),
                            this._separators.forEach((function(t) {
                                var e = t.topPaneId();
                                i._separators.has(e) || t.updatePaneId(r)
                            }
                            )),
                            this.adjustPaneViewport(!0, !0, !0, !0, !0)
                        } else
                            n && this.adjustPaneViewport(!1, !0, !0, !0)
                    }
            }
        }, {
            key: "createTechnicalIndicator",
            value: function(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                if (this._panes.has(i.id))
                    return this.setPaneOptions(i, this._panes.get(i.id).setTechnicalIndicator(t, e)),
                    i.id;
                var a = i.id || "".concat(re).concat(++this._paneBaseId)
                  , n = !z(i.dragEnabled) || i.dragEnabled;
                return this._separators.set(a, new ti(this._chartContainer,this._chartData,Array.from(this._panes.keys()).pop(),a,n,{
                    startDrag: this._separatorStartDrag.bind(this),
                    drag: di(this._separatorDrag.bind(this), 50)
                })),
                this._panes.set(a, new Le({
                    container: this._chartContainer,
                    chartData: this._chartData,
                    xAxis: this._xAxisPane.xAxis(),
                    name: t.name,
                    id: a,
                    height: i.height || 100
                })),
                this.adjustPaneViewport(!0, !0, !0, !0, !0),
                a
            }
        }, {
            key: "getPaneTechnicalIndicator",
            value: function(t) {
                var e = function(t) {
                    var e = {};
                    return t.technicalIndicators().forEach((function(t) {
                        e[t.name] = Mt(t)
                    }
                    )),
                    e
                };
                if (!F(t)) {
                    var i = {};
                    return this._panes.forEach((function(t) {
                        i[t.id()] = e(t)
                    }
                    )),
                    i
                }
                return this._panes.has(t) ? e(this._panes.get(t)) : {}
            }
        }, {
            key: "createGraphicMark",
            value: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                  , i = e.id
                  , a = e.points
                  , n = e.styles
                  , r = e.lock
                  , o = e.onDrawStart
                  , s = e.onDrawing
                  , c = e.onDrawEnd
                  , h = e.onClick
                  , l = e.onRightClick
                  , u = e.onPressedMove
                  , d = e.onMouseEnter
                  , _ = e.onMouseLeave
                  , v = e.onRemove
                  , f = i || "".concat(oe).concat(++this._graphicMarkBaseId)
                  , p = new t({
                    id: f,
                    chartData: this._chartData,
                    xAxis: this._xAxisPane.xAxis(),
                    yAxis: this._panes.get(se).yAxis(),
                    points: a,
                    styles: n,
                    lock: r
                });
                if (L(o) && (p.onDrawStart = o,
                p.onDrawStart({
                    id: f
                })),
                L(s) && (p.onDrawing = s),
                L(c) && (p.onDrawEnd = c),
                L(h) && (p.onClick = h),
                L(l) && (p.onRightClick = l),
                L(u) && (p.onPressedMove = u),
                L(d) && (p.onMouseEnter = d),
                L(_) && (p.onMouseLeave = _),
                L(v) && (p.onRemove = v),
                this._chartData.addGraphicMarkInstance(p))
                    return f
            }
        }, {
            key: "createAnnotation",
            value: function(t) {
                var e = this
                  , i = [];
                t.forEach((function(t) {
                    var a = t.point
                      , n = t.styles
                      , r = t.checkPointInCustomSymbol
                      , o = t.drawCustomSymbol
                      , s = t.drawExtend
                      , c = t.onClick
                      , h = t.onRightClick
                      , l = t.onMouseEnter
                      , u = t.onMouseLeave;
                    if (a && a.timestamp) {
                        var d = new _i({
                            id: a.timestamp,
                            chartData: e._chartData,
                            point: a,
                            xAxis: e._xAxisPane.xAxis(),
                            yAxis: e._panes.get(se).yAxis(),
                            styles: n
                        });
                        L(s) && (d.drawExtend = s),
                        L(r) && (d.checkPointInCustomSymbol = r),
                        L(o) && (d.drawCustomSymbol = o),
                        L(c) && (d.onClick = c),
                        L(h) && (d.onRightClick = h),
                        L(l) && (d.onMouseEnter = l),
                        L(u) && (d.onMouseLeave = u),
                        i.push(d)
                    }
                }
                )),
                i.length > 0 && this._chartData.addAnnotations(i)
            }
        }, {
            key: "createTag",
            value: function(t) {
                var e = this
                  , i = []
                  , a = !1
                  , n = !1;
                t.forEach((function(t) {
                    var r = t.id
                      , o = t.point
                      , s = t.text
                      , c = t.mark
                      , h = t.styles;
                    if (F(r)) {
                        var l = e._chartData.getTag(r);
                        if (l) {
                            var u = l.update({
                                point: o,
                                text: s,
                                mark: c,
                                styles: h
                            });
                            a || (a = u)
                        } else
                            n = !0,
                            i.push(new vi({
                                id: r,
                                point: o,
                                text: s,
                                mark: c,
                                styles: h,
                                chartData: e._chartData,
                                xAxis: e._xAxisPane.xAxis(),
                                yAxis: e._panes.get(se).yAxis()
                            }))
                    }
                }
                )),
                n ? this._chartData.addTags(i) : a && this._invalidatePane(ce)
            }
        }, {
            key: "setPaneOptions",
            value: function(t, e) {
                var i = e
                  , a = !1;
                if (t.id !== se) {
                    var n = this._panes.get(t.id);
                    n && (R(t.height) && t.height > 0 && n.height() !== t.height && (i = !0,
                    n.setHeight(t.height),
                    a = !0),
                    z(t.dragEnabled) && this._separators.get(t.id).setDragEnabled(t.dragEnabled))
                }
                i && this.adjustPaneViewport(a, !0, !0, !0)
            }
        }, {
            key: "setTimezone",
            value: function(t) {
                this._chartData.setTimezone(t),
                this._xAxisPane.xAxis().computeAxis(!0),
                this._xAxisPane.invalidate(le)
            }
        }, {
            key: "convertToPixel",
            value: function(t, e) {
                var i, a = this, n = e.paneId, r = void 0 === n ? se : n, o = e.dataIndexXAxis, s = e.absoluteYAxis, c = [].concat(t), h = [], l = this._chartData.styleOptions().separator.size, u = 0, d = A(this._panes.values());
                try {
                    var _ = function() {
                        var t = i.value;
                        if (t.id() === r)
                            return h = c.map((function(e) {
                                var i = e.xAxisValue
                                  , n = e.yAxisValue
                                  , r = {};
                                if (F(i)) {
                                    var c = o ? i : a._chartData.timestampToDataIndex(i);
                                    r.x = a._xAxisPane.xAxis().convertToPixel(c)
                                }
                                if (F(n)) {
                                    var h = t.yAxis().convertToPixel(n);
                                    r.y = s ? u + h : h
                                }
                                return r
                            }
                            )),
                            "break";
                        u += t.height() + l
                    };
                    for (d.s(); !(i = d.n()).done; ) {
                        if ("break" === _())
                            break
                    }
                } catch (t) {
                    d.e(t)
                } finally {
                    d.f()
                }
                return I(t) ? h : h[0] || {}
            }
        }, {
            key: "convertFromPixel",
            value: function(t, e) {
                var i, a = this, n = e.paneId, r = void 0 === n ? se : n, o = e.dataIndexXAxis, s = e.absoluteYAxis, c = [].concat(t), h = [], l = this._chartData.styleOptions().separator.size, u = 0, d = A(this._panes.values());
                try {
                    var _ = function() {
                        var t = i.value;
                        if (t.id() === r)
                            return h = c.map((function(e) {
                                var i = e.x
                                  , n = e.y
                                  , r = {};
                                if (F(i)) {
                                    var c = a._xAxisPane.xAxis().convertFromPixel(i);
                                    r.xAxisValue = o ? c : a._chartData.dataIndexToTimestamp(c)
                                }
                                if (F(n)) {
                                    var h = s ? n - u : n;
                                    r.yAxisValue = t.yAxis().convertFromPixel(h)
                                }
                                return r
                            }
                            )),
                            "break";
                        u += t.height() + l
                    };
                    for (d.s(); !(i = d.n()).done; ) {
                        if ("break" === _())
                            break
                    }
                } catch (t) {
                    d.e(t)
                } finally {
                    d.f()
                }
                return I(t) ? h : h[0] || {}
            }
        }, {
            key: "chartWidth",
            value: function() {
                return this._chartWidth
            }
        }, {
            key: "chartHeight",
            value: function() {
                return this._chartHeight
            }
        }, {
            key: "getConvertPictureUrl",
            value: function(t, e, i) {
                var a = this
                  , n = document.createElement("canvas")
                  , r = n.getContext("2d")
                  , o = _e(n)
                  , s = this._chartContainer.offsetWidth
                  , c = this._chartContainer.offsetHeight;
                n.style.width = "".concat(s, "px"),
                n.style.height = "".concat(c, "px"),
                n.width = s * o,
                n.height = c * o,
                r.scale(o, o),
                r.fillStyle = i,
                r.fillRect(0, 0, s, c);
                var h = 0;
                return this._panes.forEach((function(e, i) {
                    if (i !== se) {
                        var n = a._separators.get(i);
                        r.drawImage(n.getImage(), 0, h, s, n.height()),
                        h += n.height()
                    }
                    r.drawImage(e.getImage(t), 0, h, s, e.height()),
                    h += e.height()
                }
                )),
                r.drawImage(this._xAxisPane.getImage(t), 0, h, s, this._xAxisPane.height()),
                n.toDataURL("image/".concat(e))
            }
        }, {
            key: "destroy",
            value: function() {
                this._panes.forEach((function(t) {
                    t.destroy()
                }
                )),
                this._separators.forEach((function(t) {
                    t.destroy()
                }
                )),
                this._panes.clear(),
                this._separators.clear(),
                this._xAxisPane.destroy(),
                this._container.removeChild(this._chartContainer),
                this._chartEvent.destroy()
            }
        }]),
        t
    }()
      , pi = function() {
        function t(e, i) {
            m(this, t),
            this._chartPane = new fi(e,i)
        }
        return g(t, [{
            key: "getWidth",
            value: function() {
                return this._chartPane.chartWidth()
            }
        }, {
            key: "getHeight",
            value: function() {
                return this._chartPane.chartHeight()
            }
        }, {
            key: "setStyleOptions",
            value: function(t) {
                O(t) && (this._chartPane.chartData().applyStyleOptions(t),
                this._chartPane.adjustPaneViewport(!0, !0, !0, !0, !0))
            }
        }, {
            key: "getStyleOptions",
            value: function() {
                return S(this._chartPane.chartData().styleOptions())
            }
        }, {
            key: "overrideTechnicalIndicator",
            value: function(t) {
                if (O(t)) {
                    var e = this._chartPane.chartData().getTechnicalIndicatorInstance(t.name);
                    e && this._chartPane.overrideTechnicalIndicator(e, t)
                }
            }
        }, {
            key: "getTechnicalIndicatorByName",
            value: function(t) {
                return this._chartPane.chartData().getTechnicalIndicatorInfo(t)
            }
        }, {
            key: "getTechnicalIndicatorByPaneId",
            value: function(t) {
                return this._chartPane.getPaneTechnicalIndicator(t)
            }
        }, {
            key: "setPriceVolumePrecision",
            value: function(t, e) {
                R(t) && t >= 0 && R(e) && e >= 0 && this._chartPane.chartData().setPriceVolumePrecision(t, e)
            }
        }, {
            key: "setTimezone",
            value: function(t) {
                this._chartPane.setTimezone(t)
            }
        }, {
            key: "getTimezone",
            value: function() {
                return this._chartPane.chartData().timezone()
            }
        }, {
            key: "resize",
            value: function() {
                this._chartPane.adjustPaneViewport(!0, !0, !0, !0, !0)
            }
        }, {
            key: "setOffsetRightSpace",
            value: function(t) {
                R(t) && this._chartPane.chartData().setOffsetRightSpace(t, !0)
            }
        }, {
            key: "setLeftMinVisibleBarCount",
            value: function(t) {
                R(t) && t > 0 && this._chartPane.chartData().setLeftMinVisibleBarCount(Math.ceil(t))
            }
        }, {
            key: "setRightMinVisibleBarCount",
            value: function(t) {
                R(t) && t > 0 && this._chartPane.chartData().setRightMinVisibleBarCount(Math.ceil(t))
            }
        }, {
            key: "setDataSpace",
            value: function(t) {
                R(t) && this._chartPane.chartData().setDataSpace(t)
            }
        }, {
            key: "clearData",
            value: function() {
                this._chartPane.chartData().clearDataList()
            }
        }, {
            key: "getDataList",
            value: function() {
                return this._chartPane.chartData().dataList()
            }
        }, {
            key: "applyNewData",
            value: function(t, e) {
                I(t) && this._chartPane.applyNewData(t, e)
            }
        }, {
            key: "applyMoreData",
            value: function(t, e) {
                I(t) && this._chartPane.applyMoreData(t, e)
            }
        }, {
            key: "updateData",
            value: function(t) {
                O(t) && !I(t) && this._chartPane.updateData(t)
            }
        }, {
            key: "loadMore",
            value: function(t) {
                L(t) && this._chartPane.chartData().setLoadMoreCallback(t)
            }
        }, {
            key: "createTechnicalIndicator",
            value: function(t, e, i) {
                var a = this._chartPane.chartData().getTechnicalIndicatorInstance(t);
                return a ? this._chartPane.createTechnicalIndicator(a, e, i) : null
            }
        }, {
            key: "addCustomTechnicalIndicator",
            value: function(t) {
                if (O(t)) {
                    var e = [].concat(t);
                    this._chartPane.chartData().addCustomTechnicalIndicator(e)
                }
            }
        }, {
            key: "removeTechnicalIndicator",
            value: function(t, e) {
                this._chartPane.removeTechnicalIndicator(t, e)
            }
        }, {
            key: "createGraphicMark",
            value: function(t, e) {
                var i = this._chartPane.chartData().graphicMarkMapping()[t];
                return i ? this._chartPane.createGraphicMark(i, e) : null
            }
        }, {
            key: "getGraphicMark",
            value: function(t) {
                return this._chartPane.chartData().getGraphicMark(t)
            }
        }, {
            key: "setGraphicMarkOptions",
            value: function(t, e) {
                this._chartPane.chartData().setGraphicMarkOptions(t, e)
            }
        }, {
            key: "addCustomGraphicMark",
            value: function(t) {
                if (O(t)) {
                    var e = [].concat(t);
                    this._chartPane.chartData().addCustomGraphicMark(e)
                }
            }
        }, {
            key: "removeGraphicMark",
            value: function(t) {
                this._chartPane.chartData().removeGraphicMarkInstance(t)
            }
        }, {
            key: "createAnnotation",
            value: function(t) {
                if (O(t)) {
                    var e = [].concat(t);
                    this._chartPane.createAnnotation(e)
                }
            }
        }, {
            key: "removeAnnotation",
            value: function(t) {
                this._chartPane.chartData().removeAnnotation(t)
            }
        }, {
            key: "createTag",
            value: function(t) {
                if (O(t)) {
                    var e = [].concat(t);
                    this._chartPane.createTag(e)
                }
            }
        }, {
            key: "removeTag",
            value: function(t) {
                this._chartPane.chartData().removeTag(t)
            }
        }, {
            key: "setPaneOptions",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this._chartPane.setPaneOptions(t, !1)
            }
        }, {
            key: "setZoomEnabled",
            value: function(t) {
                this._chartPane.chartData().setZoomEnabled(t)
            }
        }, {
            key: "isZoomEnabled",
            value: function() {
                return this._chartPane.chartData().zoomEnabled()
            }
        }, {
            key: "setScrollEnabled",
            value: function(t) {
                this._chartPane.chartData().setScrollEnabled(t)
            }
        }, {
            key: "isScrollEnabled",
            value: function() {
                return this._chartPane.chartData().scrollEnabled()
            }
        }, {
            key: "scrollByDistance",
            value: function(t, e) {
                var i = this;
                if (R(t))
                    if (R(e) && e > 0) {
                        this._chartPane.chartData().startScroll();
                        var a = (new Date).getTime();
                        !function n() {
                            var r = ((new Date).getTime() - a) / e
                              , o = r >= 1
                              , s = o ? t : t * r;
                            i._chartPane.chartData().scroll(s),
                            o || me(n)
                        }()
                    } else
                        this._chartPane.chartData().startScroll(),
                        this._chartPane.chartData().scroll(t)
            }
        }, {
            key: "scrollToRealTime",
            value: function(t) {
                var e = (this._chartPane.chartData().offsetRightBarCount() - this._chartPane.chartData().offsetRightSpace() / this._chartPane.chartData().dataSpace()) * this._chartPane.chartData().dataSpace();
                this.scrollByDistance(e, t)
            }
        }, {
            key: "scrollToPosition",
            value: function(t, e) {
                if (R(t)) {
                    var i = (this._chartPane.chartData().dataList().length - 1 - t) * this._chartPane.chartData().dataSpace();
                    this.scrollByDistance(i, e)
                }
            }
        }, {
            key: "zoomAtCoordinate",
            value: function(t, e, i) {
                var a = this;
                if (R(t))
                    if (R(i) && i > 0) {
                        var n = this._chartPane.chartData().dataSpace()
                          , r = n * t - n
                          , o = (new Date).getTime();
                        !function t() {
                            var s = ((new Date).getTime() - o) / i
                              , c = s >= 1
                              , h = c ? r : r * s;
                            a._chartPane.chartData().zoom(h / n, e),
                            c || me(t)
                        }()
                    } else
                        this._chartPane.chartData().zoom(t, e)
            }
        }, {
            key: "zoomAtPosition",
            value: function(t, e, i) {
                if (R(t) && R(e)) {
                    var a = this._chartPane.chartData().dataIndexToCoordinate(e);
                    this.zoomAtCoordinate(t, {
                        x: a
                    }, i)
                }
            }
        }, {
            key: "convertToPixel",
            value: function(t, e) {
                return this._chartPane.convertToPixel(t, e)
            }
        }, {
            key: "convertFromPixel",
            value: function(t, e) {
                return this._chartPane.convertFromPixel(t, e)
            }
        }, {
            key: "subscribeAction",
            value: function(t, e) {
                this._chartPane.chartData().subscribeAction(t, e)
            }
        }, {
            key: "unsubscribeAction",
            value: function(t, e) {
                this._chartPane.chartData().unsubscribeAction(t, e)
            }
        }, {
            key: "getConvertPictureUrl",
            value: function(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "jpeg"
                  , a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "#FFFFFF";
                if ("png" === i || "jpeg" === i || "bmp" === i)
                    return this._chartPane.getConvertPictureUrl(t, i, a)
            }
        }, {
            key: "destroy",
            value: function() {
                this._chartPane.destroy()
            }
        }]),
        t
    }()
      , yi = {}
      , mi = 1
      , xi = "k_line_chart_";
    v.addTechnicalIndicator([{
        name: "AVP",
        series: "price",
        precision: 2,
        plots: [{
            key: "avp",
            title: "AVP: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t) {
            var e = 0
              , i = 0;
            return t.map((function(t) {
                var a = {};
                return e += t.turnover || 0,
                0 !== (i += t.volume || 0) && (a.avp = e / i),
                a
            }
            ))
        }
    }, e, i, a, {
        name: "EMV",
        calcParams: [14, 9],
        plots: [{
            key: "emv",
            title: "EMV: ",
            type: "line"
        }, {
            key: "maEmv",
            title: "MAEMV: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t, e) {
            var i = 0
              , a = 0
              , n = []
              , r = [];
            return t.forEach((function(o, s) {
                var c = {}
                  , h = t[s - 1] || o
                  , l = o.high
                  , u = o.low
                  , d = o.turnover || 0
                  , _ = 0;
                0 !== d && (_ = ((l + u) / 2 - (h.high + h.low) / 2) * (l - u) / d),
                n.push(_),
                i += _,
                e[0] - 1 > s || (c.emv = i,
                i -= n[s - (e[0] - 1)],
                a += c.emv,
                e[0] + e[1] - 2 > s || (c.maEmv = a / e[1],
                a -= r[s - (e[1] - 1)].emv)),
                r.push(c)
            }
            )),
            r
        }
    }, {
        name: "EMA",
        series: "price",
        calcParams: [6, 12, 20],
        precision: 2,
        shouldCheckParamCount: !1,
        shouldOhlc: !0,
        plots: [{
            key: "ema6",
            title: "EMA6: ",
            type: "line"
        }, {
            key: "ema12",
            title: "EMA12: ",
            type: "line"
        }, {
            key: "ema20",
            title: "EMA20: ",
            type: "line"
        }],
        regeneratePlots: function(t) {
            return t.map((function(t) {
                return {
                    key: "ema".concat(t),
                    title: "EMA".concat(t, ": "),
                    type: "line"
                }
            }
            ))
        },
        calcTechnicalIndicator: function(t, e, i) {
            var a = 0
              , n = [];
            return t.map((function(t, r) {
                var o = {}
                  , s = t.close;
                return a += s,
                e.forEach((function(t, e) {
                    t - 1 > r || (n[e] = r > t - 1 ? (2 * s + (t - 1) * n[e]) / (t + 1) : a / t,
                    o[i[e].key] = n[e])
                }
                )),
                o
            }
            ))
        }
    }, {
        name: "MA",
        series: "price",
        calcParams: [5, 10, 30, 60],
        precision: 2,
        shouldCheckParamCount: !1,
        shouldOhlc: !0,
        plots: [{
            key: "ma5",
            title: "MA5: ",
            type: "line"
        }, {
            key: "ma10",
            title: "MA10: ",
            type: "line"
        }, {
            key: "ma30",
            title: "MA30: ",
            type: "line"
        }, {
            key: "ma60",
            title: "MA60: ",
            type: "line"
        }],
        regeneratePlots: function(t) {
            return t.map((function(t) {
                return {
                    key: "ma".concat(t),
                    title: "MA".concat(t, ": "),
                    type: "line"
                }
            }
            ))
        },
        calcTechnicalIndicator: function(t, e, i) {
            var a = [];
            return t.map((function(n, r) {
                var o = {}
                  , s = n.close;
                return e.forEach((function(e, n) {
                    a[n] = (a[n] || 0) + s,
                    e - 1 > r || (o[i[n].key] = a[n] / e,
                    a[n] -= t[r - (e - 1)].close)
                }
                )),
                o
            }
            ))
        }
    }, n, {
        name: "SMA",
        calcParams: [12, 2],
        series: "price",
        precision: 2,
        plots: [{
            key: "sma",
            title: "SMA: ",
            type: "line"
        }],
        shouldCheckParamCount: !0,
        shouldOhlc: !0,
        calcTechnicalIndicator: function(t, e) {
            var i = 0
              , a = 0;
            return t.map((function(t, n) {
                var r = {}
                  , o = t.close;
                return i += o,
                e[0] - 1 > n || (r.sma = a = n > e[0] - 1 ? (o * e[1] + a * (e[0] - e[1] + 1)) / (e[0] + 1) : i / e[0]),
                r
            }
            ))
        }
    }, {
        name: "TRIX",
        calcParams: [12, 9],
        plots: [{
            key: "trix",
            title: "TRIX: ",
            type: "line"
        }, {
            key: "maTrix",
            title: "MATRIX: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t, e) {
            var i, a, n, r = 0, o = 0, s = 0, c = 0, h = [];
            return t.forEach((function(t, l) {
                var u = {}
                  , d = t.close;
                if (r += d,
                l >= e[0] - 1 && (o += i = l > e[0] - 1 ? (2 * d + (e[0] - 1) * i) / (e[0] + 1) : r / e[0],
                l >= 2 * e[0] - 2 && (s += a = l > 2 * e[0] - 2 ? (2 * i + (e[0] - 1) * a) / (e[0] + 1) : o / e[0],
                l >= 3 * e[0] - 3))) {
                    var _, v = 0;
                    l > 3 * e[0] - 3 ? v = ((_ = (2 * a + (e[0] - 1) * n) / (e[0] + 1)) - n) / n * 100 : _ = s / e[0],
                    n = _,
                    u.trix = v,
                    c += v,
                    3 * e[0] + e[1] - 4 > l || (u.maTrix = c / e[1],
                    c -= h[l - (e[1] - 1)].trix)
                }
                h.push(u)
            }
            )),
            h
        }
    }, {
        name: "BRAR",
        calcParams: [26],
        plots: [{
            key: "br",
            title: "BR: ",
            type: "line"
        }, {
            key: "ar",
            title: "AR: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t, e) {
            var i = 0
              , a = 0
              , n = 0
              , r = 0;
            return t.map((function(o, s) {
                var c = {}
                  , h = o.high
                  , l = o.low
                  , u = o.open
                  , d = (t[s - 1] || o).close;
                if (n += h - u,
                r += u - l,
                i += h - d,
                a += d - l,
                s >= e[0] - 1) {
                    c.ar = 0 !== r ? n / r * 100 : 0,
                    c.br = 0 !== a ? i / a * 100 : 0;
                    var _ = t[s - (e[0] - 1)]
                      , v = _.high
                      , f = _.low
                      , p = _.open
                      , y = (t[s - e[0]] || t[s - (e[0] - 1)]).close;
                    i -= v - y,
                    a -= y - f,
                    n -= v - p,
                    r -= p - f
                }
                return c
            }
            ))
        }
    }, r, {
        name: "MTM",
        calcParams: [12, 6],
        plots: [{
            key: "mtm",
            title: "MTM: ",
            type: "line"
        }, {
            key: "maMtm",
            title: "MAMTM: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t, e) {
            var i = 0
              , a = [];
            return t.forEach((function(n, r) {
                var o = {};
                r < e[0] || (o.mtm = n.close - t[r - e[0]].close,
                i += o.mtm,
                e[0] + e[1] - 1 > r || (o.maMtm = i / e[1],
                i -= a[r - (e[1] - 1)].mtm));
                a.push(o)
            }
            )),
            a
        }
    }, {
        name: "PSY",
        calcParams: [12, 6],
        plots: [{
            key: "psy",
            title: "PSY: ",
            type: "line"
        }, {
            key: "maPsy",
            title: "MAPSY: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t, e) {
            var i = 0
              , a = 0
              , n = []
              , r = [];
            return t.forEach((function(o, s) {
                var c = {}
                  , h = o.close - (t[s - 1] || o).close > 0 ? 1 : 0;
                n.push(h),
                i += h,
                e[0] - 1 > s || (c.psy = i / e[0] * 100,
                a += c.psy,
                e[0] + e[1] - 2 > s || (c.maPsy = a / e[1],
                a -= r[s - (e[1] - 1)].psy),
                i -= n[s - (e[0] - 1)]),
                r.push(c)
            }
            )),
            r
        }
    }, {
        name: "ROC",
        calcParams: [12, 6],
        shouldCheckParamCount: !0,
        plots: [{
            key: "roc",
            title: "ROC: ",
            type: "line"
        }, {
            key: "maRoc",
            title: "MAROC: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t, e) {
            var i = []
              , a = 0;
            return t.forEach((function(n, r) {
                var o = {};
                if (r >= e[0] - 1) {
                    var s = (t[r - e[0]] || t[r - (e[0] - 1)]).close;
                    o.roc = 0 !== s ? (n.close - s) / s * 100 : 0,
                    a += o.roc,
                    e[0] - 1 + e[1] - 1 > r || (o.maRoc = a / e[1],
                    a -= i[r - (e[1] - 1)].roc)
                }
                i.push(o)
            }
            )),
            i
        }
    }, {
        name: "VR",
        calcParams: [26, 6],
        plots: [{
            key: "vr",
            title: "VR: ",
            type: "line"
        }, {
            key: "maVr",
            title: "MAVR: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t, e) {
            var i = 0
              , a = 0
              , n = 0
              , r = 0
              , o = [];
            return t.forEach((function(s, c) {
                var h = {}
                  , l = s.close
                  , u = (t[c - 1] || s).close
                  , d = s.volume;
                if (l > u ? i += d : u > l ? a += d : n += d,
                c >= e[0] - 1) {
                    var _ = n / 2;
                    h.vr = a + _ === 0 ? 0 : (i + _) / (a + _) * 100,
                    r += h.vr,
                    e[0] + e[1] - 2 > c || (h.maVr = r / e[1],
                    r -= o[c - (e[1] - 1)].vr);
                    var v = t[c - (e[0] - 1)]
                      , f = t[c - e[0]] || v
                      , p = v.close
                      , y = v.volume;
                    p > f.close ? i -= y : f.close > p ? a -= y : n -= y
                }
                o.push(h)
            }
            )),
            o
        }
    }, o, {
        name: "BIAS",
        calcParams: [6, 12, 24],
        shouldCheckParamCount: !1,
        plots: [{
            key: "bias6",
            title: "BIAS6: ",
            type: "line"
        }, {
            key: "bias12",
            title: "BIAS12: ",
            type: "line"
        }, {
            key: "bias24",
            title: "BIAS24: ",
            type: "line"
        }],
        regeneratePlots: function(t) {
            return t.map((function(t) {
                return {
                    key: "bias".concat(t),
                    title: "BIAS".concat(t, ": "),
                    type: "line"
                }
            }
            ))
        },
        calcTechnicalIndicator: function(t, e, i) {
            var a = [];
            return t.map((function(n, r) {
                var o = {}
                  , s = n.close;
                return e.forEach((function(n, c) {
                    if (a[c] = (a[c] || 0) + s,
                    r >= n - 1) {
                        var h = a[c] / e[c];
                        o[i[c].key] = (s - h) / h * 100,
                        a[c] -= t[r - (n - 1)].close
                    }
                }
                )),
                o
            }
            ))
        }
    }, s, c, l, u, d, _, {
        name: "OBV",
        calcParams: [30],
        plots: [{
            key: "obv",
            title: "OBV: ",
            type: "line"
        }, {
            key: "maObv",
            title: "MAOBV: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t, e) {
            var i = 0
              , a = 0
              , n = [];
            return t.forEach((function(r, o) {
                var s = t[o - 1] || r;
                s.close > r.close ? a -= r.volume : r.close > s.close && (a += r.volume);
                var c = {
                    obv: a
                };
                i += a,
                e[0] - 1 > o || (c.maObv = i / e[0],
                i -= n[o - (e[0] - 1)].obv),
                n.push(c)
            }
            )),
            n
        }
    }, {
        name: "PVT",
        plots: [{
            key: "pvt",
            title: "PVT: ",
            type: "line"
        }],
        calcTechnicalIndicator: function(t) {
            var e = 0;
            return t.map((function(i, a) {
                var n = {}
                  , r = (t[a - 1] || i).close
                  , o = 0;
                return 0 !== r && (o = (i.close - r) / r * i.volume),
                n.pvt = e += o,
                n
            }
            ))
        }
    }, {
        name: "VOL",
        series: "volume",
        calcParams: [5, 10, 20],
        shouldCheckParamCount: !1,
        shouldFormatBigNumber: !0,
        precision: 0,
        baseValue: 0,
        minValue: 0,
        plots: [{
            key: "ma5",
            title: "MA5: ",
            type: "line"
        }, {
            key: "ma10",
            title: "MA10: ",
            type: "line"
        }, {
            key: "ma20",
            title: "MA20: ",
            type: "line"
        }, {
            key: "volume",
            title: "VOLUME: ",
            type: "bar",
            color: function(t, e) {
                var i = t.currentData.kLineData || {};
                return i.close > i.open ? e.bar.upColor : i.open > i.close ? e.bar.downColor : e.bar.noChangeColor
            }
        }],
        regeneratePlots: function(t) {
            var e = t.map((function(t) {
                return {
                    key: "ma".concat(t),
                    title: "MA".concat(t, ": "),
                    type: "line"
                }
            }
            ));
            return e.push({
                key: "volume",
                title: "VOLUME: ",
                type: "bar",
                color: function(t, e) {
                    var i = t.currentData.kLineData || {};
                    return i.close > i.open ? e.bar.upColor : i.open > i.close ? e.bar.downColor : e.bar.noChangeColor
                }
            }),
            e
        },
        calcTechnicalIndicator: function(t, e, i) {
            var a = [];
            return t.map((function(n, r) {
                var o = n.volume || 0
                  , s = {
                    volume: o
                };
                return e.forEach((function(e, n) {
                    a[n] = (a[n] || 0) + o,
                    e - 1 > r || (s[i[n].key] = a[n] / e,
                    a[n] -= t[r - (e - 1)].volume)
                }
                )),
                s
            }
            ))
        }
    }]),
    v.addGraphicMark([{
        name: "horizontalRayLine",
        totalStep: 3,
        checkMousePointOn: function(t, e, i, a) {
            return Ot(i[0], i[1], a)
        },
        createGraphicDataSource: function(t, e, i, a) {
            var n = {
                x: 0,
                y: i[0].y
            };
            return i[1] && i[1].x > i[0].x && (n.x = a.width),
            [{
                type: "line",
                isDraw: !0,
                isCheck: !0,
                dataSource: [[i[0], n]]
            }]
        },
        performMousePressedMove: function(t, e, i) {
            var a = i.price;
            t[0].price = a,
            t[1].price = a
        },
        performMouseMoveForDrawing: function(t, e, i) {
            2 === t && (e[0].price = i.price)
        }
    }, {
        name: "horizontalSegment",
        totalStep: 3,
        checkMousePointOn: function(t, e, i, a) {
            return Rt(i[0], i[1], a)
        },
        createGraphicDataSource: function(t, e, i) {
            var a = [];
            return 2 === i.length && (a = [i]),
            [{
                type: "line",
                isDraw: !0,
                isCheck: !0,
                dataSource: a
            }]
        },
        performMousePressedMove: function(t, e, i) {
            var a = i.price;
            t[0].price = a,
            t[1].price = a
        },
        performMouseMoveForDrawing: function(t, e, i) {
            2 === t && (e[0].price = i.price)
        }
    }, {
        name: "horizontalStraightLine",
        totalStep: 2,
        checkMousePointOn: function(t, e, i, a) {
            return Lt(i[0], i[1], a)
        },
        createGraphicDataSource: function(t, e, i, a) {
            return [{
                type: "line",
                isDraw: !0,
                isCheck: !0,
                dataSource: [[{
                    x: 0,
                    y: i[0].y
                }, {
                    x: a.width,
                    y: i[0].y
                }]]
            }]
        }
    }, {
        name: "verticalRayLine",
        totalStep: 3,
        checkMousePointOn: function(t, e, i, a) {
            return Ot(i[0], i[1], a)
        },
        createGraphicDataSource: function(t, e, i, a) {
            var n = {
                x: i[0].x,
                y: 0
            };
            return i[1] && i[1].y > i[0].y && (n.y = a.height),
            [{
                type: "line",
                isDraw: !0,
                isCheck: !0,
                dataSource: [[i[0], n]]
            }]
        },
        performMousePressedMove: function(t, e, i) {
            var a = i.dataIndex
              , n = i.timestamp;
            t[0].timestamp = n,
            t[0].dataIndex = a,
            t[1].timestamp = n,
            t[1].dataIndex = a
        },
        performMouseMoveForDrawing: function(t, e, i) {
            var a = i.dataIndex;
            2 === t && (e[0].timestamp = i.timestamp,
            e[0].dataIndex = a)
        }
    }, {
        name: "verticalSegment",
        totalStep: 3,
        checkMousePointOn: function(t, e, i, a) {
            return Rt(i[0], i[1], a)
        },
        createGraphicDataSource: function(t, e, i) {
            var a = [];
            return 2 === i.length && (a = [i]),
            [{
                type: "line",
                isDraw: !0,
                isCheck: !0,
                dataSource: a
            }]
        },
        performMousePressedMove: function(t, e, i) {
            var a = i.dataIndex
              , n = i.timestamp;
            t[0].timestamp = n,
            t[0].dataIndex = a,
            t[1].timestamp = n,
            t[1].dataIndex = a
        },
        performMouseMoveForDrawing: function(t, e, i) {
            var a = i.dataIndex;
            2 === t && (e[0].timestamp = i.timestamp,
            e[0].dataIndex = a)
        }
    }, {
        name: "verticalStraightLine",
        totalStep: 2,
        checkMousePointOn: function(t, e, i, a) {
            return Lt(i[0], i[1], a)
        },
        createGraphicDataSource: function(t, e, i, a) {
            return [{
                type: "line",
                isDraw: !0,
                isCheck: !0,
                dataSource: [[{
                    x: i[0].x,
                    y: 0
                }, {
                    x: i[0].x,
                    y: a.height
                }]]
            }]
        }
    }, {
        name: "rayLine",
        totalStep: 3,
        checkMousePointOn: function(t, e, i, a) {
            return Ot(i[0], i[1], a)
        },
        createGraphicDataSource: function(t, e, i, a) {
            return [{
                type: "line",
                isDraw: !0,
                isCheck: !0,
                dataSource: [(n = i[0],
                r = i[1],
                o = {
                    x: a.width,
                    y: a.height
                },
                n && r ? [n, n.x === r.x && n.y !== r.y ? r.y > n.y ? {
                    x: n.x,
                    y: o.y
                } : {
                    x: n.x,
                    y: 0
                } : n.x > r.x ? {
                    x: 0,
                    y: St(n, r, {
                        x: 0,
                        y: n.y
                    })
                } : {
                    x: o.x,
                    y: St(n, r, {
                        x: o.x,
                        y: n.y
                    })
                }] : [])]
            }];
            var n, r, o
        }
    }, {
        name: "segment",
        totalStep: 3,
        checkMousePointOn: function(t, e, i, a) {
            return Rt(i[0], i[1], a)
        },
        createGraphicDataSource: function(t, e, i) {
            var a = [];
            return 2 === i.length && (a = [i]),
            [{
                type: "line",
                isDraw: !0,
                isCheck: !0,
                dataSource: a
            }]
        }
    }, {
        name: "straightLine",
        totalStep: 3,
        checkMousePointOn: function(t, e, i, a) {
            return Lt(i[0], i[1], a)
        },
        createGraphicDataSource: function(t, e, i, a) {
            return 2 > i.length || i[0].x === i[1].x ? [{
                type: "line",
                isDraw: !0,
                isCheck: !0,
                dataSource: [[{
                    x: i[0].x,
                    y: 0
                }, {
                    x: i[0].x,
                    y: a.height
                }]]
            }] : [{
                type: "line",
                isDraw: !0,
                isCheck: !0,
                dataSource: [[{
                    x: 0,
                    y: St(i[0], i[1], {
                        x: 0,
                        y: i[0].y
                    })
                }, {
                    x: a.width,
                    y: St(i[0], i[1], {
                        x: a.width,
                        y: i[0].y
                    })
                }]]
            }]
        }
    }, {
        name: "parallelStraightLine",
        totalStep: 4,
        checkMousePointOn: function(t, e, i, a) {
            return Lt(i[0], i[1], a)
        },
        createGraphicDataSource: function(t, e, i, a) {
            return [{
                type: "line",
                isDraw: !0,
                isCheck: !0,
                dataSource: zt(i, {
                    x: a.width,
                    y: a.height
                })
            }]
        }
    }, {
        name: "priceChannelLine",
        totalStep: 4,
        checkMousePointOn: function(t, e, i, a) {
            return Lt(i[0], i[1], a)
        },
        createGraphicDataSource: function(t, e, i, a) {
            return [{
                type: "line",
                isDraw: !0,
                isCheck: !0,
                dataSource: zt(i, {
                    x: a.width,
                    y: a.height
                }, 1)
            }]
        }
    }, {
        name: "priceLine",
        totalStep: 2,
        checkMousePointOn: function(t, e, i, a) {
            return Ot(i[0], i[1], a)
        },
        createGraphicDataSource: function(t, e, i, a, n, r, o) {
            return [{
                type: "line",
                isDraw: !0,
                isCheck: !0,
                dataSource: [[i[0], {
                    x: a.width,
                    y: i[0].y
                }]]
            }, {
                type: "text",
                isDraw: !0,
                isCheck: !1,
                dataSource: [{
                    x: i[0].x,
                    y: i[0].y,
                    text: o.convertFromPixel(i[0].y).toFixed(n.price)
                }]
            }]
        }
    }, {
        name: "fibonacciLine",
        totalStep: 3,
        checkMousePointOn: function(t, e, i, a) {
            return Lt(i[0], i[1], a)
        },
        createGraphicDataSource: function(t, e, i, a, n) {
            if (i.length > 0) {
                var r = []
                  , o = []
                  , s = a.width;
                if (i.length > 1) {
                    var c = i[0].y - i[1].y
                      , h = e[0].price - e[1].price;
                    [1, .786, .618, .5, .382, .236, 0].forEach((function(t) {
                        var a = i[1].y + c * t
                          , l = (e[1].price + h * t).toFixed(n.price);
                        r.push([{
                            x: 0,
                            y: a
                        }, {
                            x: s,
                            y: a
                        }]),
                        o.push({
                            x: 0,
                            y: a,
                            text: "".concat(l, " (").concat((100 * t).toFixed(1), "%)")
                        })
                    }
                    ))
                }
                return [{
                    type: "line",
                    isDraw: !0,
                    isCheck: !0,
                    dataSource: r
                }, {
                    type: "text",
                    isDraw: !0,
                    isCheck: !1,
                    dataSource: o
                }]
            }
            return []
        }
    }]),
    t.dispose = function(t) {
        if (t) {
            var e;
            if (B(t)) {
                var i = document.getElementById(t);
                e = i && i.chartId
            } else
                V(t) ? e = t.chartId : t instanceof pi && (e = t.id);
            e && (yi[e].destroy(),
            delete yi[e])
        }
    }
    ,
    t.extension = v,
    t.init = function(t) {
        var e, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!t)
            return null;
        if (!V(e = B(t) ? document.getElementById(t) : t))
            return null;
        var a = yi[e.chartId || ""];
        if (a)
            return a;
        var n = "".concat(xi).concat(mi++);
        return (a = new pi(e,i)).id = n,
        e.chartId = n,
        yi[n] = a,
        a
    }
    ,
    t.version = function() {
        return "7.5.0"
    }
    ,
    Object.defineProperty(t, "__esModule", {
        value: !0
    })
}
));
