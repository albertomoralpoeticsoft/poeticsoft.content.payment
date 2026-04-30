const PCP_ACESS_DATA = poeticsoft_content_payment_register_access_data.split('||')

const PCP_POST_ID = PCP_ACESS_DATA[0]
const PCP_USER_EMAIL = PCP_ACESS_DATA[1]
const PCP_USER_IP = PCP_ACESS_DATA[2]
const PCP_LOG_URL = '/wp-json/poeticsoft/contentpayment/campus/access'
const PCP_HEARTBEAT_INTERVAL = 30000

function trikaLog(action) {

  fetch(PCP_LOG_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correo: PCP_USER_EMAIL,
        post_id: PCP_POST_ID,
        fecha_hora: new Date().toISOString(),
        accion: action
      }),
      keepalive: true
    }
  )
  .catch(() => {})
}

trikaLog('entrada')

let heartbeat = setInterval(
  () => trikaLog('heartbeat'), 
  PCP_HEARTBEAT_INTERVAL
)

document.addEventListener(
  'visibilitychange', 
  () => {

    if (document.visibilityState === 'hidden') {

      clearInterval(heartbeat) 
      heartbeat = null

    } else {

      if (!heartbeat) {
        
        heartbeat = setInterval(
          () => trikaLog('heartbeat'), 
          PCP_HEARTBEAT_INTERVAL
        )
      }
    }
  }
)

window.addEventListener('pagehide', () => {

  clearInterval(heartbeat)

  const data = JSON.stringify({
    correo: PCP_USER_EMAIL,
    post_id: PCP_POST_ID,
    fecha_hora: new Date().toISOString(),
    accion: 'salida'
  });

  const blob = new Blob([data], { type: 'application/json' });

  navigator.sendBeacon(
    PCP_LOG_URL,
    blob
  )
})