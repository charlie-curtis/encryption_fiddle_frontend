import Ember from 'ember';
import { CIPHER_AES, CIPHER_RSA, CIPHERS } from "encryption-fiddle-frontend/constants/ciphers";
export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  cipher: null,
  ciphers: CIPHERS,
  init () {
    this._super();
    this.storeRecords();
  },
  storeRecords() {
    var store = this.get('store');
    CIPHERS.forEach(function(cipher) {
      store.createRecord('cipher', {
        id: cipher.name,
        name: cipher.name,
        longName: cipher.longName
      });
    });
  },
  actions: {
    setCipher(cipher) {
      alert(cipher);
      alert(cipher.name);
      this.set('cipher', cipher);
    }
  }
});
