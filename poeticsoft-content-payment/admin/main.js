/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/columnprice.js":
/*!**********************************!*\
  !*** ./src/admin/columnprice.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($) {
  var $pricecolumns = $('.poeticsoft_content_payment_assign_price_column');
  var updateSumas = function updateSumas(data) {
    Object.keys(data).forEach(function (key) {
      var $suma = $('.poeticsoft_content_payment_assign_price_column .' + key);
      $suma.html(data[key]);
    });
  };
  $pricecolumns.each(function () {
    var $this = $(this);
    var postid = $this.data('postid');
    var $radiotype = $this.find("input:radio[name=poeticsoft_content_payment_assign_price_type_".concat(postid, "]"));
    $radiotype.click(function () {
      var type = $(this).val();
      fetch('/wp-json/poeticsoft/contentpayment/price/savedata', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postid: postid,
          type: type
        })
      }).then(function (result) {
        result.json().then(function (data) {
          updateSumas(data);
        });
      });
    });
    var $inputvalue = $this.find("input[name=poeticsoft_content_payment_assign_price_value_".concat(postid, "]"));
    $inputvalue.blur(function () {
      var value = $(this).val();
      fetch('/wp-json/poeticsoft/contentpayment/price/savedata', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postid: postid,
          value: value == '' ? 'null' : value
        })
      }).then(function (result) {
        result.json().then(function (data) {
          updateSumas(data);
        });
      });
    });
  });
});

/***/ }),

/***/ "./src/admin/main.scss":
/*!*****************************!*\
  !*** ./src/admin/main.scss ***!
  \*****************************/
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
/*!***************************!*\
  !*** ./src/admin/main.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.scss */ "./src/admin/main.scss");
/* harmony import */ var _columnprice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./columnprice */ "./src/admin/columnprice.js");


(function ($) {
  (0,_columnprice__WEBPACK_IMPORTED_MODULE_1__["default"])($);
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map