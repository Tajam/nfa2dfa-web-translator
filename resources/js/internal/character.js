// @ts-check

/// <reference path="automaton.js"/>

/**
 * An object that represents symbol in alphabet.
 * @public
 */
class Character {

  /**
   * The integer that identifies this symbol.
   * @private @field @type {number}
   */
  identifier;

  /**
   * The sign that visually represent this symbol.
   * @private @field @type {string}
   */
  symbol;

  /**
   * Constructor for new Character object.
   * Set identifier value to negative to represent epsilon symbol.
   * @public @constructor
   * @param {number} identifier
   */
  constructor(identifier) {
    this.identifier = identifier;
    if (identifier < 0) {
      this.symbol = "ε";
    }
  }

  /**
   * Make another character with the value
   * and register it into an automaton.
   * @public @method
   * @param {Automaton} automaton
   * @returns {Character}
   */
  cloneInto (automaton) {
    let character = automaton.addSymbol(this.identifier);
    if (this.symbol) character.symbol = this.symbol;
    return character;
  }

  /**
   * Set this alphabet object a symbol.
   * @public @method
   * @param {string} symbol
   * @returns {void}
   */
  setSymbol (symbol) {
    if (this.identifier < 0) return;
    this.symbol = symbol;
  }

  /**
   * Comparative function for this object.
   * @public @method
   * @param {Character | number} other
   * @returns {boolean}
   */
  equals (other) {
    let value = (typeof other === 'number') ? other : other.identifier ;
    if (this.identifier < 0 && value < 0) return true;
    return this.identifier === value;
  }

  /**
   * Return a string that represent this object.
   * @public @method
   * @returns {string}
   */
  stringify () {
    if (this.symbol !== undefined) {
      return this.symbol;
    }
    return this.identifier.toString();
  }

}