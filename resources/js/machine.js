// @ts-check

/// <reference path="state.js" />

class Machine {

  /**
   * @type {Map<string, State>}
   */
  states = new Map();

  /**
   * @type {Array<string>}
   */
  alphabets = [];

  /**
   * @param {string} initState
   * @param {string} initAlphabet
   */
  constructor(initState, initAlphabet) {
    let state = this.addState(initState);
    this.addAlphabet(initAlphabet);
    state.final = true;
    state.start = true;
  }

  /**
   * @param {string} name
   * @returns {State}
   */
  addState = (name) => {
    if (!(this.states.has(name))) {
      let state = new State(name);
      for (const alphabet of this.alphabets) {
        state.initTransition(alphabet);
      }
      this.states.set(name, state);
      return state;
    }
  }

  /**
   * @param {string} name
   * @returns {void}
   */
  removeState = (name) => {
    if (this.states.has(name)) {
      let state = this.states.get(name);
      if (state.start) return;
      let states = Array.from(this.states.values());
      if (state.final && states.filter(value => value.final).length <= 1) return;
      for (const value of states) {
        for (const alphabet of this.alphabets) {
          value.removeTransition(alphabet, this.states.get(name));
        }
      }
      this.states.delete(name);
    }
  }

  /**
   * @param {string} alphabet
   * @returns {void}
   */
  addAlphabet = (alphabet) => {
    if (!(this.alphabets.includes(alphabet))) {
      this.alphabets.push(alphabet);
      for (const [_, value] of this.states.entries()) {
        value.initTransition(alphabet);
      }
    }
  }

  /**
   * @param {string} alphabet
   * @returns {void}
   */
  removeAlphabet = (alphabet) => {
    if (this.alphabets.includes(alphabet)) {
      let index = this.alphabets.indexOf(alphabet);
      if (index > -1) this.alphabets.splice(index, 1);
      for (const [_, value] of this.states.entries()) {
        value.deleteTransition(alphabet);
      }
    }
  }

  /**
   * @param {string} name
   */
  setStartState = (name) => {
    for (const state of this.states.values()) {
      if (state.name == name) {
        state.start = true;
        continue;
      }
      state.start = false;
    }
  }

  /**
   * @param {string} name
   */
  addFinalState = (name) => {
    if (this.states.has(name)) {
      this.states.get(name).final = true;
    }
  }

  /**
   * @param {string} name
   */
  removeFinalState = (name) => {
    let count = Array.from(this.states.values()).filter(value => value.final).length;
    if (count <= 1) return;
    if (this.states.has(name)) { 
      this.states.get(name).final = false;
    }
  }

  /**
   * @param {string} alphabet
   * @param {string} name
   * @returns {Array<State>}
   */
  getAvailableState = (alphabet, name) => {
    let allStates = Array.from(this.states.values());
    let states = Array.from(this.states.get(name).transitions.get(alphabet).values());
    return allStates.filter(s => (!states.includes(s)));
  }

}