// @ts-check

/// <reference path="internal/character.js" />
/// <reference path="internal/result.js" />
/// <reference path="internal/automaton.js" />

/**
 * An object that handle test functions.
 * @public
 */
class TestData {

  /**
   * The test strings.
   * @private @field @type {Array<Character>}
   */
  characters = [];

  /**
   * The results of a test.
   * @private @field @type {Array<Result>}
   */
  results = [];

  /**
   * All of the registered automatons for this test.
   * @private @field @type {Array<Automaton>}
   */
  automatons;

  /**
   * Constructor for new TestData instance.
   * @public @constructor
   * @param {Array<Automaton>} automatons;
   */
  constructor (automatons) {
    this.automatons = automatons;
  }

  /**
   * Add new character to this test.
   * @public @method
   * @param {Character} character
   * @returns {void}
   */
  addCharacter (character) {
    this.characters.push(character);
  }

  /**
   * Remove the last character from the test.
   * @public @method
   * @returns {void}
   */
  popCharacter () {
    let len = this.characters.length;
    if (len > 0) {
      this.characters.splice(len - 1, 1);
    }
  }

  /**
   * Reset this test.
   * @public @method
   * @returns {void}
   */
  reset () {
    this.characters.splice(0, this.characters.length);
    this.results.splice(0, this.results.length);
  }

  /**
   * Perform tests on all automatons.
   * Ignore if any missing.
   * @public @method
   * @returns {void}
   */
  tests () {
    this.results.splice(0, this.results.length);
    for (const automaton of this.automatons) {
      this.results.push(automaton.test(this.characters));
    }
  }

  /**
   * Check if this test already has results.
   * @public @method
   * @returns {boolean}
   */
  hasResult () {
    return (this.results.length > 0);
  }

  /**
   * Check if all the tests on each automatons are acceptable of not.
   * @public @method
   * @returns {boolean}
   */
  acceptable () {
    for (const result of this.results) {
      if (!result.acceptable()) return false;
    }
    return true;
  }

  /**
   * Check if the test string has more than 1 characters.
   * @public @method
   * @returns {boolean}
   */
  hasCharacter () {
    return (this.characters.length > 0);
  }

  /**
   * List out all the characters in this test.
   * @public @method
   * @returns {IterableIterator<Character>}
   */
  listCharacters () {
    return this.characters.values();
  }

  /**
   * Format and list out all the moments in the results.
   * @public @method
   * @param {string} target
   * @returns {Result}
   */
  getResult (target) {
    for (const result of this.results) {
      if (result.getName() === target) return result;
    }
    return undefined;
  }

}