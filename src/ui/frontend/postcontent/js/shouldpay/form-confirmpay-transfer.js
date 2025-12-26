export default data => {

  return `
    <div class="Form ConfirmPay Transfer">
      <div class="FormName">Confirm Pay Transfer</div>
      <div class="Explain Transfer">
        Si eliges el pago por transferencia bancaria, 
        el acceso al producto digital se activará 
        una vez que hayamos recibido y verificado 
        el importe en nuestra cuenta</br>
        <strong>ES XX XXXX XXXX XX XXXXXXXXXX</strong></br> 
        Este proceso puede tardar entre 24 y 48 horas, 
        dependiendo de la entidad bancaria. Recibirás la confirmación de pago y el link de acceso en tu correo.
      </div>
      <div class="Tools wp-block-button">
        <button 
          class="
            Pay Transfer
            wp-block-button__link 
            wp-element-button
          "
        >
          OK, HARÉ TRANFERENCIA
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