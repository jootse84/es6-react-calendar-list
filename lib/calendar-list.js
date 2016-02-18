'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _card = require('./card');

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import '../styles/calendar-list.less'
// import '../node_modules/bootstrap/less/bootstrap.less'

var CalendarList = function (_Component) {
    _inherits(CalendarList, _Component);

    function CalendarList(props) {
        _classCallCheck(this, CalendarList);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CalendarList).call(this, props));

        _this.state = {
            page: 0
        };
        _this.handleStepForward = _this.handleStepForward.bind(_this);
        _this.handleStepBackward = _this.handleStepBackward.bind(_this);
        _this.handleForward = _this.handleForward.bind(_this);
        _this.handleBackward = _this.handleBackward.bind(_this);
        return _this;
    }

    _createClass(CalendarList, [{
        key: 'getSharingUrl',
        value: function getSharingUrl(code) {
            var tmp;
            tmp = [window.share_event];
            tmp = tmp.concat(['share', 'event', code]);
            return tmp.join('/');
        }
    }, {
        key: 'selectText',
        value: function selectText() {
            try {
                chrome.runtime.sendMessage({
                    type: 'copy',
                    text: $('#share_link').text()
                });
                console.log('Copy was ' + successful ? 'successful' : 'unsuccessful');
            } catch (err) {
                console.log('Oops, unable to copy');
            }
        }
    }, {
        key: 'updateShareUrl',
        value: function updateShareUrl(code) {
            var url = this.getSharingUrl(code);
            $('#share_link').text(url);
        }
    }, {
        key: 'updateShareStatus',
        value: function updateShareStatus(st) {
            if (st) {
                $('#block-share-request').hide();
                $('#block-share').show();
            } else {
                $('#block-share-request').show();
                $('#block-share').hide();
            }
        }
    }, {
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
            var cardPerPage = _props.cardPerPage;


            if (this.props.data) {
                totalPage = Math.ceil(data.length / (cardPerPage || 12)) - 1;
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
            var cardPerPage = _props2.cardPerPage;


            if (this.props.data) {
                totalPage = Math.ceil(data.length / (cardPerPage || 12)) - 1;
            }
            this.setState({ page: Math.min(currPage + 1, totalPage) });
        }
    }, {
        key: 'handleClick',
        value: function handleClick(props) {
            this.props.Timer.setTime(props.time);
            $('#playerModal').modal('show');
            $('#playerModal').data('event_id', props.event_id);
            this.updateShareUrl(props.sharing_code);
            this.updateShareStatus(props.is_shared);
        }
    }, {
        key: 'handleDelete',
        value: function handleDelete(props) {
            $('#deleteFormModal').modal({
                show: true,
                backdrop: 'static'
            });
            $('#delete-event-name').text('Motion Detection');
            $('#delete-event-time').text(this.getDateString(props.time));
            $('#deleteFormModal').data('event_id', props.event_id);
        }
    }, {
        key: 'getDateString',
        value: function getDateString(t) {
            var obj = new Date(t),
                year = obj.getFullYear(),
                month = padZero(obj.getMonth() + 1),
                date = padZero(obj.getDate()),
                hour = padZero(obj.getHours()),
                minute = padZero(obj.getMinutes());

            function padZero(num) {
                if (num < 10) {
                    return '0' + num;
                }
                return num;
            }
            return [year, month, date].join('/') + ' ' + [hour, minute].join(':');
        }
    }, {
        key: 'renderNoneRecords',
        value: function renderNoneRecords() {
            var divStyle = {
                'padding': '100px'
            };

            return _react2.default.createElement(
                'div',
                { className: 'text-center', style: divStyle },
                _react2.default.createElement(
                    'h2',
                    null,
                    'There is no event recording in your search period.'
                )
            );
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
                var _props3 = this.props;
                var data = _props3.data;
                var cardPerPage = _props3.cardPerPage;


                totalPage = Math.ceil(data.length / (cardPerPage || 12));

                if (this.props.data.length <= 0) {
                    return this.renderNoneRecords();
                }

                if (totalPage <= page) {
                    page = totalPage - 1;
                }

                return _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-12' },
                            data.sort(function (a, b) {
                                return b.start_time - a.start_time;
                            }).slice(page * 8, (page + 1) * 8).map(function (data, i) {
                                var time = data.start_time * 1000,
                                    videoUrl = data.url,
                                    sharing_code = data.sharing_code,
                                    preview = data.screenshot,
                                    is_shared = data.is_sharing,
                                    event_id = data.event_id;

                                if (sharing_code) {
                                    sharing_code = sharing_code.replace(/\+/g, '-').replace(/\//g, '_');
                                }
                                return _react2.default.createElement(_card2.default, {
                                    key: i,
                                    video: videoUrl,
                                    sharing_code: sharing_code,
                                    event_id: event_id,
                                    preview: preview,
                                    title: 'Your title here',
                                    description: _this2.getDateString(time),
                                    is_shared: is_shared,
                                    onClick: _this2.handleClick,
                                    onDelete: _this2.handleDelete });
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row text-center', id: 'pagination' },
                            _react2.default.createElement(
                                'span',
                                {
                                    className: 'pagination-icon',
                                    onClick: this.handleStepBackward },
                                '<<'
                            ),
                            _react2.default.createElement(
                                'span',
                                {
                                    className: 'pagination-icon',
                                    onClick: this.handleBackward },
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
                                    onClick: this.handleForward },
                                '>'
                            ),
                            _react2.default.createElement(
                                'span',
                                {
                                    className: 'pagination-icon',
                                    onClick: this.handleStepForward },
                                '>>'
                            )
                        )
                    )
                );
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

    return CalendarList;
}(_react.Component);

exports.default = CalendarList;