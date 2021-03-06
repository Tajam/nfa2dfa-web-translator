// @ts-check

/**
 * An indentifier object for state objects.
 * @public
 */
class Label {

  /**
   * A set of string values to represent this label.
   * @private @field @type {Set<String>}
   */
  values;

  /**
   * Constructor for new Label instance.
   * @public @constructor
   * @param {Array<String> | number} value
   */
  constructor (value) {
    if (typeof value == 'number') {
      this.values = new Set([this.translate(value)]);
    } else {
      this.values = new Set(value);
    }
  }

  /**
   * Clone a new Label and returns it.
   * @public @method
   * @returns {Label}
   */
  clone () {
    let label = new Label(Array.from(this.values));
    return label;
  }

  /**
   * Merge with another label and generate a new one.
   * @public @method
   * @param {Label} other 
   * @returns {Label}
   */
  merge (other) {
    let newValue = Array.from(this.values);
    for (const value of other.values) {
      newValue.push(value);
    }
    return new Label(newValue);
  }

  /**
   * Comparative function for this object.
   * @public @method
   * @param {Label | Set} other
   * @returns {boolean}
   */
  equals (other) {
    let sets = (other instanceof Set) ? other : other.values;
    if (this.values.size !== sets.size) {
      return false;
    }
    for (const value of this.values) {
      if (!sets.has(value)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Return a string that represent this object.
   * @public @method
   * @returns {string}
   */
  stringify () {
    let array = Array.from(this.values);
    if (array.length <= 0) return "∅";
    if (array.length === 1) return array[0];
    let text = array.join("");
    return `${text}`;
  }

  /**
   * Utility method that translate number to 26-base letter label.
   * @private @method
   * @param {number} number
   * @returns {string}
   */
  translate (number) {
    let label = '';
    while(true) {
      let value = number % 26;
      if (number < 26) {
        return String.fromCharCode(97 + value) + label;
      }
      number = ((number / 26) | 0) - 1;
      label = String.fromCharCode(97 + value) + label;
    }
  }

}