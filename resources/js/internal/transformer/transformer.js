// @ts-check

/// <reference path="../automaton.js" />

/**
 * Interface for transform classes with different algorithms.
 * @abstract
 */
class Transformer {

  /**
   * The name of new transformed automaton
   * @protected @field @type {string}
   */
  name;

  /**
   * Base constructor for all transfomer classes
   * @public @constructor
   * @param {string} name
   */
  constructor (name) {
    this.name = name;
  }

  /**
   * Execute the transform algorithm.
   * @public @method
   * @param {Automaton} automaton
   * @returns {Automaton}
   */
  run (automaton) { throw new Error('not implemented'); }

}