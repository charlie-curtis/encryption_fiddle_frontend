import DS from 'ember-data';

export default DS.Model.extend({
  privateKey: DS.attr('string'),
  publicKey: DS.attr('string')
});
