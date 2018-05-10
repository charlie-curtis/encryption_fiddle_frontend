import Ember from 'ember';
export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  placeHolderText: "Generating your key...",
  init() {
    this._super();
    this.generateKeys();
    let container = this.get('container');
    //reset the state of any errors on load. Loading this component should lead to a fresh state
    container.set('hasError', false);
  },
  errorText: '',
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
    }).catch(() => {
        this.set('errorText', 'Unable to generate your keys. Try pressing "back" and try again');
        container.set('privateKey', null);
        container.set('publicKey', null);
        container.set('isWaitingOnNetworkRequest', false);
        container.set('hasError', true);
    });
  }
});
