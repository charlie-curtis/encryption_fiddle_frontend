import Ember from 'ember';
export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  placeHolderText: "Generating your key...",
  init() {
    this._super();
    this.generateKeys();
  },
  container: null,
  generateKeys() {
    let container =  this.get('container');
    container.set('isWaitingOnNetworkRequest', true);
    container.set('privateKey', null);
    container.set('publicKey', null);
    let cipherName = container.get('cipher.name');
    return this.get('ajax').request("/generate/keys/" + cipherName,
      { method: "GET"
    }).then(response => {
        container.set('privateKey', response.private_key || null);
        container.set('publicKey', response.public_key || null);
        container.set('isWaitingOnNetworkRequest', false);
    });
  }
});
