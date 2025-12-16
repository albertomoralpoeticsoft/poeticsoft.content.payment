export const rowform = ($, postid) => {

  return `<div id="${ postid }" class="PCPPrice">    
    <div class="Precio">
      <div class="Type Free">Libre</div>
      <div class="Type Sum">Suma</div>
      <div class="Type Local">Precio</div>
      <div class="Value">
        <div class="Suma">0</div>
        <div class="Currency">eur</div>
      </div>
      <div class="PriceForm"></div>
    </div>
  </div>`
}

export const priceformload = ($) => {

  return `<div class="Selectors">
    <div class="Loading">
      Cargando editor...
    </div>
  </div>`
}

export const priceform = ($, data) => {

  return `<form class="Selectors">

    <div class="Tools">
      <button 
        class="Close button button-primary" 
        value="X"
      >X</buton>
    </div>

    <div class="Selector free">
      <input   
        type="radio"
        id="type"
        name="type"
        class="type"
        value="free"
      />
      <div class="Legend">
        Libre
      </div>
    </div>

    <div class="Selector sum">
      <input   
        type="radio"
        id="type"
        name="type"
        class="type"
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
        class="discount" 
        min="0"
      />
      <div class="Currency">
        eur descuento
      </div>
    </div>

    <div class="Selector local">
      <input   
        type="radio"
        id="type"
        name="type"
        class="type"
        value="local"
      />
      <input 
        type="number" 
        class="value"
      />
      <div class="Currency">
        eur
      </div>
    </div>

  </form>`
}