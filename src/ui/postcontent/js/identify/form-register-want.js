export default data => {

  return `
    <div class="Form RegisterWant">
      <div class="FormName">RegisterWant</div>
      <div class="Explain">
        Registrate con tu correo para acceder a los contenidos.
      </div>
      <div class="Fields">
        <div class="Field Email">
          <input
            class="Email"
            type="email"
            placeholder="Tu E-mail"
            name="user-email"
            value="poeticsoft@gmail.com"
          />
        </div>
      </div>
      <div class="Tools wp-block-button">
        <button 
          class="
            SendEmail
            wp-block-button__link 
            wp-element-button
          "
        >
          ENVIAR
        </button>
      </div>
      <a 
        class="Extra BackIdentify"
        href="#"
      >
        Ya me registré, quiero entrar
      </a>
      <div class="Message"></div>          
    </div>
  `
}