// @ts-check

/**
 * A button group component.
 * Consist of one positive and negative sign button.
 * @public
 */
class AddMinusButtons {

  /* template */
  template = `
    <div class="btn-group btn-group-sm">
      <button 
      @click="$emit('click-minus')" 
      type="button" 
      class="btn btn-outline-secondary"
      :disable="disableMinus">-</button>
      <button 
      @click="$emit('click-plus')" 
      type="button" 
      class="btn btn-outline-secondary"
      :disable="disablePlus">+</button>
    </div>
  `;

  props = {
    'disablePlus': Boolean,
    'disableMinus': Boolean
  }

}