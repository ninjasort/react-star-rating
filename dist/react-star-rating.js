'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/**
 * @fileoverview react-star-rating
 * @author @cameronjroe
 * <StarRating 
 *   name={string} - name for form input (required)
 *   caption={string} - caption for rating (optional)
 *   ratingAmount={number} - the rating amount (required, default: 5)
 *   rating={number} - a set rating between the rating amount (optional)
 *   disabled={boolean} - whether to disable the rating from being selected (optional)
 *   editing={boolean} - whether the rating is explicitly in editing mode (optional)
 *   size={string} - size of stars (optional)
 *   onRatingClick={function} - a handler function that gets called onClick of the rating (optional)
 *   />
 */

var StarRating = (function (_React$Component) {
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

  _inherits(StarRating, _React$Component);

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

        this.state.editing = false;

        var ratingVal = this.props.rating;
        this.setState({
          rating: ratingVal,
          pos: this.getStarRatingPosition(ratingVal)
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.root = this.refs.root.getDOMNode();
      this.ratingStars = this.refs.ratingStars.getDOMNode();
      this.ratingContainer = this.refs.ratingContainer.getDOMNode();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      delete this.root;
      delete this.ratingStars;
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
      // get hover position
      var ratingEvent = this.getRatingEvent(e);
      this.setState({
        pos: ratingEvent.width,
        rating: ratingEvent.val
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState.ratingCache.rating !== this.state.ratingCache.rating || nextState.rating !== this.state.rating;
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {

      // is it disabled?
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
    key: 'getClasses',

    // TODO:
    // Use classnames https://github.com/JedWatson/classnames
    value: function getClasses() {
      var classes = ['react-star-rating__root'];

      // is it disabled?
      if (this.props.disabled) {
        classes.push('rating-disabled');
      }

      if (this.props.size) {
        switch (this.props.size) {
          case 'sm':
            classes.push('react-star-rating__size--sm');
            break;
          case 'md':
            classes.push('react-star-rating__size--md');
            break;
          case 'lg':
            classes.push('react-star-rating__size--lg');
            break;
          default:
            break;
        }
      }

      if (this.state.editing) {
        classes.push('rating-editing');
      }

      return classes.join(' ');
    }
  }, {
    key: 'render',
    value: function render() {

      var caption = null;

      // is there a caption?
      if (this.props.caption) {
        caption = _react2['default'].createElement(
          'span',
          { className: 'react-rating-caption' },
          this.props.caption
        );
      }

      // get the classes on this render
      var classes = this.getClasses();

      // are we editing this rating?
      var starRating;
      if (this.state.editing) {
        starRating = _react2['default'].createElement(
          'div',
          { ref: 'ratingContainer', className: 'rating-container rating-gly-star', 'data-content': this.state.glyph, onMouseMove: this.handleMouseMove.bind(this), onMouseLeave: this.handleMouseLeave.bind(this), onClick: this.handleClick.bind(this) },
          _react2['default'].createElement('div', { ref: 'ratingStars', className: 'rating-stars', 'data-content': this.state.glyph, style: { width: this.state.pos } }),
          _react2['default'].createElement('input', { type: 'number', name: this.props.name, value: this.state.ratingCache.rating, style: { display: 'none !important' }, min: this.min, max: this.max, readOnly: true })
        );
      } else {
        starRating = _react2['default'].createElement(
          'div',
          { ref: 'ratingContainer', className: 'rating-container rating-gly-star', 'data-content': this.state.glyph },
          _react2['default'].createElement('div', { ref: 'ratingStars', className: 'rating-stars', 'data-content': this.state.glyph, style: { width: this.state.pos } }),
          _react2['default'].createElement('input', { type: 'number', name: this.props.name, value: this.state.ratingCache.rating, style: { display: 'none !important' }, min: this.min, max: this.max, readOnly: true })
        );
      }

      return _react2['default'].createElement(
        'span',
        { className: 'react-star-rating' },
        caption,
        _react2['default'].createElement(
          'span',
          { ref: 'root', className: classes },
          starRating
        )
      );
    }
  }]);

  return StarRating;
})(_react2['default'].Component);

StarRating.propTypes = {
  name: _react2['default'].PropTypes.string.isRequired,
  caption: _react2['default'].PropTypes.string,
  ratingAmount: _react2['default'].PropTypes.number.isRequired,
  rating: _react2['default'].PropTypes.number,
  onRatingClick: _react2['default'].PropTypes.func,
  disabled: _react2['default'].PropTypes.bool,
  editing: _react2['default'].PropTypes.bool,
  size: _react2['default'].PropTypes.string
};

StarRating.defaultProps = {
  step: 0.5,
  ratingAmount: 5,
  onRatingClick: function onRatingClick() {},
  disabled: false
};

exports['default'] = StarRating;
module.exports = exports['default'];