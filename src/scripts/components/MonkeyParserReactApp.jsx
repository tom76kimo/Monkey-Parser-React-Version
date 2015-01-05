/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Bootstrap = require('react-bootstrap'),
    Navbar = Bootstrap.Navbar,
    Button = Bootstrap.Button,
    Nav = Bootstrap.Nav,
    NavItem = Bootstrap.NavItem;

var Container = require('./Container.jsx');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var imageURL = require('../../images/yeoman.png');

var MonkeyParserReactApp = React.createClass({
    initialize: function () {
        Parse.initialize("W4JNaLiHL9YdTLkkc0rTHadM4Y6PY1DyQVDA9AhT", "RJFfqYzLTHA5QUaJiAntLd7ZmEBBzgp3h82XEWr5");
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '439312986102441',
                xfbml      : true,
                version    : 'v2.0'
            });
            FB.login(function (response) {
                if (response.status === 'connected') {
                }
            });
        };
    },
    render: function() {
        this.initialize();
        return (
          <div className='main'>
            <Navbar>
                <Nav>
                    <NavItem eventKey={1} href="#">FB Page Searcher</NavItem>
                </Nav>
            </Navbar>
            <Container />
          </div>
        );
    }
});
React.renderComponent(<MonkeyParserReactApp />, document.getElementById('content')); // jshint ignore:line

module.exports = MonkeyParserReactApp;
