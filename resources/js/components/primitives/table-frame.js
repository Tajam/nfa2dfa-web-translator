// @ts-check

/**
 * Basic table component.
 * @public
 */
class TableFrame {

  /* template */
  template = `
    <div class="table-responsive">
      <table class="table table-sm">
        <thead>
          <tr>
            <th>
              <slot name="head-first"></slot>
            </th>
            <slot name="head-content"></slot>
            <th v-if="headLast">
              <slot name="head-last"></slot>
            </th>
          </tr>
        </thead>
        <tbody>
          <slot name="body-content"></slot>
          <tr v-if="bodyLast">
            <th>
              <slot name="body-last"></slot>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  props = {
    'headLast': Boolean,
    'bodyLast': Boolean
  };

}