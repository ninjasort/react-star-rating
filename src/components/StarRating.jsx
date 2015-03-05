var React = require('react');

/**
 * @fileoverview react-star-rating
 * @author @cameronjroe
 * <StarRating 
 *   title={string} - title of caption for rating (optional)
 *   ratingAmount={number} - the rating amount (default: 5)
 *   rating={number} - a set rating between the rating amount (optional)
 *   disabled={boolean} - whether to disable the rating from being selected (optional)
 *   editing={boolean} - whether the rating is explicitly in editing mode (optional)
 *   onRatingClick={function} - a handler function that gets called onClick of the rating
 *   />
 */
var StarRating = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    ratingAmount: React.PropTypes.number.isRequired,
    rating: React.PropTypes.number,
    onRatingClick: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    editing: React.PropTypes.bool
  },

  styles: {
    'display': 'inline-block',
    'vertical-align': 'top',
    'margin': '0 1em'
  },

  getStars: function () {
    var stars = '';
    var numRating = this.props.ratingAmount;
    for(var i = 0; i < numRating; i++) {
      stars += '\u2605';
    }
    return stars;
  },

  getDefaultProps: function () {
    return {
      step: 0.5,
      ratingAmount: 5,
      onRatingClick: function (e, cache) {
      },
      editing: true,
      disabled: false
    }
  },

  getInitialState: function () {
    return {
      ratingCache: {
        pos: 0,
        rating: 0
      },
      stars: 5,
      rating: 0,
      pos: 0,
      glyph: this.getStars()
    }
  },

  componentWillMount: function () {
    this.min = 0;
    this.max = this.props.ratingAmount || 5;
  },

  componentDidMount: function () {
    this.root = this.refs.root.getDOMNode();
    this.ratingStars = this.refs.ratingStars.getDOMNode();
    this.ratingContainer = this.refs.ratingContainer.getDOMNode();
  },

  componentWillUnmount: function () {
    delete this.ratingStars;
    delete this.ratingContainer;
  },

  getPosition: function (e) {
    return e.pageX - this.root.getBoundingClientRect().left;
  },

  applyPrecision: function (val, precision) {
    return parseFloat(val.toFixed(precision));
  },

  getDecimalPlaces: function (num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  },

  getWidthFromValue: function (val) {
    var min = this.min,
        max = this.max;
    if (val <= min || min === max) {
      return 0;
    }
    if (val >= max) {
      return 100;
    }
    return (val - min) * 100 / (max - min);
  },
  
  getValueFromPosition: function (pos) {
    var precision = this.getDecimalPlaces(this.props.step);
    var maxWidth = this.ratingContainer.offsetWidth;
    var diff = this.max - this.min;
    var factor = (diff * pos) / (maxWidth * this.props.step);
        factor = Math.ceil(factor);
    var val = this.applyPrecision(parseFloat(this.min + factor * this.props.step), precision);
        val = Math.max(Math.min(val, this.max), this.min);
    return val;
  },

  calculate: function (pos) {
    var val = this.getValueFromPosition(pos),
        width = this.getWidthFromValue(val);
    
    width += '%';
    return {width: width, val: val};
  },

  getStarRatingPosition: function (val) {
    var width = this.getWidthFromValue(val);
    return width += '%';
  },

  handleMouseLeave: function () {
    this.setState({
      pos: this.state.ratingCache.pos,
      rating: this.state.ratingCache.rating
    });
  },

  getRatingEvent: function (e) {
    var pos = this.getPosition(e);
    return this.calculate(pos);
  },

  handleMouseOver: function (e) {
    // get hover position
    var ratingEvent = this.getRatingEvent(e);
    this.setState({
      pos: ratingEvent.width,
      rating: ratingEvent.val
    });
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return nextState.rating !== this.state.rating;
  },

  handleClick: function (e) {

    // is it disabled?
    if (this.props.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    var ratingCache = {
      pos: this.state.pos,
      rating: this.state.rating,
      title: this.props.title
    };

    this.setState({
      ratingCache: ratingCache
    });

    this.props.onRatingClick(e, ratingCache);
  },

  treatName: function (title) {
    if (typeof title === 'string') {
      return title.toLowerCase().split(' ').join('_')
    }
  },

  getClasses: function () {
    var classes = ['star-rating__root'];

    // is it disabled?
    if (this.props.disabled) {
      classes.push('rating-disabled');
    }

    return classes.join(' ');
  },

  render: function () {
    var inputName = this.treatName(this.props.title);
    // is there a title?
    if (this.props.title) {
      var title = (<span className="react-rating-caption">{this.props.title}</span>);
    }
    // is the rating set?
    if (this.props.rating) {
      this.state.pos = this.getStarRatingPosition(this.props.rating);
      this.props.editing = false;
    }

    // get the classes on this render
    var classes = this.getClasses();

    // are we editing this rating?
    var starRating;
    if (this.props.editing) {
      starRating = (
        <div ref="ratingContainer" className="rating-container rating-editing rating-gly-star" data-content={this.state.glyph} onMouseMove={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} onClick={this.handleClick}>
          <div ref="ratingStars" className="rating-stars" data-content={this.state.glyph} style={{width: this.state.pos}}></div>
          <input type="number" name={inputName} value={this.state.ratingCache.rating} style={{display: 'none !important'}} min={this.min} max={this.max} />
        </div>
      );
    } else {
      starRating = (
        <div ref="ratingContainer" className="rating-container rating-gly-star" data-content={this.state.glyph}>
          <div ref="ratingStars" className="rating-stars" data-content={this.state.glyph} style={{width: this.state.pos}}></div>
          <input type="number" name={inputName} value={this.state.ratingCache.rating} style={{display: 'none !important'}} min={this.min} max={this.max} />
        </div>
      );
    }

    return (
      <fieldset>
        {title}
        <span ref="root" className={classes}>
          {starRating}
        </span>
      </fieldset>
    );
  }
});

module.exports = StarRating;