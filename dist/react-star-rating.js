'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isFloat(n) {
  return n === Number(n) && n % 1 !== 0;
}

/**
 * @fileoverview react-star-rating
 * @author @cameronjroe
 * <StarRating
 *   name={string} - name for form input (required)
 *   caption={string} - caption for rating (optional)
 *   totalStars={number} - the total amount of stars (required, default: 5)
 *   rating={number} - a set rating between the rating amount (optional)
 *   symbol={React.}
 *   disabled={boolean} - whether to disable the rating from being selected (optional)
 *   editing={boolean} - whether the rating is explicitly in editing mode (optional)
 *   size={number} - size of stars (optional)
 *   onRatingClick={function} - a handler function that gets called onClick of the rating (optional)
 *   />
 */

var StarRating = (function (_React$Component) {
  _inherits(StarRating, _React$Component);

  function StarRating(props) {
    _classCallCheck(this, StarRating);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StarRating).call(this, props));

    _this.state = {
      currentRatingVal: props.rating,
      currentRatingPos: _this.getStarRatingPosition(props.rating),
      editing: props.editing || true,
      rating: props.rating,
      pos: _this.getStarRatingPosition(props.rating),
      glyph: _this.getStars(),
      size: props.size
    };
    return _this;
  }

  _createClass(StarRating, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.min = 0;
      this.max = this.props.totalStars || 5;

      if (this.props.rating) {
        this.state.editing = this.props.editing || false;
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.root = _reactDom2.default.findDOMNode(this.refs.root);
      this.ratingContainer = _reactDom2.default.findDOMNode(this.refs.ratingContainer);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      delete this.root;
      delete this.ratingContainer;
    }

    /**
     * Gets the stars based on totalStars
     * @return {string} stars
     */

  }, {
    key: 'getStars',
    value: function getStars() {
      var stars = '';
      var numRating = this.props.totalStars;
      for (var i = 0; i < numRating; i++) {
        stars += '★';
      }
      return stars;
    }

    /**
     * Gets the mouse position
     * @param  {event} e
     * @return {number} delta
     */

  }, {
    key: 'getPosition',
    value: function getPosition(e) {
      return e.clientX - this.root.getBoundingClientRect().left;
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
      return this.getWidthFromValue(val) + '%';
    }
  }, {
    key: 'getRatingEvent',
    value: function getRatingEvent(e) {
      var pos = this.getPosition(e);
      return this.calculate(pos);
    }

    /**
     * Get Star SVG
     */

  }, {
    key: 'getSvg',
    value: function getSvg(rating) {
      var stars = [];
      for (var i = 0; i < this.props.totalStars; i++) {
        var attrs = {};
        attrs['transform'] = 'translate(' + i * 50 + ', 0)';
        attrs['fill'] = i + this.props.step <= rating ? '#FFA91B' : '#C6C6C6';
        stars.push(_react2.default.createElement('path', _extends({}, attrs, {
          key: 'star-' + i,
          mask: 'url(#half-star-mask)',
          d: 'm0,18.1l19.1,0l5.9,-18.1l5.9,18.1l19.1,0l-15.4,11.2l5.9,18.1l-15.4,-11.2l-15.4,11.2l5.9,-18.1l-15.4,-11.2l0,0z' })));
      }

      var styles = {
        width: stars.length * this.props.size + 'px',
        height: this.props.size + 'px'
      };

      return _react2.default.createElement(
        'svg',
        { className: 'rsr__star',
          style: styles,
          viewBox: '0 0 ' + stars.length + ' 50',
          preserveAspectRatio: 'xMinYMin meet',
          version: '1.1',
          xmlns: 'http://www.w3.org/2000/svg' },
        _react2.default.createElement(
          'g',
          null,
          stars.map(function (item) {
            return item;
          })
        )
      );
    }

    /**
     * Update the active rating selection
     * @param  {number} width width based on mouse position
     * @param  {number} val   current rating amount
     */

  }, {
    key: 'updateRating',
    value: function updateRating(width, val) {
      this.setState({
        pos: width,
        rating: val
      });
    }

    /**
     * Update rating state if props have changed
     */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props) {
        this.updateRating(this.getStarRatingPosition(nextProps.rating), nextProps.rating);
        return true;
      } else {
        return nextState.currentRatingVal !== this.state.currentRatingVal || nextState.rating !== this.state.rating;
      }
    }

    /**
     * Set position to original state
     */

  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({
        pos: this.state.currentRatingPos,
        rating: this.state.currentRatingVal
      });
    }

    /**
     * Update position to current event state
     * @param  {object} event
     */

  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      // get hover position
      var ratingEvent = this.getRatingEvent(e);
      this.updateRating(ratingEvent.width, ratingEvent.val);
    }

    /**
     * Update rating state, Trigger function handler
     * @param  {object} event
     */

  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (this.props.disabled) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }

      var payload = {
        currentRatingPos: this.state.pos,
        currentRatingVal: this.state.rating,
        caption: this.props.caption,
        name: this.props.name
      };

      this.setState(payload);

      this.props.onRatingClick(e, {
        rating: this.state.rating,
        position: this.state.pos,
        caption: this.props.caption,
        name: this.props.name
      });
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
    value: function getClasses() {
      return (0, _classnames2.default)({
        'rsr-root': true,
        'rsr--disabled': this.props.disabled,
        'rsr--editing': this.state.editing
      });
    }
  }, {
    key: 'getCaption',
    value: function getCaption() {
      if (this.props.caption) {
        return _react2.default.createElement(
          'span',
          { className: 'rsr__caption' },
          this.props.caption
        );
      } else {
        return null;
      }
    }
  }, {
    key: 'setAttrs',
    value: function setAttrs() {
      var attrs = {};
      if (this.state.editing) {
        attrs['onMouseMove'] = this.handleMouseMove.bind(this);
        attrs['onMouseLeave'] = this.handleMouseLeave.bind(this);
        attrs['onClick'] = this.handleClick.bind(this);
      }
      return attrs;
    }
  }, {
    key: 'render',
    value: function render() {

      var classes = this.getClasses();
      var caption = this.getCaption();
      var attrs = this.setAttrs();

      return _react2.default.createElement(
        'span',
        { className: 'rsr-container' },
        caption,
        _react2.default.createElement(
          'div',
          { ref: 'root', className: classes },
          _react2.default.createElement(
            'div',
            _extends({ ref: 'ratingContainer',
              className: 'rsr rating-gly-star',
              'data-content': this.state.glyph }, attrs),
            this.getSvg(this.state.rating),
            _react2.default.createElement('input', { type: 'number',
              name: this.props.name,
              value: this.state.currentRatingVal,
              style: { display: 'none !important' },
              min: this.min,
              max: this.max,
              readOnly: true })
          )
        )
      );
    }
  }]);

  return StarRating;
})(_react2.default.Component);

StarRating.propTypes = {
  name: _react2.default.PropTypes.string.isRequired,
  caption: _react2.default.PropTypes.string,
  totalStars: _react2.default.PropTypes.number.isRequired,
  rating: _react2.default.PropTypes.number,
  onRatingClick: _react2.default.PropTypes.func,
  disabled: _react2.default.PropTypes.bool,
  editing: _react2.default.PropTypes.bool,
  size: _react2.default.PropTypes.number
};
StarRating.defaultProps = {
  step: 1,
  totalStars: 5,
  onRatingClick: function onRatingClick() {},

  disabled: false,
  size: 50,
  rating: 0
};
exports.default = StarRating;