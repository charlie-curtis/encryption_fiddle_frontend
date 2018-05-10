import Ember from 'ember';
export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  container: null,
  //TODO ERROR HANDLING
  actions: {
    decryptText() {
      let container = this.get('container');
      let cipherName = container.get('cipher.name');
      let inputText = container.get('inputText');
      let privateKey = container.get('privateKey');
      let url = "/decrypt/" + cipherName + "/text/" + encodeURIComponent(inputText) + "/key/" + encodeURIComponent(privateKey);
      return this.get('ajax').request(url,
        { method: "GET"
      }).then(response => {
          container.set('inputText', response.msg || null);
      });
    },
    encryptText() {
      let container = this.get('container');
      let cipherName = container.get('cipher.name');
      let inputText = container.get('inputText');
      let privateKey = cipherName == "RSA" ? container.get('publicKey') : container.get('privateKey');
      let url = "/encrypt/" + cipherName + "/text/" +encodeURIComponent(inputText) + "/key/" + encodeURIComponent(privateKey);
      return this.get('ajax').request(url,
        { method: "GET"
      }).then(response => {
          container.set('inputText', response.msg || null);
      });
    }
  }
});
