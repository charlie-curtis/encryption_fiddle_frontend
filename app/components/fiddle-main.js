import Ember from 'ember';
import { CIPHER_RSA } from "encryption-fiddle-frontend/constants/ciphers";
export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  container: null,
  errorText: '',
  actions: {
    transformText(mode) {
      //explicitly remove error text before trying to perform action again
      this.set('errorText', '');
      let container = this.get('container');
      let cipherName = container.get('cipher.name');
      let inputText = container.get('inputText');
      let key = container.get('privateKey');
      if (cipherName === CIPHER_RSA.name && mode === "encrypt") {
        //only use the pubKey if we're encrypting using RSA
        key = container.get('publicKey');
      }
      let url = "http://localhost:4200/" + mode;
      return this.get('ajax').request(url,
        { method: "POST",
        data : {
          cipher: cipherName,
          text: inputText,
          key: key
        }
      }).then(response => {
          container.set('inputText', response.msg || null);
      }).catch(() => {
        let errorMessage = "Unable to " + mode + " message. Please try again with different input";
        this.set('errorText', errorMessage);
      });
    }
  }
});
