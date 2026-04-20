/******/ (() => { // webpackBootstrap
/*!************************************************!*\
  !*** ./src/ui/frontend/registeraccess/main.js ***!
  \************************************************/
var PCP_ACESS_DATA = poeticsoft_content_payment_register_access_data.split('||');
var PCP_POST_ID = PCP_ACESS_DATA[0];
var PCP_USER_EMAIL = PCP_ACESS_DATA[1];
var PCP_USER_IP = PCP_ACESS_DATA[2];
var PCP_LOG_URL = '/wp-json/poeticsoft/contentpayment/campus/access';
var PCP_HEARTBEAT_INTERVAL = 30000;
function trikaLog(action) {
  fetch(PCP_LOG_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: PCP_USER_EMAIL,
      post_id: PCP_POST_ID,
      fecha_hora: new Date().toISOString(),
      accion: action
    }),
    keepalive: true
  })["catch"](function () {});
}
trikaLog('entrada');
var heartbeat = setInterval(function () {
  return trikaLog('heartbeat');
}, PCP_HEARTBEAT_INTERVAL);
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    clearInterval(heartbeat);
    heartbeat = null;
  } else {
    if (!heartbeat) {
      heartbeat = setInterval(function () {
        return trikaLog('heartbeat');
      }, PCP_HEARTBEAT_INTERVAL);
    }
  }
});
window.addEventListener('pagehide', function () {
  clearInterval(heartbeat);
  var data = JSON.stringify({
    email: PCP_USER_EMAIL,
    post_id: PCP_POST_ID,
    fecha_hora: new Date().toISOString(),
    accion: 'salida'
  });
  var blob = new Blob([data], {
    type: 'application/json'
  });
  navigator.sendBeacon(PCP_LOG_URL, blob);
});
/******/ })()
;
//# sourceMappingURL=main.js.map