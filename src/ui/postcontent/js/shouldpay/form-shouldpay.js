export default data => {

  return `
    <div class="Form ShouldPay">
      <div class="FormName">Should Pay</div>
      <div class="Explain">
        Este contenido está disponible para suscriptores, 
        puedes obtener acceso a estos contenidos 
        por un periodo de <strong>12 meses</strong> a partir de la fecha de adquisición.  
      </div>
      <div class="Tools wp-block-button">
        <button 
          class="
            Buy
            wp-block-button__link 
            wp-element-button
          "
        >
          OBTENER ACCESO
        </button>
      </div>
      <div class="Message"></div>          
    </div>
  `
}