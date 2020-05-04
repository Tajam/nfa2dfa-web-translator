// @ts-check

/// <reference path="../../internal/transition.js" />

/**
 * A special component just for transition input
 * @public
 */
class TransitionInputGroup {

  /* template */
  template = `
    <div class="btn-group btn-group-sm">
      <span v-if="transition.isEmpty()" class="btn btn-outline-secondary">
        <span>∅</span>
      </span>
      <button v-else
      v-for="state in transition.listStates()" 
      @click="transition.removeState(state)"
      class="btn btn-outline-primary">
        <span>{{ state.stringify() }}</span>
      </button>
      <button 
      :disabled="transition.unlistedStates().length <= 0" 
      type="button" 
      class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" 
      data-toggle="dropdown"></button>
      <div class="dropdown-menu p-0">
        <button 
        v-for="state in transition.unlistedStates()"
        @click="transition.addState(state)" 
        class="dropdown-item">
          <span>
            {{ state.stringify() }}
          </span>
        </button>
      </div>
    </div>
  `;

  props = {
    'transition': Transition
  }

  data = () => {
    return {
      startLabel: 'Start',
      finalLabel: 'Final'
    }
  }

}