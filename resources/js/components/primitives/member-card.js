// @ts-check

/**
 * Card component specifically for viewing members.
 * @public
 */
class MemberCard {

  /* template */
  template = `
    <div class="card">
      <img :src="url" class="card-img-top img-fluid" :alt="alt">
      <div class="card-body">
        <h5 class="card-title">{{ name }}</h5>
        <p class="card-subtitle text-muted">{{ role }}</p>
        <p class="card-text">{{ id }}</p>
      </div>
    </div>
  `;

  props = {
    'name': String,
    'role': String,
    'id': String,
    'url': String
  };

  data = () => {
    return {
      alt: '/resources/img/default-user-image.png'
    }
  }

}