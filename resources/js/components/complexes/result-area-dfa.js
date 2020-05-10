// @ts-check

/// <reference path="../../adapter.js" />
/// <reference path="../primitives/table-frame.js" />
/// <reference path="../primitives/subtitle.js" />
/// <reference path="../primitives/state-option-buttons.js" />
/// <reference path="../primitives/transition-input-group.js" />

/**
 * A component that displays the a relabel table
 * @public
 */
class ResultAreaDFA {

  /* template */
  template = `
    <div>
      <sub-title :title="title"><hr></sub-title>
      <div class="row">
        <div class="col">
          <table-frame :headLast="false" :bodyLast="false">
            <template #head-first>
              <span class="text-muted">Relabel To</span>
            </template>
            <template #head-content>
              <th></th>
              <th v-for="symbol in adapter.listSymbols(automatonType)" class="text-center text-muted">
                <span>{{ symbol.stringify() }}</span>
              </th>
            </template>
            <template #body-content>
              <tr v-for="(state, index) in adapter.listStates(automatonType)" class="text-center">
                <td>
                  <span class="btn btn-sm btn-outline-primary">{{ generateLabel(index) }}</span>
                </td>
                <td>
                  <state-option-buttons :display="true" :state="state"></state-option-buttons>
                </td>
                <td v-for="transition in state.listTransitions()">
                  <transition-input-group 
                  :display="true"
                  :transition="transition"></transition-input-group>
                </td>
              </tr>
            </template>
          </table-frame>
        </div>
      </div>
    </div>
  `;

  components = {
    'table-frame': new TableFrame(),
    'sub-title': new Subtitle(),
    'state-option-buttons': new StateOptionButtons(),
    'transition-input-group': new TransitionInputGroup()
  }

  props = {
    'adapter': Adapter,
    'automatonType': String,
    'title': String
  }

  methods = {
    generateLabel: (counter) => {
      let label = '';
      while(true) {
        let value = counter % 26;
        if (counter < 26) {
          return String.fromCharCode(65 + value) + label;
        }
        counter = ((counter / 26) | 0) - 1;
        label = String.fromCharCode(65 + value) + label;
      }
    }
  }

}