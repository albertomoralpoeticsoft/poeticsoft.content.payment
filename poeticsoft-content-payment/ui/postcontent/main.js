/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ui/postcontent/js/common/fetch.js":
/*!***********************************************!*\
  !*** ./src/ui/postcontent/js/common/fetch.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apifetch: () => (/* binding */ apifetch)
/* harmony export */ });
var apifetch = function apifetch(data) {
  return new Promise(function (resolve, reject) {
    fetch('/wp-json/poeticsoft/contentpayment/' + data.url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data.body)
    }).then(function (result) {
      result.json().then(function (data) {
        return resolve(data);
      });
    })["catch"](function (error) {
      console.log(error);
      reject(error);
    });
  });
};

/***/ }),

/***/ "./src/ui/postcontent/js/common/message.js":
/*!*************************************************!*\
  !*** ./src/ui/postcontent/js/common/message.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($, message, type) {
  var $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent');
  var $message = $postcontent.find('.Forms .Form .Message');
  $message.removeClass('Error Warn Info');
  $message.addClass(type);
  $message.html(message);
});

/***/ }),

/***/ "./src/ui/postcontent/js/common/utils.js":
/*!***********************************************!*\
  !*** ./src/ui/postcontent/js/common/utils.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validatemail: () => (/* binding */ validatemail)
/* harmony export */ });
var validatemail = function validatemail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/***/ }),

/***/ "./src/ui/postcontent/js/identify/do-confirmcode.js":
/*!**********************************************************!*\
  !*** ./src/ui/postcontent/js/identify/do-confirmcode.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms */ "./src/ui/postcontent/js/identify/forms.js");
/* harmony import */ var _common_message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/message */ "./src/ui/postcontent/js/common/message.js");
/* harmony import */ var _common_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/fetch */ "./src/ui/postcontent/js/common/fetch.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($, email, code) {
  var $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent');
  var $forms = $postcontent.find('.Forms.Identify');
  $forms.find('.Form').remove();
  $forms.html((0,_forms__WEBPACK_IMPORTED_MODULE_0__["default"])({
    form: 'confirmcode',
    code: code
  }));
  var $codeconfirm = $forms.find('.Form.ConfirmCode');
  var $codeconfirminput = $codeconfirm.find('input.Code');
  var $codeconfirmconfirmcode = $codeconfirm.find('button.ConfirmCode');
  var $identifyresendcode = $codeconfirm.find('a.ResendCode');
  $codeconfirmconfirmcode.on('click', function () {
    var code = $codeconfirminput.val();
    $codeconfirminput.prop('disabled', true);
    $codeconfirmconfirmcode.prop('disabled', true);
    (0,_common_message__WEBPACK_IMPORTED_MODULE_1__["default"])($, 'Confirmando...', 'Warn');
    (0,_common_fetch__WEBPACK_IMPORTED_MODULE_2__.apifetch)({
      url: 'mailrelay/subscriber/confirmcode',
      body: {
        email: email,
        code: code
      }
    }).then(function (data) {
      if (data.result == 'ok') {
        (0,_common_message__WEBPACK_IMPORTED_MODULE_1__["default"])($, 'Identifiación confirmada. Redirigiendo a la página de contenidos', 'Info');
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      } else {
        console.log(data);
        (0,_common_message__WEBPACK_IMPORTED_MODULE_1__["default"])($, data.message, 'Error');
      }
      $codeconfirminput.prop('disabled', false);
      $codeconfirmconfirmcode.prop('disabled', false);
    })["catch"](function (error) {
      console.log(error);
      (0,_common_message__WEBPACK_IMPORTED_MODULE_1__["default"])($, 'Error de servidor, intentalo de nuevo, por favor.', 'Error');
      $codeconfirminput.prop('disabled', false);
      $codeconfirmconfirmcode.prop('disabled', false);
    });
  });
  $identifyresendcode.on('click', function () {
    $codeconfirminput.val('');
    $codeconfirminput.prop('disabled', false);
    $codeconfirmconfirmcode.prop('disabled', false);
    (0,_common_message__WEBPACK_IMPORTED_MODULE_1__["default"])($, 'Reenviando...', 'Warn');
    (0,_common_fetch__WEBPACK_IMPORTED_MODULE_2__.apifetch)({
      url: 'mailrelay/subscriber/identify',
      body: {
        email: email
      }
    }).then(function (data) {
      if (data.result == 'ok') {
        $codeconfirminput.val(data.code);
        (0,_common_message__WEBPACK_IMPORTED_MODULE_1__["default"])($, 'Se ha reenviado el código.', 'Info');
      }
    })["catch"](function (error) {
      console.log(error);
      (0,_common_message__WEBPACK_IMPORTED_MODULE_1__["default"])($, 'Error de servidor, intentalo de nuevo, por favor.', 'Error');
      $codeconfirminput.prop('disabled', false);
      $codeconfirmconfirmcode.prop('disabled', false);
    });
    return false;
  });
});

/***/ }),

/***/ "./src/ui/postcontent/js/identify/do-identify.js":
/*!*******************************************************!*\
  !*** ./src/ui/postcontent/js/identify/do-identify.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/message */ "./src/ui/postcontent/js/common/message.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils */ "./src/ui/postcontent/js/common/utils.js");
/* harmony import */ var _common_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/fetch */ "./src/ui/postcontent/js/common/fetch.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./forms */ "./src/ui/postcontent/js/identify/forms.js");
/* harmony import */ var _do_confirmcode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./do-confirmcode */ "./src/ui/postcontent/js/identify/do-confirmcode.js");
/* harmony import */ var _do_register_should__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./do-register-should */ "./src/ui/postcontent/js/identify/do-register-should.js");
/* harmony import */ var _do_register_want__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./do-register-want */ "./src/ui/postcontent/js/identify/do-register-want.js");







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($) {
  var $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent');
  var $forms = $postcontent.find('.Forms.Identify');
  $forms.find('.Form').remove();
  $forms.html((0,_forms__WEBPACK_IMPORTED_MODULE_3__["default"])({
    form: 'identify'
  }));
  var $identify = $forms.find('.Form.Identify');
  var $identifyemail = $identify.find('input.Email');
  var $identifysendmail = $identify.find('button.SendEmail');
  var $identifynotregistered = $identify.find('a.NotRegistered');
  function checkemail() {
    var $this = $(this);
    var email = $this.val();
    if ($this[0].checkValidity() && (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.validatemail)(email)) {
      $identifysendmail.prop('disabled', false);
    } else {
      $identifysendmail.prop('disabled', true);
    }
    (0,_common_message__WEBPACK_IMPORTED_MODULE_0__["default"])($, '', '');
  }
  $identifyemail.on('change', checkemail);
  $identifyemail.on('keydown', checkemail);
  $identifyemail.on('keyup', checkemail);
  $identifynotregistered.on('click', function () {
    (0,_do_register_want__WEBPACK_IMPORTED_MODULE_6__["default"])($);
    return false;
  });
  $identifysendmail.on('click', function () {
    var email = $identifyemail.val();
    (0,_common_message__WEBPACK_IMPORTED_MODULE_0__["default"])($, 'Enviando...', 'Warn');
    if ($identifyemail[0].checkValidity() && (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.validatemail)(email)) {
      $identifyemail.prop('disabled', true);
      $identifysendmail.prop('disabled', true);
      (0,_common_fetch__WEBPACK_IMPORTED_MODULE_2__.apifetch)({
        url: 'mailrelay/subscriber/identify',
        body: {
          email: email
        }
      }).then(function (result) {
        if (result.data == 'notfound') {
          (0,_do_register_should__WEBPACK_IMPORTED_MODULE_5__["default"])($, email);
        } else {
          (0,_do_confirmcode__WEBPACK_IMPORTED_MODULE_4__["default"])($, email, result.code);
        }
      })["catch"](function (error) {
        console.log(error);
        (0,_common_message__WEBPACK_IMPORTED_MODULE_0__["default"])($, 'Error de servidor, intentalo de nuevo, por favor.', 'Error');
        $identifyemail.prop('disabled', false);
        $identifysendmail.prop('disabled', false);
      });
    } else {
      (0,_common_message__WEBPACK_IMPORTED_MODULE_0__["default"])($, 'El mail no es válido.', 'Error');
    }
  });
});

/***/ }),

/***/ "./src/ui/postcontent/js/identify/do-register-should.js":
/*!**************************************************************!*\
  !*** ./src/ui/postcontent/js/identify/do-register-should.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms */ "./src/ui/postcontent/js/identify/forms.js");
/* harmony import */ var _common_message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/message */ "./src/ui/postcontent/js/common/message.js");
/* harmony import */ var _do_confirmcode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./do-confirmcode */ "./src/ui/postcontent/js/identify/do-confirmcode.js");
/* harmony import */ var _do_register_want__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./do-register-want */ "./src/ui/postcontent/js/identify/do-register-want.js");
/* harmony import */ var _common_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/fetch */ "./src/ui/postcontent/js/common/fetch.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($, email) {
  var $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent');
  var $forms = $postcontent.find('.Forms.Identify');
  $forms.find('.Form').remove();
  $forms.html((0,_forms__WEBPACK_IMPORTED_MODULE_0__["default"])({
    form: 'registershould',
    email: email
  }));
  var $registershould = $forms.find('.Form.RegisterShould');
  var $registershouldconfirmcode = $registershould.find('button.RegistryEmail');
  var $registershouldothermail = $registershould.find('a.OtherMail');
  $registershouldconfirmcode.on('click', function () {
    $registershouldconfirmcode.prop('disabled', true);
    (0,_common_message__WEBPACK_IMPORTED_MODULE_1__["default"])($, 'Enviando...', 'Warn');
    (0,_common_fetch__WEBPACK_IMPORTED_MODULE_4__.apifetch)({
      url: 'mailrelay/subscriber/register',
      body: {
        email: email
      }
    }).then(function (result) {
      if (result.data.errors) {
        var errors = 'Error. ' + Object.keys(result.data.errors).map(function (key) {
          return result.data.errors[key].map(function (e) {
            return e + ' ';
          });
        }).join(', ');
        (0,_common_message__WEBPACK_IMPORTED_MODULE_1__["default"])($, errors, 'Error');
        $registershouldconfirmcode.prop('disabled', false);
      } else {
        (0,_do_confirmcode__WEBPACK_IMPORTED_MODULE_2__["default"])($, email, result.usercode);
      }
    })["catch"](function (error) {
      console.log(error);
      (0,_common_message__WEBPACK_IMPORTED_MODULE_1__["default"])($, 'Error de servidor, intentalo de nuevo, por favor.', 'Error');
      $registerwantemail.prop('disabled', false);
      $registerwantsendmail.prop('disabled', false);
    });
  });
  $registershouldothermail.on('click', function () {
    (0,_do_register_want__WEBPACK_IMPORTED_MODULE_3__["default"])($);
    return false;
  });
});

/***/ }),

/***/ "./src/ui/postcontent/js/identify/do-register-want.js":
/*!************************************************************!*\
  !*** ./src/ui/postcontent/js/identify/do-register-want.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils */ "./src/ui/postcontent/js/common/utils.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forms */ "./src/ui/postcontent/js/identify/forms.js");
/* harmony import */ var _common_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/message */ "./src/ui/postcontent/js/common/message.js");
/* harmony import */ var _do_identify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./do-identify */ "./src/ui/postcontent/js/identify/do-identify.js");
/* harmony import */ var _do_confirmcode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./do-confirmcode */ "./src/ui/postcontent/js/identify/do-confirmcode.js");
/* harmony import */ var _common_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/fetch */ "./src/ui/postcontent/js/common/fetch.js");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($) {
  var $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent');
  var $forms = $postcontent.find('.Forms.Identify');
  $forms.find('.Form').remove();
  $forms.html((0,_forms__WEBPACK_IMPORTED_MODULE_1__["default"])({
    form: 'registerwant'
  }));
  var $registerwant = $forms.find('.Form.RegisterWant');
  var $registerwantemail = $registerwant.find('input.Email');
  var $registerwantsendmail = $registerwant.find('button.SendEmail');
  var $registerwantbackidentify = $registerwant.find('a.BackIdentify');
  function checkemail() {
    var $this = $(this);
    var email = $this.val();
    if ($this[0].checkValidity() && (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.validatemail)(email)) {
      $registerwantsendmail.prop('disabled', false);
    } else {
      $registerwantsendmail.prop('disabled', true);
    }
    (0,_common_message__WEBPACK_IMPORTED_MODULE_2__["default"])($, '', '');
  }
  $registerwantemail.on('keydown', checkemail);
  $registerwantemail.on('change', checkemail);
  $registerwantbackidentify.on('click', function () {
    (0,_do_identify__WEBPACK_IMPORTED_MODULE_3__["default"])($);
    return false;
  });
  $registerwantsendmail.on('click', function () {
    var email = $registerwantemail.val();
    if ($registerwantemail[0].checkValidity() && (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.validatemail)(email)) {
      $registerwantemail.prop('disabled', true);
      $registerwantsendmail.prop('disabled', true);
      (0,_common_message__WEBPACK_IMPORTED_MODULE_2__["default"])($, 'Enviando...', 'Warn');
      (0,_common_fetch__WEBPACK_IMPORTED_MODULE_5__.apifetch)({
        url: 'mailrelay/subscriber/register',
        body: {
          email: email
        }
      }).then(function (result) {
        if (result.data.errors) {
          var errors = 'Error. ' + Object.keys(result.data.errors).map(function (key) {
            return result.data.errors[key].map(function (e) {
              return e + ' ';
            });
          }).join(', ');
          (0,_common_message__WEBPACK_IMPORTED_MODULE_2__["default"])($, errors, 'Error');
          $registerwantemail.prop('disabled', false);
          $registerwantsendmail.prop('disabled', false);
        } else {
          (0,_do_confirmcode__WEBPACK_IMPORTED_MODULE_4__["default"])($, email);
        }
      })["catch"](function (error) {
        console.log(error);
        (0,_common_message__WEBPACK_IMPORTED_MODULE_2__["default"])($, 'Error de servidor, intentalo de nuevo, por favor.', 'Error');
        $registerwantemail.prop('disabled', false);
        $registerwantsendmail.prop('disabled', false);
      });
    } else {
      (0,_common_message__WEBPACK_IMPORTED_MODULE_2__["default"])($, 'El mail no es válido.', 'Error');
    }
  });
});

/***/ }),

/***/ "./src/ui/postcontent/js/identify/form-confirmcode.js":
/*!************************************************************!*\
  !*** ./src/ui/postcontent/js/identify/form-confirmcode.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
  return "\n    <div class=\"Form ConfirmCode\">\n      <div class=\"FormName\">ConfirmCode</div>\n      <div class=\"Explain\">\n        Para confirmar tu acceso hemos enviado un c\xF3digo \n        a tu email, por favor introduce el c\xF3digo \n        recibido en el siguiente campo.\n      </div>\n      <div class=\"Fields\">\n        <div class=\"Field Code\">\n          <input\n            class=\"Code\"\n            type=\"text\"\n            placeholder=\"C\xF3digo recibido\"\n            name=\"confirm-code\"\n            value=\"".concat(data.code, "\"\n          />\n          <div class=\"Tools wp-block-button\">\n            <button \n              class=\"\n                ConfirmCode\n                wp-block-button__link \n                wp-element-button\n              \"\n            >\n              CONFIRMAR\n            </button>\n          </div>\n        </div>\n      </div>\n      \n      <a \n        class=\"Extra ResendCode\"\n        href=\"#\"\n      >\n        Reenviar el c\xF3digo\n      </a>\n      <div class=\"Message\"></div>          \n    </div>\n  ");
});

/***/ }),

/***/ "./src/ui/postcontent/js/identify/form-identify.js":
/*!*********************************************************!*\
  !*** ./src/ui/postcontent/js/identify/form-identify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
  return "\n    <div class=\"Form Identify\">\n      <div class=\"FormName\">Identify</div>\n      <div class=\"Explain\">\n        Este contenido es reservado para suscriptores, \n        por favor, identif\xEDcate con tu email para acceder.\n      </div>\n      <div class=\"Fields\">\n        <div class=\"Field Email\">\n          <input\n            class=\"Email\"\n            type=\"email\"\n            placeholder=\"Tu E-mail\"\n            name=\"user-email\"\n          />      \n          <div class=\"Tools wp-block-button\">\n            <button \n              class=\"\n                SendEmail\n                wp-block-button__link \n                wp-element-button\n              \"\n              disabled=\"disabled\"\n            >\n              ENVIAR\n            </button>\n          </div>\n        </div>\n      </div>\n      <a \n        class=\"Extra NotRegistered\"\n        href=\"#\"\n      >\n        Quiero suscribirme\n      </a>\n      <div class=\"Message\"></div>          \n    </div>\n  ";
});

/***/ }),

/***/ "./src/ui/postcontent/js/identify/form-register-confirm.js":
/*!*****************************************************************!*\
  !*** ./src/ui/postcontent/js/identify/form-register-confirm.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
  return "\n    <div class=\"Form RegisterConfirm\">\n      <div class=\"FormName\">RegisterConfirm</div>\n      <div class=\"Explain\">\n        Tu mail se ha registrado, recibiras un correo con un c\xF3digo para confirmar tu suscripci\xF3n, por favor introduce el c\xF3digo recibido en el siguiente campo.\n      </div>\n      <div class=\"Fields\">\n        <div class=\"Field Code\">\n          <input\n            class=\"Code\"\n            type=\"text\"\n            placeholder=\"C\xF3digo recibido\"\n            name=\"confirm-code\"\n          />\n        </div>\n      </div>\n      <div class=\"Tools wp-block-button\">\n        <button \n          class=\"\n            ConfirmCode\n            wp-block-button__link \n            wp-element-button\n          \"\n        >\n          CONFIRMAR\n        </button>\n      </div>\n      <div class=\"Message\"></div>          \n    </div>\n  ";
});

/***/ }),

/***/ "./src/ui/postcontent/js/identify/form-register-should.js":
/*!****************************************************************!*\
  !*** ./src/ui/postcontent/js/identify/form-register-should.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
  return "\n    <div class=\"Form RegisterShould\">\n      <div class=\"FormName\">RegisterShould</div>\n      <div class=\"Explain\">\n        El mail <strong>".concat(data.email, "</strong> no se ha encontrado, \n        quieres registrarte con <stong>este mail</strong> para acceder a los contenidos?\n      </div>\n      <div class=\"Tools wp-block-button\">\n        <button \n          class=\"\n            RegistryEmail\n            wp-block-button__link \n            wp-element-button\n          \"\n        >\n          REGISTRAR\n        </button>\n      </div>\n      <a \n        class=\"Extra OtherMail\"\n        href=\"#\"\n      >\n        Quiero suscribirme con otro email\n      </a>\n      <div class=\"Message\"></div>          \n    </div>\n  ");
});

/***/ }),

/***/ "./src/ui/postcontent/js/identify/form-register-want.js":
/*!**************************************************************!*\
  !*** ./src/ui/postcontent/js/identify/form-register-want.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
  return "\n    <div class=\"Form RegisterWant\">\n      <div class=\"FormName\">RegisterWant</div>\n      <div class=\"Explain\">\n        Registrate con tu correo para acceder a los contenidos.\n      </div>\n      <div class=\"Fields\">\n        <div class=\"Field Email\">\n          <input\n            class=\"Email\"\n            type=\"email\"\n            placeholder=\"Tu E-mail\"\n            name=\"user-email\"\n          />\n          <div class=\"Tools wp-block-button\">\n            <button \n              class=\"\n                SendEmail\n                wp-block-button__link \n                wp-element-button\n              \"\n              disabled=\"disabled\"\n            >\n              ENVIAR\n            </button>\n          </div>\n        </div>\n      </div>      \n      <a \n        class=\"Extra BackIdentify\"\n        href=\"#\"\n      >\n        Ya me registr\xE9, quiero entrar\n      </a>\n      <div class=\"Message\"></div>          \n    </div>\n  ";
});

/***/ }),

/***/ "./src/ui/postcontent/js/identify/forms.js":
/*!*************************************************!*\
  !*** ./src/ui/postcontent/js/identify/forms.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _form_identify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-identify */ "./src/ui/postcontent/js/identify/form-identify.js");
/* harmony import */ var _form_confirmcode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-confirmcode */ "./src/ui/postcontent/js/identify/form-confirmcode.js");
/* harmony import */ var _form_register_should__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-register-should */ "./src/ui/postcontent/js/identify/form-register-should.js");
/* harmony import */ var _form_register_want__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./form-register-want */ "./src/ui/postcontent/js/identify/form-register-want.js");
/* harmony import */ var _form_register_confirm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form-register-confirm */ "./src/ui/postcontent/js/identify/form-register-confirm.js");





var forms = {
  identify: _form_identify__WEBPACK_IMPORTED_MODULE_0__["default"],
  registershould: _form_register_should__WEBPACK_IMPORTED_MODULE_2__["default"],
  registerwant: _form_register_want__WEBPACK_IMPORTED_MODULE_3__["default"],
  registerconfirm: _form_register_confirm__WEBPACK_IMPORTED_MODULE_4__["default"],
  confirmcode: _form_confirmcode__WEBPACK_IMPORTED_MODULE_1__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
  return forms[data.form](data);
});

/***/ }),

/***/ "./src/ui/postcontent/js/shouldpay/do-confirmpay-bizum.js":
/*!****************************************************************!*\
  !*** ./src/ui/postcontent/js/shouldpay/do-confirmpay-bizum.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/message */ "./src/ui/postcontent/js/common/message.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forms */ "./src/ui/postcontent/js/shouldpay/forms.js");
/* harmony import */ var _common_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/fetch */ "./src/ui/postcontent/js/common/fetch.js");
/* harmony import */ var _do_paychannel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./do-paychannel */ "./src/ui/postcontent/js/shouldpay/do-paychannel.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($) {
  var $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent');
  var postcontentdata = $postcontent.data();
  var $forms = $postcontent.find('.Forms.ShouldPay');
  $forms.html((0,_forms__WEBPACK_IMPORTED_MODULE_1__["default"])({
    form: 'confirmpaybizum'
  }));
  var $confirmpay = $forms.find('.Form.ConfirmPay');
  var $confirmpaypay = $confirmpay.find('button.Pay');
  var $confirmpayother = $confirmpay.find('a.OtherChannel');
  var allowBack = true;
  $confirmpayother.on('click', function () {
    allowBack && (0,_do_paychannel__WEBPACK_IMPORTED_MODULE_3__["default"])($);
  });
  $confirmpaypay.on('click', function () {
    $confirmpaypay.prop('disabled', true);
    $confirmpayother.addClass('Disabled');
    allowBack = false;
    (0,_common_message__WEBPACK_IMPORTED_MODULE_0__["default"])($, 'Enviando...', 'Warn');
    (0,_common_fetch__WEBPACK_IMPORTED_MODULE_2__.apifetch)({
      url: 'pay/init',
      body: {
        type: 'bizum',
        email: postcontentdata.email,
        postid: postcontentdata.postid
      }
    }).then(function (data) {
      $forms.html((0,_forms__WEBPACK_IMPORTED_MODULE_1__["default"])({
        form: 'confirmpaybizumend',
        result: data
      }));
    })["catch"](function (error) {
      console.log(error);
      (0,_common_message__WEBPACK_IMPORTED_MODULE_0__["default"])($, 'Error de servidor, intentalo de nuevo, por favor.', 'Error');
      $confirmpaypay.prop('disabled', false);
      $confirmpayother.removeClass('Disabled');
      allowBack = true;
    });
  });
  $confirmpayother.on('click', function () {
    (0,_do_paychannel__WEBPACK_IMPORTED_MODULE_3__["default"])($);
    return false;
  });
});

/***/ }),

/***/ "./src/ui/postcontent/js/shouldpay/do-confirmpay-stripe-end.js":
/*!*********************************************************************!*\
  !*** ./src/ui/postcontent/js/shouldpay/do-confirmpay-stripe-end.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms */ "./src/ui/postcontent/js/shouldpay/forms.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($) {
  console.log('asdfgadfasd');
  var $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent');
  var $forms = $postcontent.find('.Forms.ShouldPay');
  $forms.html((0,_forms__WEBPACK_IMPORTED_MODULE_0__["default"])({
    form: 'confirmpaystripeend'
  }));
  var $confirmpay = $forms.find('.Form.ConfirmPay');
  var $confirmpayaccess = $confirmpay.find('button.Access');
  $confirmpayaccess.on('click', function () {
    window.location.reload();
  });
});

/***/ }),

/***/ "./src/ui/postcontent/js/shouldpay/do-confirmpay-stripe.js":
/*!*****************************************************************!*\
  !*** ./src/ui/postcontent/js/shouldpay/do-confirmpay-stripe.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/message */ "./src/ui/postcontent/js/common/message.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forms */ "./src/ui/postcontent/js/shouldpay/forms.js");
/* harmony import */ var _common_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/fetch */ "./src/ui/postcontent/js/common/fetch.js");
/* harmony import */ var _do_confirmpay_stripe_end__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./do-confirmpay-stripe-end */ "./src/ui/postcontent/js/shouldpay/do-confirmpay-stripe-end.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($, paytype) {
  var $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent');
  var postcontentdata = $postcontent.data();
  var $forms = $postcontent.find('.Forms.ShouldPay');
  $forms.html((0,_forms__WEBPACK_IMPORTED_MODULE_1__["default"])({
    form: 'confirmpaystripe'
  }));
  var $confirmpay = $forms.find('.Form.ConfirmPay');
  var $confirmpaypay = $confirmpay.find('button.Pay');
  var $confirmpayother = $confirmpay.find('a.OtherChannel');
  var allowBack = true;
  $confirmpayother.on('click', function () {
    allowBack && paychannel($);
  });
  $confirmpaypay.on('click', function () {
    $confirmpaypay.prop('disabled', true);
    $confirmpayother.addClass('Disabled');
    allowBack = false;
    (0,_common_message__WEBPACK_IMPORTED_MODULE_0__["default"])($, 'Conectando con Stripe...', 'Warn');
    (0,_common_fetch__WEBPACK_IMPORTED_MODULE_2__.apifetch)({
      url: 'pay/init',
      body: {
        type: 'stripe',
        email: postcontentdata.email,
        postid: postcontentdata.postid
      }
    }).then(function (data) {
      window.open(data.stripesession.url, 'STRIPE', 'width=1080,height=800');
      (0,_common_message__WEBPACK_IMPORTED_MODULE_0__["default"])($, 'Esperando confirmación de pago, no cierres esta ventana...', 'Warn');
      var waitStripe = setInterval(function () {
        (0,_common_fetch__WEBPACK_IMPORTED_MODULE_2__.apifetch)({
          url: 'pay/stripe/session/check',
          body: {
            stripesessionid: data.stripesession.id
          }
        }).then(function (result) {
          if (result.done) {
            clearInterval(waitStripe);
            (0,_do_confirmpay_stripe_end__WEBPACK_IMPORTED_MODULE_3__["default"])($);
          }
        });
      }, 3000);
    })["catch"](function (error) {
      console.log(error);
      (0,_common_message__WEBPACK_IMPORTED_MODULE_0__["default"])($, 'Error de servidor, intentalo de nuevo, por favor.', 'Error');
      $identifyemail.prop('disabled', false);
      $identifysendmail.prop('disabled', false);
    });
  });
});

/***/ }),

/***/ "./src/ui/postcontent/js/shouldpay/do-confirmpay-transfer.js":
/*!*******************************************************************!*\
  !*** ./src/ui/postcontent/js/shouldpay/do-confirmpay-transfer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/message */ "./src/ui/postcontent/js/common/message.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forms */ "./src/ui/postcontent/js/shouldpay/forms.js");
/* harmony import */ var _common_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/fetch */ "./src/ui/postcontent/js/common/fetch.js");
/* harmony import */ var _do_paychannel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./do-paychannel */ "./src/ui/postcontent/js/shouldpay/do-paychannel.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($) {
  var $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent');
  var postcontentdata = $postcontent.data();
  var $forms = $postcontent.find('.Forms.ShouldPay');
  $forms.html((0,_forms__WEBPACK_IMPORTED_MODULE_1__["default"])({
    form: 'confirmpaytransfer'
  }));
  var $confirmpay = $forms.find('.Form.ConfirmPay');
  var $confirmpaypay = $confirmpay.find('button.Pay');
  var $confirmpayother = $confirmpay.find('a.OtherChannel');
  var allowBack = true;
  $confirmpayother.on('click', function () {
    allowBack && (0,_do_paychannel__WEBPACK_IMPORTED_MODULE_3__["default"])($);
  });
  $confirmpaypay.on('click', function () {
    $confirmpaypay.prop('disabled', true);
    $confirmpayother.addClass('Disabled');
    allowBack = false;
    (0,_common_message__WEBPACK_IMPORTED_MODULE_0__["default"])($, 'Enviando...', 'Warn');
    (0,_common_fetch__WEBPACK_IMPORTED_MODULE_2__.apifetch)({
      url: 'pay/init',
      body: {
        type: 'transfer',
        email: postcontentdata.email,
        postid: postcontentdata.postid
      }
    }).then(function (data) {
      $forms.html((0,_forms__WEBPACK_IMPORTED_MODULE_1__["default"])({
        form: 'confirmpaytransferend',
        result: data
      }));
    })["catch"](function (error) {
      console.log(error);
      (0,_common_message__WEBPACK_IMPORTED_MODULE_0__["default"])($, 'Error de servidor, intentalo de nuevo, por favor.', 'Error');
      $confirmpaypay.prop('disabled', false);
      $confirmpayother.removeClass('Disabled');
      allowBack = true;
    });
  });
  $confirmpayother.on('click', function () {
    (0,_do_paychannel__WEBPACK_IMPORTED_MODULE_3__["default"])($);
    return false;
  });
});

/***/ }),

/***/ "./src/ui/postcontent/js/shouldpay/do-paychannel.js":
/*!**********************************************************!*\
  !*** ./src/ui/postcontent/js/shouldpay/do-paychannel.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/message */ "./src/ui/postcontent/js/common/message.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forms */ "./src/ui/postcontent/js/shouldpay/forms.js");
/* harmony import */ var _do_confirmpay_stripe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./do-confirmpay-stripe */ "./src/ui/postcontent/js/shouldpay/do-confirmpay-stripe.js");
/* harmony import */ var _do_confirmpay_transfer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./do-confirmpay-transfer */ "./src/ui/postcontent/js/shouldpay/do-confirmpay-transfer.js");
/* harmony import */ var _do_confirmpay_bizum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./do-confirmpay-bizum */ "./src/ui/postcontent/js/shouldpay/do-confirmpay-bizum.js");





var confirmpay = {
  stripe: _do_confirmpay_stripe__WEBPACK_IMPORTED_MODULE_2__["default"],
  transfer: _do_confirmpay_transfer__WEBPACK_IMPORTED_MODULE_3__["default"],
  bizum: _do_confirmpay_bizum__WEBPACK_IMPORTED_MODULE_4__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($) {
  var $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent');
  var $forms = $postcontent.find('.Forms.ShouldPay');
  $forms.html((0,_forms__WEBPACK_IMPORTED_MODULE_1__["default"])({
    form: 'paychannel'
  }));
  var $paychannel = $forms.find('.Form.PayChannel');
  var $inputchannels = $paychannel.find('.Channel input[type=radio]');
  var $paychannelpay = $paychannel.find('button.Pay');
  $inputchannels.on('change', function () {
    $paychannelpay.prop('disabled', false);
  });
  $paychannelpay.on('click', function () {
    var typeselected = $paychannel.find('.Channel input[type=radio]:checked').val();
    $inputchannels.prop('disabled', true);
    $paychannelpay.prop('disabled', true);
    (0,_common_message__WEBPACK_IMPORTED_MODULE_0__["default"])($, 'Conectando...', 'Warn');
    confirmpay[typeselected]($);
  });
});

/***/ }),

/***/ "./src/ui/postcontent/js/shouldpay/do-shouldpay.js":
/*!*********************************************************!*\
  !*** ./src/ui/postcontent/js/shouldpay/do-shouldpay.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms */ "./src/ui/postcontent/js/shouldpay/forms.js");
/* harmony import */ var _do_paychannel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./do-paychannel */ "./src/ui/postcontent/js/shouldpay/do-paychannel.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($) {
  var $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent');
  var $forms = $postcontent.find('.Forms.ShouldPay');
  $forms.html((0,_forms__WEBPACK_IMPORTED_MODULE_0__["default"])({
    form: 'shouldpay'
  }));
  var $shouldpay = $forms.find('.Form.ShouldPay');
  var $shouldpaybuy = $shouldpay.find('button.Buy');
  $shouldpaybuy.on('click', function () {
    (0,_do_paychannel__WEBPACK_IMPORTED_MODULE_1__["default"])($);
  });
});

/***/ }),

/***/ "./src/ui/postcontent/js/shouldpay/form-confirmpay-bizum-end.js":
/*!**********************************************************************!*\
  !*** ./src/ui/postcontent/js/shouldpay/form-confirmpay-bizum-end.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
  return "\n    <div class=\"Form ConfirmPay Bizum End\">\n      <div class=\"FormName\">Confirm Pay Bizum End</div>\n      <div class=\"Explain Bizum\">\n        Se ha enviado aviso de pago, Recibir\xE1s la confirmaci\xF3n \n        y el link de acceso en tu correo en un plazo de 24h \n        despu\xE9s de la confirmaci\xF3n del ingreso. \n      </div>   \n    </div>\n  ";
});

/***/ }),

/***/ "./src/ui/postcontent/js/shouldpay/form-confirmpay-bizum.js":
/*!******************************************************************!*\
  !*** ./src/ui/postcontent/js/shouldpay/form-confirmpay-bizum.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
  return "\n    <div class=\"Form ConfirmPay Bizum\">\n      <div class=\"FormName\">Confirm Pay Bizum</div>\n      <div class=\"Explain Bizum\">\n        Si eliges el pago por Bizum, el acceso a tu producto \n        digital se activar\xE1 cuando se confirme la recepci\xF3n \n        del importe en nuestro n\xFAmero</br>\n        <strong>+34 XXX XX XX XX</strong></br>\n        Recibir\xE1s la confirmaci\xF3n de pago y el link de acceso en tu correo en un plazo de 24h.\n      </div>\n      <div class=\"Tools wp-block-button\"> \n        <button \n          class=\"\n            Pay\n            wp-block-button__link \n            wp-element-button\n          \"\n        >\n          OK, HAR\xC9 BIZUM\n        </button>\n      </div>\n      <a \n        class=\"Extra OtherChannel\"\n        href=\"#\"\n      >\n        Usar otro m\xE9todo de pago\n      </a>\n      <div class=\"Message\"></div>          \n    </div>\n  ";
});

/***/ }),

/***/ "./src/ui/postcontent/js/shouldpay/form-confirmpay-stripe-end.js":
/*!***********************************************************************!*\
  !*** ./src/ui/postcontent/js/shouldpay/form-confirmpay-stripe-end.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
  return "\n    <div class=\"Form ConfirmPay Stripe End\">\n      <div class=\"FormName\">Confirm Pay Stripe End</div>\n      <div class=\"Explain Stripe\">\n        Se ha recibido el ingreso, puedes acceder al contenido.\n      </div>\n      <div class=\"Tools wp-block-button\">\n        <button \n          class=\"\n            Pay Access\n            wp-block-button__link \n            wp-element-button\n          \"\n        >\n          ACCEDER\n        </button>\n      </div>       \n    </div>\n  ";
});

/***/ }),

/***/ "./src/ui/postcontent/js/shouldpay/form-confirmpay-stripe.js":
/*!*******************************************************************!*\
  !*** ./src/ui/postcontent/js/shouldpay/form-confirmpay-stripe.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
  return "\n    <div class=\"Form ConfirmPay Stripe\">\n      <div class=\"FormName\">Confirm Pay Stripe</div>\n      <div class=\"Explain Stripe\">\n        Si eliges el pago con tarjeta, ser\xE1s redirigido \n        a la pasarela segura de <strong>Stripe</strong> para completar \n        la transacci\xF3n. Una vez confirmado el pago, \n        el acceso a tu producto digital se activar\xE1 \n        de forma inmediata. <strong>Stripe</strong> garantiza \n        la seguridad de tus datos mediante encriptaci\xF3n \n        y cumple con los m\xE1s altos est\xE1ndares internacionales \n        de protecci\xF3n de pagos (PCI DSS).\n      </div>\n      <div class=\"Tools wp-block-button\">\n        <button \n          class=\"\n            Pay Stripe\n            wp-block-button__link \n            wp-element-button\n          \"\n        >\n          PAGAR CON TARJETA\n        </button>        \n      </div>\n      <a\n        class=\"Extra OtherChannel\"\n        href=\"#\"\n      >\n        Usar otro m\xE9todo de pago\n      </a>\n      <div class=\"Message\"></div>          \n    </div>\n  ";
});

/***/ }),

/***/ "./src/ui/postcontent/js/shouldpay/form-confirmpay-transfer-end.js":
/*!*************************************************************************!*\
  !*** ./src/ui/postcontent/js/shouldpay/form-confirmpay-transfer-end.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
  return "\n    <div class=\"Form ConfirmPay Transfer End\">\n      <div class=\"FormName\">Confirm Pay Transfer</div>\n      <div class=\"Explain Transfer\">        \n        Se ha enviado aviso de pago, Recibir\xE1s la confirmaci\xF3n \n        y el link de acceso en tu correo en un plazo de 24h \n        despu\xE9s de la confirmaci\xF3n del ingreso.\n      </div>       \n    </div>\n  ";
});

/***/ }),

/***/ "./src/ui/postcontent/js/shouldpay/form-confirmpay-transfer.js":
/*!*********************************************************************!*\
  !*** ./src/ui/postcontent/js/shouldpay/form-confirmpay-transfer.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
  return "\n    <div class=\"Form ConfirmPay Transfer\">\n      <div class=\"FormName\">Confirm Pay Transfer</div>\n      <div class=\"Explain Transfer\">\n        Si eliges el pago por transferencia bancaria, \n        el acceso al producto digital se activar\xE1 \n        una vez que hayamos recibido y verificado \n        el importe en nuestra cuenta</br>\n        <strong>ES XX XXXX XXXX XX XXXXXXXXXX</strong></br> \n        Este proceso puede tardar entre 24 y 48 horas, \n        dependiendo de la entidad bancaria. Recibir\xE1s la confirmaci\xF3n de pago y el link de acceso en tu correo.\n      </div>\n      <div class=\"Tools wp-block-button\">\n        <button \n          class=\"\n            Pay Transfer\n            wp-block-button__link \n            wp-element-button\n          \"\n        >\n          OK, HAR\xC9 TRANFERENCIA\n        </button>\n      </div>\n      <a \n        class=\"Extra OtherChannel\"\n        href=\"#\"\n      >\n        Usar otro m\xE9todo de pago\n      </a>\n      <div class=\"Message\"></div>          \n    </div>\n  ";
});

/***/ }),

/***/ "./src/ui/postcontent/js/shouldpay/form-paychannel.js":
/*!************************************************************!*\
  !*** ./src/ui/postcontent/js/shouldpay/form-paychannel.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
  return "\n    <div class=\"Form PayChannel\">\n      <div class=\"FormName\">Pay Channel</div>\n      <div class=\"Explain\">\n        Puedes elegir varias formas de pago:\n      </div>\n      <div class=\"Fields\">\n        <div class=\"Field RadioButtons\">\n          <div class=\"Channel Stripe\">\n            <input \n              class=\"ChannelStripe\"\n              type=\"radio\"\n              id=\"channel-stripe\"\n              name=\"channel\"\n              value=\"stripe\"\n            />\n            <label\n              class=\"Label\"\n              for=\"channel-stripe\"\n            >\n              Tarjeta\n            </label>\n          </div>\n          <div class=\"Channel Transfer\">\n            <input \n              class=\"ChannelTransfer\"\n              type=\"radio\"\n              id=\"channel-transfer\"\n              name=\"channel\"\n              value=\"transfer\"\n            />\n            <label\n              class=\"Label\"\n              for=\"channel-transfer\"\n            >\n              Transferencia bancaria\n            </label>\n          </div>\n          <div class=\"Channel Bizum\">\n            <input \n              class=\"ChannelTransfer\"\n              type=\"radio\"\n              id=\"channel-bizum\"\n              name=\"channel\"\n              value=\"bizum\"\n            />\n            <label\n              class=\"Label\"\n              for=\"channel-bizum\"\n            >\n              Bizum\n            </label>\n          </div>\n        </div>\n      </div>\n      <div class=\"Tools wp-block-button\">\n        <button \n          class=\"\n            Pay\n            wp-block-button__link \n            wp-element-button\n          \"\n          disabled=\"disabled\"\n        >\n          OBTENER ACCESO\n        </button>\n      </div>\n      <div class=\"Message\"></div>          \n    </div>\n  ";
});

/***/ }),

/***/ "./src/ui/postcontent/js/shouldpay/form-shouldpay.js":
/*!***********************************************************!*\
  !*** ./src/ui/postcontent/js/shouldpay/form-shouldpay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
  return "\n    <div class=\"Form ShouldPay\">\n      <div class=\"FormName\">Should Pay</div>\n      <div class=\"Explain\">\n        Este contenido est\xE1 disponible para suscriptores, \n        puedes obtener acceso a estos contenidos \n        por un periodo de <strong>12 meses</strong> a partir de la fecha de adquisici\xF3n.  \n      </div>\n      <div class=\"Tools wp-block-button\">\n        <button \n          class=\"\n            Buy\n            wp-block-button__link \n            wp-element-button\n          \"\n        >\n          OBTENER ACCESO\n        </button>\n      </div>\n      <div class=\"Message\"></div>          \n    </div>\n  ";
});

/***/ }),

/***/ "./src/ui/postcontent/js/shouldpay/forms.js":
/*!**************************************************!*\
  !*** ./src/ui/postcontent/js/shouldpay/forms.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _form_shouldpay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-shouldpay */ "./src/ui/postcontent/js/shouldpay/form-shouldpay.js");
/* harmony import */ var _form_paychannel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-paychannel */ "./src/ui/postcontent/js/shouldpay/form-paychannel.js");
/* harmony import */ var _form_confirmpay_stripe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-confirmpay-stripe */ "./src/ui/postcontent/js/shouldpay/form-confirmpay-stripe.js");
/* harmony import */ var _form_confirmpay_stripe_end__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./form-confirmpay-stripe-end */ "./src/ui/postcontent/js/shouldpay/form-confirmpay-stripe-end.js");
/* harmony import */ var _form_confirmpay_transfer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form-confirmpay-transfer */ "./src/ui/postcontent/js/shouldpay/form-confirmpay-transfer.js");
/* harmony import */ var _form_confirmpay_transfer_end__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./form-confirmpay-transfer-end */ "./src/ui/postcontent/js/shouldpay/form-confirmpay-transfer-end.js");
/* harmony import */ var _form_confirmpay_bizum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./form-confirmpay-bizum */ "./src/ui/postcontent/js/shouldpay/form-confirmpay-bizum.js");
/* harmony import */ var _form_confirmpay_bizum_end__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./form-confirmpay-bizum-end */ "./src/ui/postcontent/js/shouldpay/form-confirmpay-bizum-end.js");








var forms = {
  shouldpay: _form_shouldpay__WEBPACK_IMPORTED_MODULE_0__["default"],
  paychannel: _form_paychannel__WEBPACK_IMPORTED_MODULE_1__["default"],
  confirmpaystripe: _form_confirmpay_stripe__WEBPACK_IMPORTED_MODULE_2__["default"],
  confirmpaystripeend: _form_confirmpay_stripe_end__WEBPACK_IMPORTED_MODULE_3__["default"],
  confirmpaytransfer: _form_confirmpay_transfer__WEBPACK_IMPORTED_MODULE_4__["default"],
  confirmpaytransferend: _form_confirmpay_transfer_end__WEBPACK_IMPORTED_MODULE_5__["default"],
  confirmpaybizum: _form_confirmpay_bizum__WEBPACK_IMPORTED_MODULE_6__["default"],
  confirmpaybizumend: _form_confirmpay_bizum_end__WEBPACK_IMPORTED_MODULE_7__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (data) {
  return forms[data.form](data);
});

/***/ }),

/***/ "./src/ui/postcontent/main.scss":
/*!**************************************!*\
  !*** ./src/ui/postcontent/main.scss ***!
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
/*!************************************!*\
  !*** ./src/ui/postcontent/main.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_identify_do_identify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/identify/do-identify */ "./src/ui/postcontent/js/identify/do-identify.js");
/* harmony import */ var _js_shouldpay_do_shouldpay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/shouldpay/do-shouldpay */ "./src/ui/postcontent/js/shouldpay/do-shouldpay.js");
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main.scss */ "./src/ui/postcontent/main.scss");



(function ($) {
  var $postcontent = $('.wp-block-poeticsoft_content_payment_postcontent');
  var $formsidentify = $postcontent.find('.Forms.Identify');
  var $formsshouldpay = $postcontent.find('.Forms.ShouldPay');
  if ($formsidentify.length) {
    (0,_js_identify_do_identify__WEBPACK_IMPORTED_MODULE_0__["default"])($);
  }
  if ($formsshouldpay.length) {
    (0,_js_shouldpay_do_shouldpay__WEBPACK_IMPORTED_MODULE_1__["default"])($);
  }
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map