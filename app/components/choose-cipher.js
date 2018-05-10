import Ember from 'ember';
import { CIPHERS } from "encryption-fiddle-frontend/constants/ciphers";
export default Ember.Component.extend({
  store: Ember.inject.service(),
  ciphers: CIPHERS,
  container: null,
  isActive: true,
  actions: {
    setCipher(cipher) {
      console.log(cipher);
      alert(cipher.name);
      let container = this.get('container');
      container.set('cipher', cipher);
    }
  }
});
