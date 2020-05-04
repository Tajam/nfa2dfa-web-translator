// @ts-check

/// <reference path="automaton.js" />
/// <reference path="character.js" />
/// <reference path="label.js" />
/// <reference path="transition.js" />

/**
 * An object that represents states in automata machine.
 * @public
 */
class State {

  /**
   * The label of this state
   * @private @field @type {Label}
   */
  label;

  /**
   * A reference back to the automaton object
   * @private @field @type {Automaton}
   */
  automaton;

  /**
   * Transition relationship of all states for each alphabet.
   * @private @field @type {Array<Transition>}
   */
  transitions = [];

  /**
   * Whether this state is final or not
   * @private @field @type {boolean}
   */
  final = false;

  /**
   * Whether this state is starting state or not.
   * @private @field @type {boolean}
   */
  start = false;

  /**
   * Constructor for new State instance.
   * @public @constructor
   * @param {Label} label
   * @param {Automaton} automaton
   */
  constructor (label, automaton) {
    this.label = label;
    this.automaton = automaton;
  }

  /**
   * Initiate a new transition with an symbol.
   * @public @method
   * @param {Character} symbol
   * @returns {Transition | undefined}
   */
  initTransition (symbol) {
    if (this.automaton.symbol(symbol) === undefined) return undefined;
    if (this.transition(symbol) !== undefined) return undefined;
    let transition = new Transition(symbol, this.automaton);
    this.transitions.push(transition);
    return transition;
  }

  /**
   * Destroy the transition with the specified symbol.
   * @public @method
   * @param {Character} symbol
   * @returns {void}
   */
  destroyTransition (symbol) {
    this.transition(symbol, index => {
      this.transitions.splice(index, 1);
    });
  }

  /**
   * Get the transition with the specified symbol.
   * Pass in a callback function with a number parameter to retrive the index.
   * @public @method
   * @param {Transition | Character} transition
   * @param {function} [callback]
   * @returns {Transition | undefined}
   */
  transition (transition, callback) {
    for (const [index, item] of this.transitions.entries()) {
      if (item.equals(transition)) {
        if (callback !== undefined) callback(index);
        return item;
      }
    }
    return undefined;
  }

  /**
   * An iterator for all transitions in this state.
   * @public @method
   * @returns {IterableIterator<Transition>}
   */
  listTransitions () {
    return this.transitions.values();
  }

  /**
   * Set this state as start state
   * @public @method
   * @returns {void}
   */
  setStart () {
    for (const state of this.automaton.listStates()) {
      if (state.equals(this)) {
        state.start = true;
        continue;
      }
      state.start = false;
    }
  }

  /**
   * Whether this state is start state or not
   * @public @method
   * @returns {Boolean} 
   */
  isStart () {
    return this.start;
  }

  /**
   * Set this state as final state or not
   * @public @method
   * @param {Boolean} option
   * @returns {void}
   */
  setFinal (option) {
    if (option) {
      this.final = true;
      return;
    }
    if (Array.from(this.automaton.listStates())
    .filter(item => item.isFinal()).length <= 1) {
      return;
    }
    this.final = false;
  }

  /**
   * Whether this state is final state or not
   * @public @method
   * @returns {Boolean} 
   */
  isFinal () {
    return this.final;
  }

  /**
   * Comparative function for this object.
   * @public @method
   * @param {State | Label} other
   * @returns {boolean}
   */
  equals (other) {
    return (other instanceof Label) ?
      (this.label.equals(other)) : (this.label.equals(other.label));
  }

  /**
   * Return a string that represent this object.
   * @public @method
   * @returns {string}
   */
  stringify () {
    return this.label.stringify();
  }

}