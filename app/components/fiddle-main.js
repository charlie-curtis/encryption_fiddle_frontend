import Ember from 'ember';
export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  container: null,
  //TODO ERROR HANDLING
  actions: {
    decryptText() {
      var container = this.get('container');
      var cipherName = container.get('cipher.name');
      var inputText = container.get('inputText');
      var privateKey = container.get('privateKey');
      var url = "/decrypt/" + cipherName + "/text/" + encodeURIComponent(inputText) + "/key/" + encodeURIComponent(privateKey);
      return this.get('ajax').request(url,
        { method: "GET"
      }).then(response => {
          container.set('inputText', response.msg || null);
      });
    },
    encryptText() {
      var container = this.get('container');
      var cipherName = container.get('cipher.name');
      var inputText = container.get('inputText');
      var privateKey = cipherName == "RSA" ? container.get('publicKey') : container.get('privateKey');
      var url = "/encrypt/" + cipherName + "/text/" +encodeURIComponent(inputText) + "/key/" + encodeURIComponent(privateKey);
      return this.get('ajax').request(url,
        { method: "GET"
      }).then(response => {
          container.set('inputText', response.msg || null);
      });
    },
    transitionToPreviousPanel() {
      var container = this.get('container');
      container.transitionToPreviousPanel();
    }
  }
});
