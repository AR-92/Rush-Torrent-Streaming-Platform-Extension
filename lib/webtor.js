!(function (e) {
  var t = {};

  function n(i) {
    if (t[i]) return t[i].exports;
    var o = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, i) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (n.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          n.d(
            i,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return i;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 4));
})([
  function (e, t) {
    e.exports = function (e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    };
  },
  function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        0
      ),
      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
        _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__
      ),
      _uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2),
      iframe_resizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3),
      iframe_resizer__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(
        iframe_resizer__WEBPACK_IMPORTED_MODULE_2__
      );
    const defaults = {
      baseUrl: "https://webtor.io",
      width: "800px",
      height: null,
      mode: "video",
      subtitles: [],
      poster: null,
      header: !0,
      title: null,
      imdbId: null,
      version: "0.2.8",
    };
    class WebtorGenerator {
      constructor() {
        _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(
          this,
          "TORRENT_FETCHED",
          "torrent fetched"
        ),
          _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(
            this,
            "TORRENT_ERROR",
            "torrent error"
          ),
          _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(
            this,
            "INIT",
            "init"
          ),
          _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(
            this,
            "INJECT",
            "inject"
          );
      }
      push(data) {
        const id = Object(_uuid__WEBPACK_IMPORTED_MODULE_1__.a)(),
          elId = "webtor-" + id;
        data = Object.assign(defaults, data);
        const el = document.getElementById(data.id);
        if (!el) throw `Failed to find element with id "${data.id}"`;
        if (data.torrentUrl && data.magnet)
          throw "There should be only one magnet or torrentUrl";
        if (!data.torrentUrl && !data.magnet)
          throw "magnet or torrentUrl required";
        const params = {
          id: id,
          mode: data.mode,
          theme: data.theme,
          pwd: data.pwd,
          file: data.file,
          version: data.version,
        };
        Object.keys(params).forEach((e) =>
          void 0 === params[e] ? delete params[e] : {}
        );
        const paramString = new URLSearchParams(params),
          url = `${data.baseUrl}/show?${paramString.toString()}`,
          iframe = document.createElement("iframe");
        (iframe.id = elId),
          data.width && (iframe.width = data.width),
          data.height && (iframe.height = data.height),
          iframe.setAttribute("allowFullScreen", ""),
          iframe.setAttribute("webkitAllowFullScreen", ""),
          iframe.setAttribute("mozAllowFullScreen", ""),
          (iframe.scrolling = "no"),
          (iframe.frameBorder = "0"),
          (iframe.onload = () => {
            Object(iframe_resizer__WEBPACK_IMPORTED_MODULE_2__.iframeResize)(
              { heightCalculationMethod: "taggedElement", checkOrigin: !1 },
              "#" + elId
            );
          }),
          (iframe.allow =
            "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"),
          el.appendChild(iframe),
          (iframe.src = url);
        const self = this;
        window.addEventListener("message", function (event) {
          const d = event.data;
          "object" == typeof d &&
            d.id == id &&
            (d.name == self.INIT
              ? iframe.contentWindow.postMessage(
                  {
                    id: id,
                    name: "init",
                    data: JSON.parse(JSON.stringify(data)),
                  },
                  "*"
                )
              : d.name == self.INJECT
              ? eval(d.data)
              : "function" == typeof data.on && data.on(d));
        });
      }
    }
    __webpack_exports__.a = function (e) {
      if (e) {
        if (Array.isArray(e)) {
          const t = new WebtorGenerator();
          for (const n of e) t.push(n);
          return t;
        }
        return e;
      }
      return new WebtorGenerator();
    };
  },
  function (e, t, n) {
    "use strict";
    t.a = function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
        e
      ) {
        var t = (16 * Math.random()) | 0;
        return ("x" == e ? t : (3 & t) | 8).toString(16);
      });
    };
  },
  function (e, t, n) {
    e.exports = n(5);
  },
  function (e, t, n) {
    "use strict";
    n.r(t);
    var i = n(1);
    window.webtor = Object(i.a)(window.webtor);
  },
  function (e, t, n) {
    var i = n(6);
    (t.iframeResize = i),
      (t.iframeResizer = i),
      (t.iframeResizerContentWindow = n(7));
  },
  function (e, t, n) {
    var i, o, r;
    !(function (n) {
      if ("undefined" != typeof window) {
        var a,
          d = 0,
          u = !1,
          c = !1,
          s = "message".length,
          l = "[iFrameSizer]",
          f = l.length,
          m = null,
          g = window.requestAnimationFrame,
          h = { max: 1, scroll: 1, bodyScroll: 1, documentElementScroll: 1 },
          p = {},
          b = null,
          w = {
            autoResize: !0,
            bodyBackground: null,
            bodyMargin: null,
            bodyMarginV1: 8,
            bodyPadding: null,
            checkOrigin: !0,
            inPageLinks: !1,
            enablePublicMethods: !0,
            heightCalculationMethod: "bodyOffset",
            id: "iFrameResizer",
            interval: 32,
            log: !1,
            maxHeight: 1 / 0,
            maxWidth: 1 / 0,
            minHeight: 0,
            minWidth: 0,
            resizeFrom: "parent",
            scrolling: !1,
            sizeHeight: !0,
            sizeWidth: !1,
            warningTimeout: 5e3,
            tolerance: 0,
            widthCalculationMethod: "scroll",
            onClose: function () {
              return !0;
            },
            onClosed: function () {},
            onInit: function () {},
            onMessage: function () {
              I("onMessage function not defined");
            },
            onResized: function () {},
            onScroll: function () {
              return !0;
            },
          },
          y = {};
        window.jQuery &&
          ((a = window.jQuery).fn
            ? a.fn.iFrameResize ||
              (a.fn.iFrameResize = function (e) {
                return this.filter("iframe")
                  .each(function (t, n) {
                    B(n, e);
                  })
                  .end();
              })
            : x("", "Unable to bind to jQuery, it is not fully loaded.")),
          (o = []),
          void 0 === (r = "function" == typeof (i = J) ? i.apply(t, o) : i) ||
            (e.exports = r),
          (window.iFrameResize = window.iFrameResize || J());
      }

      function v() {
        return (
          window.MutationObserver ||
          window.WebKitMutationObserver ||
          window.MozMutationObserver
        );
      }

      function _(e, t, n) {
        e.addEventListener(t, n, !1);
      }

      function E(e, t, n) {
        e.removeEventListener(t, n, !1);
      }

      function O(e) {
        return (
          l +
          "[" +
          (function (e) {
            var t = "Host page: " + e;
            return (
              window.top !== window.self &&
                (t =
                  window.parentIFrame && window.parentIFrame.getId
                    ? window.parentIFrame.getId() + ": " + e
                    : "Nested host page: " + e),
              t
            );
          })(e) +
          "]"
        );
      }

      function T(e) {
        return p[e] ? p[e].log : u;
      }

      function M(e, t) {
        S("log", e, t, T(e));
      }

      function x(e, t) {
        S("info", e, t, T(e));
      }

      function I(e, t) {
        S("warn", e, t, !0);
      }

      function S(e, t, n, i) {
        !0 === i && "object" == typeof window.console && console[e](O(t), n);
      }

      function R(e) {
        function t() {
          o("Height"),
            o("Width"),
            L(
              function () {
                W(R), N(z), g("onResized", R);
              },
              R,
              "init"
            );
        }

        function n(e) {
          return "border-box" !== e.boxSizing
            ? 0
            : (e.paddingTop ? parseInt(e.paddingTop, 10) : 0) +
                (e.paddingBottom ? parseInt(e.paddingBottom, 10) : 0);
        }

        function i(e) {
          return "border-box" !== e.boxSizing
            ? 0
            : (e.borderTopWidth ? parseInt(e.borderTopWidth, 10) : 0) +
                (e.borderBottomWidth ? parseInt(e.borderBottomWidth, 10) : 0);
        }

        function o(e) {
          var t = Number(p[z]["max" + e]),
            n = Number(p[z]["min" + e]),
            i = e.toLowerCase(),
            o = Number(R[i]);
          M(z, "Checking " + i + " is in range " + n + "-" + t),
            o < n && ((o = n), M(z, "Set " + i + " to min value")),
            o > t && ((o = t), M(z, "Set " + i + " to max value")),
            (R[i] = "" + o);
        }

        function r(e) {
          return S.substr(S.indexOf(":") + s + e);
        }

        function a(e, t) {
          var n, i, o;
          (n = function () {
            var n, i;
            D(
              "Send Page Info",
              "pageInfo:" +
                ((n = document.body.getBoundingClientRect()),
                (i = R.iframe.getBoundingClientRect()),
                JSON.stringify({
                  iframeHeight: i.height,
                  iframeWidth: i.width,
                  clientHeight: Math.max(
                    document.documentElement.clientHeight,
                    window.innerHeight || 0
                  ),
                  clientWidth: Math.max(
                    document.documentElement.clientWidth,
                    window.innerWidth || 0
                  ),
                  offsetTop: parseInt(i.top - n.top, 10),
                  offsetLeft: parseInt(i.left - n.left, 10),
                  scrollTop: window.pageYOffset,
                  scrollLeft: window.pageXOffset,
                  documentHeight: document.documentElement.clientHeight,
                  documentWidth: document.documentElement.clientWidth,
                  windowHeight: window.innerHeight,
                  windowWidth: window.innerWidth,
                })),
              e,
              t
            );
          }),
            (i = 32),
            y[(o = t)] ||
              (y[o] = setTimeout(function () {
                (y[o] = null), n();
              }, i));
        }

        function d(e) {
          var t = e.getBoundingClientRect();
          return (
            C(z),
            {
              x: Math.floor(Number(t.left) + Number(m.x)),
              y: Math.floor(Number(t.top) + Number(m.y)),
            }
          );
        }

        function u(e) {
          var t = e ? d(R.iframe) : { x: 0, y: 0 },
            n = { x: Number(R.width) + t.x, y: Number(R.height) + t.y };
          M(
            z,
            "Reposition requested from iFrame (offset x:" +
              t.x +
              " y:" +
              t.y +
              ")"
          ),
            window.top !== window.self
              ? window.parentIFrame
                ? window.parentIFrame["scrollTo" + (e ? "Offset" : "")](
                    n.x,
                    n.y
                  )
                : I(
                    z,
                    "Unable to scroll to requested position, window.parentIFrame not found"
                  )
              : ((m = n), c(), M(z, "--"));
        }

        function c() {
          !1 !== g("onScroll", m) ? N(z) : F();
        }

        function g(e, t) {
          return k(z, e, t);
        }
        var h,
          b,
          w,
          v,
          O,
          T,
          S = e.data,
          R = {},
          z = null;
        "[iFrameResizerChild]Ready" === S
          ? (function () {
              for (var e in p) D("iFrame requested init", j(e), p[e].iframe, e);
            })()
          : l === ("" + S).substr(0, f) && S.substr(f).split(":")[0] in p
          ? ((w = S.substr(f).split(":")),
            (v = w[1] ? parseInt(w[1], 10) : 0),
            (O = p[w[0]] && p[w[0]].iframe),
            (T = getComputedStyle(O)),
            (R = {
              iframe: O,
              id: w[0],
              height: v + n(T) + i(T),
              width: w[2],
              type: w[3],
            }),
            (z = R.id),
            p[z] && (p[z].loaded = !0),
            (b = R.type in { true: 1, false: 1, undefined: 1 }) &&
              M(z, "Ignoring init message from meta parent page"),
            !b &&
              (function (e) {
                var t = !0;
                return (
                  p[e] ||
                    ((t = !1),
                    I(
                      R.type + " No settings for " + e + ". Message was: " + S
                    )),
                  t
                );
              })(z) &&
              (M(z, "Received: " + S),
              (h = !0),
              null === R.iframe &&
                (I(z, "IFrame (" + R.id + ") not found"), (h = !1)),
              h &&
                (function () {
                  var t,
                    n = e.origin,
                    i = p[z] && p[z].checkOrigin;
                  if (
                    i &&
                    "" + n != "null" &&
                    !(i.constructor === Array
                      ? (function () {
                          var e = 0,
                            t = !1;
                          for (
                            M(
                              z,
                              "Checking connection is from allowed list of origins: " +
                                i
                            );
                            e < i.length;
                            e++
                          )
                            if (i[e] === n) {
                              t = !0;
                              break;
                            }
                          return t;
                        })()
                      : ((t = p[z] && p[z].remoteHost),
                        M(z, "Checking connection is from: " + t),
                        n === t))
                  )
                    throw new Error(
                      "Unexpected message received from: " +
                        n +
                        " for " +
                        R.iframe.id +
                        ". Message was: " +
                        e.data +
                        ". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains."
                    );
                  return !0;
                })() &&
                (function () {
                  switch (
                    (p[z] && p[z].firstRun && p[z] && (p[z].firstRun = !1),
                    R.type)
                  ) {
                    case "close":
                      P(R.iframe);
                      break;
                    case "message":
                      (e = r(6)),
                        M(
                          z,
                          "onMessage passed: {iframe: " +
                            R.iframe.id +
                            ", message: " +
                            e +
                            "}"
                        ),
                        g("onMessage", {
                          iframe: R.iframe,
                          message: JSON.parse(e),
                        }),
                        M(z, "--");
                      break;
                    case "autoResize":
                      p[z].autoResize = JSON.parse(r(9));
                      break;
                    case "scrollTo":
                      u(!1);
                      break;
                    case "scrollToOffset":
                      u(!0);
                      break;
                    case "pageInfo":
                      a(p[z] && p[z].iframe, z),
                        (function () {
                          function e(e, i) {
                            function o() {
                              p[n] ? a(p[n].iframe, n) : t();
                            }
                            ["scroll", "resize"].forEach(function (t) {
                              M(n, e + t + " listener for sendPageInfo"),
                                i(window, t, o);
                            });
                          }

                          function t() {
                            e("Remove ", E);
                          }
                          var n = z;
                          e("Add ", _), p[n] && (p[n].stopPageInfo = t);
                        })();
                      break;
                    case "pageInfoStop":
                      p[z] &&
                        p[z].stopPageInfo &&
                        (p[z].stopPageInfo(), delete p[z].stopPageInfo);
                      break;
                    case "inPageLink":
                      !(function (e) {
                        var t,
                          n = e.split("#")[1] || "",
                          i = decodeURIComponent(n),
                          o =
                            document.getElementById(i) ||
                            document.getElementsByName(i)[0];
                        o
                          ? ((t = d(o)),
                            M(
                              z,
                              "Moving to in page link (#" +
                                n +
                                ") at x: " +
                                t.x +
                                " y: " +
                                t.y
                            ),
                            (m = { x: t.x, y: t.y }),
                            c(),
                            M(z, "--"))
                          : window.top !== window.self
                          ? window.parentIFrame
                            ? window.parentIFrame.moveToAnchor(n)
                            : M(
                                z,
                                "In page link #" +
                                  n +
                                  " not found and window.parentIFrame not found"
                              )
                          : M(z, "In page link #" + n + " not found");
                      })(r(9));
                      break;
                    case "reset":
                      A(R);
                      break;
                    case "init":
                      t(), g("onInit", R.iframe);
                      break;
                    default:
                      t();
                  }
                  var e;
                })()))
          : x(z, "Ignored: " + S);
      }

      function k(e, t, n) {
        var i = null,
          o = null;
        if (p[e]) {
          if ("function" != typeof (i = p[e][t]))
            throw new TypeError(t + " on iFrame[" + e + "] is not a function");
          o = i(n);
        }
        return o;
      }

      function z(e) {
        var t = e.id;
        delete p[t];
      }

      function P(e) {
        var t = e.id;
        if (!1 !== k(t, "onClose", t)) {
          M(t, "Removing iFrame: " + t);
          try {
            e.parentNode && e.parentNode.removeChild(e);
          } catch (e) {
            I(e);
          }
          k(t, "onClosed", t), M(t, "--"), z(e);
        } else M(t, "Close iframe cancelled by onClose event");
      }

      function C(e) {
        null === m &&
          M(
            e,
            "Get page position: " +
              (m = {
                x:
                  void 0 !== window.pageXOffset
                    ? window.pageXOffset
                    : document.documentElement.scrollLeft,
                y:
                  void 0 !== window.pageYOffset
                    ? window.pageYOffset
                    : document.documentElement.scrollTop,
              }).x +
              "," +
              m.y
          );
      }

      function N(e) {
        null !== m &&
          (window.scrollTo(m.x, m.y),
          M(e, "Set page position: " + m.x + "," + m.y),
          F());
      }

      function F() {
        m = null;
      }

      function A(e) {
        M(
          e.id,
          "Size reset requested by " +
            ("init" === e.type ? "host page" : "iFrame")
        ),
          C(e.id),
          L(
            function () {
              W(e), D("reset", "reset", e.iframe, e.id);
            },
            e,
            "reset"
          );
      }

      function W(e) {
        function t(t) {
          c ||
            "0" !== e[t] ||
            ((c = !0),
            M(i, "Hidden iFrame detected, creating visibility listener"),
            (function () {
              function e() {
                Object.keys(p).forEach(function (e) {
                  !(function (e) {
                    function t(t) {
                      return "0px" === (p[e] && p[e].iframe.style[t]);
                    }
                    p[e] &&
                      null !== p[e].iframe.offsetParent &&
                      (t("height") || t("width")) &&
                      D("Visibility change", "resize", p[e].iframe, e);
                  })(e);
                });
              }

              function t(t) {
                M(
                  "window",
                  "Mutation observed: " + t[0].target + " " + t[0].type
                ),
                  U(e, 16);
              }
              var n = v();
              n &&
                ((i = document.querySelector("body")),
                new n(t).observe(i, {
                  attributes: !0,
                  attributeOldValue: !1,
                  characterData: !0,
                  characterDataOldValue: !1,
                  childList: !0,
                  subtree: !0,
                }));
              var i;
            })());
        }

        function n(n) {
          !(function (t) {
            e.id
              ? ((e.iframe.style[t] = e[t] + "px"),
                M(e.id, "IFrame (" + i + ") " + t + " set to " + e[t] + "px"))
              : M("undefined", "messageData id not set");
          })(n),
            t(n);
        }
        var i = e.iframe.id;
        p[i] && (p[i].sizeHeight && n("height"), p[i].sizeWidth && n("width"));
      }

      function L(e, t, n) {
        n !== t.type && g && !window.jasmine
          ? (M(t.id, "Requesting animation frame"), g(e))
          : e();
      }

      function D(e, t, n, i, o) {
        var r,
          a = !1;
        (i = i || n.id),
          p[i] &&
            (n && "contentWindow" in n && null !== n.contentWindow
              ? ((r = p[i] && p[i].targetOrigin),
                M(
                  i,
                  "[" +
                    e +
                    "] Sending msg to iframe[" +
                    i +
                    "] (" +
                    t +
                    ") targetOrigin: " +
                    r
                ),
                n.contentWindow.postMessage(l + t, r))
              : I(i, "[" + e + "] IFrame(" + i + ") not found"),
            o &&
              p[i] &&
              p[i].warningTimeout &&
              (p[i].msgTimeout = setTimeout(function () {
                !p[i] ||
                  p[i].loaded ||
                  a ||
                  ((a = !0),
                  I(
                    i,
                    "IFrame has not responded within " +
                      p[i].warningTimeout / 1e3 +
                      " seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ignored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning."
                  ));
              }, p[i].warningTimeout)));
      }

      function j(e) {
        return (
          e +
          ":" +
          p[e].bodyMarginV1 +
          ":" +
          p[e].sizeWidth +
          ":" +
          p[e].log +
          ":" +
          p[e].interval +
          ":" +
          p[e].enablePublicMethods +
          ":" +
          p[e].autoResize +
          ":" +
          p[e].bodyMargin +
          ":" +
          p[e].heightCalculationMethod +
          ":" +
          p[e].bodyBackground +
          ":" +
          p[e].bodyPadding +
          ":" +
          p[e].tolerance +
          ":" +
          p[e].inPageLinks +
          ":" +
          p[e].resizeFrom +
          ":" +
          p[e].widthCalculationMethod
        );
      }

      function B(e, t) {
        function n(e) {
          var t = e.split("Callback");
          if (2 === t.length) {
            var n = "on" + t[0].charAt(0).toUpperCase() + t[0].slice(1);
            (this[n] = this[e]),
              delete this[e],
              I(
                r,
                "Deprecated: '" +
                  e +
                  "' has been renamed '" +
                  n +
                  "'. The old method will be removed in the next major version."
              );
          }
        }
        var i,
          o,
          r = (function (n) {
            var i;
            return (
              "" === n &&
                ((e.id =
                  ((i = (t && t.id) || w.id + d++),
                  null !== document.getElementById(i) && (i += d++),
                  (n = i))),
                (u = (t || {}).log),
                M(n, "Added missing iframe ID: " + n + " (" + e.src + ")")),
              n
            );
          })(e.id);
        r in p && "iFrameResizer" in e
          ? I(r, "Ignored iFrame, already setup.")
          : (!(function (t) {
              var i;
              (t = t || {}),
                (p[r] = {
                  firstRun: !0,
                  iframe: e,
                  remoteHost: e.src && e.src.split("/").slice(0, 3).join("/"),
                }),
                (function (e) {
                  if ("object" != typeof e)
                    throw new TypeError("Options is not an object");
                })(t),
                Object.keys(t).forEach(n, t),
                (function (e) {
                  for (var t in w)
                    Object.prototype.hasOwnProperty.call(w, t) &&
                      (p[r][t] = Object.prototype.hasOwnProperty.call(e, t)
                        ? e[t]
                        : w[t]);
                })(t),
                p[r] &&
                  (p[r].targetOrigin =
                    !0 === p[r].checkOrigin
                      ? "" === (i = p[r].remoteHost) ||
                        null !== i.match(/^(about:blank|javascript:|file:\/\/)/)
                        ? "*"
                        : i
                      : "*");
            })(t),
            (function () {
              switch (
                (M(
                  r,
                  "IFrame scrolling " +
                    (p[r] && p[r].scrolling ? "enabled" : "disabled") +
                    " for " +
                    r
                ),
                (e.style.overflow =
                  !1 === (p[r] && p[r].scrolling) ? "hidden" : "auto"),
                p[r] && p[r].scrolling)
              ) {
                case "omit":
                  break;
                case !0:
                  e.scrolling = "yes";
                  break;
                case !1:
                  e.scrolling = "no";
                  break;
                default:
                  e.scrolling = p[r] ? p[r].scrolling : "no";
              }
            })(),
            (function () {
              function t(t) {
                1 / 0 !== p[r][t] &&
                  0 !== p[r][t] &&
                  ((e.style[t] = p[r][t] + "px"),
                  M(r, "Set " + t + " = " + p[r][t] + "px"));
              }

              function n(e) {
                if (p[r]["min" + e] > p[r]["max" + e])
                  throw new Error(
                    "Value for min" + e + " can not be greater than max" + e
                  );
              }
              n("Height"),
                n("Width"),
                t("maxHeight"),
                t("minHeight"),
                t("maxWidth"),
                t("minWidth");
            })(),
            ("number" != typeof (p[r] && p[r].bodyMargin) &&
              "0" !== (p[r] && p[r].bodyMargin)) ||
              ((p[r].bodyMarginV1 = p[r].bodyMargin),
              (p[r].bodyMargin = p[r].bodyMargin + "px")),
            (i = j(r)),
            (o = v()) &&
              (function (t) {
                e.parentNode &&
                  new t(function (t) {
                    t.forEach(function (t) {
                      Array.prototype.slice
                        .call(t.removedNodes)
                        .forEach(function (t) {
                          t === e && P(e);
                        });
                    });
                  }).observe(e.parentNode, { childList: !0 });
              })(o),
            _(e, "load", function () {
              var t, n;
              D("iFrame.onload", i, e, void 0, !0),
                (t = p[r] && p[r].firstRun),
                (n = p[r] && p[r].heightCalculationMethod in h),
                !t && n && A({ iframe: e, height: 0, width: 0, type: "init" });
            }),
            D("init", i, e, void 0, !0),
            p[r] &&
              (p[r].iframe.iFrameResizer = {
                close: P.bind(null, p[r].iframe),
                removeListeners: z.bind(null, p[r].iframe),
                resize: D.bind(null, "Window resize", "resize", p[r].iframe),
                moveToAnchor: function (e) {
                  D("Move to anchor", "moveToAnchor:" + e, p[r].iframe, r);
                },
                sendMessage: function (e) {
                  D(
                    "Send Message",
                    "message:" + (e = JSON.stringify(e)),
                    p[r].iframe,
                    r
                  );
                },
              }));
      }

      function U(e, t) {
        null === b &&
          (b = setTimeout(function () {
            (b = null), e();
          }, t));
      }

      function H() {
        "hidden" !== document.visibilityState &&
          (M("document", "Trigger event: Visiblity change"),
          U(function () {
            q("Tab Visable", "resize");
          }, 16));
      }

      function q(e, t) {
        Object.keys(p).forEach(function (n) {
          (function (e) {
            return (
              p[e] &&
              "parent" === p[e].resizeFrom &&
              p[e].autoResize &&
              !p[e].firstRun
            );
          })(n) && D(e, t, p[n].iframe, n);
        });
      }

      function K() {
        _(window, "message", R),
          _(window, "resize", function () {
            var e;
            M("window", "Trigger event: " + (e = "resize")),
              U(function () {
                q("Window " + e, "resize");
              }, 16);
          }),
          _(document, "visibilitychange", H),
          _(document, "-webkit-visibilitychange", H);
      }

      function J() {
        function e(e, n) {
          n &&
            (!(function () {
              if (!n.tagName)
                throw new TypeError("Object is not a valid DOM element");
              if ("IFRAME" !== n.tagName.toUpperCase())
                throw new TypeError(
                  "Expected <IFRAME> tag, found <" + n.tagName + ">"
                );
            })(),
            B(n, e),
            t.push(n));
        }
        var t;
        return (
          (function () {
            var e,
              t = ["moz", "webkit", "o", "ms"];
            for (e = 0; e < t.length && !g; e += 1)
              g = window[t[e] + "RequestAnimationFrame"];
            g
              ? (g = g.bind(window))
              : M("setup", "RequestAnimationFrame not supported");
          })(),
          K(),
          function (n, i) {
            switch (
              ((t = []),
              (function (e) {
                e &&
                  e.enablePublicMethods &&
                  I(
                    "enablePublicMethods option has been removed, public methods are now always available in the iFrame"
                  );
              })(n),
              typeof i)
            ) {
              case "undefined":
              case "string":
                Array.prototype.forEach.call(
                  document.querySelectorAll(i || "iframe"),
                  e.bind(void 0, n)
                );
                break;
              case "object":
                e(n, i);
                break;
              default:
                throw new TypeError("Unexpected data type (" + typeof i + ")");
            }
            return t;
          }
        );
      }
    })();
  },
  function (e, t, n) {
    !(function (t) {
      if ("undefined" != typeof window) {
        var n = !0,
          i = "",
          o = 0,
          r = "",
          a = null,
          d = "",
          u = !1,
          c = { resize: 1, click: 1 },
          s = !0,
          l = 1,
          f = "bodyOffset",
          m = !0,
          g = "",
          h = {},
          p = 32,
          b = null,
          w = !1,
          y = "[iFrameSizer]",
          v = y.length,
          _ = "",
          E = { max: 1, min: 1, bodyScroll: 1, documentElementScroll: 1 },
          O = "child",
          T = window.parent,
          M = "*",
          x = 0,
          I = !1,
          S = null,
          R = 16,
          k = 1,
          z = "scroll",
          P = window,
          C = function () {
            ne("onMessage function not defined");
          },
          N = function () {},
          F = function () {},
          A = {
            height: function () {
              return (
                ne("Custom height calculation function not defined"),
                document.documentElement.offsetHeight
              );
            },
            width: function () {
              return (
                ne("Custom width calculation function not defined"),
                document.body.scrollWidth
              );
            },
          },
          W = {},
          L = !1;
        try {
          var D = Object.create(
            {},
            {
              passive: {
                get: function () {
                  L = !0;
                },
              },
            }
          );
          window.addEventListener("test", G, D),
            window.removeEventListener("test", G, D);
        } catch (e) {}
        var j,
          B,
          U,
          H,
          q,
          K,
          J,
          V =
            Date.now ||
            function () {
              return new Date().getTime();
            },
          Q = {
            bodyOffset: function () {
              return (
                document.body.offsetHeight +
                me("marginTop") +
                me("marginBottom")
              );
            },
            offset: function () {
              return Q.bodyOffset();
            },
            bodyScroll: function () {
              return document.body.scrollHeight;
            },
            custom: function () {
              return A.height();
            },
            documentElementOffset: function () {
              return document.documentElement.offsetHeight;
            },
            documentElementScroll: function () {
              return document.documentElement.scrollHeight;
            },
            max: function () {
              return Math.max.apply(null, he(Q));
            },
            min: function () {
              return Math.min.apply(null, he(Q));
            },
            grow: function () {
              return Q.max();
            },
            lowestElement: function () {
              return Math.max(
                Q.bodyOffset() || Q.documentElementOffset(),
                ge("bottom", be())
              );
            },
            taggedElement: function () {
              return pe("bottom", "data-iframe-height");
            },
          },
          X = {
            bodyScroll: function () {
              return document.body.scrollWidth;
            },
            bodyOffset: function () {
              return document.body.offsetWidth;
            },
            custom: function () {
              return A.width();
            },
            documentElementScroll: function () {
              return document.documentElement.scrollWidth;
            },
            documentElementOffset: function () {
              return document.documentElement.offsetWidth;
            },
            scroll: function () {
              return Math.max(X.bodyScroll(), X.documentElementScroll());
            },
            max: function () {
              return Math.max.apply(null, he(X));
            },
            min: function () {
              return Math.min.apply(null, he(X));
            },
            rightMostElement: function () {
              return ge("right", be());
            },
            taggedElement: function () {
              return pe("right", "data-iframe-width");
            },
          },
          Y =
            ((j = we),
            (q = null),
            (K = 0),
            (J = function () {
              (K = V()), (q = null), (H = j.apply(B, U)), q || (B = U = null);
            }),
            function () {
              var e = V();
              K || (K = e);
              var t = R - (e - K);
              return (
                (B = this),
                (U = arguments),
                t <= 0 || t > R
                  ? (q && (clearTimeout(q), (q = null)),
                    (K = e),
                    (H = j.apply(B, U)),
                    q || (B = U = null))
                  : q || (q = setTimeout(J, t)),
                H
              );
            });
        $(window, "message", function (t) {
          var n = {
            init: function () {
              (g = t.data),
                (T = t.source),
                ie(),
                (s = !1),
                setTimeout(function () {
                  m = !1;
                }, 128);
            },
            reset: function () {
              m
                ? te("Page reset ignored by init")
                : (te("Page size reset by host page"), _e("resetPage"));
            },
            resize: function () {
              ye("resizeParent", "Parent window requested size check");
            },
            moveToAnchor: function () {
              h.findTarget(o());
            },
            inPageLink: function () {
              this.moveToAnchor();
            },
            pageInfo: function () {
              var e = o();
              te("PageInfoFromParent called from parent: " + e),
                F(JSON.parse(e)),
                te(" --");
            },
            message: function () {
              var e = o();
              te("onMessage called from parent: " + e),
                C(JSON.parse(e)),
                te(" --");
            },
          };

          function i() {
            return t.data.split("]")[1].split(":")[0];
          }

          function o() {
            return t.data.substr(t.data.indexOf(":") + 1);
          }

          function r() {
            return t.data.split(":")[2] in { true: 1, false: 1 };
          }

          function a() {
            var o = i();
            o in n
              ? n[o]()
              : (!e.exports && "iFrameResize" in window) ||
                ("jQuery" in window &&
                  "iFrameResize" in window.jQuery.prototype) ||
                r() ||
                ne("Unexpected message (" + t.data + ")");
          }
          y === ("" + t.data).substr(0, v) &&
            (!1 === s
              ? a()
              : r()
              ? n.init()
              : te(
                  'Ignored message of type "' +
                    i() +
                    '". Received before initialization.'
                ));
        }),
          $(window, "readystatechange", Te),
          Te();
      }

      function G() {}

      function $(e, t, n, i) {
        e.addEventListener(t, n, !!L && (i || {}));
      }

      function Z(e) {
        return e.charAt(0).toUpperCase() + e.slice(1);
      }

      function ee(e) {
        return y + "[" + _ + "] " + e;
      }

      function te(e) {
        w && "object" == typeof window.console && console.log(ee(e));
      }

      function ne(e) {
        "object" == typeof window.console && console.warn(ee(e));
      }

      function ie() {
        var e;
        !(function () {
          function e(e) {
            return "true" === e;
          }
          var t = g.substr(v).split(":");
          (_ = t[0]),
            (o = void 0 !== t[1] ? Number(t[1]) : o),
            (u = void 0 !== t[2] ? e(t[2]) : u),
            (w = void 0 !== t[3] ? e(t[3]) : w),
            (p = void 0 !== t[4] ? Number(t[4]) : p),
            (n = void 0 !== t[6] ? e(t[6]) : n),
            (r = t[7]),
            (f = void 0 !== t[8] ? t[8] : f),
            (i = t[9]),
            (d = t[10]),
            (x = void 0 !== t[11] ? Number(t[11]) : x),
            (h.enable = void 0 !== t[12] && e(t[12])),
            (O = void 0 !== t[13] ? t[13] : O),
            (z = void 0 !== t[14] ? t[14] : z);
        })(),
          te("Initialising iFrame (" + location.href + ")"),
          (function () {
            function e(e, t) {
              return (
                "function" == typeof e &&
                  (te("Setup custom " + t + "CalcMethod"),
                  (A[t] = e),
                  (e = "custom")),
                e
              );
            }
            "iFrameResizer" in window &&
              Object === window.iFrameResizer.constructor &&
              ((t = window.iFrameResizer),
              te("Reading data from page: " + JSON.stringify(t)),
              Object.keys(t).forEach(oe, t),
              (C = "onMessage" in t ? t.onMessage : C),
              (N = "onReady" in t ? t.onReady : N),
              (M = "targetOrigin" in t ? t.targetOrigin : M),
              (f =
                "heightCalculationMethod" in t ? t.heightCalculationMethod : f),
              (z =
                "widthCalculationMethod" in t ? t.widthCalculationMethod : z),
              (f = e(f, "height")),
              (z = e(z, "width")));
            var t;
            te("TargetOrigin for parent set to: " + M);
          })(),
          (function () {
            void 0 === r && (r = o + "px");
            re(
              "margin",
              (function (e, t) {
                -1 !== t.indexOf("-") &&
                  (ne("Negative CSS value ignored for " + e), (t = ""));
                return t;
              })("margin", r)
            );
          })(),
          re("background", i),
          re("padding", d),
          ((e = document.createElement("div")).style.clear = "both"),
          (e.style.display = "block"),
          (e.style.height = "0"),
          document.body.appendChild(e),
          ce(),
          se(),
          (document.documentElement.style.height = ""),
          (document.body.style.height = ""),
          te('HTML & body height set to "auto"'),
          te("Enable public methods"),
          (P.parentIFrame = {
            autoResize: function (e) {
              return (
                !0 === e && !1 === n
                  ? ((n = !0), le())
                  : !1 === e &&
                    !0 === n &&
                    ((n = !1),
                    de("remove"),
                    null !== a && a.disconnect(),
                    clearInterval(b)),
                Oe(0, 0, "autoResize", JSON.stringify(n)),
                n
              );
            },
            close: function () {
              Oe(0, 0, "close");
            },
            getId: function () {
              return _;
            },
            getPageInfo: function (e) {
              "function" == typeof e
                ? ((F = e), Oe(0, 0, "pageInfo"))
                : ((F = function () {}), Oe(0, 0, "pageInfoStop"));
            },
            moveToAnchor: function (e) {
              h.findTarget(e);
            },
            reset: function () {
              Ee("parentIFrame.reset");
            },
            scrollTo: function (e, t) {
              Oe(t, e, "scrollTo");
            },
            scrollToOffset: function (e, t) {
              Oe(t, e, "scrollToOffset");
            },
            sendMessage: function (e, t) {
              Oe(0, 0, "message", JSON.stringify(e), t);
            },
            setHeightCalculationMethod: function (e) {
              (f = e), ce();
            },
            setWidthCalculationMethod: function (e) {
              (z = e), se();
            },
            setTargetOrigin: function (e) {
              te("Set targetOrigin: " + e), (M = e);
            },
            size: function (e, t) {
              ye(
                "size",
                "parentIFrame.size(" + (e || "") + (t ? "," + t : "") + ")",
                e,
                t
              );
            },
          }),
          le(),
          (h = (function () {
            function e(e) {
              var t = e.getBoundingClientRect(),
                n = {
                  x:
                    void 0 !== window.pageXOffset
                      ? window.pageXOffset
                      : document.documentElement.scrollLeft,
                  y:
                    void 0 !== window.pageYOffset
                      ? window.pageYOffset
                      : document.documentElement.scrollTop,
                };
              return {
                x: parseInt(t.left, 10) + parseInt(n.x, 10),
                y: parseInt(t.top, 10) + parseInt(n.y, 10),
              };
            }

            function t(t) {
              var n = t.split("#")[1] || t,
                i = decodeURIComponent(n),
                o =
                  document.getElementById(i) ||
                  document.getElementsByName(i)[0];
              void 0 !== o
                ? (function (t) {
                    var i = e(t);
                    te(
                      "Moving to in page link (#" +
                        n +
                        ") at x: " +
                        i.x +
                        " y: " +
                        i.y
                    ),
                      Oe(i.y, i.x, "scrollToOffset");
                  })(o)
                : (te(
                    "In page link (#" +
                      n +
                      ") not found in iFrame, so sending to parent"
                  ),
                  Oe(0, 0, "inPageLink", "#" + n));
            }

            function n() {
              "" !== location.hash && "#" !== location.hash && t(location.href);
            }
            h.enable
              ? Array.prototype.forEach && document.querySelectorAll
                ? (te("Setting up location.hash handlers"),
                  Array.prototype.forEach.call(
                    document.querySelectorAll('a[href^="#"]'),
                    function (e) {
                      "#" !== e.getAttribute("href") &&
                        $(e, "click", function (e) {
                          e.preventDefault(), t(this.getAttribute("href"));
                        });
                    }
                  ),
                  $(window, "hashchange", n),
                  setTimeout(n, 128))
                : ne(
                    "In page linking not fully supported in this browser! (See README.md for IE8 workaround)"
                  )
              : te("In page linking not enabled");
            return { findTarget: t };
          })()),
          ye("init", "Init message from host page"),
          N();
      }

      function oe(e) {
        var t = e.split("Callback");
        if (2 === t.length) {
          var n = "on" + t[0].charAt(0).toUpperCase() + t[0].slice(1);
          (this[n] = this[e]),
            delete this[e],
            ne(
              "Deprecated: '" +
                e +
                "' has been renamed '" +
                n +
                "'. The old method will be removed in the next major version."
            );
        }
      }

      function re(e, t) {
        void 0 !== t &&
          "" !== t &&
          "null" !== t &&
          ((document.body.style[e] = t),
          te("Body " + e + ' set to "' + t + '"'));
      }

      function ae(e) {
        var t = {
          add: function (t) {
            function n() {
              ye(e.eventName, e.eventType);
            }
            (W[t] = n), $(window, t, n, { passive: !0 });
          },
          remove: function (e) {
            var t,
              n,
              i,
              o = W[e];
            delete W[e],
              (t = window),
              (n = e),
              (i = o),
              t.removeEventListener(n, i, !1);
          },
        };
        e.eventNames && Array.prototype.map
          ? ((e.eventName = e.eventNames[0]), e.eventNames.map(t[e.method]))
          : t[e.method](e.eventName),
          te(Z(e.method) + " event listener: " + e.eventType);
      }

      function de(e) {
        ae({
          method: e,
          eventType: "Animation Start",
          eventNames: ["animationstart", "webkitAnimationStart"],
        }),
          ae({
            method: e,
            eventType: "Animation Iteration",
            eventNames: ["animationiteration", "webkitAnimationIteration"],
          }),
          ae({
            method: e,
            eventType: "Animation End",
            eventNames: ["animationend", "webkitAnimationEnd"],
          }),
          ae({ method: e, eventType: "Input", eventName: "input" }),
          ae({ method: e, eventType: "Mouse Up", eventName: "mouseup" }),
          ae({ method: e, eventType: "Mouse Down", eventName: "mousedown" }),
          ae({
            method: e,
            eventType: "Orientation Change",
            eventName: "orientationchange",
          }),
          ae({
            method: e,
            eventType: "Print",
            eventName: ["afterprint", "beforeprint"],
          }),
          ae({
            method: e,
            eventType: "Ready State Change",
            eventName: "readystatechange",
          }),
          ae({ method: e, eventType: "Touch Start", eventName: "touchstart" }),
          ae({ method: e, eventType: "Touch End", eventName: "touchend" }),
          ae({
            method: e,
            eventType: "Touch Cancel",
            eventName: "touchcancel",
          }),
          ae({
            method: e,
            eventType: "Transition Start",
            eventNames: [
              "transitionstart",
              "webkitTransitionStart",
              "MSTransitionStart",
              "oTransitionStart",
              "otransitionstart",
            ],
          }),
          ae({
            method: e,
            eventType: "Transition Iteration",
            eventNames: [
              "transitioniteration",
              "webkitTransitionIteration",
              "MSTransitionIteration",
              "oTransitionIteration",
              "otransitioniteration",
            ],
          }),
          ae({
            method: e,
            eventType: "Transition End",
            eventNames: [
              "transitionend",
              "webkitTransitionEnd",
              "MSTransitionEnd",
              "oTransitionEnd",
              "otransitionend",
            ],
          }),
          "child" === O &&
            ae({ method: e, eventType: "IFrame Resized", eventName: "resize" });
      }

      function ue(e, t, n, i) {
        return (
          t !== e &&
            (e in n ||
              (ne(e + " is not a valid option for " + i + "CalculationMethod."),
              (e = t)),
            te(i + ' calculation method set to "' + e + '"')),
          e
        );
      }

      function ce() {
        f = ue(f, "bodyOffset", Q, "height");
      }

      function se() {
        z = ue(z, "scroll", X, "width");
      }

      function le() {
        var e;
        !0 === n
          ? (de("add"),
            (e = 0 > p),
            window.MutationObserver || window.WebKitMutationObserver
              ? e
                ? fe()
                : (a = (function () {
                    function e(e) {
                      function t(e) {
                        !1 === e.complete &&
                          (te("Attach listeners to " + e.src),
                          e.addEventListener("load", i, !1),
                          e.addEventListener("error", o, !1),
                          a.push(e));
                      }
                      "attributes" === e.type && "src" === e.attributeName
                        ? t(e.target)
                        : "childList" === e.type &&
                          Array.prototype.forEach.call(
                            e.target.querySelectorAll("img"),
                            t
                          );
                    }

                    function t(e) {
                      te("Remove listeners from " + e.src),
                        e.removeEventListener("load", i, !1),
                        e.removeEventListener("error", o, !1),
                        (function (e) {
                          a.splice(a.indexOf(e), 1);
                        })(e);
                    }

                    function n(e, n, i) {
                      t(e.target),
                        ye(n, i + ": " + e.target.src, void 0, void 0);
                    }

                    function i(e) {
                      n(e, "imageLoad", "Image loaded");
                    }

                    function o(e) {
                      n(e, "imageLoadFailed", "Image load failed");
                    }

                    function r(t) {
                      ye(
                        "mutationObserver",
                        "mutationObserver: " + t[0].target + " " + t[0].type
                      ),
                        t.forEach(e);
                    }
                    var a = [],
                      d =
                        window.MutationObserver ||
                        window.WebKitMutationObserver,
                      u = (function () {
                        var e = document.querySelector("body");
                        return (
                          (u = new d(r)),
                          te("Create body MutationObserver"),
                          u.observe(e, {
                            attributes: !0,
                            attributeOldValue: !1,
                            characterData: !0,
                            characterDataOldValue: !1,
                            childList: !0,
                            subtree: !0,
                          }),
                          u
                        );
                      })();
                    return {
                      disconnect: function () {
                        "disconnect" in u &&
                          (te("Disconnect body MutationObserver"),
                          u.disconnect(),
                          a.forEach(t));
                      },
                    };
                  })())
              : (te("MutationObserver not supported in this browser!"), fe()))
          : te("Auto Resize disabled");
      }

      function fe() {
        0 !== p &&
          (te("setInterval: " + p + "ms"),
          (b = setInterval(function () {
            ye("interval", "setInterval: " + p);
          }, Math.abs(p))));
      }

      function me(e, t) {
        var n = 0;
        return (
          (t = t || document.body),
          (n =
            null !== (n = document.defaultView.getComputedStyle(t, null))
              ? n[e]
              : 0),
          parseInt(n, 10)
        );
      }

      function ge(e, t) {
        for (
          var n = t.length, i = 0, o = 0, r = Z(e), a = V(), d = 0;
          d < n;
          d++
        )
          (i = t[d].getBoundingClientRect()[e] + me("margin" + r, t[d])) > o &&
            (o = i);
        return (
          (a = V() - a),
          te("Parsed " + n + " HTML elements"),
          te("Element position calculated in " + a + "ms"),
          (function (e) {
            e > R / 2 &&
              te("Event throttle increased to " + (R = 2 * e) + "ms");
          })(a),
          o
        );
      }

      function he(e) {
        return [
          e.bodyOffset(),
          e.bodyScroll(),
          e.documentElementOffset(),
          e.documentElementScroll(),
        ];
      }

      function pe(e, t) {
        var n = document.querySelectorAll("[" + t + "]");
        return (
          0 === n.length &&
            (ne("No tagged elements (" + t + ") found on page"),
            document.querySelectorAll("body *")),
          ge(e, n)
        );
      }

      function be() {
        return document.querySelectorAll("body *");
      }

      function we(e, t, n, i) {
        var o, r;
        !(function () {
          function e(e, t) {
            return !(Math.abs(e - t) <= x);
          }
          return (
            (o = void 0 !== n ? n : Q[f]()),
            (r = void 0 !== i ? i : X[z]()),
            e(l, o) || (u && e(k, r))
          );
        })() && "init" !== e
          ? !(e in { init: 1, interval: 1, size: 1 }) &&
            (f in E || (u && z in E))
            ? Ee(t)
            : e in { interval: 1 } || te("No change in size detected")
          : (ve(), Oe((l = o), (k = r), e));
      }

      function ye(e, t, n, i) {
        I && e in c
          ? te("Trigger event cancelled: " + e)
          : (e in { reset: 1, resetPage: 1, init: 1 } ||
              te("Trigger event: " + t),
            "init" === e ? we(e, t, n, i) : Y(e, t, n, i));
      }

      function ve() {
        I || ((I = !0), te("Trigger event lock on")),
          clearTimeout(S),
          (S = setTimeout(function () {
            (I = !1), te("Trigger event lock off"), te("--");
          }, 128));
      }

      function _e(e) {
        (l = Q[f]()), (k = X[z]()), Oe(l, k, e);
      }

      function Ee(e) {
        var t = f;
        (f = "bodyOffset"),
          te("Reset trigger event: " + e),
          ve(),
          _e("reset"),
          (f = t);
      }

      function Oe(e, t, n, i, o) {
        var r;
        void 0 === o ? (o = M) : te("Message targetOrigin: " + o),
          te(
            "Sending message to host page (" +
              (r =
                _ +
                ":" +
                e +
                ":" +
                t +
                ":" +
                n +
                (void 0 !== i ? ":" + i : "")) +
              ")"
          ),
          T.postMessage(y + r, o);
      }

      function Te() {
        "loading" !== document.readyState &&
          window.parent.postMessage("[iFrameResizerChild]Ready", "*");
      }
    })();
  },
]);
