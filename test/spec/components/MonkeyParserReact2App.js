'use strict';

describe('Main', function () {
  var MonkeyParserReact2App, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    MonkeyParserReact2App = require('../../../src/scripts/components/MonkeyParserReact2App.jsx');
    component = MonkeyParserReact2App();
  });

  it('should create a new instance of MonkeyParserReact2App', function () {
    expect(component).toBeDefined();
  });
});
