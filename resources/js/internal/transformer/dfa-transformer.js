// @ts-check

/// <reference path="transformer.js" />
/// <reference path="../automaton.js" />
/// <reference path="../character.js" />
/// <reference path="../state.js" />

/**
 * A converter class that converts NFA to DFA.
 * @public
 */
class DFATransformer extends Transformer {

  /**
   * @override
   * @public @method
   * @param {Automaton} automaton
   * @returns {Automaton}
   */
  run (automaton) {
    let dfa = automaton.clone(this.name);
    for (const state of dfa.listStates()) {
      for (const transition of state.listTransitions()) {
        let tArray = Array.from(transition.listStates())
        if (tArray.length > 1) {
          let s0 = tArray[0];
          let newState = s0.merge(tArray.splice(1, tArray.length - 1));
          transition.clear();
          transition.addState(newState);
        } else if (tArray.length <= 0) {
          let phiLabel = new Label([]);
          let phiState = dfa.addState(phiLabel);
          if (phiState) {
            for (const phiTrans of phiState.listTransitions()) {
              phiTrans.addState(phiState);
            }
          }
          transition.addState(dfa.state(phiLabel));
        }
      }
    }
    return dfa;
  }

}