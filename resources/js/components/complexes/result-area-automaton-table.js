// @ts-check

/// <reference path="../../adapter.js" />
/// <reference path="../primitives/table-frame.js" />
/// <reference path="../primitives/subtitle.js" />
/// <reference path="../primitives/state-option-buttons.js" />
/// <reference path="../primitives/transition-input-group.js" />

/**
 * An area to show any automaton table.
 * @public
 */
class ResultAreaAutomatonTable {

  /* template */
  template = `
    <div>
      <sub-title :title="title"><hr></sub-title>
      <div class="row">
        <div class="col">
          <table-frame :headLast="false" :bodyLast="false">
            <template #head-content>
              <th v-for="symbol in adapter.listSymbols(automatonType)" class="text-center text-muted">
                <span>{{ symbol.stringify() }}</span>
              </th>
            </template>
            <template #body-content>
              <tr v-for="state in adapter.listStates(automatonType)" class="text-center">
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

  props = {
    'adapter': Adapter,
    'automatonType': String,
    'title': String
  }

  components = {
    'table-frame': new TableFrame(),
    'sub-title': new Subtitle(),
    'state-option-buttons': new StateOptionButtons(),
    'transition-input-group': new TransitionInputGroup()
  }

}