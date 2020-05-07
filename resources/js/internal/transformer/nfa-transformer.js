// @ts-check

/// <reference path="transformer.js" />
/// <reference path="../automaton.js" />
/// <reference path="../character.js" />

/**
 * A converter class that converts NFA-ε to NFA.
 * @public
 */
class NFATransformer extends Transformer {

  /**
   * @override
   * @public @method
   * @param {Automaton} automaton
   * @returns {Automaton}
   */
  run (automaton) {
    let startState;
    let nfa = new Automaton(this.name);
    for (const state of automaton.listStates()) {
      state.cloneInto(nfa);
      if (state.isStart()) {
        startState = state;
      }
    }
    for (const closure of startState.eClosure()) {
      if (closure.isFinal()) {
        nfa.state(startState).setFinal(true);
        break;
      }
    }
    for (const symbol of automaton.listSymbols()) {
      if (symbol.equals(new Character(-1))) continue;
      symbol.cloneInto(nfa);
    }
    for (const state of automaton.listStates()) {
      let targetState = nfa.state(state);
      for (const symbol of nfa.listSymbols()) {
        /** @type {Map<string, State>} */
        let transitions = new Map();
        for (const closure of state.eClosure()) {
          let transition = closure.transition(symbol);
          if (transition === undefined) continue;
          for (const s of transition.listStates()) {
            transitions.set(s.stringify(), s);
          }
        }
        let targetTransition = targetState.transition(symbol);
        for (const state of transitions.values()) {
          for (const closure of state.eClosure()) {
            targetTransition.addState(nfa.state(closure));
          }
        }
      }
    }
    return nfa;
  }

}