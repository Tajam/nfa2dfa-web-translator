// @ts-check

/// <reference path="../../adapter.js" />
/// <reference path="../primitives/table-frame.js" />
/// <reference path="../primitives/add-minus-buttons.js" />
/// <reference path="../primitives/state-option-buttons.js" />
/// <reference path="../primitives/transition-input-group.js" />

/**
 * Complex table input component specially for input section
 * @public
 */
class InputAreaTable {

  /* template */
  template = `
    <table-frame :headLast="true" :bodyLast="true">
      <template #head-content>
        <th v-for="symbol in adapter.listSymbols()" class="text-center text-muted">
          <span>{{ symbol.stringify() }}</span>
        </th>
      </template>
      <template #body-content>
        <tr v-for="state in adapter.listStates()" class="text-center">
          <th>
            <state-option-buttons :display="false" :state="state"></state-option-buttons>
          </th>
          <td v-for="transition in state.listTransitions()">
            <transition-input-group 
            :display="false"
            :transition="transition"></transition-input-group>
          </td>
        </tr>
      </template>
      <template #head-last>
        <add-minus-button
        @click-plus="adapter.addSymbol()" 
        @click-minus="adapter.removeSymbol()" 
        :disablePlus="false"
        :disableMinus="false"></add-minus-button>
      </template>
      <template #body-last>
      <add-minus-button
      @click-plus="adapter.addState()"
      @click-minus="adapter.removeState()" 
      :disablePlus="false"
      :disableMinus="false"></add-minus-button>
      </template>
    </table-frame>
  `;

  components = {
    'table-frame': new TableFrame(),
    'add-minus-button': new AddMinusButtons(),
    'state-option-buttons': new StateOptionButtons(),
    'transition-input-group': new TransitionInputGroup()
  };

  props = {
    'adapter': Adapter
  };

}