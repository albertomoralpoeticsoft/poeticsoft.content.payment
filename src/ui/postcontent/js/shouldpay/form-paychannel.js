export default data => {

  return `
    <div class="Form PayChannel">
      <div class="FormName">Pay Channel</div>
      <div class="Explain">
        Puedes elegir varias formas de pago:
      </div>
      <div class="Fields">
        <div class="Field RadioButtons">
          <div class="Channel Stripe">
            <input 
              class="ChannelStripe"
              type="radio"
              id="channel-stripe"
              name="channel"
              value="stripe"
            />
            <label
              class="Label"
              for="channel-stripe"
            >
              Tarjeta
            </label>
          </div>
          <div class="Channel Transfer">
            <input 
              class="ChannelTransfer"
              type="radio"
              id="channel-transfer"
              name="channel"
              value="transfer"
            />
            <label
              class="Label"
              for="channel-transfer"
            >
              Transferencia bancaria
            </label>
          </div>
          <div class="Channel Bizum">
            <input 
              class="ChannelTransfer"
              type="radio"
              id="channel-bizum"
              name="channel"
              value="bizum"
            />
            <label
              class="Label"
              for="channel-bizum"
            >
              Bizum
            </label>
          </div>
        </div>
      </div>
      <div class="Tools wp-block-button">
        <button 
          class="
            Pay
            wp-block-button__link 
            wp-element-button
          "
          disabled="disabled"
        >
          OBTENER ACCESO
        </button>
      </div>
      <div class="Message"></div>          
    </div>
  `
}