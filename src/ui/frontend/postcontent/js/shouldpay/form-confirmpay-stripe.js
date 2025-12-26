export default data => {

  return `
    <div class="Form ConfirmPay Stripe">
      <div class="FormName">Confirm Pay Stripe</div>
      <div class="Explain Stripe">
        Si eliges el pago con tarjeta, serás redirigido 
        a la pasarela segura de <strong>Stripe</strong> para completar 
        la transacción. Una vez confirmado el pago, 
        el acceso a tu producto digital se activará 
        de forma inmediata. <strong>Stripe</strong> garantiza 
        la seguridad de tus datos mediante encriptación 
        y cumple con los más altos estándares internacionales 
        de protección de pagos (PCI DSS).
      </div>
      <div class="Tools wp-block-button">
        <button 
          class="
            Pay Stripe
            wp-block-button__link 
            wp-element-button
          "
        >
          PAGAR CON TARJETA
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