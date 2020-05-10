// @ts-check

/// <reference path="character.js" />
/// <reference path="state.js" />
/// <reference path="automaton.js" />

/**
 * An object that represent a transition for an alphabet object.
 * @public
 */
class Transition {

  /**
   * The alphabet for this transition.
   * @private @field @type {Character}
   */
  symbol;

  /**
   * A reference back to the automaton object
   * @private @field @type {Automaton}
   */
  automaton;

  /**
   * The destinations of this transition.
   * @private @field @type {Array<State>}
   */
  destinations = [];

  /**
   * Constructor for new Transition instance.
   * @public @constructor
   * @param {Character} alphabet
   * @param {Automaton} automaton
   */
  constructor (alphabet, automaton) {
    this.symbol = alphabet;
    this.automaton = automaton;
  }

  /**
   * Add a destination to this transition.
   * @public @method
   * @param {State} state
   * @returns {void}
   */
  addState (state) {
    if (this.automaton.state(state) === undefined) return;
    if (this.state(state) !== undefined) return;
    this.destinations.push(state);
  }

  /**
   * Remove a destination from this transition.
   * @public @method
   * @param {State} state
   * @returns {void}
   */
  removeState (state) {
    this.state(state, index => {
      this.destinations.splice(index, 1);
    });
  }

  /**
   * Clear off all the states from this transition.
   * @public @method
   * @returns {void}
   */
  clear () {
    this.destinations.splice(0, this.destinations.length);
  }

  /**
   * Get the state with the specified label.
   * Pass in a callback function with a number parameter to retrive the index.
   * @public @method
   * @param {State} state
   * @param {function} [callback]
   * @returns {State | undefined}
   */
  state (state, callback) {
    for (const [index, item] of this.destinations.entries()) {
      if (item.equals(state)) {
        if (callback !== undefined) callback(index);
        return item;
      }
    }
    return undefined;
  }

  /**
   * An iterator for all destinations in this transition.
   * @public @method
   * @returns {IterableIterator<State>}
   */
  listStates () {
    return this.destinations.values();
  }

  /**
   * An iterator for all destinations that not yet added.
   * @public @method
   * @returns {Array<State>}
   */
  unlistedStates() {
    let states = [];
    for (const state of this.automaton.listStates()) {
      let skip = false;
      for (const addedState of this.destinations) {
        if (state.equals(addedState)) {
          skip = true; 
          break;
        }
      }
      if (skip) continue;
      states.push(state);
    }
    return states;
  }

  /**
   * Check whether the transition is empty.
   * @public @method
   * @returns {boolean}
   */
  isEmpty () {
    return (this.destinations.length === 0);
  }

  /**
   * Comparative function for this object.
   * @public @method
   * @param {Transition | Character} other
   * @returns {boolean}
   */
  equals (other) {
    return (other instanceof Character) ?
      (this.symbol.equals(other)) : (this.symbol.equals(other.symbol)); 
  }

}