/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/main.scss":
/*!*****************************!*\
  !*** ./src/admin/main.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/admin/pageprice.js":
/*!********************************!*\
  !*** ./src/admin/pageprice.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($) {
  var $pricecolumns = $('.poeticsoft_content_payment_assign_price_column');
  var updateSumas = function updateSumas(posts) {
    Object.keys(posts).forEach(function (key) {
      var $suma = $('.poeticsoft_content_payment_assign_price_column .Suma_' + key);
      $suma.html(posts[key].value);
    });
  };
  var updatedata = function updatedata(data) {
    fetch('/wp-json/poeticsoft/contentpayment/price/changeprice', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function (result) {
      result.json().then(function (data) {
        if (data.code == 'ok') {
          updateSumas(data.posts);
        } else {
          console.log(data);
        }
      });
    });
  };
  if ($('body').hasClass('wp-admin') && $('body').hasClass('edit-php') && $('body').hasClass('post-type-page')) {
    updatedata();
  }
  $pricecolumns.each(function () {
    var $this = $(this);
    var postid = $this.data('postid');
    var $precio = $this.find('.Precio');
    var $selectors = $this.find('.Selectors');
    $precio.on('click', function () {
      var $this = $(this);
      $this.toggleClass('Opened');
      $selectors.toggleClass('Opened');
    });
    var $radiotype = $this.find("input:radio[name=poeticsoft_content_payment_assign_price_type_".concat(postid, "]"));
    $radiotype.click(function () {
      var $input = $(this);
      var $p = $input.parent();
      var $ps = $p.siblings('p.Selector');
      var $valueinputs = $ps.find('input[type=number]');
      var $valueinput = $p.find('input[type=number]');
      var pricetype = $input.data('type');
      $precio.removeClass('free sum local');
      $precio.addClass(pricetype);
      $ps.removeClass('Selected');
      $p.addClass('Selected');
      $valueinputs.prop('disabled', true);
      $valueinput.prop('disabled', false);
      var type = $(this).val();
      var data = {
        postid: postid,
        type: type
      };
      updatedata(data);
    });
    var $inputvalue = $this.find("input[name=poeticsoft_content_payment_assign_price_value_".concat(postid, "]"));
    $inputvalue.blur(function () {
      var value = $(this).val();
      var data = {
        postid: postid,
        value: value == '' ? 'null' : value
      };
      updatedata(data);
    });
  });
});

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
/* harmony import */ var _pageprice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pageprice */ "./src/admin/pageprice.js");


(function ($) {
  (0,_pageprice__WEBPACK_IMPORTED_MODULE_1__["default"])($);
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map