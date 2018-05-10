import Ember from 'ember';
import { CIPHERS } from "encryption-fiddle-frontend/constants/ciphers";
export default Ember.Component.extend({
  store: Ember.inject.service(),
  ciphers: CIPHERS,
  container: null,
  init() {
    this._super();
    let container = this.get('container');
    //reset the error status when this component is loaded
    container.set('hasError', false);
  },
  actions: {
    setCipher(cipher) {
      let container = this.get('container');
      container.set('cipher', cipher);
    }
  }
});
