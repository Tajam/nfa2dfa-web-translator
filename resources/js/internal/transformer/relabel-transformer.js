// @ts-check

/// <reference path="transformer.js" />
/// <reference path="../automaton.js" />
/// <reference path="../label.js" />

/**
 * A transformer class that relabel all the states in an automaton.
 * @public
 */
class RelabelTransformer extends Transformer {

  /**
   * Number of generated label
   * @private @field @type {number}
   */
  labelCount = 0;

  /**
   * @override
   * @public @method
   * @param {Automaton} automaton
   * @returns {Automaton}
   */
  run (automaton) {
    let rl = automaton.clone(this.name);
    for (const state of rl.listStates()) {
      state.relabel(this.nextLabel());
    }
    return rl;
  }

  /**
   * Label generation algorithm.
   * @private @method
   * @returns {Label}
   */
  nextLabel () {
    let number = this.labelCount;
    let label = '';
    while(true) {
      let value = number % 26;
      if (number < 26) {
        this.labelCount++;
        return new Label([String.fromCharCode(65 + value) + label]);
      }
      number = ((number / 26) | 0) - 1;
      label = String.fromCharCode(65 + value) + label;
    }
  }

}