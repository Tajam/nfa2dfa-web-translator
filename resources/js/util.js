// @ts-check

/// <reference path="machine.js" />

/**
 * @param {number} number
 */
let numberToAlphabet = (number) => {
  let s = '';
  while(true) {
    let t = number % 26;
    if (number < 26) {
      return String.fromCharCode(97 + t) + s;
    }
    number = ((number / 26) | 0) - 1;
    s = String.fromCharCode(97 + t) + s;
  }
}

/**
 * Convert an NFA-epsilon machine to NFA
 * @param {Machine} machine
 */
let nfaeToNfa = (machine) => {

}

/**
 * Convert an NFA machine to DFA
 * @param {Machine} machine
 */
let nfaToDfa = (machine) => {

}

/**
 * Minimize an DFA machine
 * @param {Machine} machine
 */
let dfaMinimizer = (machine) => {

}