import Ember from 'ember';
import {keys} from "encryption-fiddle-frontend/ajax/keys";
import CIPHERS from "encryption-fiddle-frontend/constants/ciphers";
export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  cipherOptions: CIPHERS,
  isEncryptMode: true,
  inputText: '',
  privateKey: '',
  publicKey: '',
  cipher: null,
  isShowingModal: true,
  actions: {
    setCipherAndToggleModal(cipher) {
      this.set('cipher', cipher);
      this.set('isShowingModal', !this.get('isShowingModal'));
    },
    toggleModal() {
      this.set('isShowingModal', !this.get('isShowingModal'));
    },
    generateKeys(cipher) {
      //TODO this can be cleaned up alot
      return this.get('ajax').request("/generate/keys/" + cipher,
        { method: "GET"
      }).then(response => {
          this.set('privateKey', response.private_key || null);
          this.set('publicKey', response.public_key || null);
      });
    }
  }
});
