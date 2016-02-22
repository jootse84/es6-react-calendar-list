'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarList = function (_Component) {
    _inherits(CalendarList, _Component);

    function CalendarList(props) {
        _classCallCheck(this, CalendarList);

        var now = new Date(),
            year = now.getFullYear(),
            month = now.getMonth(),
            date = now.getDate();

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CalendarList).call(this, props));

        _this.state = {
            start_time: new Date(year, month, date).valueOf(),
            end_time: new Date(year, month, date + 1).valueOf() - 1,
            list: []
        };
        return _this;
    }

    _createClass(CalendarList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _state = this.state;
            var start_time = _state.start_time;
            var end_time = _state.end_time;
            var startName = this.props.startName;
            var min_time = this.props.data.reduce(function (prev, curr) {
                return Math.min(prev, curr[startName] * 1000);
            }, Date.now());

            $('#start-date').daterangepicker({
                locale: {
                    format: 'MMM DD, YYYY HH:mm'
                },
                timePicker24Hour: true,
                autoApply: true,
                startDate: new Date(start_time),
                endDate: new Date(end_time),
                maxDate: new Date(end_time),
                minDate: new Date(min_time)
            });

            this.setState({
                list: this.props.data.filter(function (d) {
                    var t = d[startName] * 1000;
                    return t >= start_time && end_time >= t;
                })
            });

            $('#start-date').on('apply.daterangepicker', function () {
                var range = $('#start-date').val().split(/\s*\-\s*/);
                var start_time = new Date(range[0]).valueOf();
                var end_time = new Date(range[1]).valueOf() + 59 * 1000 + 999;
                _this2.setState({
                    start_time: start_time,
                    end_time: end_time,
                    list: _this2.props.data.filter(function (d) {
                        var t = d[startName] * 1000;
                        return t >= start_time && end_time >= t;
                    })
                });
                return;
            });
        }
    }, {
        key: 'updateHandler',
        value: function updateHandler(id, updates) {
            var idName = this.props.idName;

            return this.setState({
                list: this.state.list.map(function (d) {
                    var k = undefined;
                    if (d[idName] == id) {
                        for (k in updates) {
                            d[k] = updates[k];
                        }
                        console.log(d);
                    }
                    return d;
                })
            });
        }
    }, {
        key: 'deleteHandler',
        value: function deleteHandler(props) {
            var _this3 = this;

            var idName = this.props.idName;

            this.props.onCardDeleted(props, function () {
                _this3.setState({
                    list: _this3.state.list.filter(function (d) {
                        return d[idName] != props[idName];
                    })
                });
                return;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement('div', { className: 'col-md-6' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group has-feedback col-md-6' },
                        _react2.default.createElement('input', {
                            type: 'text',
                            className: 'form-control',
                            id: 'start-date' }),
                        _react2.default.createElement('span', { className: 'glyphicon glyphicon-calendar form-control-feedback' })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'content-list' },
                    _react2.default.createElement(_list2.default, {
                        data: this.state.list,
                        idName: this.props.idName,
                        imageName: this.props.imageName,
                        startName: this.props.startName,
                        getTitle: this.props.getTitle,
                        getDescription: this.props.getDescription,
                        renderNoCards: this.props.renderNoCards,
                        onCardDeleted: this.deleteHandler,
                        onCardClicked: this.props.onCardClicked,
                        cardsPerPage: this.props.cardsPerPage })
                )
            );
        }
    }]);

    return CalendarList;
}(_react.Component);

exports.default = CalendarList;