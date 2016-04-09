import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const {
  Component,
  K,
  computed,
  computed: { reads },
  get,
  set
} = Ember;

export default Component.extend({
  duration: 0,
  timeRemaining: reads('duration'),

  progress: computed('duration', 'timeRemaining', {
    get() {
      let duration = get(this, 'duration');
      let timeRemaining = get(this, 'timeRemaining');

      return Math.floor((duration - timeRemaining) * 100 / duration);
    }
  }),

  init() {
    this._super(...arguments);
    get(this, 'classTask').perform();
  },

  classTask: task(function* () {
    let duration = get(this, 'duration');
    let startTime = Date.now();

    while (get(this, 'timeRemaining') > 0) {
      yield timeout(250);

      let elapsed = (Date.now() - startTime) / 1000;
      set(this, 'timeRemaining', duration - elapsed);
    }

    let classOverAction = get(this, 'class-over') || K;
    classOverAction();
  })
});
