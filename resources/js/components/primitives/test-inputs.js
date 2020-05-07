
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
        <span v-if="characters.length <= 0" class="btn btn-outline-secondary mb-1">
          {{ epsilon }}
        </span>
        <span v-for="character in characters" class="btn btn-outline-secondary mb-1">
          {{ character.stringify() }}
        </span>
      </div>
      <div class="btn-group btn-group-sm">
        <button @click="remove(characters)" type="button" class="btn btn-outline-danger">
          <span>Delete</span>
        </button>
        <button @click="clear(characters)" type="button" class="btn btn-outline-secondary">
          <span>Clear</span>
        </button>
        <button @click="$emit('test-click', characters)" type="button" class="btn btn-outline-primary">
          <span>Test</span>
        </button>
      </div>
      <div class="d-block btn-group btn-group-sm mt-1">
        <button 
        @click="add(symbol, characters)"
        v-for="symbol in adapter.listSymbols()" 
        type="button" class="btn btn-outline-primary">
          <span>{{ symbol.stringify() }}</span>
        </button>
      </div>
    </div>
  `;

  props = {
    'adapter': Adapter
  }

  methods = {
    /** 
     * @param {Character} character 
     * @param {Array<Character>} characters
     */
    add: (character, characters) => {
      characters.push(character);
    },
    /** @param {Array<Character>} characters */
    remove: (characters) => {
      let len = characters.length;
      if (len > 0) {
        characters.splice(len - 1, 1);
      }
    },
    /** @param {Array<Character>} characters */
    clear: (characters) => {
      characters.splice(0, characters.length);
    }
  }

  data = () => {
    return {
      characters: [],
      epsilon: new Character(-1).stringify()
    }
  }

}