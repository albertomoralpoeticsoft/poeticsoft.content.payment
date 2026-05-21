/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ui/edit/coreconfigs/main.scss":
/*!*******************************************!*\
  !*** ./src/ui/edit/coreconfigs/main.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/*!*****************************************!*\
  !*** ./src/ui/edit/coreconfigs/main.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.scss */ "./src/ui/edit/coreconfigs/main.scss");
var createHigherOrderComponent = wp.compose.createHigherOrderComponent;
var _wp$blockEditor = wp.blockEditor,
  InspectorControls = _wp$blockEditor.InspectorControls,
  RichText = _wp$blockEditor.RichText;
var _wp$components = wp.components,
  PanelBody = _wp$components.PanelBody,
  SelectControl = _wp$components.SelectControl;
var addFilter = wp.hooks.addFilter;

var postContentVisibleOptions = [{
  label: 'Oculto siempre',
  value: 'hiddenalways'
}, {
  label: 'Visible siempre',
  value: 'visiblealways'
}, {
  label: 'Sólo en páginas de recursos',
  value: 'onlyincontents'
}];
var withInspectorControls = createHigherOrderComponent(function (BlockEdit) {
  return function (props) {
    if (props.name === 'core/post-content') {
      var attributes = props.attributes,
        setAttributes = props.setAttributes;
      var showrestrictedtext = attributes.showrestrictedtext,
        restrictedvisibletext = attributes.restrictedvisibletext,
        payvisibletext = attributes.payvisibletext;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
        title: "Advertencia contenido restringido",
        initialOpen: true,
        className: "PostContentConfig"
      }, /*#__PURE__*/React.createElement(SelectControl, {
        label: "Donde ver advertencia",
        value: showrestrictedtext,
        options: postContentVisibleOptions,
        onChange: function onChange(value) {
          return setAttributes({
            showrestrictedtext: value
          });
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "Texts RestrictedText"
      }, /*#__PURE__*/React.createElement("div", {
        className: "EditTitle"
      }, "Texto contenido restringido"), /*#__PURE__*/React.createElement("div", {
        className: "EditText"
      }, /*#__PURE__*/React.createElement(RichText, {
        __unstableOnFocus: true,
        tagName: "div",
        value: restrictedvisibletext,
        allowedFormats: ['core/bold', 'core/italic'],
        onChange: function onChange(value) {
          return setAttributes({
            restrictedvisibletext: value
          });
        },
        placeholder: "Texto contenido restringido"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "Texts PayText"
      }, /*#__PURE__*/React.createElement("div", {
        className: "EditTitle"
      }, "Texto contenido de pago"), /*#__PURE__*/React.createElement("div", {
        className: "EditText"
      }, /*#__PURE__*/React.createElement(RichText, {
        __unstableOnFocus: true,
        tagName: "div",
        value: payvisibletext,
        allowedFormats: ['core/bold', 'core/italic'],
        onChange: function onChange(value) {
          return setAttributes({
            payvisibletext: value
          });
        },
        placeholder: "Texto contenido restringido"
      })), /*#__PURE__*/React.createElement("div", {
        className: "Help"
      }, 'Variables: {suscriptionduration}, {price}, {currency}')))));
    }
    return /*#__PURE__*/React.createElement(BlockEdit, props);
  };
}, 'withInspectorControls');
addFilter('editor.BlockEdit', 'poeticsoft/coreconfigs', withInspectorControls);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map