// @ts-check

/// <reference path="internal/automaton.js" />
/// <reference path="internal/transition.js" />
/// <reference path="internal/state.js" />
/// <reference path="internal/character.js" />
/// <reference path="internal/label.js" />
/// <reference path="internal/result.js" />

/**
 * An object that act as a connection bridge between the models and view.
 * Built specifically for this application.
 * Providing specific configuration and functions.
 * @public
 */
class Adapter {
  
  /**
   * @readonly
   * @public @enum {String}
   */
  AutomatonType = {
    Input: "NFA-ε input",
    NFAe: "NFA-ε",
    NFA: "NFA",
    DFA: "DFA",
    DFAm: "DFA-min"
  }

  /**
   * The automaton that this object adapting
   * @private @field @type {Map<string, Automaton>}
   */
  automatons;

  /**
   * Constructor for this adapter
   * @public @constructor
   */
  constructor () {
    this.target = this.AutomatonType.Input;
    let automaton = new Automaton("NFAe");
    automaton.addSymbol(-1);
    let state = automaton.addState(new Label(0));
    state.setStart();
    state.setFinal(true);
    this.automatons.set(this.AutomatonType.Input, automaton);
  }

  /**
   * List all states from the automaton
   * @public @method
   * @param {AutomatonType} target
   * @returns {IterableIterator<State>}
   */
  listStates (target) {
    if (target === undefined) target = this.AutomatonType.Input;
    return this.automatons.get(target).listStates();
  }

  /**
   * List all symbols from the alphabet set of this automaton
   * @public @method
   * @param {AutomatonType} target
   * @returns {IterableIterator<Character>}
   */
  listSymbols (target) {
    if (target === undefined) target = this.AutomatonType.Input;
    return this.automatons.get(target).listSymbols();
  }

  /**
   * Add new state to the automaton
   * @public @method
   * @returns {void}
   */
  addState () {
    let automaton = this.automatons.get(this.AutomatonType.Input);
    let count = Array.from(automaton.listStates()).length;
    automaton.addState(new Label(count));
  }

  /**
   * Remove state from the automaton
   * @public @method
   * @returns {void}
   */
  removeState () {
    let automaton = this.automatons.get(this.AutomatonType.Input);
    let count = Array.from(automaton.listStates()).length - 1;
    automaton.removeState(new Label(count));
  }

  /**
   * Add new symbol to the alphabet set of the automaton
   * @public @method
   * @returns {void}
   */
  addSymbol () {
    let automaton = this.automatons.get(this.AutomatonType.Input);
    let count = Array.from(automaton.listSymbols()).length - 1;
    automaton.addSymbol(count);
  }

  /**
   * Remove symbol from the alphabet set of the automaton
   * @public @method
   * @returns {void}
   */
  removeSymbol () {
    let automaton = this.automatons.get(this.AutomatonType.Input);
    let count = Array.from(automaton.listSymbols()).length;
    if (count <= 1) return;
    automaton.removeSymbol(count - 2);
  }

  /**
   * Perform all conversions.
   * NFA-ε to NFA. NFA to DFA with re-labelling.
   * Minimization of DFA.
   * @public @method
   * @returns {void}
   */
  convert () {
    throw new Error("Not implemented.");
  }

  /**
   * Perform tests on all automatons.
   * Ignore if any missing.
   * @public @method
   * @param {Array<Character>} string
   * @returns {Map<AutomatonType, Result>}
   */
  tests (string) {
    throw new Error("Not implemented.");
  }

}