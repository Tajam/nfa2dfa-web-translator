
// @ts-check

/// <reference path="../../adapter.js" />
/// <reference path="../../internal/state.js" />
/// <reference path="../../internal/moment.js" />
/// <reference path="../../internal/character.js" />

/**
 * A component for displaying test result.
 * @public
 */
class TestResult {

  /* template */
  template = `
    <div>
      <div>
        <span v-if="test.acceptable()" class="badge badge-success mb-1">Pass</span>
        <span v-else class="badge badge-danger mb-1">Fail</span>
      </div>
      <div class="btn-group btn-group-sm mb-1">
        <div v-for="moment in test.getResult(option).listMoments()" class="btn-group btn-group-sm">
          <button 
          class="btn"
          :class="[moment.acceptable() ? outlinePrimary : outlineSecondary ]"
          data-toggle="dropdown">
            <span>
              {{ moment.getCharacter().stringify() }}
            </span>
          </button>
          <div class="dropdown-menu text-center p-1">
            <div class="btn-group btn-group-sm">
              <span v-if="!moment.hasStates()"
              class="btn btn-outline-secondary">
                No state
              </span>
              <span v-else
              v-for="state in moment.listStates()"
              class="btn"
              :class="[state.isFinal() ? primary : outlinePrimary ]">
                {{ state.stringify() }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="d-block btn-group btn-group-sm mb-1">
        <button 
        v-for="item in adapter.listTestCandidates()"
        class="btn"
        :class="[(item.value === option) ? primary : outlinePrimary ]"
        @click="option = item.value">{{ item.name }}</button>
      </div>
      <div>
        <button @click="test.reset()" type="button" class="btn btn-sm btn-outline-secondary">
          <span>Reset</span>
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
      option: 'NFA-ε',
      outlinePrimary: 'btn-outline-primary text-primary',
      outlineSecondary: 'btn-outline-secondary text-secondary',
      primary: 'btn-primary text-light'
    }
  }

}