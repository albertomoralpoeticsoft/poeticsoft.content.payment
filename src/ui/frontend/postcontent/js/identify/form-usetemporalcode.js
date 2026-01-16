export default data => {

  return `
    <div class="Form UseTemporalCode">
      <div class="FormName">Use Temporal Code</div>
      <div class="Explain">
        Este contenido es reservado para suscriptores, 
        por favor, identifícate con el <strong>código temporal</strong> de acceso.
      </div>
      <div class="Fields">
        <div class="Field TemporalCode">
          <input
            class="TemporalCode"
            type="text"
            placeholder="Código"
            name="temporalcode"
          />      
          <div class="Tools wp-block-button">
            <button 
              class="
                SendTemporalCode
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
      <div class="Message"></div>          
    </div>
  `
}