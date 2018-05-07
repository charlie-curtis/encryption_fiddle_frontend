import { moduleFor, test } from 'ember-qunit';

moduleFor('route:index', 'Unit | Route | index', {});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('should transition to getting-started route', function(assert) {
  let route = this.subject({
    replaceWith(routeName) {
      assert.equal(routeName, 'getting-started', 'index transitions to correct route');
    }
  });
  route.beforeModel();
});
