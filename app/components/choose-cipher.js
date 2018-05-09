import Ember from 'ember';
import { CIPHER_AES, CIPHER_RSA, CIPHERS } from "encryption-fiddle-frontend/constants/ciphers";
export default Ember.Component.extend({
  store: Ember.inject.service(),
  ciphers: CIPHERS,
  container: null,
  init () {
    this._super();
  },
  actions: {
    setCipher(cipher) {
      var container = this.get('container');
      container.set('cipher', cipher);
    },
    transitionToNextPanel() {
      var container = this.get('container');
      container.transitionToNextPanel();
    }
  }
});
