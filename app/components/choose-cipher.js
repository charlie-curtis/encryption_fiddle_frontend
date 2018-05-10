import Ember from 'ember';
import { CIPHERS } from "encryption-fiddle-frontend/constants/ciphers";
export default Ember.Component.extend({
  store: Ember.inject.service(),
  ciphers: CIPHERS,
  container: null,
  actions: {
    setCipher(cipher) {
      let container = this.get('container');
      container.set('cipher', cipher);
    }
  }
});
