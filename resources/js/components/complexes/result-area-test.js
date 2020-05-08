// @ts-check

/// <reference path="../../adapter.js" />
/// <reference path="../primitives/add-minus-buttons.js" />
/// <reference path="../primitives/test-inputs.js" />
/// <reference path="../primitives/test-result.js" />
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
          <button 
          type="button" 
          class="btn btn-outline-primary btn-sm"
          @click="adapter.testAll()">Test all</button>
          <button 
          type="button" 
          class="btn btn-outline-secondary btn-sm"
          @click="adapter.resetTests()">Clear all</button>
          <hr>
        </div>
      </div>
      <div v-for="test in adapter.listTestData()" class="row">
        <div class="col">
          <test-result v-if="test.hasResult()" :adapter="adapter" :test="test"></test-result>
          <test-inputs v-else :adapter="adapter" :test="test"></test-inputs>
          <hr>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <add-minus-button
          @click-plus="adapter.addTest()" 
          @click-minus="adapter.removeTest()" 
          :disablePlus="false"
          :disableMinus="false"></add-minus-button>
        </div>
      </div>
    </div>
  `;

  components = {
    'add-minus-button': new AddMinusButtons(),
    'test-inputs': new TestInputs(),
    'test-result': new TestResult()
  }

  props = {
    'adapter': Adapter
  }

}