// @ts-check

/// <reference path="state.js" />
/// <reference path="character.js" />
/// <reference path="moment.js" />
/// <reference path="result.js" />
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
   * Clone this automaton with a new name and returns it.
   * @public @method
   * @param {string} name
   * @returns {Automaton} 
   */
  clone (name) {
    let automaton = new Automaton(name);
    for (const state of this.states) {
      state.cloneInto(automaton);
    }
    for (const character of this.alphabet) {
      character.cloneInto(automaton);
    }
    for (const state of this.states) {
      let s = automaton.state(state);
      for (const transition of state.listTransitions()) {
        let t = s.transition(transition);
        for (const destination of transition.listStates()) {
          let d = automaton.state(destination);
          t.addState(d);
        }
      }
    }
    return automaton;
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
   * @param {Label | State} value
   * @returns {void}
   */
  removeState (value) {
    this.state(value, index => {
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
   * @returns {Result}
   */
  test (string) {
    /** @type {Array<Moment>} */
    let moments = [];
    /** @type {Map<string, State>} */
    let stack = new Map();
    let startState = this.states.filter(state => state.isStart())[0];
    for (const closure of startState.eClosure()) {
      stack.set(closure.stringify(), closure);
    }
    moments.push(new Moment(new Character(-1), Array.from(stack.values())));
    string.forEach(character => {
      /** @type {Map<string, State>} */
      let states = new Map();
      for (const state of stack.values()) {
        let t = state.transition(character);
        if (t === undefined) continue;
        for (const s of t.listStates()) {
          states.set(s.stringify(), s);
        }
      }
      /** @type {Map<string, State>} */
      let destinations = new Map();
      for (const state of states.values()) {
        for (const closure of state.eClosure()) {
          destinations.set(closure.stringify(), closure);
        }
      }
      stack = destinations;
      moments.push(new Moment(character, Array.from(destinations.values())));
    });
    return new Result(this.name, moments);
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