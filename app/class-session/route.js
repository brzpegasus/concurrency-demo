import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  actions: {
    showStats() {
      this.transitionTo('class-stats');
    }
  }
});
