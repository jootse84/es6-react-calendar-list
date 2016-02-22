'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _card = require('./card');

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import '../styles/list.less'
// import '../node_modules/bootstrap/less/bootstrap.less'

var List = function (_Component) {
    _inherits(List, _Component);

    function List(props) {
        _classCallCheck(this, List);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(List).call(this, props));

        _this.state = {
            page: 0
        };
        _this.handleStepForward = _this.handleStepForward.bind(_this);
        _this.handleStepBackward = _this.handleStepBackward.bind(_this);
        _this.handleForward = _this.handleForward.bind(_this);
        _this.handleBackward = _this.handleBackward.bind(_this);
        return _this;
    }

    _createClass(List, [{
        key: 'handleStepBackward',
        value: function handleStepBackward() {
            this.setState({ page: 0 });
        }
    }, {
        key: 'handleBackward',
        value: function handleBackward() {
            var currPage = this.state.page || 0,
                prevPage = Math.max(0, currPage - 1);

            this.setState({ page: prevPage });
        }
    }, {
        key: 'handleStepForward',
        value: function handleStepForward() {
            var totalPage = 0;
            var _props = this.props;
            var data = _props.data;
            var cardsPerPage = _props.cardsPerPage;


            if (this.props.data) {
                totalPage = Math.ceil(data.length / (cardsPerPage || 12)) - 1;
            }
            this.setState({ page: totalPage });
        }
    }, {
        key: 'handleForward',
        value: function handleForward() {
            var currPage = this.state.page || 0,
                totalPage = 0;
            var _props2 = this.props;
            var data = _props2.data;
            var cardsPerPage = _props2.cardsPerPage;


            if (this.props.data) {
                totalPage = Math.ceil(data.length / (cardsPerPage || 12)) - 1;
            }
            this.setState({ page: Math.min(currPage + 1, totalPage) });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var page = this.state.page || 0,
                totalPage = 0,
                divStyle,
                tmp;

            if (this.props.data) {
                var _ret = function () {
                    var _props3 = _this2.props;
                    var data = _props3.data;
                    var cardsPerPage = _props3.cardsPerPage;
                    var startName = _props3.startName;
                    var idName = _props3.idName;
                    var imageName = _props3.imageName;
                    var getTitle = _props3.getTitle;
                    var getDescription = _props3.getDescription;
                    var onCardClicked = _props3.onCardClicked;
                    var onCardDeleted = _props3.onCardDeleted;


                    totalPage = Math.ceil(data.length / (cardsPerPage || 12));

                    if (_this2.props.data.length <= 0) {
                        return {
                            v: _this2.props.renderNoCards()
                        };
                    }

                    if (totalPage <= page) {
                        page = totalPage - 1;
                    }

                    return {
                        v: _react2.default.createElement(
                            'div',
                            { className: 'container' },
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'col-xs-12' },
                                    data.sort(function (a, b) {
                                        return b[startName] - a[startName];
                                    }).slice(page * 8, (page + 1) * 8).map(function (data, i) {
                                        return _react2.default.createElement(_card2.default, {
                                            key: i,
                                            card_id: data[idName],
                                            preview: data[imageName],
                                            title: getTitle(data),
                                            description: getDescription(data),
                                            onCardClicked: onCardClicked,
                                            onCardDeleted: onCardDeleted });
                                    })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row text-center', id: 'pagination' },
                                    _react2.default.createElement(
                                        'span',
                                        {
                                            className: 'pagination-icon',
                                            onClick: _this2.handleStepBackward },
                                        '<<'
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        {
                                            className: 'pagination-icon',
                                            onClick: _this2.handleBackward },
                                        '<'
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'Page : ',
                                        page + 1,
                                        ' / ',
                                        totalPage
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        {
                                            className: 'pagination-icon',
                                            onClick: _this2.handleForward },
                                        '>'
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        {
                                            className: 'pagination-icon',
                                            onClick: _this2.handleStepForward },
                                        '>>'
                                    )
                                )
                            )
                        )
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            } else {
                return _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { id: 'img-loading-wrapper' },
                            _react2.default.createElement(
                                'div',
                                { id: 'img-loading-listener' },
                                _react2.default.createElement('img', {
                                    src: 'images/ajax-loader-large.gif',
                                    style: { 'margin-top': '-150px !important' } })
                            )
                        )
                    )
                );
            }
        }
    }]);

    return List;
}(_react.Component);

exports.default = List;