import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service,
  model(params) {
    //TODO do not depend on the store because they won't load
    //if the user ad hoc goes to /AES or something. load the ciphers on bootstrap or something
    var cipher = this.get('store').peekRecord('cipher', params.cipher_id);
    alert("returning " + cipher.name);
    return cipher;
  }
});
