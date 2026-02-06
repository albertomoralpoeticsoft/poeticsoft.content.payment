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

/***/ "./poeticsoft-content-payment/block/campusrelatedcontent/block.json":
/*!**************************************************************************!*\
  !*** ./poeticsoft-content-payment/block/campusrelatedcontent/block.json ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"poeticsoft/campusrelatedcontent","title":"Campus Contenido Relacionado","category":"poeticsoft","icon":"media-archive","description":"Contenidos relacionados con la página actual","keywords":[],"textdomain":"poeticsoft","version":"1.0.0","supports":{"align":["left","center","right"],"anchor":false,"customClassName":true,"className":true,"html":false,"__experimentalBorder":{"color":true,"radius":true,"style":true,"width":true},"border":{"color":true,"radius":true,"style":true,"width":true},"spacing":{"margin":true,"padding":true},"dimensions":{"minHeight":true,"width":true}},"attributes":{"blockId":{"type":"string","default":""},"refClientId":{"type":"string","default":""},"title":{"type":"string","default":"Título"},"sectionHeadingType":{"type":"string","default":"h3"},"areaHeadingType":{"type":"string","default":"h4"},"includesMode":{"type":"string","default":""},"tags":{"type":"string","default":"[]"},"mode":{"type":"string","default":"complete"}},"editorScript":"file:./build/editor.js","editorStyle":"file:./build/editor.css","viewScript":"file:./build/view.js","viewStyle":"file:./build/view.css","render":"file:./render.php"}');

/***/ }),

/***/ "./src/block/campusrelatedcontent/editor.scss":
/*!****************************************************!*\
  !*** ./src/block/campusrelatedcontent/editor.scss ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/block/common/elementselector.js":
/*!*********************************************!*\
  !*** ./src/block/common/elementselector.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeadingSelector: () => (/* binding */ HeadingSelector),
/* harmony export */   LinkSelector: () => (/* binding */ LinkSelector)
/* harmony export */ });
var SelectControl = wp.components.SelectControl;
var LinkSelector = function LinkSelector(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange;
  var options = [{
    label: 'Botón',
    value: 'button'
  }, {
    label: 'Link',
    value: 'link'
  }];
  return /*#__PURE__*/React.createElement(SelectControl, {
    label: "Elemento",
    value: value,
    options: options,
    onChange: onChange
  });
};
var HeadingSelector = function HeadingSelector(props) {
  var options = [{
    label: 'H1',
    value: 'h1'
  }, {
    label: 'H2',
    value: 'h2'
  }, {
    label: 'H3',
    value: 'h3'
  }, {
    label: 'H4',
    value: 'h4'
  }, {
    label: 'H5',
    value: 'h5'
  }, {
    label: 'H6',
    value: 'h6'
  }];
  return /*#__PURE__*/React.createElement(SelectControl, {
    label: props.title || 'Elemento',
    value: props.value,
    options: options,
    onChange: props.onChange
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
/*!**************************************************!*\
  !*** ./src/block/campusrelatedcontent/editor.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/v4.js");
/* harmony import */ var blockscommon_elementselector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! blockscommon/elementselector */ "./src/block/common/elementselector.js");
/* harmony import */ var blocks_campusrelatedcontent_block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! blocks/campusrelatedcontent/block.json */ "./poeticsoft-content-payment/block/campusrelatedcontent/block.json");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/block/campusrelatedcontent/editor.scss");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

var registerBlockType = wp.blocks.registerBlockType;
var _wp$blockEditor = wp.blockEditor,
  useBlockProps = _wp$blockEditor.useBlockProps,
  InspectorControls = _wp$blockEditor.InspectorControls,
  RichText = _wp$blockEditor.RichText;
var _wp$components = wp.components,
  PanelBody = _wp$components.PanelBody,
  SelectControl = _wp$components.SelectControl;
var _wp$element = wp.element,
  useEffect = _wp$element.useEffect,
  useState = _wp$element.useState;
var _wp = wp,
  apiFetch = _wp.apiFetch;



var includesOptions = [{
  label: 'Sólo relacionados',
  value: 'related'
}, {
  label: 'Sólo tags',
  value: 'tags'
}, {
  label: 'Relacionados y tags',
  value: 'relatedandtags'
}];
var modeOptions = [{
  label: 'Título, Imagen & Extracto',
  value: 'complete'
}, {
  label: 'Sólo título',
  value: 'compact'
}];
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
var Edit = function Edit(props) {
  var clientId = props.clientId,
    attributes = props.attributes,
    setAttributes = props.setAttributes;
  var blockId = attributes.blockId,
    refClientId = attributes.refClientId,
    title = attributes.title,
    sectionHeadingType = attributes.sectionHeadingType,
    areaHeadingType = attributes.areaHeadingType,
    includesMode = attributes.includesMode,
    tags = attributes.tags,
    mode = attributes.mode;
  var blockProps = useBlockProps();
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    availableTags = _useState2[0],
    setAvailableTags = _useState2[1];
  var _useState3 = useState(),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedTags = _useState4[0],
    setSelectedTags = _useState4[1];
  var selectTags = function selectTags(values) {
    setSelectedTags(values);
    setAttributes({
      tags: JSON.stringify(values)
    });
  };
  useEffect(function () {
    if (!blockId) {
      setAttributes({
        blockId: (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
        refClientId: clientId
      });
    } else {
      if (refClientId !== clientId) {
        setAttributes({
          blockId: (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
          refClientId: clientId
        });
      }
    }
    apiFetch({
      path: '/wp/v2/tags?per_page=-1'
    }).then(function (tags) {
      setAvailableTags(tags.map(function (tag) {
        return {
          label: tag.name,
          value: tag.id.toString()
        };
      }));
    });
    setSelectedTags(JSON.parse(tags));
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
    title: "Opciones del Bloque",
    initialOpen: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "\r campuscontainerchildren\r SeccionTitle\r "
  }, /*#__PURE__*/React.createElement("div", {
    className: "EditTitle"
  }, "Titulo de secci\xF3n"), /*#__PURE__*/React.createElement("div", {
    className: "EditText"
  }, /*#__PURE__*/React.createElement(RichText, {
    tagName: "div",
    value: title,
    allowedFormats: ['core/bold', 'core/italic'],
    onChange: function onChange(value) {
      return setAttributes({
        title: value
      });
    },
    placeholder: "T\xEDtulo"
  }))), /*#__PURE__*/React.createElement(SelectControl, {
    label: "Visualizar",
    value: includesMode,
    options: includesOptions,
    onChange: function onChange(value) {
      return setAttributes({
        includesMode: value
      });
    }
  }), /*#__PURE__*/React.createElement(SelectControl, {
    label: "Tags",
    multiple: true,
    value: selectedTags,
    options: availableTags,
    onChange: selectTags,
    disabled: includesMode == 'related'
  }), /*#__PURE__*/React.createElement(blockscommon_elementselector__WEBPACK_IMPORTED_MODULE_1__.HeadingSelector, {
    title: "Elemento de t\xEDtulo de secci\xF3n",
    value: sectionHeadingType,
    onChange: function onChange(value) {
      return setAttributes({
        sectionHeadingType: value
      });
    }
  }), /*#__PURE__*/React.createElement(blockscommon_elementselector__WEBPACK_IMPORTED_MODULE_1__.HeadingSelector, {
    title: "Elemento de t\xEDtulo de \xE1rea",
    value: areaHeadingType,
    onChange: function onChange(value) {
      return setAttributes({
        areaHeadingType: value
      });
    }
  }), /*#__PURE__*/React.createElement(SelectControl, {
    label: "Modo",
    value: mode,
    options: modeOptions,
    onChange: function onChange(value) {
      return setAttributes({
        mode: value
      });
    }
  }))), /*#__PURE__*/React.createElement("div", blockProps, hs[sectionHeadingType](title), /*#__PURE__*/React.createElement("div", {
    className: "Content"
  }, hs[areaHeadingType]('Contenidos'), modeOptions.find(function (o) {
    return o.value == mode;
  }).label)));
};
var Save = function Save() {
  return null;
};
registerBlockType(blocks_campusrelatedcontent_block_json__WEBPACK_IMPORTED_MODULE_2__.name, {
  edit: Edit,
  save: Save
});
})();

/******/ })()
;
//# sourceMappingURL=editor.js.map