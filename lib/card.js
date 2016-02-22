'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import '../styles/card.less'

var Card = function (_Component) {
    _inherits(Card, _Component);

    function Card() {
        _classCallCheck(this, Card);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Card).apply(this, arguments));
    }

    _createClass(Card, [{
        key: 'drawImage',
        value: function drawImage() {
            var canvas = _reactDom2.default.findDOMNode(this.refs.canvas),
                ctx;
            if (canvas === null) {
                return;
            }
            ctx = canvas.getContext('2d');
            canvas.width = 400;
            canvas.height = 300;
            ctx.beginPath();
            ctx.arc(200, 150, 140, 0, 2 * Math.PI);
            ctx.fillStyle = '#aeaeae';
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(200, 150, 125, 0, 2 * Math.PI);
            ctx.lineWidth = 10;
            ctx.strokeStyle = '#fff';
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(150, 80);
            ctx.lineTo(280, 150);
            ctx.lineTo(150, 220);

            ctx.closePath();
            ctx.fillStyle = '#fff';
            ctx.fill();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.drawImage();
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            this.props.onCardClicked(this.props);
        }
    }, {
        key: 'handleDelete',
        value: function handleDelete() {
            this.props.onCardDeleted(this.props);
        }
    }, {
        key: 'render',
        value: function render() {
            var preview = this.props.preview,
                content = '',
                idImage = "img-" + this.props.time;

            if (preview) {
                content = _react2.default.createElement('img', {
                    id: idImage,
                    src: preview,
                    className: 'img-responsive' });
            } else {
                content = _react2.default.createElement('canvas', { className: 'img-responsive', ref: 'canvas' });
            }
            return _react2.default.createElement(
                'div',
                { key: this.props.key,
                    className: 'col-xs-12 col-sm-6 col-md-3' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        {
                            className: 'event-wrapper' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'div',
                                {
                                    className: 'canvas',
                                    onClick: this.handleClick.bind(this) },
                                content
                            ),
                            _react2.default.createElement(
                                'div',
                                { onClick: this.handleClick.bind(this) },
                                _react2.default.createElement(
                                    'b',
                                    null,
                                    this.props.title
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { onClick: this.handleClick.bind(this) },
                                this.props.description
                            ),
                            _react2.default.createElement('div', {
                                className: 'btn-delete',
                                onClick: this.handleDelete.bind(this) })
                        )
                    )
                )
            );
        }
    }]);

    return Card;
}(_react.Component);

exports.default = Card;