// @ts-check

/**
 * Basic modal component.
 * @public
 */
class ModalFrame {

  /* template */
  template = `
    <div class="modal fade" :id="id" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  `;

  props = {
    'id': String,
    'title': String
  };

}