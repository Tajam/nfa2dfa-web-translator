// @ts-check

/// <reference path="transformer.js" />

/**
 * A converter class that minimize an DFA by using the grouping technique.
 * @public
 */
class GroupingMinimizer extends Transformer {

  /**
   * @typedef {Object} Grouping
   * @property {Map<string, number>} [transition]
   * @property {Array<State>} states
   * @property {State} [groupedState]
   */

  /**
   * @override
   * @public @method
   * @param {Automaton} automaton
   * @returns {Automaton}
   */
  run (automaton) {
    let min = automaton.clone(this.name);
    let states = Array.from(min.listStates());
    let stable = false;
    /** @type {Array<Grouping>} */
    let groups = [
      {states: states.filter(item => item.isFinal())},
      {states: states.filter(item => !item.isFinal())}
    ];
    while(!stable) {
      stable = true;
      /** @type {Array<Grouping>} */
      let newgroups = [];
      for (const group of groups) {
        /** @type {Array<Grouping>} */
        let innergroups = [];
        for (const state of group.states) {
          if (!this.fitIn(state, innergroups ,groups)) {
            stable = false;
          }
        }
        innergroups.forEach(g => {
          newgroups.push(g);
        });
      }
      groups = newgroups;
    }
    let count = 0;
    for (const group of groups) {
      if (group.states.length <= 1) {
        group.groupedState = group.states[0];
      } else {
        let isFinal = group.states.filter(s => s.isFinal()).length > 0;
        let isStart = group.states.filter(s => s.isStart()).length > 0;
        let state = min.addState(new Label(["G", count.toString()]));
        if (isFinal) state.setFinal(true);
        if (isStart) state.setStart();
        group.groupedState = state;
        for (const state of group.states) {
          min.removeState(state);
        }
        count++;
      }
    }
    for (const group of groups) {
      for (const transition of group.groupedState.listTransitions()) {
        transition.clear();
        let index = group.transition.get(transition.stringify());
        transition.addState(groups[index].groupedState);
      } 
    }
    return min;
  }

  /**
   * @private @method
   * @param {State} state
   * @param {Array<Grouping>} groups
   * @return {Map<string, number>}
   */
  makeTransition (state, groups) {
    let tm = new Map();
    for (const transition of state.listTransitions()) {
      let ts = Array.from(transition.listStates())[0];
      for (let i = 0; i < groups.length; i++) {
        for (const gs of groups[i].states) {
          if (ts.equals(gs)) {
            tm.set(transition.stringify(), i);
            break;
          }
        }
      }
    }
    return tm;
  }

  /**
   * @private @method
   * @param {State} state
   * @param {Array<Grouping>} localgroups
   * @param {Array<Grouping>} finalgroups
   * @return {boolean}
   */
  fitIn (state, localgroups, finalgroups) {
    let tm = this.makeTransition(state, finalgroups);
    for (const group of localgroups) {
      let same = true;
      for (const [symbol, number] of tm.entries()) {
        if (group.transition.get(symbol) !== number) {
          same = false;
          break;
        }
      }
      if (same) {
        group.states.push(state);
        return true;
      }
    }
    localgroups.push({states: [state], transition: tm});
    return (localgroups.length === 1);
  }

}