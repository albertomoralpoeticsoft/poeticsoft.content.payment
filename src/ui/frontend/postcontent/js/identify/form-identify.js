export default data => {

  const needregister = [
    'mailrelay'
  ]

  const accesstype = poeticsoft_content_payment_core_block_postcontent_accesstype_origin
  const wantregister = needregister.includes(accesstype) ?
  `
  <a 
    class="Extra NotRegistered"
    href="#"
  >
    Quiero suscribirme
  </a>
  `
  :
  ''

  return `
    <div class="Form Identify">
      <div class="FormName">Identify</div>
      <div class="Explain">
        Este contenido es reservado para suscriptores, 
        por favor, identifícate con <strong>tu email</strong>.
      </div>
      <div class="Fields">
        <div class="Field Email">
          <input
            class="Email"
            type="email"
            placeholder="Tu E-mail"
            name="user-email"
          />      
          <div class="Tools wp-block-button">
            <button 
              class="
                SendEmail
                wp-block-button__link 
                wp-element-button
              "
              disabled="disabled"
            >
              ENVIAR
            </button>
          </div>
        </div>
      </div>
      ${ wantregister }
      <div class="Message"></div>          
    </div>
  `
}