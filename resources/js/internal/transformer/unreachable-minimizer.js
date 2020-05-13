// @ts-check

/// <reference path="transformer.js" />

/**
 * A converter class that minimize an DFA by removing the unreachable states.
 * @public
 */
class UnreachableMinimizer extends Transformer {

  /**
   * @override
   * @public @method
   * @param {Automaton} automaton
   * @returns {Automaton}
   */
  run (automaton) {
    let min = automaton.clone(this.name);
    /** @type {Map<string, State>} */
    let reachable = new Map();
    /** @type {Map<string, State>} */
    let stack = new Map();
    let startState = Array.from(min.listStates()).filter(item => item.isStart())[0];
    reachable.set(startState.stringify(), startState);
    stack.set(startState.stringify(), startState);
    while(stack.size > 0) {
      /** @type {Map<string, State>} */
      let newStack = new Map();
      for (const state of stack.values()) {
        for (const symbol of min.listSymbols()) {
          let transition = state.transition(symbol);
          for (const s of transition.listStates()) {
            if (reachable.has(s.stringify())) continue;
            reachable.set(s.stringify(), s);
            newStack.set(s.stringify(), s);
          }
        }
      }
      stack = newStack;
    }
    let unreachable = [];
    for (const state of min.listStates()) {
      if (!reachable.has(state.stringify())) {
        unreachable.push(state);
      }
    }
    for (const state of unreachable) {
      min.removeState(state);
    }
    return min;
  }
}