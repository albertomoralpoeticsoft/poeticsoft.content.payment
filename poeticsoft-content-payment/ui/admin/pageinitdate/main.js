/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ui/admin/pageinitdate/js/pageinitdate.js":
/*!******************************************************!*\
  !*** ./src/ui/admin/pageinitdate/js/pageinitdate.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pageinitdate: () => (/* binding */ pageinitdate)
/* harmony export */ });
var pageinitdate = function pageinitdate($) {
  var $pageinitdatewrapper = $('#poeticsoft_content_payment_page_assign_init_date .inside .pageinitdatewrapper');
  if ($pageinitdatewrapper.length) {
    $pageinitdatewrapper = $pageinitdatewrapper.eq(0);
    console.log($pageinitdatewrapper);
    var $datepicker = $pageinitdatewrapper.find('.DatePicker');
    console.log($datepicker.datepicker);
    $datepicker.datepicker();
  }
};

/***/ }),

/***/ "./src/ui/admin/pageinitdate/main.scss":
/*!*********************************************!*\
  !*** ./src/ui/admin/pageinitdate/main.scss ***!
  \*********************************************/
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
/*!*******************************************!*\
  !*** ./src/ui/admin/pageinitdate/main.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.scss */ "./src/ui/admin/pageinitdate/main.scss");
/* harmony import */ var _js_pageinitdate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/pageinitdate */ "./src/ui/admin/pageinitdate/js/pageinitdate.js");


(function ($) {
  var $body = $('body');
  console.log('jarl');
  if ($body.hasClass('block-editor-page')) {
    (0,_js_pageinitdate__WEBPACK_IMPORTED_MODULE_1__.pageinitdate)($);
  }
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map