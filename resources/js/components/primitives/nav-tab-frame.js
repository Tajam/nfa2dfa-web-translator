// @ts-check

/**
 * Basic navigation tabs component.
 * @public
 */
class NavTabFrame {

  /* template */
  template = `
    <div>
      <ul class="nav nav-tabs">
        <li v-for="(item, index) in items" class="nav-item">
          <a class="nav-link" :class="{ active:(index===0) }" data-toggle="tab" :href="'#' + item.id">
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
      <div class="p-3 tab-content">
        <div v-for="(item, index) in items" 
        class="tab-pane fade"
        :class="{ show:(index===0), active:(index===0) }"
        :id="item.id">
          <slot :name="item.id"></slot>
        </div>
      </div>
    </div>
  `;

  props = {
    /**
     * An array of navigation tab items
     * @property {String} id
     * @property {String} name
     */
    'items': Array
  };

}