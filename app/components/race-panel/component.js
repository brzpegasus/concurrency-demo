import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const {
  Component,
  set
} = Ember;

export default Component.extend({
  countdown: 0,
  currentRaceDuration: 0,

  init() {
    this._super(...arguments);
    this.raceDurations = [10, 15, 20];
    this.minRaceDuration = Math.min(...this.raceDurations);
  },

  raceTask: task(function* (duration) {
    set(this, 'currentRaceDuration', duration);

    let countdown = set(this, 'countdown', duration);

    while (countdown > 0) {
      yield timeout(1000);
      countdown = this.decrementProperty('countdown');
    }

    set(this, 'currentRaceDuration', 0);
  }).drop()
});
