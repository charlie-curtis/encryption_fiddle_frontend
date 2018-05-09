import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('getting-started');
  this.route('generate-keys', {path: "/generate-keys/:cipher_id"});
  this.route('fiddle');
});

export default Router;
