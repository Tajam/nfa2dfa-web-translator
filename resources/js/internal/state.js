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
   * @param {Label} value
   * @param {Automaton} automaton
   */
  constructor (value, automaton) {
    this.label = value;
    this.automaton = automaton;
  }

  /**
   * Make another state with the same label
   * and register it into an automaton.
   * @public @method
   * @param {Automaton} automaton
   * @returns {State}
   */
  cloneInto (automaton) {
    let state = automaton.addState(this.label.clone());
    if (this.start) state.setStart();
    if (this.final) state.setFinal(true);
    return state;
  }

  /**
   * Merge 
   * @public @method
   * @param {Array<State>} states
   * @returns {State}
   */
  merge (states) {
    let label = new Label([]);
    states.push(this);
    for (const state of states) {
      label = label.merge(state.label);
    }
    let newState = this.automaton.addState(label);
    if (newState !== undefined) {
      for (const state of states) {
        if (state.isFinal()) newState.setFinal(true);
        for (const transition of state.listTransitions()) {
          let newTransition = newState.transition(transition);
          for (const s of transition.listStates()) {
            newTransition.addState(s);
          }
        }
      }
    } else {
      newState = this.automaton.state(label);
    }
    return newState;
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
   * List out the e-closure states
   * @public @method
   * @returns {Array<State>}
   */
  eClosure () {
    /** @type {Map<string, State>} */
    let states = new Map();
    /** @type {Map<string, State>} */
    let stack = new Map();
    stack.set(this.stringify(), this);
    while(stack.size > 0) {
      /** @type {Map<string, State>} */
      let newStack = new Map();
      for (const state of stack.values()) {
        states.set(state.stringify(), state);
        let transition = state.transition(new Character(-1));
        if (transition === undefined) continue;
        for (const newState of transition.listStates()) {
          let key = newState.stringify();
          if (states.has(key)) continue;
          newStack.set(newState.stringify(), newState);
        }
      }
      stack = newStack;
    }
    return Array.from(states.values());
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
   * Relabing this state. Fail silently if label already been used.
   * @public @method
   * @param {Label} label
   * @returns {void}
   */
  relabel (label) {
    if (this.automaton.state(label) === undefined) {
      this.label = label;
    }
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