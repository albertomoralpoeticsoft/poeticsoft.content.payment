export default data => { 

  console.log(data)
  
  const accesstype = poeticsoft_content_payment_core_block_postcontent_accesstype_origin

  let paytext = ''
  let accessbutton = ''

  switch(accesstype) {

    case 'gsheets':

      paytext = data.advicetext   

      break

    default:

      paytext = `
        Este contenido está disponible para suscriptores, 
        puedes obtener acceso a estos contenidos 
        por un periodo de <strong>12 meses</strong> a partir de la fecha de adquisición.  
      `
      accessbutton = `
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
      `
      break
  }

  return `
    <div class="Form ShouldPay">
      <div class="FormName">Should Pay</div>
      <div class="Explain">
        ${ paytext }  
      </div>
      ${ accessbutton }
      <div class="Message"></div>          
    </div>
  `
}