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
/* harmony export */   formloading: () => (/* binding */ formloading),
/* harmony export */   priceform: () => (/* binding */ priceform),
/* harmony export */   rowform: () => (/* binding */ rowform)
/* harmony export */ });
var rowform = function rowform($, postid) {
  var elm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';
  return "<".concat(elm, " id=\"").concat(postid, "\" class=\"PCPPrice\">    \n    <div class=\"Price\">\n      <div class=\"Type Free\">Libre</div>\n      <div class=\"Type Sum\">Suma</div>\n      <div class=\"Type Local\">Precio</div>\n      <div class=\"Value\">\n        <div class=\"Number\">0</div>\n        <div class=\"Currency\">eur</div>\n      </div>\n    </div>\n    <div class=\"PriceForm\"></div>\n  </").concat(elm, ">");
};
var formloading = function formloading($) {
  var formclass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return "<div class=\"Selectors ".concat(formclass, "\">\n    <div class=\"Loading\">\n      Cargando editor...\n    </div>\n  </div>");
};
var priceform = function priceform($, data) {
  var formclass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return "<div class=\"Selectors ".concat(formclass, "\">\n\n    <div class=\"Tools\">\n      <button \n        type=\"button\"\n        class=\"Close button button-secondary\" \n      >x</button>\n      <button \n        type=\"button\"\n        class=\"Save button button-primary\"\n        disabled=\"disabled\" \n      >\u2713</button>\n    </div>\n\n    <div class=\"\n      Selector\n      free      \n      ").concat(data.type == 'sum' ? 'Selected' : '', "\n    \">\n      <input   \n        type=\"radio\"\n        id=\"type-free\"\n        name=\"type\"\n        class=\"type\"\n        value=\"free\"\n        ").concat(data.type == 'free' ? 'checked' : '', "\n      />\n      <label for=\"type-free\">\n        Libre\n      </label>\n    </div>\n\n    <div class=\"\n      Selector \n      sum       \n      ").concat(data.type == 'sum' ? 'Selected' : '', "\n    \">\n      <input   \n        type=\"radio\"\n        id=\"type-sum\"\n        name=\"type\"\n        class=\"type\"\n        value=\"sum\"\n        ").concat(data.type == 'sum' ? 'checked' : '', "\n      />\n      <label for=\"type-sum\">\n        Suma\n      </label>    \n      <div class=\"SumaDiscount\">\n        -\n      </div>      \n      <input \n        type=\"number\" \n        class=\"discount\" \n        min=\"0\"\n        placeholder=\"Discount\"\n      />\n      <div class=\"Currency\">\n        eur\n      </div>\n    </div>\n\n    <div class=\"\n      Selector \n      local \n      ").concat(data.type == 'local' ? 'Selected' : '', "\n    \">\n      <input   \n        type=\"radio\"\n        id=\"type-local\"\n        name=\"type\"\n        class=\"type\"\n        value=\"local\"\n        ").concat(data.type == 'local' ? 'checked' : '', "\n      />\n      <input \n        type=\"number\" \n        class=\"value\"\n        placeholder=\"Fix Price\"\n        min=\"0\"\n      />\n      <div class=\"Currency\">\n        eur\n      </div>\n    </div>\n\n    <div class=\"Updating\">\n      <div class=\"Text\">\n        Actualizando...\n      </div>\n    </div>\n  </div>");
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
  var $pagepricewrapper = $('#poeticsoft_content_payment_page_assign_price .inside .pricewrapper');
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
    $pageslist = $pageslist.eq(0);
    var $pagerows = $.map($pageslist.find('> tr').filter(function () {
      var $pagerow = $(this);
      var postid = $pagerow.attr('id');
      var id = postid.replace('post-', '');
      return poeticsoft_content_payment_admin_campus_ids.includes(postid);
    }), function (elm) {
      var $pagerow = $(elm);
      var postid = $pagerow.attr('id');
      var $tdtitle = $pagerow.find('> .page-title');
      $tdtitle.after((0,_form__WEBPACK_IMPORTED_MODULE_0__.rowform)($, postid, 'td'));
      var $pcpprice = $pagerow.find('.PCPPrice').eq(0);
      return $pcpprice;
    });
    return $pagerows;
  }
  return null;
};
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
      var $pcpprice = $row.find('.PCPPrice').eq(0);
      return $pcpprice;
    });
    return $pagerows;
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
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form */ "./src/ui/admin/pageprice/js/form.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/ui/admin/pageprice/js/utils.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($, $pagesprices) {
  var formclass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  $pagesprices.each(function () {
    var $this = $(this);
    var id = $this.attr('id').replace('post-', '');
    var $price = $this.find('.Price');
    var $priceform = $this.find('.PriceForm');
    $price.on('click', function () {
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.closepriceforms)($, $pagesprices);
      $priceform.html((0,_form__WEBPACK_IMPORTED_MODULE_0__.formloading)($, formclass));
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getpostprice)($, id).then(function (result) {
        if (result.status == 200) {
          result.json().then(function (data) {
            $priceform.html((0,_form__WEBPACK_IMPORTED_MODULE_0__.priceform)($, data, formclass));
            var $selectors = $priceform.find('.Selectors');
            var $updating = $selectors.find('.Updating');
            var $close = $selectors.find('.Tools button.Close');
            $close.on('click', function () {
              $selectors.remove();
              return false;
            });
            var $save = $selectors.find('.Tools button.Save');
            $save.on('click', function () {
              var $this = $(this);
              $updating.show();
              var $radio = $selectors.find('input[type=radio]:checked');
              var $value = $selectors.find('input[type=number].value');
              var $discount = $selectors.find('input[type=number].discount');
              var $radioselector = $radio.parent('.Selector');
              var data = {
                postid: id,
                type: $radio.val()
              };

              /* postid - type - value - discount */

              switch (data.type) {
                case 'free':
                  break;
                case 'sum':
                  data.discount = $discount.val() || 0;
                  break;
                case 'local':
                  data.value = $value.val() || 0;
                  break;
              }
              (0,_utils__WEBPACK_IMPORTED_MODULE_1__.updatedata)($, $pagesprices, data).then(function () {
                console.log('hecho');
                $updating.hide();
                $this.blur();
                $save.prop('disabled', true);
              });
              return false;
            });
            var $selector = $selectors.find('.Selector');
            $selectors.on('change', 'input[type=radio], input[type=number]', function () {
              var $input = $(this);
              var type = $input.attr('type');
              if (type == 'radio') {
                $selector.removeClass('Selected');
                var $myselector = $input.parent('.Selector');
                $myselector.addClass('Selected');
              }
              $save.prop('disabled', false);
              return false;
            });
          });
        }
      });
      return false;
    });
  });
  (0,_utils__WEBPACK_IMPORTED_MODULE_1__.updatedata)($, $pagesprices);
});

/***/ }),

/***/ "./src/ui/admin/pageprice/js/utils.js":
/*!********************************************!*\
  !*** ./src/ui/admin/pageprice/js/utils.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closepriceforms: () => (/* binding */ closepriceforms),
/* harmony export */   getpostprice: () => (/* binding */ getpostprice),
/* harmony export */   updateSumas: () => (/* binding */ updateSumas),
/* harmony export */   updatedata: () => (/* binding */ updatedata)
/* harmony export */ });
var fetchheaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-WP-Nonce': poeticsoft_content_payment_admin.nonce
};
var updateSumas = function updateSumas($, $pagesprices, posts) {
  $pagesprices.each(function () {
    var $this = $(this);
    var id = $this.attr('id').replace('post-', '');
    var post = posts[id];
    var type = post.type;
    $this.find('.Price').addClass(type);
  });

  // Object.keys(posts)
  // .forEach(key => {

  //   const $precio = $('#post-' + key + ' .Precio')
  //   $precio.addClass(posts[key].type)
  //   const $value = $precio.find('.Number')
  //   $value.html(posts[key].value)
  // })
};
var closepriceforms = function closepriceforms($, $pagesprices) {
  $pagesprices.each(function () {
    var $this = $(this);
    var $selectors = $this.find('.PriceForm .Selectors');
    if ($selectors.length) {
      $selectors.remove();
    }
  });
};
var getpostprice = function getpostprice($, postid) {
  return fetch('/wp-json/poeticsoft/contentpayment/price/getprice?postid=' + postid, {
    method: "GET",
    headers: fetchheaders
  })["catch"](function (error) {
    return console.log(error);
  });
};
var updatedata = function updatedata($, $pagesprices, data) {
  return fetch('/wp-json/poeticsoft/contentpayment/price/changeprice', {
    method: "POST",
    headers: fetchheaders,
    body: JSON.stringify(data)
  }).then(function (result) {
    result.json().then(function (data) {
      if (data.code == 'ok') {
        updateSumas($, $pagesprices, data.posts);
      } else {
        console.log(data);
      }
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




// Common
// wp-admin wp-core-ui no-js admin-bar post-type-page branch-6-9 version-6-9 admin-color-fresh locale-es-es svg wp-theme-poeticsoft-basic-theme no-customize-support
// Edit Page
// is-fullscreen-mode post-php block-editor-page wp-embed-responsive
// Pages list
// edit-php
// Nested pages
// toplevel_page_nestedpages

(function ($) {
  var $body = $('body');
  var $pagesprices;
  var formclass;
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
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map