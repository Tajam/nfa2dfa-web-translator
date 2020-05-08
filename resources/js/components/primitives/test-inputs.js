
// @ts-check

/// <reference path="../../adapter.js" />
/// <reference path="../../internal/character.js" />

/**
 * An input group for testing area.
 * @public
 */
class TestInputs {

  /* template */
  template = `
    <div>
      <div class="d-block btn-group btn-group-sm">
        <span v-if="!test.hasCharacter()" class="btn btn-outline-secondary mb-1">
          {{ epsilon }}
        </span>
        <span v-for="character in test.listCharacters()" class="btn btn-outline-secondary mb-1">
          {{ character.stringify() }}
        </span>
      </div>
      <div class="btn-group btn-group-sm">
        <button @click="test.popCharacter()" type="button" class="btn btn-outline-danger">
          <span>Delete</span>
        </button>
        <button @click="test.reset()" type="button" class="btn btn-outline-secondary">
          <span>Clear</span>
        </button>
        <button @click="test.tests()" type="button" class="btn btn-outline-primary">
          <span>Test</span>
        </button>
      </div>
      <div class="d-block btn-group btn-group-sm mt-1">
        <button 
        @click="test.addCharacter(symbol)"
        v-for="symbol in adapter.listSymbols(adapter.AutomatonType.NFA)" 
        type="button" class="btn btn-outline-primary">
          <span>{{ symbol.stringify() }}</span>
        </button>
      </div>
    </div>
  `;

  props = {
    'adapter': Adapter,
    'test': Object
  }

  data = () => {
    return {
      epsilon: new Character(-1).stringify()
    }
  }

}