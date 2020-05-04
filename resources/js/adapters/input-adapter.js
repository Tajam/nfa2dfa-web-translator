// @ts-check

/// <reference path="../internal/automaton.js" />
/// <reference path="../internal/label.js" />
/// <reference path="../internal/character.js" />

/**
 * An adapter specifically for adapting input functions
 * @public
 */
class InputAdapter {
  
  /**
   * The referenced automaton
   * @private @field @type {Automaton}
   */
  automaton;

  /**
   * Constructor for this adapter
   * @public @constructor
   * @param {Automaton} automaton
   */
  constructor (automaton) {
    this.automaton = automaton;
  }

  /**
   * Add new state to the automaton
   * @public @method
   * @returns {void}
   */
  addState () {
    let count = Array.from(this.automaton.listStates()).length;
    this.automaton.addState(new Label(count));
  }

  /**
   * Remove state from the automaton
   * @public @method
   * @returns {void}
   */
  removeState () {
    let count = Array.from(this.automaton.listStates()).length - 1;
    this.automaton.removeState(new Label(count));
  }

  /**
   * Add new symbol to the alphabet set of the automaton
   * @public @method
   * @returns {void}
   */
  addSymbol () {
    let count = Array.from(this.automaton.listSymbols()).length - 1;
    this.automaton.addSymbol(count);
  }

  /**
   * Remove symbol from the alphabet set of the automaton
   * @public @method
   * @returns {void}
   */
  removeSymbol () {
    let count = Array.from(this.automaton.listSymbols()).length;
    if (count <= 1) return;
    this.automaton.removeSymbol(count - 2);
  }

}