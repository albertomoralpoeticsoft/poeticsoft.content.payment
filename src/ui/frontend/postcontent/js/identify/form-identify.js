export default data => {

  return `
    <div class="Form Identify">
      <div class="FormName">Identify</div>
      <div class="Explain">
        Este contenido es reservado para suscriptores, 
        por favor, identifícate con tu email para acceder.
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
      <a 
        class="Extra NotRegistered"
        href="#"
      >
        Quiero suscribirme
      </a>
      <div class="Message"></div>          
    </div>
  `
}