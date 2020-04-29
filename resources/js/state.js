// @ts-check

class State {

  /**
   * @type {string}
   */
  name;

  /**
   * @type {Map<string, Map<string, State>>}
   */
  transitions = new Map();

  /**
   * @type {boolean}
   */
  final = false;

  /**
   * @type {boolean}
   */
  start = false;

  /**
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * @param {string} alphabet
   * @returns {void}
   */
  initTransition = (alphabet) => {
    if (!(this.transitions.has(alphabet))) {
      this.transitions.set(alphabet, new Map());
    }
  }

  /**
   * @param {string} alphabet
   * @param {State} state
   * @returns {void}
   */
  addTransition = (alphabet, state) => {
    if (this.transitions.has(alphabet)) {
      let name = state.name;
      this.transitions.get(alphabet).set(name, state);
    }
  }

  /**
   * Remove a single transition to a state
   * @param {string} alphabet
   * @param {State} state
   * @returns {void}
   */
  removeTransition = (alphabet, state) => {
    if (this.transitions.has(alphabet)) {
      this.transitions.get(alphabet).delete(state.name);
    }
  }

  /**
   * Remove the whole transition of an alphabet
   * @param {string} alphabet
   * @returns {void}
   */
  deleteTransition = (alphabet) => {
    if (this.transitions.has(alphabet)) {
      this.transitions.delete(alphabet);
    }
  }

  /**
   * @param {string} alphabet
   * @returns {IterableIterator<State>}
   */
  getDestinations = (alphabet) => {
    if (this.transitions.has(alphabet)) {
      let destinations = this.transitions.get(alphabet);
      return destinations.values();
    }
  }

}