export default data => {

  return `
    <div class="Form RegisterShould">
      <div class="FormName">RegisterShould</div>
      <div class="Explain">
        El mail <strong>${ data.email }</strong> no se ha encontrado, 
        quieres registrarte con <stong>este mail</strong> para acceder a los contenidos?
      </div>
      <div class="Tools wp-block-button">
        <button 
          class="
            RegistryEmail
            wp-block-button__link 
            wp-element-button
          "
        >
          REGISTRAR
        </button>
      </div>
      <a 
        class="Extra OtherMail"
        href="#"
      >
        Quiero suscribirme con otro email
      </a>
      <div class="Message"></div>          
    </div>
  `
}