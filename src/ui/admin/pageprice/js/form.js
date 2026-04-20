export const rowform = (
  $, 
  postid, 
  elm = 'div',
  data = {}
) => {

  return `<${ elm } id="${ postid }" class="PCPPrice">
    <div class="PriceTools">
      <div class="PostId">${ postid.replace('post-', '') }</div>
      <div class="Access">
        <input   
          type="checkbox"
          id="isfree_${ postid }"
          name="isfree_${ postid }"
          class="IsFree"
          ${ data.isfree ? 'checked' : '' }
        />
        <label 
          for="isfree_${ postid }"
          class="${ data.isfree ? 'Free' : '' }"
        >
          Libre
        </label>
      </div>
    </div>
  </${ elm }>`
}