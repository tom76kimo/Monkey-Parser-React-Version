/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    cx = React.addons.classSet,
    Bootstrap = require('react-bootstrap'),
    Button = Bootstrap.Button,
    ButtonGroup = Bootstrap.ButtonGroup
    Searcher = require('./Searcher.jsx');

require('../../styles/Container.css');

var TitleBar = React.createClass({
    render: function () {
        return <h1 className="title-bar">{this.props.title}</h1>;
    }
});

var Container = React.createClass({
    getInitialState: function () {
        return {
            pages: [],
            activeIndex: 0,
            title: '',
            pageId: 0
        };
    },
    onRadioClick: function (data) {
        this.setState({
            activeIndex: data.index,
            title: data.pageName,
            pageId: data.pageId
        });
    },
    render: function () {
        var self = this,
            classString;
        var style = {
            marginTop: '10px'
        };
        var radioStyle = {
            display: 'none'
        };

        var pagesButton = {}, pageName, pageId;
        for (var i=0; i<this.state.pages.length; ++i) {
            pageName = this.state.pages.models[i].get('name');
            pageId = this.state.pages.models[i].get('pageId');
            classString = cx({
                btn: true,
                'btn-primary': true,
                'active': self.state.activeIndex === i
            });
            pagesButton['index-' + i] = 
                <label onClick={this.onRadioClick.bind(null, {index: i, pageName: pageName, pageId: pageId})} className={classString}>
                    <input style={radioStyle} type="radio" name="page" value="" data-index={i} />
                    {pageName}
                </label>;
        }
        return (
            <div className="Container">
              <div className="fb-like" data-href="http://tom76kimo.info/fb/" data-layout="standard" data-action="like" data-show-faces="true" data-share="true" style={style}></div>
              <div className="starter-template">
                <ButtonGroup>
                    { pagesButton }
                </ButtonGroup>
                <TitleBar title={this.state.title}/>
                <Searcher currentPage={this.state.pageId}/>
              </div>
            </div>
        );
    },
    componentDidMount: function () {
        var pages = this.setParser(),
            self = this,
            title = '',
            pageId = 0;
        pages.fetch({
            success: function (pages) {
                if (pages && pages.models && pages.models[0]) {
                    title = pages.models[0].get('name');
                    pageId = pages.models[0].get('pageId');
                }
                self.setState({
                    activeIndex: 0,
                    title: title,
                    pages: pages,
                    pageId: pageId
                });
            }
        });
    },
    setParser: function () {
        var Page = Parse.Object.extend('Page');
        var PageCollection = Parse.Collection.extend({
            model: Page
        });
        var pages = new PageCollection();
        return pages;
    }
});

module.exports = Container;


