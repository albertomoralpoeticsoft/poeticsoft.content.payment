/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/pageslist/js/form.js":
/*!****************************************!*\
  !*** ./src/admin/pageslist/js/form.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   priceform: () => (/* binding */ priceform),
/* harmony export */   priceformload: () => (/* binding */ priceformload),
/* harmony export */   rowform: () => (/* binding */ rowform)
/* harmony export */ });
var rowform = function rowform($, postid, elm) {
  return "<".concat(elm, " id=\"").concat(postid, "\" class=\"PCPPrice\">    \n    <div class=\"Precio\">\n      <div class=\"Type Free\">Libre</div>\n      <div class=\"Type Sum\">Suma</div>\n      <div class=\"Type Local\">Precio</div>\n      <div class=\"Value\">\n        <div class=\"Suma\">0</div>\n        <div class=\"Currency\">eur</div>\n      </div>\n      <div class=\"PriceForm\"></div>\n    </div>\n  </").concat(elm, ">");
};
var priceformload = function priceformload($) {
  return "<div class=\"Selectors\">\n    <div class=\"Loading\">\n      Cargando editor...\n    </div>\n  </div>";
};
var priceform = function priceform($, data) {
  return "<form class=\"Selectors\">\n\n    <div class=\"Tools\">\n      <button \n        class=\"Close button button-primary\" \n        value=\"X\"\n      >X</buton>\n    </div>\n\n    <div class=\"Selector free\">\n      <input   \n        type=\"radio\"\n        id=\"type\"\n        name=\"type\"\n        class=\"type\"\n        value=\"free\"\n      />\n      <div class=\"Legend\">\n        Libre\n      </div>\n    </div>\n\n    <div class=\"Selector sum\">\n      <input   \n        type=\"radio\"\n        id=\"type\"\n        name=\"type\"\n        class=\"type\"\n        value=\"sum\"\n      />\n      <div class=\"Legend\">\n        Suma\n      </div>    \n      <div class=\"SumaDiscount\">\n        -\n      </div>      \n      <input \n        type=\"number\" \n        class=\"discount\" \n        min=\"0\"\n      />\n      <div class=\"Currency\">\n        eur descuento\n      </div>\n    </div>\n\n    <div class=\"Selector local\">\n      <input   \n        type=\"radio\"\n        id=\"type\"\n        name=\"type\"\n        class=\"type\"\n        value=\"local\"\n      />\n      <input \n        type=\"number\" \n        class=\"value\"\n      />\n      <div class=\"Currency\">\n        eur\n      </div>\n    </div>\n\n  </form>";
};

/***/ }),

/***/ "./src/admin/pageslist/js/pageslist.js":
/*!*********************************************!*\
  !*** ./src/admin/pageslist/js/pageslist.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form */ "./src/admin/pageslist/js/form.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/admin/pageslist/js/utils.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($, $pageprices) {
  console.log($pageprices);
  return;

  // let $pageslist = $('#the-list')
  // if($pageslist.length) {

  //   $pageslist = $pageslist.eq(0)

  //   const closeSelectors = () => {

  //     $pageslist
  //     .find('li.page-row .PCPPrice .PriceForm .Selectors')
  //     .remove()
  //   }

  //   const $pagerows = $pageslist.find('> tr')
  //   $pagerows
  //   .each(function() {

  //     const $pagerow = $(this)
  //     const id = $pagerow.attr('id').replace('post-', '')
  //     const postid = 'post-' + id

  //     if(poeticsoft_content_payment_admin_campus_ids.includes(postid)) {

  //       const $tdtitle = $pagerow.find('> .page-title')
  //       $bulkcheckbox.after(rowform($, postid, 'td'))
  //       const $pcpprice = $row.find('.PCPPrice')

  // removed by dead control flow

  //   }
  // })

  // updatedata($, 'nested-pages') 
  // }
});

/***/ }),

/***/ "./src/admin/pageslist/js/utils-pageprice.js":
/*!***************************************************!*\
  !*** ./src/admin/pageslist/js/utils-pageprice.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   nestedpagesprices: () => (/* binding */ nestedpagesprices),
/* harmony export */   normalpagesprices: () => (/* binding */ normalpagesprices)
/* harmony export */ });
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form */ "./src/admin/pageslist/js/form.js");

var nestedpagesprices = function nestedpagesprices($) {
  var $nestedpages = $('.wrap.nestedpages');
  if ($nestedpages.length) {
    $nestedpages = $nestedpages.eq(0);
    var $pagerows = $.map($nestedpages.find('li.page-row').filter(function () {
      var $pagerow = $(this);
      var id = $pagerow.attr('id').replace('menuItem_', '');
      var postid = 'post-' + id;
      return poeticsoft_content_payment_admin_campus_ids.includes(postid);
    }), function (elm) {
      var $pagerow = $(elm);
      var id = $pagerow.attr('id').replace('menuItem_', '');
      var postid = 'post-' + id;
      var $row = $pagerow.find('> .row');
      var $bulkcheckbox = $row.find('.np-bulk-checkbox');
      $bulkcheckbox.before((0,_form__WEBPACK_IMPORTED_MODULE_0__.rowform)($, postid, 'div'));
      var $pcpprice = $row.find('.PCPPrice');
      return $pcpprice;
    });
    return $pagerows;
  }
  return null;
};
var normalpagesprices = function normalpagesprices($) {
  var $pageslist = $('#the-list');
  if ($pageslist.length) {
    $pageslist = $pageslist.eq(0);
    var $pagerows = $.map($pageslist.find('> tr').filter(function () {
      var $pagerow = $(this);
      var postid = $pagerow.attr('id');
      var id = postid.replace('post-', '');
      return poeticsoft_content_payment_admin_campus_ids.includes(postid);
    }), function (elm) {
      var $pagerow = $($elm);
      var postid = $pagerow.attr('id');
      var $tdtitle = $pagerow.find('> .page-title');
      $tdtitle.after((0,_form__WEBPACK_IMPORTED_MODULE_0__.rowform)($, postid, 'td'));
      var $pcpprice = $pagerow.find('.PCPPrice');
      return $pcpprice;
    });
    return $pagerows;
  }
  return null;
};

/***/ }),

/***/ "./src/admin/pageslist/js/utils.js":
/*!*****************************************!*\
  !*** ./src/admin/pageslist/js/utils.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPostPrice: () => (/* binding */ getPostPrice),
/* harmony export */   updateSumas: () => (/* binding */ updateSumas),
/* harmony export */   updatedata: () => (/* binding */ updatedata)
/* harmony export */ });
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form */ "./src/admin/pageslist/js/form.js");

var fetchheaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-WP-Nonce': poeticsoft_content_payment_admin.nonce
};
var updateSumas = function updateSumas($, adminpage, posts) {
  switch (adminpage) {
    case 'default-pages':
      Object.keys(posts).forEach(function (key) {
        var $suma = $('.poeticsoft_content_payment_assign_price_column .Suma_' + key);
        $suma.html(posts[key].value);
      });
      break;
    case 'nested-pages':
      Object.keys(posts).forEach(function (key) {
        var $precio = $('#post-' + key + ' .Precio');
        $precio.addClass(posts[key].type);
        var $value = $precio.find('.Suma');
        $value.html(posts[key].value);
      });
      break;
  }
};
var updatedata = function updatedata($, adminpage, data) {
  fetch('/wp-json/poeticsoft/contentpayment/price/changeprice', {
    method: "POST",
    headers: fetchheaders,
    body: JSON.stringify(data)
  }).then(function (result) {
    result.json().then(function (data) {
      if (data.code == 'ok') {
        updateSumas($, adminpage, data.posts);
      } else {
        console.log(data);
      }
    });
  })["catch"](function (error) {
    return console.log(error);
  });
};
var getPostPrice = function getPostPrice($, postid) {
  return fetch('/wp-json/poeticsoft/contentpayment/price/getprice?postid=' + postid, {
    method: "GET",
    headers: fetchheaders
  })["catch"](function (error) {
    return console.log(error);
  });
};

/***/ }),

/***/ "./src/admin/pageslist/main.scss":
/*!***************************************!*\
  !*** ./src/admin/pageslist/main.scss ***!
  \***************************************/
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
/*!*************************************!*\
  !*** ./src/admin/pageslist/main.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.scss */ "./src/admin/pageslist/main.scss");
/* harmony import */ var _js_utils_pageprice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/utils-pageprice */ "./src/admin/pageslist/js/utils-pageprice.js");
/* harmony import */ var _js_pageslist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/pageslist */ "./src/admin/pageslist/js/pageslist.js");



(function ($) {
  var $pageprices;
  var $body = $('body');
  if ($body.hasClass('toplevel_page_nestedpages')) {
    $pageprices = (0,_js_utils_pageprice__WEBPACK_IMPORTED_MODULE_1__.nestedpagesprices)($);
  }
  if ($body.hasClass('edit-php') && $body.hasClass('post-type-page')) {
    $pageprices = (0,_js_utils_pageprice__WEBPACK_IMPORTED_MODULE_1__.normalpagesprices)($);
  }
  if ($pageprices && $pageprices.length) {
    (0,_js_pageslist__WEBPACK_IMPORTED_MODULE_2__["default"])($, $pageprices);
  }
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map