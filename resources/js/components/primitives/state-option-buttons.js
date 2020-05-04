// @ts-check

/// <reference path="../../internal/state.js" />

/**
 * Input group for controlling the options for a state.
 */
class StateOptionButtons {

  /* template */
  template = `
    <div class="btn-group btn-group-sm">
      <span class="btn btn-outline-primary">{{ state.stringify() }}</span>
      <button v-if="!state.isStart()" @click="state.setStart()" type="button" class="btn btn-outline-secondary">
        <span>{{ startLabel }}</span>
      </button>
      <span v-else class="btn btn-primary">{{ startLabel }}</span>
      <button v-if="!state.isFinal()" @click="state.setFinal(true)" type="button" class="btn btn-outline-secondary">
        <span>{{ finalLabel }}</span>
      </button>
      <button v-else @click="state.setFinal(false)" type="button" class="btn btn-primary">
        <span>{{ finalLabel }}</span>
      </button>
    </div>
  `;

  props = {
    'state': State
  }

  data = () => {
    return {
      startLabel: 'Start',
      finalLabel: 'Final'
    }
  }

}