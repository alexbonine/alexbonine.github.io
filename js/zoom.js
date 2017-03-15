/**
 * Pure JavaScript implementation of zoom.js.
 *
 * This fork extends the zoom.js script to work on divs as well.
 * The divs can also have hidden text that will transition into view.
 * Available at: https://github.com/alexbonine/zoom.js
 *
 * Original preamble:
 * zoom.js - It's the best way to zoom an image
 * @version v0.0.2
 * @link https://github.com/fat/zoom.js
 * @license MIT
 *
 * Needs a related CSS file to work. See the README at
 * https://github.com/nishanths/zoom.js for more info.
 *
 * This is a fork of the original zoom.js implementation by @fat.
 * Copyrights for the original project are held by @fat. All other copyright
 * for changes in the fork are held by Nishanth Shanmugham.
 *
 * Copyright (c) 2013 @fat
 * The MIT License. Copyright © 2016 Nishanth Shanmugham.
 * The MIT License. Copyright © 2017 Alex Bonine.
 */
(function() {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    (function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.i = function(value) {
            return value;
        };
        __webpack_require__.d = function(exports, name, getter) {
            if (!__webpack_require__.o(exports, name)) {
                Object.defineProperty(exports, name, {
                    configurable: false,
                    enumerable: true,
                    get: getter
                });
            }
        };
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function getDefault() {
                return module["default"];
            } : function getModuleExports() {
                return module;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
        };
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 4);
    })([ function(module, exports, __webpack_require__) {
        "use strict";
        __webpack_require__.d(exports, "a", function() {
            return windowWidth;
        });
        __webpack_require__.d(exports, "b", function() {
            return windowHeight;
        });
        __webpack_require__.d(exports, "c", function() {
            return elemOffset;
        });
        __webpack_require__.d(exports, "d", function() {
            return once;
        });
        var windowWidth = function windowWidth() {
            return document.documentElement.clientWidth;
        };
        var windowHeight = function windowHeight() {
            return document.documentElement.clientHeight;
        };
        var elemOffset = function elemOffset(elem) {
            var transitioningHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var transitioningWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var rect = elem.getBoundingClientRect();
            var docElem = document.documentElement;
            var win = window;
            return {
                top: rect.top + win.pageYOffset - docElem.clientTop - transitioningHeight,
                left: rect.left + win.pageXOffset - docElem.clientLeft - transitioningWidth
            };
        };
        var once = function once(elem, type, handler) {
            var fn = function fn(e) {
                e.target.removeEventListener(type, fn);
                handler();
            };
            elem.addEventListener(type, fn);
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__zoom_image_js__ = __webpack_require__(3);
        var __WEBPACK_IMPORTED_MODULE_1__zoom_div_js__ = __webpack_require__(2);
        var __WEBPACK_IMPORTED_MODULE_2__utils_js__ = __webpack_require__(0);
        __webpack_require__.d(exports, "a", function() {
            return zoom;
        });
        var current = null;
        var offset = 80;
        var initialScrollPos = -1;
        var initialTouchPos = -1;
        var setup = function setup(elem) {
            elem.addEventListener("click", prepareZoom);
        };
        var prepareZoom = function prepareZoom(e) {
            if (document.body.classList.contains("zoom-overlay-open")) {
                return;
            }
            if (e.metaKey || e.ctrlKey) {
                window.open(e.target.getAttribute("data-original") || e.target.src, "_blank");
                return;
            }
            if (e.target.width >= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_js__["a"])() - offset) {
                return;
            }
            closeCurrent(true);
            if (e.currentTarget.tagName === "IMG") {
                current = new __WEBPACK_IMPORTED_MODULE_0__zoom_image_js__["a"](e.currentTarget, offset);
            } else if (e.currentTarget.tagName === "DIV") {
                current = new __WEBPACK_IMPORTED_MODULE_1__zoom_div_js__["a"](e.currentTarget, offset);
            } else {
                return;
            }
            current.zoom();
            addCloseListeners();
        };
        var closeCurrent = function closeCurrent(force) {
            if (current == null) {
                return;
            }
            if (force) {
                current.dispose();
            } else {
                current.close();
            }
            removeCloseListeners();
            current = null;
        };
        var addCloseListeners = function addCloseListeners() {
            document.addEventListener("scroll", handleScroll);
            document.addEventListener("keyup", handleKeyup);
            document.addEventListener("touchstart", handleTouchStart);
            document.addEventListener("click", handleClick, true);
        };
        var removeCloseListeners = function removeCloseListeners() {
            document.removeEventListener("scroll", handleScroll);
            document.removeEventListener("keyup", handleKeyup);
            document.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("click", handleClick, true);
        };
        var handleScroll = function handleScroll() {
            if (initialScrollPos == -1) {
                initialScrollPos = window.pageYOffset;
            }
            var deltaY = Math.abs(initialScrollPos - window.pageYOffset);
            if (deltaY >= 40) {
                closeCurrent();
            }
        };
        var handleKeyup = function handleKeyup(e) {
            if (e.keyCode == 27) {
                closeCurrent();
            }
        };
        var handleTouchStart = function handleTouchStart(e) {
            var t = e.touches[0];
            if (t == null) {
                return;
            }
            initialTouchPos = t.pageY;
            e.target.addEventListener("touchmove", handleTouchMove);
        };
        var handleTouchMove = function handleTouchMove(e) {
            var t = e.touches[0];
            if (t == null) {
                return;
            }
            if (Math.abs(t.pageY - initialTouchPos) > 10) {
                closeCurrent();
                e.target.removeEventListener("touchmove", handleTouchMove);
            }
        };
        var handleClick = function handleClick() {
            closeCurrent();
        };
        var zoom = Object.create(null);
        zoom.setup = setup;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);
        var Size = function() {
            function Size(div, invisibles) {
                _classCallCheck(this, Size);
                this.originalHeight = div.clientHeight;
                this.invisiblesHeight = this.getInvisiblesHeight(invisibles);
                this.height = this.originalHeight + this.invisiblesHeight;
                this.originalWidth = div.clientWidth;
                this.width = Math.ceil(this.originalWidth, this.getInvisiblesWidth(invisibles));
                this.invisiblesWidth = this.width - this.originalWidth;
            }
            _createClass(Size, [ {
                key: "getInvisiblesWidth",
                value: function getInvisiblesWidth(invisibles) {
                    var width = 0;
                    for (var i = 0; i < invisibles.length; i++) {
                        width += invisibles[i].clientWidth;
                    }
                    return width;
                }
            }, {
                key: "getInvisiblesHeight",
                value: function getInvisiblesHeight(invisibles) {
                    var height = 0;
                    for (var i = 0; i < invisibles.length; i++) {
                        height += invisibles[i].clientHeight;
                    }
                    return height;
                }
            } ]);
            return Size;
        }();
        var ZoomDiv = function() {
            function ZoomDiv(div, offset) {
                _classCallCheck(this, ZoomDiv);
                this.div = div;
                this.preservedTransform = div.style.transform;
                this.wrap = null;
                this.overlay = null;
                this.offset = offset;
                this.divSize = null;
                this.invisibles = null;
            }
            _createClass(ZoomDiv, [ {
                key: "forceRepaint",
                value: function forceRepaint() {
                    var _ = this.div.offsetWidth;
                    return;
                }
            }, {
                key: "zoom",
                value: function zoom() {
                    this.invisibles = this.div.getElementsByClassName("invisible");
                    this.divSize = new Size(this.div, this.invisibles);
                    this.wrap = document.createElement("div");
                    this.wrap.classList.add("zoom-div-wrap");
                    this.div.parentNode.insertBefore(this.wrap, this.div);
                    this.wrap.appendChild(this.div);
                    this.div.classList.add("zoom-div");
                    this.div.setAttribute("data-action", "zoom-out");
                    this.overlay = document.createElement("div");
                    this.overlay.classList.add("zoom-overlay");
                    document.body.appendChild(this.overlay);
                    this.div.style.height = this.divSize.originalHeight + "px";
                    this.div.style.width = this.divSize.originalWidth + "px";
                    this.forceRepaint();
                    var scale = this.calculateScale(this.divSize);
                    this.forceRepaint();
                    this.showInvisibles();
                    this.animate(scale);
                    document.body.classList.add("zoom-overlay-open");
                }
            }, {
                key: "showInvisibles",
                value: function showInvisibles() {
                    this.div.style.height = this.divSize.height + "px";
                    this.div.style.width = this.divSize.width + "px";
                    for (var i = 0; i < this.invisibles.length; i++) {
                        this.invisibles[i].style.position = "relative";
                        this.invisibles[i].style.visibility = "visible";
                        this.invisibles[i].style.opacity = 1;
                    }
                }
            }, {
                key: "hideInvisibles",
                value: function hideInvisibles() {
                    this.div.style.height = this.divSize.originalHeight + "px";
                    this.div.style.width = this.divSize.originalWidth + "px";
                    for (var i = 0; i < this.invisibles.length; i++) {
                        this.invisibles[i].removeAttribute("style");
                    }
                    this.div.removeAttribute("style");
                }
            }, {
                key: "calculateScale",
                value: function calculateScale(size) {
                    var maxScaleFactor = 1;
                    var viewportWidth = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["a"])() - this.offset;
                    var viewportHeight = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b"])() - this.offset;
                    var imageAspectRatio = size.width / size.height;
                    var viewportAspectRatio = viewportWidth / viewportHeight;
                    if (size.width < viewportWidth && size.height < viewportHeight) {
                        return maxScaleFactor;
                    } else if (imageAspectRatio < viewportAspectRatio) {
                        return viewportHeight / size.height * maxScaleFactor;
                    } else {
                        return viewportWidth / size.width * maxScaleFactor;
                    }
                }
            }, {
                key: "animate",
                value: function animate(scale) {
                    var elementOffset = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["c"])(this.div, this.divSize.invisiblesHeight, this.divSize.invisiblesWidth);
                    var scrollTop = window.pageYOffset;
                    var viewportX = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["a"])() / 2;
                    var viewportY = scrollTop + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b"])() / 2;
                    var imageCenterX = elementOffset.left + this.divSize.width / 2;
                    var imageCenterY = elementOffset.top + this.divSize.height / 2;
                    var tx = viewportX - imageCenterX;
                    var ty = viewportY - imageCenterY;
                    var tz = 0;
                    var divTr = "scale(" + scale + ")";
                    var wrapTr = "translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
                    this.div.style.transform = divTr;
                    this.wrap.style.transform = wrapTr;
                }
            }, {
                key: "dispose",
                value: function dispose() {
                    if (this.wrap == null || this.wrap.parentNode == null) {
                        return;
                    }
                    this.div.classList.remove("zoom-div");
                    this.div.setAttribute("data-action", "zoom");
                    this.wrap.parentNode.insertBefore(this.div, this.wrap);
                    this.wrap.parentNode.removeChild(this.wrap);
                    document.body.removeChild(this.overlay);
                    document.body.classList.remove("zoom-overlay-transitioning");
                }
            }, {
                key: "close",
                value: function close() {
                    var _this = this;
                    document.body.classList.add("zoom-overlay-transitioning");
                    this.div.style.transform = this.preservedTransform;
                    this.hideInvisibles();
                    if (this.div.style.length === 0) {
                        this.div.removeAttribute("style");
                    }
                    this.wrap.style.transform = "none";
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["d"])(this.div, "transitionend", function() {
                        _this.dispose();
                        document.body.classList.remove("zoom-overlay-open");
                    });
                }
            } ]);
            return ZoomDiv;
        }();
        exports["a"] = ZoomDiv;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);
        var Size = function Size(w, h) {
            _classCallCheck(this, Size);
            this.w = w;
            this.h = h;
        };
        var ZoomImage = function() {
            function ZoomImage(img, offset) {
                _classCallCheck(this, ZoomImage);
                this.img = img;
                this.preservedTransform = img.style.transform;
                this.wrap = null;
                this.overlay = null;
                this.offset = offset;
            }
            _createClass(ZoomImage, [ {
                key: "forceRepaint",
                value: function forceRepaint() {
                    var _ = this.img.offsetWidth;
                    return;
                }
            }, {
                key: "zoom",
                value: function zoom() {
                    var size = new Size(this.img.naturalWidth, this.img.naturalHeight);
                    this.wrap = document.createElement("div");
                    this.wrap.classList.add("zoom-img-wrap");
                    this.img.parentNode.insertBefore(this.wrap, this.img);
                    this.wrap.appendChild(this.img);
                    this.img.classList.add("zoom-img");
                    this.img.setAttribute("data-action", "zoom-out");
                    this.overlay = document.createElement("div");
                    this.overlay.classList.add("zoom-overlay");
                    document.body.appendChild(this.overlay);
                    this.forceRepaint();
                    var scale = this.calculateScale(size);
                    this.forceRepaint();
                    this.animate(scale);
                    document.body.classList.add("zoom-overlay-open");
                }
            }, {
                key: "calculateScale",
                value: function calculateScale(size) {
                    var maxScaleFactor = size.w / this.img.width;
                    var viewportWidth = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["a"])() - this.offset;
                    var viewportHeight = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b"])() - this.offset;
                    var imageAspectRatio = size.w / size.h;
                    var viewportAspectRatio = viewportWidth / viewportHeight;
                    if (size.w < viewportWidth && size.h < viewportHeight) {
                        return maxScaleFactor;
                    } else if (imageAspectRatio < viewportAspectRatio) {
                        return viewportHeight / size.h * maxScaleFactor;
                    } else {
                        return viewportWidth / size.w * maxScaleFactor;
                    }
                }
            }, {
                key: "animate",
                value: function animate(scale) {
                    var imageOffset = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["c"])(this.img);
                    var scrollTop = window.pageYOffset;
                    var viewportX = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["a"])() / 2;
                    var viewportY = scrollTop + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b"])() / 2;
                    var imageCenterX = imageOffset.left + this.img.width / 2;
                    var imageCenterY = imageOffset.top + this.img.height / 2;
                    var tx = viewportX - imageCenterX;
                    var ty = viewportY - imageCenterY;
                    var tz = 0;
                    var imgTr = "scale(" + scale + ")";
                    var wrapTr = "translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
                    this.img.style.transform = imgTr;
                    this.wrap.style.transform = wrapTr;
                }
            }, {
                key: "dispose",
                value: function dispose() {
                    if (this.wrap == null || this.wrap.parentNode == null) {
                        return;
                    }
                    this.img.classList.remove("zoom-img");
                    this.img.setAttribute("data-action", "zoom");
                    this.wrap.parentNode.insertBefore(this.img, this.wrap);
                    this.wrap.parentNode.removeChild(this.wrap);
                    document.body.removeChild(this.overlay);
                    document.body.classList.remove("zoom-overlay-transitioning");
                }
            }, {
                key: "close",
                value: function close() {
                    var _this2 = this;
                    document.body.classList.add("zoom-overlay-transitioning");
                    this.img.style.transform = this.preservedTransform;
                    if (this.img.style.length === 0) {
                        this.img.removeAttribute("style");
                    }
                    this.wrap.style.transform = "none";
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_js__["d"])(this.img, "transitionend", function() {
                        _this2.dispose();
                        document.body.classList.remove("zoom-overlay-open");
                    });
                }
            } ]);
            return ZoomImage;
        }();
        exports["a"] = ZoomImage;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var __WEBPACK_IMPORTED_MODULE_0__src_zoom_js__ = __webpack_require__(1);
        document.addEventListener("DOMContentLoaded", function() {
            var elems = document.querySelectorAll("img[data-action='zoom'], div[data-action='zoom']");
            for (var i = 0; i < elems.length; i++) {
                __WEBPACK_IMPORTED_MODULE_0__src_zoom_js__["a"].setup(elems[i]);
            }
        });
    } ]);
})();