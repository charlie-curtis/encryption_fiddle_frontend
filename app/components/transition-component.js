import Ember from 'ember';
import { PANEL_CIPHER, PANEL_FIDDLE } from "encryption-fiddle-frontend/constants/panels";
export default Ember.Component.extend({
  container: null,
  canMoveForward: Ember.computed('container.{isWaitingOnNetworkRequest,activePanel}', function() {
    let container = this.get('container');
    if (!container || container.get('isWaitingOnNetworkRequest')) {
      return false;
    }
    return container.get('activePanel') < PANEL_FIDDLE;
  }),
  canMoveBackward: Ember.computed('container.{isWaitingOnNetworkRequest,activePanel}', function() {
    let container = this.get('container');
    if (!container || container.get('isWaitingOnNetworkRequest')) {
      return false;
    }
    return container.get('activePanel') > PANEL_CIPHER;
  }),
  actions: {
    transitionToNextPanel() {
      let container = this.get('container');
      let activePanel = container.get('activePanel');
      if (this.get('canMoveForward')) {
        activePanel++;
        container.set('activePanel', activePanel);
      }
    },
    transitionToPreviousPanel() {
      let container = this.get('container');
      let activePanel = container.get('activePanel');
      if (this.get('canMoveBackward')) {
        activePanel--;
        container.set('activePanel', activePanel);
      }
    }
  }
});
