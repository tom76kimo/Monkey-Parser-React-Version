/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    cx = React.addons.classSet,
    Bootstrap = require('react-bootstrap');

var SearchBar = React.createClass({
    render: function () {
        return <input ref="searchBar" className="form-control search-bar" type="text" placeholder="輸入關鍵字 ex: 音樂、法律、系籃..." />;
    }
});

var SearchButton = React.createClass({
    render: function () {
        var classString = cx({
            'btn search-btn': true,
            'btn-success': !this.props.isSearching,
            'btn-danger': this.props.isSearching
        });
        var textString = '';
        if (this.props.isSearching) {
            textString = '停止搜尋';
        } else {
            textString = '開始搜尋';
        }
        return <button onClick={this.props.startSearch} className={classString}>{textString}</button>;
    }
});

var countPage = React.createClass({
    render: function () {
        var cssString = cx({
            'page-count': true,
            'hide': !this.props.isSearching
        });
        return <div className={cssString}>搜尋第{this.props.pageCount}頁...</div>;
    }
});

var Result = React.createClass({
    render: function () {
        var resultList = {}, loadingCss;
        this.props.results.map(function (element, index) {
            resultList['index-' + index] = <div className="result-element">
                                            {element.message}
                                            <a href={element.link} className="link" target="_blank">連結至貼文</a>
                                           </div>;
        });
        loadingCss = cx({
            'loading-icon': true,
            'hide': !this.props.isSearching
        });
        return <div>
                {resultList}
                <img className={loadingCss} width="80" src="images/loading.gif" />
               </div>;
    }
});

var Searcher = React.createClass({
    getInitialState: function () {
        this.cancelSearch = false;
        return {
            results: [],
            isSearching: false,
            pageCount: 0
        };
    },
    startSearch: function () {
        var self = this, keyword = '';
        if (this.state.isSearching) {
            this.cancelSearch = true;
            return;
        } else {
            keyword = this.refs.searchBar.getDOMNode().value.trim();
            if (keyword === '') {
                return;
            }
            this.setState({
                results: [],
                isSearching: true,
                pageCount: 0
            }, function () {
                self.keyword = keyword;
                var currentPage = self.props.currentPage,
                    initUrl = '/v2.0/' + currentPage + '/feed?limit=40&fields=message,actions';
                self.searchRecursive(initUrl);
            });
        }
        
    },
    searchRecursive: function (initUrl) {
        if (this.cancelSearch) {
            this.searchFinish();
            this.cancelSearch = false;
            return;
        }
        var self = this,
            pageCount = this.state.pageCount + 1;

        this.setState({
            pageCount: pageCount
        });
        FB.api(initUrl, function (posts) {
            var oldResults;
            if (!posts || !posts.data) {
                return;
            }
            for (var i=0; i<posts.data.length; ++i) {
                if (posts.data[i].message) {
                    if (posts.data[i].message.indexOf(self.keyword) !== -1){
                        oldResults = self.state.results;
                        oldResults.push({
                            message: posts.data[i].message,
                            link: posts.data[i].actions[0].link
                        });
                        self.setState({
                            results: oldResults
                        });
                    }
                }
            }

            if (!posts.paging || !posts.paging.next) {
                self.searchFinish();
                return;
            }

            var nextInitUrl = posts.paging.next;
            self.searchRecursive(nextInitUrl);

        });
    },
    searchFinish: function () {
        this.setState({
            isSearching: false
        });
    },
    onKeyDown: function (e) {
        if (e.keyCode === 13 || e.keyCode === '13') {
            this.startSearch();
        }
    },
    render: function () {
        return (
            <div>
                <input onKeyDown={this.onKeyDown} ref="searchBar" className="form-control search-bar" type="text" placeholder="輸入關鍵字 ex: 音樂、法律、系籃..." />
                <countPage isSearching={this.state.isSearching} pageCount={this.state.pageCount}/>
                <SearchButton isSearching={this.state.isSearching} startSearch={this.startSearch} />
                <Result isSearching={this.state.isSearching} results={this.state.results}/>
            </div>);
    }
});

module.exports = Searcher;