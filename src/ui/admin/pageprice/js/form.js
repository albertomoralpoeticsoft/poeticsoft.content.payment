export const rowform = (
  $, 
  postid, 
  elm = 'div'
) => {

  return `<${ elm } id="${ postid }" class="PCPPrice">    
    <div class="Price">
      <div class="Type Free">Libre</div>
      <div class="Type Sum">Suma</div>
      <div class="Type Local">Precio</div>
      <div class="Value">
        <div class="Number">0</div>
        <div class="Currency">eur</div>
      </div>
    </div>
    <div class="PriceForm"></div>
  </${ elm }>`
}

export const formloading = ($, formclass='') => {

  return `<div class="Selectors ${ formclass }">
    <div class="Loading">
      Cargando editor...
    </div>
  </div>`
}

export const priceform = ($, data, formclass='') => {

  return `<div class="Selectors ${ formclass }">

    <div class="Tools">
      <button 
        type="button"
        class="Close button button-secondary" 
      >x</button>
      <button 
        type="button"
        class="Save button button-primary"
        disabled="disabled" 
      >✓</button>
    </div>

    <div class="
      Selector
      free      
      ${ data.type == 'sum' ? 'Selected' : '' }
    ">
      <input   
        type="radio"
        id="type-free"
        name="type"
        class="type"
        value="free"
        ${ data.type == 'free' ? 'checked' : '' }
      />
      <label for="type-free">
        Libre
      </label>
    </div>

    <div class="
      Selector 
      sum       
      ${ data.type == 'sum' ? 'Selected' : '' }
    ">
      <input   
        type="radio"
        id="type-sum"
        name="type"
        class="type"
        value="sum"
        ${ data.type == 'sum' ? 'checked' : '' }
      />
      <label for="type-sum">
        Suma
      </label>    
      <div class="SumaDiscount">
        -
      </div>      
      <input 
        type="number" 
        class="discount" 
        min="0"
        placeholder="Discount"
      />
      <div class="Currency">
        eur
      </div>
    </div>

    <div class="
      Selector 
      local 
      ${ data.type == 'local' ? 'Selected' : '' }
    ">
      <input   
        type="radio"
        id="type-local"
        name="type"
        class="type"
        value="local"
        ${ data.type == 'local' ? 'checked' : '' }
      />
      <input 
        type="number" 
        class="value"
        placeholder="Fix Price"
        min="0"
      />
      <div class="Currency">
        eur
      </div>
    </div>

    <div class="Updating">
      <div class="Text">
        Actualizando...
      </div>
    </div>
  </div>`
}