// @ts-check

/**
 * Subtitle component for sections.
 * @public
 */
class Subtitle {

  /* template */
  template = `
    <div class="row">
      <div class="col">
        <h5 class="text-muted">
          <span>{{ title }}</span>
          <slot></slot>
        </h5>
      </div>
    </div>
  `;

  props = {
    'title': String
  }

}