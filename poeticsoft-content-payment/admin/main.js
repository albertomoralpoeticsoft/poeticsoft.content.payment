/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/js/form.js":
/*!******************************!*\
  !*** ./src/admin/js/form.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   priceform: () => (/* binding */ priceform),
/* harmony export */   rowform: () => (/* binding */ rowform)
/* harmony export */ });
var rowform = function rowform($, postid) {
  return "<div id=\"".concat(postid, "\" class=\"PCPPrice\">    \n    <div class=\"Precio\">\n      <div class=\"Type Free\">Libre</div>\n      <div class=\"Type Sum\">Suma</div>\n      <div class=\"Type Local\">Precio</div>\n      <div class=\"PriceForm\"></div>\n      <div class=\"Value\">\n        <div class=\"Suma Suma_2031\">0</div>\n        <div class=\"Currency\">eur</div>\n      </div>\n    </div>\n  </div>");
};
var priceform = function priceform($, post) {
  return "<div class=\"Selectors\">\n    <div class=\"Selector Free\">\n      <input \n        data-type=\"free\" \n        type=\"radio\" \n        class=\"poeticsoft_content_payment_assign_price_type\" \n        name=\"poeticsoft_content_payment_assign_price_type_2500\" \n        value=\"free\"\n      />\n      <div class=\"Legend\">\n        Libre\n      </div>\n    </div>\n    <div class=\"Selector Sum\">\n      <input \n        data-type=\"sum\" \n        type=\"radio\" \n        class=\"poeticsoft_content_payment_assign_price_type\" \n        name=\"poeticsoft_content_payment_assign_price_type_2500\" \n        value=\"sum\"\n      />\n      <div class=\"Legend\">\n        Suma\n      </div>    \n      <div class=\"SumaDiscount\">\n        -\n      </div>      \n      <input \n        type=\"number\" \n        class=\"poeticsoft_content_payment_assign_price_discount\" \n        min=\"0\" \n        name=\"poeticsoft_content_payment_assign_price_discount_2500\" \n        value=\"40\"\n      />\n      <div class=\"Currency\">\n        eur (Descuento)\n      </div>\n    </div>\n    <div class=\"Selector Local\">\n      <input \n        data-type=\"local\" \n        type=\"radio\" \n        class=\"poeticsoft_content_payment_assign_price_type\" \n        name=\"poeticsoft_content_payment_assign_price_type_2500\" \n        value=\"local\"\n      >\n      <input \n        type=\"number\" \n        class=\"poeticsoft_content_payment_assign_price_value\" \n        name=\"poeticsoft_content_payment_assign_price_value_2500\" \n        value=\"160\" \n        disabled=\"\"\n      />\n      <div class=\"Currency\">\n        eur\n      </div>\n    </div>\n  </div>";
};

/***/ }),

/***/ "./src/admin/js/nestedpages.js":
/*!*************************************!*\
  !*** ./src/admin/js/nestedpages.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form */ "./src/admin/js/form.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/admin/js/utils.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($) {
  var $nestedpages = $('.wrap.nestedpages');
  if ($nestedpages.length) {
    $nestedpages = $nestedpages.eq(0);
    var $pagerows = $nestedpages.find('li.page-row');
    $pagerows.each(function () {
      var $pagerow = $(this);
      var postid = 'post-' + $pagerow.attr('id').replace('menuItem_', '');
      if (poeticsoft_content_payment_admin_campus_ids.includes(postid)) {
        var $row = $pagerow.find('> .row');
        var $bulkcheckbox = $row.find('.np-bulk-checkbox');
        $bulkcheckbox.before((0,_form__WEBPACK_IMPORTED_MODULE_0__.rowform)($, postid));
        var $pcpprice = $bulkcheckbox.find('.PCPPRice');
        $pcpprice.on('click', function () {
          console.log('PCPPrice');
          var $this = $('this');
          var $priceform = $this.find('.PriceForm');
          var post = poeticsoft_content_payment_admin_campus_ids[postid];
          $priceform.html((0,_form__WEBPACK_IMPORTED_MODULE_0__.priceform)($, post));
        });
      }
    });
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.updatedata)($, 'nested-pages');
  }
});

/***/ }),

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
    var $children = $trsbyparentid[id];
    if (!$children) {
      return;
    }
    $children.forEach(function ($c) {
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
        var $children = $trsbyparentid[id];
        $children.forEach(function ($c) {
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
        var $children = $trsbyparentid[id];
        $children.forEach(function ($c) {
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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/admin/js/utils.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($) {
  if ($('body').hasClass('wp-admin') && $('body').hasClass('post-type-page')) {
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.updatedata)($, 'default-pages');
  }
  var $pricecolumns = $('.poeticsoft_content_payment_assign_price_column');
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
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.updatedata)($, 'default-pages', data);
    });
    var $inputvalue = $this.find("input[name=poeticsoft_content_payment_assign_price_value_".concat(postid, "]"));
    $inputvalue.blur(function () {
      var value = $(this).val();
      var data = {
        postid: postid,
        value: value == '' ? 'null' : value
      };
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.updatedata)($, 'default-pages', data);
    });
    var $inputdiscount = $this.find("input[name=poeticsoft_content_payment_assign_price_discount_".concat(postid, "]"));
    $inputdiscount.blur(function () {
      var value = $(this).val();
      var data = {
        postid: postid,
        discount: value == '' ? 'null' : value
      };
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.updatedata)($, 'default-pages', data);
    });
  });
});

/***/ }),

/***/ "./src/admin/js/utils.js":
/*!*******************************!*\
  !*** ./src/admin/js/utils.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateSumas: () => (/* binding */ updateSumas),
/* harmony export */   updatedata: () => (/* binding */ updatedata)
/* harmony export */ });
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
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
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
/* harmony import */ var _js_nestedpages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/nestedpages */ "./src/admin/js/nestedpages.js");




(function ($) {
  (0,_js_pagelist__WEBPACK_IMPORTED_MODULE_1__["default"])($);
  (0,_js_pageprice__WEBPACK_IMPORTED_MODULE_2__["default"])($);
  (0,_js_nestedpages__WEBPACK_IMPORTED_MODULE_3__["default"])($);
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map