/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ui/admin/pageprice/js/form.js":
/*!*******************************************!*\
  !*** ./src/ui/admin/pageprice/js/form.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rowform: () => (/* binding */ rowform)
/* harmony export */ });
var rowform = function rowform($, postid) {
  var elm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return "<".concat(elm, " id=\"").concat(postid, "\" class=\"PCPPrice\">\n    <div class=\"PriceTools\">\n      <div class=\"PostId\">").concat(postid.replace('post-', ''), "</div>\n      <div class=\"Access\">\n        <input   \n          type=\"checkbox\"\n          id=\"isfree_").concat(postid, "\"\n          name=\"isfree_").concat(postid, "\"\n          class=\"IsFree\"\n          ").concat(data.isfree ? 'checked' : '', "\n        />\n        <label \n          for=\"isfree_").concat(postid, "\"\n          class=\"").concat(data.isfree ? 'Free' : '', "\"\n        >\n          Abierta\n        </label>\n      </div>\n    </div>\n  </").concat(elm, ">");
};

/***/ }),

/***/ "./src/ui/admin/pageprice/js/pageprice.js":
/*!************************************************!*\
  !*** ./src/ui/admin/pageprice/js/pageprice.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   editpageprice: () => (/* binding */ editpageprice),
/* harmony export */   nestedpagesprices: () => (/* binding */ nestedpagesprices),
/* harmony export */   normalpagesprices: () => (/* binding */ normalpagesprices)
/* harmony export */ });
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form */ "./src/ui/admin/pageprice/js/form.js");

var editpageprice = function editpageprice($) {
  var $pagepricewrapper = $('#pcp_page_assign_price .inside .pricewrapper');
  if ($pagepricewrapper.length) {
    $pagepricewrapper = $pagepricewrapper.eq(0);
    var postid = $pagepricewrapper.data('id');
    $pagepricewrapper.html((0,_form__WEBPACK_IMPORTED_MODULE_0__.rowform)($, postid));
    var $pagerows = $pagepricewrapper.find('.PCPPrice');
    return $pagerows;
  }
};
var normalpagesprices = function normalpagesprices($) {
  var $pageslist = $('#the-list');
  if ($pageslist.length) {
    var $pagesrow = $pageslist.find('> tr').filter(function () {
      var $pagerow = $(this);
      var postid = $pagerow.attr('id');
      var id = postid.replace('post-', '');
      return poeticsoft_content_payment_admin_campus_ids.includes(postid);
    });
    if ($pagesrow.length) {
      var $tablelistheadtitle = $('.table-view-list.pages thead tr th.column-title');
      $tablelistheadtitle.after('<th></th>');
    }
    return $pagesrow.map(function () {
      var $pagerow = $(this);
      var postid = $pagerow.attr('id');
      var $tdtitle = $pagerow.find('> .page-title');
      $tdtitle.after((0,_form__WEBPACK_IMPORTED_MODULE_0__.rowform)($, postid, 'td'));
      return $pagerow.find('.PCPPrice').eq(0);
    });
  }
  return null;
};
var nestedpagesprices = function nestedpagesprices($) {
  var $nestedpages = $('.wrap.nestedpages');
  if ($nestedpages.length) {
    $nestedpages = $nestedpages.eq(0);
    return $nestedpages.find('li.page-row').filter(function () {
      var $pagerow = $(this);
      var id = $pagerow.attr('id').replace('menuItem_', '');
      var postid = 'post-' + id;
      return poeticsoft_content_payment_admin_campus_ids.includes(postid);
    }).map(function () {
      var $pagerow = $(this);
      var id = $pagerow.attr('id').replace('menuItem_', '');
      var postid = 'post-' + id;
      var $row = $pagerow.find('> .row');
      var $bulkcheckbox = $row.find('.np-bulk-checkbox');
      $bulkcheckbox.before((0,_form__WEBPACK_IMPORTED_MODULE_0__.rowform)($, postid, 'div'));
      return $row.find('.PCPPrice').eq(0);
    });
  }
  return null;
};

/***/ }),

/***/ "./src/ui/admin/pageprice/js/priceform.js":
/*!************************************************!*\
  !*** ./src/ui/admin/pageprice/js/priceform.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/ui/admin/pageprice/js/utils.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($, $pagesprices) {
  var formclass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  $pagesprices.each(function () {
    var $this = $(this);
    var id = $this.attr('id').replace('post-', '');
    var $tooglefree = $this.find('.PriceTools .Access input.IsFree');
    var $tooglelabel = $this.find('.PriceTools .Access label');
    $tooglefree.on('click', function () {
      var $this = $(this);
      var ischecked = $this.is(':checked');
      $tooglelabel.removeClass('Free');
      $tooglelabel.addClass('Updating');
      $tooglelabel.html('Actualizando');
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.updatefree)($, id, ischecked).then(function (result) {
        if (result.status == 200) {
          result.json().then(function (data) {
            $tooglelabel.removeClass('Updating');
            if (data.type == 'free') {
              $tooglelabel.addClass('Free');
              $tooglelabel.html('Abierta');
            } else {
              $tooglelabel.html('Restringida');
            }
          });
        }
      });
    });
  });
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.updatedata)($, $pagesprices);
});

/***/ }),

/***/ "./src/ui/admin/pageprice/js/utils.js":
/*!********************************************!*\
  !*** ./src/ui/admin/pageprice/js/utils.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updatedata: () => (/* binding */ updatedata),
/* harmony export */   updatefree: () => (/* binding */ updatefree)
/* harmony export */ });
var fetchheaders = function fetchheaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-WP-Nonce': poeticsoft_content_payment_api.nonce
  };
};
var updatefree = function updatefree($, id, ischecked) {
  var data = {
    postid: id,
    isfree: ischecked
  };
  return fetch('/wp-json/poeticsoft/contentpayment/state/updatefree', {
    method: "POST",
    headers: fetchheaders(),
    body: JSON.stringify(data)
  })["catch"](function (error) {
    return console.log(error);
  });
};
var updatedata = function updatedata($, $pagesprices) {
  return fetch('/wp-json/poeticsoft/contentpayment/state/getfree', {
    method: "GET",
    headers: fetchheaders()
  }).then(function (result) {
    result.json().then(function (data) {
      $pagesprices.each(function () {
        var $this = $(this);
        var id = $this.attr('id').replace('post-', '');
        var $tooglefree = $this.find('.PriceTools .Access input.IsFree');
        var $tooglelabel = $this.find('.PriceTools .Access label');
        if (data[id] == 'free') {
          $tooglefree.prop("checked", true);
          $tooglelabel.html('Abierta');
          $tooglelabel.addClass('Free');
        } else {
          $tooglelabel.html('Paid');
        }
      });
    });
  })["catch"](function (error) {
    return console.log(error);
  });
};

/***/ }),

/***/ "./src/ui/admin/pageprice/main.scss":
/*!******************************************!*\
  !*** ./src/ui/admin/pageprice/main.scss ***!
  \******************************************/
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
/*!****************************************!*\
  !*** ./src/ui/admin/pageprice/main.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.scss */ "./src/ui/admin/pageprice/main.scss");
/* harmony import */ var _js_pageprice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/pageprice */ "./src/ui/admin/pageprice/js/pageprice.js");
/* harmony import */ var _js_priceform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/priceform */ "./src/ui/admin/pageprice/js/priceform.js");



(function ($) {
  var $body = $('body');
  var $pagesprices;
  var formclass;
  var waitcampus = setInterval(function () {
    if (poeticsoft_content_payment_admin_campus_ids) {
      clearInterval(waitcampus);
      if ($body.hasClass('block-editor-page')) {
        formclass = 'EditPage';
        $pagesprices = (0,_js_pageprice__WEBPACK_IMPORTED_MODULE_1__.editpageprice)($);
      }
      if ($body.hasClass('toplevel_page_nestedpages')) {
        formclass = 'NestedPages';
        $pagesprices = (0,_js_pageprice__WEBPACK_IMPORTED_MODULE_1__.nestedpagesprices)($);
      }
      if ($body.hasClass('edit-php')) {
        formclass = 'PagesList';
        $pagesprices = (0,_js_pageprice__WEBPACK_IMPORTED_MODULE_1__.normalpagesprices)($);
      }
      if ($pagesprices && $pagesprices.length) {
        (0,_js_priceform__WEBPACK_IMPORTED_MODULE_2__["default"])($, $pagesprices, formclass);
      }
    }
  }, 100);
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map