// @ts-check

/// <reference path="../internal/automaton.js" />
/// <reference path="../internal/transition.js" />
/// <reference path="../internal/state.js" />
/// <reference path="../internal/character.js" />
/// <reference path="../internal/label.js" />
/// <reference path="input-adapter.js" />
/// <reference path="test-adapter.js" />
/// <reference path="transform-adapter.js" />

/**
 * An object that act as a connection bridge between the models and view.
 * Built specifically for this application.
 * Providing specific configuration and functions.
 * @public
 */
class Adapter {
  
  /**
   * The automaton that this object adapting
   * @private @field @type {Automaton}
   */
  automaton;

  /**
   * Input adapter
   * @private @field @type {InputAdapter}
   */
  inputAdapter;

  /**
   * Constructor for this adapter
   * @public @constructor
   */
  constructor () {
    this.automaton = new Automaton("NFAe");
    this.automaton.addSymbol(-1);
    let state = this.automaton.addState(new Label(0));
    state.setStart();
    state.setFinal(true);
    // Register the other adapters
    this.inputAdapter = new InputAdapter(this.automaton);
  }
  
  /**
   * Get the input adapter
   * @public @method
   * @returns {InputAdapter}
   */
  input () {
    return this.inputAdapter;
  }

  /**
   * List all states from the automaton
   * @public @method
   * @returns {IterableIterator<State>}
   */
  listStates () {
    return this.automaton.listStates();
  }

  /**
   * List all symbols from the alphabet set of this automaton
   * @public @method
   * @returns {IterableIterator<Character>}
   */
  listSymbols () {
    return this.automaton.listSymbols();
  }

}