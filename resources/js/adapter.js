// @ts-check

/// <reference path="test-data.js" />
/// <reference path="internal/automaton.js" />
/// <reference path="internal/transition.js" />
/// <reference path="internal/state.js" />
/// <reference path="internal/character.js" />
/// <reference path="internal/label.js" />
/// <reference path="internal/result.js" />
/// <reference path="internal/transformer/dfa-transformer.js" />
/// <reference path="internal/transformer/minimizer.js" />
/// <reference path="internal/transformer/nfa-transformer.js" />
/// <reference path="internal/transformer/relabel-transformer.js" />
/// <reference path="internal/transformer/transformer.js" />

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
    DFAr: "DFA re-label",
    DFAm1: "DFA-min-1",
    DFAm2: "DFA-min-2"
  }

  /**
  * Testing data
  * @private @field @type {Array<TestData>}
  */
  testData = [];

  /**
   * A flag to indicate if automaton is converted or not.
   * @private @field @type {boolean}
   */
  converted = false;

  /**
   * The automaton that this object adapting
   * @private @field @type {Array<Automaton>}
   */
  automatons = [];

  /**
   * Constructor for this adapter
   * @public @constructor
   */
  constructor () {
    let automaton = new Automaton(this.AutomatonType.Input);
    automaton.addSymbol(-1);
    automaton.addSymbol(0);
    automaton.addSymbol(1);
    let state = automaton.addState(new Label(0));
    state.setStart();
    state.setFinal(true);
    automaton.addState(new Label(1));
    automaton.addState(new Label(2));
    this.automatons.push(automaton);
  }

  /**
   * Get specified automaton from this adapter
   * @private @method
   * @param {AutomatonType} type
   * @param {function} [callback]
   * @returns {Automaton}
   */
  automaton (type, callback) {
    for (const [index, item] of this.automatons.entries()) {
      if (item.equals(type)) {
        if (callback) callback(index);
        return item;
      }
    }
    return undefined;
  }

  /**
   * List all states from the automaton
   * @public @method
   * @param {AutomatonType} target
   * @returns {IterableIterator<State>}
   */
  listStates (target) {
    if (target === undefined) target = this.AutomatonType.Input;
    let automaton = this.automaton(target);
    if (automaton) return this.automaton(target).listStates();
    return undefined;
  }

  /**
   * List all symbols from the alphabet set of this automaton
   * @public @method
   * @param {AutomatonType} target
   * @returns {IterableIterator<Character>}
   */
  listSymbols (target) {
    if (target === undefined) target = this.AutomatonType.Input;
    let automaton = this.automaton(target);
    if (automaton) return this.automaton(target).listSymbols();
    return undefined;
  }

  /**
   * Add new state to the automaton
   * @public @method
   * @returns {void}
   */
  addState () {
    let automaton = this.automaton(this.AutomatonType.Input);
    let count = Array.from(automaton.listStates()).length;
    automaton.addState(new Label(count));
  }

  /**
   * Remove state from the automaton
   * @public @method
   * @returns {void}
   */
  removeState () {
    let automaton = this.automaton(this.AutomatonType.Input);
    let count = Array.from(automaton.listStates()).length - 1;
    automaton.removeState(new Label(count));
  }

  /**
   * Add new symbol to the alphabet set of the automaton
   * @public @method
   * @returns {void}
   */
  addSymbol () {
    let automaton = this.automaton(this.AutomatonType.Input);
    let count = Array.from(automaton.listSymbols()).length - 1;
    automaton.addSymbol(count);
  }

  /**
   * Remove symbol from the alphabet set of the automaton
   * @public @method
   * @returns {void}
   */
  removeSymbol () {
    let automaton = this.automaton(this.AutomatonType.Input);
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
    this.converted = true;
    this.resetTests();
    let inputAutomaton = this.automaton(this.AutomatonType.Input);
    this.automatons.splice(1, this.automatons.length - 1);
    let nfaeAutomaton = inputAutomaton.clone(this.AutomatonType.NFAe);
    this.automatons.push(nfaeAutomaton);
    let nfaAutomaton = nfaeAutomaton.transform(new NFATransformer(this.AutomatonType.NFA));
    this.automatons.push(nfaAutomaton);
    let dfaAutomaton = nfaAutomaton.transform(new DFATransformer(this.AutomatonType.DFA));
    this.automatons.push(dfaAutomaton);
    let reAutomaton = dfaAutomaton.transform(new RelabelTransformer(this.AutomatonType.DFAr));
    this.automatons.push(reAutomaton);
  }

  /**
   * Check if the automaton is converted or not.
   * @returns {boolean} 
   */
  isConverted () {
    return this.converted;
  }

  /**
   * Execute all the tests.
   * @public @method
   * @returns {void}
   */
  testAll () {
    for (const test of this.testData) {
      test.tests();
    }
  }

  /**
   * Add a new test.
   * @public @method
   * @returns {void}
   */
  addTest () {
    let testAutomatons = [];
    for (const automaton of this.automatons) {
      for (const name of this.listTestCandidates()) {
        if (automaton.equals(name)) testAutomatons.push(automaton);
      }
    }
    this.testData.push(new TestData(testAutomatons));
  }

  /**
   * Remove a test.
   * @public @method
   * @returns {void}
   */
  removeTest () {
    let len = this.testData.length;
    if (len > 1) {
      this.testData.splice(len - 1, 1);
    }
  }

  /**
   * Reset the test data. Leaving only a blank test.
   * @public @method
   * @returns {void}
   */
  resetTests () {
    this.testData.splice(0, this.testData.length);
    this.testData.push(new TestData(this.automatons));
  }

  /**
   * List out all the added tests.
   * @public @method
   * @returns {IterableIterator<TestData>}
   */
  listTestData () {
    return this.testData.values();
  }

  /**
   * List out all testing automatons name.
   * @public @method
   * @returns {Object}
   */
  listTestCandidates () {
    return {
      "NFA-ε": this.AutomatonType.NFAe,
      "NFA": this.AutomatonType.NFA,
      "DFA": this.AutomatonType.DFAr
    };
  }

}