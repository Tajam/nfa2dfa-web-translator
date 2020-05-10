// @ts-check

/// <reference path="adapter.js" />
/// <reference path="components/page.js" />

/**
 * This object serve as the opening point of the application
 * @public
 */
class Application {

  /**
   * The adapter object
   * @private @field @type {Adapter}
   */
  adapter = new Adapter();

  /**
   * Execute this method to start the application
   * @public @method
   * @returns {void}
   */
  run () {

    /**
     * Require jquery
     * Initiate the popover function for bootstrap framework
     */
    //@ts-ignore
    $('[data-toggle="popover"]').popover();

    /**
     * Require vue.js
     * Start Vue
     */
    // @ts-ignore
    new Vue({

      el: '#main',
  
      components: {
        'application': new Page(this.adapter)
      }
  
    });

  }

}