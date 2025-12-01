export const rowform = ($, postid) => {

  return `<div id="${ postid }" class="PCPPrice">    
    <div class="Precio">
      <div class="Type Free">Libre</div>
      <div class="Type Sum">Suma</div>
      <div class="Type Local">Precio</div>
      <div class="PriceForm"></div>
      <div class="Value">
        <div class="Suma Suma_2031">0</div>
        <div class="Currency">eur</div>
      </div>
    </div>
  </div>`
}

export const priceform = ($, post) => {

  return `<div class="Selectors">
    <div class="Selector Free">
      <input 
        data-type="free" 
        type="radio" 
        class="poeticsoft_content_payment_assign_price_type" 
        name="poeticsoft_content_payment_assign_price_type_2500" 
        value="free"
      />
      <div class="Legend">
        Libre
      </div>
    </div>
    <div class="Selector Sum">
      <input 
        data-type="sum" 
        type="radio" 
        class="poeticsoft_content_payment_assign_price_type" 
        name="poeticsoft_content_payment_assign_price_type_2500" 
        value="sum"
      />
      <div class="Legend">
        Suma
      </div>    
      <div class="SumaDiscount">
        -
      </div>      
      <input 
        type="number" 
        class="poeticsoft_content_payment_assign_price_discount" 
        min="0" 
        name="poeticsoft_content_payment_assign_price_discount_2500" 
        value="40"
      />
      <div class="Currency">
        eur (Descuento)
      </div>
    </div>
    <div class="Selector Local">
      <input 
        data-type="local" 
        type="radio" 
        class="poeticsoft_content_payment_assign_price_type" 
        name="poeticsoft_content_payment_assign_price_type_2500" 
        value="local"
      >
      <input 
        type="number" 
        class="poeticsoft_content_payment_assign_price_value" 
        name="poeticsoft_content_payment_assign_price_value_2500" 
        value="160" 
        disabled=""
      />
      <div class="Currency">
        eur
      </div>
    </div>
  </div>`
}