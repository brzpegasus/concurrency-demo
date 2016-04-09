import Ember from 'ember';

const { Helper: { helper } } = Ember;

export function ceil([value]) {
  return Math.ceil(value);
}

export default helper(ceil);
