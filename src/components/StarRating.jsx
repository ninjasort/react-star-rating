var React = require('react');

var StarRating = React.createClass({

  ratingCache: {
    pos: 0,
    rating: 0
  },

  propTypes: {
    title: React.PropTypes.string,

  },

  styles: {
    'display': 'inline-block',
    'vertical-align': 'top',
    'margin': '0 1em'
  },

  getStars: function () {
    var stars = '';
    var numRating = this.props.rating;
    for(var i = 0; i < numRating; i++) {
      stars += '\u2605';
    }
    return stars;
  },

  getDefaultProps: function () {
    return {
      step: 0.5,
      min: 0,
      max: 5,
      onRatingClick: function (e, cache) {
      }
    }
  },

  getInitialState: function () {
    return {
      stars: 5,
      rating: 0,
      pos: 0,
      glyph: this.getStars()
    }
  },

  componentDidMount: function () {
    this.root = this.refs.root.getDOMNode();
    this.ratingStars = this.refs.ratingStars.getDOMNode();
    this.ratingContainer = this.refs.ratingContainer.getDOMNode();
  },

  componentDidUnmount: function () {

  },

  getPosition: function (e) {
    return e.pageX - this.root.offsetLeft;
  },

  applyPrecision: function (val, precision) {
    return parseFloat(val.toFixed(precision));
  },

  getDecimalPlaces: function (num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  },

  getWidthFromValue: function (val) {
    var min = this.props.min,
        max = this.props.max;
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
    var diff = this.props.max - this.props.min;
    var factor = (diff * pos) / (maxWidth * this.props.step);
        factor = Math.ceil(factor);
    var val = this.applyPrecision(parseFloat(this.props.min + factor * this.props.step), precision);
        val = Math.max(Math.min(val, this.props.max), this.props.min);
    return val;
  },

  calculate: function (pos) {
    var val = this.getValueFromPosition(pos),
        width = this.getWidthFromValue(val);
    
    width += '%';
    return {width: width, val: val};
  },

  handleMouseLeave: function () {
    this.setState({
      pos: this.ratingCache.pos,
      rating: this.ratingCache.rating
    });
  },

  handleMouseOver: function (e) {
    var pos = this.getPosition(e);
    var rating = this.calculate(pos);
    this.setState({
      pos: rating.width,
      rating: rating.val
    });
  },

  handleClick: function (e) {
    this.ratingCache = this.state;
    this.props.onRatingClick(e, this.ratingCache);
  },

  treatName: function (title) {
    if (typeof title === 'string') {
      return title.toLowerCase().split(' ').join('_')
    }
  },

  render: function () {
    var inputName = this.treatName(this.props.title);
    if (this.props.title) {
      var title = (<span className="react-rating-title">{this.props.title}</span>);
    }
    return (
      <fieldset>
        {title}
        <span ref="root" className="star-rating rating-xs rating-active">
          <div ref="ratingContainer" className="rating-container rating-gly-star" data-content={this.state.glyph} onMouseMove={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} onClick={this.handleClick}>
            <div ref="ratingStars" className="rating-stars" data-content={this.state.glyph} style={{width: this.state.pos + '%'}}></div>
            <input type="number" name={inputName} style={{display: 'none !important'}} min={this.props.min} max={this.props.max} defaultValue={this.state.rating} />
          </div>
        </span>
      </fieldset>
    );
  }
});

module.exports = StarRating;