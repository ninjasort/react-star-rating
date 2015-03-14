// {amd_start}

var React = require('react');

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
module.exports = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    caption: React.PropTypes.string,
    ratingAmount: React.PropTypes.number.isRequired,
    rating: React.PropTypes.number,
    onRatingClick: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    editing: React.PropTypes.bool,
    size: React.PropTypes.string
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
      onRatingClick: function () {},
      disabled: false
    };
  },

  getInitialState: function () {
    return {
      ratingCache: {
        pos: 0,
        rating: 0
      },
      editing: this.props.editing || true,
      stars: 5,
      rating: 0,
      pos: 0,
      glyph: this.getStars()
    };
  },

  componentWillMount: function () {
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

  },

  componentDidMount: function () {
    this.root = this.refs.root.getDOMNode();
    this.ratingStars = this.refs.ratingStars.getDOMNode();
    this.ratingContainer = this.refs.ratingContainer.getDOMNode();
  },

  componentWillUnmount: function () {
    delete this.root;
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

  getRatingEvent: function (e) {
    var pos = this.getPosition(e);
    return this.calculate(pos);
  },

  handleMouseLeave: function () {
    this.setState({
      pos: this.state.ratingCache.pos,
      rating: this.state.ratingCache.rating
    });
  },

  handleMouseMove: function (e) {
    // get hover position
    var ratingEvent = this.getRatingEvent(e);
    this.setState({
      pos: ratingEvent.width,
      rating: ratingEvent.val
    });
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return nextState.ratingCache.rating !== this.state.ratingCache.rating || nextState.rating !== this.state.rating;
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
      caption: this.props.caption,
      name: this.props.name
    };

    this.setState({
      ratingCache: ratingCache
    });

    this.props.onRatingClick(e, ratingCache);
  },

  treatName: function (title) {
    if (typeof title === 'string') {
      return title.toLowerCase().split(' ').join('_');
    }
  },

  getClasses: function () {
    var classes = ['react-star-rating__root'];

    // is it disabled?
    if (this.props.disabled) {
      classes.push('rating-disabled');
    }

    if (this.props.size) {
      switch(this.props.size) {
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
  },

  render: function () {

    var caption = null;
    
    // is there a caption?
    if (this.props.caption) {
      caption = (<span className="react-rating-caption">{this.props.caption}</span>);
    }

    // get the classes on this render
    var classes = this.getClasses();

    // are we editing this rating?
    var starRating;
    if (this.state.editing) {
      starRating = (
        <div ref="ratingContainer" className="rating-container rating-gly-star" data-content={this.state.glyph} onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseLeave} onClick={this.handleClick}>
          <div ref="ratingStars" className="rating-stars" data-content={this.state.glyph} style={{width: this.state.pos}}></div>
          <input type="number" name={this.props.name} value={this.state.ratingCache.rating} style={{display: 'none !important'}} min={this.min} max={this.max} readOnly />
        </div>
      );
    } else {
      starRating = (
        <div ref="ratingContainer" className="rating-container rating-gly-star" data-content={this.state.glyph}>
          <div ref="ratingStars" className="rating-stars" data-content={this.state.glyph} style={{width: this.state.pos}}></div>
          <input type="number" name={this.props.name} value={this.state.ratingCache.rating} style={{display: 'none !important'}} min={this.min} max={this.max} readOnly />
        </div>
      );
    }

    return (
      <span className="react-star-rating">
        {caption}
        <span ref="root" className={classes}>
          {starRating}
        </span>
      </span>
    );
  }
});

// {window.StarRating}
// {amd_end}