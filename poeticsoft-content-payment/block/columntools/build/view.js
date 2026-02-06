/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/block/columntools/view.scss":
/*!*****************************************!*\
  !*** ./src/block/columntools/view.scss ***!
  \*****************************************/
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
/*!***************************************!*\
  !*** ./src/block/columntools/view.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view.scss */ "./src/block/columntools/view.scss");

(function ($) {
  var $postcontent = $('.wp-block-poeticsoft-treenav');
  if ($postcontent.length) {
    var $nav = $postcontent.find('.Nav');
    var $pages = $nav.find('.Page');
    var $opencloses = $nav.find('.OpenClose');
    var state = {};
    var updateNav = function updateNav() {
      $pages.each(function () {
        var $this = $(this);
        var id = $this.attr('id');
        if (state[id]) {
          $this.addClass('Visible');
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
    $opencloses.on('click', function () {
      var $this = $(this);
      var $page = $this.closest('.Page');
      var id = $page.attr('id');
      if ($page.hasClass('Visible')) {
        $page.removeClass('Visible');
        state[id] = false;
      } else {
        $page.addClass('Visible');
        state[id] = true;
      }
      saveState();
    });
    loadState();
  }
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=view.js.map