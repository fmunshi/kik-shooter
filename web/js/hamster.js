function requireUser(e) {
    function t(t) {
        profile.createOrUpdate(t, function (t) {
            t ? (savedUser = t, localStorage.storedUser = JSON.stringify(savedUser), e(savedUser)) : e(null)
        })
    }
    if (savedUser) {
        e(savedUser);
        return
    }
    cards.kik && cards.kik.getUser ? cards.kik.getUser(t) : t({
        fullName: "Mike Roberts",
        username: "mpr",
        thumbnail: null
    })
}

function updatePurchases(e) {}

function contentReady(e) {
    _spritesheetReady ? e() : _spritesheetCallbacks.push(e)
}

function spriteSheetReady() {
    if (!_spritesheetReady) {
        _spritesheetReady = !0;
        var e = [].concat(_spritesheetCallbacks);
        for (var t = 0; t < e.length; ++t) e[t].call()
    }
}

function SPRITESHEET(e, t) {
    game.resources.spritesheet(e, t, spriteSheetReady)
}

function PlatformPlan(e, t) {
    this.x = e, this.y = t
}

function cookieLinePlan(e, t, n, r) {
    var i = [],
        s = 5,
        o = t / s,
        u = 0,
        a = e + FLOOR_GAP;
    for (var f = 0; f < n; ++f) {
        u = Math.sin(Math.PI / 2 * f / n) * o;
        for (var l = 0; l < s; ++l) i.push(new CoinPlan(u, a)), u += o;
        a += r * FLOOR_GAP
    }
    return i
}

function easyModePlan(e, t, n, r) {
    var i = e + FLOOR_GAP;
    for (var s = 0; s < n; ++s) {
        var o = Math.random(),
            u = o * (t - PLATFORM_WIDTH),
            a = new PlatformPlan(u, i);
        r.push(a), i += FLOOR_GAP
    }
    return i
}

function randomPlan(e, t, n, r) {
    var i = [null, PlatformPlan, MovingPlatformPlan, FallingPlatformPlan, SmallPlatformPlan, CoinPlan],
        s = [1, 1, 1, 1, 1, 1],
        o = e + FLOOR_GAP;
    s[0] = Math.max(e / 1e3, 1);
    var u = Math.min(Math.max(e, 1), 100 * FLOOR_GAP) / (100 * FLOOR_GAP) * t,
        a = e,
        f = 3 * FLOOR_GAP;
    for (var l = 0; l < n; ++l) {
        var c = 0,
            h = o - a,
            p = !1,
            d = [].concat(i),
            v = [].concat(s);
        h >= f && (d.shift(), v.shift());
        var m = 0;
        for (var g = 0; g < d.length; ++g) m += v[g];
        for (var g = 0; g < d.length; ++g) v[g] /= m;
        v[g] = 1;
        var y = Math.random(),
            b = -1;
        for (var w = 0; w < d.length; ++w) {
            var E = d[w];
            c += v[w];
            if (y < c) {
                if (E) {
                    var S = PLATFORM_WIDTH,
                        x = Math.random() * (t - S),
                        T;
                    if (E === MovingPlatformPlan) {
                        var N = Math.max(S, Math.random() * u);
                        x += S / 2;
                        var C = Math.max(0, x - N / 2),
                            k = Math.min(t - S, x + N / 2);
                        T = new E(C, o, k, 3)
                    } else T = new E(x, o);
                    a = o, r.push(T)
                }
                b = w;
                break
            }
        }
        if (b < 0) throw "Planning error skipping=" + p + ", gap=" + h + ", r=" + y + ", c=" + c;
        o += FLOOR_GAP
    }
    return a
}

function coinCurvePlan(e, t, n, r) {
    var i = e + FLOOR_GAP,
        s = .75;
    for (var o = 0; o < n; ++o) {
        var u = Math.cos(2 * Math.PI / 50 * i / FLOOR_GAP);
        u = Math.pow(u, 2);
        var a = u * (t - 65) * s;
        a += (t - (t - 65) * s) / 4;
        var f = new CoinPlan(a, i);
        r.push(f), i += FLOOR_GAP
    }
    return i
}

function addHomeButtons(e) {
    e.tournament = game.object("button", {
        x: e.engine.view.width / 2 - 100,
        y: e.engine.view.height + 200,
        states: {
            ready: {
                y: e.engine.view.height - 250
            },
            hover: {
                scaleX: 1.2,
                scaleY: 1.2
            },
            reset: {
                scaleX: 1,
                scaleY: 1
            }
        },
        scaleX: 1,
        scaleY: 1,
        width: 200,
        height: 200,
        centerX: 50,
        centerY: 50,
        onclick: function () {
            game.changeScene(game.object("scene-tournament"))
        },
        onstateChanged: function (e) {
            e ? this.ease(this.states.hover, .2, Easing.easeIn) : this.ease(this.states.reset, .2, Easing.easeIn)
        }
    }), e.tournament.addChild(game.object("sprite", {
        url: "res/trophy-icon.png",
        x: 0,
        y: 0,
        centerX: 51
    })), e.tournament.addChild(game.object("sprite", {
        url: "res/tournament-button-text.png",
        x: 0,
        y: 130,
        centerX: 85
    })), e.shop = game.object("button", {
        x: e.engine.view.width / 2 + 100,
        y: e.engine.view.height + 200,
        states: {
            ready: {
                y: e.engine.view.height - 250
            },
            hover: {
                scaleX: 1.2,
                scaleY: 1.2
            },
            reset: {
                scaleX: 1,
                scaleY: 1
            }
        },
        scaleX: 1,
        scaleY: 1,
        width: 200,
        height: 200,
        centerX: 50,
        centerY: 50,
        onclick: function () {
            var e = game.object("scene-store");
            this.engine.changeScene(e, !1)
        },
        onstateChanged: function (e) {
            e ? this.ease(this.states.hover, .2, Easing.easeIn) : this.ease(this.states.reset, .2, Easing.easeIn)
        }
    }), e.shop.addChild(game.object("sprite", {
        url: "res/shop-icon.png",
        x: 0,
        y: 0,
        centerX: 58
    })), e.shop.addChild(game.object("sprite", {
        url: "res/shop-button-text.png",
        x: 0,
        y: 130,
        centerX: 38
    })), e.sunrise = game.object("sprite", {
        url: "res/background-sunrise.png",
        x: 0,
        y: e.engine.view.height,
        states: {
            ready: {
                y: e.engine.view.height - 290
            }
        }
    }), e.addChild(e.sunrise), e.addChild(e.tournament), e.addChild(e.shop)
}

function purchaseCoins(e, t) {
    return function () {
        try {
            cards.purchase && cards.purchase(e, {
                coins: t
            }, function (e) {
                if (!e) return;
                try {
                    game.coins.addCoins(t), cards.purchase.complete(e.transactionId)
                } catch (n) {
                    console.log(n)
                }
            })
        } catch (n) {
            console.log(n)
        }
    }
}(function (e) {
    if (e.cards) throw Error("picard is already initialized");
    var t = {};
    t.enabled = !1, t.version = "0.10.0", t._ = {}, e.cards = t
})(window),

function () {
    Object.keys || (Object.keys = function (e) {
        var t = [];
        for (var n in e) t.push(n);
        return t
    }), Array.isArray || (Array.isArray = function (e) {
        return Object.prototype.toString.call(e) == "[object Array]"
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function (e, t) {
        for (var n = t || 0, r = this.length; n < r; n++)
            if (n in this && this[n] === e) return n;
        return -1
    }), Array.prototype.forEach || (Array.prototype.forEach = function (e, t) {
        for (var n = 0, r = this.length; n < r; n++) n in this && e.call(t, this[n], n, this)
    }), Array.prototype.map || (Array.prototype.map = function (e, t) {
        var n = this.length,
            r = new Array(n);
        for (var i = 0; i < n; i++) i in this && (r[i] = e.call(t, this[i], i, this));
        return r
    }), Array.prototype.filter || (Array.prototype.filter = function (e, t) {
        var n = [];
        for (var r, i = 0, s = this.length; i < s; i++) r = this[i], i in this && e.call(t, r, i, this) && n.push(r);
        return n
    }), Array.prototype.reduce || (Array.prototype.reduce = function (e, t) {
        var n = 0,
            r = this.length;
        typeof t == "undefined" && (t = this[0], n = 1);
        for (; n < r; n++) n in this && (t = e(t, this[n], n, this));
        return t
    }), String.prototype.trim || (String.prototype.trim = function () {
        var e = /^\s+|\s+$/g;
        return function () {
            return String(this).replace(e, "")
        }
    }())
}(), typeof document != "undefined" && !("classList" in document.createElement("a")) && function (e) {
    var t = "classList",
        n = "prototype",
        r = (e.HTMLElement || e.Element)[n],
        i = Object,
        s = String[n].trim || function () {
            return this.replace(/^\s+|\s+$/g, "")
        }, o = Array[n].indexOf || function (e) {
            var t = 0,
                n = this.length;
            for (; t < n; t++)
                if (t in this && this[t] === e) return t;
            return -1
        }, u = function (e, t) {
            this.name = e, this.code = DOMException[e], this.message = t
        }, a = function (e, t) {
            if (t === "") throw new u("SYNTAX_ERR", "An invalid or illegal string was specified");
            if (/\s/.test(t)) throw new u("INVALID_CHARACTER_ERR", "String contains an invalid character");
            return o.call(e, t)
        }, f = function (e) {
            var t = s.call(e.className),
                n = t ? t.split(/\s+/) : [],
                r = 0,
                i = n.length;
            for (; r < i; r++) this.push(n[r]);
            this._updateClassName = function () {
                e.className = this.toString()
            }
        }, l = f[n] = [],
        c = function () {
            return new f(this)
        };
    u[n] = Error[n], l.item = function (e) {
        return this[e] || null
    }, l.contains = function (e) {
        return e += "", a(this, e) !== -1
    }, l.add = function (e) {
        e += "", a(this, e) === -1 && (this.push(e), this._updateClassName())
    }, l.remove = function (e) {
        e += "";
        var t = a(this, e);
        t !== -1 && (this.splice(t, 1), this._updateClassName())
    }, l.toggle = function (e) {
        e += "", a(this, e) === -1 ? this.add(e) : this.remove(e)
    }, l.toString = function () {
        return this.join(" ")
    };
    if (i.defineProperty) {
        var h = {
            get: c,
            enumerable: !0,
            configurable: !0
        };
        try {
            i.defineProperty(r, t, h)
        } catch (p) {
            p.number === -2146823252 && (h.enumerable = !1, i.defineProperty(r, t, h))
        }
    } else i[n].__defineGetter__ && r.__defineGetter__(t, c)
}(self),

function (e, t, n) {
    function s(e) {
        if (typeof e != "function") throw TypeError("log listener must be a function, got " + e);
        i.push(e)
    }

    function o(e, t) {
        if (r) return;
        r = !0, i.forEach(function (n) {
            try {
                n(e, t)
            } catch (r) {}
        }), r = !1
    }

    function u() {
        var t = e.console;
        typeof t != "object" && (t = {}), t.log = a(t.log, "log"), t.warn = a(t.warn, "warn"), t.error = a(t.error, "error"), f(), e.console = t
    }

    function a(t, n) {
        switch (typeof t) {
        case "undefined":
            t = function () {};
        case "function":
            break;
        default:
            return t
        }
        return function () {
            var r = Array.prototype.map.call(arguments, function (t) {
                if (typeof t == "object" && t !== null && e.JSON && JSON.stringify) try {
                    return JSON.stringify(t)
                } catch (n) {}
                return t + ""
            }).join(" ");
            o(n, r), t.apply(this, arguments)
        }
    }

    function f() {
        if (!e.addEventListener) return;
        e.addEventListener("error", function (e) {
            o("exception", e.message + "")
        }, !1)
    }
    var r = !1,
        i = [];
    u(), n._.onLog = s
}(window, document, cards),

function (e, t, n) {
    var r = {};
    n.utils = r, r.error = function (t) {
        e.console && e.console.error && (typeof t == "object" && t.stack ? e.console.error(t.stack) : e.console.error(t + ""))
    }, r.platform = {}, r.platform.os = function () {
        var t = e.navigator.userAgent,
            n, r, i;
        if (i = /\bCPU.*OS (\d+(_\d+)?)/i.exec(t)) n = "ios", r = i[1].replace("_", ".");
        else if (i = /\bAndroid (\d+(\.\d+)?)/.exec(t)) n = "android", r = i[1];
        else if (i = /\bWindows Phone OS (\d+(\.\d+)?)/.exec(t)) n = "winphone", r = i[1];
        else if (i = /\bMac OS X (\d+(_\d+)?)/.exec(t)) n = "osx", r = i[1].replace("_", ".");
        else if (i = /\bWindows NT (\d+(.\d+)?)/.exec(t)) n = "windows", r = i[1];
        else if (i = /\bLinux\b/.exec(t)) n = "linux", r = null;
        else if (i = /\b(Free|Net|Open)BSD\b/.exec(t)) n = "bsd", r = null;
        var s = {
            name: n,
            version: r && e.parseFloat(r),
            versionString: r
        };
        return s[n] = !0, s
    }(), r.platform.browser = function () {
        var t = e.navigator.userAgent,
            n, i, s;
        if (s = /\bMSIE (\d+(\.\d+)?)/i.exec(t)) n = "msie", i = s[1];
        else if (s = /\bOpera\/(\d+(\.\d+)?)/i.exec(t)) {
            n = "opera", i = s[1];
            if (s = /\bVersion\/(\d+(\.\d+)?)/i.exec(t)) i = s[1]
        } else if (s = /\bChrome\/(\d+(\.\d+)?)/i.exec(t)) n = "chrome", i = s[1];
        else if (t.indexOf("Safari/") != -1 && (s = /\bVersion\/(\d+(\.\d+)?)/i.exec(t))) r.platform.os.android ? n = "android" : n = "safari", i = s[1];
        else if (s = /\bFirefox\/(\d+(\.\d+)?)/i.exec(t)) n = "firefox", i = s[1];
        var o = {
            name: n,
            version: i && e.parseFloat(i),
            versionString: i
        };
        return o[n] = !0, o
    }(), r.platform.engine = function () {
        var t = e.navigator.userAgent,
            n, r, i;
        if (i = /\bTrident\/(\d+(\.\d+)?)/i.exec(t)) n = "trident", r = i[1];
        else if (i = /\bMSIE 7/i.exec(t)) n = "trident", r = "3.1";
        else if (i = /\bPresto\/(\d+(\.\d+)?)/i.exec(t)) n = "presto", r = i[1];
        else if (i = /\bAppleWebKit\/(\d+(\.\d+)?)/i.exec(t)) n = "webkit", r = i[1];
        else if (i = /\brv\:(\d+(\.\d+)?)/i.exec(t)) n = "gecko", r = i[1];
        var s = {
            name: n,
            version: r && e.parseFloat(r),
            versionString: r
        };
        return s[n] = !0, s
    }(), r.random = {}, r.random.name = function (e) {
        return ("____" + (e || "") + "____" + Math.random()).replace(/\.|\-/g, "")
    }, r.random.num = function () {
        return Math.floor(Math.random() * 0x40000000000000 - 9007199254740992)
    }, r.random.uuid = function () {
        var e = 36,
            t = new Array(e),
            n = "0123456789abcdef",
            r;
        for (r = 0; r < e; r++) t[r] = Math.floor(Math.random() * 16);
        t[14] = 4, t[19] = t[19] & 3 | 8;
        for (r = 0; r < e; r++) t[r] = n[t[r]];
        return t[8] = t[13] = t[18] = t[23] = "-", t.join("")
    }, r.enumerate = function (e) {
        typeof e != "object" && (e = Array.prototype.slice.call(arguments));
        var t = {};
        for (var n = 0, r = e.length; n < r; n++) t[e[n]] = n;
        return t
    }, r.preloadImage = function () {
        function t() {
            var e = arguments;
            cards.ready(function () {
                n.apply(r, e)
            })
        }

        function n(t, n) {
            function s(n) {
                if (i) return;
                i = !0;
                var r = e[t];
                e[t] = n;
                for (var s, o = 0, u = r.length; o < u; o++) s = r[o], s && s(n)
            }
            if (typeof t != "string") {
                r.asyncJoin(t.map(function (e) {
                    return function (t) {
                        r.preloadImage(e, t)
                    }
                }), n || function () {});
                return
            }
            if (e[t] === !0) {
                n && setTimeout(function () {
                    n(!0)
                }, 0);
                return
            }
            if (e[t]) {
                e[t].push(n);
                return
            }
            e[t] = [n];
            var i = !1,
                o = new Image;
            o.onload = function () {
                s(!0)
            }, o.onerror = function () {
                s(!1)
            }, o.src = t
        }
        var e = {};
        return t
    }(), r.url = {}, r.url.dir = function () {
        var t = /\/[^\/]*$/;
        return function (n) {
            switch (typeof n) {
            case "undefined":
                n = e.location.href;
            case "string":
                break;
            default:
                throw TypeError("url " + n + " must be string if defined")
            }
            return n = (n.split("?")[0] || "").split("#")[0] || "", n.replace(t, "/")
        }
    }(), r.url.host = function () {
        var t = /^https?\:\/\/([^\/]+)\/.*$/;
        return function (n) {
            switch (typeof n) {
            case "undefined":
                return e.location.host;
            case "string":
                break;
            default:
                throw TypeError("url " + n + " must be string if defined")
            }
            var r = t.exec(n);
            return r && r[1]
        }
    }(), r.url.path = function () {
        var t = /^https?\:\/\/[^\/]+(\/.*)$/;
        return function (n) {
            switch (typeof n) {
            case "undefined":
                return e.location.pathname;
            case "string":
                break;
            default:
                throw TypeError("url " + n + " must be string if defined")
            }
            var r = t.exec(n);
            return r && r[1]
        }
    }(), r.url.dataToQuery = function () {
        var e = /%20/g;
        return function (t) {
            var n = [],
                r, i, s;
            for (var o in t) r = t[o], r !== null && r !== undefined && (i = encodeURIComponent(o), s = encodeURIComponent(r), n.push(i + "=" + s));
            return n.join("&").replace(e, "+")
        }
    }(), r.url.queryToData = function () {
        var e = /([^&=]+)=([^&]+)/g,
            t = /\+/g;
        return function (n) {
            var r = {}, i, s, o;
            if (n) {
                n = n.replace(t, "%20");
                while (i = e.exec(n)) s = decodeURIComponent(i[1]), o = decodeURIComponent(i[2]), r[s] = o
            }
            return r
        }
    }(), r.url.withQuery = function (t, n) {
        n || (n = t, t = e.location.href), t = t.split("?")[0];
        var i = r.url.dataToQuery(n);
        return i && (t += "?" + i), t
    }, r.url.updateQuery = function (t, n) {
        n || (n = t, t = e.location.href);
        var i = r.url.parseQuery(t);
        return r.obj.extend(i, n), r.url.withQuery(t, i)
    }, r.url.parseQuery = function (t) {
        return t = t || e.location.href, r.url.queryToData(t.split("?")[1])
    }, r.url.query = r.url.parseQuery(), r.jsonp = function (n) {
        function y() {
            e[o] = s;
            try {
                m.parentNode.removeChild(g)
            } catch (t) {}
        }

        function w() {
            if (i) return;
            y(), c = s, h = s, p(), p = s, v(), v = s
        }
        var i = !1,
            s = function () {}, o = r.random.name("PICARD_UTILS_JSONP_CALLBACK"),
            u = n.url,
            f = r.obj.copy(n.data),
            l = n.callbackName || "callback",
            c = n.callback || s,
            h = n.success || s,
            p = n.error || s,
            v = n.complete || s,
            m = t.getElementsByTagName("script")[0],
            g = t.createElement("script");
        f[l] = "window." + o, g.type = "text/javascript", g.async = !0, g.onerror = w, g.src = r.url.updateQuery(u, f), e[o] = function () {
            i = !0, y(), c.apply(this, arguments), c = s, h.apply(this, arguments), h = s, p = s, v(), v = s
        }, n.timeout && setTimeout(w, n.timeout), m.parentNode.insertBefore(g, m)
    }, r.asyncJoin = function (t, n) {
        function u() {
            if (s !== 0 || i) return;
            i = !0, setTimeout(function () {
                r ? n.call(e, o) : n.apply(e, o)
            }, 0)
        }
        var r = !0;
        Array.isArray(t) || (r = !1, t = Array.prototype.slice.call(arguments), n = t.pop());
        var i = !1,
            s = t.length,
            o = new Array(s);
        if (s === 0) {
            u();
            return
        }
        t.forEach(function (e, t) {
            setTimeout(function () {
                var n = !1;
                e(function () {
                    if (n) return;
                    n = !0;
                    if (o[t]) return;
                    var e = Array.prototype.slice.call(arguments);
                    o[t] = e, s--, u()
                })
            }, 0)
        })
    }, r.obj = {}, r.obj.extend = function (e, t) {
        for (var n in t) val1 = e[n], val2 = t[n], val1 !== val2 && (e[n] = val2);
        return e
    }, r.obj.copy = function (e) {
        return r.obj.extend({}, e)
    }, r.obj.forEach = function (e, t, n) {
        for (var r in e) t.call(n, r, e[r], e)
    }, r.obj.inverse = function (e) {
        var t = {};
        for (var n in e) t[e[n]] = n;
        return t
    }, r.obj.values = function (e) {
        var t = [];
        for (var n in e) t.push(e[n]);
        return t
    }, r.obj.has = function (e, t) {
        for (var n in e)
            if (e[n] === t) return !0;
        return !1
    }, r.windowReady = function (n) {
        function r() {
            e.removeEventListener("load", r), setTimeout(function () {
                n()
            }, 0)
        }
        if (t.readyState === "complete") {
            setTimeout(function () {
                n()
            }, 0);
            return
        }
        e.addEventListener("load", r, !1)
    }, r.ready = function () {
        function s() {
            if (n) return;
            n = !0;
            for (var e; e = i.shift();) try {
                e()
            } catch (t) {
                r.error(t)
            }
        }

        function o(e) {
            try {
                t.documentElement.doScroll("left")
            } catch (n) {
                setTimeout(function () {
                    o(e)
                }, 1);
                return
            }
            e && e()
        }

        function u(n) {
            if (t.readyState === "complete") {
                setTimeout(n, 0);
                return
            }
            if (t.addEventListener) t.addEventListener("DOMContentLoaded", n, !1), e.addEventListener("load", n, !1);
            else if (t.attachEvent) {
                t.attachEvent("onreadystatechange", n), e.attachEvent("onload", n);
                var r = !1;
                try {
                    r = e.frameElement === null
                } catch (i) {}
                t.documentElement.doScroll && r && setTimeout(function () {
                    o(n)
                }, 0)
            }
        }
        var n = !1,
            i = [];
        return u(s),

        function (e) {
            if (typeof e != "function") throw TypeError("callback " + e + " must be a function");
            n ? setTimeout(function () {
                e()
            }, 0) : i.push(e)
        }
    }()
}(window, document, cards),

function (e, t, n) {
    function r() {
        this.handlers = {}, this.onceHandlers = {}, this.globalHandlers = [], this.globalOnceHandlers = []
    }

    function i(e, t) {
        for (var n = e.length; n--;) e[n] === t && e.splice(n, 1)
    }

    function s(e) {
        typeof e == "undefined" && (e = {});
        var t = new r;
        return e.on = function (n, r) {
            if (Array.isArray(n)) {
                n.forEach(function (t) {
                    e.on(t, r)
                });
                return
            }
            typeof r == "undefined" && (r = n, n = "");
            if (typeof n != "string") throw TypeError("name " + n + " must be a string");
            if (typeof r != "function") throw TypeError("handler " + r + " must be a function");
            n ? t.bind(n, r) : t.bindToAll(r)
        }, e.off = function (n, r) {
            if (Array.isArray(n)) {
                n.forEach(function (t) {
                    e.off(t, r)
                });
                return
            }
            typeof r == "undefined" && (r = n, n = "");
            if (typeof n != "string") throw TypeError("name " + n + " must be a string");
            if (typeof r != "function") throw TypeError("handler " + r + " must be a function");
            n ? t.unbind(n, r) : t.unbindFromAll(r)
        }, e.once = function (n, r) {
            if (Array.isArray(n)) {
                n.forEach(function (t) {
                    e.once(t, r)
                });
                return
            }
            typeof r == "undefined" && (r = n, n = "");
            if (typeof n != "string") throw TypeError("name " + n + " must be a string");
            if (typeof r != "function") throw TypeError("handler " + r + " must be a function");
            n ? t.bindOnce(n, r) : t.bindToAllOnce(r)
        }, e.trigger = function (n, r, i) {
            if (Array.isArray(n)) {
                n.forEach(function (t) {
                    e.trigger(t, r, i)
                });
                return
            }
            if (typeof n != "string") throw TypeError("name " + n + " must be a string");
            t.trigger(n, r, i)
        }, e
    }

    function o() {
        this.handlers = [], this.events = []
    }

    function u() {
        var e = new o;
        return {
            handler: function (t) {
                return e.addHandler(t)
            },
            trigger: function (t) {
                e.triggerEvent(t)
            },
            triggerMulti: function (t) {
                e.triggerEvents(t)
            }
        }
    }
    n.events = s, n.events.handlers = u, r.prototype.insureNamespace = function (e) {
        this.handlers[e] || (this.handlers[e] = []), this.onceHandlers[e] || (this.onceHandlers[e] = [])
    }, r.prototype.bind = function (e, t) {
        this.insureNamespace(e), this.handlers[e].push(t)
    }, r.prototype.bindToAll = function (e) {
        this.globalHandlers.push(e)
    }, r.prototype.bindOnce = function (e, t) {
        this.insureNamespace(e), this.onceHandlers[e].push(t)
    }, r.prototype.bindToAllOnce = function (e) {
        this.globalOnceHandlers.push(e)
    }, r.prototype.unbind = function (e, t) {
        this.insureNamespace(e), i(this.handlers[e], t), i(this.onceHandlers[e], t)
    }, r.prototype.unbindFromAll = function (e) {
        i(this.globalHandlers, e), i(this.globalOnceHandlers, e);
        for (var t in this.handlers) i(this.handlers[t], e), i(this.onceHandlers[t], e)
    }, r.prototype.trigger = function (e, t, r) {
        function i(i) {
            try {
                i.call(r, t, e)
            } catch (s) {
                n.utils.error(s)
            }
        }
        this.insureNamespace(e), typeof r == "undefined" && (r = this), this.handlers[e].forEach(i), this.globalHandlers.forEach(i), this.onceHandlers[e].forEach(i), this.globalOnceHandlers.forEach(i), this.onceHandlers[e].splice(0), this.globalOnceHandlers.splice(0)
    }, o.prototype.addHandler = function (e) {
        return this.handlers.push(e), this.processEvents()
    }, o.prototype.triggerEvent = function (e) {
        this.events.push(e), this.processEvents()
    }, o.prototype.triggerEvents = function (e) {
        this.events = this.events.concat(e), this.processEvents()
    }, o.prototype.processEvents = function () {
        if (!this.events.length || !this.handlers.length) return;
        var e = this.events.splice(0),
            t = this.handlers;
        return e.forEach(function (e) {
            t.forEach(function (t) {
                t(e)
            })
        }), !0
    }
}(window, document, cards), cards.ready = function (e, t) {
    function r(e) {
        n ? n.push(e) : s(e)
    }

    function i() {
        t.utils.windowReady(function () {
            setTimeout(function () {
                var e = n.slice();
                n = null, e.forEach(s)
            }, 3)
        })
    }

    function s(e) {
        try {
            e()
        } catch (n) {
            t.utils.error(n)
        }
    }
    var n = [];
    return i(), r
}(window, cards), cards.open = function (e, t) {
    function i(n, r) {
        if (typeof n != "string") throw TypeError("url must be a string, got " + n);
        switch (typeof r) {
        case "object":
            r = JSON.stringify(r);
        case "undefined":
        case "string":
            break;
        default:
            throw TypeError("linkData must be a string of JSON if defined, got " + r)
        }
        if (t.browser && t.browser.open) {
            t.browser.open(n, r);
            return
        }
        r && (n = n.split("#")[0] + "#" + encodeURIComponent(r));
        var i = n.substr(0, 7) === "card://",
            o = n.substr(0, 8) === "cards://";
        if (!i && !o) {
            e.location.href = n;
            return
        }
        s(n, "http" + n.substr(4))
    }

    function s(t, i) {
        if (!n.ios && !n.android) {
            i && (e.location.href = i);
            return
        }
        if (n.ios || r.chrome) {
            i && setTimeout(function () {
                document.webkitHidden || (e.location.href = i)
            }, n.ios ? 25 : 1e3), e.location.href = t;
            return
        }
        var s;
        i && (s = setTimeout(function () {
            e.location = i
        }, 1e3));
        var o = document.createElement("iframe");
        o.style.position = "fixed", o.style.top = "0", o.style.left = "0", o.style.width = "1px", o.style.height = "1px", o.style.border = "none", o.style.opacity = "0", o.onload = function () {
            i && clearTimeout(s);
            try {
                document.documentElement.removeChild(o)
            } catch (e) {}
        }, o.src = t, document.documentElement.appendChild(o)
    }
    var n = t.utils.platform.os,
        r = t.utils.platform.browser;
    return e.open = function (e) {
        i(e)
    }, i.card = s, i
}(window, cards),

function (e, t) {
    var n = "__PICARD_ID__";
    if (!e.localStorage) return;
    e.localStorage[n] || (e.localStorage[n] = t.utils.random.uuid()), t._.id = e.localStorage[n]
}(window, cards),

function (window, document, picard) {
    function validateBridge() {
        return os.android ? validateAndroidBridge() : os.ios ? validateIPhoneBridge() : !1
    }

    function validateAndroidBridge() {
        return androidBridge ? typeof androidBridge.invokeFunction != "function" ? !1 : typeof androidBridge.poll != "function" ? !1 : makeBridgeCall(PLUGIN_REQUEST_VERSION).data : !1
    }

    function validateIPhoneBridge() {
        var e;
        try {
            e = makeBridgeCall(PLUGIN_REQUEST_VERSION).data
        } catch (t) {}
        return e ? e : !1
    }

    function sendIFrameSignal(e, t, n) {
        var r = picard.utils.random.name("PICARD_BRIDGE_CALLBACK"),
            i, s;
        window[r] = function (e, t) {
            delete window[r], i = e, s = t
        };
        var o = BRIDGE_SIGNAL_URL + e + "/" + r + "?args=" + encodeURIComponent(t) + "&async=" + (n || ""),
            u = document.documentElement,
            a = document.createElement("iframe");
        a.style.display = "none", a.src = o, u.appendChild(a), u.removeChild(a);
        if (window[r]) throw delete window[r], Error("bridge call " + e + " failed to return");
        return {
            status: i,
            data: s
        }
    }

    function sendBatchIFrameSignal(e) {
        var t = e.map(function (e) {
            return encodeURIComponent(e)
        }).join(","),
            n = BRIDGE_SIGNAL_URL + PLUGIN_REQUEST_BATCH + "?calls=" + t,
            r = document.documentElement,
            i = document.createElement("iframe");
        i.style.display = "none", i.src = n, r.appendChild(i), r.removeChild(i)
    }

    function androidBridgeCall(e, t, n) {
        var r, i;
        if (!n) r = androidBridge.invokeFunction(e, t);
        else {
            if (!androidBridge.invokeAsyncFunction) throw TypeError("bridge: android bridge does not support async callbacks");
            r = androidBridge.invokeAsyncFunction(e, t, n)
        }
        try {
            i = JSON.parse(r)
        } catch (s) {
            throw TypeError("bridge call for " + e + " responded with invalid JSON")
        }
        return {
            status: i.status,
            data: i.data
        }
    }

    function makeBridgeCall(e, t, n) {
        if (typeof e != "string") throw TypeError("bridge call " + e + " must be a string");
        switch (typeof t) {
        case "function":
            n = t, t = undefined;
        case "undefined":
            t = {};
        case "object":
            break;
        default:
            throw TypeError("bridge call arguments " + t + " must be a JSON object if specified")
        }
        switch (typeof n) {
        case "undefined":
        case "function":
            break;
        default:
            throw TypeError("bridge async callback must be a function if defined, got " + n)
        }
        var r;
        try {
            r = JSON.stringify(t)
        } catch (i) {
            throw TypeError("bridge call arguments " + t + " must be a JSON object")
        }
        var s;
        n && (s = setupAsyncCallback(n));
        var o;
        return androidBridge ? o = androidBridgeCall(e, r, s) : o = sendIFrameSignal(e, r, s), s && (!o || !o.status || o.status !== 202) && delete window[s], o
    }

    function setupAsyncCallback(e) {
        var t = picard.utils.random.name("PICARD_BRIDGE_ASYNC_CALLBACK");
        return window[t] = function (n, r) {
            delete window[t];
            if (androidBridge) try {
                var i = JSON.parse(n);
                n = i.status, r = i.data
            } catch (s) {
                throw Error("bridge failed to parse android async data, " + n)
            }
            typeof r != "object" || r === null ? e() : !n || n < 200 || n >= 300 ? e() : e(r)
        }, t
    }

    function setupEventCallback(e) {
        var t = picard.utils.random.name("PICARD_BRIDGE_EVENT_CALLBACK");
        return window[t] = function (t, n) {
            if (androidBridge) try {
                n = JSON.parse(n)
            } catch (r) {
                throw Error("bridge failed to parse android event data, " + n)
            }
            e(t, n)
        }, t
    }

    function setupAndroidPoll() {
        window.addEventListener("keyup", function (e) {
            if (e.which !== 0) return;
            return performAndroidPoll(), !1
        })
    }

    function performAndroidPoll() {
        var code = androidBridge.poll() + "";
        if (!code) return;
        try {
            eval(code)
        } catch (err) {
            window.console && window.console.error && window.console.error("android poll failed to evaluate " + code + ", " + err)
        }
        performAndroidPoll()
    }

    function setupIOSLogging() {
        picard._.onLog(function (e, t) {
            makeBridgeCall(PLUGIN_LOG, {
                level: e,
                message: t
            })
        })
    }

    function bridgeFunctionCall(e, t, n) {
        var r = makeBridgeCall(e, t, n);
        if (!r) throw Error("bridge call " + e + " did not return");
        if (!r.status || r.status < 200 || r.status >= 300) throw Error("bridge call " + e + " did not complete successfully, " + r.status);
        if (typeof r.data != "object") throw TypeError("bridge call " + e + " did not return an object, " + r.data);
        return r.data
    }

    function setupFunction(e) {
        return function (t, n) {
            return bridgeFunctionCall(e, t, n)
        }
    }

    function setupFunctions(e, t, n) {
        if (!Array.isArray(t)) throw TypeError("functions " + t + " must be an array");
        typeof n == "undefined" && (n = {}), t.forEach(function (t) {
            if (typeof t != "string") throw TypeError("function " + t + " must be a string");
            n[t] = setupFunction(e + "." + t)
        })
    }

    function setupPlugin(e) {
        var t = picard.events(),
            n = makeBridgeCall(PLUGIN_REQUEST_NAME, {
                name: e,
                eventCallback: setupEventCallback(t.trigger)
            });
        if (n.status !== 200) throw TypeError("plugin " + e + " failed to initialize");
        return setupFunctions(e, n.data.functions, t), t
    }

    function bridge(e) {
        if (typeof e != "string") throw TypeError("plugin name must be a string, got " + e);
        if (!plugins[e]) {
            var t = setupPlugin(e);
            plugins[e] = t
        }
        return plugins[e]
    }

    function batchRequest(e) {
        if (!Array.isArray(e)) throw TypeError("batch calls must be an array, got " + e);
        e.forEach(function (e) {
            if (typeof e != "object") throw TypeError("batch call must be an object, got " + e);
            if (typeof e.name != "string") throw TypeError("batch call name must be a string, got " + e.name);
            switch (typeof e.args) {
            case "undefined":
            case "object":
                break;
            default:
                throw TypeError("batch call args must be an object if defined, got " + e.args)
            }
            switch (typeof e.callback) {
            case "function":
            case "undefined":
                break;
            default:
                throw TypeError("batch call callback must be a function if defined, got " + e.callback)
            }
        });
        if (androidBridge) return e.map(function (e) {
            try {
                return e.name.indexOf(".") === -1 ? bridge(e.name) : bridgeFunctionCall(e.name, e.args, e.callback)
            } catch (t) {}
        });
        var t = [],
            n = new Array(e.length);
        return e.forEach(function (e, r) {
            var i = e.name.indexOf(".") === -1;
            i ? plugins[e.name] ? n[r] = plugins[e.name] : t.push(generatePluginBatchSegment(e, function (e) {
                n[r] = e
            })) : t.push(generateBatchSegment(e, function (e) {
                n[r] = e
            }))
        }), sendBatchIFrameSignal(t), n
    }

    function generateBatchSegment(e, t) {
        var n = JSON.stringify(e.args),
            r;
        e.callback && (r = setupAsyncCallback(e.callback));
        var i = picard.utils.random.name("PICARD_BRIDGE_CALLBACK");
        setTimeout(function () {
            delete window[i]
        }, 0), window[i] = function (e, n) {
            delete window[i], r && e !== 202 && delete window[r], e >= 200 && e < 300 && t(n)
        };
        var s = BRIDGE_SIGNAL_URL + e.name + "/" + i + "?args=" + encodeURIComponent(n) + "&async=" + (r || "");
        return s
    }

    function generatePluginBatchSegment(e, t) {
        var n = picard.events(),
            r = JSON.stringify({
                name: e.name,
                eventCallback: setupEventCallback(n.trigger)
            }),
            i = picard.utils.random.name("PICARD_BRIDGE_CALLBACK");
        setTimeout(function () {
            delete window[i]
        }, 0), window[i] = function (r, s) {
            delete window[i], r === 200 && (setupFunctions(e.name, s.functions, n), plugins[e.name] = n, t(n))
        };
        var s = BRIDGE_SIGNAL_URL + PLUGIN_REQUEST_NAME + "/" + i + "?args=" + encodeURIComponent(r) + "&async=";
        return s
    }

    function redirectToCards() {
        var e = picard.utils.platform.os,
            t = picard.utils.url;
        if (!t.query.kikme || !e.ios && !e.android) return;
        try {
            var n = document.createElement("iframe");
            n.src = "card" + t.updateQuery({
                kikme: null
            }).substr(4), n.style.display = "none";
            var r = function () {
                try {
                    document.documentElement.removeChild(n)
                } catch (e) {}
            };
            n.onload = r, n.onerror = r, setTimeout(r, 1e3), document.documentElement.appendChild(n)
        } catch (i) {}
    }

    function main() {
        var e = validateBridge();
        if (!e) {
            redirectToCards();
            return
        }
        picard._.bridge = bridge, picard._.bridge.batch = batchRequest, androidBridge ? (setupAndroidPoll(), picard._.bridge.forceAndroidPoll = performAndroidPoll) : setupIOSLogging(), picard.enabled = !0, bridge.info = e, bridge.version = e.version, picard.utils.platform.browser.name = "cards", picard.utils.platform.browser.cards = !0, picard.utils.platform.browser.version = window.parseFloat(bridge.version), picard.utils.platform.browser.versionString = bridge.version
    }
    var BRIDGE_SIGNAL_URL = window.location.protocol + "//cardsbridge.kik.com/",
        PLUGIN_REQUEST_BATCH = "batch-call",
        PLUGIN_REQUEST_NAME = "requestPlugin",
        PLUGIN_REQUEST_VERSION = "requestVersion",
        PLUGIN_LOG = "log",
        plugins = {}, os = picard.utils.platform.os,
        androidBridge = window.CardsBridge;
    main()
}(window, document, cards),

function (e) {
    var t = {};
    e._.firstBatch = t;
    if (!e._.bridge || !e.utils.platform.os.ios || e.utils.platform.browser.version < 6.5) return;
    var n = [{
        name: "Metrics"
    }, {
        name: "Browser"
    }, {
        name: "Media"
    }, {
        name: "Kik"
    }, {
        name: "Profile"
    }, {
        name: "UserData"
    }, {
        name: "Auth"
    }, {
        name: "Photo"
    }, {
        name: "Keyboard"
    }, {
        name: "Push"
    }, {
        name: "Picker"
    }],
        r = [{
            name: "Browser.getLastLinkData",
            args: {}
        }, {
            name: "Kik.getLastMessage",
            args: {}
        }, {
            name: "Push.getNotificationList",
            args: {}
        }, {
            name: "Push.setBadgeVisibility",
            args: {
                visible: !1
            }
        }, {
            name: "Picker.getRequest",
            args: {}
        }];
    e._.bridge.batch(n.concat(r)).slice(n.length).forEach(function (n, i) {
        var s = r[i];
        t[s.name] = n, !n || e._.secondBatch || (e._.secondBatch = [])
    })
}(cards),

function (e, t) {
    function r() {
        var r = !0;
        return t.enabled ? t.utils.platform.os.android ? Array.prototype.forEach.call(e.getElementsByTagName("meta"), function (e) {
            e.name === n && e.content === "false" && (r = !1)
        }) : r = !1 : r = !1, r
    }

    function i() {
        var t = e.documentElement;
        s(t, "translate3d(0,0,0)"), setTimeout(function () {
            o(t, "transform 10ms linear"), setTimeout(function () {
                s(t, "translate3d(0,0,1px)"), setTimeout(function () {
                    o(t, ""), setTimeout(function () {
                        s(t, "")
                    }, 0)
                }, 10)
            }, 0)
        }, 0)
    }

    function s(e, t) {
        e.style["-webkit-transform"] = t, e.style["-moz-transform"] = t, e.style["-ms-transform"] = t, e.style["-o-transform"] = t, e.style.transform = t
    }

    function o(e, t) {
        t ? (e.style["-webkit-transition"] = "-webkit-" + t, e.style["-moz-transition"] = "-moz-" + t, e.style["-ms-transition"] = "-ms-" + t, e.style["-o-transition"] = "-o-" + t, e.style.transition = t) : (e.style["-webkit-transition"] = "", e.style["-moz-transition"] = "", e.style["-ms-transition"] = "", e.style["-o-transition"] = "", e.style.transition = "")
    }
    var n = "kik-transform-fix";
    r() && i()
}(document, cards),

function (e, t) {
    function u() {
        if (o) return;
        o = !0, n && (f("loadTime"), f("coverTime"));
        if (cards.kik && cards.kik.hasPermission) {
            var e;
            try {
                e = cards.kik.hasPermission()
            } catch (t) {}
            typeof e == "boolean" && a("linked", e ? 1 : 0)
        }
        var r = s.slice();
        s = null, r.forEach(function (e) {
            a(e[0], e[1], e[2])
        })
    }

    function a(t, n, r) {
        if (s) {
            s.push([t, n, r]);
            return
        }
        switch (typeof n) {
        case "number":
            r = n, n = undefined;
        case "undefined":
        case "string":
            break;
        default:
            return !1
        }
        switch (typeof r) {
        case "number":
            r = Math.floor(r);
        case "undefined":
            break;
        default:
            return !1
        }
        return typeof n == "undefined" && typeof r == "undefined" ? !1 : (e._gaq || (e._gaq = []), e._gaq.push ? (e._gaq.push(["_trackEvent", "Cards", t, n, r, !0]), !0) : !1)
    }

    function f(e) {
        a(e, i[e]), i.on(e, function () {
            a(e, i[e])
        })
    }
    var n;
    try {
        n = t._.bridge("Metrics")
    } catch (r) {}
    var i = t.events(),
        s = [];
    t.metrics = i, i.loadTime = null, i.coverTime = null, n && n.on("loadData", function (e) {
        typeof e.loadTime == "number" && (i.loadTime = e.loadTime, i.trigger("loadTime", e.loadTime)), typeof e.coverTime == "number" && (i.coverTime = e.coverTime, i.trigger("coverTime", e.coverTime))
    });
    var o = !1;
    i.enableGoogleAnalytics = u, i.logEvent = a
}(window, cards),

function (e, t, n) {
    function r(t, n) {
        function o() {
            if (i) return;
            i = !0, !t && e.console && e.console.log && (e.console.log("refresh requested but no update to manifest found"), e.console.log("** update your manifest to see changes reflected")), setTimeout(function () {
                n(!0)
            }, 1e3)
        }

        function u() {
            if (i) return;
            i = !0;
            var e = !1;
            if (r.status === r.UPDATEREADY) try {
                r.swapCache(), e = !0
            } catch (t) {}
            n(e)
        }
        var r = e.applicationCache,
            i = !1;
        if (!r || !r.addEventListener || !r.swapCache || !r.update) {
            n(!1);
            return
        }
        if (r.status === r.UPDATEREADY) {
            u();
            return
        }
        if (r.status !== r.IDLE && r.status !== r.CHECKING && r.status !== r.DOWNLOADING) {
            n(!1);
            return
        }
        r.addEventListener("noupdate", o, !1), r.addEventListener("updateready", u, !1), r.addEventListener("error", u, !1), r.addEventListener("obsolete", u, !1), setTimeout(u, 3e4);
        if (r.status === r.IDLE) try {
            r.update()
        } catch (s) {
            u()
        }
    }

    function i(e) {
        if (typeof e != "string") return undefined;
        e = decodeURIComponent(e);
        var t;
        try {
            t = JSON.parse(e)
        } catch (n) {}
        return typeof t == "object" && t !== null ? t : e || undefined
    }

    function m(e, t) {
        u.linkData = i(e && e.data), n.linkData = u.linkData, t !== !1 && u.linkData && u.trigger("linkData", u.linkData)
    }

    function w() {
        return y || b
    }

    function E() {
        var e = g;
        g = w(), u.background = g, e !== g && u.trigger(g ? "background" : "foreground")
    }
    n.utils.platform.os.ios && setTimeout(function () {
        r(!0, function (e) {})
    }, 5e3), e.ZERVER_REFRESH = function () {
        r(!0, function () {
            e.location.reload()
        })
    }, e.location.hash && (n.linkData = i(e.location.hash.substr(1)));
    var s;
    try {
        s = n._.bridge("Browser")
    } catch (o) {
        return
    }
    var u = n.events();
    n.browser = u;
    var a = {};
    if (s.setCardInfo) {
        var f = /(^|\s)icon(\s|$)/i,
            l, c;
        Array.prototype.forEach.call(t.getElementsByTagName("link"), function (e) {
            !l && (e.rel === "kik-icon" || f.test(e.rel) && !l) && (l = e.href), c || e.rel === "kik-tray-icon" && (c = e.href)
        });
        var h = {
            title: t.title,
            icon: l,
            mediaTrayIcon: c
        };
        cards._.secondBatch ? cards._.secondBatch.push({
            name: "Browser.setCardInfo",
            args: h
        }) : s.setCardInfo(h)
    }
    s.pageLoaded && n.utils.windowReady(function () {
        if (t.body) {
            var e = t.body.offsetWidth;
            (function (e) {
                return e
            })(e)
        }
        setTimeout(function () {
            s.pageLoaded()
        }, 1)
    }), e.addEventListener("beforeunload", function (e) {
        return e.preventDefault(), !1
    }, !1), e.addEventListener("unload", function () {
        s.navigationAttempted && s.navigationAttempted()
    }, !1);
    var p = !0;
    if (s.setStatusBarVisible) {
        var d = !1;
        u.statusBar = function (e) {
            d = !0, s.setStatusBarVisible({
                visible: !! e
            }), p = !! e
        }
    }
    s.getOrientationLock && s.setOrientationLock && (u.getOrientationLock = function () {
        var e = s.getOrientationLock().position;
        return e === "free" ? null : e
    }, u.setOrientationLock = function (e) {
        switch (e) {
        case "free":
        case "portrait":
        case "landscape":
            break;
        default:
            if (!e) {
                e = "free";
                break
            }
            throw TypeError("if defined, position " + e + ' must be one of "free", "portrait", or "landscape"')
        }
        try {
            return s.setOrientationLock({
                position: e
            }), !d && s.setStatusBarVisible && p !== (e !== "landscape") && (s.setStatusBarVisible({
                visible: e !== "landscape"
            }), p = e !== "landscape"), !0
        } catch (t) {
            return !1
        }
    }, e.screen && !e.screen.lockOrientation && (e.screen.lockOrientation = function (e) {
        if (arguments.length > 1) return !1;
        switch (e) {
        case "landscape":
        case "portrait":
            break;
        default:
            return !1
        }
        return u.setOrientationLock(e)
    }, e.screen.unlockOrientation = function () {
        return u.setOrientationLock("free")
    }, e.screen.orientation || (e.screen.orientation = e.innerHeight >= e.innerWidth ? "portrait" : "landscape", s.on("orientationChanged", function (t) {
        e.screen.orientation = t.orientation
    })))), s.on("orientationChanged", function () {
        if (e.App && e.App._layout) try {
            e.App._layout()
        } catch (t) {}
    }), s.setBacklightTimeoutEnabled && (u.backlightTimeout = function (e) {
        s.setBacklightTimeoutEnabled({
            enabled: !! e
        })
    }), s.forceRepaint && (u.paint = function () {
        if (t.body) {
            var e = t.body.offsetWidth;
            (function (e) {
                return e
            })(e)
        }
        s.forceRepaint()
    });
    if (s.handleBack) {
        var v = [];
        u.back = function (e) {
            if (typeof e != "function") throw TypeError("back handler " + e + " must be a function");
            v.push(e)
        }, u.unbindBack = function (e) {
            if (typeof e != "function") throw TypeError("back handler " + e + " must be a function");
            for (var t = v.length; t--;) v[t] === e && v.splice(t, 1)
        }, s.on("back", function (e) {
            var t = !1;
            for (var r = v.length; r--;) try {
                if (v[r]() === !1) {
                    t = !0;
                    break
                }
            } catch (i) {
                n.utils.error(i)
            }
            s.handleBack({
                requestToken: e.requestToken,
                override: t
            })
        }), u.back(function () {
            if (e.App && typeof e.App.back == "function") try {
                if (App.back() !== !1) return !1
            } catch (t) {}
        })
    }
    s.refresh && s.refreshPlanned && (u.refresh = function () {
        var t = e.applicationCache;
        if (!t || t.status === t.UNCACHED) {
            s.refresh({
                withCache: !1
            });
            return
        }
        r(!1, function (e) {
            s.refresh({
                withCache: !0
            })
        })
    }, s.on("refresh", function () {
        setTimeout(function () {
            s.refreshPlanned(), u.refresh()
        }, 0)
    }), e.ZERVER_REFRESH = function () {
        u.refresh()
    }), s.openCard && s.openExternal && (u.open = function (e, t, n) {
        if (typeof e != "string") throw TypeError("url " + e + " must be a string");
        switch (typeof t) {
        case "undefined":
        case "string":
            break;
        case "object":
            t = JSON.stringify(t);
            break;
        default:
            throw TypeError("card linkData must be a string or JSON if defined, got " + t)
        }
        switch (typeof n) {
        case "undefined":
            n = {};
            break;
        case "object":
            break;
        default:
            throw TypeError("card data must be an object if defined, got " + n)
        }
        var r = e.substr(0, 7) === "card://",
            i = e.substr(0, 8) === "cards://";
        if (!r && !i) {
            s.openExternal({
                url: e
            });
            return
        }
        e = "http" + e.substr(4), t && (e = e.split("#")[0] + "#" + encodeURIComponent(t)), s.openCard({
            url: e,
            title: n.title || undefined,
            icon: n.icon || undefined,
            clearHistory: !! n.clearHistory
        })
    }), u._processLinkData = m, s.getLastLinkData && m(cards._.firstBatch["Browser.getLastLinkData"] || s.getLastLinkData(), !1), s.on("linkData", m);
    var g = !0,
        y = !1,
        b = !0;
    u.background = g, s.on("pause", function (e) {
        y = !0, E()
    }), s.on("unpause", function (e) {
        y = !1, E()
    }), s.on("conceal", function (e) {
        b = !0, E()
    }), s.on("reveal", function (e) {
        b = !1, E()
    })
}(window, document, cards),

function (e, t, n) {
    n._.bridge && (e.alert = function () {}, e.confirm = function () {}, e.prompt = function () {})
}(window, document, cards),

function (e, t, n) {
    function s() {
        var e = !1;
        Array.prototype.forEach.call(t.getElementsByTagName("meta"), function (t) {
            t.name === "kik-media-enabled" && t.content === "true" && (e = !0)
        }), o(e)
    }

    function o(e) {
        if (cards._.secondBatch) cards._.secondBatch.push({
            name: "Media." + (e ? "" : "un") + "setMediaCategory",
            args: {}
        });
        else try {
            e ? r.setMediaCategory() : r.unsetMediaCategory()
        } catch (t) {}
    }
    var r;
    try {
        r = n._.bridge("Media")
    } catch (i) {}!r || !r.setMediaCategory || !r.unsetMediaCategory ? n._mediaEnabled = function () {} : (n._mediaEnabled = o, s())
}(window, document, cards),

function (e, t, n) {
    function o(e) {
        var t;
        if (typeof e != "object") throw TypeError("message " + e + " must be an object");
        switch (typeof e.big) {
        case "undefined":
        case "boolean":
            break;
        default:
            throw TypeError("message size (big) " + e.big + " must be a boolean if defined")
        }
        switch (typeof e.title) {
        case "undefined":
        case "string":
            if (!e.big && !e.title) throw TypeError("message title must be a string");
            e.title = e.title || "";
            break;
        default:
            throw TypeError("message title " + e.title + " must be a string")
        }
        switch (typeof e.text) {
        case "string":
        case "undefined":
            break;
        default:
            throw TypeError("message text " + e.text + " must be a string")
        }
        switch (typeof e.pic) {
        case "undefined":
        case "string":
            break;
        default:
            throw TypeError("message pic " + e.pic + " must be a string if defined")
        }
        switch (typeof e.noForward) {
        case "undefined":
        case "boolean":
            break;
        default:
            throw TypeError("message noForward flag must be a boolean if defined, got " + e.noForward)
        }
        switch (typeof e.fallback) {
        case "undefined":
        case "string":
            break;
        default:
            throw TypeError("message fallback URL must be a string if defined, got " + e.fallback)
        }
        switch (typeof e.linkData) {
        case "undefined":
        case "string":
            break;
        case "object":
            try {
                t = JSON.stringify(e.linkData)
            } catch (r) {
                throw TypeError("message linkData must be a string or JSON if defined, got " + e.linkData)
            }
            break;
        default:
            throw TypeError("message linkData must be a string or JSON if defined, got " + e.linkData)
        }
        var i = t || e.linkData;
        typeof i == "string" && (i = encodeURIComponent(i));
        var t;
        switch (typeof e.data) {
        case "object":
            if (e.data !== null) try {
                t = JSON.stringify(e.data)
            } catch (r) {
                throw TypeError("message data must be a json object if defined, got " + e.data)
            };
        case "undefined":
            break;
        default:
            throw TypeError("message data must be a json object if defined, got " + e.data)
        }
        var s;
        return typeof e.data == "object" && e.data !== null && e.data.id && (s = e.data.id + ""), cards.metrics.logEvent("kikSend", s), {
            title: e.title,
            text: e.text,
            image: e.pic,
            forwardable: !e.noForward,
            fallbackUrl: e.fallback,
            layout: e.big ? "photo" : "article",
            extras: {
                sender: n._.id,
                dataID: s,
                messageID: n.utils.random.uuid(),
                linkData: i || "",
                jsonData: t || ""
            }
        }
    }

    function a(e, t) {
        l(), (!e.extras.sender || e.extras.sender !== n._.id) && cards.metrics.logEvent("kikReceive", e.extras.dataID);
        if (e.extras.jsonData) {
            var r;
            try {
                r = JSON.parse(e.extras.jsonData)
            } catch (i) {}
            typeof r == "object" && r !== null && (s.message = r, u.trigger(r), s.trigger("message", r))
        }
        e.extras && e.extras.linkData && n.browser && n.browser._processLinkData && n.browser._processLinkData({
            data: e.extras.linkData
        }, t)
    }

    function l() {
        if (!r.openConversation) return;
        s.returnToConversation = function (e) {
            s.returnToConversation = null;
            if (!e) {
                r.openConversation({
                    returnToSender: !0
                });
                return
            }
            e = o(e), e.returnToSender = !0, r.sendKik(e)
        }
    }
    var r;
    try {
        r = n._.bridge("Kik")
    } catch (i) {
        return
    }
    var s = n.events();
    n.kik = s, s._formatMessage = o, s.send = function (e, t) {
        typeof e != "string" && (t = e, e = undefined), t = o(t), t.targetUser = e, e && r.sendKikToUser ? r.sendKikToUser(t) : r.sendKik(t)
    };
    var u = n.events.handlers();
    s.handler = function (e) {
        return u.handler(e)
    };
    if (r.getLastMessage) {
        var f = cards._.firstBatch["Kik.getLastMessage"] || r.getLastMessage();
        f && f.message && a(f.message, !1)
    }
    r.on("message", a), r.openConversation && (s.open = function () {
        r.openConversation()
    })
}(window, document, cards),

function (e, t, n) {
    var r;
    try {
        r = n._.bridge("Profile")
    } catch (i) {
        return
    }
    var s = n.kik;
    s || (s = n.events(), n.kik = s), r.openProfile && (s.showProfile = function (e) {
        if (typeof e != "string") throw TypeError("username must be a string, got " + e);
        try {
            r.openProfile({
                username: e
            })
        } catch (t) {}
    })
}(window, document, cards),

function (e, t, n) {
    function o(e) {
        e.fullName = e.displayName || "";
        var t = e.fullName.indexOf(" ");
        return t === -1 ? (e.firstName = e.fullName, e.lastName = "") : (e.firstName = e.fullName.substr(0, t), e.lastName = e.fullName.substr(t + 1)), delete e.displayName, e.pic = u(e.pic), e.thumbnail = u(e.thumbnail), e
    }

    function u(e) {
        if (typeof e != "string") return e;
        var t = e.replace(/^https?\:\/\/[^\/]*/, "");
        return "//d33vud085sp3wg.cloudfront.net" + t
    }

    function f(e) {
        if (a) {
            setTimeout(function () {
                e(a)
            }, 0);
            return
        }
        var t = s.hasPermission ? s.hasPermission() : !1;
        r.getUserData({
            fields: ["profile"]
        }, function (r) {
            var i = r && r.userData;
            t || n.metrics.logEvent("link-request", i ? 1 : 0);
            if (!i) {
                e();
                return
            }
            o(i), a = i, e(i)
        })
    }

    function l(e, t) {
        e.minResults = e.minResults || 1, r.pickFilteredUsers({
            minResults: e.minResults,
            maxResults: e.maxResults,
            filtered: e.filtered,
            filterSelf: e.filterSelf
        }, function (n) {
            if (!n || !n.userDataList) {
                t();
                return
            }
            var r = n.userDataList.map(o);
            e.filtered && (r = r.filter(function (t) {
                return e.filtered.indexOf(t.username) === -1
            })), t(r)
        })
    }

    function c(e, t) {
        if (!e.preselected || !e.preselected.length) e.minResults = e.minResults || 1;
        var n = {}, i = [];
        e.preselected.forEach(function (e) {
            n[e.username] = e, i.push(e.username)
        }), r.pickUsers({
            minResults: e.minResults,
            maxResults: e.maxResults,
            preselected: i
        }, function (e) {
            if (!e || !e.userDataList) {
                t();
                return
            }
            var r = e.userDataList.map(function (e) {
                return e.username in n ? n[e.username] : o(e)
            });
            t(r)
        })
    }
    var r;
    try {
        r = n._.bridge("UserData")
    } catch (i) {
        return
    }
    var s = n.kik;
    s || (s = n.events(), n.kik = s);
    var a;
    r.getUserData && (s.getUser = function (e) {
        switch (typeof e) {
        case "undefined":
            e = function () {};
        case "function":
            break;
        default:
            throw TypeError("callback must be a function if defined, got " + e)
        }
        f(e)
    }), r.checkPermissions && (s.hasPermission = function () {
        try {
            return !!r.checkPermissions({
                fields: ["profile"]
            }).permitted
        } catch (e) {
            return !1
        }
    });
    if (r.pickUsers || r.pickFilteredUsers) s.pickUsers = function (e, t) {
        switch (typeof e) {
        case "function":
            t = e;
        case "undefined":
            e = {};
        case "object":
            break;
        default:
            throw TypeError("options must be an object if defined, got " + e)
        }
        if (typeof t != "function") throw TypeError("callback must be a function, got " + t);
        switch (typeof e.preselected) {
        case "undefined":
            e.preselected = [];
            break;
        default:
            if (!Array.isArray(e.preselected)) throw TypeError("preselected users must be an array of users if defined, got " + e.preselected);
            e.preselected.forEach(function (e) {
                if (typeof e != "object") throw TypeError("user must be an object, got " + e);
                if (typeof e.username != "string") throw TypeError("user.username must be a string, got " + e.username)
            })
        }
        switch (typeof e.filtered) {
        case "undefined":
            e.filtered = [];
            break;
        default:
            if (!Array.isArray(e.filtered)) throw TypeError("filtered users must be an array of users if defined, got " + e.filtered);
            e.filtered = e.filtered.map(function (e) {
                switch (typeof e) {
                case "string":
                    return e;
                case "object":
                    if (typeof e.username == "string") return e.username;
                default:
                    throw TypeError("filtered user didnt have a username, got " + e)
                }
            })
        }
        switch (typeof e.filterSelf) {
        case "undefined":
        case "boolean":
            break;
        default:
            throw TypeError("filterSelf must be a boolean if defined, got " + e.filterSelf)
        }
        switch (typeof e.minResults) {
        case "undefined":
            break;
        case "number":
            if (e.minResults < 0) throw TypeError("minResults must be non-negative if defined, got " + e.minResults);
            break;
        default:
            throw TypeError("minResults must be a number if defined, got " + e.minResults)
        }
        switch (typeof e.maxResults) {
        case "undefined":
            break;
        case "number":
            if (e.maxResults < 1) throw TypeError("maxResults must be greater than 1 if defined, got " + e.maxResults);
            break;
        default:
            throw TypeError("maxResults must be a number if defined, got " + e.maxResults)
        }
        switch (typeof t) {
        case "undefined":
            t = function () {};
            break;
        case "function":
            break;
        default:
            throw TypeError("callback must be a function if defined, got " + t)
        }
        if (e.preselected.length && e.filtered.length) throw TypeError("can only preselect or filter users, not both");
        r.pickFilteredUsers && !e.preselected.length ? l(e, t) : c(e, t)
    }
}(window, document, cards),

function (e, t, n) {
    var r;
    try {
        r = n._.bridge("Auth")
    } catch (i) {
        return
    }
    var s = n.kik;
    s || (s = n.events(), n.kik = s), r.signRequest && (s.sign = function (t, n) {
        r.signRequest({
            request: t
        }, function (t) {
            if (!t || !t.signedRequest) {
                n();
                return
            }
            n(t.signedRequest, t.username, t.host || e.location.host)
        })
    })
}(window, document, cards),

function (e, t, n) {
    function o(e, t) {
        switch (typeof t) {
        case "undefined":
        case "function":
            break;
        default:
            throw TypeError(e + " must be a number if defined, got " + t)
        }
    }

    function u(e, t, n, r) {
        switch (typeof t) {
        case "undefined":
            break;
        case "number":
            if (t < n || t > r) throw TypeError(e + " must be within " + n + " and " + r + " if defined, got " + t);
            break;
        default:
            throw TypeError(e + " must be a number if defined, got " + t)
        }
    }

    function a(e, t, i) {
        function y(e) {
            if (h) return;
            h = !0, p = e && e.photoIds;
            var t = p && p.length;
            if (!t) {
                E(a), E(i);
                return
            }
            E(s, t), v = new Array(t), r.on("photo", b)
        }

        function b(e) {
            if (!e) return;
            var t = p.indexOf(e.id);
            if (t === -1) return;
            e.url = e.url || null, p[t] = null, v[t] = e.url;
            var n = 0;
            for (var r = 0, i = p.length; r < i; r++) p[r] !== null && n++;
            E(f, e.url, t), n === 0 && w()
        }

        function w() {
            r.off("photo", b), E(l, v), E(i, v)
        }

        function E(e, t, r) {
            if (!e) return;
            try {
                e(t, r)
            } catch (i) {
                n.utils.error(i)
            }
        }
        typeof e != "string" && (i = t, t = e, e = undefined);
        switch (typeof t) {
        case "function":
            i = t, t = {};
        case "object":
            break;
        default:
            throw TypeError("options must be an object, got " + t)
        }
        o("callback", i), o("onCancel", t.onCancel), o("onSelect", t.onSelect), o("onPhoto", t.onPhoto), o("onComplete", t.onComplete), u("quality", t.quality, 0, 1), u("minResults", t.minResults, 0, 25), u("maxResults", t.maxResults, 1, 25), u("maxHeight", t.maxHeight, 0, 1280), u("maxWidth", t.maxWidth, 0, 1280);
        var s = t.onSelect,
            a = t.onCancel,
            f = t.onPhoto,
            l = t.onComplete,
            h = !1,
            p, v;
        try {
            r.getPhoto({
                source: e,
                quality: t.quality,
                minResults: t.minResults,
                maxResults: t.maxResults,
                maxHeight: t.maxHeight,
                maxWidth: t.maxWidth,
                autoSave: t.saveToGallery
            }, y)
        } catch (m) {
            h || (h = !0, E(a), E(i))
        }
    }
    var r;
    try {
        r = n._.bridge("Photo")
    } catch (i) {
        return
    }
    var s = n.events();
    n.photo = s, r.getPhoto && (s.get = function (e, t) {
        a(e, t)
    }, s.getFromCamera = function (e, t) {
        a("camera", e, t)
    }, s.getFromGallery = function (e, t) {
        a("gallery", e, t)
    }), r.savePhoto && (s.saveToGallery = function (e, t) {
        function i(e) {
            i = function () {}, t(e)
        }
        switch (typeof t) {
        case "undefined":
            t = function () {};
        case "function":
            break;
        default:
            throw TypeError("callback must be a function, got " + t)
        }
        try {
            r.savePhoto({
                url: e
            }, function (e) {
                i( !! e)
            })
        } catch (n) {
            i(!1)
        }
    })
}(window, document, cards),

function (e, t, n) {
    function u() {
        var e;
        Array.prototype.forEach.call(t.getElementsByTagName("meta"), function (t) {
            t.name === s && (e = (t.content || "").trim())
        }), e === "true" && (l(!1), o = !0)
    }

    function a() {
        l(!1)
    }

    function f() {
        l(!0)
    }

    function l(e) {
        if (o) return;
        if (cards._.secondBatch) cards._.secondBatch.push({
            name: "Keyboard.setFormHelpers",
            args: {
                enabled: e
            }
        });
        else try {
            r.setFormNavigationEnabled({
                enabled: e
            })
        } catch (t) {}
    }

    function c() {
        try {
            return !!r.isFormNavigationEnabled().enabled
        } catch (e) {
            return !!n.utils.platform.os.ios
        }
    }
    var r;
    try {
        r = n._.bridge("Keyboard")
    } catch (i) {}
    var s = "kik-hide-form-helpers",
        o = !1;
    u(), n.formHelpers = {
        show: f,
        hide: a,
        isEnabled: c
    }
}(window, document, cards),

function (e, t, n) {
    var r;
    try {
        r = n._.bridge("Push")
    } catch (i) {
        return
    }
    var s = n.events();
    n.push = s, r.setBadgeVisibility && (s.badge = function (e) {
        r.setBadgeVisibility({
            visible: !! e
        })
    }), r.getPushToken && (s.getToken = function (e) {
        if (typeof e != "function") throw TypeError("callback must be a function, got " + e);
        r.getPushToken(function (t) {
            e(t && t.token)
        })
    });
    if (r.getNotificationList) {
        var o = n.events.handlers(),
            u = function () {
                var e;
                try {
                    n._.firstBatch && n._.firstBatch["Push.getNotificationList"] ? e = n._.firstBatch["Push.getNotificationList"] : e = r.getNotificationList()
                } catch (t) {}
                if (r.setBadgeVisibility && (!n._.firstBatch || !n._.firstBatch["Push.setBadgeVisibility"])) try {
                    r.setBadgeVisibility({
                        visible: !1
                    })
                } catch (t) {}
                if (e && e.notifications) {
                    var i = [];
                    for (var s = 0, u = e.notifications.length; s < u; s++)
                        if (typeof e.notifications[s] == "object") switch (typeof e.notifications[s].data) {
                        case "object":
                            i.push(e.notifications[s].data);
                            break;
                        case "string":
                            try {
                                var f = JSON.parse(e.notifications[s].data);
                                typeof f == "object" && i.push(f)
                            } catch (t) {}
                            break;
                        default:
                        }
                    o.triggerMulti(i)
                }
            };
        s.handler = function (e) {
            return o.handler(e)
        }, r.on("notificationReceived", function () {
            setTimeout(u, 0)
        }), u()
    }
}(window, document, cards),

function (e, t, n) {
    function o(e, t, n) {
        if (typeof e != "string") throw TypeError("picker url must be a string, got " + e);
        switch (typeof t) {
        case "function":
            caller = t;
        case "undefined":
            t = {};
        case "object":
            break;
        default:
            throw TypeError("picker options must be an object if defined, got " + t)
        }
        if (typeof n != "function") throw TypeError("picker callback must be a function, got " + n);
        r.startRequest({
            requestUrl: e,
            requestData: t
        }, function (e) {
            n(e && e.responseData)
        })
    }
    var r;
    try {
        r = n._.bridge("Picker")
    } catch (i) {
        return
    }
    if (!r.startRequest) return;
    var s = n.events(o);
    n.picker = s;
    if (r.getRequest && r.completeRequest) {
        var u, a;
        try {
            u = (n._.secondBatch ? n._.firstBatch["Picker.getRequest"] : r.getRequest()).requestData
        } catch (i) {}
        u && t.referrer && (a = !! u && !! u.kik && t.referrer.split("?")[0] === "https://kik.com/", s.url = t.referrer, s.data = u, s.fromKik = a, s.reply = function (e) {
            a && e && (e = n.kik._formatMessage(e));
            try {
                r.completeRequest({
                    responseData: e
                })
            } catch (t) {}
        }, s.cancel = function () {
            try {
                r.cancelRequest()
            } catch (e) {}
            s.url = undefined, s.data = undefined, s.reply = undefined, s.cancel = undefined, s.trigger("cancel")
        })
    }
}(window, document, cards),

function (e, t, n) {
    function o(e) {
        typeof arguments[0] == "string" && (e = Array.prototype.slice.call(e));
        if (!Array.isArray(e)) throw TypeError("list of SKUs must be an array");
        e.forEach(function (e) {
            if (typeof e != "string") throw TypeError("SKU must be a string, got " + e)
        });
        var t, n;
        try {
            t = r.getAvailableItems({
                skus: e
            }).items, n = r.getTransactionList().transactions
        } catch (i) {}
        if (!t || !n) throw TypeError("failed to receive access to Purchase APIs");
        s.init = null, s.complete = a, s.items = t, s.pending = n
    }

    function u(e, t, n) {
        switch (typeof e) {
        case "object":
            if (e === null) throw TypeError("SKU must be a string, got " + e);
            if (typeof e.sku != "string") throw TypeError("SKU must be a string, got " + e.sku);
            e = e.sku;
        case "string":
            break;
        default:
            throw TypeError("SKU must be a string, got " + e)
        }
        var i = s.items.map(function (e) {
            return e.sku
        }).indexOf(e);
        if (i === -1) throw TypeError("SKU not available, got " + e);
        switch (typeof t) {
        case "function":
            n = t, t = undefined;
        case "undefined":
            t = {};
        case "object":
            break;
        default:
            throw TypeError("purchase data must be a JSON object if defined, got " + t)
        }
        switch (typeof n) {
        case "undefined":
            n = function () {};
        case "function":
            break;
        default:
            throw TypeError("purchase callback must be a function if defined, got " + n)
        }
        r.purchase({
            sku: e,
            data: t
        }, function (e) {
            if (!e || !e.transaction) {
                n();
                return
            }
            s.pending.push(e.transaction), n(e.transaction)
        })
    }

    function a(e) {
        if (typeof e != "string") throw TypeError("transactionId must be a string, got " + e);
        r.markTransactionStored({
            transactionId: e
        });
        for (var t = s.pending.length; t--;) s.pending[t].transactionId === e && s.pending.splice(t, 1)
    }
    var r;
    try {
        r = n._.bridge("IAP")
    } catch (i) {
        return
    }
    if (!r.purchase || !r.markTransactionStored || !r.getAvailableItems || !r.getTransactionList) return;
    var s = n.events(u);
    s.init = o, n.purchase = s
}(window, document, cards),

function (e) {
    delete e._.firstBatch, e._.secondBatch && (e._.bridge.batch(e._.secondBatch), delete e._.secondBatch)
}(cards), cards.unsupported = function (e, t, n) {
    function u() {
        if (n.enabled) return;
        var e = n.utils.url,
            i = "card" + e.updateQuery({
                kikme: null
            }).substr(4),
            s = !! e.query.kikme;
        s || Array.prototype.forEach.call(t.getElementsByTagName("meta"), function (e) {
            e.name === r && (e.content || "").trim() && (s = !0)
        }), s && n.open.card(i)
    }

    function a(e) {
        try {
            return Plugin = n._.bridge(e), !! Plugin
        } catch (t) {
            return !1
        }
    }

    function f() {
        var e;
        Array.prototype.forEach.call(t.getElementsByTagName("meta"), function (t) {
            t.name === i && (e = (t.content || "").trim())
        });
        if (!e) return [];
        var n = e.split(",").reduce(function (e, t) {
            return (t = t.trim()) && t in s && e.push(t), e
        }, []);
        return n
    }

    function l() {
        var e = f(),
            t = !0;
        return e.forEach(function (e) {
            s[e]() || (t = !1)
        }), t
    }

    function c() {
        if (!l()) return h(), !0
    }

    function h() {
        if (o) return;
        o = [];
        var e = t.documentElement;
        Array.prototype.forEach.call(e.childNodes, function (t) {
            e.removeChild(t)
        }), e.style.height = "100%", e.style.width = "100%", e.style.padding = "0", e.style.border = "none", e.style.margin = "0", e.style.overflow = "hidden";
        var n = t.createElement("head"),
            r = t.createElement("meta");
        r.name = "viewport", r.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no", n.appendChild(r), e.appendChild(n);
        var i = d();
        i.style.zIndex = "99999999", i.style.position = "fixed", i.style.top = "0", i.style.left = "0", i.style.height = "100%", i.style.width = "100%", i.style["-webkit-transform"] = "translate3d(0,0,0)", e.appendChild(i), e.style.background = i.style.background
    }

    function p(e) {
        var r = n.utils.platform.os.ios,
            i = n.utils.platform.os.android;
        switch (typeof e) {
        case "undefined":
            e = function () {};
        case "function":
            break;
        default:
            throw TypeError("callback must be a function, got " + e)
        }
        if (o) {
            o.push(e);
            return
        }
        o = [e];
        var s = d(function () {
            r ? (s.style["-webkit-transform"] = "translate3d(0,100%,0)", s.style.transform = "translate3d(0,100%,0)") : (s.style["-webkit-transform"] = "translate3d(100%,0,0)", s.style.transform = "translate3d(100%,0,0)"), setTimeout(function () {
                t.documentElement.removeChild(s)
            }, 500);
            var e = o.slice();
            o = null, e.forEach(function (e) {
                try {
                    e()
                } catch (t) {
                    n.utils.error(t)
                }
            })
        });
        s.style.zIndex = "99999999", s.style.position = "fixed", s.style.top = "0", s.style.left = "0", s.style.height = "100%", s.style.width = "100%", r ? (s.style["-webkit-transform"] = "translate3d(0,100%,0)", s.style.transform = "translate3d(0,100%,0)") : (s.style["-webkit-transform"] = "translate3d(100%,0,0)", s.style.transform = "translate3d(100%,0,0)"), t.documentElement.appendChild(s), setTimeout(function () {
            s.style["-webkit-transition"] = "-webkit-transform 0.3s ease-in-out", s.style.transition = "transform 0.3s ease-in-out", setTimeout(function () {
                s.style["-webkit-transform"] = "translate3d(0,0,0)", s.style.transform = "translate3d(0,0,0)"
            }, 0)
        }, 0)
    }

    function d(r) {
        var i = n.utils.platform.os.ios,
            s = n.utils.platform.os.android,
            o = t.createElement("div");
        o.style.background = "#F3F3F3", s ? o.style.fontFamily = '"Roboto", sans-serif' : o.style.fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';
        var u = t.createElement("div");
        u.textContent = "Please update Kik", u.style.padding = "16px 0", u.style.margin = "0 32px 16px", u.style.borderBottom = "1px solid #CCC", u.style.color = "#575", u.style.fontSize = "24px", u.style.fontWeight = "bold", u.style.textAlign = "center", i && (u.style["text-shadow"] = "0 1px 0 #FFF"), o.appendChild(u);
        var a = t.createElement("a");
        a.textContent = "Update", i ? a.href = "itms-apps://itunes.apple.com/app/kik-messenger/id357218860" : a.href = "market://details?id=kik.android", a.style.display = "block", a.style.margin = "0 48px", a.style.padding = "8px 0", a.style.background = "#CFC", a.style.border = "1px solid #AFA", i && (a.style["-webkit-border-radius"] = "3px", a.style["border-radius"] = "3px"), a.style.color = "#686", a.style.fontSize = "20px", a.style.fontWeight = "bold", a.style.textAlign = "center", a.style.textDecoration = "none", o.appendChild(a);
        if (r) {
            var f = t.createElement("div");
            typeof e.Clickable == "function" && e.Clickable(f), f.textContent = "Back", f.style.display = "block", f.style.margin = "16px 48px 0", f.style.padding = "8px 0", f.style.background = "#FCC", f.style.border = "1px solid #FAA", i && (f.style["-webkit-border-radius"] = "3px", f.style["border-radius"] = "3px"), f.style.color = "#866", f.style.fontSize = "20px", f.style.fontWeight = "bold", f.style.textAlign = "center", f.style.textDecoration = "none", f.addEventListener("click", function () {
                r && (r(), r = null)
            }, !1), o.appendChild(f)
        }
        var l = t.createElement("div");
        return l.textContent = "This card needs some of Kik's new features to run properly. Update Kik to use this card and get those awesome features!", l.style.margin = "16px 48px", l.style.padding = "12px 16px", l.style.background = "#FFF", l.style.border = "1px solid #CCC", i && (l.style["-webkit-border-radius"] = "3px", l.style["border-radius"] = "3px"), l.style.color = "#777", l.style.fontSize = "14px", o.appendChild(l), o
    }
    var r = "kik-prefer",
        i = "kik-requires",
        s = {
            metrics: function () {
                return a("Metrics")
            },
            "user-data": function () {
                return a("UserData")
            },
            photos: function () {
                return a("Photo")
            }
        }, o;
    return u(), c(), p
}(window, document, cards),

function (e) {
    function y() {
        c ? b() : f && w();
        if (e[n]) return;
        e[n] = !0, i && O(), s && M()
    }

    function b() {
        for (var t in c) h[t] = E(c[t][0], c[t][1], [t]);
        e[u] = function (e) {
            if (e in h) return h[e];
            throw TypeError(e + " is not a known Zerver API")
        }
    }

    function w() {
        e[u] = E(f, l, [a])
    }

    function E(e, t, n) {
        var r;
        for (var i in t) r = t[i], r === !0 ? e[i] = S(e, i, n) : typeof r == "object" && typeof e[i] == "object" && (e[i] = E(e[i], r, n.concat([i])));
        return e
    }

    function S(t, n, r) {
        return function () {
            function o(e) {
                if (typeof e != "function") throw TypeError("error handler must be a function, got " + e);
                return i.push(e), s
            }
            var i = [],
                s = {
                    error: o
                }, u = {}, a = Array.prototype.slice.call(arguments),
                f = a.length,
                l = a[f - 1];
            return typeof l == "function" ? a.pop() : (u.noResponse = !0, l = function () {}), u.args = a, x(r.concat(n), u, function (n, r) {
                if (n) {
                    i.length ? i.forEach(function (r) {
                        try {
                            r.call(t, n)
                        } catch (i) {
                            e.console && e.console.error && e.console.error(i)
                        }
                    }) : e.console && e.console.error && e.console.error(n);
                    return
                }
                l.apply(t, r)
            }), {
                error: o
            }
        }
    }

    function x(e, t, n) {
        var r = "/" + o,
            i = JSON.stringify(t);
        for (var s = 0, u = e.length; s < u; s++) r += "/" + encodeURIComponent(e[s]);
        T(r, i, function (e, t) {
            var r, i;
            if (e === 200) try {
                var s = JSON.parse(t);
                s.data ? r = s.data : i = s.error
            } catch (o) {
                i = "zerver failed to parse response"
            } else i = "zerver http error, " + e;
            n(i, r)
        })
    }

    function T(n, r, i) {
        function a(e) {
            if (s) return;
            s = !0, i && i(e, o.responseText)
        }
        var s = !1,
            o;
        if (typeof XMLHttpRequest != "undefined") o = new XMLHttpRequest;
        else {
            if (typeof ActiveXObject == "undefined") throw Error("browser does not support ajax");
            o = new ActiveXObject("Microsoft.XMLHTTP")
        }
        o.onreadystatechange = function () {
            o.readyState === 4 && a(o.status)
        };
        var u = e.ZERVER_TIMEOUT || t;
        o.timeout = u, o.ontimeout = function () {
            a(0)
        }, setTimeout(function () {
            s || (o.abort(), a(0))
        }, u), o.open("POST", n, !0), o.send(r)
    }

    function N(e) {
        if (Object.prototype.toString.call(p) == "[object Array]") {
            p.push(e);
            return
        }
        if (p) {
            e();
            return
        }
        p = [e], C(function (e) {
            var t = p.slice();
            p = e, t.forEach(function (e) {
                e()
            })
        })
    }

    function C(e) {
        function r(e) {
            if (v && !g) return;
            var t = "/" + o + "/_push/message?id=" + d + "&_=" + +(new Date),
                n = JSON.stringify(e);
            T(t, n)
        }

        function i(e, n) {
            t.push(n)
        }
        var t = [],
            n = {
                send: r,
                on: i
            };
        k(function (e) {
            var n;
            try {
                n = JSON.parse(e)
            } catch (r) {}
            if (typeof n != "object" || n === null) return;
            for (var i = 0, s = t.length; i < s; i++) t[i](n)
        }), e(n)
    }

    function k(e, t) {
        function r() {
            L(e, function (n) {
                n ? t = 0 : t += 1, k(e, t)
            })
        }
        var n;
        t ? n = Math.pow(2, Math.min(t, 5)) * 1e3 : (t = 0, n = 0), setTimeout(function () {
            _(r)
        }, n)
    }

    function L(t, n) {
        function p() {
            if (i) return;
            var e = f.responseText.length;
            if (e === h) return;
            var n = f.responseText.substring(h, e),
                r = n.lastIndexOf("\n");
            if (r === -1) return;
            n = n.substr(0, r), h += n.length + 1, n.split("\n").forEach(function (e) {
                e && e[0] !== ";" && t(e)
            })
        }

        function m(e) {
            if (s || i) return;
            s = !0, g = !1, clearInterval(c), p(), n && n(u)
        }
        var i = !1,
            s = !1,
            u = !1,
            a = "/" + o + "/_push/stream?id=" + d + "&_=" + +(new Date),
            f = new XMLHttpRequest;
        f.onreadystatechange = function () {
            f.readyState >= 3 && f.status === 200 && (u = !0, v = !0, g = !0), f.readyState === 4 && m(f.status)
        };
        var l = 45e3;
        f.timeout = l, f.ontimeout = function () {
            m(0)
        }, setTimeout(function () {
            s || (f.abort(), m(0))
        }, l);
        var c = setInterval(p, 200),
            h = 0;
        f.open("GET", a, !0), f.send(""), e[r] = function () {
            if (i) return;
            i = !0;
            try {
                f.abort()
            } catch (e) {}
        }
    }

    function A() {
        return ("x" + Math.random()).replace(/\.|\-/g, "")
    }

    function O() {
        var t = "ZERVER_REFRESH";
        typeof e[t] != "function" && (e[t] = function () {
            e.location.reload()
        }), N(function () {
            p.on("message", function (n) {
                if (n.type !== "refresh") return;
                var r = e[t];
                typeof r == "function" && r()
            })
        })
    }

    function M() {
        function r() {
            p.on("message", function (e) {
                if (e.type !== "eval") return;
                var t, n, r;
                try {
                    n = (new Function("return " + e.line))(), t = !0, r = undefined
                } catch (i) {
                    n = undefined, t = !1, r = i + ""
                }
                var s, o;
                if (t) {
                    if (n !== null && typeof n == "object") try {
                        o = JSON.stringify(n), typeof o == "string" && (s = "json")
                    } catch (i) {}
                    s || (o = n + "", s = "string")
                }
                p.send({
                    type: "eval",
                    requestID: e.requestID,
                    error: r,
                    output: o,
                    dataType: s
                })
            })
        }

        function i(e, t) {
            n.push([e, t])
        }

        function s() {
            var e = n.slice();
            n = null, i = o, e.forEach(function (e) {
                o(e[0], e[1])
            })
        }

        function o(e, t) {
            p.send({
                type: "log",
                level: e,
                message: t
            })
        }

        function u(e, n) {
            if (t) return;
            t = !0, i && i(e, n), t = !1
        }

        function a() {
            var t = e.console;
            typeof t != "object" && (t = {}), t.log = f(t.log, "log"), t.warn = f(t.warn, "warn"), t.error = f(t.error, "error"), l(), e.console = t
        }

        function f(e, t) {
            switch (typeof e) {
            case "undefined":
                e = function () {};
            case "function":
                break;
            default:
                return e
            }
            return function () {
                var n = Array.prototype.map.call(arguments, function (e) {
                    return e + ""
                }).join(" ");
                u(t, n), e.apply(this, arguments)
            }
        }

        function l() {
            if (!e.addEventListener) return;
            e.addEventListener("error", function (e, t, n) {
                var r = e + "";
                t && (r += " (" + t, n && (r += ":" + n), r += ")"), u("exception", r)
            }, !1)
        }
        var t = !1,
            n = [];
        N(function () {
            s(), r()
        }), a()
    }

    function _(e) {
        m ? m.push(e) : e()
    }

    function D() {
        !e.addEventListener || document.readyState === "complete" ? P() : e.addEventListener("load", P, !1)
    }

    function P() {
        e.removeEventListener("load", P);
        if (!m) return;
        setTimeout(function () {
            var e = m.slice();
            m = !1, e.forEach(function (e) {
                e()
            })
        }, 500)
    }
    var t = 22e3,
        n = "ZERVER_INIT",
        r = "ZERVER_KILL_STREAM",
        i = !1,
        s = !1,
        o = "zerver",
        u = "profile",
        a = "profile",
        f = {}, l = {
            createOrUpdate: !0,
            getPurchases: !0,
            purchase: !0
        }, c = null,
        h = {}, p, d = A(),
        v = !1,
        m = [],
        g;
    D(), y()
}(window),

function (e) {
    function y() {
        c ? b() : f && w();
        if (e[n]) return;
        e[n] = !0, i && O(), s && M()
    }

    function b() {
        for (var t in c) h[t] = E(c[t][0], c[t][1], [t]);
        e[u] = function (e) {
            if (e in h) return h[e];
            throw TypeError(e + " is not a known Zerver API")
        }
    }

    function w() {
        e[u] = E(f, l, [a])
    }

    function E(e, t, n) {
        var r;
        for (var i in t) r = t[i], r === !0 ? e[i] = S(e, i, n) : typeof r == "object" && typeof e[i] == "object" && (e[i] = E(e[i], r, n.concat([i])));
        return e
    }

    function S(t, n, r) {
        return function () {
            function o(e) {
                if (typeof e != "function") throw TypeError("error handler must be a function, got " + e);
                return i.push(e), s
            }
            var i = [],
                s = {
                    error: o
                }, u = {}, a = Array.prototype.slice.call(arguments),
                f = a.length,
                l = a[f - 1];
            return typeof l == "function" ? a.pop() : (u.noResponse = !0, l = function () {}), u.args = a, x(r.concat(n), u, function (n, r) {
                if (n) {
                    i.length ? i.forEach(function (r) {
                        try {
                            r.call(t, n)
                        } catch (i) {
                            e.console && e.console.error && e.console.error(i)
                        }
                    }) : e.console && e.console.error && e.console.error(n);
                    return
                }
                l.apply(t, r)
            }), {
                error: o
            }
        }
    }

    function x(e, t, n) {
        var r = "/" + o,
            i = JSON.stringify(t);
        for (var s = 0, u = e.length; s < u; s++) r += "/" + encodeURIComponent(e[s]);
        T(r, i, function (e, t) {
            var r, i;
            if (e === 200) try {
                var s = JSON.parse(t);
                s.data ? r = s.data : i = s.error
            } catch (o) {
                i = "zerver failed to parse response"
            } else i = "zerver http error, " + e;
            n(i, r)
        })
    }

    function T(n, r, i) {
        function a(e) {
            if (s) return;
            s = !0, i && i(e, o.responseText)
        }
        var s = !1,
            o;
        if (typeof XMLHttpRequest != "undefined") o = new XMLHttpRequest;
        else {
            if (typeof ActiveXObject == "undefined") throw Error("browser does not support ajax");
            o = new ActiveXObject("Microsoft.XMLHTTP")
        }
        o.onreadystatechange = function () {
            o.readyState === 4 && a(o.status)
        };
        var u = e.ZERVER_TIMEOUT || t;
        o.timeout = u, o.ontimeout = function () {
            a(0)
        }, setTimeout(function () {
            s || (o.abort(), a(0))
        }, u), o.open("POST", n, !0), o.send(r)
    }

    function N(e) {
        if (Object.prototype.toString.call(p) == "[object Array]") {
            p.push(e);
            return
        }
        if (p) {
            e();
            return
        }
        p = [e], C(function (e) {
            var t = p.slice();
            p = e, t.forEach(function (e) {
                e()
            })
        })
    }

    function C(e) {
        function r(e) {
            if (v && !g) return;
            var t = "/" + o + "/_push/message?id=" + d + "&_=" + +(new Date),
                n = JSON.stringify(e);
            T(t, n)
        }

        function i(e, n) {
            t.push(n)
        }
        var t = [],
            n = {
                send: r,
                on: i
            };
        k(function (e) {
            var n;
            try {
                n = JSON.parse(e)
            } catch (r) {}
            if (typeof n != "object" || n === null) return;
            for (var i = 0, s = t.length; i < s; i++) t[i](n)
        }), e(n)
    }

    function k(e, t) {
        function r() {
            L(e, function (n) {
                n ? t = 0 : t += 1, k(e, t)
            })
        }
        var n;
        t ? n = Math.pow(2, Math.min(t, 5)) * 1e3 : (t = 0, n = 0), setTimeout(function () {
            _(r)
        }, n)
    }

    function L(t, n) {
        function p() {
            if (i) return;
            var e = f.responseText.length;
            if (e === h) return;
            var n = f.responseText.substring(h, e),
                r = n.lastIndexOf("\n");
            if (r === -1) return;
            n = n.substr(0, r), h += n.length + 1, n.split("\n").forEach(function (e) {
                e && e[0] !== ";" && t(e)
            })
        }

        function m(e) {
            if (s || i) return;
            s = !0, g = !1, clearInterval(c), p(), n && n(u)
        }
        var i = !1,
            s = !1,
            u = !1,
            a = "/" + o + "/_push/stream?id=" + d + "&_=" + +(new Date),
            f = new XMLHttpRequest;
        f.onreadystatechange = function () {
            f.readyState >= 3 && f.status === 200 && (u = !0, v = !0, g = !0), f.readyState === 4 && m(f.status)
        };
        var l = 45e3;
        f.timeout = l, f.ontimeout = function () {
            m(0)
        }, setTimeout(function () {
            s || (f.abort(), m(0))
        }, l);
        var c = setInterval(p, 200),
            h = 0;
        f.open("GET", a, !0), f.send(""), e[r] = function () {
            if (i) return;
            i = !0;
            try {
                f.abort()
            } catch (e) {}
        }
    }

    function A() {
        return ("x" + Math.random()).replace(/\.|\-/g, "")
    }

    function O() {
        var t = "ZERVER_REFRESH";
        typeof e[t] != "function" && (e[t] = function () {
            e.location.reload()
        }), N(function () {
            p.on("message", function (n) {
                if (n.type !== "refresh") return;
                var r = e[t];
                typeof r == "function" && r()
            })
        })
    }

    function M() {
        function r() {
            p.on("message", function (e) {
                if (e.type !== "eval") return;
                var t, n, r;
                try {
                    n = (new Function("return " + e.line))(), t = !0, r = undefined
                } catch (i) {
                    n = undefined, t = !1, r = i + ""
                }
                var s, o;
                if (t) {
                    if (n !== null && typeof n == "object") try {
                        o = JSON.stringify(n), typeof o == "string" && (s = "json")
                    } catch (i) {}
                    s || (o = n + "", s = "string")
                }
                p.send({
                    type: "eval",
                    requestID: e.requestID,
                    error: r,
                    output: o,
                    dataType: s
                })
            })
        }

        function i(e, t) {
            n.push([e, t])
        }

        function s() {
            var e = n.slice();
            n = null, i = o, e.forEach(function (e) {
                o(e[0], e[1])
            })
        }

        function o(e, t) {
            p.send({
                type: "log",
                level: e,
                message: t
            })
        }

        function u(e, n) {
            if (t) return;
            t = !0, i && i(e, n), t = !1
        }

        function a() {
            var t = e.console;
            typeof t != "object" && (t = {}), t.log = f(t.log, "log"), t.warn = f(t.warn, "warn"), t.error = f(t.error, "error"), l(), e.console = t
        }

        function f(e, t) {
            switch (typeof e) {
            case "undefined":
                e = function () {};
            case "function":
                break;
            default:
                return e
            }
            return function () {
                var n = Array.prototype.map.call(arguments, function (e) {
                    return e + ""
                }).join(" ");
                u(t, n), e.apply(this, arguments)
            }
        }

        function l() {
            if (!e.addEventListener) return;
            e.addEventListener("error", function (e, t, n) {
                var r = e + "";
                t && (r += " (" + t, n && (r += ":" + n), r += ")"), u("exception", r)
            }, !1)
        }
        var t = !1,
            n = [];
        N(function () {
            s(), r()
        }), a()
    }

    function _(e) {
        m ? m.push(e) : e()
    }

    function D() {
        !e.addEventListener || document.readyState === "complete" ? P() : e.addEventListener("load", P, !1)
    }

    function P() {
        e.removeEventListener("load", P);
        if (!m) return;
        setTimeout(function () {
            var e = m.slice();
            m = !1, e.forEach(function (e) {
                e()
            })
        }, 500)
    }
    var t = 22e3,
        n = "ZERVER_INIT",
        r = "ZERVER_KILL_STREAM",
        i = !1,
        s = !1,
        o = "zerver",
        u = "store",
        a = "store",
        f = {}, l = {
            check: !0
        }, c = null,
        h = {}, p, d = A(),
        v = !1,
        m = [],
        g;
    D(), y()
}(window),

function (e) {
    function y() {
        c ? b() : f && w();
        if (e[n]) return;
        e[n] = !0, i && O(), s && M()
    }

    function b() {
        for (var t in c) h[t] = E(c[t][0], c[t][1], [t]);
        e[u] = function (e) {
            if (e in h) return h[e];
            throw TypeError(e + " is not a known Zerver API")
        }
    }

    function w() {
        e[u] = E(f, l, [a])
    }

    function E(e, t, n) {
        var r;
        for (var i in t) r = t[i], r === !0 ? e[i] = S(e, i, n) : typeof r == "object" && typeof e[i] == "object" && (e[i] = E(e[i], r, n.concat([i])));
        return e
    }

    function S(t, n, r) {
        return function () {
            function o(e) {
                if (typeof e != "function") throw TypeError("error handler must be a function, got " + e);
                return i.push(e), s
            }
            var i = [],
                s = {
                    error: o
                }, u = {}, a = Array.prototype.slice.call(arguments),
                f = a.length,
                l = a[f - 1];
            return typeof l == "function" ? a.pop() : (u.noResponse = !0, l = function () {}), u.args = a, x(r.concat(n), u, function (n, r) {
                if (n) {
                    i.length ? i.forEach(function (r) {
                        try {
                            r.call(t, n)
                        } catch (i) {
                            e.console && e.console.error && e.console.error(i)
                        }
                    }) : e.console && e.console.error && e.console.error(n);
                    return
                }
                l.apply(t, r)
            }), {
                error: o
            }
        }
    }

    function x(e, t, n) {
        var r = "/" + o,
            i = JSON.stringify(t);
        for (var s = 0, u = e.length; s < u; s++) r += "/" + encodeURIComponent(e[s]);
        T(r, i, function (e, t) {
            var r, i;
            if (e === 200) try {
                var s = JSON.parse(t);
                s.data ? r = s.data : i = s.error
            } catch (o) {
                i = "zerver failed to parse response"
            } else i = "zerver http error, " + e;
            n(i, r)
        })
    }

    function T(n, r, i) {
        function a(e) {
            if (s) return;
            s = !0, i && i(e, o.responseText)
        }
        var s = !1,
            o;
        if (typeof XMLHttpRequest != "undefined") o = new XMLHttpRequest;
        else {
            if (typeof ActiveXObject == "undefined") throw Error("browser does not support ajax");
            o = new ActiveXObject("Microsoft.XMLHTTP")
        }
        o.onreadystatechange = function () {
            o.readyState === 4 && a(o.status)
        };
        var u = e.ZERVER_TIMEOUT || t;
        o.timeout = u, o.ontimeout = function () {
            a(0)
        }, setTimeout(function () {
            s || (o.abort(), a(0))
        }, u), o.open("POST", n, !0), o.send(r)
    }

    function N(e) {
        if (Object.prototype.toString.call(p) == "[object Array]") {
            p.push(e);
            return
        }
        if (p) {
            e();
            return
        }
        p = [e], C(function (e) {
            var t = p.slice();
            p = e, t.forEach(function (e) {
                e()
            })
        })
    }

    function C(e) {
        function r(e) {
            if (v && !g) return;
            var t = "/" + o + "/_push/message?id=" + d + "&_=" + +(new Date),
                n = JSON.stringify(e);
            T(t, n)
        }

        function i(e, n) {
            t.push(n)
        }
        var t = [],
            n = {
                send: r,
                on: i
            };
        k(function (e) {
            var n;
            try {
                n = JSON.parse(e)
            } catch (r) {}
            if (typeof n != "object" || n === null) return;
            for (var i = 0, s = t.length; i < s; i++) t[i](n)
        }), e(n)
    }

    function k(e, t) {
        function r() {
            L(e, function (n) {
                n ? t = 0 : t += 1, k(e, t)
            })
        }
        var n;
        t ? n = Math.pow(2, Math.min(t, 5)) * 1e3 : (t = 0, n = 0), setTimeout(function () {
            _(r)
        }, n)
    }

    function L(t, n) {
        function p() {
            if (i) return;
            var e = f.responseText.length;
            if (e === h) return;
            var n = f.responseText.substring(h, e),
                r = n.lastIndexOf("\n");
            if (r === -1) return;
            n = n.substr(0, r), h += n.length + 1, n.split("\n").forEach(function (e) {
                e && e[0] !== ";" && t(e)
            })
        }

        function m(e) {
            if (s || i) return;
            s = !0, g = !1, clearInterval(c), p(), n && n(u)
        }
        var i = !1,
            s = !1,
            u = !1,
            a = "/" + o + "/_push/stream?id=" + d + "&_=" + +(new Date),
            f = new XMLHttpRequest;
        f.onreadystatechange = function () {
            f.readyState >= 3 && f.status === 200 && (u = !0, v = !0, g = !0), f.readyState === 4 && m(f.status)
        };
        var l = 45e3;
        f.timeout = l, f.ontimeout = function () {
            m(0)
        }, setTimeout(function () {
            s || (f.abort(), m(0))
        }, l);
        var c = setInterval(p, 200),
            h = 0;
        f.open("GET", a, !0), f.send(""), e[r] = function () {
            if (i) return;
            i = !0;
            try {
                f.abort()
            } catch (e) {}
        }
    }

    function A() {
        return ("x" + Math.random()).replace(/\.|\-/g, "")
    }

    function O() {
        var t = "ZERVER_REFRESH";
        typeof e[t] != "function" && (e[t] = function () {
            e.location.reload()
        }), N(function () {
            p.on("message", function (n) {
                if (n.type !== "refresh") return;
                var r = e[t];
                typeof r == "function" && r()
            })
        })
    }

    function M() {
        function r() {
            p.on("message", function (e) {
                if (e.type !== "eval") return;
                var t, n, r;
                try {
                    n = (new Function("return " + e.line))(), t = !0, r = undefined
                } catch (i) {
                    n = undefined, t = !1, r = i + ""
                }
                var s, o;
                if (t) {
                    if (n !== null && typeof n == "object") try {
                        o = JSON.stringify(n), typeof o == "string" && (s = "json")
                    } catch (i) {}
                    s || (o = n + "", s = "string")
                }
                p.send({
                    type: "eval",
                    requestID: e.requestID,
                    error: r,
                    output: o,
                    dataType: s
                })
            })
        }

        function i(e, t) {
            n.push([e, t])
        }

        function s() {
            var e = n.slice();
            n = null, i = o, e.forEach(function (e) {
                o(e[0], e[1])
            })
        }

        function o(e, t) {
            p.send({
                type: "log",
                level: e,
                message: t
            })
        }

        function u(e, n) {
            if (t) return;
            t = !0, i && i(e, n), t = !1
        }

        function a() {
            var t = e.console;
            typeof t != "object" && (t = {}), t.log = f(t.log, "log"), t.warn = f(t.warn, "warn"), t.error = f(t.error, "error"), l(), e.console = t
        }

        function f(e, t) {
            switch (typeof e) {
            case "undefined":
                e = function () {};
            case "function":
                break;
            default:
                return e
            }
            return function () {
                var n = Array.prototype.map.call(arguments, function (e) {
                    return e + ""
                }).join(" ");
                u(t, n), e.apply(this, arguments)
            }
        }

        function l() {
            if (!e.addEventListener) return;
            e.addEventListener("error", function (e, t, n) {
                var r = e + "";
                t && (r += " (" + t, n && (r += ":" + n), r += ")"), u("exception", r)
            }, !1)
        }
        var t = !1,
            n = [];
        N(function () {
            s(), r()
        }), a()
    }

    function _(e) {
        m ? m.push(e) : e()
    }

    function D() {
        !e.addEventListener || document.readyState === "complete" ? P() : e.addEventListener("load", P, !1)
    }

    function P() {
        e.removeEventListener("load", P);
        if (!m) return;
        setTimeout(function () {
            var e = m.slice();
            m = !1, e.forEach(function (e) {
                e()
            })
        }, 500)
    }
    var t = 22e3,
        n = "ZERVER_INIT",
        r = "ZERVER_KILL_STREAM",
        i = !1,
        s = !1,
        o = "zerver",
        u = "scoreboard",
        a = "scoreboard",
        f = {}, l = {
            getRange: !0,
            uploadScore: !0
        }, c = null,
        h = {}, p, d = A(),
        v = !1,
        m = [],
        g;
    D(), y()
}(window);
var savedUser = null;
localStorage.storedUser && (savedUser = JSON.parse(localStorage.storedUser)),

function (e) {
    var t = {};
    t.createMulticall = function () {
        var e = [],
            n = [],
            r = function () {
                var t = !1;
                for (var r = 0, i = e.length; r < i; ++r) typeof e[r] != "undefined" && (t = e[r].apply(n[r] || this, arguments) || t);
                return t
            };
        r.listeners = this, r.contexts = this, r.add = function (t, r) {
            return e.push(t), n.push(r || null), this
        }, r.remove = function (r, i) {
            if (!r && !i) e.length = 0, n.length = 0;
            else {
                var s = -1;
                for (var o = e.length; --o >= 0;) {
                    var u = e[o],
                        a = n[o];
                    if (i && a === i && u === r) {
                        s = o;
                        break
                    }
                    if (!i && r === u) {
                        s = o;
                        break
                    }
                }
                s > -1 && (t.removeElement(e, o), t.removeElement(n, o))
            }
            return this
        };
        for (var i = 0, s = arguments.length - 1; i <= s; ++i) r.add(arguments[i]);
        return r
    }, t.delimit = function (t) {
        var n = "" + t,
            r = "";
        for (var i = n.length; i >= 0; i -= 3) {
            var s = i - 3,
                o = r.length === 0;
            if (s <= 0) {
                o || (r = "," + r), r = n.substring(0, s + 3) + r;
                break
            }
            o || (r = "," + r), r = n.substr(s, 3) + r
        }
        return r
    }, t.removeElement = function (t, n) {
        var r = 0,
            i;
        if (Array.prototype.indexOf) r = t.indexOf(n);
        else
            for (r = 0, i = t.length; r < i; ++r)
                if (t[r] === n) break; t.splice(r, 1)
    }, t.shuffle = function (e, t) {
        var n = [].concat(e);
        typeof t != "function" && (t = function () {
            return Math.random()
        });
        for (var r = n.length; --r >= 1;) {
            var i = Math.round(t() * r),
                s = n[r];
            n[r] = n[i], n[i] = s
        }
        return n
    }, t.ease = function (e, n) {
        var r = [];
        for (var i in n) {
            if (!n.hasOwnProperty(i)) continue;
            var s = e[i],
                o = n[i],
                u = !1,
                a = !1;
            if (s === o) continue;
            var f = typeof o;
            if (+o === o) s = +s || 0, o = +o;
            else if ("" + o === o) {
                try {
                    var l = t.parseColor(o);
                    l && (o = l, s = t.parseColor(s) || [0, 0, 0, 1], a = !0)
                } catch (c) {
                    a = !1
                }
                a || (u = !0)
            } else u = !0;
            var h = {
                key: i,
                source: s,
                dest: o,
                isColor: a,
                isSet: u
            };
            r.push(h)
        }
        return function (e, n) {
            for (var i = 0, s = r.length; i < s; ++i) {
                var o = r[i],
                    u;
                o.isColor ? u = t.mixColors(o.source, o.dest, n) : o.isSet ? u = n === 1 ? o.dest : o.source : u = o.source * (1 - n) + o.dest * n, e[o.key] = u
            }
        }
    }, t.checkAABBIntersection = function (e, t) {
        var n = t.x,
            r = t.x + t.width,
            i = t.y,
            s = t.y + t.height,
            o = [
                [e.x, e.y],
                [e.x + e.width, e.y],
                [e.x, e.y + e.height],
                [e.x + e.width, e.y + e.height]
            ];
        for (var u = 0; u < 4; ++u) {
            var a = o[u],
                f = a[0],
                l = a[1];
            if (f >= n && f <= r && l >= i && l <= s) return !0
        }
        return !1
    }, t.extendTo = function (e, t) {
        function n() {}

        function r() {
            var n, r = this["super"];
            return this["super"] = e, n = t.apply(this, arguments), r && (this["super"] = r), n
        }
        return r.toString = function i() {
            return t.toString.call(this)
        }, n.prototype = e.prototype, n.prototype.constructor = e, r.prototype = new n, r.prototype.constructor = r, r
    }, t.toRadix = function (e, t) {
        var n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            r = [];
        while (e > 0) {
            var i = e % t;
            e = Math.floor(e / t), r.unshift(n[i])
        }
        return r.join("")
    }, t.isArray = function (e) {
        return Object.prototype.toString.call(e) == "[object Array]"
    }, t.mixColors = function (e, n, r) {
        t.isArray(e) || (e = t.parseColor(e)), t.isArray(n) || (n = t.parseColor(n));
        var i = 1 - r,
            s = [];
        for (var o = 0; o < 3; ++o) s[o] = Math.min(255, Math.max(0, Math.round(e[o] * i + n[o] * r || 0)));
        return s[o] = Math.min(1, Math.max(0, e[3] * i + n[3] * r || 0)), "rgba(" + s.join(",") + ")"
    }, t.parseColor = function (e) {
        var t = [],
            n = !1;
        e = e.trim(), e.indexOf("rgba") === 0 ? (e = e.substring(4), n = !0) : e.indexOf("rgb") === 0 && (e = e.substring(3), n = !0);
        if (n) {
            e = e.replace("(", ""), e = e.replace(")", "");
            var r = e.split(",");
            for (var i = 0; i < r.length; ++i) t[i] = parseFloat(r[i].trim())
        } else {
            if (e.indexOf("#") !== 0) return !1;
            var r = e.match(/[0-9a-f]{2}/g);
            for (var i = 0; i < r.length; ++i) t[i] = parseInt(r[i].trim(), 16)
        }
        return t.length === 3 && t.push(1), t
    }, t.applyDefaults = function (e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e.hasOwnProperty(n) || (e[n] = t[n]));
        return e
    };
    var n = function () {
        return this._bindings = {}, this
    };
    n.prototype.on = function (e, n, r) {
        this._bindings || (this._bindings = {});
        var i = this._bindings[e] || t.createMulticall();
        return this._bindings[e] = i.add(n, r), this
    }, n.prototype.once = function (e, n, r) {
        function s() {
            return i.remove(s, r), n.apply(r || this, Array.prototype.slice.call(arguments, 0))
        }
        this._bindings || (this._bindings = {});
        var i = this._bindings[e] || t.createMulticall();
        return this._bindings[e] = i.add(s, r), this
    }, n.prototype.off = function (e, t, n) {
        this._bindings || (this._bindings = {});
        var r = this._bindings[e];
        return r && r.remove(t, n), this
    }, n.prototype.trigger = function (e) {
        this._bindings || (this._bindings = {});
        var t = this._bindings[e],
            n = undefined;
        return t && (n = t.call(this, arguments[1], arguments[2], arguments[3])), n
    }, e.Utils = t, e.Events = n
}(typeof exports != "undefined" ? exports : window),

function (e, t) {
    function i(e, t) {
        return function () {
            return e.apply(t, Array.prototype.slice.call(arguments, 0))
        }
    }
    var n = 0,
        r = ["ms", "moz", "webkit", "o"];
    for (var s = 0; s < r.length && !t.requestAnimationFrame; ++s) t.requestAnimationFrame = t[r[s] + "RequestAnimationFrame"], t.cancelAnimationFrame = t[r[s] + "CancelAnimationFrame"] || t[r[s] + "CancelRequestAnimationFrame"];
    t.requestAnimationFrame || (t.requestAnimationFrame = function (e, r) {
        var i = +(new Date),
            s = Math.max(0, 15 - (i - n)),
            o = t.setTimeout(function () {
                var t = +(new Date);
                e(t)
            }, 2);
        return n = i + s, o
    }, t.cancelAnimationFrame = function (e) {
        clearTimeout(e)
    });
    var o = function (t) {
        return this._currentTime = 0, this._callback = t, this
    };
    o.prototype.setCallback = function (e) {
        this._callback = e
    }, o.prototype.currentTime = function () {
        return this._currentTime
    }, o.prototype.advance = function (e, t) {
        this._currentTime += e, this._callback(e, t)
    };
    var u = Utils.extendTo(o, function (e, t) {
        return this["super"](e), this._maxAdvance = t || u.DEFAULT_MAX_ADVANCE, this._running = !1, this._lastTimestamp = 0, this._nextRequest = 0, this
    });
    u.DEFAULT_MAX_ADVANCE = 100, u.prototype.start = function () {
        this._running || (this._running = !0, this._nextRequest = t.requestAnimationFrame(i(this._nextFrame, this)))
    }, u.prototype.stop = function () {
        this._running = !1, t.cancelAnimationFrame(this._nextRequest), delete this._nextRequest
    }, u.prototype._nextFrame = function (e) {
        var n = this;
        if (this._lastTimestamp) {
            var r = e - this._lastTimestamp;
            this._lastTimestamp = e, this.advance(Math.min(~~(r + .5), this._maxAdvance), function () {
                n._running && (n._nextRequest = t.requestAnimationFrame(i(n._nextFrame, n)))
            })
        } else this._lastTimestamp = e, this._running && (this._nextRequest = t.requestAnimationFrame(i(this._nextFrame, this)))
    }, e.ClockTimer = u, e.Timer = o
}(typeof exports != "undefined" ? exports : window, typeof window != "undefined" ? window : exports),

function (e) {
    var t = {};
    t.easeLinear = function (t) {
        return t
    }, t.easeCubic = function (t) {
        return t * t * t
    }, t.easeOutBounce = function (t) {
        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    }, t.easeOut = function (t) {
        return t -= 1, t * t * t + 1
    }, t.easeIn = function (t) {
        return t = 1 - t, 1 - t * t * t
    }, t.easeOvershoot = function (t) {
        return -t * (t - 1.4) * 2.5
    }, t.easeRebound = function (t) {
        return 1 - (2 * t - 1) * (2 * t - 1)
    }, e.Easing = t
}(typeof exports != "undefined" ? exports : window);
if (typeof require != "undefined") {
    var fs = require("fs"),
        utils = require("./utils.js");
    Utils = utils.Utils
}(function (e) {
    var t = function () {
        this._cache = {}
    };
    t.prototype.spritesheet = function (e, t, n) {
        var r = new Image,
            i = this;
        for (var s = 0; s < t.length; ++s) {
            var o = t[s],
                u = this._cache[o.url];
            typeof u == "undefined" && (u = {}, u.callback = Utils.createMulticall(), u.pending = !0, this._cache[o.url] = u), n && u.callback.add(n)
        }
        r.addEventListener("load", function () {
            for (var e = 0; e < t.length; ++e) {
                var n = t[e],
                    s = i._cache[n.url];
                s.pending = !1, s.img = r, s.x = n.x, s.y = n.y, s.width = n.width, s.height = n.height, s.callback(s, n.url)
            }
        }, !1), r.addEventListener("error", function () {
            for (var e = 0; e < t.length; ++e) {
                r.pending = !1;
                var n = t[e],
                    r = i._cache[n.url];
                r.pending = !1, r.error = !0, r.callback(null, n.url)
            }
        }, !1), r.src = e
    }, t.prototype.image = function (e, t) {
        var n = this._cache[e];
        t = t || function () {}, typeof n == "undefined" && (n = {}, n.callback = Utils.createMulticall(), this._cache[e] = n);
        var r = n.img;
        return n.pending ? t && n.callback.add(t) : typeof r == "undefined" ? (r = new Image, n.img = r, t && n.callback.add(t), typeof fs != "undefined" ? fs.readFile(__dirname + e, function (t, i) {
            n.pending = !1, t ? (n.error = !0, n.callback(null, e)) : (r.src = i, n.x = 0, n.y = 0, n.width = r.width, n.height = r.height, n.callback(n, e))
        }) : (n.pending = !0, n.img = r, r.addEventListener("load", function () {
            n.pending = !1, n.x = 0, n.y = 0, n.width = r.width, n.height = r.height, n.callback(n, e)
        }, !1), r.addEventListener("error", function () {
            n.pending = !1, n.error = !0, n.callback(null, e)
        }, !1), r.src = e)) : (n.error && (n = null), t && t(n, e)), n && !n.pending ? n : null
    }, e.Resources = t
})(typeof exports != "undefined" ? exports : window);
if (typeof require != "undefined") {
    var utils = require("./utils.js");
    Utils = utils.Utils, Events = utils.Events
}(function (e) {
    var t = 0,
        n = Utils.extendTo(Events, function (e, t, n) {
            this["super"](), t = t || {};
            var r = t.requires,
                i = t.defaults,
                s = {}, o = {};
            for (var u in t)
                if (t.hasOwnProperty(u))
                    if (u.indexOf("on") == 0) {
                        var a = u.substring(2);
                        s[a] = t[u]
                    } else o[u] = t[u];
            return this._definition = t, this._name = e, this._objectListCache = [], this._objects = {}, this._objectsDirty = !0, this.engine = n, this.requires = r || [], this.defaults = i, this.listeners = s, this.methods = o, this
        });
    n.prototype.copy = function (e) {
        return new n(this._name, this._definition, e)
    }, n.prototype.applyBehaviour = function (e, t) {
        var n = this.methods,
            r = this.listeners;
        this._objectsDirty = !0, this._objects[e.id] = e;
        for (var i in n) n.hasOwnProperty(i) && !e.hasOwnProperty(i) && (e[i] = n[i]);
        e._boundListeners = e._boundListeners || {};
        for (var s in r) {
            var o = this._name + "." + s;
            if (r.hasOwnProperty(s) && !e._boundListeners[o]) {
                e._boundListeners[o] = !0;
                var u = r[s];
                e.on(s, u, e)
            }
        }
        this.defaults && Utils.applyDefaults(e, this.defaults);
        for (var a = 0, f = this.requires.length; a < f; ++a) {
            var l = this.requires[a];
            e.hasBehaviour(l) || e.addBehaviour(l)
        }
        return typeof n.init == "function" && t && n.init.call(e), this
    }, n.prototype.removeBehaviour = function (e) {
        var t = this.methods,
            n = this.listeners;
        this._objectsDirty = !0, delete this._objects[e.id];
        for (var r in t) t.hasOwnProperty(r) && e[r] === t[r] && delete e[r];
        e._boundListeners = e._boundListeners || {};
        for (var i in n) {
            var s = this._name + "." + i;
            n.hasOwnProperty(i) && e._boundListeners[s] && (e._boundListeners[s] = !1, e.off(i, n[i], e))
        }
        return typeof t.destroy == "function" && t.destroy.call(e), this
    }, n.prototype.hookupChild = function (e) {
        if (this._objects.hasOwnProperty(e.id)) return;
        this._objectsDirty = !0, this._objects[e.id] = e
    }, n.prototype.unhookChild = function (e) {
        if (!this._objects.hasOwnProperty(e.id)) return;
        this._objectsDirty = !0, delete this._objects[e.id]
    }, n.prototype.getObjects = function () {
        if (this._objectsDirty) {
            this._objectsDirty = !1, this._objectListCache = [];
            for (var e in this._objects) this._objects.hasOwnProperty(e) && this._objectListCache.push(this._objects[e])
        }
        return this._objectListCache
    }, n.prototype.getName = function () {
        return this._name
    };
    var r = Utils.extendTo(Events, function (e, t, n) {
        this["super"](), this._behaviours = {}, this._children = [], this._times = {}, this._updating = !1, this._pendingRemoves = [], this._pendingAdds = [], this.engine = n, this.active = !0, this.id = r.getNextId(), this.tag = null;
        if (t) {
            var i = {};
            for (var s in t)
                if (t.hasOwnProperty(s))
                    if (s.indexOf("on") == 0) {
                        var o = s.substring(2);
                        this.on(o, t[s])
                    } else i[s] = t[s], this[s] = t[s];
            this.savedDefaults = i
        }
        this.dx = this.dx || 0, this.dy = this.dy || 0, this.x = this.x || 0, this.y = this.y || 0;
        if (e)
            for (var u = 0, a = e.length; u < a; ++u) this.addBehaviour(e[u]);
        return this.on("attach", function (e) {
            var t = this._children;
            if (t.length > 0) {
                t = [].concat(t);
                for (var n = 0, r = t.length; n < r; ++n) {
                    var i = t[n];
                    i.engine != e && (i.engine = e, i.trigger("attach", e))
                }
            }
        }), this.on("subtick", function (e) {
            var t = this._children;
            this._updating = !0;
            var n = +(new Date);
            if (t.length > 0) {
                t = [].concat(t);
                for (var r = 0, i = t.length; r < i; ++r) {
                    var s = t[r];
                    s.active && s.trigger("subtick", e)
                }
            }
            var o = +(new Date);
            this.trigger("tick", e);
            var u = +(new Date);
            this._updating = !1;
            for (var r = 0, i = this._pendingRemoves.length; r < i; ++r) this.removeChild(this._pendingRemoves[r]);
            for (var r = 0, i = this._pendingAdds.length; r < i; ++r) this.addChild(this._pendingAdds[r]);
            this._pendingRemoves = [], this._pendingAdds = [], (this.sortOnTick || !1) && this._children.sort(function (e, t) {
                return~~ e.z - ~~t.z
            });
            var a = +(new Date)
        }), this.on("touchstart", function (e, t, n) {
            if (this.disabled) return;
            var r = this._children,
                i = !1;
            e -= ~~this.x, t -= ~~this.y, e /= this.scaleX || 1, t /= this.scaleY || 1, e -= ~~this.offsetX, t -= ~~this.offsetY;
            for (var s = r.length - 1; s >= 0; --s) {
                var o = r[s];
                i = o.trigger("touchstart", e, t, n) || n.cancelled;
                if (i) {
                    n.cancelled = !0;
                    break
                }
            }
            return i
        }), this.on("touchmove", function (e, t, n) {
            if (this.disabled) return;
            var r = this._children,
                i = !1;
            e -= ~~this.x, t -= ~~this.y, e /= this.scaleX || 1, t /= this.scaleY || 1, e -= ~~this.offsetX, t -= ~~this.offsetY;
            for (var s = r.length - 1; s >= 0; --s) {
                var o = r[s];
                i = o.trigger("touchmove", e, t, n) || n.cancelled;
                if (i) {
                    n.cancelled = !0;
                    break
                }
            }
            return i
        }), this.on("touchend", function (e, t, n) {
            if (this.disabled) return;
            var r = this._children,
                i = !1;
            e -= ~~this.x, t -= ~~this.y, e /= this.scaleX || 1, t /= this.scaleY || 1, e -= ~~this.offsetX, t -= ~~this.offsetY;
            for (var s = r.length - 1; s >= 0; --s) {
                var o = r[s];
                i = o.trigger("touchend", e, t, n) || n.cancelled;
                if (i) {
                    n.cancelled = !0;
                    break
                }
            }
            return i
        }), this.on("subrender", function (e) {
            game.breakOn === this.id && (game.breakOn = game.breakOn);
            var t = +(new Date),
                n = this._children,
                r = !1,
                i = ~~this.x - ~~this.centerX,
                s = ~~this.y - ~~this.centerY,
                o = ~~this.offsetX,
                u = ~~this.offsetY,
                a, f = !1,
                l, c = !1;
            typeof this.compositeOperation != "undefined" && (c = !0, l = e.globalCompositeOperation || "source-over", e.globalCompositeOperation = this.compositeOperation), typeof this.alpha != "undefined" && this.alpha !== 1 && (f = !0, a = e.globalAlpha, e.globalAlpha = this.alpha * a);
            if (typeof this.scaleX != "undefined" && this.scaleX !== 1 || typeof this.scaleY != "undefined" && this.scaleY !== 1 || typeof this.rotation != "undefined") r || (r = !0, e.save()), e.translate(i + ~~this.centerX, s + ~~this.centerY), (typeof this.scaleX != "undefined" && this.scaleX !== 1 || typeof this.scaleY != "undefined" && this.scaleY !== 1) && e.scale(typeof this.scaleX != "undefined" ? this.scaleX : 1, typeof this.scaleY != "undefined" ? this.scaleY : 1), this.rotation && e.rotate(this.rotation);
            r && e.translate(-i - ~~this.centerX, -s - ~~this.centerY), this.clip && (r || (r = !0, e.save()), e.beginPath(), e.rect(~~this.x, ~~this.y, ~~this.width, ~~this.height), e.closePath(), e.clip());
            var h = +(new Date);
            this.trigger("render", e);
            var p = +(new Date);
            r && e.translate(i, s);
            if (n.length > 0) {
                if (!r) {
                    var d = i + o + ~~this.centerX,
                        v = s + u + ~~this.centerY;
                    if (d !== 0 || v !== 0) r = !0, e.save(), e.translate(i + o + ~~this.centerX, s + u + ~~this.centerY)
                } else {
                    var d = o + ~~this.centerX,
                        v = u + ~~this.centerY;
                    (d !== 0 || v !== 0) && e.translate(o + ~~this.centerX, u + ~~this.centerY)
                }
                n = [].concat(n);
                for (var m = 0, g = n.length; m < g; ++m) {
                    var y = n[m],
                        b = y.y || 0,
                        w = b + ~~y.height;
                    if (this.clip) {
                        if (w < -u) continue;
                        if (b > this.height - u) continue
                    }
                    y.trigger("subrender", e)
                }
            }
            r && e.restore();
            var E = +(new Date);
            c && (e.globalCompositeOperation = "source-over"), f && (e.globalAlpha = a)
        }), this.on("gizmos", function (e) {
            var t = this._children;
            if (t.length > 0) {
                var n = !1,
                    r = ~~this.x,
                    i = ~~this.y,
                    s = ~~this.centerX,
                    o = ~~this.centerY;
                if (~~r !== 0 || ~~i !== 0) n || (n = !0, e.save()), e.translate(r, i);
                this.rotation && (n || (n = !0, e.save()), e.rotate(this.rotation));
                for (var u = 0, a = t.length; u < a; ++u) {
                    var f = t[u];
                    f.trigger("gizmos", e)
                }
                n && e.restore()
            }
        }), this.on("gizmos", function (e) {
            e.strokeStyle = "#0000ff", e.lineWidth = 1;
            if (typeof this.x != "undefined" && typeof this.y != "undefined" && this.width && this.height) {
                var t = this.x,
                    n = this.y;
                this.rotation && (e.save(), e.translate(t, n), e.rotate(this.rotation), t = 0, n = 0), this.centerX && (t -= this.centerX), this.centerY && (n -= this.centerY), e.strokeRect(t, n, this.width, this.height), this.rotation && e.restore(), e.fillStyle = "#0000ff", e.strokeStyle = "#0000ff", e.lineWidth = 2, e.beginPath(), e.arc(this.x, this.y, 4, 0, 2 * Math.PI, !1), e.fill(), e.beginPath(), e.moveTo(this.x, this.y), e.lineTo(this.x + this.dx / 20, this.y + this.dy / 20), e.closePath(), e.stroke(), e.closePath(), e.font = "24px sans-serif", e.fillText(this.id, this.x - ~~this.centerX + 10, this.y - ~~this.centerY + 30)
            }
        }), t && typeof t.init == "function" && t.init.call(this), this
    });
    r.prototype.trackEvent = function (e, t, n) {
        var r = [t, e].join("."),
            i = this._times[r],
            s = n;
        i && (s = (i + n) / 2), this._times[r] = s
    }, r.prototype.trackTime = function (e, t) {
        var n = this._times[e],
            r = t;
        n && (r = (n + t) / 2), this._times[e] = r
    }, r.prototype.boundingBox = function () {
        var e = ~~this.x - ~~this.centerX,
            t = ~~this.y - ~~this.centerY;
        return {
            x: e,
            y: t,
            width: this.width,
            height: this.height
        }
    }, r.prototype.debugLog = function (e, t) {
        function r(e) {
            e = e || [];
            var t = 0;
            for (var n = 0; n < e.length; ++n) t += e[n];
            return t
        }

        function i(e) {
            return e.length > 0 ? r(e) / e.length : 0
        }

        function s(e, t) {
            return e *= Math.pow(10, t), e = Math.round(e), e /= Math.pow(10, t), e
        }
        var n = "",
            o = [],
            u = this.tag ? this.tag + "(" + this.id + ")" : this.id;
        t = t || [];
        var a = [];
        for (var f in this._times)
            if (this._times.hasOwnProperty(f)) {
                a.push(f);
                var l = !1;
                for (var c = 0; c < t.length; ++c)
                    if (t[c] === f) {
                        l = !0;
                        break
                    }
                l || t.push(f)
            }
        o.push(u), o.push(e || "");
        for (var c = 0; c < t.length; ++c) this._times.hasOwnProperty(a[c]) ? o.push(s(this._times[a[c]], 3)) : o.push("");
        n += o.join("	") + "\n";
        var h = this._children;
        if (h.length > 0) {
            h = [].concat(h);
            for (var c = 0, p = h.length; c < p; ++c) {
                var d = h[c];
                n += d.debugLog(u, t)
            }
        }
        if (!e) {
            var v = ["Name", "Parent"];
            for (var c = 0; c < t.length; ++c) v.push(t[c]);
            n = v.join("	") + "\n" + n
        }
        return n
    }, r.prototype.debugLog2 = function (e) {
        function t(e) {
            e = e || [];
            var t = 0;
            for (var n = 0; n < e.length; ++n) t += e[n];
            return e.length > 0 ? t / e.length : 0
        }

        function n(e, t) {
            return e *= Math.pow(10, t), e = Math.round(e), e /= Math.pow(10, t), e
        }
        e = e || "";
        var r = [],
            i = this.tag ? this.tag + "(" + this.id + ")" : this.id,
            s = [];
        for (var o in this._times) this._times.hasOwnProperty(o) && s.push(o);
        if (!e) {
            var u = ["Name", "Parent"];
            for (var a = 0; a < s.length; ++a) u.push(s[a]);
            console.log(u.join("	"))
        }
        r.push(i), r.push(e);
        for (var a = 0; a < s.length; ++a) r.push(n(this._times[s[a]], 3));
        console.log(r.join("	"));
        var f = this._children;
        if (f.length > 0) {
            f = [].concat(f);
            for (var a = 0, l = f.length; a < l; ++a) {
                var c = f[a];
                c.debugLog(i)
            }
        }
    }, r.prototype.addModal = function (e) {
        var t = this;
        t.disabled = !0, e.on("completed", function () {
            t.disabled = !1, e.remove()
        }), this.parent.addChild(e)
    }, r.getNextId = function () {
        return Utils.toRadix(++t, 36)
    }, r.prototype.setTag = function (e) {
        return this.tag = tag, this
    }, r.prototype.getTag = function () {
        return this.tag || this.id
    }, r.prototype.addBehaviour = function (e) {
        var t;
        "" + e === e ? t = this.engine.behaviour(e) : t = e;
        var n = t.getName();
        return this._behaviours.hasOwnProperty(n) || (this._behaviours[n] = t, t.applyBehaviour(this, !0)), this
    }, r.prototype.removeBehaviour = function (e) {
        var t;
        return "" + e !== e && (e = e.getName()), this._behaviours.hasOwnProperty(e) && (t = this._behaviours[e], t.removeBehaviour(this), delete this._behaviours[e]), this
    }, r.prototype.hasBehaviour = function (e) {
        return this._behaviours.hasOwnProperty(e)
    }, r.prototype.getBehaviours = function () {
        var e = [];
        for (var t in this._behaviours) this._behaviours.hasOwnProperty(t) && e.push(t);
        return e
    }, r.prototype.remove = function () {
        this.parent && this.parent.removeChild(this, !0)
    }, r.prototype.removeAllChildren = function () {
        var e = [].concat(this._children);
        for (var t = 0; t < e.length; ++t) e[t].remove()
    }, r.prototype.bringToFront = function () {
        if (this.parent) {
            var e = this.parent;
            e.removeChild(this, !1), e.addChild(this)
        }
    }, r.prototype.addChild = function (e) {
        e.parent && e.parent.removeChild(e, !1), e.parent = this, this._children.push(e);
        if (!e.engine && this.engine) {
            for (var t in e._behaviours) {
                var n = e._behaviours[t];
                n.hookupChild(e)
            }
            e.engine = this.engine, e.trigger("attach", this.engine)
        }
        return e.engine && e.engine._addObject(e), this.trigger("childAdded", e), this
    }, r.prototype.indexOfChild = function (e) {
        for (var t = 0; t < this._children.length; ++t)
            if (this._children[t] === e) return t;
        return null
    }, r.prototype.insertChild = function (e, t) {
        return e.parent && e.parent.removeChild(e, !1), e.parent = this, this._children.splice(t, 0, e), !e.engine && this.engine && (e.engine = this.engine, e.trigger("attach", this.engine)), e.engine && e.engine._addObject(e), this.trigger("childAdded", e), this
    }, r.prototype.children = function () {
        return this._children
    }, r.prototype.removeChild = function (e, t) {
        if (e.parent !== this) return;
        e.parent = null, Utils.removeElement(this._children, e);
        if (e.engine && t) {
            e.engine.removeObject(e);
            var n = [].concat(e._children);
            for (var r = 0, i = n.length; r < i; ++r) e.removeChild(n[r], t);
            e._children = [];
            for (var s in e._behaviours) {
                var o = e._behaviours[s];
                o.unhookChild(e), o.removeBehaviour(e)
            }
        }
        return this.trigger("childRemoved", e), this
    }, r.prototype.delay = function (e, t) {
        function s(o) {
            i || (r += o, r >= e && (i = !0, r = e), i && (n.off("tick", s), t && t.call(n)))
        }
        var n = this,
            r = 0,
            i = !1;
        this.on("tick", s)
    }, r.prototype.ease = function (e, t, n, r) {
        function a(e) {
            if (!o) {
                s += e, s >= t && (o = !0, s = t);
                var f = s / t;
                f = Math.min(Math.max(f, 0), 1);
                var l = n(f);
                u(i, l), o && (i.off("tick", a), r && r.call(i))
            }
        }
        var i = this,
            s = 0,
            o = !1,
            u = Utils.ease(this, e || this.savedDefaults);
        n = n || Easing.easeLinear, this.on("tick", a)
    }, e.Behaviour = n, e.GameObject = r
})(typeof exports != "undefined" ? exports : window),

function (e) {
    var t = new Behaviour("mass", {
        ontick: function (e) {
            this.dy += this.engine.gravity * e, this.x += this.dx * e, this.y += this.dy * e
        },
        ongizmos: function (e) {},
        applyForce: function (e, t) {
            this.dx += e, this.dy += t
        }
    });
    e.Mass = t
}(typeof exports != "undefined" ? exports : window),

function (e) {
    var t = new Behaviour("accelerometer", {
        ontick: function (e) {
            if (this.engine.accelerationX || this.engine.accelerationY || this.engine.accelerationZ) this.accelerationX = this.engine.accelerationX, this.accelerationY = this.engine.accelerationY, this.accelerationZ = this.engine.accelerationZ, this.smoothAccelerationX = this.engine.smoothAccelerationX, this.smoothAccelerationY = this.engine.smoothAccelerationY, this.smoothAccelerationZ = this.engine.smoothAccelerationZ
        }
    }),
        n = new Behaviour("orientation", {
            ontick: function (e) {
                this.engine.orientation && (this.orientation = {
                    alpha: this.engine.orientation.alpha,
                    beta: this.engine.orientation.beta,
                    gamma: this.engine.orientation.gamma
                })
            }
        });
    e.Accelerometer = t, e.Orientation = n
}(typeof exports != "undefined" ? exports : window),

function (e) {
    var t = 80,
        n = new Behaviour("button", {
            requires: ["sprite"],
            init: function () {
                this.updateState()
            },
            isInBounds: function (e, n, r) {
                var i = this.x - ~~this.centerX - (r ? t : 0),
                    s = this.y - ~~this.centerY - (r ? t : 0),
                    o = e - i,
                    u = n - s;
                return o >= 0 && o < ~~this.width + (r ? 2 * t : 0) && u >= 0 && u < ~~this.height + (r ? 2 * t : 0) ? !0 : !1
            },
            updateState: function () {
                var e = this.wasDown;
                this.wasDown = this.isDown, this.url = this.isDown ? this.pressedUrl : this.unpressedUrl, !! e != !! this.isDown && this.trigger("stateChanged", this.isDown)
            },
            ontouchstart: function (e, t) {
                if (this.disabled) return;
                return this.isInBounds(e, t) ? (this.isDown = !0, this.touched = !0) : (this.isDown = !1, this.touched = !1), this.updateState(), this.isDown
            },
            ontouchmove: function (e, t) {
                if (this.disabled) return;
                return this.isInBounds(e, t, !0) ? this.touched && (this.isDown = !0) : this.isDown = !1, this.updateState(), this.touched
            },
            ontouchend: function (e, t) {
                var n = this.touched;
                return this.touched = !1, this.isInBounds(e, t, !0) || (this.isDown = !1), this.isDown && (this.isDown = !1, this.updateState(), this.disabled || this.trigger("click", e, t)), n
            }
        });
    e.GameButton = n
}(typeof exports != "undefined" ? exports : window),

function (e) {
    var t = new Behaviour("sprite", {
        defaults: {
            scaleX: 1,
            scaleY: 1
        },
        init: function () {
            var e = this;
            this.align && this.on("loaded", function () {
                this.align === "center" && (e.centerX = e.width / 2, e.centerY = e.height / 2)
            })
        },
        onrender: function (e) {
            var t, n = this;
            if (this.url && (!this.cachedImage || this.cachedUrl !== this.url)) {
                var r = !1;
                this.engine.resources.image(this.url, function (e, t) {
                    e && (r = !0, n.cachedImage = e, n.cachedUrl = t, n.width = n.width || e.width, n.height = n.height || e.height, n.srcwidth = e.width, n.srcheight = e.height, n.trigger("loaded"))
                })
            }
            this.cachedImage && (t = this.cachedImage.img);
            var i = ~~ (this.x + .5),
                s = ~~ (this.y + .5);
            if (t) {
                var o = this.width || (this.res ? this.res.width : 0),
                    u = this.height || (this.res ? this.res.height : 0);
                this.crop ? (w = this.width, h = this.height) : (w = this.srcwidth, h = this.srcheight), e.drawImage(t, (this.offsetX || 0) + this.cachedImage.x, (this.offsetY || 0) + this.cachedImage.y, w, h, i - ~~this.centerX, s - ~~this.centerY, o, u)
            }
        }
    });
    e.Sprite = t
}(typeof exports != "undefined" ? exports : window),

function (e) {
    var t = new Behaviour("text", {
        defaults: {
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            align: "left"
        },
        setText: function (e) {
            this.text = e
        },
        getLetterUrl: function (e) {
            return e + ".png"
        },
        getKerning: function (e) {
            return~~ this.kerning
        },
        transformLetter: function (e) {
            /[A-Z]/.test(e) && (e = "u" + e.toLowerCase());
            switch (e) {
            case "!":
                return "exclamation";
            case ":":
                return "colon";
            case ".":
                return "period";
            case ",":
                return "comma";
            case "-":
                return "hyphen";
            case " ":
                return "space";
            default:
                return e
            }
        },
        measure: function () {
            var e = 0,
                t = 0,
                n = !0,
                r = this.getLetterUrl("period"),
                i = this.getKerning("period"),
                s = (r.width || 0) * 3 + i * 3,
                o = this.fixedWidth ? this.fixedWidth : Number.MAX_VALUE,
                u = this.fixedWidth ? this.fixedWidth - s : Number.MAX_VALUE,
                a = -1;
            this.ellipsized = !1, this.ellipsisLength = 0;
            for (var f = 0, l = this.text.length; f < l; ++f) {
                var c = this.transformLetter(this.text[f]),
                    h = this.getLetterUrl(c),
                    p = null,
                    d = !1;
                c === "space" ? (d = !0, e += this.getSpaceSize ? this.getSpaceSize() : 0) : p = this.engine.resources.image(h), p ? (e += p.width, f !== this.text.length - 1 && (e += this.getKerning(c)), t = Math.max(p.height, t)) : (e += this.getKerning(c), d || (n = !1)), a < 0 && e >= u && (a = f - 1, u = e);
                if (e > o) {
                    this.ellipsized = !0, this.ellipsisLength = a, e = u;
                    break
                }
            }
            return n && (this.measuredText = this.text), this.measuredWidth = e, this.height = t, this.trigger("textchanged"), {
                width: this.measuredWidth,
                height: this.height
            }
        },
        onrender: function (e) {
            var t = ~~ (this.x + .5),
                n = ~~ (this.y + .5),
                r = 0;
            this.measuredText !== this.text && typeof this.align != "undefined" && this.measure();
            var i = t;
            if ("" + this.text !== this.text) return;
            this.align === "right" ? (i = t - this.measuredWidth, this.centerX = this.measuredWidth) : this.align === "center" && (i = t - this.measuredWidth / 2, this.centerX = this.measuredWidth / 2), this.width = this.measuredWidth;
            var s = this.ellipsized ? this.ellipsisLength : this.text.length;
            for (var o = 0; o < s; ++o) {
                var u = this.text[o];
                u = this.transformLetter(u), u === "space" && (r += this.getSpaceSize ? this.getSpaceSize() : 0);
                var a = this.engine.resources.image(this.getLetterUrl(u));
                if (!a) {
                    r += this.getKerning(u);
                    continue
                }
                e.drawImage(a.img, a.x, a.y, a.width, a.height, i + r, n, a.width, a.height), r += a.width, r += this.getKerning(u)
            }
            if (this.ellipsized)
                for (var o = 0; o < 3; ++o) {
                    var u = "period";
                    u = this.transformLetter(u);
                    var a = this.engine.resources.image(this.getLetterUrl(u));
                    if (!a) {
                        r += this.getKerning(u);
                        continue
                    }
                    e.drawImage(a.img, a.x, a.y, a.width, a.height, i + r, n, a.width, a.height), r += a.width, r += this.getKerning(u)
                }
        }
    }),
        n = new Behaviour("canvas-text", {
            defaults: {
                scaleX: 1,
                scaleY: 1,
                rotation: 0
            },
            setText: function (e) {
                this.text = e
            },
            measure: function (e) {
                var t = 0,
                    n = 0;
                !e && document && (e = document.createElement("canvas").getContext("2d")), this.font && (e.font = this.font);
                var r = e.measureText(this.text);
                return this.measuredText = this.text, this.measuredWidth = r.width, this.height = r.height, this.trigger("textchanged"), {
                    width: this.measuredWidth,
                    height: this.height
                }
            },
            onrender: function (e) {
                var t = ~~ (this.x + .5),
                    n = ~~ (this.y + .5) + ~~this.height,
                    r = 0;
                this.font && (e.font = this.font), this.color && (e.fillStyle = this.color), this.measuredText !== this.text && this.measure(e);
                var i = t;
                if ("" + this.text !== this.text) return;
                this.align === "right" ? (i = t - this.measuredWidth, this.centerX = this.measuredWidth) : this.align === "center" && (i = t - this.measuredWidth / 2, this.centerX = this.measuredWidth / 2), this.width = this.measuredWidth, this.strokeStyle && (e.lineWidth = 6, e.strokeStyle = this.strokeStyle, e.strokeText(this.text, i, n)), e.fillText(this.text, i, n)
            }
        });
    e.CanvasText = n, e.Text = t
}(typeof exports != "undefined" ? exports : window),

function (e) {
    function t(e, t) {
        var n = e.getObjects();
        for (var r = 0, i = n.length; r < i; ++r) {
            var s = n[r];
            s.collided = !1, s.collisions = {}
        }
        for (var r = 0, i = n.length; r < i; ++r) {
            var o = n[r],
                u = o.getBoundingBox();
            for (var a = r + 1; a < i; ++a) {
                var s = n[a];
                if (s === o) continue;
                if (!o.collidesWith(s) || !s.collidesWith(o)) continue;
                if (!o.collisions.hasOwnProperty(s.id)) {
                    var f = s.getBoundingBox();
                    if (o.checkAABBIntersection(u, f) || o.checkAABBIntersection(f, u)) o.collisions[s.id] = s, s.collisions[o.id] = o
                }
            }
        }
        for (var r = 0, i = n.length; r < i; ++r) {
            var s = n[r];
            for (var a in s.collisions) s.collided = !0, s.collisions.hasOwnProperty(a) && s.trigger("collision", s.collisions[a])
        }
    }
    var n = new Behaviour("collider", {
        ongizmos: function (e) {
            var t = this.getBoundingBox();
            this.collided ? (e.strokeStyle = "#ff0000", e.lineWidth = 4) : (e.strokeStyle = "#00ff00", e.lineWidth = 2), e.strokeRect(t.x, t.y, t.width, t.height)
        },
        checkAABBIntersection: function (e, t) {
            var n = t.x,
                r = t.x + t.width,
                i = t.y,
                s = t.y + t.height,
                o = [
                    [e.x, e.y],
                    [e.x + e.width, e.y],
                    [e.x, e.y + e.height],
                    [e.x + e.width, e.y + e.height]
                ];
            for (var u = 0; u < 4; ++u) {
                var a = o[u],
                    f = a[0],
                    l = a[1];
                if (f >= n && f <= r && l >= i && l <= s) return !0
            }
            return !1
        },
        getBoundingBox: function () {
            var e = ~~this.x - ~~this.centerX,
                t = ~~this.y - ~~this.centerY;
            return {
                x: e,
                y: t,
                width: this.width,
                height: this.height
            }
        },
        collidesWith: function (e) {
            return !0
        }
    });
    n.handleCollisions = t, e.Collider = n
}(typeof exports != "undefined" ? exports : window),

function (e) {
    var t = {};
    t.fadeInOut = function (t, n) {
        return function (e) {
            var r = n.direction || "out",
                i = n.duration || .5,
                s = n.color || "#000",
                o = game.object({
                    alpha: r === "in" ? 1 : 0,
                    x: 0,
                    y: 0,
                    width: t.engine.view.width,
                    height: t.engine.view.height,
                    onrender: function (e) {
                        e.fillStyle = s, e.fillRect(this.x, this.y, this.width, this.height)
                    }
                });
            o.ease({
                alpha: 1 - o.alpha
            }, i, o.alpha === 0 ? Easing.easeOut : Easing.easeIn, function () {
                e(), o.remove()
            }), t.addChild(o)
        }
    };
    var n = new Behaviour("scene", {
        onrender: function (e) {
            this.background && (e.fillStyle = this.background, e.fillRect(0, 0, this.engine.view.width, this.engine.view.height))
        },
        onentering: function (e) {
            function n() {
                t.trigger("enter"), e()
            }
            var t = this,
                r = this.transitionIn();
            r ? r.call(this, n) : n()
        },
        onleaving: function (e) {
            function n() {
                t.trigger("leave"), e(), t.leaving = !0
            }
            var t = this;
            t.leaving = !0;
            var r = this.transitionOut();
            r ? r.call(this, n) : n()
        },
        transitionIn: function () {
            return t.fadeInOut(this, {
                direction: "in",
                color: "#000",
                duration: .5
            })
        },
        transitionOut: function () {
            return t.fadeInOut(this, {
                direction: "out",
                color: "#000",
                duration: .5
            })
        },
        removeFromStack: function () {
            this.engine && this.engine.removeScene(this)
        }
    });
    e.Scene = n, e.Transition = t
}(typeof exports != "undefined" ? exports : window),

function (e) {
    var t = 200,
        n = new Behaviour("scroller", {
            defaults: {
                offsetX: 0,
                offsetY: 0,
                clip: !0
            },
            init: function () {
                this._lastDownEvent = null, this._lastTouchEvent = null, this._velocity = null
            },
            ontick: function () {
                var e = !1;
                this.contentWidth = 0, this.contentHeight = 0;
                for (var t = 0; t < this._children.length; ++t) {
                    var n = this._children[t],
                        r = n.x - ~~n.centerX + ~~n.width,
                        i = n.y - ~~n.centerY + ~~n.height;
                    this.contentWidth = Math.max(this.contentWidth, r), this.contentHeight = Math.max(this.contentHeight, i)
                }
                this._targetOffsetX && this.offsetX !== this._targetOffsetX && (e = !0, Math.abs(this.offsetX - this._targetOffsetX) < 1 ? this.offsetX = this._targetOffsetX : this.offsetX = this.offsetX + (this._targetOffsetX - this.offsetX) / 8), this._targetOffsetY && this.offsetY !== this._targetOffsetY && (e = !0, Math.abs(this.offsetY - this._targetOffsetY) < 1 ? this.offsetY = this._targetOffsetY : this.offsetY = this.offsetY + (this._targetOffsetY - this.offsetY) / 8), e && this.updateOffsets(this.offsetX, this.offsetY)
            },
            isInBounds: function (e, t) {
                var n = this.x - ~~this.centerX,
                    r = this.y - ~~this.centerY,
                    i = this.parent;
                while (i) n += i.x, r += i.y, i = i.parent;
                var s = e - n,
                    o = t - r;
                return s >= 0 && s < ~~this.width && o >= 0 && o < ~~this.height ? !0 : !1
            },
            boundedOffsets: function (e, t) {
                var n = this.scaleX || 1,
                    r = this.scaleY || 1;
                return e = Math.max((this.width - this.contentWidth) * n, e), t = Math.max((this.height - this.contentHeight) * r, t), e = Math.min(0, e), t = Math.min(0, t), this.trigger("scrollChanged", e, t), [e, t]
            },
            updateOffsets: function (e, t, n) {
                var r = this.boundedOffsets(e, t);
                this.offsetX = r[0], this.offsetY = r[1]
            },
            _markTouchEvent: function (e, t) {
                var n = +(new Date);
                if (this._lastTouchEvent) {
                    var r = n - this._lastTouchEvent.ts,
                        i = this._lastTouchEvent.x - e,
                        s = this._lastTouchEvent.y - t;
                    r = r || 1, r /= 2;
                    var o = this._velocity;
                    this._velocity = {
                        x: i / r,
                        y: s / r
                    }, o && (this._velocity = {
                        x: (this._velocity.x + o.y) / 2,
                        y: (this._velocity.y + o.y) / 2
                    })
                }
                this._lastTouchEvent = {
                    x: e,
                    y: t,
                    ts: n
                }
            },
            ontouchstart: function (e, n, r) {
                if (r.cancelled) return;
                this._velocity = null, this._lastTouchEvent = null, this._markTouchEvent(e, n);
                var i = +(new Date);
                if (this._lastDownEvent) {
                    var s = i - this._lastDownEvent;
                    if (s < t) {
                        this.trigger("doubletap", e, n), this._lastDownEvent = null;
                        return
                    }
                }
                this._lastDownEvent = i, this.isInBounds(e, n) ? (this.isDown = !0, this.touched = !0, this.initialX = e, this.initialY = n, this.initialOffsetX = ~~this.offsetX, this.initialOffsetY = ~~this.offsetY) : (this.isDown = !1, this.touched = !1)
            },
            ontouchmove: function (e, t, n) {
                if (n.cancelled) return;
                this._markTouchEvent(e, t), this.isDown && this.updateOffsets(e - this.initialX + this.initialOffsetX, t - this.initialY + this.initialOffsetY)
            },
            ontouchend: function (e, t, n) {
                if (n.cancelled) return;
                this._markTouchEvent(e, t);
                if (this.isDown) {
                    this.updateOffsets(e - this.initialX + this.initialOffsetX, t - this.initialY + this.initialOffsetY);
                    if (this._velocity) {
                        var r = this.boundedOffsets(this.offsetX - 100 * this._velocity.x, this.offsetY - 100 * this._velocity.y);
                        this._targetOffsetX = r[0], this._targetOffsetY = r[1]
                    }
                }
                this.touched = !1, this.isDown = !1
            }
        });
    e.Scroller = n
}(typeof exports != "undefined" ? exports : window);
var GameObject, Behaviour;
if (typeof require != "undefined") {
    var utils = require("./utils.js"),
        resources = require("./resources.js"),
        timers = require("./timers.js"),
        gameObject = require("./game-object.js");
    Utils = utils.Utils, Events = utils.Events, Resources = resources.Resources, Timer = timers.Timer, ClockTimer = timers.ClockTimer, GameObject = gameObject.GameObject, Behaviour = gameObject.Behaviour
}(function (e, t) {
    var n = 4,
        r = Utils.extendTo(GameObject, function (e) {
            var i = this;
            this["super"]({}, this), this.engine = this, this.entityCount = 0, this.accelerationHistory = [];
            var s = !1,
                o, u, a, f = navigator ? navigator.userAgent : "Android";
            if (a = /\bCPU.*OS (\d+(_\d+)?)/i.exec(f)) o = "ios", u = a[1].replace("_", ".");
            else if (a = /\bAndroid (\d+(\.\d+)?)/.exec(f)) o = "android", u = a[1];
            var l = +(new Date);
            t.ondevicemotion = function (e) {
                var t = e.accelerationIncludingGravity.x,
                    r = -e.accelerationIncludingGravity.y,
                    s = e.accelerationIncludingGravity.z;
                if (t < -10 || t > 10) return;
                t = t || 0, r = r || 0, s = s || 0, o === "android" && (t = -t, r = -r), t = Math.min(1, Math.max(-1, t / 10)), r = Math.min(1, Math.max(-1, r / 10)), s = Math.min(1, Math.max(-1, s / 10)), i.accelerationHistory.push({
                    x: t,
                    y: r,
                    z: s
                }), i.accelerationHistory.length > n && i.accelerationHistory.shift()
            }, t.ondeviceorientation = function (e) {
                var t = {
                    alpha: e.alpha,
                    beta: e.beta,
                    gamma: e.gamma
                };
                i.orientation && (t.alpha = (t.alpha + i.orientation.alpha) / 2, t.beta = (t.beta + i.orientation.beta) / 2, t.gamma = (t.gamma + i.orientation.gamma) / 2), i.orientation = t
            }, this.on("gizmos", function (e) {
                var t = 0;
                e.font = "bold 26px sans-serif", e.fillStyle = "#666", e.fillText(i.fps(), 4, t += 30), e.font = "bold 26px sans-serif", e.fillStyle = "#ff4444", e.fillText(i.accelerationX, 4, t += 30), e.font = "bold 26px sans-serif", e.fillStyle = "#44ff44", e.fillText(i.smoothAccelerationX, 4, t += 30)
            }), this.resources = new Resources, this.timer = e || new ClockTimer, this.timer.setCallback(function (e, t) {
                i._tick(e, t)
            }), this.activeScene = null, this._sceneHistory = [], this._display = {
                width: 960,
                height: 640
            }, this.view = {
                scaleMode: r.ScaleMode.FillHeight,
                x: 0,
                y: 0,
                width: 640,
                height: 960
            };
            if (cards && cards._ && cards._.bridge) {
                var c = cards._.bridge("Browser");
                c && c.forceRepaint && (this.browser = c, this.hasForceRepaint = !0)
            }
            this.backgroundColor = "#ffffff", this.touches = [], this.touch = {}, this.gravity = 2800, this._objects = {}, this._behaviours = {}, this._fixedStep = 17, this._skipThreshold = null, this._renderThreshold = null, this._timer = e, this._timestamp = 0, this._remaining = 0, this._lastRenderTime = 0, this.debugging = !1, this._fps = -1, this._renderings = 0, this._lastFpsUpdate = -1, this._updateTimes = [], this._renderTimes = [];
            for (var h = 0; h < r.DEFAULT_BEHAVIOURS.length; ++h) {
                var p = r.DEFAULT_BEHAVIOURS[h];
                this.behaviour(p._name, p._definition, this)
            }
            this.on("tick", function (e) {
                function t(e, t) {
                    var n = e[e.length - 1][t];
                    for (var r = 0; r < e.length; ++r) n = (e[r][t] + n) / 2;
                    return n
                }
                if (i.accelerationHistory.length > 0) {
                    var n = i.accelerationHistory[i.accelerationHistory.length - 1];
                    i.accelerationX = n.x, i.accelerationY = n.y, i.accelerationZ = n.z;
                    var r = t(i.accelerationHistory, "x"),
                        s = t(i.accelerationHistory, "y"),
                        o = t(i.accelerationHistory, "z");
                    i.accelerationXPre = (r + (i.accelerationXPre ? i.accelerationXPre : 0)) / 2, i.accelerationYPre = (s + (i.accelerationYPre ? i.accelerationYPre : 0)) / 2, i.accelerationZPre = (o + (i.accelerationZPre ? i.accelerationZPre : 0)) / 2, i.smoothAccelerationX = i.accelerationXPre, i.smoothAccelerationY = i.accelerationYPre, i.smoothAccelerationZ = i.accelerationZPre
                }
                var u = i.touch,
                    a = {};
                a.cancelled = !1, !u.wasDown && u.isDown ? u.wasDown = !0 : u.wasDown && u.isDown ? i.trigger("touchmove", u.x, u.y, a) : u.wasDown && !u.isDown && (u.wasDown = !1, i.trigger("touchend", u.x, u.y, a))
            })
        });
    r.prototype.removeScene = function (e) {
        for (var t = 0; t < this._sceneHistory.length; ++t)
            if (this._sceneHistory[t] === e) {
                this._sceneHistory.splice(t, 1);
                break
            }
    }, r.prototype.backScene = function () {
        var e = this._sceneHistory.pop();
        this.changeScene(e, !0)
    }, r.prototype.changeScene = function (e, t) {
        function i(i) {
            var s = 0;
            if (r) {
                var o = !t || typeof i != "undefined" && !i;
                s = n.indexOfChild(r), r.parent.removeChild(r, !o), o && n._sceneHistory.push(r)
            }
            n.insertChild(e, s), n.activeScene = e, e.trigger("entering", function () {})
        }
        var n = this,
            r = this.activeScene;
        r ? r.trigger("leaving", i) : i()
    }, r.ScaleMode = {
        Fixed: "fixed",
        Center: "center",
        Fill: "fill",
        FillWidth: "fill-width",
        FillHeight: "fill-height"
    }, r.FPS_60 = 1e3 / 60 / 1e3, r.FPS_30 = 1e3 / 30 / 1e3, r.FPS_10 = .1, r.prototype.updateDisplay = function (e, t) {
        var n = this._display.width,
            r = this._display.height;
        this._display.width = e, this._display.height = t;
        if (this._display.width !== n || this._display.height !== t) this._display.changed = !0, this._fixViewSize()
    }, r.prototype.fps = function () {
        return Math.round(this._fps)
    }, r.prototype.setCanvas = function (e) {
        function n(n) {
            var r = n.clientX,
                i = n.clientY;
            return r = t.view.width * r / e.clientWidth, i = t.view.height * i / e.clientHeight, [r, i]
        }

        function r(e) {
            var t = e.changedTouches,
                r = n(t ? t[0] : e),
                i = r[0],
                s = r[1];
            return [i, s]
        }

        function i(e, r, i) {
            var s = e.changedTouches;
            if (!s) return;
            for (var o = 0; o < s.length; ++o) {
                var u = {}, a = s[o];
                if (!a) continue;
                if (!r) {
                    t.touches[o] = null;
                    continue
                }
                var f = n(a);
                u.x = f[0], u.y = f[1], u.isDown = r, u.clicked = i, t.touches[o] = u
            }
        }

        function s(e) {
            var n = r(e.changedTouches ? e.changedTouches[0] : e),
                s = {};
            return t.touch.x = n[0], t.touch.y = n[1], t.touch.isDown = !0, t.touch.wasDown = !1, t.touch.clicked = !0, e.touches.length === 3 && (t.touch.trippleTapped = !0, t.debugging = !t.debugging, console.log(t.debugLog())), i(e, !0, !0), e.preventDefault(), s.cancelled = !1, t.trigger("touchstart", t.touch.x, t.touch.y, s), !1
        }

        function o(e) {
            var n = r(e.changedTouches ? e.changedTouches[0] : e);
            return t.touch.x = n[0], t.touch.y = n[1], t.touch.wasDown = !0, i(e, !0, !1), e.preventDefault(), !1
        }

        function u(e) {
            var n = r(e.changedTouches ? e.changedTouches[0] : e);
            return t.touch.x = n[0], t.touch.y = n[1], t.touch.isDown = !1, i(e, !1, !1), t._lastX = -1, t._lastY = -1, e.preventDefault(), !1
        }
        var t = this;
        this.canvas = e, this.context = this.canvas.getContext("2d"), this._display.changed = !0, e.addEventListener("touchstart", s, !1), e.addEventListener("touchmove", o, !1), e.addEventListener("touchend", u, !1)
    }, r.prototype.setSize = function (e, t) {
        this.view.width = e, this.view.height = t, this._display.changed = !0
    }, r.prototype._fixViewSize = function () {
        if (this._display.changed) {
            this._display.changed = !1;
            switch (this.view.scaleMode) {
            case r.ScaleMode.Fixed:
                break;
            case r.ScaleMode.Center:
                this.view.xoffset = Math.round((this._display.width - this.view.width) / 2), this.view.yoffset = Math.round((this._display.height - this.view.height) / 2);
                break;
            case r.ScaleMode.Fill:
                this.view.xoffset = 0, this.view.yoffset = 0, this.view.width = this._display.width, this.view.height = this._display.height;
                break;
            case r.ScaleMode.FillWidth:
                this.view.xoffset = 0, this.view.yoffset = 0, this.view.width = Math.round(this._display.width * this.view.height / this._display.height);
                break;
            case r.ScaleMode.FillHeight:
                this.view.xoffset = 0, this.view.yoffset = 0, this.view.height = Math.round(this._display.height * this.view.width / this._display.width)
            }
            this.canvas.width = this.view.width, this.canvas.height = this.view.height, this.trigger("resize", this.view.width, this.view.height), this._isReady || (this._isReady = !0, this.trigger("ready"))
        }
    }, r.prototype.ready = function (e) {
        this._isReady ? e.call(this) : this.once("ready", e)
    };
    var i = [];
    r.prototype._tick = function (e, n) {
        function h() {
            f = +(new Date);
            if (i.length > 12) {
                var e = [].concat(i);
                i.length = 0, t.setTimeout(function () {
                    console.log(e.join("\n"))
                }, 0)
            }
        }
        var r = this,
            s = e,
            o = 0,
            u = +(new Date),
            a, f, l, c = !1;
        this._eventTimeline = {}, this._eventDeltas = {}, this._eventStack = {}, n(), s *= r.multiplier || 1, typeof this.canvas !== undefined && r.updateDisplay(this.canvas.clientWidth, this.canvas.clientHeight);
        if (r._fixedStep) {
            r._remaining += s;
            while (r._remaining >= r._fixedStep) r._timestamp += r._fixedStep / 1e3, c = !0, r.trigger("subtick", r._fixedStep / 1e3, r._timestamp), ++o, r._remaining -= r._fixedStep
        } else r._remaining = s, s = r._remaining / 1e3, r._remaining = 0, r._timestamp += s, c = !0, r.trigger("subtick", s, r._timestamp);
        a = +(new Date), c && (r._updateTimes.unshift(a - u), r._updateTimes.length >= 10 && r._updateTimes.pop());
        if (c && r.context) {
            r._render(r.context);
            var p = +(new Date);
            if (p - r._lastFpsUpdate > 1e3) {
                var d = r._renderings;
                r._fps < 0 && (r._fps = d), r._fps = (4 * d + r._fps) / 5, r._renderings = 0, r._lastFpsUpdate = p
            }
            this.hasForceRepaint, h()
        } else h()
    }, r.prototype._render = function (e) {
        var t = +(new Date),
            n;
        this._lastRenderTime = this._timestamp, e.setTransform(1, 0, 0, 1, 0, 0), e.fillStyle = this.background, e.fillRect(0, 0, this.view.width, this.view.height), this.trigger("subrender", e), ++this._renderings, n = +(new Date), this._renderTimes.unshift(n - t), this._renderTimes.length >= 10 && this._renderTimes.pop(), this.debugging && (e.setTransform(1, 0, 0, 1, 0, 0), this.trigger("gizmos", e))
    }, r.prototype.object = function (e) {
        var t = Array.prototype.slice.call(arguments, 0);
        if (t.length > 0) {
            var n = t[t.length - 1];
            n instanceof Behaviour || "" + n === n ? e = null : (e = n, t.pop())
        }
        var r = new GameObject(t, e, this);
        return this._addObject(r), r.trigger("attach", this), r
    }, r.prototype.behaviour = function (e, t) {
        if (this._behaviours.hasOwnProperty(e)) return this._behaviours[e];
        var n = new Behaviour(e, t, this);
        return this._behaviours[e] = n, n
    }, r.prototype.start = function (e, t) {
        this.timer.start()
    }, r.prototype.getObject = function (e) {
        return this._objects[e]
    }, r.prototype._addObject = function (e) {
        var t = !this._objects.hasOwnProperty(e.id);
        this._objects[e.id] = e;
        if (t) {
            this.entityCount++;
            var n = e._behaviours;
            for (var r in n) n.hasOwnProperty(r) && n[r].applyBehaviour(e)
        }
    }, r.prototype.removeObject = function (e) {
        if (this._objects.hasOwnProperty(e.id)) {
            this.entityCount--, delete this._objects[e.id];
            var t = e._behaviours;
            for (var n in t) t.hasOwnProperty(n) && t[n].removeBehaviour(e)
        }
    }, e.Game = r, e.GameObject = GameObject, e.Behaviour = Behaviour
})(typeof exports != "undefined" ? exports : window, typeof window != "undefined" ? window : exports), Game.DEFAULT_BEHAVIOURS = [Sprite, CanvasText, Text, Mass, Collider, Accelerometer, Orientation, Scene, Scroller, GameButton];
var MAX_HORIZONAL_SPEED = 75e3,
    JUMP_SPEED = 1900,
    BOOST_SPEED = 2500,
    MAX_SPEED = 3600,
    MAX_FALLING_SPEED = 50,
    FLOOR_GAP = 120,
    FLOOR_REMOVAL_DISTANCE = 650,
    PLATFORM_WIDTH = 157,
    SUNSET_START = 2e3,
    SUNSET_DURATION = 1e4;
cards && cards.browser && cards.browser.setOrientationLock && cards.browser.setOrientationLock("portrait");
if (cards._.bridge) {
    var browser = cards._.bridge("Browser");
    browser && (browser.setStatusBarVisible && browser.setStatusBarVisible({
        visible: !1
    }), browser.setBacklightTimeoutEnabled && browser.setBacklightTimeoutEnabled({
        enabled: !1
    }))
}
var game = new Game,
    _spritesheetReady = !1,
    _spritesheetCallbacks = [];
game.setSize(640, 960), game.background = "#8ed8eb", game.gravity = 3900, cards.ready(function () {
    targetCanvas = document.getElementsByTagName("canvas")[0], game.setCanvas(targetCanvas), game.updateDisplay(document.documentElement.offsetWidth, document.documentElement.offsetHeight), game.start(),

    function (e, t, n, r, i, s, o) {
        e.GoogleAnalyticsObject = i, e[i] = e[i] || function () {
            (e[i].q = e[i].q || []).push(arguments)
        }, e[i].l = 1 * new Date, s = t.createElement(n), o = t.getElementsByTagName(n)[0], s.async = 1, s.src = r, o.parentNode.insertBefore(s, o)
    }(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-41544316-1", "hamsterjailbreak.com"), ga("send", "pageview")
});
var scoreBg = new Image;
contentReady(function () {
    game.ready(function () {
        scoreBg.src = "res/score-background.png";
        var e = game.object("sprite", {
            x: game.view.width - 110,
            y: 20,
            url: "res/coin-icon.png"
        });
        game.coins = game.object("canvas-text", {
            x: game.view.width - 20,
            y: 50,
            align: "right",
            font: "bold 30px sans-serif",
            color: "#774a4d",
            tag: "coins",
            init: function () {
                var e = this;
                this.addCoins(~~localStorage.coins), game.on("coins", function (t) {
                    e.addCoins(t)
                })
            },
            ontextchanged: function () {
                e.x = game.view.width - this.measuredWidth - 70
            },
            addCoins: function (t) {
                this.count = ~~this.count + ~~t, localStorage.coins = this.count, this.setText(Utils.delimit(~~this.count)), e.y = 20, e.ease({
                    y: -10
                }, .2, Easing.easeRebound), this.y = 50, this.ease({
                    y: 20
                }, .2, Easing.easeRebound)
            }
        }), game.cloudBg = game.object({
            tag: "cloudbg"
        }), game.cloudCamera = game.object("camera", {
            tag: "cloud-camera",
            cloudTarget: game.cloudBg
        }), game.cloudCamera.addChild(game.cloudBg), game.cloudCamera.moveCamera(game.view.height);
        var t = game.object();
        game.addChild(t), t.addChild(game.coins), t.addChild(e);
        var n = game.object("scene-home");
        game.changeScene(n), game.insertChild(game.cloudCamera, 0)
    })
}), game.on("tick", function (e) {
    Collider.handleCollisions(game.behaviour("collider"), e)
}), SPRITESHEET("spritesheet.png", [{
    url: "res/background-sunrise.png",
    x: 985,
    y: 470,
    width: 644,
    height: 304
}, {
    url: "res/button-buy-2500-on.png",
    x: 1465,
    y: 118,
    width: 340,
    height: 94
}, {
    url: "res/button-buy-2500.png",
    x: 1092,
    y: 214,
    width: 340,
    height: 94
}, {
    url: "res/button-buy-500-on.png",
    x: 750,
    y: 214,
    width: 340,
    height: 94
}, {
    url: "res/button-buy-500.png",
    x: 408,
    y: 214,
    width: 340,
    height: 94
}, {
    url: "res/close-button-on.png",
    x: 1519,
    y: 46,
    width: 66,
    height: 68
}, {
    url: "res/close-button.png",
    x: 1587,
    y: 46,
    width: 66,
    height: 68
}, {
    url: "res/cloud-0.png",
    x: 943,
    y: 329,
    width: 226,
    height: 129
}, {
    url: "res/cloud-1.png",
    x: 1434,
    y: 214,
    width: 187,
    height: 113
}, {
    url: "res/cloud-2.png",
    x: 1171,
    y: 329,
    width: 239,
    height: 130
}, {
    url: "res/cloud-3.png",
    x: 608,
    y: 329,
    width: 210,
    height: 123
}, {
    url: "res/coin-icon.png",
    x: 1593,
    y: 2,
    width: 41,
    height: 41
}, {
    url: "res/coin.png",
    x: 1655,
    y: 46,
    width: 70,
    height: 69
}, {
    url: "res/hamster-jump.png",
    x: 2,
    y: 470,
    width: 129,
    height: 146
}, {
    url: "res/hamster-rest.png",
    x: 133,
    y: 470,
    width: 129,
    height: 146
}, {
    url: "res/hamster-title.png",
    x: 1174,
    y: 118,
    width: 289,
    height: 91
}, {
    url: "res/hat-crown.png",
    x: 1431,
    y: 46,
    width: 86,
    height: 57
}, {
    url: "res/hat-wizard.png",
    x: 1727,
    y: 46,
    width: 102,
    height: 70
}, {
    url: "res/jailbreak-title.png",
    x: 264,
    y: 470,
    width: 361,
    height: 148
}, {
    url: "res/new-high-score.png",
    x: 938,
    y: 118,
    width: 234,
    height: 81
}, {
    url: "res/score-numbers/number-0.png",
    x: 192,
    y: 329,
    width: 63,
    height: 113
}, {
    url: "res/score-numbers/number-1.png",
    x: 326,
    y: 329,
    width: 41,
    height: 113
}, {
    url: "res/score-numbers/number-2.png",
    x: 435,
    y: 329,
    width: 62,
    height: 113
}, {
    url: "res/score-numbers/number-3.png",
    x: 369,
    y: 329,
    width: 64,
    height: 113
}, {
    url: "res/score-numbers/number-4.png",
    x: 257,
    y: 329,
    width: 67,
    height: 113
}, {
    url: "res/score-numbers/number-5.png",
    x: 124,
    y: 329,
    width: 66,
    height: 113
}, {
    url: "res/score-numbers/number-6.png",
    x: 1689,
    y: 214,
    width: 65,
    height: 113
}, {
    url: "res/score-numbers/number-7.png",
    x: 2,
    y: 329,
    width: 53,
    height: 113
}, {
    url: "res/score-numbers/number-8.png",
    x: 1756,
    y: 214,
    width: 64,
    height: 113
}, {
    url: "res/score-numbers/number-9.png",
    x: 1623,
    y: 214,
    width: 64,
    height: 113
}, {
    url: "res/score-numbers/number-comma.png",
    x: 57,
    y: 329,
    width: 34,
    height: 113
}, {
    url: "res/score-numbers/number-period.png",
    x: 93,
    y: 329,
    width: 29,
    height: 113
}, {
    url: "res/platform-blue.png",
    x: 1105,
    y: 46,
    width: 161,
    height: 49
}, {
    url: "res/platform-green.png",
    x: 676,
    y: 46,
    width: 101,
    height: 49
}, {
    url: "res/platform-orange.png",
    x: 779,
    y: 46,
    width: 161,
    height: 49
}, {
    url: "res/platform-purple.png",
    x: 1268,
    y: 46,
    width: 161,
    height: 49
}, {
    url: "res/platform-white.png",
    x: 942,
    y: 46,
    width: 161,
    height: 49
}, {
    url: "res/play-button-on.png",
    x: 205,
    y: 214,
    width: 201,
    height: 94
}, {
    url: "res/play-button.png",
    x: 2,
    y: 214,
    width: 201,
    height: 94
}, {
    url: "res/score-background.png",
    x: 627,
    y: 470,
    width: 356,
    height: 224
}, {
    url: "res/score-border.png",
    x: 348,
    y: 118,
    width: 584,
    height: 74
}, {
    url: "res/share-button-on.png",
    x: 175,
    y: 118,
    width: 171,
    height: 70
}, {
    url: "res/share-button.png",
    x: 2,
    y: 118,
    width: 171,
    height: 70
}, {
    url: "res/shop-button-text.png",
    x: 2,
    y: 2,
    width: 80,
    height: 31
}, {
    url: "res/shop-icon.png",
    x: 820,
    y: 329,
    width: 121,
    height: 125
}, {
    url: "res/shop-title.png",
    x: 1412,
    y: 329,
    width: 404,
    height: 139
}, {
    url: "res/star-blue.png",
    x: 537,
    y: 46,
    width: 44,
    height: 44
}, {
    url: "res/star-green.png",
    x: 583,
    y: 46,
    width: 45,
    height: 44
}, {
    url: "res/star-orange.png",
    x: 490,
    y: 46,
    width: 45,
    height: 44
}, {
    url: "res/star-red.png",
    x: 630,
    y: 46,
    width: 44,
    height: 45
}, {
    url: "res/text/text-0.png",
    x: 524,
    y: 2,
    width: 25,
    height: 34
}, {
    url: "res/text/text-1.png",
    x: 577,
    y: 2,
    width: 19,
    height: 34
}, {
    url: "res/text/text-2.png",
    x: 598,
    y: 2,
    width: 25,
    height: 34
}, {
    url: "res/text/text-3.png",
    x: 551,
    y: 2,
    width: 24,
    height: 34
}, {
    url: "res/text/text-4.png",
    x: 496,
    y: 2,
    width: 26,
    height: 34
}, {
    url: "res/text/text-5.png",
    x: 625,
    y: 2,
    width: 24,
    height: 34
}, {
    url: "res/text/text-6.png",
    x: 685,
    y: 2,
    width: 25,
    height: 34
}, {
    url: "res/text/text-7.png",
    x: 744,
    y: 2,
    width: 24,
    height: 34
}, {
    url: "res/text/text-8.png",
    x: 770,
    y: 2,
    width: 25,
    height: 34
}, {
    url: "res/text/text-9.png",
    x: 1447,
    y: 2,
    width: 25,
    height: 34
}, {
    url: "res/text/text-a.png",
    x: 367,
    y: 46,
    width: 24,
    height: 42
}, {
    url: "res/text/text-ampersand.png",
    x: 712,
    y: 2,
    width: 30,
    height: 34
}, {
    url: "res/text/text-at.png",
    x: 651,
    y: 2,
    width: 32,
    height: 34
}, {
    url: "res/text/text-b.png",
    x: 463,
    y: 46,
    width: 25,
    height: 42
}, {
    url: "res/text/text-c.png",
    x: 320,
    y: 46,
    width: 22,
    height: 42
}, {
    url: "res/text/text-colon.png",
    x: 261,
    y: 2,
    width: 15,
    height: 34
}, {
    url: "res/text/text-comma.png",
    x: 278,
    y: 2,
    width: 17,
    height: 34
}, {
    url: "res/text/text-d.png",
    x: 46,
    y: 46,
    width: 25,
    height: 42
}, {
    url: "res/text/text-dollar.png",
    x: 297,
    y: 2,
    width: 24,
    height: 34
}, {
    url: "res/text/text-doublequote.png",
    x: 323,
    y: 2,
    width: 22,
    height: 34
}, {
    url: "res/text/text-e.png",
    x: 1636,
    y: 2,
    width: 24,
    height: 42
}, {
    url: "res/text/text-exclamation.png",
    x: 347,
    y: 2,
    width: 15,
    height: 34
}, {
    url: "res/text/text-f.png",
    x: 1742,
    y: 2,
    width: 20,
    height: 42
}, {
    url: "res/text/text-g.png",
    x: 2,
    y: 46,
    width: 25,
    height: 42
}, {
    url: "res/text/text-h.png",
    x: 73,
    y: 46,
    width: 24,
    height: 42
}, {
    url: "res/text/text-hyphen.png",
    x: 382,
    y: 2,
    width: 18,
    height: 34
}, {
    url: "res/text/text-i.png",
    x: 29,
    y: 46,
    width: 15,
    height: 42
}, {
    url: "res/text/text-j.png",
    x: 1791,
    y: 2,
    width: 18,
    height: 42
}, {
    url: "res/text/text-k.png",
    x: 1764,
    y: 2,
    width: 25,
    height: 42
}, {
    url: "res/text/text-l.png",
    x: 393,
    y: 46,
    width: 14,
    height: 42
}, {
    url: "res/text/text-leftparenthesis.png",
    x: 425,
    y: 2,
    width: 16,
    height: 34
}, {
    url: "res/text/text-m.png",
    x: 99,
    y: 46,
    width: 33,
    height: 42
}, {
    url: "res/text/text-n.png",
    x: 1662,
    y: 2,
    width: 24,
    height: 42
}, {
    url: "res/text/text-o.png",
    x: 265,
    y: 46,
    width: 25,
    height: 42
}, {
    url: "res/text/text-p.png",
    x: 1688,
    y: 2,
    width: 25,
    height: 42
}, {
    url: "res/text/text-period.png",
    x: 443,
    y: 2,
    width: 15,
    height: 34
}, {
    url: "res/text/text-q.png",
    x: 1715,
    y: 2,
    width: 25,
    height: 42
}, {
    url: "res/text/text-question.png",
    x: 402,
    y: 2,
    width: 21,
    height: 34
}, {
    url: "res/text/text-r.png",
    x: 191,
    y: 46,
    width: 19,
    height: 42
}, {
    url: "res/text/text-rightparenthesis.png",
    x: 364,
    y: 2,
    width: 16,
    height: 34
}, {
    url: "res/text/text-s.png",
    x: 344,
    y: 46,
    width: 21,
    height: 42
}, {
    url: "res/text/text-semicolon.png",
    x: 797,
    y: 2,
    width: 17,
    height: 34
}, {
    url: "res/text/text-singlequote.png",
    x: 848,
    y: 2,
    width: 16,
    height: 34
}, {
    url: "res/text/text-t.png",
    x: 134,
    y: 46,
    width: 20,
    height: 42
}, {
    url: "res/text/text-u.png",
    x: 409,
    y: 46,
    width: 24,
    height: 42
}, {
    url: "res/text/text-ua.png",
    x: 1241,
    y: 2,
    width: 29,
    height: 34
}, {
    url: "res/text/text-ub.png",
    x: 1272,
    y: 2,
    width: 26,
    height: 34
}, {
    url: "res/text/text-uc.png",
    x: 1212,
    y: 2,
    width: 27,
    height: 34
}, {
    url: "res/text/text-ud.png",
    x: 1152,
    y: 2,
    width: 29,
    height: 34
}, {
    url: "res/text/text-ue.png",
    x: 1300,
    y: 2,
    width: 23,
    height: 34
}, {
    url: "res/text/text-uf.png",
    x: 1347,
    y: 2,
    width: 23,
    height: 34
}, {
    url: "res/text/text-ug.png",
    x: 1388,
    y: 2,
    width: 28,
    height: 34
}, {
    url: "res/text/text-uh.png",
    x: 1418,
    y: 2,
    width: 27,
    height: 34
}, {
    url: "res/text/text-ui.png",
    x: 1372,
    y: 2,
    width: 14,
    height: 34
}, {
    url: "res/text/text-uj.png",
    x: 1325,
    y: 2,
    width: 20,
    height: 34
}, {
    url: "res/text/text-uk.png",
    x: 1183,
    y: 2,
    width: 27,
    height: 34
}, {
    url: "res/text/text-ul.png",
    x: 1127,
    y: 2,
    width: 23,
    height: 34
}, {
    url: "res/text/text-um.png",
    x: 893,
    y: 2,
    width: 33,
    height: 34
}, {
    url: "res/text/text-un.png",
    x: 928,
    y: 2,
    width: 27,
    height: 34
}, {
    url: "res/text/text-underscore.png",
    x: 866,
    y: 2,
    width: 25,
    height: 34
}, {
    url: "res/text/text-uo.png",
    x: 816,
    y: 2,
    width: 30,
    height: 34
}, {
    url: "res/text/text-up.png",
    x: 957,
    y: 2,
    width: 25,
    height: 34
}, {
    url: "res/text/text-uq.png",
    x: 1013,
    y: 2,
    width: 30,
    height: 34
}, {
    url: "res/text/text-ur.png",
    x: 1073,
    y: 2,
    width: 26,
    height: 34
}, {
    url: "res/text/text-us.png",
    x: 1101,
    y: 2,
    width: 24,
    height: 34
}, {
    url: "res/text/text-ut.png",
    x: 1045,
    y: 2,
    width: 26,
    height: 34
}, {
    url: "res/text/text-uu.png",
    x: 984,
    y: 2,
    width: 27,
    height: 34
}, {
    url: "res/text/text-uv.png",
    x: 1562,
    y: 2,
    width: 29,
    height: 34
}, {
    url: "res/text/text-uw.png",
    x: 460,
    y: 2,
    width: 34,
    height: 34
}, {
    url: "res/text/text-ux.png",
    x: 1504,
    y: 2,
    width: 28,
    height: 34
}, {
    url: "res/text/text-uy.png",
    x: 1474,
    y: 2,
    width: 28,
    height: 34
}, {
    url: "res/text/text-uz.png",
    x: 1534,
    y: 2,
    width: 26,
    height: 34
}, {
    url: "res/text/text-v.png",
    x: 435,
    y: 46,
    width: 26,
    height: 42
}, {
    url: "res/text/text-w.png",
    x: 156,
    y: 46,
    width: 33,
    height: 42
}, {
    url: "res/text/text-x.png",
    x: 212,
    y: 46,
    width: 26,
    height: 42
}, {
    url: "res/text/text-y.png",
    x: 292,
    y: 46,
    width: 26,
    height: 42
}, {
    url: "res/text/text-z.png",
    x: 240,
    y: 46,
    width: 23,
    height: 42
}, {
    url: "res/tournament-button-text.png",
    x: 84,
    y: 2,
    width: 175,
    height: 31
}, {
    url: "res/trophy-icon.png",
    x: 499,
    y: 329,
    width: 107,
    height: 118
}]);
var CAMERA_FUDGE_FACTOR = 50;
game.behaviour("camera", {
    init: function () {
        var e = this
    },
    moveCamera: function (e) {
        this.cameraY = e;
        var t = this.highWatermark,
            n = Math.max(0, 2 * game.view.height / 3 - this.cameraY);
        this.highWatermark = Math.floor(Math.max(this.highWatermark || 0, -this.cameraY)), this.trigger("cameraMoved", this.highWatermark, t), this.targetY = n, this.y += (this.targetY - this.y) / 10, this.y = Math.max(this.targetY, this.y)
    },
    ontick: function (e) {
        this.targetY && (this.y += (this.targetY - this.y) / 10, this.y = Math.max(this.targetY, this.y), game.trigger("cameraChanged", this.y))
    }
}), game.behaviour("platform", {
    requires: ["sprite"],
    defaults: {
        url: "res/platform-orange.png",
        z: 1
    },
    ontick: function (e) {
        var t = this.hamster.x - this.hamster.centerX;
        t + this.hamster.width > this.x && t < this.x + this.width && this.hamster.y < this.y + 30 && this.hamster.y + this.hamster.dy * e > this.y + 10 && this.hamster.dy > 0 && (this.hamster.y = this.y + 10, this.hamster.trigger("bounce"), this.trigger("collision", this.hamster))
    }
}), game.behaviour("moving-platform", {
    requires: ["platform"],
    defaults: {
        url: "res/platform-purple.png",
        time: 0
    },
    ontick: function (e) {
        this.time += e, this.time > this.duration && (this.time -= this.duration);
        var t = (Math.sin(2 * Math.PI * this.time / this.duration) + 1) / 2;
        this.x = this.startX + (this.targetX - this.startX) * t
    }
}), game.behaviour("small-platform", {
    requires: ["platform"],
    defaults: {
        url: "res/platform-green.png"
    }
}), game.behaviour("falling-platform", {
    requires: ["platform"],
    defaults: {
        url: "res/platform-blue.png",
        alpha: 1
    },
    oncollision: function (e) {
        var t = this;
        e.dy >= 0 && !this.killed && (this.killed = !0, this.delay(.2, function () {
            t.ease({
                y: t.y + 200,
                alpha: 0
            }, .7, Easing.easeIn, function () {
                t.remove()
            })
        }))
    }
}), game.behaviour("coin", {
    requires: ["collider", "sprite"],
    defaults: {
        url: "res/coin.png",
        z: 1
    },
    oncollision: function (e) {
        var t = this;
        !this.killed && e.boost && !e.bouncing && (this.killed = !0, game.trigger("coins", 1), e.boost(BOOST_SPEED), this.delay(.001, function () {
            t.remove()
        }))
    }
}), game.behaviour("floor-planner", {
    init: function () {
        function i() {
            if (n >= e.length) return;
            var t = e[n];
            t.ease({
                y: t.targetY
            }, .15, Easing.EaseInOut, i), ++n
        }
        this.plan = [], this.lastYOffset = easyModePlan(-FLOOR_GAP, this.engine.view.width, 20, this.plan), this.updateFloors();
        var e = this.engine.behaviour("platform").getObjects(),
            t = this.engine.behaviour("coin").getObjects();
        e = e.concat(t);
        for (var n = 0; n < e.length; ++n) {
            var r = e[n];
            r.targetY = r.y, r.y = -100
        }
        var n = 0;
        i()
    },
    ontick: function (e) {
        this.updateFloors && this.updateFloors()
    },
    updateFloors: function () {
        typeof this.yOffset == "undefined" && (this.yOffset = -5 * FLOOR_GAP);
        while (this.yOffset < this.highWatermark + 2 * this.engine.view.height) {
            if (!this.plan || this.plan.length === 0) {
                var e = Math.random();
                this.plan = [], this.lastYOffset = randomPlan(this.lastYOffset || 0, this.engine.view.width, 20, this.plan)
            }
            var t = this.plan.shift();
            if (t) {
                var n = t.toGameObject(this.engine.view.height, this.hamster);
                this.yOffset = t.y, this.target.addChild(n)
            }
        }
        var r = this.engine.behaviour("platform").getObjects(),
            i = this.engine.behaviour("coin").getObjects(),
            s = [];
        r = r.concat(i);
        for (var o = 0; o < r.length; ++o) {
            var t = r[o];
            t.y > this.hamster.y + FLOOR_REMOVAL_DISTANCE && s.push(t)
        }
        for (var o = 0; o < s.length; ++o) s[o].remove()
    }
}), PlatformPlan.WIDTH = 157, PlatformPlan.prototype.getType = function () {
    return "basic"
}, PlatformPlan.prototype.toGameObject = function (e, t) {
    var n = game.object("platform", {
        x: this.x,
        y: e - this.y,
        hamster: t
    });
    return n
};
var CoinPlan = Utils.extendTo(PlatformPlan, function (t, n) {
    this.super(t, n)
});
CoinPlan.prototype.getType = function () {
    return "cookie"
}, CoinPlan.prototype.toGameObject = function (e, t) {
    var n = game.object("coin", {
        x: this.x,
        y: e - this.y,
        hamster: t
    });
    return n
};
var SmallPlatformPlan = Utils.extendTo(PlatformPlan, function (t, n) {
    this.super(t, n)
});
SmallPlatformPlan.prototype.getType = function () {
    return "small"
}, SmallPlatformPlan.prototype.toGameObject = function (e, t) {
    var n = game.object("small-platform", {
        x: this.x,
        y: e - this.y,
        hamster: t
    });
    return n
};
var FallingPlatformPlan = Utils.extendTo(PlatformPlan, function (t, n) {
    this.super(t, n)
});
FallingPlatformPlan.prototype.getType = function () {
    return "falling"
}, FallingPlatformPlan.prototype.toGameObject = function (e, t) {
    var n = game.object("falling-platform", {
        x: this.x,
        y: e - this.y,
        hamster: t
    });
    return n
};
var MovingPlatformPlan = Utils.extendTo(PlatformPlan, function (t, n, r, i) {
    this.super(t, n), this.endX = r, this.duration = i
});
MovingPlatformPlan.prototype.getType = function () {
    return "moving"
}, MovingPlatformPlan.prototype.toGameObject = function (e, t) {
    var n = game.object("moving-platform", {
        x: this.x,
        y: e - this.y,
        startX: this.x,
        duration: this.duration,
        targetX: this.endX,
        hamster: t
    });
    return n
}, game.behaviour("cloud", {
    requires: [Sprite],
    init: function () {
        this.url = "res/cloud-" + this.cloudIndex + ".png"
    },
    ontick: function (e) {
        this.x += this.dx * e, this.x > this.engine.view.width && (this.x = -(1 + Math.random()) * this.width), this.parent.parent.yOffset - this.originY > 2 * this.engine.view.height && this.remove()
    }
}), game.behaviour("cloud-planner", {
    ontick: function (e) {
        var t = this;
        while (typeof this.cloudYOffset == "undefined" || ~~this.cloudYOffset < this.highWatermark + 2 * this.engine.view.height) {
            var n = Math.random() / 4,
                r = game.object("cloud", {
                    x: Math.random() * this.engine.view.width - 200,
                    startY: t.y,
                    originY: ~~this.cloudYOffset + Math.random() * 200 + 400,
                    y: 0,
                    z: n,
                    dx: Math.random() * 30 + 10,
                    cloudIndex: ~~(Math.random() * 4)
                });
            this.cloudYOffset = r.originY, r.originY -= this.engine.view.height / 2, r.on("tick", function (e) {
                var n = this.originY + this.z * (this.startY - t.y);
                this.y = this.engine.view.height - n, this.x = (this.x || 0) + this.dx * e
            }), this.cloudTarget.insertChild(r, 0), r.trigger("tick", 10)
        }
    }
}), game.behaviour("wrap", {
    ontick: function (e) {
        var t = this.centerX ? this.centerX : 0,
            n = this.x - t,
            r = this.x - t + this.width;
        r > this.engine.view.width + this.width ? this.x = -this.width + t : n < -this.width && (this.x = this.engine.view.width + this.width - t)
    }
}), game.behaviour("bounce", {
    ontick: function (e) {
        var t = this.centerY ? this.y - this.centerY : this.y,
            n = this.centerY ? this.y + (this.height - this.centerY) : this.y + this.height;
        n > this.engine.view.height && this.parent.parent.highWatermark === 0 && (this.y = this.engine.view.height - (this.height - this.centerY) - 1, this.paused || this.trigger("bounce"))
    }
}), game.behaviour("star-emitter", {
    defaults: {
        time: 0
    },
    ontick: function (e) {
        this.time += e;
        var t = .075;
        if (this.time > t && this.dy < 0) {
            this.time = 0;
            var n = ["blue", "orange", "red", "green"],
                r = n[Math.floor(Math.random() * n.length)],
                i = (Math.random() - .5) * this.width / 2,
                s = game.object(Sprite, {
                    x: this.x + i,
                    y: this.y + 16,
                    compositeOperation: "lighter",
                    url: "res/star-" + r + ".png",
                    align: "center",
                    alpha: 1
                }),
                o = .8 + .5 * Math.random();
            s.ease({
                alpha: 0
            }, o, Easing.easeOut, function () {
                s.remove()
            }), s.ease({
                x: s.x + i,
                y: s.y + Math.abs(i)
            }, o, Easing.easeOut), this.parent.insertChild(s, 0)
        }
    }
}), game.behaviour("rotate", {
    ontick: function (e) {
        if (this.accelerationX) {
            var t = this.accelerationX < 0 ? -1 : 1,
                n = Math.min(1, Math.max(-1, this.accelerationX));
            n = Math.pow(Math.abs(n), 1.2) * t, typeof this.moveRate == "undefined" && (this.moveRate = n), n = (this.moveRate * 4 + n) / 5, this.rotation = Math.PI / 3.5 * n, this.moveRate = n
        } else this.orientation && (this.moveRate = this.orientation.gamma * MAX_HORIZONAL_SPEED / 180 / 1e4, this.rotation = Math.PI * this.orientation.gamma / 90); if (this.smoothAccelerationX) {
            var r = this.smoothAccelerationX < 0 ? -1 : 1;
            this.smoothMoveRate = Math.min(1, Math.max(-1, this.smoothAccelerationX)), this.smoothMoveRate = Math.pow(Math.abs(this.smoothMoveRate), 1.2) * r, this.rotation = Math.PI / 3.5 * this.smoothMoveRate
        }
        if (this.scaleY === 1) {
            var i = 2 * MAX_HORIZONAL_SPEED * this.moveRate * e / 2;
            this.dx = i
        }
    }
}), game.behaviour("hat-tophat", {
    init: function () {
        this.hat = game.object("sprite", {
            url: "res/tophat-rest.png",
            x: -42,
            y: -this.height - 22
        }), this.addChild(this.hat)
    },
    onloaded: function () {
        this.hat.x = -42, this.hat.y = -this.height - 22
    }
}), game.behaviour("hat-wizard", {
    init: function () {
        this.hat = game.object("sprite", {
            url: "res/hat-wizard.png",
            x: -48,
            y: -this.height - 24
        }), this.addChild(this.hat)
    },
    onloaded: function () {
        this.hat.x = -48, this.hat.y = -this.height - 24
    }
}), game.behaviour("hat-crown", {
    init: function () {
        this.hat = game.object("sprite", {
            url: "res/hat-crown.png",
            x: -40,
            y: -this.height - 26
        }), this.addChild(this.hat)
    },
    onloaded: function () {
        this.hat.x = -40, this.hat.y = -this.height - 26
    },
    ontick: function () {
        this.dy < 0 ? this.hat.y = -this.height - 22 : this.hat.y = -this.height - 26
    }
}), game.behaviour("hamster-dress", {
    requires: ["hat-crown", "sprite"],
    defaults: {
        dx: 0,
        dy: 0,
        rotation: 0,
        url: "res/hamster-rest.png",
        restingUrl: "res/hamster-rest.png",
        jumpingUrl: "res/hamster-jump.png"
    },
    onloaded: function () {
        this.centerX = this.width / 2, this.centerY = this.height
    }
}), game.behaviour("hamster", {
    requires: ["bounce", "wrap", "accelerometer", "orientation", "rotate", "collider", "star-emitter", "hamster-dress"],
    defaults: {
        dx: 0,
        dy: 0,
        rotation: 0,
        url: "res/hamster-rest.png",
        restingUrl: "res/hamster-rest.png",
        jumpingUrl: "res/hamster-jump.png"
    },
    init: function () {},
    boost: function (e) {
        this.boostAmount = ~~this.boostAmount + e, this.scaleY = 1, this.bouncing = !1
    },
    ontick: function (e) {
        this.scaleY === 1 && !this.paused ? this.dy += this.engine.gravity * e : (this.dx = 0, this.dy = 0), this.dy < 0 ? this.url = this.jumpingUrl : this.url = this.restingUrl, this.boostAmount && (this.dy = 0, this.dy -= ~~this.boostAmount), this.boostAmount = 0, this.dy < -MAX_SPEED ? this.dy = -MAX_SPEED : this.dy > MAX_SPEED && (this.dy = MAX_SPEED), this.dx && (this.x += this.dx * e);
        if (this.dy) {
            var t = this.dy / MAX_SPEED,
                n = Math.abs(this.dy) / this.dy,
                r = .5 * Math.pow(t, 2) * n + .2 * t;
            this.y += Math.min(MAX_FALLING_SPEED, r * e * MAX_SPEED * 2.3)
        }
    },
    collidesWith: function (e) {
        return e.hasBehaviour("coin") ? !0 : this.dy > 0 && this.y - 30 < e.y ? !0 : !1
    },
    getBoundingBox: function () {
        var e = ~~this.x - ~~this.centerX,
            t = ~~this.y - this.height;
        return {
            x: e + 10,
            y: t,
            width: this.width - 20,
            height: this.height
        }
    },
    onbounce: function () {
        if (this.bouncing || this.paused) return;
        this.bouncing = !0, this.dy = 0, this.scaleY = 1, this.ease({
            scaleY: .4,
            scaleX: 1.4
        }, .25, Easing.easeRebound, function () {
            this.bouncing = !1, this.paused ? this.dy = 0 : this.dy = -JUMP_SPEED
        })
    }
}), game.behaviour("scene-home", {
    requires: ["scene"],
    init: function () {
        var e = this;
        this.play = game.object("button", {
            unpressedUrl: "res/play-button.png",
            pressedUrl: "res/play-button-on.png",
            centerX: 98,
            x: this.engine.view.width + 200,
            y: this.engine.view.height / 2,
            onclick: function () {
                var e = game.object("scene-game");
                game.changeScene(e, !0)
            }
        }), this.jailbreakTitle = game.object("sprite", {
            url: "res/jailbreak-title.png",
            x: this.engine.view.width / 2,
            y: -200,
            centerX: 176
        }), this.title = game.object("sprite", {
            url: "res/hamster-title.png",
            x: this.engine.view.width / 2,
            y: -120,
            centerX: 145
        }), this.addChild(this.play), this.addChild(this.jailbreakTitle), this.addChild(this.title), addHomeButtons(this)
    },
    transitionIn: function () {
        var e = this;
        return function (t) {
            e.title.delay(.2, function () {
                e.title.ease({
                    y: 120
                }, .8, Easing.easeOutBounce)
            }), e.sunrise.ease(e.sunrise.states.ready, 1.2, Easing.easeOut), e.jailbreakTitle.ease({
                y: 160
            }, .8, Easing.easeOutBounce, function () {
                e.play.ease({
                    x: e.engine.view.width / 2
                }, .1, Easing.easeOut, function () {
                    e.tournament.ease(e.tournament.states.ready, .2, Easing.easeIn), e.shop.delay(.1, function () {
                        e.shop.ease(e.shop.states.ready, .2, Easing.easeIn, function () {
                            t()
                        })
                    })
                })
            })
        }
    },
    transitionOut: function () {
        return function (e) {
            var t = this;
            this.sunrise.ease(null, 1.2, Easing.easeOut), this.play.ease({
                x: -200
            }, .1, Easing.easeIn, function () {
                t.title.ease({
                    y: -100
                }, .2, Easing.easeIn, function () {
                    t.jailbreakTitle.ease({
                        y: -200
                    }, .2, Easing.easeIn, function () {
                        t.tournament.ease(null, .2, Easing.easeIn, function () {
                            t.shop.ease(null, .2, Easing.easeIn, function () {
                                e()
                            })
                        })
                    })
                })
            })
        }
    }
}), game.behaviour("score-text", {
    requires: ["text"],
    kerning: -8,
    align: "center",
    getLetterUrl: function (e) {
        return "res/score-numbers/number-" + e + ".png"
    },
    getKerning: function (e) {
        return e === "comma" ? -12 : -8
    }
}), game.behaviour("scene-game", {
    requires: ["scene"],
    defaults: {
        tag: "game-scene"
    },
    transitionIn: function () {
        return null
    },
    transitionOut: function () {
        return null
    },
    onenter: function () {
        ga("send", "pageview", "/game")
    },
    init: function () {
        function r(t) {
            e.collectedCoins = ~~e.collectedCoins + t
        }
        var e = this,
            t = game.object("sprite", {
                url: "res/go.png",
                x: game.view.width + 200,
                y: game.view.height / 2,
                centerX: 87,
                centerY: 64,
                scaleX: 1,
                scaleY: 1,
                alpha: 1
            }),
            n = game.object("sprite", {
                url: "res/ready.png",
                x: game.view.width + 200,
                y: game.view.height / 2,
                centerX: 125,
                centerY: 55
            });
        this.bg = game.object({
            tag: "bg"
        }), this.foreground = game.object({
            tag: "fg"
        }), this.hamster = game.object("hamster", {
            x: game.view.width / 2,
            y: game.view.height,
            z: 100,
            tag: "hamster"
        }), this.score = game.object("score-text", {
            x: game.view.width / 2,
            y: 40,
            tag: "score"
        }), this.hamsterCam = game.object("floor-planner", "camera", {
            hamster: this.hamster,
            tag: "hamster-camera",
            target: this.bg,
            oncameraMoved: function (t, n) {
                e.trigger("scoreUpdated", t, n)
            }
        }), this.hamster.on("tick", function () {
            e.finished ? this.y > this.maximumY + 4e3 && !e.leaving && (e.leaving = !0) : (e.hamsterCam.moveCamera(this.y), this.maximumY = this.maximumY ? Math.min(this.y, this.maximumY) : this.y, this.y > this.maximumY + 1e3 && (e.endTime = +(new Date), e.finished = !0, e.trigger("killed")))
        }), this.on("scoreUpdated", function (t, n) {
            e.scoreValue = t, e.score.setText(Utils.delimit(~~t))
        }), game.on("coins", r), this.on("killed", function () {
            game.off("coins", r), requireUser(function (t) {
                scoreboard.uploadScore(t.userId, e.scoreValue, ~~e.collectedCoins, ~~e.seed, e.endTime - e.startTime, function () {})
            }), this.score.ease({
                y: 220
            }, .5, Easing.easeIn);
            var t = !0;
            if (t) {
                var n = game.object("sprite", {
                    url: "res/new-high-score.png",
                    x: this.engine.view.width / 2 - 70,
                    y: -300,
                    states: {
                        ready: {
                            y: 300
                        }
                    }
                });
                n.ease(n.states.ready, 1.2, Easing.easeOutBounce), this.addChild(n)
            }
            ga("send", "pageview", "/win"), addHomeButtons(this), e.tournament.ease(e.tournament.states.ready, .2, Easing.easeIn), e.shop.delay(.1, function () {
                e.shop.ease(e.shop.states.ready, .2, Easing.easeIn, function () {})
            });
            var i = game.object("button", {
                unpressedUrl: "res/share-button.png",
                pressedUrl: "res/share-button-on.png",
                centerX: 83,
                x: this.engine.view.width + 200,
                y: this.engine.view.height / 2 - 50,
                onclick: function () {
                    e.shareScore()
                }
            });
            this.addChild(i);
            var s = game.object("button", {
                unpressedUrl: "res/play-button.png",
                pressedUrl: "res/play-button-on.png",
                centerX: 98,
                x: this.engine.view.width + 200,
                y: this.engine.view.height / 2 + 50,
                onclick: function () {
                    var e = game.object("scene-game");
                    game.changeScene(e, !0)
                }
            });
            this.addChild(s), i.ease({
                x: this.engine.view.width / 2
            }, .4, Easing.easeIn, function () {
                s.ease({
                    x: this.engine.view.width / 2
                }, .4, Easing.easeIn)
            })
        }), this.hamsterCam.on("tick", function () {
            game.cloudCamera.moveCamera(e.hamsterCam.cameraY)
        }), this.hamsterCam.addChild(this.bg), this.hamsterCam.addChild(this.foreground), this.foreground.addChild(this.hamster), this.hamster.paused = !0, n.ease({
            x: this.engine.view.width / 2
        }, .6, Easing.easeIn, function () {
            n.delay(.5, function () {
                n.ease({
                    x: -400
                }, .3, Easing.easeInOut, function () {
                    n.remove()
                }), t.ease({
                    x: this.engine.view.width / 2
                }, .3, Easing.easeIn, function () {
                    t.ease({
                        scaleX: 8,
                        scaleY: 8,
                        alpha: 0
                    }, .5, Easing.easeIn, function () {
                        t.remove()
                    }), e.startTime = +(new Date), e.hamster.paused = !1
                })
            })
        }), this.addChild(this.hamsterCam), this.addChild(this.score), this.addChild(n), this.addChild(t)
    },
    shareScore: function () {
        var e = document.createElement("canvas"),
            t = e.getContext("2d"),
            n = this.score.measuredWidth + 150;
        e.width = n, e.height = 220, e.style.width = e.width + "px", e.style.height = e.height + "px", t.fillStyle = "#8ed8eb", t.fillRect(0, 0, e.width, e.height), t.drawImage(scoreBg, 0, 0, scoreBg.width, scoreBg.height), this.hamster.url = this.hamster.defaults.jumpingUrl, t.save(), t.translate(-this.hamster.x, -this.hamster.y), t.translate(this.hamster.centerX, this.hamster.centerY), this.hamster.rotation = -Math.PI / 6, t.translate(50, 40), this.hamster.trigger("subrender", t), t.restore(), t.save(), t.translate(-this.score.x + this.score.centerX + 120, -this.score.y + 70), this.score.trigger("subrender", t), t.restore();
        var r = e.toDataURL();
        cards.kik.send({
            title: this.score.text,
            pic: r,
            big: !0,
            noForward: !0
        })
    }
}), game.behaviour("scene-store", {
    requires: ["scene"],
    init: function () {
        var e = this;
        this.buy500 = game.object("button", {
            unpressedUrl: "res/button-buy-500.png",
            pressedUrl: "res/button-buy-500-on.png",
            centerX: 168,
            x: this.engine.view.width / 2,
            y: this.engine.view.height / 2 - 50,
            onclick: purchaseCoins("com.kik.card.hamster.basic", 500)
        }), this.buy2500 = game.object("button", {
            unpressedUrl: "res/button-buy-2500.png",
            pressedUrl: "res/button-buy-2500-on.png",
            centerX: 168,
            x: this.engine.view.width / 2,
            y: this.engine.view.height / 2 + 50,
            onclick: purchaseCoins("com.kik.card.hamster.premium", 2500)
        }), this.title = game.object("sprite", {
            url: "res/shop-title.png",
            x: this.engine.view.width / 2,
            y: -200,
            centerX: 200
        }), this.close = game.object("button", {
            unpressedUrl: "res/close-button.png",
            pressedUrl: "res/close-button-on.png",
            x: 160,
            y: -20,
            onclick: function () {
                this.engine.backScene()
            }
        }), this.hamster = game.object("hamster-dress", {
            x: this.engine.view.width / 2,
            y: this.engine.view.height / 2,
            scaleX: 2,
            scaleY: 2
        }), cards.purchase && (this.addChild(this.buy500), this.addChild(this.buy2500)), this.addChild(this.title), this.addChild(this.hamster), this.title.addChild(this.close)
    },
    transitionIn: function () {
        var e = this;
        return function (t) {
            e.title.ease({
                y: 80
            }, .8, Easing.easeOutBounce, function () {
                t()
            })
        }
    },
    onenter: function () {
        ga("send", "pageview", "/store")
    },
    transitionOut: function () {
        var e = this;
        return function (t) {
            e.title.ease(null, .4, Easing.easeOut, function () {
                t()
            })
        }
    }
});
try {
    cards.purchase && cards.purchase.init(["com.kik.card.hamster.basic", "com.kik.card.hamster.premium"])
} catch (e) {
    console.log(e)
}
game.behaviour("white-text", {
    requires: ["text"],
    kerning: -5,
    font: "bold 30px sans-serif",
    color: "#774a4d",
    getLetterUrl: function (e) {
        return "res/text/text-" + e + ".png"
    },
    getSpaceSize: function () {
        return 10
    }
}), game.behaviour("score-row", {
    requires: ["sprite"],
    defaults: {
        url: "res/score-border.png",
        width: 584,
        height: 74
    },
    init: function () {
        var e = 20;
        this.rankText = this.engine.object("white-text", {
            text: "" + this.rank,
            x: e,
            y: 25
        }), e += this.rankText.measure().width + 24, this.profilePicImage = this.engine.object("sprite", {
            url: this.profilePic,
            x: e,
            y: 10,
            width: 55,
            height: 55
        }), e += this.profilePicImage.width + 20, this.scoreText = this.engine.object("white-text", {
            text: Utils.delimit(this.score),
            align: "right",
            x: 566,
            y: 25
        }), this.displayNameText = this.engine.object("white-text", {
            text: this.displayName,
            x: e,
            y: 25,
            fixedWidth: 566 - (this.scoreText.measure().width || 300) - e - 20
        }), this.addChild(this.rankText), this.addChild(this.scoreText), this.addChild(this.displayNameText), this.addChild(this.profilePicImage)
    },
    onenter: function () {
        ga("send", "pageview", "/tournament")
    },
    onclick: function () {
        this.username && cards.kik && cards.kik.showProfile && cards.kik.showProfile(this.username)
    }
}), game.behaviour("scene-tournament", {
    requires: ["scene"],
    init: function () {
        var e = this;
        this.scoreOffset = 0, this.title = game.object("sprite", {
            url: "res/tournament-title.png",
            x: this.engine.view.width / 2,
            y: -200,
            centerX: 220
        }), this.close = game.object("button", {
            unpressedUrl: "res/close-button.png",
            pressedUrl: "res/close-button-on.png",
            x: 180,
            y: -20,
            onclick: function () {
                this.engine.backScene()
            }
        }), this.scoreScroller = this.engine.object("scroller", {
            states: {
                ready: {
                    y: 280
                }
            },
            x: 28,
            y: this.engine.view.height + 100,
            height: this.engine.view.height - 500,
            width: 584
        }), this.scoreScroller.on("scrollChanged", function (t, n) {
            var r = e.scoreScroller,
                i = 800,
                s = !1,
                o = !1;
            r.contentHeight - r.height === -n ? s = !0 : r.contentHeight - -n - r.height < i && (o = !0), (o || s) && e.loadMoreScores()
        }), this.loadMoreScores(), this.addChild(this.title), this.addChild(this.scoreScroller), this.title.addChild(this.close)
    },
    loadMoreScores: function () {
        var e = this,
            t = this.scoreOffset;
        !this.finishedLoading && !this.loadingScores && (this.loadingScores = !0, scoreboard.getRange(t, 25, function (t) {
            t.length === 0 && (e.finishedLoading = !0), e.yoffset = e.addScoreRange(t, e.scoreOffset, ~~e.yoffset), e.scoreOffset += t.length, e.loadingScores = !1
        }))
    },
    transitionIn: function () {
        var e = this;
        return function (t) {
            e.title.ease({
                y: 80
            }, .8, Easing.easeOutBounce, function () {
                t()
            }), e.scoreScroller.ease(e.scoreScroller.states.ready, .5, Easing.easeIn)
        }
    },
    transitionOut: function () {
        var e = this;
        return function (t) {
            e.title.ease(null, .4, Easing.easeOut, function () {
                t()
            }), e.scoreScroller.ease(null, .4, Easing.easeOut)
        }
    },
    addScoreRange: function (e, t, n) {
        for (var r = 0; r < e.length; ++r) {
            var i = e[r],
                s = r + t + 1,
                o = this.engine.object("score-row", {
                    rank: s,
                    score: i.score,
                    displayName: i.displayName,
                    profilePic: i.profilePic,
                    username: i.username,
                    x: -2,
                    y: n,
                    height: 74
                });
            n += 72, this.scoreScroller.addChild(o)
        }
        return n
    }
})