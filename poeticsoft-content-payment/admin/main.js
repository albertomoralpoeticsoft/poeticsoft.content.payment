/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/js/pagelist.js":
/*!**********************************!*\
  !*** ./src/admin/js/pagelist.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($) {
  var urlParams = new URLSearchParams(window.location.search);
  var postStatus = urlParams.get('post_status');
  if (postStatus != 'trash' && postStatus != 'draft') {
    $('body').addClass('PoeticsoftContentPayment');
  } else {
    return;
  }
  var statusKey = 'PoeticsoftContentPaymentPageListState';
  var $thelist = $('body.wp-admin.post-type-page #the-list');
  var $trs = $thelist.find('tr');
  var $trsbyparentid = {};
  $trs.each(function () {
    var $tr = $(this);
    var id = $tr.attr('id');
    var childids = poeticsoft_content_payment_admin_pageslist[id];
    $trsbyparentid[id] = childids.map(function (cid) {
      return $thelist.find('tr#' + cid);
    });
    if (poeticsoft_content_payment_admin_campus_ids.includes(id)) {
      $tr.addClass('InCampus');
    }
  });
  var _closebranch = function closebranch(id) {
    var $childs = $trsbyparentid[id];
    $childs.forEach(function ($c) {
      $c.removeClass('Visible Opened');
    });
    var childIds = poeticsoft_content_payment_admin_pageslist[id];
    childIds.length && childIds.forEach(function (cid) {
      return _closebranch(cid);
    });
  };
  var state = {};
  var updateNav = function updateNav() {
    $trs.each(function () {
      var $tr = $(this);
      var id = $tr.attr('id');
      if (state[id]) {
        $tr.addClass('Opened');
        var $childs = $trsbyparentid[id];
        $childs.forEach(function ($c) {
          $c.addClass('Visible');
        });
        state[id] = true;
      } else {
        $tr.removeClass('Opened');
        _closebranch(id);
      }
    });
  };
  var loadState = function loadState() {
    state = JSON.parse(localStorage.getItem(statusKey)) || {};
    updateNav();
  };
  var saveState = function saveState() {
    console.log(state);
    localStorage.setItem(statusKey, JSON.stringify(state));
  };
  $trs.each(function () {
    var $tr = $(this);
    var id = $tr.attr('id');
    var $title = $tr.find('td.column-title a.row-title');
    var $titlecontainer = $title.parent('strong');
    var childids = poeticsoft_content_payment_admin_pageslist[id];
    $title.html($title.html().split('— ').join(''));
    $titlecontainer.addClass('TitleContainer');
    if (childids.length) {
      $tr.addClass('HasChildren');
      $titlecontainer.prepend('<span class="OpenClose"></span>');
    } else {
      $titlecontainer.prepend('<span class="Indent"></span>');
    }
    var $openclose = $titlecontainer.find('.OpenClose');
    $openclose.on('click', function () {
      if ($tr.hasClass('Opened')) {
        $tr.removeClass('Opened');
        _closebranch(id);
        state[id] = false;
      } else {
        $tr.addClass('Opened');
        var $childs = $trsbyparentid[id];
        $childs.forEach(function ($c) {
          $c.addClass('Visible');
        });
        state[id] = true;
      }
      saveState();
      return false;
    });
  });
  loadState();
});

/***/ }),

/***/ "./src/admin/js/pageprice.js":
/*!***********************************!*\
  !*** ./src/admin/js/pageprice.js ***!
  \***********************************/
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
  if ($('body').hasClass('wp-admin') && $('body').hasClass('post-type-page')) {
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
    var $inputdiscount = $this.find("input[name=poeticsoft_content_payment_assign_price_discount_".concat(postid, "]"));
    $inputdiscount.blur(function () {
      var value = $(this).val();
      var data = {
        postid: postid,
        discount: value == '' ? 'null' : value
      };
      updatedata(data);
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
/* harmony import */ var _js_pagelist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/pagelist */ "./src/admin/js/pagelist.js");
/* harmony import */ var _js_pageprice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/pageprice */ "./src/admin/js/pageprice.js");



(function ($) {
  (0,_js_pagelist__WEBPACK_IMPORTED_MODULE_1__["default"])($);
  (0,_js_pageprice__WEBPACK_IMPORTED_MODULE_2__["default"])($);
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map