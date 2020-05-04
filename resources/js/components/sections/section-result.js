// @ts-check

/// <reference path="../../adapters/adapter.js" />
/// <reference path="../primitives/subtitle.js" />
/// <reference path="../primitives/nav-tab-frame.js" />

/**
 * The components for input section of the page.
 * Testing and conversion results.
 * @public
 */
class SectionResult {
  
  /* template */
  template = `
    <div class="container-xl pt-3 pt-xl-5">
      <sub-title :title="title"></sub-title>
      <div class="row pt-2">
        <div class="col">
          <nav-tab-frame :items="items"></nav-tab-frame>
        </div>
      </div>
    </div>
  `;

  components = {
    'sub-title': new Subtitle(),
    'nav-tab-frame': new NavTabFrame()
  };

  props = {
    'adapter': Adapter
  };

  data = () => {
    return {
      title: 'Tests and conversions',
      items: [
        {
          id: 'tab-string-test',
          name: 'Test'
        },
        {
          id: 'tab-nfa-conversion',
          name: 'To NFA'
        },
        {
          id: 'tab-dfa-conversion',
          name: 'To DFA'
        },
        {
          id: 'tab-dfa-minimization',
          name: 'DFA Minimized'
        }
      ]
    };
  };

}