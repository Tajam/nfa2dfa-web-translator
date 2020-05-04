// @ts-check

/// <reference path="../automaton.js" />

/**
 * Interface for transform classes with different algorithms.
 * @interface
 */
class Transformer {

  /**
   * Execute the transform algorithm.
   * @public @method
   * @param {Automaton} automaton
   * @returns {Automaton}
   */
  run (automaton) { throw new Error('not implemented'); }

}