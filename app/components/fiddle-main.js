import Ember from 'ember';
import { CIPHER_AES, CIPHER_RSA, CIPHERS } from "encryption-fiddle-frontend/constants/ciphers";
export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  cipherOptions: CIPHERS,
  inputText: '',
  privateKey: '',
  publicKey: '',
  cipher: null,
  isShowingModal: true,
  actions: {
    clearStateAndSetCipher(cipher) {
      this.set('cipher', cipher);
      this.set('privateKey', null);
      this.set('publicKey', null);
      this.set('isShowingModal', !this.get('isShowingModal'));
    },
    toggleModal() {
      this.set('isShowingModal', !this.get('isShowingModal'));
    },
    generateKeys(cipher) {
      //TODO this can be cleaned up alot
      //TODO this needs to handle keys with forward slashes in them
      return this.get('ajax').request("/generate/keys/" + cipher,
        { method: "GET"
      }).then(response => {
          this.set('privateKey', response.private_key || null);
          this.set('publicKey', response.public_key || null);
      });
    },
    //TODO ERROR HANDLING
    decryptText() {
      var cipher = this.get('cipher');
      var inputText = this.get('inputText');
      var privateKey = this.get('privateKey');
      var url = "/decrypt/" + cipher + "/text/" + encodeURIComponent(inputText) + "/key/" + encodeURIComponent(privateKey);
      return this.get('ajax').request(url,
        { method: "GET"
      }).then(response => {
          this.set('inputText', response.msg || null);
      });
    },
    encryptText() {
      var cipher = this.get('cipher');
      var inputText = this.get('inputText');
      var privateKey = cipher == "RSA" ? this.get('publicKey') : this.get('privateKey');
      var url = "/encrypt/" + cipher + "/text/" +encodeURIComponent(inputText) + "/key/" + encodeURIComponent(privateKey);
      return this.get('ajax').request(url,
        { method: "GET"
      }).then(response => {
          this.set('inputText', response.msg || null);
      });
    }
  }
});
