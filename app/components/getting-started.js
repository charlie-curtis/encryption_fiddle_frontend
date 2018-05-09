import Ember from 'ember';
import { CIPHER_AES, CIPHER_RSA, CIPHERS } from "encryption-fiddle-frontend/constants/ciphers";
export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  cipher: null,
  cipherOptions: CIPHERS,
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
  }
});
