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
      let url = "http://localhost:4200/decrypt";
      return this.get('ajax').request(url,
        { method: "POST",
          data : {
            cipher: cipherName,
            text: inputText,
            key: privateKey
          }
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
      let url = "http://localhost:4200/encrypt";
      return this.get('ajax').request(url,
        { method: "POST",
        data : {
          cipher: cipherName,
          text: inputText,
          key: privateKey
        }
      }).then(response => {
          container.set('inputText', response.msg || null);
      }).catch(response => {
        this.set('errorText', "Unable to encrypt message. Please try again with different input");
      });
    }
  }
});
