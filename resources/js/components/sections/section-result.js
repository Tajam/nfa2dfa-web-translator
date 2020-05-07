// @ts-check

/// <reference path="../../adapter.js" />
/// <reference path="../primitives/subtitle.js" />
/// <reference path="../primitives/nav-tab-frame.js" />
/// <reference path="../primitives/not-converted-message.js" />
/// <reference path="../complexes/result-area-test.js" />
/// <reference path="../complexes/result-area-automaton-table.js" />

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
          <nav-tab-frame :items="items">
            <template #tab-string-test>
              <result-area-test v-if="adapter.isConverted()" :adapter="adapter"></result-area-test>
              <converted-message v-else></converted-message>
            </template>
            <template #tab-original-input>
              <automaton-table v-if="adapter.isConverted()" :adapter="adapter" 
              title="Original NFA-ε" :automatonType="adapter.AutomatonType.NFAe"></automaton-table>
              <converted-message></converted-message>
            </template>
            <template #tab-nfa-conversion>
              <automaton-table v-if="adapter.isConverted()" :adapter="adapter" 
              title="Converted to NFA" :automatonType="adapter.AutomatonType.NFA"></automaton-table>
              <converted-message v-else></converted-message>
            </template>
            <template #tab-dfa-conversion>
              <span v-if="adapter.isConverted()">DFA</span>
              <converted-message v-else></converted-message>
            </template>
            <template #tab-dfa-minimization>
              <span v-if="adapter.isConverted()">Minimized</span>
              <converted-message v-else></converted-message>
            </template>
          </nav-tab-frame>
        </div>
      </div>
    </div>
  `;

  components = {
    'sub-title': new Subtitle(),
    'nav-tab-frame': new NavTabFrame(),
    'result-area-test': new ResultAreaTest(),
    'automaton-table': new ResultAreaAutomatonTable(),
    'converted-message': new NotConvertedMessage()
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
          id: 'tab-original-input',
          name: 'Original'
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