import Ember from 'ember';
export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  init() {
    this._super();
    this.generateKeys();
  },
  container: null,
  generateKeys() {
    let container =  this.get('container');
    let cipherName = container.get('cipher.name');
    return this.get('ajax').request("/generate/keys/" + cipherName,
      { method: "GET"
    }).then(response => {
        container.set('privateKey', response.private_key || null);
        container.set('publicKey', response.public_key || null);
    });
  }
});
