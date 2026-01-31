/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/native.js":
/*!******************************************!*\
  !*** ./node_modules/uuid/dist/native.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ randomUUID });


/***/ }),

/***/ "./node_modules/uuid/dist/regex.js":
/*!*****************************************!*\
  !*** ./node_modules/uuid/dist/regex.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i);


/***/ }),

/***/ "./node_modules/uuid/dist/rng.js":
/*!***************************************!*\
  !*** ./node_modules/uuid/dist/rng.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues) {
        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
        getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
}


/***/ }),

/***/ "./node_modules/uuid/dist/stringify.js":
/*!*********************************************!*\
  !*** ./node_modules/uuid/dist/stringify.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/validate.js");

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] +
        byteToHex[arr[offset + 1]] +
        byteToHex[arr[offset + 2]] +
        byteToHex[arr[offset + 3]] +
        '-' +
        byteToHex[arr[offset + 4]] +
        byteToHex[arr[offset + 5]] +
        '-' +
        byteToHex[arr[offset + 6]] +
        byteToHex[arr[offset + 7]] +
        '-' +
        byteToHex[arr[offset + 8]] +
        byteToHex[arr[offset + 9]] +
        '-' +
        byteToHex[arr[offset + 10]] +
        byteToHex[arr[offset + 11]] +
        byteToHex[arr[offset + 12]] +
        byteToHex[arr[offset + 13]] +
        byteToHex[arr[offset + 14]] +
        byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset);
    if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);


/***/ }),

/***/ "./node_modules/uuid/dist/v4.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/dist/v4.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/stringify.js");



function _v4(options, buf, offset) {
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? (0,_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for (let i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}
function v4(options, buf, offset) {
    if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
        return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
    }
    return _v4(options, buf, offset);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);


/***/ }),

/***/ "./node_modules/uuid/dist/validate.js":
/*!********************************************!*\
  !*** ./node_modules/uuid/dist/validate.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/regex.js");

function validate(uuid) {
    return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);


/***/ }),

/***/ "./poeticsoft-content-payment/block/pagenav/block.json":
/*!*************************************************************!*\
  !*** ./poeticsoft-content-payment/block/pagenav/block.json ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"poeticsoft/pagenav","title":"Page navigation","category":"poeticsoft","icon":"media-archive","description":"Page navigation","keywords":[],"textdomain":"poeticsoft","version":"1.0.0","supports":{"align":["left","center","right"],"anchor":false,"customClassName":true,"className":true,"html":false,"__experimentalBorder":{"color":true,"radius":true,"style":true,"width":true},"border":{"color":true,"radius":true,"style":true,"width":true},"spacing":{"margin":true,"padding":true},"dimensions":{"minHeight":true,"width":true}},"attributes":{"blockId":{"type":"string","default":""},"refClientId":{"type":"string","default":""},"treerootid":{"type":"number","default":null}},"editorScript":"file:./build/editor.js","editorStyle":"file:./build/editor.css","viewScript":"file:./build/view.js","viewStyle":"file:./build/view.css","render":"file:./render.php"}');

/***/ }),

/***/ "./src/block/pagenav/editor.scss":
/*!***************************************!*\
  !*** ./src/block/pagenav/editor.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/block/pagenav/pageselector.js":
/*!*******************************************!*\
  !*** ./src/block/pagenav/pageselector.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageSelector: () => (/* binding */ PageSelector)
/* harmony export */ });
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var useMemo = wp.element.useMemo;
var SelectControl = wp.components.SelectControl;
var _buildHierarchy = function buildHierarchy(pagesList) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var children = pagesList.filter(function (p) {
    return p.parent === parent;
  });
  return children.flatMap(function (page) {
    var prefix = '—'.repeat(level);
    var label = "".concat(prefix, " ").concat(page.title.rendered || '(Sin título)');
    return [{
      label: label,
      value: page.id
    }].concat(_toConsumableArray(_buildHierarchy(pagesList, page.id, level + 1)));
  });
};
var PageSelector = function PageSelector(_ref) {
  var attributes = _ref.attributes,
    setAttributes = _ref.setAttributes,
    pagesList = _ref.pagesList;
  var treerootid = attributes.treerootid;
  var options = useMemo(function () {
    if (!pagesList) return [{
      label: 'Cargando páginas...',
      value: null
    }];
    return [{
      label: 'Selecciona root',
      value: null
    }, {
      label: 'Site root',
      value: 0
    }].concat(_toConsumableArray(_buildHierarchy(pagesList)));
  }, [pagesList]);
  return /*#__PURE__*/React.createElement(SelectControl, {
    label: "Seleccionar P\xE1gina",
    value: treerootid,
    options: options,
    onChange: function onChange(value) {
      return setAttributes({
        treerootid: parseInt(value)
      });
    }
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************************!*\
  !*** ./src/block/pagenav/editor.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/block/pagenav/editor.scss");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/v4.js");
/* harmony import */ var _pageselector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pageselector */ "./src/block/pagenav/pageselector.js");
/* harmony import */ var blocks_pagenav_block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! blocks/pagenav/block.json */ "./poeticsoft-content-payment/block/pagenav/block.json");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }


var registerBlockType = wp.blocks.registerBlockType;
var _wp$blockEditor = wp.blockEditor,
  useBlockProps = _wp$blockEditor.useBlockProps,
  InspectorControls = _wp$blockEditor.InspectorControls;
var _wp$element = wp.element,
  useState = _wp$element.useState,
  useEffect = _wp$element.useEffect;
var _wp$components = wp.components,
  PanelBody = _wp$components.PanelBody,
  ToggleControl = _wp$components.ToggleControl;
var useSelect = wp.data.useSelect;



var hs = {
  h1: function h1(title) {
    return /*#__PURE__*/React.createElement("h1", {
      className: "Title"
    }, title);
  },
  h2: function h2(title) {
    return /*#__PURE__*/React.createElement("h2", {
      className: "Title"
    }, title);
  },
  h3: function h3(title) {
    return /*#__PURE__*/React.createElement("h3", {
      className: "Title"
    }, title);
  },
  h4: function h4(title) {
    return /*#__PURE__*/React.createElement("h4", {
      className: "Title"
    }, title);
  },
  h5: function h5(title) {
    return /*#__PURE__*/React.createElement("h5", {
      className: "Title"
    }, title);
  },
  h6: function h6(title) {
    return /*#__PURE__*/React.createElement("h6", {
      className: "Title"
    }, title);
  }
};
var _TreePage = function TreePage(props) {
  var h = 'h' + (props.level + 1);
  return props ? /*#__PURE__*/React.createElement("div", {
    className: "Page"
  }, hs[h](props.title), /*#__PURE__*/React.createElement("div", {
    className: "Excerpt",
    dangerouslySetInnerHTML: {
      __html: props.excerpt
    }
  }), props.children && props.children.length ? /*#__PURE__*/React.createElement("div", {
    className: "Pages"
  }, props.children.map(function (p) {
    return /*#__PURE__*/React.createElement(_TreePage, _extends({
      level: props.level + 1
    }, p));
  })) : /*#__PURE__*/React.createElement(React.Fragment, null)) : /*#__PURE__*/React.createElement(React.Fragment, null);
};
var _buildPageTree = function buildPageTree(pagesList) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return pagesList.filter(function (p) {
    return p.parent == parent;
  }).map(function (p) {
    return {
      title: p.title.rendered,
      excerpt: p.excerpt.rendered,
      children: _buildPageTree(pagesList, p.id)
    };
  });
};
var Edit = function Edit(props) {
  var clientId = props.clientId,
    attributes = props.attributes,
    setAttributes = props.setAttributes;
  var blockId = attributes.blockId,
    treerootid = attributes.treerootid,
    refClientId = attributes.refClientId;
  var blockProps = useBlockProps();
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    selectedTreePages = _useState2[0],
    setSelectedTreePages = _useState2[1];
  var pagesList = useSelect(function (select) {
    var sitepages = select('core').getEntityRecords('postType', 'page', {
      per_page: -1
    });
    return sitepages && sitepages.sort(function (a, b) {
      return a.menu_order - b.menu_order;
    });
  }, []);
  useEffect(function () {
    if (pagesList && treerootid != null) {
      var tree = _buildPageTree(pagesList, treerootid);
      setSelectedTreePages(tree);
    }
  }, [pagesList, treerootid]);
  useEffect(function () {
    if (!blockId) {
      setAttributes({
        blockId: (0,uuid__WEBPACK_IMPORTED_MODULE_1__["default"])(),
        refClientId: clientId
      });
    } else {
      if (refClientId !== clientId) {
        setAttributes({
          blockId: (0,uuid__WEBPACK_IMPORTED_MODULE_1__["default"])(),
          refClientId: clientId
        });
      }
    }
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
    title: 'Opciones del Bloque',
    initialOpen: true
  }, /*#__PURE__*/React.createElement(_pageselector__WEBPACK_IMPORTED_MODULE_2__.PageSelector, {
    attributes: attributes,
    setAttributes: setAttributes,
    pagesList: pagesList
  }))), /*#__PURE__*/React.createElement("div", blockProps, treerootid != null && selectedTreePages && selectedTreePages.length ? selectedTreePages.map(function (p) {
    return /*#__PURE__*/React.createElement(_TreePage, _extends({
      level: 0
    }, p));
  }) : /*#__PURE__*/React.createElement("div", {
    className: "NoTree"
  }, "Selecciona Root")));
};
var Save = function Save() {
  return null;
};
registerBlockType(blocks_pagenav_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  edit: Edit,
  save: Save
});
})();

/******/ })()
;
//# sourceMappingURL=editor.js.map