// @ts-check

/// <reference path="../../adapter.js" />
/// <reference path="../primitives/add-minus-buttons.js" />
/// <reference path="../primitives/test-inputs.js" />
/// <reference path="../../internal/character.js" />
/// <reference path="../../internal/result.js" />

/**
 * An area where user get to input their test string
 * and see the results.
 * @public
 */
class ResultAreaTest {

  /* template */
  template = `
    <div>
      <div class="row">
        <div class="col">
          <button type="button" class="btn btn-outline-primary btn-sm">Test all</button>
          <button type="button" class="btn btn-outline-secondary btn-sm">Clear all</button>
          <hr>
        </div>
      </div>
      <div v-for="test in tests" class="row">
        <div class="col">
          <test-inputs :adapter="adapter" @test-click="runTest"></test-inputs>
          <hr>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <add-minus-button
          @click-plus="addTest(tests)" 
          @click-minus="removeTest(tests)" 
          :disablePlus="false"
          :disableMinus="false"></add-minus-button>
        </div>
      </div>
    </div>
  `;

  components = {
    'add-minus-button': new AddMinusButtons(),
    'test-inputs': new TestInputs()
  }

  props = {
    'adapter': Adapter
  }

  methods = {
    /** @param {Array<Character>} characters */
    runTest: (characters) => {
      for (const character of characters) {
        console.log(character.stringify());
      }
    },
    /** @param {Array<Array>} tests */
    addTest: (tests) => {
      tests.push([]);
    },
    /** @param {Array<Array>} tests */
    removeTest: (tests) => {
      let len = tests.length;
      if (len > 1) {
        tests.splice(len - 1, 1);
      }
    }
  }

  data = () => {
    return {
      tests: [[]]
    }
  }

}