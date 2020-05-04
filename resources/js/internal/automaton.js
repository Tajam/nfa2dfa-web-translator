// @ts-check

/// <reference path="state.js" />
/// <reference path="character.js" />
/// <reference path="transformer/transformer.js" />

/**
 * An object that represents an automaton.
 * @public
 */
class Automaton {

  /**
   * The identifier name for this automaton
   * @private @field @type {string}
   */
  name;

  /**
   * All of the states in this automaton.
   * @private @field @type {Array<State>}
   */
  states = [];

  /**
   * All of the available alphabet in this automaton.
   * @private @field @type {Array<Character>}
   */
  alphabet =  [];

  /**
   * Constructor for this automaton object
   * @public @constructor
   * @param {string} name
   */
  constructor (name) {
    this.name = name;
  }

  /**
   * Add new unique state into this automaton.
   * @public @method
   * @param {Label} label
   * @returns {State | undefined}
   */
  addState (label) {
    if (this.state(label) !== undefined) return undefined;
    let state = new State(label, this);
    this.states.push(state);
    for (const symbol of this.alphabet) {
      state.initTransition(symbol);
    }
    return state;
  }

  /**
   * Remove an unique state from this automaton.
   * @public @method
   * @param {Label} label
   * @returns {void}
   */
  removeState (label) {
    this.state(label, index => {
      if (this.states[index].isStart()) return;
      if (this.states[index].isFinal()) {
        if (this.states.filter(item => item.isFinal()).length <= 1) return;
      }
      let rState = this.states.splice(index, 1)[0];
      for (const state of this.states) {
        for (const transition of state.listTransitions()) {
          transition.removeState(rState);
        }
      }
    });
  }

  /**
   * Get the state with the specified label.
   * Pass in a callback function with a number parameter to retrive the index.
   * @public @method
   * @param {State | Label} state
   * @param {function} [callback]
   * @returns {State | undefined}
   */
  state (state, callback) {
    for (const [index, item] of this.states.entries()) {
      if (item.equals(state)) {
        if (callback !== undefined) callback(index);
        return item;
      }
    }
    return undefined;
  }

  /**
   * An iterator for all states in this automaton.
   * @public @method
   * @returns {IterableIterator<State>}
   */
  listStates () {
    return this.states.values();
  }

  /**
   * Add new unique symbol into the alphabet set of this automaton.
   * @public @method
   * @param {number} number
   * @returns {Character | undefined}
   */
  addSymbol (number) {
    if (this.symbol(number) !== undefined) return undefined;
    let character = new Character(number);
    this.alphabet.push(character);
    for (const state of this.states) {
      state.initTransition(character);
    }
    return character;
  }

  /**
   * Remove an unique symbol from the alphabet set of this automaton.
   * @public @method
   * @param {number} number
   * @returns {void}
   */
  removeSymbol (number) {
    this.symbol(number, index => {
      let rSymbol = this.alphabet.splice(index, 1)[0];
      for (const state of this.states) {
        state.destroyTransition(rSymbol);
      }
    });
  }

  /**
   * Get the alphabet with the specified identifier value (integer).
   * Pass in a callback function with a number parameter to retrive the index.
   * @public @method
   * @param {Character | number} character
   * @param {function} [callback]
   * @returns {Character | undefined}
   */
  symbol (character, callback) {
    for (const [index, item] of this.alphabet.entries()) {
      if (item.equals(character)) {
        if (callback !== undefined) callback(index);
        return item;
      }
    }
    return undefined;
  }

  /**
   * An iterator for all symbols in the alphabet set of this automaton.
   * @public @method
   * @returns {IterableIterator<Character>}
   */
  listSymbols () {
    return this.alphabet.values();
  }

  /**
   * Transform this automaton into different form using a transformer.
   * @public @method
   * @param {Transformer} transformer
   * @returns {Automaton}
   */
  transform (transformer) {
    return transformer.run(this);
  }

  /**
   * Test the input string using this automaton.
   * @public @method
   * @param {Array<Character>} string
   * @returns {boolean}
   */
  test (string) {
    throw new Error('not implemented');
  }

  /**
   * Comparative function for this object.
   * @public @method
   * @param {Automaton | string} other
   * @returns {boolean}
   */
  equals (other) {
    let value = (other instanceof Automaton) ? other.name : other;
    return (this.name === value);
  }

}