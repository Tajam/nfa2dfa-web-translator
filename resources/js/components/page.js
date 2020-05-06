// @ts-check

/// <reference path="../adapter.js" />
/// <reference path="sections/section-header.js" />
/// <reference path="sections/section-input.js" />
/// <reference path="sections/section-result.js" />

/**
 * The component that represents the whole page of the application.
 * @public
 */
class Page {

  /**
   * The adapter object
   * @private @field @type {Adapter}
   */
  adapter;

  /**
   * Constructor for this component
   * @public @constructor 
   * @param {Adapter} adapter
   */
  constructor (adapter) {
    this.adapter = adapter;
  }

  /* template */
  template = `
    <div>
      <section-header v-bind:adapter="adapter"></section-header>
      <section-input v-bind:adapter="adapter"></section-input>
      <section-result v-bind:adapter="adapter"></section-result>
    </div>
  `

  data = () => {
    return {
      adapter: this.adapter
    }
  }

  components = {
    'section-header': new SectionHeader(),
    'section-input': new SectionInput(),
    'section-result': new SectionResult()
  }

}