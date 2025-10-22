/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./poeticsoft-content-payment/block/insert/block.json":
/*!************************************************************!*\
  !*** ./poeticsoft-content-payment/block/insert/block.json ***!
  \************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"poeticsoft/insertcontent","title":"Insert Content","category":"poeticsoft","icon":"media-archive","description":"Insert Content","keywords":[],"textdomain":"poeticsoft","version":"1.0.0","supports":{"align":["left","center","right"],"anchor":false,"customClassName":true,"className":true,"html":false,"__experimentalBorder":{"color":true,"radius":true,"style":true,"width":true},"border":{"color":true,"radius":true,"style":true,"width":true},"spacing":{"margin":true,"padding":true},"dimensions":{"minHeight":true,"width":true}},"attributes":{"blockId":{"type":"string","default":""},"postid":{"type":"string"},"visiblefor":{"type":"string"}},"editorScript":"file:./build/editor.js","editorStyle":"file:./build/editor.css","viewScript":"file:./build/view.js","viewStyle":"file:./build/view.css","render":"file:./render.php"}');

/***/ }),

/***/ "./src/block/insert/editor.scss":
/*!**************************************!*\
  !*** ./src/block/insert/editor.scss ***!
  \**************************************/
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
/*!************************************!*\
  !*** ./src/block/insert/editor.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var blocks_insert_block_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! blocks/insert/block.json */ "./poeticsoft-content-payment/block/insert/block.json");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./src/block/insert/editor.scss");
var registerBlockType = wp.blocks.registerBlockType;
var useBlockProps = wp.blockEditor.useBlockProps;
var _wp$components = wp.components,
  Panel = _wp$components.Panel,
  PanelBody = _wp$components.PanelBody,
  PanelRow = _wp$components.PanelRow;


var Edit = function Edit(props) {
  var blockProps = useBlockProps({
    className: 'alignwide'
  });
  return /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement(Panel, null, /*#__PURE__*/React.createElement(PanelBody, null, /*#__PURE__*/React.createElement(PanelRow, null, "BASE"))));
};
var Save = function Save() {
  return null;
};
registerBlockType(blocks_insert_block_json__WEBPACK_IMPORTED_MODULE_0__.name, {
  edit: Edit,
  save: Save
});
})();

/******/ })()
;
//# sourceMappingURL=editor.js.map