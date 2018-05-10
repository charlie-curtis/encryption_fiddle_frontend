import Ember from 'ember';
export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  container: null,
  errorText: '',
  actions: {
    decryptText() {
      //explicitly remove error text before trying to perform action again
      this.set('errorText', '');
      let container = this.get('container');
      let cipherName = container.get('cipher.name');
      let inputText = container.get('inputText');
      let privateKey = container.get('privateKey');
      let url = "/decrypt/" + cipherName + "/text/" + encodeURIComponent(inputText) + "/key/" + encodeURIComponent(privateKey);
      return this.get('ajax').request(url,
        { method: "GET"
      }).then(response => {
          container.set('inputText', response.msg || null);
      }).catch(response => {
        this.set('errorText', "Unable to decrypt message. Please try again with different input");
      });;
    },
    encryptText() {
      //explicitly remove error text before trying to perform action again
      this.set('errorText', '');
      let container = this.get('container');
      let cipherName = container.get('cipher.name');
      let inputText = container.get('inputText');
      let privateKey = cipherName == "RSA" ? container.get('publicKey') : container.get('privateKey');
      let url = "/encrypt/" + cipherName + "/text/" +encodeURIComponent(inputText) + "/key/" + encodeURIComponent(privateKey);
      return this.get('ajax').request(url,
        { method: "GET"
      }).then(response => {
          container.set('inputText', response.msg || null);
      }).catch(response => {
        this.set('errorText', "Unable to encrypt message. Please try again with different input");
      });
    }
  }
});
