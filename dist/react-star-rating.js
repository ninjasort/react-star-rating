'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var StarRating = (function (_React$Component) {
  _inherits(StarRating, _React$Component);

  _createClass(StarRating, null, [{
    key: 'propTypes',
    value: {
      name: _react2['default'].PropTypes.string.isRequired,
      caption: _react2['default'].PropTypes.string,
      ratingAmount: _react2['default'].PropTypes.number.isRequired,
      rating: _react2['default'].PropTypes.number,
      onRatingClick: _react2['default'].PropTypes.func,
      disabled: _react2['default'].PropTypes.bool,
      editing: _react2['default'].PropTypes.bool,
      size: _react2['default'].PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      step: 0.5,
      ratingAmount: 5,
      onRatingClick: function onRatingClick() {},
      disabled: false
    },
    enumerable: true
  }]);

  function StarRating(props) {
    _classCallCheck(this, StarRating);

    _get(Object.getPrototypeOf(StarRating.prototype), 'constructor', this).call(this, props);

    this.state = {
      ratingCache: {
        pos: 0,
        rating: 0
      },
      editing: props.editing || true,
      stars: 5,
      rating: 0,
      pos: 0,
      glyph: this.getStars()
    };
  }

  _createClass(StarRating, [{
    key: 'getStars',
    value: function getStars() {
      var stars = '';
      var numRating = this.props.ratingAmount;
      for (var i = 0; i < numRating; i++) {
        stars += '★';
      }
      return stars;
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.min = 0;
      this.max = this.props.ratingAmount || 5;
      if (this.props.rating) {

        this.state.editing = this.props.editing || false;
        var ratingVal = this.props.rating;
        this.state.ratingCache.pos = this.getStarRatingPosition(ratingVal);

        this.setState({
          ratingCache: this.state.ratingCache,
          rating: ratingVal,
          pos: this.getStarRatingPosition(ratingVal)
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.root = _reactDom2['default'].findDOMNode(this.refs.root);
      this.ratingContainer = _reactDom2['default'].findDOMNode(this.refs.ratingContainer);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      delete this.root;
      delete this.ratingContainer;
    }
  }, {
    key: 'getPosition',
    value: function getPosition(e) {
      return e.pageX - this.root.getBoundingClientRect().left;
    }
  }, {
    key: 'applyPrecision',
    value: function applyPrecision(val, precision) {
      return parseFloat(val.toFixed(precision));
    }
  }, {
    key: 'getDecimalPlaces',
    value: function getDecimalPlaces(num) {
      var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
      return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
    }
  }, {
    key: 'getWidthFromValue',
    value: function getWidthFromValue(val) {
      var min = this.min,
          max = this.max;
      if (val <= min || min === max) {
        return 0;
      }
      if (val >= max) {
        return 100;
      }
      return (val - min) * 100 / (max - min);
    }
  }, {
    key: 'getValueFromPosition',
    value: function getValueFromPosition(pos) {
      var precision = this.getDecimalPlaces(this.props.step);
      var maxWidth = this.ratingContainer.offsetWidth;
      var diff = this.max - this.min;
      var factor = diff * pos / (maxWidth * this.props.step);
      factor = Math.ceil(factor);
      var val = this.applyPrecision(parseFloat(this.min + factor * this.props.step), precision);
      val = Math.max(Math.min(val, this.max), this.min);
      return val;
    }
  }, {
    key: 'calculate',
    value: function calculate(pos) {
      var val = this.getValueFromPosition(pos),
          width = this.getWidthFromValue(val);

      width += '%';
      return { width: width, val: val };
    }
  }, {
    key: 'getStarRatingPosition',
    value: function getStarRatingPosition(val) {
      var width = this.getWidthFromValue(val) + '%';
      return width;
    }
  }, {
    key: 'getRatingEvent',
    value: function getRatingEvent(e) {
      var pos = this.getPosition(e);
      return this.calculate(pos);
    }
  }, {
    key: 'getSvg',
    value: function getSvg() {
      return _react2['default'].createElement(
        'svg',
        { className: 'react-star-rating__star', viewBox: '0 0 286 272', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
        _react2['default'].createElement(
          'g',
          { stroke: 'none', 'stroke-width': '1', fill: 'none', 'fill-rule': 'evenodd' },
          _react2['default'].createElement('polygon', { id: 'star-flat', points: '143 225 54.8322122 271.352549 71.6707613 173.176275 0.341522556 103.647451 98.9161061 89.3237254 143 0 187.083894 89.3237254 285.658477 103.647451 214.329239 173.176275 231.167788 271.352549 ' })
        )
      );
    }
  }, {
    key: 'updateRating',
    value: function updateRating(width, val) {
      this.setState({
        pos: width,
        rating: val
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props) {
        this.updateRating(this.getStarRatingPosition(nextProps.rating), nextProps.rating);
        return true;
      } else {
        return nextState.ratingCache.rating !== this.state.ratingCache.rating || nextState.rating !== this.state.rating;
      }
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({
        pos: this.state.ratingCache.pos,
        rating: this.state.ratingCache.rating
      });
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      var ratingEvent = this.getRatingEvent(e);
      this.updateRating(ratingEvent.width, ratingEvent.val);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (this.props.disabled) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }

      var ratingCache = {
        pos: this.state.pos,
        rating: this.state.rating,
        caption: this.props.caption,
        name: this.props.name
      };

      this.setState({
        ratingCache: ratingCache
      });

      this.props.onRatingClick(e, ratingCache);
    }
  }, {
    key: 'treatName',
    value: function treatName(title) {
      if (typeof title === 'string') {
        return title.toLowerCase().split(' ').join('_');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _cx;

      var caption = null;
      var classes = (0, _classnames2['default'])((_cx = {
        'react-star-rating__root': true,
        'rating-disabled': this.props.disabled
      }, _defineProperty(_cx, 'react-star-rating__size--' + this.props.size, this.props.size), _defineProperty(_cx, 'rating-editing', this.state.editing), _cx));

      if (this.props.caption) {
        caption = _react2['default'].createElement(
          'span',
          { className: 'react-rating-caption' },
          this.props.caption
        );
      }

      var starRating;
      if (this.state.editing) {
        starRating = _react2['default'].createElement(
          'div',
          { ref: 'ratingContainer',
            className: 'rating-container rating-gly-star',
            'data-content': this.state.glyph,
            onMouseMove: this.handleMouseMove.bind(this),
            onMouseLeave: this.handleMouseLeave.bind(this),
            onClick: this.handleClick.bind(this) },
          _react2['default'].createElement('div', { className: 'rating-stars', 'data-content': this.state.glyph, style: { width: this.state.pos } }),
          _react2['default'].createElement('input', { type: 'number', name: this.props.name, value: this.state.ratingCache.rating, style: { display: 'none !important' }, min: this.min, max: this.max, readOnly: true })
        );
      } else {
        starRating = _react2['default'].createElement(
          'div',
          { ref: 'ratingContainer', className: 'rating-container rating-gly-star', 'data-content': this.state.glyph },
          _react2['default'].createElement('div', { className: 'rating-stars', 'data-content': this.state.glyph, style: { width: this.state.pos } }),
          _react2['default'].createElement('input', { type: 'number', name: this.props.name, value: this.state.ratingCache.rating, style: { display: 'none !important' }, min: this.min, max: this.max, readOnly: true })
        );
      }

      return _react2['default'].createElement(
        'span',
        { className: 'react-star-rating' },
        caption,
        _react2['default'].createElement(
          'span',
          { ref: 'root', style: { cursor: 'pointer' }, className: classes },
          starRating
        )
      );
    }
  }]);

  return StarRating;
})(_react2['default'].Component);

exports['default'] = StarRating;
module.exports = exports['default'];