'use strict';

describe('Container', function () {
  var Container, component;

  beforeEach(function () {
    Container = require('../../../src/scripts/components/Container.jsx');
    component = Container();
  });

  it('should create a new instance of Container', function () {
    expect(component).toBeDefined();
  });
});
