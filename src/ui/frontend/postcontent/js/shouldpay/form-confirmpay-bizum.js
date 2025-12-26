export default data => {

  return `
    <div class="Form ConfirmPay Bizum">
      <div class="FormName">Confirm Pay Bizum</div>
      <div class="Explain Bizum">
        Si eliges el pago por Bizum, el acceso a tu producto 
        digital se activará cuando se confirme la recepción 
        del importe en nuestro número</br>
        <strong>+34 XXX XX XX XX</strong></br>
        Recibirás la confirmación de pago y el link de acceso en tu correo en un plazo de 24h.
      </div>
      <div class="Tools wp-block-button"> 
        <button 
          class="
            Pay
            wp-block-button__link 
            wp-element-button
          "
        >
          OK, HARÉ BIZUM
        </button>
      </div>
      <a 
        class="Extra OtherChannel"
        href="#"
      >
        Usar otro método de pago
      </a>
      <div class="Message"></div>          
    </div>
  `
}