import Ember from 'ember';
import { PANEL_CIPHER, PANEL_KEYS, PANEL_FIDDLE } from "encryption-fiddle-frontend/constants/panels";
export default Ember.Component.extend({
  activePanel: PANEL_CIPHER,
  isCipherPanelActive: Ember.computed('activePanel', function() {
    return this.get('activePanel') === PANEL_CIPHER;
  }),
  isKeyPanelActive: Ember.computed('activePanel', function() {
    return this.get('activePanel') === PANEL_KEYS;
  }),
  isFiddlePanelActive: Ember.computed('activePanel', function() {
    return this.get('activePanel') === PANEL_FIDDLE;
  }),
  cipher: null,
  privateKey: null,
  publicKey: null,
  inputText: null,
  isWaitingOnNetworkRequest: false
});
