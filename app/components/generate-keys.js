import Ember from 'ember';
export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  init() {
    this.generateKeys();
    this._super();
  },
  privateKey: '',
  publicKey: '',
  cipher: null,
  generateKeys() {
    var cipher = this.get('cipher');
    return this.get('ajax').request("/generate/keys/" + cipher,
      { method: "GET"
    }).then(response => {
        this.set('privateKey', response.private_key || null);
        this.set('publicKey', response.public_key || null);
    });
  }
});
